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
import {OUTER_RING_RADIUS, WatchCircleType} from '../watch/watch.js';
import {
  BAND_INNER_RADIUS,
  BAND_OUTER_RADIUS,
  LANE_DIVIDER_RADIUS,
  LANE_DIVIDER_WIDTH,
  PRIMARY_SUBBAND_INNER_RADIUS,
  PRIMARY_SUBBAND_NEEDLE_LENGTH,
  SECONDARY_LANE_RADIUS,
  SECONDARY_LINE_WIDTH,
  arcPath,
  renderSecondaryLine,
} from '../watch/secondary-lane.js';
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
import {
  CenterReadoutArrangement,
  centerReadoutStyles,
  renderCenterReadouts,
  type CenterReadoutEntry,
} from '../readout/center-readout.js';
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
 * `off` blanks the value graphics on a flat frame-secondary disc while the
 * ticks, labels, advices, readouts and the regular-colored setpoint marker
 * remain.
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
   and double inner rings (112..160), like the watch bar areas. The
   primary-secondary frame reuses the shared pitch-rpm lane subdivision from
   watch/secondary-lane.ts: secondary line lane (112..120), face-colored
   divider (120..128) and a narrowed primary band lane (128..160). The joint
   48-unit round cut the watch draws at the sector ends is erased and each
   lane re-capped individually. */
const NEEDLE_WIDTH = 8;
const NEEDLE_LENGTH_FULL = BAND_OUTER_RADIUS - BAND_INNER_RADIUS;
const SPLIT_BAND_WIDTH = BAND_OUTER_RADIUS - PRIMARY_SUBBAND_INNER_RADIUS;
const SPLIT_BAND_CENTER_RADIUS =
  PRIMARY_SUBBAND_INNER_RADIUS + SPLIT_BAND_WIDTH / 2;
const TRACK_ERASE_CENTER_RADIUS = (BAND_INNER_RADIUS + BAND_OUTER_RADIUS) / 2;
const TRACK_ERASE_WIDTH = BAND_OUTER_RADIUS - BAND_INNER_RADIUS + 1;
/** Angular reach of the end-cut erase, covering the joint cap's full bulge. */
const TRACK_END_OVERSHOOT_DEG = 15;
/* The watch's sector cut is a round cap spanning the whole 112..184
   silhouette; its circle bounds the end-cut erase so face paint never spills
   past the outline. */
const SILHOUETTE_CAP_RADIUS = (OUTER_RING_RADIUS - BAND_INNER_RADIUS) / 2;
const SILHOUETTE_CAP_CENTER_RADIUS =
  (OUTER_RING_RADIUS + BAND_INNER_RADIUS) / 2;
/* Face-colored cover over the watch's 1px inner-edge outline at 112 (the
   split lanes have no inner border); the lane track is redrawn on top. */
const INNER_EDGE_COVER_RADIUS = BAND_INNER_RADIUS - 0.5;
const INNER_EDGE_COVER_WIDTH = 3;

/* Fill-origin anchor stub (the design's "zero-line"): a band-colored bar at
   the origin angle spanning the band and the scale ring, overshooting each by
   half a unit so it caps the ring strokes. It scales with the face, unlike
   the fixed-width tickmarks. */
const ZERO_LINE_WIDTH = 9;
const ZERO_LINE_OUTER_RADIUS = OUTER_RING_RADIUS + 0.5;
const ZERO_LINE_INNER_RADIUS = BAND_INNER_RADIUS - 0.5;

/* Center-content anchors in SVG units (center origin), from the 512-canvas
   design (automation-gauge-readout): icon (72x72 box) centered at -50,
   readout row center at +26, name row at +88 on the full circle and +120 on
   the 270 sectors (the open bottom leaves more room). Without a readout the
   design's icon-only face centers a 144x144 icon on the dial. Icons scale
   with the face (n/512 of the frame), unlike the fixed-px readouts. */
const ICON_ANCHOR_Y = -50;
const ICON_SIZE = 72;
const ICON_ONLY_ANCHOR_Y = 0;
const ICON_ONLY_SIZE = 144;
const READOUT_ANCHOR_Y = 26;
const NAME_ANCHOR_Y_360 = 88;
const NAME_ANCHOR_Y_270 = 120;

/* Secondary-scale max-min labels (the design's "Labels-secondary"): a second
   min/max row at the secondary lane ends, outer-edge aligned at ±78.5 on the
   +92 row — between the readout and the 270 name row. The design renders it
   only for the max-min alignment on the open sectors (the full circle's lane
   ends meet at 12 o'clock). */
const SECONDARY_MAXMIN_LABEL_EDGE_X = 78.5;
const SECONDARY_MAXMIN_LABEL_Y = 92;

/* Off-priority disc radius (the value graphics are blanked and the face
   becomes a flat frame-secondary disc — track and face merge into one color,
   while ticks, labels, advices and the regular-colored setpoint remain). */
const OFF_DISC_RADIUS = BAND_OUTER_RADIUS + 24;

/** Cap for full-circle arcs so start and end never coincide in path space. */
const FULL_CIRCLE_EPSILON_DEG = 0.05;

/** Intervals producing more tickmarks than this are ignored (runaway guard). */
const MAX_INTERVAL_TICKMARKS = 1000;

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
 *   the scale midpoint/zero, growing toward either side). The watch face is
 *   always a complete background circle — the sector only limits the
 *   scale/track arc inside it.
 * - **Label alignment**: `outside` (default), `inside`
 *   (labels inside the ring), and `max-min` (only the min/max labels).
 * - **Priority**: `regular`, `enhanced`, `medium` (category color pair via
 *   `--instrument-enhanced-*` overrides), `off` (silhouette face, value
 *   graphics hidden, setpoint and readouts remain).
 * - **Secondary value**: setting `secondaryValue` renders the
 *   primary-secondary frame — the track splits into a narrowed primary band
 *   lane and a secondary line lane with its own track, and a second readout
 *   renders with a divider.
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
 *   legible.
 *
 * ## Slots
 *
 * | Slot   | Purpose                                                                                                 |
 * | ------ | ------------------------------------------------------------------------------------------------------- |
 * | `icon` | Device symbol shown above the readout, scaled with the face (e.g. `<obi-placeholder-device-on useCssColor>`). |
 *
 * @slot icon - Device symbol shown above the readout, scaled with the face
 *   (e.g. `<obi-placeholder-device-on useCssColor>` for the device-token
 *   styling).
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
  /** Instrument state (active, loading, off). `priority: off` also renders the off face. */
  @property({type: String}) state: InstrumentState = InstrumentState.active;
  @property({type: String}) sector: GaugeRadialProportionalSector =
    GaugeRadialProportionalSector.deg270;
  @property({type: String}) alignment: GaugeRadialProportionalAlignment =
    GaugeRadialProportionalAlignment.outside;
  @property({type: String}) priority: GaugeRadialProportionalPriority =
    GaugeRadialProportionalPriority.regular;
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
  /** @availableWhen hasReadout==true */
  @property({type: String}) label = '';
  /** @availableWhen hasReadout==true */
  @property({type: String}) unit = '';
  /** @availableWhen secondaryValue!=undefined */
  @property({type: String}) secondaryLabel = '';
  /** @availableWhen secondaryValue!=undefined */
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

  /** The Figma off face: flat disc, regular-colored setpoint. Priority-only. */
  private get isOff(): boolean {
    return this.priority === GaugeRadialProportionalPriority.off;
  }

  private get isValueGraphicsHidden(): boolean {
    return (
      this.isOff ||
      this.state === InstrumentState.off ||
      this.state === InstrumentState.loading
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

  /** Whether the primary-secondary (split-track) frame renders. */
  private get isSplit(): boolean {
    return this.secondaryValue !== undefined;
  }

  private get barAreas(): WatchBarArea[] {
    if (this.isValueGraphicsHidden || this.isSplit) {
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
    // Inside labels track the inner ring, so on the full circle the bottom
    // (180°) interval label would sit on the center name/readout cluster —
    // the design keeps only the min label there (Inside/360 variants).
    const suppressIntervalLabels =
      (this.alignment === GaugeRadialProportionalAlignment.maxMin &&
        !this.isFullCircle) ||
      (this.alignment === GaugeRadialProportionalAlignment.inside &&
        this.isFullCircle);

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
        !Number.isFinite(interval) ||
        (this.maxValue - this.minValue) / interval > MAX_INTERVAL_TICKMARKS
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
    addTickmarksAtInterval(
      this.secondaryTickmarkInterval,
      TickmarkType.secondary
    );

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

  /**
   * The fill-origin anchor stub (the design's "zero-line") — rendered
   * whenever the origin sits away from the scale ends: the full circle
   * (origin = min at 12 o'clock) and the pos/neg sector (origin =
   * zero/midpoint). The plain 270 sector anchors at the scale start, which
   * needs no stub. It follows the band color, so it repaints with priority.
   */
  private renderZeroLine() {
    const hasAnchoredOrigin =
      this.isFullCircle ||
      this.sector === GaugeRadialProportionalSector.deg270PosNeg;
    if (!hasAnchoredOrigin || this.isValueGraphicsHidden) {
      return nothing;
    }
    // In the split frame the stub stops at the narrowed band's inner edge;
    // the secondary lane gets its own small stub (see renderSplitFrame).
    const innerRadius = this.isSplit
      ? PRIMARY_SUBBAND_INNER_RADIUS - 0.5
      : ZERO_LINE_INNER_RADIUS;
    return svg`
      <rect
        transform="rotate(${this.mapAngle(this.fillOriginValue)})"
        x="${-ZERO_LINE_WIDTH / 2}" y="${-ZERO_LINE_OUTER_RADIUS}"
        width="${ZERO_LINE_WIDTH}"
        height="${ZERO_LINE_OUTER_RADIUS - innerRadius}"
        fill=${this.bandColor}
      />
    `;
  }

  /**
   * Track chrome of the primary-secondary frame. The watch still draws the
   * joint 112..160 track annulus; this repaints it into the split layout —
   * a face-colored gap divides the lanes, the joint round end cuts are
   * erased and each lane re-capped, the narrowed primary band is drawn at
   * its own radii, and the secondary lane gets its own fill-origin stub.
   */
  private renderSplitFrame() {
    if (!this.isSplit || this.isValueGraphicsHidden) {
      return nothing;
    }
    const facePaint = 'var(--instrument-frame-primary-color)';
    const trackPaint = 'var(--instrument-frame-secondary-color)';
    const startAngle = this.mapAngle(this.minValue);
    const endAngle = this.mapAngle(this.maxValue);
    const parts = [];

    if (this.isFullCircle) {
      parts.push(svg`
        <circle
          r=${INNER_EDGE_COVER_RADIUS}
          fill="none"
          stroke=${facePaint}
          stroke-width=${INNER_EDGE_COVER_WIDTH}
        ></circle>
        <circle
          r=${SECONDARY_LANE_RADIUS}
          fill="none"
          stroke=${trackPaint}
          stroke-width=${SECONDARY_LINE_WIDTH}
        ></circle>
        <circle
          r=${LANE_DIVIDER_RADIUS}
          fill="none"
          stroke=${facePaint}
          stroke-width=${LANE_DIVIDER_WIDTH}
        ></circle>
      `);
    } else {
      // Erase the joint round cut the watch draws at each sector end. The
      // erase is clipped to the cut's own cap circle so the face paint never
      // spills onto the page background outside the dial silhouette.
      parts.push(svg`<clipPath id="split-end-cut-clip">
        <circle
          transform="rotate(${startAngle})"
          cy=${-SILHOUETTE_CAP_CENTER_RADIUS}
          r=${SILHOUETTE_CAP_RADIUS + 0.5}
        ></circle>
        <circle
          transform="rotate(${endAngle})"
          cy=${-SILHOUETTE_CAP_CENTER_RADIUS}
          r=${SILHOUETTE_CAP_RADIUS + 0.5}
        ></circle>
      </clipPath>`);
      const endCuts: [number, number][] = [
        [startAngle - TRACK_END_OVERSHOOT_DEG, startAngle],
        [endAngle, endAngle + TRACK_END_OVERSHOOT_DEG],
      ];
      parts.push(svg`<g clip-path="url(#split-end-cut-clip)">
        ${endCuts.map(
          ([from, to]) => svg`<path
            d=${arcPath(TRACK_ERASE_CENTER_RADIUS, from, to)}
            fill="none"
            stroke=${facePaint}
            stroke-width=${TRACK_ERASE_WIDTH}
            stroke-linecap="butt"
          ></path>`
        )}
      </g>`);
      parts.push(svg`
        <path
          d=${arcPath(INNER_EDGE_COVER_RADIUS, startAngle, endAngle)}
          fill="none"
          stroke=${facePaint}
          stroke-width=${INNER_EDGE_COVER_WIDTH}
          stroke-linecap="butt"
        ></path>
        <path
          d=${arcPath(SECONDARY_LANE_RADIUS, startAngle, endAngle)}
          fill="none"
          stroke=${trackPaint}
          stroke-width=${SECONDARY_LINE_WIDTH}
          stroke-linecap="butt"
        ></path>
        <path
          d=${arcPath(LANE_DIVIDER_RADIUS, startAngle, endAngle)}
          fill="none"
          stroke=${facePaint}
          stroke-width=${LANE_DIVIDER_WIDTH}
          stroke-linecap="butt"
        ></path>
      `);
      for (const angle of [startAngle, endAngle]) {
        parts.push(svg`<g transform="rotate(${angle})">
          <circle
            cy=${-SPLIT_BAND_CENTER_RADIUS}
            r=${SPLIT_BAND_WIDTH / 2}
            fill=${trackPaint}
          ></circle>
          <circle
            cy=${-SECONDARY_LANE_RADIUS}
            r=${SECONDARY_LINE_WIDTH / 2}
            fill=${trackPaint}
          ></circle>
        </g>`);
      }
    }

    const originAngle = this.mapAngle(this.fillOriginValue);
    const bandEndAngle = this.arcEndAngle(this.clampedValue);
    if (Math.abs(bandEndAngle - originAngle) >= 0.5) {
      if (this.sector === GaugeRadialProportionalSector.deg270) {
        parts.push(svg`<circle
          transform="rotate(${originAngle})"
          cy=${-SPLIT_BAND_CENTER_RADIUS}
          r=${SPLIT_BAND_WIDTH / 2}
          fill=${this.bandColor}
        ></circle>`);
      }
      parts.push(svg`<path
        d=${arcPath(SPLIT_BAND_CENTER_RADIUS, originAngle, bandEndAngle)}
        fill="none"
        stroke=${this.bandColor}
        stroke-width=${SPLIT_BAND_WIDTH}
        stroke-linecap="butt"
      ></path>`);
    }

    if (
      this.isFullCircle ||
      this.sector === GaugeRadialProportionalSector.deg270PosNeg
    ) {
      parts.push(svg`<rect
        transform="rotate(${originAngle})"
        x="${-SECONDARY_LINE_WIDTH / 2}"
        y="${-(BAND_INNER_RADIUS + SECONDARY_LINE_WIDTH)}"
        width="${SECONDARY_LINE_WIDTH}"
        height="${SECONDARY_LINE_WIDTH}"
        fill=${this.accentColor}
      ></rect>`);
    }

    return parts;
  }

  private renderNeedle() {
    if (this.isValueGraphicsHidden) {
      return nothing;
    }
    const length =
      this.secondaryValue !== undefined
        ? PRIMARY_SUBBAND_NEEDLE_LENGTH
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
    const originAngle = this.mapAngle(this.fillOriginValue);
    const endAngle = this.arcEndAngle(this.secondaryValue);
    // Rounded start cap for the open-start sector; the shared line renders
    // the butt-capped arc with its flush round tip (and collapses to the tip
    // nub alone when the arc is too short to draw).
    const startCap =
      this.sector === GaugeRadialProportionalSector.deg270 &&
      Math.abs(endAngle - originAngle) >= 0.5
        ? svg`<circle
            transform="rotate(${originAngle})"
            cy=${-SECONDARY_LANE_RADIUS}
            r=${SECONDARY_LINE_WIDTH / 2}
            fill=${this.accentColor}
          ></circle>`
        : nothing;
    return svg`
      ${startCap}
      ${renderSecondaryLine({
        originAngle,
        endAngle,
        color: this.accentColor,
      })}
    `;
  }

  private renderSecondaryMaxMinLabels() {
    if (
      this.secondaryValue === undefined ||
      !this.showLabels ||
      this.alignment !== GaugeRadialProportionalAlignment.maxMin ||
      this.isFullCircle
    ) {
      return nothing;
    }
    return svg`
      <text
        class="secondary-scale-label"
        x=${-SECONDARY_MAXMIN_LABEL_EDGE_X}
        y=${SECONDARY_MAXMIN_LABEL_Y}
        text-anchor="start"
      >${this.minValue}</text>
      <text
        class="secondary-scale-label"
        x=${SECONDARY_MAXMIN_LABEL_EDGE_X}
        y=${SECONDARY_MAXMIN_LABEL_Y}
        text-anchor="end"
      >${this.maxValue}</text>
    `;
  }

  private renderCenterContent() {
    // The icon and name rows stay dial-anchored (%-positioned fractions of
    // the face); only the readout pair uses the shared center-readout row
    // arrangement.
    const readoutPriority = this.watchPriority;
    const entries: CenterReadoutEntry[] = [
      {
        value: this.clampedValue,
        label: this.label,
        unit: this.unit,
        fractionDigits: this.fractionDigits,
        priority: readoutPriority,
        size: ReadoutSize.large,
      },
    ];
    if (this.secondaryValue !== undefined) {
      entries.push({
        value: this.clamp(this.secondaryValue),
        label: this.secondaryLabel,
        unit: this.secondaryUnit,
        fractionDigits: this.fractionDigits,
        priority: readoutPriority,
        size: ReadoutSize.large,
      });
    }
    return html`
      <div class="icon-anchor"><slot name="icon"></slot></div>
      ${this.hasReadout
        ? html`
            <div class="readout-row">
              ${renderCenterReadouts(entries, CenterReadoutArrangement.row)}
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
    const effectiveState =
      this.priority === GaugeRadialProportionalPriority.off
        ? InstrumentState.off
        : this.state;

    const pct = (anchorY: number) =>
      `${(((anchorY - frame.y) / frame.height) * 100).toFixed(4)}%`;
    const iconAnchorY = this.hasReadout ? ICON_ANCHOR_Y : ICON_ONLY_ANCHOR_Y;
    const iconSize = this.hasReadout ? ICON_SIZE : ICON_ONLY_SIZE;
    const nameAnchorY = this.isFullCircle
      ? NAME_ANCHOR_Y_360
      : NAME_ANCHOR_Y_270;
    const iconSizePct = `${((iconSize / frame.width) * 100).toFixed(4)}%`;
    const anchors = `--icon-top: ${pct(iconAnchorY)}; --icon-size: ${iconSizePct}; --readout-top: ${pct(
      READOUT_ANCHOR_Y
    )}; --name-top: ${pct(nameAnchorY)}; --scale: ${frame.scale};`;

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
                  fill="var(--instrument-frame-secondary-color)"
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
            .setpointOverride=${this.setpointOverride || this.isOff}
            .animateSetpoint=${this.animateSetpoint}
            .tickmarks=${shownTickmarks}
            .tickmarksInside=${tickmarksInside}
            .tickmarkStyle=${this.tickmarkStyle}
            .advices=${this._advices}
            .areas=${areas}
            .watchCircleType=${WatchCircleType.double}
            .hasBackgroundCircle=${true}
            .barAreas=${this.barAreas}
            .endLabelsMaxMin=${endLabelsMaxMin}
            .arcFrame=${frame}
          ></obc-watch>
          <svg class="layer" viewBox=${frame.viewBox}>
            ${this.renderSplitFrame()} ${this.renderZeroLine()}
            ${this.renderSecondaryArc()} ${this.renderNeedle()}
            ${this.renderSecondaryMaxMinLabels()}
          </svg>
          ${this.renderCenterContent()}
        </div>
      </div>
    `;
  }

  static override styles = [unsafeCSS(componentStyle), centerReadoutStyles];
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-gauge-radial-proportional': ObcGaugeRadialProportional;
  }
}
