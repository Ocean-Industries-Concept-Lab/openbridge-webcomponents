import {html, LitElement, nothing, PropertyValues, svg, unsafeCSS} from 'lit';
import {property} from 'lit/decorators.js';
import {classMap} from 'lit/directives/class-map.js';
import {ResizeController} from '@lit-labs/observers/resize-controller.js';
import componentStyle from './gauge-radial-proportional.css?inline';
import {customElement} from '../../decorator.js';
import {InstrumentState, Priority} from '../types.js';
import {SetpointMixin} from '../../svghelpers/setpoint-mixin.js';
import {AdviceState, AdviceType, AngleAdviceRaw} from '../watch/advice.js';
import '../watch/watch.js';
import {innerRingRadiusFor, WatchCircleType} from '../watch/watch.js';
import type {WatchArea, WatchBarArea} from '../watch/watch.js';
import {TickmarkStyle, TickmarkType} from '../watch/tickmark.js';
import type {Tickmark} from '../watch/tickmark.js';
import {
  applyPinnedHostSize,
  computeRadialFrame,
  END_MAXMIN_LABEL_DROP_PX,
  estimateLabelWidthPx,
  measureContainerPx,
  observeInnerBox,
  SIDE_LABEL_DROP_PX,
  type RadialFrame,
} from '../../svghelpers/radial-frame.js';
import {renderInstrumentReadout} from '../readout/instrument-readout.js';
import {ReadoutSize} from '../readout/readout.js';

export enum GaugeRadialProportionalSector {
  deg360 = '360',
  deg270 = '270',
  deg270PosNeg = '270-pos-neg',
}

export enum GaugeRadialProportionalAlignment {
  outside = 'outside',
  inside = 'inside',
  maxMin = 'max-min',
}

/**
 * Color emphasis of the proportional gauge (the Figma "Priority" axis).
 * `regular`/`enhanced` map onto the shared instrument {@link Priority};
 * `medium` colors the value graphics by a category/medium color pair;
 * `off` blanks the value graphics on a silhouette face while the frame,
 * setpoint marker and readouts remain.
 */
export enum GaugeRadialProportionalPriority {
  regular = 'regular',
  enhanced = 'enhanced',
  medium = 'medium',
  off = 'off',
}

export interface GaugeRadialProportionalAdvice {
  minValue: number;
  maxValue: number;
  type: AdviceType;
  hinted: boolean;
}

/* Band geometry: the value band fills the track annulus between the single
   and double inner rings (112..160), like the watch bar areas. The secondary
   value renders as an 8-unit line lane at the band's inner edge, and the
   primary needle pill shortens so the two lanes don't collide (the same
   subdivision as the pitch-rpm track in the design family). */
const BAND_INNER_RADIUS = innerRingRadiusFor(WatchCircleType.double);
const BAND_OUTER_RADIUS = innerRingRadiusFor(WatchCircleType.single);
const SECONDARY_LINE_WIDTH = 8;
const SECONDARY_LANE_RADIUS = BAND_INNER_RADIUS + SECONDARY_LINE_WIDTH / 2;
const NEEDLE_WIDTH = 8;
const NEEDLE_LENGTH_FULL = BAND_OUTER_RADIUS - BAND_INNER_RADIUS;
const NEEDLE_LENGTH_SPLIT = 32;

/* Center-content anchors in SVG units (center origin), from the 512-canvas
   design: icon center at -74, readout row center at +26, name row at +88. */
const ICON_ANCHOR_Y = -74;
const READOUT_ANCHOR_Y = 26;
const NAME_ANCHOR_Y = 88;

/* Off-priority silhouette disc radius (the value graphics are blanked and the
   face becomes a flat silhouette-colored disc). */
const OFF_DISC_RADIUS = BAND_OUTER_RADIUS + 24;

/** Cap for full-circle arcs so start and end never coincide in path space. */
const FULL_CIRCLE_EPSILON_DEG = 0.05;

function strongerTickmarkType(
  existing: TickmarkType,
  candidate: TickmarkType
): TickmarkType {
  const rank: Record<TickmarkType, number> = {
    [TickmarkType.zeroLineThick]: 6,
    [TickmarkType.zeroLine]: 5,
    [TickmarkType.main]: 4,
    [TickmarkType.primary]: 3,
    [TickmarkType.secondary]: 2,
    [TickmarkType.tertiary]: 1,
    [TickmarkType.textOnly]: 0,
  };
  return rank[candidate] > rank[existing] ? candidate : existing;
}

function arcPath(radius: number, startDeg: number, endDeg: number): string {
  const toRad = (deg: number) => ((deg - 90) * Math.PI) / 180;
  const x1 = radius * Math.cos(toRad(startDeg));
  const y1 = radius * Math.sin(toRad(startDeg));
  const x2 = radius * Math.cos(toRad(endDeg));
  const y2 = radius * Math.sin(toRad(endDeg));
  const largeArc = Math.abs(endDeg - startDeg) > 180 ? 1 : 0;
  const sweep = endDeg > startDeg ? 1 : 0;
  return `M ${x1} ${y1} A ${radius} ${radius} 0 ${largeArc} ${sweep} ${x2} ${y2}`;
}

/**
 * `<obc-gauge-radial-proportional>` — Radial gauge whose fill band length is
 * proportional to the value, with an optional secondary value lane and a
 * center readout cluster (the "Watch-face-gauge-proportional" design).
 *
 * The value renders as a band on the track annulus growing from the fill
 * origin to the current value, tipped with a needle pill. A setpoint marker
 * (via {@link SetpointMixin}) and caution/alert advice arcs render on the
 * same face.
 *
 * ## Features
 *
 * - **Sectors**: `360` (full circle, fill anchored at 12 o'clock), `270`
 *   (fill anchored at the scale start), and `270-pos-neg` (fill anchored at
 *   the scale midpoint/zero, growing toward either side).
 * - **Label alignment**: `outside` (default), `inside`
 *   (labels inside the ring), and `max-min` (only the min/max labels).
 * - **Priority**: `regular`, `enhanced`, `medium` (category color pair via
 *   `--instrument-enhanced-*` overrides), `off` (silhouette face, value
 *   graphics hidden, setpoint and readouts remain).
 * - **Secondary value**: setting `secondaryValue` renders the
 *   primary-secondary frame — a thin line arc at the band's inner edge plus
 *   a second readout with a divider.
 * - **Center content**: optional readout(s) with `label`/`unit`, a `name`
 *   row, and an `icon` slot above the readout.
 * - **Setpoint via mixin**: `setpoint`, `newSetpoint`, `touching`, deadband
 *   tuning and confirm animation are inherited from `SetpointMixin`.
 *
 * ## Usage Guidelines
 *
 * - Use `obc-gauge-radial` for the classic filled/bar/needle gauge with
 *   90/180/270 sectors; use this component for the proportional band style,
 *   the full-circle sector, the mid-anchored (pos/neg) fill, the secondary
 *   value lane, or the medium/off priorities.
 * - `priority: off` blanks the value graphics but keeps the instrument
 *   legible; `state: off` (from the shared instrument state) blanks the
 *   whole dial.
 *
 * ## Slots
 *
 * | Slot   | Purpose                                        |
 * | ------ | ---------------------------------------------- |
 * | `icon` | Icon shown above the readout (e.g. `<obi-*>`). |
 *
 * @element obc-gauge-radial-proportional
 * @experimental
 */
@customElement('obc-gauge-radial-proportional')
export class ObcGaugeRadialProportional extends SetpointMixin(LitElement) {
  @property({type: Number}) value = 0;
  @property({type: Number}) maxValue = 100;
  @property({type: Number}) minValue = 0;
  /**
   * Secondary value shown as a thin line arc at the band's inner edge with a
   * second readout (the "primary-secondary" frame type). When undefined
   * (default), the regular single-value frame renders.
   */
  @property({type: Number}) secondaryValue: number | undefined;
  @property({type: String}) sector: GaugeRadialProportionalSector =
    GaugeRadialProportionalSector.deg270;
  @property({type: String}) alignment: GaugeRadialProportionalAlignment =
    GaugeRadialProportionalAlignment.outside;
  @property({type: String}) priority: GaugeRadialProportionalPriority =
    GaugeRadialProportionalPriority.regular;
  @property({type: String}) state: InstrumentState = InstrumentState.active;
  @property({type: Boolean}) showLabels: boolean = false;
  /**
   * Interval for primary tickmarks in value units.
   * When undefined or <= 0, no primary tickmarks are shown.
   */
  @property({type: Number}) primaryTickmarkInterval: number | undefined = 50;
  /**
   * Interval for secondary tickmarks in value units.
   * When undefined or <= 0, no secondary tickmarks are shown.
   */
  @property({type: Number}) secondaryTickmarkInterval: number | undefined = 10;
  @property({type: String}) tickmarkStyle: TickmarkStyle =
    TickmarkStyle.regular;
  /** Caution/alert arcs in value units. */
  @property({type: Array, attribute: false})
  advices: GaugeRadialProportionalAdvice[] = [];
  /**
   * When `true`, shows the center readout (and the secondary readout when
   * `secondaryValue` is set). Default `false`.
   */
  @property({type: Boolean}) hasReadout = false;
  @property({type: String}) label = '';
  @property({type: String}) unit = '';
  @property({type: String}) secondaryLabel = '';
  @property({type: String}) secondaryUnit = '';
  @property({type: Number}) fractionDigits = 0;
  /** Name row shown under the readout (uppercase overline style). */
  @property({type: String}) name = '';
  /**
   * Outer-ring diameter in CSS pixels. When set, the instrument renders at a
   * fixed intrinsic size; when unset (default), it fills its container.
   */
  @property({type: Number, attribute: 'face-diameter', reflect: true})
  faceDiameter: number | undefined;

  private _frame: RadialFrame | undefined;
  private _hostSizePinned = false;
  private _resizeController = new ResizeController(this, {});

  override firstUpdated(changed: PropertyValues): void {
    super.firstUpdated(changed);
    observeInnerBox(this._resizeController, this.renderRoot);
  }

  override updated(changed: PropertyValues): void {
    super.updated(changed);
    this._hostSizePinned = applyPinnedHostSize(
      this,
      this._frame,
      this._hostSizePinned
    );
  }

  private get sectorAngles(): {sweep: number; start: number} {
    if (this.sector === GaugeRadialProportionalSector.deg360) {
      return {sweep: 360, start: 0};
    }
    return {sweep: 270, start: -135};
  }

  private get isFullCircle(): boolean {
    return this.sector === GaugeRadialProportionalSector.deg360;
  }

  private get isOff(): boolean {
    return this.priority === GaugeRadialProportionalPriority.off;
  }

  private get isValueGraphicsHidden(): boolean {
    return (
      this.isOff ||
      this.state === InstrumentState.loading ||
      this.state === InstrumentState.off
    );
  }

  private mapAngle(value: number): number {
    const {sweep, start} = this.sectorAngles;
    const span = this.maxValue - this.minValue;
    if (!Number.isFinite(span) || span <= 0) {
      return start;
    }
    return ((value - this.minValue) / span) * sweep + start;
  }

  private clamp(value: number): number {
    const lowerBound = Math.min(this.minValue, this.maxValue);
    const upperBound = Math.max(this.minValue, this.maxValue);
    return Math.max(lowerBound, Math.min(value, upperBound));
  }

  private get clampedValue(): number {
    return this.clamp(this.value);
  }

  /**
   * Value the fill band grows from: the scale minimum for the plain sectors,
   * zero (or the range midpoint when the range excludes zero) for the
   * pos/neg sector.
   */
  private get fillOriginValue(): number {
    if (this.sector !== GaugeRadialProportionalSector.deg270PosNeg) {
      return this.minValue;
    }
    if (this.minValue < 0 && this.maxValue > 0) {
      return 0;
    }
    return (this.minValue + this.maxValue) / 2;
  }

  private get watchPriority(): Priority {
    return this.priority === GaugeRadialProportionalPriority.enhanced ||
      this.priority === GaugeRadialProportionalPriority.medium
      ? Priority.enhanced
      : Priority.regular;
  }

  private get bandColor(): string {
    return this.watchPriority === Priority.enhanced
      ? 'var(--instrument-enhanced-tertiary-color)'
      : 'var(--instrument-regular-tertiary-color)';
  }

  private get accentColor(): string {
    return this.watchPriority === Priority.enhanced
      ? 'var(--instrument-enhanced-secondary-color)'
      : 'var(--instrument-regular-secondary-color)';
  }

  /**
   * End angle of an arc growing from the fill origin toward `value`, capped
   * just short of a full turn so a max-value full-circle arc stays drawable.
   */
  private arcEndAngle(value: number): number {
    const originAngle = this.mapAngle(this.fillOriginValue);
    let endAngle = this.mapAngle(this.clamp(value));
    if (endAngle - originAngle >= 360 - FULL_CIRCLE_EPSILON_DEG) {
      endAngle = originAngle + 360 - FULL_CIRCLE_EPSILON_DEG;
    }
    return endAngle;
  }

  private get areas(): WatchArea[] {
    if (this.isFullCircle) {
      return [];
    }
    return [
      {
        startAngle: this.mapAngle(this.minValue),
        endAngle: this.mapAngle(this.maxValue),
        roundInsideCut: true,
        roundOutsideCut: true,
      },
    ];
  }

  private get barAreas(): WatchBarArea[] {
    if (this.isValueGraphicsHidden) {
      return [];
    }
    return [
      {
        startAngle: this.mapAngle(this.fillOriginValue),
        endAngle: this.arcEndAngle(this.clampedValue),
        fillColor: this.bandColor,
      },
    ];
  }

  private get tickmarks(): Tickmark[] {
    const tickmarksByValue = new Map<number, Tickmark>();
    const normalizeValue = (value: number) =>
      Math.abs(value) < 1e-9 ? 0 : Number(value.toFixed(6));
    const suppressIntervalLabels =
      this.alignment === GaugeRadialProportionalAlignment.maxMin &&
      !this.isFullCircle;

    const upsertTickmark = (
      value: number,
      type: TickmarkType,
      text?: string
    ) => {
      if (
        !Number.isFinite(value) ||
        value < this.minValue ||
        value > this.maxValue
      ) {
        return;
      }
      const normalizedValue = normalizeValue(value);
      const existing = tickmarksByValue.get(normalizedValue);
      if (existing) {
        existing.type = strongerTickmarkType(existing.type, type);
        if (text !== undefined) {
          existing.text = text;
        }
        return;
      }
      tickmarksByValue.set(normalizedValue, {
        angle: this.mapAngle(normalizedValue),
        type,
        text,
      });
    };

    const addTickmarksAtInterval = (
      interval: number | undefined,
      type: TickmarkType,
      withLabels = false
    ) => {
      if (
        interval === undefined ||
        interval <= 0 ||
        !Number.isFinite(interval)
      ) {
        return;
      }
      const epsilon = Math.abs(interval) * 1e-6;
      const startValue =
        Math.ceil((this.minValue - epsilon) / interval) * interval;
      for (
        let value = startValue;
        value < this.maxValue - epsilon;
        value += interval
      ) {
        const normalizedValue = normalizeValue(value);
        if (
          normalizedValue <= this.minValue + epsilon ||
          normalizedValue >= this.maxValue - epsilon
        ) {
          continue;
        }
        upsertTickmark(
          normalizedValue,
          type,
          withLabels && this.showLabels && !suppressIntervalLabels
            ? normalizedValue.toString()
            : undefined
        );
      }
    };

    addTickmarksAtInterval(
      this.primaryTickmarkInterval,
      TickmarkType.primary,
      true
    );
    if (!this.isOff) {
      addTickmarksAtInterval(
        this.secondaryTickmarkInterval,
        TickmarkType.secondary
      );
    }

    if (this.sector === GaugeRadialProportionalSector.deg270PosNeg) {
      upsertTickmark(this.fillOriginValue, TickmarkType.main);
    }

    if (this.showLabels) {
      upsertTickmark(
        this.minValue,
        TickmarkType.textOnly,
        this.minValue.toString()
      );
      // On the full circle the max tick coincides with the min tick at
      // 12 o'clock, so only the min label renders there.
      if (!this.isFullCircle) {
        upsertTickmark(
          this.maxValue,
          TickmarkType.textOnly,
          this.maxValue.toString()
        );
      }
    }

    return [...tickmarksByValue.values()].sort((a, b) => a.angle - b.angle);
  }

  private get _advices(): AngleAdviceRaw[] {
    const value = this.clampedValue;
    return this.advices.map((advice) => {
      const minAngle = this.mapAngle(advice.minValue);
      const maxAngle = this.mapAngle(advice.maxValue);
      let state = advice.hinted ? AdviceState.hinted : AdviceState.regular;
      if (value >= advice.minValue && value <= advice.maxValue) {
        state = AdviceState.triggered;
      }
      return {
        minAngle,
        maxAngle,
        type: advice.type,
        state,
        hideMinTickmark: advice.minValue === this.minValue,
        hideMaxTickmark: advice.maxValue === this.maxValue,
      };
    });
  }

  private renderNeedle() {
    if (this.isValueGraphicsHidden) {
      return nothing;
    }
    const length =
      this.secondaryValue !== undefined
        ? NEEDLE_LENGTH_SPLIT
        : NEEDLE_LENGTH_FULL;
    return svg`
      <rect
        transform="rotate(${this.mapAngle(this.clampedValue)})"
        x="${-NEEDLE_WIDTH / 2}" y="${-BAND_OUTER_RADIUS}"
        width="${NEEDLE_WIDTH}" height="${length}" rx="${NEEDLE_WIDTH / 2}"
        fill=${this.accentColor}
        stroke=${this.bandColor}
        stroke-width="1"
        vector-effect="non-scaling-stroke"
        paint-order="stroke fill"
      />
    `;
  }

  private renderSecondaryArc() {
    if (this.secondaryValue === undefined || this.isValueGraphicsHidden) {
      return nothing;
    }
    const r = SECONDARY_LANE_RADIUS;
    const originAngle = this.mapAngle(this.fillOriginValue);
    const endAngle = this.arcEndAngle(this.secondaryValue);
    const toRad = ((endAngle - 90) * Math.PI) / 180;
    const endX = r * Math.cos(toRad);
    const endY = r * Math.sin(toRad);
    const tip = svg`<circle
      cx=${endX} cy=${endY}
      r=${SECONDARY_LINE_WIDTH / 2}
      fill=${this.accentColor}
    ></circle>`;
    if (Math.abs(endAngle - originAngle) < 0.5) {
      return tip;
    }
    return svg`
      <path
        d=${arcPath(r, originAngle, endAngle)}
        fill="none"
        stroke=${this.accentColor}
        stroke-width=${SECONDARY_LINE_WIDTH}
        stroke-linecap="butt"
      ></path>
      ${tip}
    `;
  }

  private renderCenterContent() {
    const readoutPriority = this.watchPriority;
    const secondaryReadout =
      this.secondaryValue !== undefined
        ? html`
            <div class="readout-divider"></div>
            ${renderInstrumentReadout({
              value: this.clamp(this.secondaryValue),
              label: this.secondaryLabel,
              unit: this.secondaryUnit,
              fractionDigits: this.fractionDigits,
              priority: readoutPriority,
              size: ReadoutSize.large,
            })}
          `
        : nothing;
    return html`
      <div class="icon-anchor"><slot name="icon"></slot></div>
      ${this.hasReadout
        ? html`
            <div class="readout-row">
              ${renderInstrumentReadout({
                value: this.clampedValue,
                label: this.label,
                unit: this.unit,
                fractionDigits: this.fractionDigits,
                priority: readoutPriority,
                size: ReadoutSize.large,
              })}
              ${secondaryReadout}
            </div>
          `
        : nothing}
      ${this.name ? html`<div class="gauge-name">${this.name}</div>` : nothing}
    `;
  }

  override render() {
    const tickmarks = this.tickmarks;
    const tickmarksInside =
      this.alignment === GaugeRadialProportionalAlignment.inside;
    const endLabelsMaxMin =
      this.alignment === GaugeRadialProportionalAlignment.maxMin;
    const areas = this.areas;
    const hasHorizontalEndLabels = tickmarks.some((t) => {
      if (t.text === undefined) {
        return false;
      }
      const angle = ((t.angle % 360) + 360) % 360;
      return Math.abs(angle - 90) < 1 || Math.abs(angle - 270) < 1;
    });
    const frame = computeRadialFrame({
      basePadding: 48,
      labelWidthPx: tickmarksInside
        ? 0
        : estimateLabelWidthPx(tickmarks.map((t) => t.text)),
      labelDropPx:
        tickmarksInside || !hasHorizontalEndLabels
          ? 0
          : endLabelsMaxMin
            ? END_MAXMIN_LABEL_DROP_PX
            : SIDE_LABEL_DROP_PX,
      clips: {top: 0, bottom: 0, left: 0, right: 0},
      containerPx: measureContainerPx(this),
      faceDiameter: this.faceDiameter,
      zoomToFitArc: false,
      areas,
      innerRadius: BAND_INNER_RADIUS,
    });
    this._frame = frame;
    const shownTickmarks = frame.labelsHidden
      ? tickmarks.map((t) => ({...t, text: undefined}))
      : tickmarks;

    const value = this.clampedValue;
    const setpointAngle =
      this.setpoint !== undefined ? this.mapAngle(this.setpoint) : undefined;
    const newSetpointAngle =
      this.newSetpoint !== undefined
        ? this.mapAngle(this.newSetpoint)
        : undefined;
    const effectiveState = this.isOff ? InstrumentState.off : this.state;

    const pct = (anchorY: number) =>
      `${(((anchorY - frame.y) / frame.height) * 100).toFixed(4)}%`;
    const anchors = `--icon-top: ${pct(ICON_ANCHOR_Y)}; --readout-top: ${pct(
      READOUT_ANCHOR_Y
    )}; --name-top: ${pct(NAME_ANCHOR_Y)};`;

    return html`
      <div
        class=${classMap({
          'gauge-root': true,
          'face-pinned': this.faceDiameter !== undefined,
          'priority-medium':
            this.priority === GaugeRadialProportionalPriority.medium,
        })}
        style=${anchors}
      >
        <div class="container">
          ${this.isOff
            ? html`<svg class="layer" viewBox=${frame.viewBox}>
                <circle
                  r=${OFF_DISC_RADIUS}
                  fill="var(--border-silhouette-color)"
                  stroke="var(--instrument-frame-tertiary-color)"
                  stroke-width="1"
                  vector-effect="non-scaling-stroke"
                ></circle>
              </svg>`
            : nothing}
          <obc-watch
            class="layer"
            .state=${effectiveState}
            .priority=${this.watchPriority}
            .angleSetpoint=${setpointAngle}
            .newAngleSetpoint=${newSetpointAngle}
            .atAngleSetpoint=${this.computeAtSetpoint(value)}
            .angleSetpointAtZeroDeadband=${this.setpointAtZeroDeadband}
            .setpointOverride=${this.setpointOverride}
            .animateSetpoint=${this.animateSetpoint}
            .tickmarks=${shownTickmarks}
            .tickmarksInside=${tickmarksInside}
            .tickmarkStyle=${this.tickmarkStyle}
            .advices=${this._advices}
            .areas=${areas}
            .watchCircleType=${WatchCircleType.double}
            .barAreas=${this.barAreas}
            .endLabelsMaxMin=${endLabelsMaxMin}
            .arcFrame=${frame}
          ></obc-watch>
          <svg class="layer" viewBox=${frame.viewBox}>
            ${this.renderSecondaryArc()} ${this.renderNeedle()}
          </svg>
          ${this.renderCenterContent()}
        </div>
      </div>
    `;
  }

  static override styles = unsafeCSS(componentStyle);
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-gauge-radial-proportional': ObcGaugeRadialProportional;
  }
}
