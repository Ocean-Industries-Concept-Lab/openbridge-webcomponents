import {css, LitElement, PropertyValues, html, svg, nothing} from 'lit';
import {property} from 'lit/decorators.js';
import {ResizeController} from '@lit-labs/observers/resize-controller.js';
import {customElement} from '../../decorator.js';
import {
  AdviceState,
  AdviceType,
  AngleAdviceRaw,
} from '../../navigation-instruments/watch/advice.js';
import {WatchCircleType} from '../../navigation-instruments/watch/watch.js';
import {Tickmark} from '../../navigation-instruments/watch/tickmark.js';
import {buildIntervalTickmarks} from '../../navigation-instruments/watch/tickmark.js';
import {TickmarkStyle} from '../../navigation-instruments/watch/tickmark.js';
import {InstrumentState, Priority} from '../../navigation-instruments/types.js';
import {SetpointMixin} from '../../svghelpers/setpoint-mixin.js';
import {
  hasPortStarboardElement,
  PORT_STARBOARD_DEFAULT_ELEMENTS,
  PortStarboardSides,
  PortStarboardElement,
  PortStarboardShade,
  type PortStarboardSign,
  portStarboardSignOf,
  resolvePortStarboardColor,
} from '../../svghelpers/port-starboard.js';
import {innerRingRadiusFor} from '../../navigation-instruments/watch/watch.js';
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

export enum ObcGaugeRadialType {
  filled = 'filled',
  bar = 'bar',
  needle = 'needle',
}

export interface GaugeRadialAdvice {
  minValue: number;
  maxValue: number;
  type: AdviceType;
  hinted: boolean;
}

const NEEDLE_TIP_RADIUS = 160;
const NEEDLE_TIP_GAP = 5; // tip stops this far short of the scale
const NEEDLE_WIDTH = 8;
const NEEDLE_HUB_RADIUS = 16;

interface Clips {
  top: number;
  bottom: number;
  left: number;
  right: number;
}

/** Clamp a clip percentage to [0, 100]; non-finite returns 0. */
function clampClipPercent(n: number): number {
  return Number.isFinite(n) ? Math.min(Math.max(n, 0), 100) : 0;
}

/**
 * Clamp the four clips to [0, 100] and drop any opposite pair that would
 * collapse the viewBox (sum >= 100), so a bad clip can't produce a zero- or
 * negative-size box. Valid clips pass through unchanged.
 */
function normalizeClips(clips: Clips): Clips {
  let top = clampClipPercent(clips.top);
  let bottom = clampClipPercent(clips.bottom);
  let left = clampClipPercent(clips.left);
  let right = clampClipPercent(clips.right);
  if (top + bottom >= 100) {
    top = 0;
    bottom = 0;
  }
  if (left + right >= 100) {
    left = 0;
    right = 0;
  }
  return {top, bottom, left, right};
}

/**
 * Fallback value-to-angle mapping when no `getAngle` is supplied: linear over
 * the historical 270° sweep (-135 to 135). Returns -135 for a non-positive or
 * non-finite span.
 */
function defaultGaugeAngle(
  value: number,
  minValue: number,
  maxValue: number
): number {
  const span = maxValue - minValue;
  if (!Number.isFinite(span) || span <= 0) {
    return -135;
  }
  return ((value - minValue) / span) * 270 - 135;
}

/**
 * @availableWhen needleColor type!=filled
 * @availableWhen barColor type!=needle
 * @property primaryTickmarkInterval - Interval for primary tickmarks in value units.
 *   When undefined or <= 0, no primary tickmarks are shown.
 * @property secondaryTickmarkInterval - Interval for secondary tickmarks in value units.
 *   When undefined or <= 0, no secondary tickmarks are shown.
 * @property tertiaryTickmarkInterval - Interval for tertiary tickmarks in value units.
 *   When undefined or <= 0, no tertiary tickmarks are shown.
 * @availableWhen clipTop zoomToFitArc==false
 * @availableWhen clipBottom zoomToFitArc==false
 * @availableWhen clipLeft zoomToFitArc==false
 * @availableWhen clipRight zoomToFitArc==false
 * @property endLabelsMaxMin - Place the horizontal end labels (±90°, e.g. min/max) below the tick instead
 *   of beside it — the "Max-min" placement from the radial label model
 *   (External / Internal / Max-min). See PR #903 / design discussion.
 * @property faceDiameter - Outer-ring diameter in CSS pixels. When set, the instrument renders at a
 *   fixed intrinsic size derived from the ring, arc shape and label reserve —
 *   so instruments sharing the same value have identical ring circumference
 *   regardless of label width or arc extent (like obc-donut-chart's
 *   fixedHeight). When unset (default), the instrument fills its container.
 * @property portStarboard - Enables the maritime PORT/STBD (red/green) color mode: positive values
 *   render green, negative red. Ignored for any part whose color the consumer
 *   supplies explicitly via `barColor` / `needleColor`.
 * @property portStarboardElements - Which parts take part while `portStarboard` is on.
 *   Defaults to everything except the setpoint.
 * @availableWhen portStarboardElements portStarboard==true
 * @property portStarboardSides - Which halves the region tints paint while `portStarboard` is on.
 * @availableWhen portStarboardSides portStarboard==true
 * @fires {CustomEvent<RadialFrame>} frame-changed - Fired after render when the
 *   computed radial frame changed (viewBox, label visibility, or pinned host
 *   size). Wrappers use it to align sibling overlays/readouts with the dial.
 * @experimental
 */
@customElement('obc-instrument-radial')
export class ObcInstrumentRadial extends SetpointMixin(LitElement) {
  // setpoint, newSetpoint, atSetpoint, touching, autoAtSetpoint,
  // autoAtSetpointDeadband, setpointAtZeroDeadband, setpointOverride
  // — all inherited from SetpointMixin

  @property({type: String}) state: InstrumentState = InstrumentState.active;
  @property({type: String}) priority: Priority = Priority.regular;

  @property({type: Number}) value = 0;
  @property({type: Number}) maxValue = 100;
  @property({type: Number}) minValue = 0;
  @property({attribute: false}) getAngle!: (v: number) => number;
  @property({type: String}) needleColor: string | undefined;
  @property({type: String}) barColor: string | undefined;
  @property({type: Boolean}) showLabels: boolean = false;
  @property({type: Number}) primaryTickmarkInterval: number | undefined = 50;
  @property({type: Number}) secondaryTickmarkInterval: number | undefined = 10;
  @property({type: Number}) tertiaryTickmarkInterval: number | undefined =
    undefined;
  @property({type: String}) type: ObcGaugeRadialType =
    ObcGaugeRadialType.filled;
  @property({type: String}) needleType: ObcGaugeRadialType =
    ObcGaugeRadialType.filled;
  @property({type: Boolean}) tickmarksInside: boolean = false;
  @property({type: String}) tickmarkStyle: TickmarkStyle =
    TickmarkStyle.regular;
  @property({type: Array, attribute: false}) advices: GaugeRadialAdvice[] = [];
  @property({type: Number}) clipTop: number = 0; // in percent of height
  @property({type: Number}) clipBottom: number = 0; // in percent of height
  @property({type: Number}) clipLeft: number = 0; // in percent of width
  @property({type: Number}) clipRight: number = 0; // in percent of width
  @property({type: Boolean}) endLabelsMaxMin: boolean = false;
  @property({type: Boolean}) zoomToFitArc: boolean = false;
  @property({type: Number, attribute: 'face-diameter'})
  faceDiameter: number | undefined;
  @property({type: Boolean}) portStarboard: boolean = false;
  @property({type: Array, attribute: false})
  portStarboardElements: PortStarboardElement[] = [
    ...PORT_STARBOARD_DEFAULT_ELEMENTS,
  ];
  @property({type: String}) portStarboardSides: PortStarboardSides =
    PortStarboardSides.both;

  private _radiusOffset = 0;
  private _frame: RadialFrame | undefined;
  private _lastFrameKey = '';

  private _resizeController = new ResizeController(this, {});

  override firstUpdated(changed: PropertyValues): void {
    super.firstUpdated(changed);
    observeInnerBox(this._resizeController, this.renderRoot);
  }

  /** The frame computed for the current render (viewBox, label reserve …). */
  get frame(): RadialFrame | undefined {
    return this._frame;
  }

  /** Whether the host size styles were set by applyPinnedHostSize. */
  private _hostSizePinned = false;

  override updated(changed: PropertyValues): void {
    super.updated(changed);
    this._hostSizePinned = applyPinnedHostSize(
      this,
      this._frame,
      this._hostSizePinned
    );
    const frame = this._frame;
    if (!frame) {
      return;
    }
    const key = `${frame.viewBox}|${frame.labelsHidden}|${frame.hostWidthPx ?? ''}|${frame.hostHeightPx ?? ''}`;
    if (key !== this._lastFrameKey) {
      this._lastFrameKey = key;
      this.dispatchEvent(
        new CustomEvent<RadialFrame>('frame-changed', {detail: frame})
      );
    }
  }

  private get clampedValue(): number {
    const lowerBound = Math.min(this.minValue, this.maxValue);
    const upperBound = Math.max(this.minValue, this.maxValue);
    return Math.max(lowerBound, Math.min(this.value, upperBound));
  }

  private get minAngle(): number {
    return this.mapAngle(this.minValue);
  }

  private get maxAngle(): number {
    return this.mapAngle(this.maxValue);
  }

  // Map a value to an angle via the consumer's `getAngle`, guarding a missing
  // or non-finite mapping so a misconfigured consumer can't emit NaN geometry.
  private mapAngle(value: number): number {
    const fn = this.getAngle;
    const angle =
      typeof fn === 'function'
        ? fn(value)
        : defaultGaugeAngle(value, this.minValue, this.maxValue);
    return Number.isFinite(angle) ? angle : 0;
  }

  // Clamped clips, reused for the overlay viewBox and the clips forwarded to
  // obc-watch.
  private get safeClips(): Clips {
    return normalizeClips({
      top: this.clipTop,
      bottom: this.clipBottom,
      left: this.clipLeft,
      right: this.clipRight,
    });
  }

  /** Direction of this instrument's own value, for `portStarboardSides="active"`. */
  private get portStarboardValueSign(): PortStarboardSign {
    return portStarboardSignOf(this.clampedValue);
  }

  /** Setpoint-marker sign, gated on the `setpoint` element opt-in. */
  private get setpointPortStarboardSign(): PortStarboardSign {
    return hasPortStarboardElement(
      this.portStarboard,
      this.portStarboardElements,
      PortStarboardElement.setpoint
    )
      ? portStarboardSignOf(this.setpoint)
      : 0;
  }

  private get _derivedNeedleColor(): string {
    if (
      this.state === InstrumentState.loading ||
      this.state === InstrumentState.off
    ) {
      return 'transparent';
    }
    const portStarboard = resolvePortStarboardColor({
      enabled: this.portStarboard,
      elements: this.portStarboardElements,
      element: PortStarboardElement.needle,
      sign: portStarboardSignOf(this.clampedValue),
      shade: PortStarboardShade.dark,
      neutralDark: true,
    });
    if (portStarboard) return portStarboard;
    return this.priority === Priority.enhanced
      ? 'var(--instrument-enhanced-secondary-color)'
      : 'var(--instrument-regular-secondary-color)';
  }

  private get _derivedBarColor(): string {
    if (
      this.state === InstrumentState.loading ||
      this.state === InstrumentState.off
    ) {
      return 'transparent';
    }
    const portStarboard = resolvePortStarboardColor({
      enabled: this.portStarboard,
      elements: this.portStarboardElements,
      element: PortStarboardElement.bar,
      sign: portStarboardSignOf(this.clampedValue),
      // The filled type paints a dark value fill; the bar type paints a light
      // track, so the shade role differs (see the shade rule).
      shade:
        this.type === ObcGaugeRadialType.filled
          ? PortStarboardShade.dark
          : PortStarboardShade.light,
    });
    if (portStarboard) return portStarboard;
    if (this.type === ObcGaugeRadialType.filled) {
      return this.priority === Priority.enhanced
        ? 'var(--instrument-enhanced-secondary-color)'
        : 'var(--instrument-regular-secondary-color)';
    }
    return this.priority === Priority.enhanced
      ? 'var(--instrument-enhanced-tertiary-color)'
      : 'var(--instrument-regular-tertiary-color)';
  }

  override render() {
    const barColor = this.barColor ?? this._derivedBarColor;
    const barStartValue = Math.max(this.minValue, Math.min(0, this.maxValue));
    const value = this.clampedValue;
    const setpointAngle =
      this.setpoint !== undefined ? this.mapAngle(this.setpoint) : undefined;
    const newSetpointAngle =
      this.newSetpoint !== undefined
        ? this.mapAngle(this.newSetpoint)
        : undefined;

    const barAreas =
      this.type === ObcGaugeRadialType.needle
        ? []
        : [
            {
              startAngle: this.mapAngle(barStartValue),
              endAngle: this.mapAngle(value),
              fillColor: barColor,
            },
          ];

    const areas = [
      {
        startAngle: this.minAngle,
        endAngle: this.maxAngle,
        roundInsideCut: true,
        roundOutsideCut: true,
      },
    ];

    const watchCircleType =
      this.type === ObcGaugeRadialType.needle
        ? WatchCircleType.single
        : WatchCircleType.double;

    const tickmarks = this.tickmarks;
    // Labels hang past the ±90° line only when a labeled tick actually sits
    // there (e.g. the 180°/90° sector ends) — a ±60° sector like rot-sector
    // must not reserve a drop it never uses.
    const hasHorizontalEndLabels = tickmarks.some((t) => {
      if (t.text === undefined) {
        return false;
      }
      const angle = ((t.angle % 360) + 360) % 360;
      return Math.abs(angle - 90) < 1 || Math.abs(angle - 270) < 1;
    });
    const frame = computeRadialFrame({
      basePadding: 48,
      labelWidthPx: this.tickmarksInside
        ? 0
        : estimateLabelWidthPx(tickmarks.map((t) => t.text)),
      labelDropPx:
        this.tickmarksInside || !hasHorizontalEndLabels
          ? 0
          : this.endLabelsMaxMin
            ? END_MAXMIN_LABEL_DROP_PX
            : SIDE_LABEL_DROP_PX,
      clips: this.zoomToFitArc ? undefined : this.safeClips,
      containerPx: measureContainerPx(this),
      faceDiameter: this.faceDiameter,
      zoomToFitArc: this.zoomToFitArc,
      areas,
      innerRadius: innerRingRadiusFor(watchCircleType),
    });
    this._radiusOffset = frame.radiusOffset;
    this._frame = frame;
    const shownTickmarks = frame.labelsHidden
      ? tickmarks.map((t) => ({...t, text: undefined}))
      : tickmarks;

    return html`
      <div class="container">
        <obc-watch
          .state=${this.state}
          .priority=${this.priority}
          .angleSetpoint=${setpointAngle}
          .newAngleSetpoint=${newSetpointAngle}
          .atAngleSetpoint=${this.computeAtSetpoint(value)}
          .angleSetpointAtZeroDeadband=${this.setpointAtZeroDeadband}
          .setpointOverride=${this.setpointOverride}
          .animateSetpoint=${this.animateSetpoint}
          .tickmarks=${shownTickmarks}
          .tickmarksInside=${this.tickmarksInside}
          .tickmarkStyle=${this.tickmarkStyle}
          .advices=${this._advices}
          .areas=${areas}
          .watchCircleType=${watchCircleType}
          .barAreas=${barAreas}
          .endLabelsMaxMin=${this.endLabelsMaxMin}
          .arcFrame=${frame}
          .portStarboard=${this.portStarboard}
          .portStarboardElements=${this.portStarboardElements}
          .portStarboardSides=${this.portStarboardSides}
          .portStarboardValueSign=${this.portStarboardValueSign}
          .setpointPortStarboardSign=${this.setpointPortStarboardSign}
        ></obc-watch>
        <svg class="gauge-radial" viewBox=${frame.viewBox}>${this._needle}</svg>
      </div>
    `;
  }

  private get _needle() {
    if (this.type === ObcGaugeRadialType.filled) {
      return nothing;
    }
    const needleColor = this.needleColor ?? this._derivedNeedleColor;
    const rOff = this._radiusOffset;
    const value = this.clampedValue;
    if (this.type === ObcGaugeRadialType.needle) {
      // Rod runs from the value tip down to the center hub. Width is constant;
      // the tip shifts outward additively under zoom.
      const tipY = 256 - (NEEDLE_TIP_RADIUS - NEEDLE_TIP_GAP) - rOff;
      return svg`<g transform="rotate(${this.mapAngle(value)}) translate(-256, -256)">
      <rect x="${256 - NEEDLE_WIDTH / 2}" y="${tipY}" width="${NEEDLE_WIDTH}" height="${256 - tipY}" rx="${NEEDLE_WIDTH / 2}" fill=${needleColor} stroke=${needleColor}/>
      <circle cx="256" cy="256" r="${NEEDLE_HUB_RADIUS}" fill=${needleColor}/>
      </g>
`;
    } else {
      return svg`<g transform="rotate(${this.mapAngle(value)}) translate(-256, -256)">
<rect x="252" y="${96 - rOff}" width="8" height="48" rx="4" fill=${needleColor} stroke="var(--border-silhouette-color)"/>
</g>
      `;
    }
  }

  get tickmarks(): Tickmark[] {
    return buildIntervalTickmarks({
      minValue: this.minValue,
      maxValue: this.maxValue,
      mapAngle: (v) => this.mapAngle(v),
      primaryInterval: this.primaryTickmarkInterval,
      secondaryInterval: this.secondaryTickmarkInterval,
      tertiaryInterval: this.tertiaryTickmarkInterval,
      showLabels: this.showLabels,
      zeroTick: true,
    });
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

  static override styles = css`
    * {
      box-sizing: border-box;
    }

    .container {
      position: relative;
      width: 100%;
      height: 100%;
    }

    .container > * {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }

    obc-watch {
      anchor-name: --watch;
    }

    .speed-gauge-value {
      position: absolute;
      top: clamp(
        70%,
        calc(80% - (anchor-size(--watch height) - 200px) * 0.2),
        80%
      );
      left: 50%;
      transform: translateX(-50%);
      width: fit-content;
      height: fit-content;
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-instrument-radial': ObcInstrumentRadial;
  }
}
