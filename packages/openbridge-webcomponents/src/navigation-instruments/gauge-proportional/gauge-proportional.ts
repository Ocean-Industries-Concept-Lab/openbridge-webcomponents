import {
  html,
  LitElement,
  nothing,
  PropertyValues,
  svg,
  unsafeCSS,
  type TemplateResult,
} from 'lit';
import {property} from 'lit/decorators.js';
import {classMap} from 'lit/directives/class-map.js';
import {ResizeController} from '@lit-labs/observers/resize-controller.js';
import componentStyle from './gauge-proportional.css?inline';
import {customElement} from '../../decorator.js';
import {InstrumentState, Priority} from '../types.js';
import {SetpointMixin} from '../../svghelpers/setpoint-mixin.js';
import {AdviceState, AdviceType, AngleAdviceRaw} from '../watch/advice.js';
import '../watch/watch.js';
import {OUTER_RING_RADIUS, WatchCircleType} from '../watch/watch.js';
import {
  BAND_INNER_RADIUS,
  BAND_OUTER_RADIUS,
  PRIMARY_SUBBAND_INNER_RADIUS,
  PRIMARY_SUBBAND_NEEDLE_LENGTH,
  SECONDARY_LINE_WIDTH,
  renderSecondaryLine,
} from '../watch/secondary-lane.js';
import type {WatchArea, WatchBarArea, WatchNeedle} from '../watch/watch.js';
import {roundedArch} from '../../svghelpers/roundedArch.js';
import {buildIntervalTickmarks, TickmarkStyle} from '../watch/tickmark.js';
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
import {
  IdTagOrientation,
  type AutomationButtonReadoutStack,
} from '../../components/automation-button-readout-stack/automation-button-readout-stack.js';

export enum GaugeProportionalSector {
  deg360 = '360',
  deg270 = '270',
  deg270PosNeg = '270-pos-neg',
}

export enum GaugeProportionalAlignment {
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
export enum GaugeProportionalPriority {
  regular = 'regular',
  enhanced = 'enhanced',
  medium = 'medium',
  off = 'off',
}

export interface GaugeProportionalAdvice {
  minValue: number;
  maxValue: number;
  type: AdviceType;
  hinted: boolean;
}

/* Band geometry: the value band fills the 112..160 track annulus, like the
   watch bar areas. The primary-secondary frame renders through the watch's
   `splitBand` lane tracks (secondary line 112..120, face divider 120..128,
   narrowed primary lane 128..160), with bars and needle as watch inputs. */

/* Fill-origin anchor stub (the design's "zero-line"): a band-colored bar at
   the origin angle spanning the band and the scale ring, overshooting each by
   half a unit so it caps the ring strokes. It scales with the face, unlike
   the fixed-width tickmarks. */
const ZERO_LINE_WIDTH = 9;
const ZERO_LINE_OUTER_RADIUS = OUTER_RING_RADIUS + 0.5;
const ZERO_LINE_INNER_RADIUS = BAND_INNER_RADIUS - 0.5;

/* Center-content anchors in SVG units (center origin), from the 512-canvas
   design (automation-gauge-readout): icon (72x72) at -50, readout row at
   +26, name row at +88 (full circle) / +120 (270 sectors). Icon-only faces
   center a 144x144 icon. Icons scale with the face, readouts are fixed-px. */
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

/* Compact face crop: the design crops the 512 watch canvas to ~392 units
   (512 × (1 − 2 × 0.1542)), i.e. 12 units of padding beyond the 184-unit
   outer ring — no label reserve; the end labels sit inside the dial. */
const COMPACT_BASE_PADDING = 12;

/* Compact primary max-min labels (the design's "Labels-radial-sector-end",
   7.29%-inset layer): corner label boxes hanging under the sector-end cuts.
   Anchors calibrated against the 240px design render — text ink spans
   ±101.3 with its center row at +126.5 (the secondary row above uses the
   shared ±78.5/+92 constants from the 17.71%-inset layer). */
const COMPACT_MAXMIN_LABEL_EDGE_X = 99;
const COMPACT_MAXMIN_LABEL_Y = 121.5;

/* The design's Small variant is a fixed 240×240 dial box (the 314px face
   cropped to the dial) — it never grows with its slot, so the compact face
   caps here and stays visibly smaller than a Large face in the same slot.
   `faceDiameter` still overrides via the pinned-scale path. */
const COMPACT_NATURAL_BOX_PX = 240;

/** Cap for full-circle arcs so start and end never coincide in path space. */
const FULL_CIRCLE_EPSILON_DEG = 0.05;

/**
 * `<obc-gauge-proportional>` — Radial gauge whose fill band length is
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
 * - **Sizes**: `large` renders the full frame with scale labels, in-dial
 *   readout(s) and name row. The compact default crops the face to the dial,
 *   keeps icon, band, ticks, min/max end labels and setpoint, and renders a
 *   readout stack below (`hasLabelStack`, `tag`) — one value row per value.
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
 * - The compact stack renders whole-number value rows, plus a setpoint row
 *   when `setpoint` is set. The secondary row's device icon projects
 *   through the `secondary-icon` slot.
 *
 * ## Slots
 *
 * | Slot             | Purpose                                                                                                 |
 * | ---------------- | ------------------------------------------------------------------------------------------------------- |
 * | `icon`           | Device symbol shown above the readout, scaled with the face (e.g. `<obi-placeholder-device-on useCssColor>`). |
 * | `secondary-icon` | Device-specific icon on the compact stack's secondary value row (e.g. a battery icon).                  |
 *
 * @element obc-gauge-proportional
 * @experimental
 *
 * @property secondaryValue - Secondary value shown as a thin line arc at the band's inner edge with a
 *   second readout (the "primary-secondary" frame type). When undefined
 *   (default), the regular single-value frame renders.
 * @property state - Instrument state (active, loading, off). `priority: off` also renders the off face.
 * @property primaryTickmarkInterval - Interval for primary tickmarks in value units.
 *   When undefined or <= 0, no primary tickmarks are shown.
 * @property secondaryTickmarkInterval - Interval for secondary tickmarks in value units.
 *   When undefined or <= 0, no secondary tickmarks are shown.
 * @property advices - Caution/alert arcs in value units.
 * @property hasReadout - When `true`, shows the center readout (and the secondary readout when
 *   the split frame renders — dashed until `secondaryValue` is set).
 *   Default `false`.
 * @availableWhen hasReadout large==true
 * @availableWhen label hasReadout==true
 * @property unit - Unit for the in-dial readout (large) and the compact stack rows.
 * @availableWhen unit hasReadout==true
 * @availableWhen secondaryLabel secondaryValue!=undefined
 * @availableWhen secondaryUnit secondaryValue!=undefined
 * @property name - Name row shown under the readout (uppercase overline style).
 * @availableWhen name large==true
 * @property faceDiameter - Outer-ring diameter in CSS pixels. When set, the instrument renders at a
 *   fixed intrinsic size; when unset (default), it fills its container.
 * @availableWhen alignment large==true
 * @availableWhen fractionDigits hasReadout==true
 * @property large - The design's Large variant: `alignment`-controlled scale labels, in-dial
 *   readouts and the name row. When `false` (default), the Small variant
 *   renders — the face cropped to the dial with icon-only center content and
 *   a readout stack below. The Large face fills its container (or
 *   `faceDiameter`); the Small face shrinks with a tight slot but caps at
 *   the design's natural 240px dial box, so it always reads smaller than a
 *   Large face in the same slot.
 * @property hasLabelStack - Render the readout stack below the face in the compact variant.
 * @availableWhen hasLabelStack large==false
 * @property tag - Identifier line under the compact readout stack, e.g. '#0001'.
 * @availableWhen tag large==false
 * @slot icon - Device symbol shown above the readout, scaled with the face
 *   (e.g. `<obi-placeholder-device-on useCssColor>` for the device-token
 *   styling).
 * @slot secondary-icon - Device-specific icon on the compact stack's secondary value row
 */
@customElement('obc-gauge-proportional')
export class ObcGaugeProportional extends SetpointMixin(LitElement) {
  @property({type: Number}) value = 0;
  @property({type: Number}) maxValue = 100;
  @property({type: Number}) minValue = 0;
  @property({type: Number}) secondaryValue: number | undefined;
  @property({type: String}) state: InstrumentState = InstrumentState.active;
  @property({type: String}) sector: GaugeProportionalSector =
    GaugeProportionalSector.deg270;
  @property({type: String}) alignment: GaugeProportionalAlignment =
    GaugeProportionalAlignment.outside;
  @property({type: String}) priority: GaugeProportionalPriority =
    GaugeProportionalPriority.regular;
  @property({type: Boolean}) showLabels: boolean = false;
  @property({type: Number}) primaryTickmarkInterval: number | undefined = 50;
  @property({type: Number}) secondaryTickmarkInterval: number | undefined = 10;
  @property({type: String}) tickmarkStyle: TickmarkStyle =
    TickmarkStyle.regular;
  @property({type: Array, attribute: false})
  advices: GaugeProportionalAdvice[] = [];
  @property({type: Boolean}) hasReadout = false;
  @property({type: String}) label = '';
  @property({type: String}) unit = '';
  @property({type: String}) secondaryLabel = '';
  @property({type: String}) secondaryUnit = '';
  @property({type: Number}) fractionDigits = 0;
  @property({type: String}) name = '';
  @property({type: Number, attribute: 'face-diameter', reflect: true})
  faceDiameter: number | undefined;
  @property({type: Boolean}) large = false;
  @property({type: Boolean, attribute: false}) hasLabelStack = true;
  @property({type: String}) tag = '';

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
      this.large ? this._frame : undefined,
      this._hostSizePinned
    );
  }

  private get sectorAngles(): {sweep: number; start: number} {
    if (this.sector === GaugeProportionalSector.deg360) {
      return {sweep: 360, start: 0};
    }
    return {sweep: 270, start: -135};
  }

  private get isFullCircle(): boolean {
    return this.sector === GaugeProportionalSector.deg360;
  }

  /** Compact always uses the max-min end-label layout; `alignment` applies when large. */
  private get effectiveAlignment(): GaugeProportionalAlignment {
    return this.large ? this.alignment : GaugeProportionalAlignment.maxMin;
  }

  /**
   * Fixed-px height the compact readout stack needs below the face — a fit
   * allowance (column gap + 16px setpoint row + 24px per value row + 16px
   * tag line), matching the stack's fixed typography.
   */
  private get compactStackAllowancePx(): number {
    if (!this.hasLabelStack) {
      return 0;
    }
    return (
      8 +
      (this.setpoint !== undefined ? 16 : 0) +
      this.labelStackReadouts.filter((r) => r.type === 'value').length * 24 +
      (this.tag ? 16 : 0)
    );
  }

  /**
   * The compact face fits the largest square inside the container once the
   * stack's fixed height is reserved, capped at the design's natural
   * 240px dial box — the Small variant shrinks with a tight slot but never
   * grows past its design size, keeping it smaller than a Large face in the
   * same slot. Falls back to width-driven sizing when no usable height is
   * measured (auto-height hosts size themselves from the content).
   */
  private get compactContainerPx(): {width: number; height: number} {
    const {width, height} = measureContainerPx(this);
    const dialHeight = height - this.compactStackAllowancePx;
    const fit = height > 0 ? Math.min(width, Math.max(0, dialHeight)) : width;
    const side = Math.min(fit, COMPACT_NATURAL_BOX_PX);
    return {width: side, height: side};
  }

  /** The Figma off face: flat disc, regular-colored setpoint. Priority-only. */
  private get isOff(): boolean {
    return this.priority === GaugeProportionalPriority.off;
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
    if (this.sector !== GaugeProportionalSector.deg270PosNeg) {
      return this.minValue;
    }
    if (this.minValue < 0 && this.maxValue > 0) {
      return 0;
    }
    return (this.minValue + this.maxValue) / 2;
  }

  private get watchPriority(): Priority {
    return this.priority === GaugeProportionalPriority.enhanced ||
      this.priority === GaugeProportionalPriority.medium
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

  /**
   * Whether the primary-secondary (split-track) frame renders. Device
   * subclasses with an explicit Double type extend this so the split frame
   * can render ahead of the secondary data.
   */
  protected get isSplit(): boolean {
    return this.secondaryValue !== undefined;
  }

  private get barAreas(): WatchBarArea[] {
    if (this.isValueGraphicsHidden) {
      return [];
    }
    const startAngle = this.mapAngle(this.fillOriginValue);
    const endAngle = this.arcEndAngle(this.clampedValue);
    if (this.isSplit) {
      // The watch clips split bars to the primary lane and overshoots sector
      // cuts, so the flush fillet trim needs no consumer geometry.
      if (Math.abs(endAngle - startAngle) < 0.5) {
        return [];
      }
      return [
        {
          startAngle,
          endAngle,
          fillColor: this.bandColor,
          innerRadius: PRIMARY_SUBBAND_INNER_RADIUS,
        },
      ];
    }
    return [{startAngle, endAngle, fillColor: this.bandColor}];
  }

  private get tickmarks(): Tickmark[] {
    // Inside labels track the inner ring, so on the full circle the bottom
    // (180°) interval label would sit on the center name/readout cluster —
    // the design keeps only the min label there (Inside/360 variants).
    const suppressIntervalLabels =
      (this.effectiveAlignment === GaugeProportionalAlignment.maxMin &&
        !this.isFullCircle) ||
      (this.effectiveAlignment === GaugeProportionalAlignment.inside &&
        this.isFullCircle);
    return buildIntervalTickmarks({
      minValue: this.minValue,
      maxValue: this.maxValue,
      mapAngle: (v) => this.mapAngle(v),
      primaryInterval: this.primaryTickmarkInterval,
      secondaryInterval: this.secondaryTickmarkInterval,
      showLabels: this.showLabels,
      suppressIntervalLabels,
      suppressMaxEndLabel: this.isFullCircle,
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

  /**
   * The fill-origin anchor stub (the design's "zero-line") — rendered
   * whenever the origin sits away from the scale ends: the full circle
   * (origin = min at 12 o'clock) and the pos/neg sector (origin =
   * zero/midpoint). The plain 270 sector anchors at the scale start, which
   * needs no stub. It follows the band color, so it repaints with priority.
   */
  private renderZeroLine() {
    const hasAnchoredOrigin =
      this.isFullCircle || this.sector === GaugeProportionalSector.deg270PosNeg;
    if (!hasAnchoredOrigin || this.isValueGraphicsHidden) {
      return nothing;
    }
    // In the split frame the stub stops at the narrowed band's inner edge;
    // the secondary lane gets its own small stub (renderSecondaryOriginNub).
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
   * The secondary lane's track silhouette: a rounded arch whose half-width
   * fillets collapse the sector cuts to an inscribed round tip. Shared by
   * the lane track redraw and the secondary value line's clip.
   */
  private get secondaryLaneArch(): string {
    return roundedArch({
      startAngle: this.mapAngle(this.minValue),
      endAngle: this.mapAngle(this.maxValue),
      R: BAND_INNER_RADIUS + SECONDARY_LINE_WIDTH,
      r: BAND_INNER_RADIUS,
      roundOutsideCut: true,
      roundInsideCut: true,
      roundRadius: SECONDARY_LINE_WIDTH / 2,
    });
  }

  /** The secondary lane's fill-origin nub (full circle and pos/neg sectors). */
  private renderSecondaryOriginNub() {
    if (
      !this.isSplit ||
      this.isValueGraphicsHidden ||
      (!this.isFullCircle &&
        this.sector !== GaugeProportionalSector.deg270PosNeg)
    ) {
      return nothing;
    }
    return svg`<rect
      transform="rotate(${this.mapAngle(this.fillOriginValue)})"
      x="${-SECONDARY_LINE_WIDTH / 2}"
      y="${-(BAND_INNER_RADIUS + SECONDARY_LINE_WIDTH)}"
      width="${SECONDARY_LINE_WIDTH}"
      height="${SECONDARY_LINE_WIDTH}"
      fill=${this.accentColor}
    ></rect>`;
  }

  private get needles(): WatchNeedle[] {
    if (this.isValueGraphicsHidden) {
      return [];
    }
    return [
      {
        angle: this.mapAngle(this.clampedValue),
        fillColor: this.accentColor,
        strokeColor: this.bandColor,
        ...(this.isSplit ? {length: PRIMARY_SUBBAND_NEEDLE_LENGTH} : {}),
      },
    ];
  }

  private renderSecondaryArc() {
    if (this.secondaryValue === undefined || this.isValueGraphicsHidden) {
      return nothing;
    }
    const originAngle = this.mapAngle(this.fillOriginValue);
    const endAngle = this.arcEndAngle(this.secondaryValue);
    if (this.isFullCircle) {
      return renderSecondaryLine({
        originAngle,
        endAngle,
        color: this.accentColor,
      });
    }
    // Overshoot the sector cut by the same 4° the watch uses for split
    // bars, so the lane clip trims the line flush into the arch tip.
    const drawOriginAngle =
      this.sector === GaugeProportionalSector.deg270
        ? originAngle - 4
        : originAngle;
    return svg`
      <clipPath id="split-secondary-lane-clip">
        <path d=${this.secondaryLaneArch}></path>
      </clipPath>
      <g clip-path="url(#split-secondary-lane-clip)">
        ${renderSecondaryLine({
          originAngle: drawOriginAngle,
          endAngle,
          color: this.accentColor,
        })}
      </g>
    `;
  }

  /**
   * Compact primary min/max end labels at the design's sector-end anchors.
   * The watch's own max-min layout sits wider and lower than the compact
   * design, so the compact face strips tick label texts and draws these
   * instead.
   */
  private renderCompactMaxMinLabels() {
    if (this.large || !this.showLabels || this.isFullCircle) {
      return nothing;
    }
    return svg`
      <text
        class="secondary-scale-label"
        x=${-COMPACT_MAXMIN_LABEL_EDGE_X}
        y=${COMPACT_MAXMIN_LABEL_Y}
        text-anchor="start"
      >${this.minValue}</text>
      <text
        class="secondary-scale-label"
        x=${COMPACT_MAXMIN_LABEL_EDGE_X}
        y=${COMPACT_MAXMIN_LABEL_Y}
        text-anchor="end"
      >${this.maxValue}</text>
    `;
  }

  private renderSecondaryMaxMinLabels() {
    if (
      !this.isSplit ||
      !this.showLabels ||
      this.effectiveAlignment !== GaugeProportionalAlignment.maxMin ||
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

  /**
   * Center device symbol. The base exposes the `icon` slot; device-specific
   * subclasses (`obc-gauge-generator`, `obc-gauge-motors-and-pumps`) override
   * this to provide slot fallback content with their baked-in icon.
   */
  protected get icon(): TemplateResult {
    return html`<slot name="icon"></slot>`;
  }

  /**
   * Fallback icon for the compact stack's secondary value row when nothing
   * is slotted into `secondary-icon`. Device subclasses override this with
   * their baked-in symbol (e.g. the design's battery icon).
   */
  protected get secondaryIconFallback(): TemplateResult | typeof nothing {
    return nothing;
  }

  /** The secondary row shows an icon when a subclass bakes one or the host slots one. */
  private get hasSecondaryStackIcon(): boolean {
    return (
      this.secondaryIconFallback !== nothing ||
      this.querySelector('[slot="secondary-icon"]') !== null
    );
  }

  /**
   * Icon on the compact stack's secondary value row: a sized holder the
   * stack's `slot`-type row icon projects (a bare forwarded `<slot>` cannot
   * be sized from the stack — slot elements keep `display: contents`),
   * exposing the gauge's own `secondary-icon` slot inside.
   */
  private get secondaryStackIcon(): TemplateResult | typeof nothing {
    if (!this.hasSecondaryStackIcon) {
      return nothing;
    }
    return html`<div slot="secondary-icon" class="secondary-icon-holder">
      <slot name="secondary-icon">${this.secondaryIconFallback}</slot>
    </div>`;
  }

  private get labelStackReadouts(): AutomationButtonReadoutStack[] {
    const readouts: AutomationButtonReadoutStack[] = [];
    if (this.setpoint !== undefined) {
      readouts.push({
        type: 'setpoint',
        value: this.clamp(this.setpoint),
        nDigits: 3,
      });
    }
    readouts.push({
      type: 'value',
      value: this.clampedValue,
      nDigits: 3,
      unit: this.unit,
      direction: 'right',
      icon: 'chevron',
    });
    if (this.secondaryValue !== undefined) {
      // TODO(designer): the stack cannot render a dashed placeholder row
      // (its value type is a plain number), so unlike the in-dial readouts
      // this row appears only once secondaryValue arrives — a brief
      // dial/stack mismatch for split-type devices awaiting data.
      readouts.push({
        type: 'value',
        value: this.clamp(this.secondaryValue),
        nDigits: 3,
        unit: this.secondaryUnit,
        direction: 'right',
        icon: this.hasSecondaryStackIcon ? 'slot' : 'none',
        slotName: 'secondary-icon',
      });
    }
    return readouts;
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
    if (this.isSplit) {
      entries.push({
        value:
          this.secondaryValue === undefined
            ? null
            : this.clamp(this.secondaryValue),
        label: this.secondaryLabel,
        unit: this.secondaryUnit,
        fractionDigits: this.fractionDigits,
        priority: readoutPriority,
        size: ReadoutSize.large,
      });
    }
    return html`
      <div class="icon-anchor">${this.icon}</div>
      ${this.large && this.hasReadout
        ? html`
            <div class="readout-row">
              ${renderCenterReadouts(entries, CenterReadoutArrangement.row)}
            </div>
          `
        : nothing}
      ${this.large && this.name
        ? html`<div class="gauge-name">${this.name}</div>`
        : nothing}
    `;
  }

  override render() {
    const tickmarks = this.tickmarks;
    const compactBox = this.large ? undefined : this.compactContainerPx;
    const tickmarksInside =
      this.effectiveAlignment === GaugeProportionalAlignment.inside;
    const endLabelsMaxMin =
      this.effectiveAlignment === GaugeProportionalAlignment.maxMin;
    const areas = this.areas;
    const hasHorizontalEndLabels = tickmarks.some((t) => {
      if (t.text === undefined) {
        return false;
      }
      const angle = ((t.angle % 360) + 360) % 360;
      return Math.abs(angle - 90) < 1 || Math.abs(angle - 270) < 1;
    });
    const frame = computeRadialFrame({
      basePadding: this.large ? 48 : COMPACT_BASE_PADDING,
      labelWidthPx:
        !this.large || tickmarksInside
          ? 0
          : estimateLabelWidthPx(tickmarks.map((t) => t.text)),
      labelDropPx:
        !this.large || tickmarksInside || !hasHorizontalEndLabels
          ? 0
          : endLabelsMaxMin
            ? END_MAXMIN_LABEL_DROP_PX
            : SIDE_LABEL_DROP_PX,
      clips: {top: 0, bottom: 0, left: 0, right: 0},
      containerPx: this.large ? measureContainerPx(this) : compactBox,
      faceDiameter: this.faceDiameter,
      zoomToFitArc: false,
      areas,
      innerRadius: BAND_INNER_RADIUS,
    });
    this._frame = frame;
    const shownTickmarks =
      frame.labelsHidden || !this.large
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
      this.priority === GaugeProportionalPriority.off
        ? InstrumentState.off
        : this.state;

    const pct = (anchorY: number) =>
      `${(((anchorY - frame.y) / frame.height) * 100).toFixed(4)}%`;
    const iconAnchorY =
      this.large && this.hasReadout ? ICON_ANCHOR_Y : ICON_ONLY_ANCHOR_Y;
    const iconSize = this.large && this.hasReadout ? ICON_SIZE : ICON_ONLY_SIZE;
    const nameAnchorY = this.isFullCircle
      ? NAME_ANCHOR_Y_360
      : NAME_ANCHOR_Y_270;
    const iconSizePct = `${((iconSize / frame.width) * 100).toFixed(4)}%`;
    const anchors = `--icon-top: ${pct(iconAnchorY)}; --icon-size: ${iconSizePct}; --readout-top: ${pct(
      READOUT_ANCHOR_Y
    )}; --name-top: ${pct(nameAnchorY)}; --scale: ${frame.scale};`;

    const facePx =
      frame.hostWidthPx ??
      (compactBox && compactBox.width > 0
        ? frame.scale * frame.width
        : undefined);
    const faceStyle =
      !this.large && facePx !== undefined
        ? `width: ${facePx}px; height: ${facePx}px;`
        : nothing;
    const face = html`
      <div class="container" style=${faceStyle}>
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
          .roundBandCuts=${!this.isSplit}
          .splitBand=${this.isSplit && !this.isValueGraphicsHidden}
          .barAreas=${this.barAreas}
          .needles=${this.needles}
          .endLabelsMaxMin=${this.large && endLabelsMaxMin}
          .arcFrame=${frame}
        ></obc-watch>
        <svg class="layer" viewBox=${frame.viewBox}>
          ${this.renderZeroLine()} ${this.renderSecondaryOriginNub()}
          ${this.renderSecondaryArc()} ${this.renderCompactMaxMinLabels()}
          ${frame.labelsHidden ? nothing : this.renderSecondaryMaxMinLabels()}
        </svg>
        ${this.renderCenterContent()}
      </div>
    `;
    return html`
      <div
        class=${classMap({
          'gauge-root': true,
          compact: !this.large,
          'face-pinned': this.large && this.faceDiameter !== undefined,
          'priority-medium': this.priority === GaugeProportionalPriority.medium,
        })}
        style=${anchors}
      >
        ${this.large
          ? face
          : html`
              <div class="compact-column">
                ${face}
                ${this.hasLabelStack
                  ? html`
                      <obc-automation-button-readout-stack
                        class="label-stack"
                        .readouts=${this.labelStackReadouts}
                        .tag=${this.tag || null}
                        .idTagOrientation=${IdTagOrientation.bottom}
                        >${this
                          .secondaryStackIcon}</obc-automation-button-readout-stack
                      >
                    `
                  : nothing}
              </div>
            `}
      </div>
    `;
  }

  static override styles = [unsafeCSS(componentStyle), centerReadoutStyles];
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-gauge-proportional': ObcGaugeProportional;
  }
}
