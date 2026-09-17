import {LitElement, css, html, nothing, svg, type SVGTemplateResult} from 'lit';
import {property} from 'lit/decorators.js';
import type {PropertyValues} from 'lit';
import {ResizeController} from '@lit-labs/observers/resize-controller.js';
import '../watch/watch.js';
import {
  WatchCircleType,
  innerRingRadiusFor,
  type WatchBarArea,
} from '../watch/watch.js';
import {Tickmark, TickmarkType} from '../watch/tickmark.js';
import {InstrumentState, Priority} from '../types.js';
import {customElement} from '../../decorator.js';
import {SetpointBundle} from '../../svghelpers/setpoint-bundle.js';
import {
  deriveRadialSetpointConfig,
  drawSetpointMarker,
  getSetpointOutwardOffset,
  SetpointVisualState,
  SETPOINT_ANIMATION_CSS_VAR,
  SETPOINT_ANIMATION_DURATION_DEFAULT,
} from '../../svghelpers/setpoint.js';
import {
  applyPinnedHostSize,
  computeRadialFrame,
  estimateLabelWidthPx,
  measureContainerPx,
  observeInnerBox,
  type RadialFrame,
} from '../../svghelpers/radial-frame.js';
import {
  linearTickInterval,
  watchfaceLinear,
} from '../../building-blocks/instrument-linear/instrument-linear.js';

export enum SurgeSwayYawType {
  /** Setpoint markers only, on a thin ring with full-length cross scales. */
  input = 'input',
  /**
   * Setpoints plus actual values: a band on the ring carries the yaw arc and
   * the cross scales become four half-columns with value bars.
   */
  inputOutput = 'input-output',
}

/**
 * Cross-column geometry, in watch SVG units. These lengths are 1:1 with the
 * Figma 512 canvas — only the ring radii carry the +4 canvas offset.
 */
/** Half-length of the full-length `input` cross scales. */
const INPUT_SCALE_HALF = 152;
/** Width of the `input` scale pill (all scale lane, no bar lane). */
const INPUT_COLUMN_WIDTH = 24;
/**
 * Scale-lane width of the `input` pill, chosen so the tick ladder starts on
 * the pill's centre line and runs toward the marker side, as in the design.
 */
const INPUT_SCALE_WIDTH = 16;
/** Width of an `input-output` half-column: 24 bar lane + 24 scale lane. */
const OUTPUT_COLUMN_WIDTH = 48;
const OUTPUT_SCALE_WIDTH = 24;
/**
 * Radius where an `input-output` half-column starts (scale value 0). Equals
 * half the column width, so adjacent pills abut edge-to-edge and their
 * rounded corners form the design's centre gap.
 */
const OUTPUT_COLUMN_INNER = 24;
/** Length of an `input-output` half-column (scale value 0 to ±100). */
const OUTPUT_COLUMN_LENGTH = 96;
/**
 * Tick spacing floor for the column ladders, below the shared default so the
 * columns match the design's dense 10-percent ladder.
 */
const COLUMN_TICK_MIN_SPACING = 8;
/** Values smaller than this render no bar / no yaw arc. */
const VALUE_EPSILON = 0.1;
/** Ceiling on ticks per ring ladder; a tiny interval must not stall render. */
const MAX_RING_TICKS = 720;

function clampPercent(value: number): number {
  if (!Number.isFinite(value)) {
    return 0;
  }
  return Math.max(-100, Math.min(100, value));
}

/** Yaw for rendering and at-setpoint use: non-finite → 0, clamped to ±180. */
function normalizeYaw(value: number): number {
  if (!Number.isFinite(value)) {
    return 0;
  }
  return Math.max(-180, Math.min(180, value));
}

/**
 * `<obc-surge-sway-yaw>` — Combined 3-DOF planar motion instrument: two
 * translations on a cross of linear scales and a rotation on the ring.
 *
 * Surge is shown on the vertical scale (positive = up/fore), sway on the
 * horizontal scale (positive = right/starboard), both in percent of the
 * scale (−100…+100). Yaw is an angle in degrees on the ring (0° at the top,
 * positive clockwise).
 *
 * ## Features / Variants
 * - **`type`:** `input` (default) shows only the three setpoint markers on a
 *   thin ring with full-length cross scales; `input-output` adds the actual
 *   values — a band on the ring with a yaw arc swept from 0°, and four
 *   half-columns with surge/sway bars growing from the centre.
 * - **Setpoints:** each axis has the full setpoint bundle (marker,
 *   adjustment preview via `new*Setpoint`, auto/manual at-setpoint,
 *   zero-snap, override), matching `obc-azimuth-thruster`'s angle/thrust
 *   pattern. The yaw setpoint is the ring's triangular marker; surge and
 *   sway setpoints are triangular markers beside their scales.
 * - **Ring ticks:** primary/secondary/tertiary interval configuration in
 *   degrees, with optional degree labels.
 * - **Priority:** `enhanced` switches bars, arc and markers to the blue
 *   palette.
 *
 * ## Usage Guidelines
 * Use to monitor or command planar motion in three degrees of freedom at
 * once. For attitude (pitch/roll/yaw) use `obc-pitch-roll-yaw`; for a single
 * thrust axis with direction use `obc-azimuth-thruster`.
 *
 * @property type - `input` (default) shows setpoint markers only; `input-output` adds the
 *   yaw arc on the ring band and surge/sway value bars in the cross columns.
 * @property surge - Longitudinal value in percent of the scale (−100…+100); positive is up
 *   (fore). Shown as a vertical bar in `input-output`; always feeds the surge
 *   at-setpoint detection.
 * @property sway - Transverse value in percent of the scale (−100…+100); positive is right
 *   (starboard). Shown as a horizontal bar in `input-output`; always feeds
 *   the sway at-setpoint detection.
 * @property yaw - Rotation in degrees (0° at the top, positive clockwise, clamped to
 *   ±180°). Shown as an arc on the ring band in `input-output`; always feeds
 *   the yaw at-setpoint detection.
 * @property surgeSetpoint - Surge setpoint in percent; shows a triangular marker beside the vertical
 *   scale.
 * @property newSurgeSetpoint - Surge setpoint being adjusted (focus preview marker).
 * @availableWhen newSurgeSetpoint surgeSetpoint!=undefined
 * @property atSurgeSetpoint - Manual surge at-setpoint override.
 * @availableWhen atSurgeSetpoint surgeSetpoint!=undefined && autoAtSurgeSetpoint==false
 * @property surgeSetpointAtZeroDeadband - Zero-snap tolerance for the surge setpoint marker.
 * @availableWhen surgeSetpointAtZeroDeadband surgeSetpoint!=undefined
 * @property surgeSetpointOverride - Derive the surge marker color from `priority` regardless of `state`.
 * @availableWhen surgeSetpointOverride surgeSetpoint!=undefined
 * @property autoAtSurgeSetpoint - Auto-detect surge at-setpoint via deadband.
 * @availableWhen autoAtSurgeSetpoint surgeSetpoint!=undefined
 * @property autoAtSurgeSetpointDeadband - Tolerance for surge at-setpoint auto-detection.
 * @availableWhen autoAtSurgeSetpointDeadband surgeSetpoint!=undefined && autoAtSurgeSetpoint==true
 * @property swaySetpoint - Sway setpoint in percent; shows a triangular marker above the horizontal
 *   scale.
 * @property newSwaySetpoint - Sway setpoint being adjusted (focus preview marker).
 * @availableWhen newSwaySetpoint swaySetpoint!=undefined
 * @property atSwaySetpoint - Manual sway at-setpoint override.
 * @availableWhen atSwaySetpoint swaySetpoint!=undefined && autoAtSwaySetpoint==false
 * @property swaySetpointAtZeroDeadband - Zero-snap tolerance for the sway setpoint marker.
 * @availableWhen swaySetpointAtZeroDeadband swaySetpoint!=undefined
 * @property swaySetpointOverride - Derive the sway marker color from `priority` regardless of `state`.
 * @availableWhen swaySetpointOverride swaySetpoint!=undefined
 * @property autoAtSwaySetpoint - Auto-detect sway at-setpoint via deadband.
 * @availableWhen autoAtSwaySetpoint swaySetpoint!=undefined
 * @property autoAtSwaySetpointDeadband - Tolerance for sway at-setpoint auto-detection.
 * @availableWhen autoAtSwaySetpointDeadband swaySetpoint!=undefined && autoAtSwaySetpoint==true
 * @property yawSetpoint - Yaw setpoint in degrees; shows the ring's triangular setpoint marker.
 * @property newYawSetpoint - Yaw setpoint being adjusted (focus preview marker).
 * @availableWhen newYawSetpoint yawSetpoint!=undefined
 * @property atYawSetpoint - Manual yaw at-setpoint override.
 * @availableWhen atYawSetpoint yawSetpoint!=undefined && autoAtYawSetpoint==false
 * @property yawSetpointAtZeroDeadband - Zero-snap tolerance for the yaw setpoint marker.
 * @availableWhen yawSetpointAtZeroDeadband yawSetpoint!=undefined
 * @property yawSetpointOverride - Derive the yaw marker color from `priority` regardless of `state`.
 * @availableWhen yawSetpointOverride yawSetpoint!=undefined
 * @property autoAtYawSetpoint - Auto-detect yaw at-setpoint via deadband (with 360° wraparound).
 * @availableWhen autoAtYawSetpoint yawSetpoint!=undefined
 * @property autoAtYawSetpointDeadband - Tolerance for yaw at-setpoint auto-detection.
 * @availableWhen autoAtYawSetpointDeadband yawSetpoint!=undefined && autoAtYawSetpoint==true
 * @property touching - User is physically interacting with a control; markers render in the
 *   focus state and at-setpoint detection is suppressed.
 * @availableWhen touching surgeSetpoint!=undefined || swaySetpoint!=undefined || yawSetpoint!=undefined
 * @property animateSetpoint - Animate setpoint confirm transitions (marker slides, preview fades).
 * @availableWhen animateSetpoint surgeSetpoint!=undefined || swaySetpoint!=undefined || yawSetpoint!=undefined
 * @property primaryTickmarkInterval - Interval (degrees) for primary ring ticks; undefined or <= 0 hides them.
 * @property secondaryTickmarkInterval - Interval (degrees) for secondary ring ticks; undefined or <= 0 hides them.
 * @property tertiaryTickmarkInterval - Interval (degrees) for tertiary ring ticks; undefined or <= 0 hides them.
 * @property showLabels - Show degree labels at the main and primary ring ticks.
 * @property state - Instrument state (active, loading, off).
 * @property priority - Color priority (enhanced = blue palette, regular = gray palette).
 * @property faceDiameter - Outer-ring diameter in CSS pixels. When set, the instrument renders at a
 *   fixed intrinsic size; when unset (default), it fills its container.
 * @experimental
 */
@customElement('obc-surge-sway-yaw')
export class ObcSurgeSwayYaw extends LitElement {
  private _idPrefix = `ssy-${Math.random().toString(36).slice(2, 9)}`;

  @property({type: String}) type: SurgeSwayYawType = SurgeSwayYawType.input;

  @property({type: Number}) surge = 0;
  @property({type: Number}) sway = 0;
  @property({type: Number}) yaw = 0;

  @property({type: Number}) surgeSetpoint: number | undefined;
  @property({type: Number}) newSurgeSetpoint: number | undefined;
  @property({type: Boolean}) atSurgeSetpoint = false;
  @property({type: Number}) surgeSetpointAtZeroDeadband = 0.1;
  @property({type: Boolean}) surgeSetpointOverride = false;
  @property({type: Boolean, attribute: false}) autoAtSurgeSetpoint = true;
  @property({type: Number}) autoAtSurgeSetpointDeadband = 1;

  @property({type: Number}) swaySetpoint: number | undefined;
  @property({type: Number}) newSwaySetpoint: number | undefined;
  @property({type: Boolean}) atSwaySetpoint = false;
  @property({type: Number}) swaySetpointAtZeroDeadband = 0.1;
  @property({type: Boolean}) swaySetpointOverride = false;
  @property({type: Boolean, attribute: false}) autoAtSwaySetpoint = true;
  @property({type: Number}) autoAtSwaySetpointDeadband = 1;

  @property({type: Number}) yawSetpoint: number | undefined;
  @property({type: Number}) newYawSetpoint: number | undefined;
  @property({type: Boolean}) atYawSetpoint = false;
  @property({type: Number}) yawSetpointAtZeroDeadband = 0.5;
  @property({type: Boolean}) yawSetpointOverride = false;
  @property({type: Boolean, attribute: false}) autoAtYawSetpoint = true;
  @property({type: Number}) autoAtYawSetpointDeadband = 2;

  @property({type: Boolean}) touching = false;
  @property({type: Boolean}) animateSetpoint = false;

  @property({type: Number}) primaryTickmarkInterval: number | undefined = 45;
  @property({type: Number}) secondaryTickmarkInterval: number | undefined = 15;
  @property({type: Number}) tertiaryTickmarkInterval: number | undefined = 5;
  @property({type: Boolean}) showLabels = false;

  @property({type: String}) state: InstrumentState = InstrumentState.active;
  @property({type: String}) priority: Priority = Priority.regular;

  @property({type: Number, attribute: 'face-diameter'})
  faceDiameter: number | undefined;

  private _surgeSp = new SetpointBundle({
    defaultDeadband: 1,
    defaultZeroDeadband: 0.1,
    onAnimationEnd: () => this.requestUpdate(),
  });
  private _swaySp = new SetpointBundle({
    defaultDeadband: 1,
    defaultZeroDeadband: 0.1,
    onAnimationEnd: () => this.requestUpdate(),
  });
  private _yawSp = new SetpointBundle({
    angularWraparound: true,
    onAnimationEnd: () => this.requestUpdate(),
  });

  private _frame: RadialFrame | undefined;
  private _hostSizePinned = false;
  private _resizeController = new ResizeController(this, {});

  override firstUpdated(changed: PropertyValues): void {
    super.firstUpdated(changed);
    observeInnerBox(this._resizeController, this.renderRoot);
  }

  override willUpdate(changed: PropertyValues): void {
    super.willUpdate(changed);
    this._surgeSp.sync({
      setpoint: this.surgeSetpoint,
      newSetpoint: this.newSurgeSetpoint,
      atSetpoint: this.atSurgeSetpoint,
      touching: this.touching,
      autoAtSetpoint: this.autoAtSurgeSetpoint,
      autoAtSetpointDeadband: this.autoAtSurgeSetpointDeadband,
      setpointAtZeroDeadband: this.surgeSetpointAtZeroDeadband,
      setpointOverride: this.surgeSetpointOverride,
      animateSetpoint: this.animateSetpoint,
    });
    this._swaySp.sync({
      setpoint: this.swaySetpoint,
      newSetpoint: this.newSwaySetpoint,
      atSetpoint: this.atSwaySetpoint,
      touching: this.touching,
      autoAtSetpoint: this.autoAtSwaySetpoint,
      autoAtSetpointDeadband: this.autoAtSwaySetpointDeadband,
      setpointAtZeroDeadband: this.swaySetpointAtZeroDeadband,
      setpointOverride: this.swaySetpointOverride,
      animateSetpoint: this.animateSetpoint,
    });
    this._yawSp.sync({
      setpoint: this.yawSetpoint,
      newSetpoint: this.newYawSetpoint,
      atSetpoint: this.atYawSetpoint,
      touching: this.touching,
      autoAtSetpoint: this.autoAtYawSetpoint,
      autoAtSetpointDeadband: this.autoAtYawSetpointDeadband,
      setpointAtZeroDeadband: this.yawSetpointAtZeroDeadband,
      setpointOverride: this.yawSetpointOverride,
      animateSetpoint: this.animateSetpoint,
    });
  }

  override updated(changed: PropertyValues): void {
    super.updated(changed);
    this._hostSizePinned = applyPinnedHostSize(
      this,
      this._frame,
      this._hostSizePinned
    );
  }

  override disconnectedCallback(): void {
    super.disconnectedCallback();
    this._surgeSp.dispose();
    this._swaySp.dispose();
    this._yawSp.dispose();
  }

  private get isInputOutput(): boolean {
    return this.type === SurgeSwayYawType.inputOutput;
  }

  private get isActive(): boolean {
    return this.state === InstrumentState.active;
  }

  private get isEnhanced(): boolean {
    return this.priority === Priority.enhanced;
  }

  private get barFillColor(): string {
    return this.isEnhanced
      ? 'var(--instrument-enhanced-secondary-color)'
      : 'var(--instrument-regular-secondary-color)';
  }

  private get arcFillColor(): string {
    return this.isEnhanced
      ? 'var(--instrument-enhanced-tertiary-color)'
      : 'var(--instrument-regular-tertiary-color)';
  }

  private getTickmarks(): Tickmark[] {
    const tickmarks: Tickmark[] = [];
    const skipAngles: number[] = [];

    const labelText = (angle: number): string | undefined => {
      if (!this.showLabels) return undefined;
      return angle <= 180 ? `${angle}` : `${angle - 360}`;
    };

    for (const angle of [0, 90, 180, 270]) {
      tickmarks.push({
        angle,
        type: TickmarkType.main,
        text: labelText(angle),
      });
      skipAngles.push(angle);
    }

    const addInterval = (
      interval: number | undefined,
      type: TickmarkType,
      withLabels = false
    ) => {
      if (interval === undefined || interval <= 0 || !Number.isFinite(interval))
        return;
      if (360 / interval > MAX_RING_TICKS) return;
      for (let i = interval; i < 360; i += interval) {
        if (skipAngles.includes(i)) continue;
        tickmarks.push({
          angle: i,
          type,
          text: withLabels ? labelText(i) : undefined,
        });
        skipAngles.push(i);
      }
    };

    addInterval(this.primaryTickmarkInterval, TickmarkType.primary, true);
    addInterval(this.secondaryTickmarkInterval, TickmarkType.secondary);
    addInterval(this.tertiaryTickmarkInterval, TickmarkType.tertiary);

    return tickmarks;
  }

  /** Yaw arc on the ring band, swept from 0° to the (clamped) yaw value. */
  private getBarAreas(): WatchBarArea[] {
    if (!this.isInputOutput || !this.isActive) {
      return [];
    }
    const yaw = normalizeYaw(this.yaw);
    if (Math.abs(yaw) < VALUE_EPSILON) {
      return [];
    }
    return [
      {
        startAngle: Math.min(0, yaw),
        endAngle: Math.max(0, yaw),
        fillColor: this.arcFillColor,
        innerRadius: innerRingRadiusFor(WatchCircleType.doubleThin),
      },
    ];
  }

  /**
   * Both half-columns (or the single full-length pill) of one axis, in the
   * vertical template orientation: values increase upward, scale lane on
   * +x. The sway axis renders the same template under `scale(1,-1)
   * rotate(90)`, which maps up→right and keeps the scale lane on top.
   */
  private axisColumns(value: number, key: string): SVGTemplateResult {
    const container = 'var(--instrument-frame-primary-color)';
    const off = this.state === InstrumentState.off;
    const baseOptions = {
      hideContainer: false,
      off,
      priority: this.priority,
      hideTrack: true,
    };

    if (!this.isInputOutput) {
      const gauge = watchfaceLinear(
        {
          height: INPUT_SCALE_HALF * 2,
          width: INPUT_COLUMN_WIDTH,
          scaleWidth: INPUT_SCALE_WIDTH,
          minValue: -100,
          maxValue: 100,
        },
        [],
        undefined,
        {container},
        {...baseOptions, maskId: `${this._idPrefix}-${key}`},
        {
          mainTickmarks: [0],
          secondaryTickmarkInterval: linearTickInterval(
            INPUT_SCALE_HALF * 2,
            100,
            COLUMN_TICK_MIN_SPACING
          ),
        },
        []
      );
      return svg`<g>${gauge}</g>`;
    }

    const interval = linearTickInterval(
      OUTPUT_COLUMN_LENGTH * 2,
      100,
      COLUMN_TICK_MIN_SPACING
    );
    const v = clampPercent(value);
    const showBar = this.isActive && Math.abs(v) > VALUE_EPSILON;
    const foreBox =
      showBar && v > 0 ? [{min: 0, max: v, fill: this.barFillColor}] : [];
    const aftBox =
      showBar && v < 0 ? [{min: v, max: 0, fill: this.barFillColor}] : [];
    const columnDims = {
      height: OUTPUT_COLUMN_LENGTH,
      width: OUTPUT_COLUMN_WIDTH,
      scaleWidth: OUTPUT_SCALE_WIDTH,
    };
    const ticks = {
      mainTickmarks: [],
      secondaryTickmarkInterval: interval,
    };
    const fore = watchfaceLinear(
      {...columnDims, minValue: 0, maxValue: 100},
      foreBox,
      undefined,
      {container},
      {...baseOptions, maskId: `${this._idPrefix}-${key}-fore`},
      ticks,
      []
    );
    const aft = watchfaceLinear(
      {...columnDims, minValue: -100, maxValue: 0},
      aftBox,
      undefined,
      {container},
      {...baseOptions, maskId: `${this._idPrefix}-${key}-aft`},
      ticks,
      []
    );
    const offset = OUTPUT_COLUMN_INNER + OUTPUT_COLUMN_LENGTH / 2;
    return svg`
      <g transform="translate(0 ${-offset})">${fore}</g>
      <g transform="translate(0 ${offset})">${aft}</g>
    `;
  }

  /** Scale position (SVG units from centre) for a percent value. */
  private scalePos(value: number): number {
    const v = clampPercent(value);
    if (!this.isInputOutput) {
      return (v / 100) * INPUT_SCALE_HALF;
    }
    const sign = v < 0 ? -1 : 1;
    return (
      sign * (OUTPUT_COLUMN_INNER + (Math.abs(v) / 100) * OUTPUT_COLUMN_LENGTH)
    );
  }

  /** Distance from the axis to a column's scale-lane outer edge. */
  private get laneEdge(): number {
    return this.isInputOutput
      ? OUTPUT_COLUMN_WIDTH / 2
      : INPUT_COLUMN_WIDTH / 2;
  }

  /**
   * Triangular setpoint marker for one linear axis, mirroring the watch's
   * radial setpoint rendering (dimmed original + focus preview + departing
   * fade-out) with translate-based positioning.
   */
  private renderLinearSetpoint(
    bundle: SetpointBundle,
    value: number,
    id: string,
    place: (pos: number, outward: number) => string
  ): SVGTemplateResult | typeof nothing {
    const setpoint = bundle.setpoint;
    if (setpoint === undefined) {
      return nothing;
    }

    const derived = deriveRadialSetpointConfig({
      state: this.state,
      priority: this.priority,
      atSetpoint: bundle.computeAtSetpoint(value),
      angleSetpoint: setpoint,
      setpointAtZeroDeadband: bundle.setpointAtZeroDeadband,
      newAngleSetpoint: bundle.newSetpoint,
      touching: this.touching,
      setpointOverride: bundle.setpointOverride,
    });
    const {visualState, colorMode, disabled, hasNewSetpoint} = derived;

    const outward = getSetpointOutwardOffset(visualState);
    const opacity = hasNewSetpoint ? 0.75 : 1;
    const marker = drawSetpointMarker({
      visualState,
      colorMode,
      disabled,
      id,
    });
    const transform = place(this.scalePos(setpoint), outward);

    const original = this.animateSetpoint
      ? svg`
        <g style="transform: ${transform}; opacity: ${opacity}; transition: transform var(${SETPOINT_ANIMATION_CSS_VAR}, ${SETPOINT_ANIMATION_DURATION_DEFAULT}) ease-out, opacity var(${SETPOINT_ANIMATION_CSS_VAR}, ${SETPOINT_ANIMATION_DURATION_DEFAULT}) ease-out;">
          ${marker}
        </g>
      `
      : svg`
        <g style="transform: ${transform}" opacity=${opacity}>
          ${marker}
        </g>
      `;

    const hasDeparting = bundle.departingNewSetpoint !== undefined;
    if (hasNewSetpoint || hasDeparting) {
      const newValue = hasNewSetpoint
        ? bundle.newSetpoint!
        : bundle.departingNewSetpoint!;
      const targetOpacity = hasNewSetpoint ? 1 : 0;
      const focusOutward = getSetpointOutwardOffset(SetpointVisualState.focus);
      const newMarker = drawSetpointMarker({
        visualState: SetpointVisualState.focus,
        colorMode,
        disabled: false,
        id: `${id}-new`,
      });
      const newTransform = place(this.scalePos(newValue), focusOutward);
      const fade = this.animateSetpoint
        ? `transition: opacity var(${SETPOINT_ANIMATION_CSS_VAR}, ${SETPOINT_ANIMATION_DURATION_DEFAULT}) ease-out;`
        : '';
      return svg`
        ${original}
        <g style="transform: ${newTransform}; opacity: ${targetOpacity}; ${fade}">
          ${newMarker}
        </g>
      `;
    }

    return original;
  }

  private renderLinearSetpoints(): SVGTemplateResult {
    // Surge marker sits right of the vertical scale, tip pointing left;
    // sway marker sits above the horizontal scale, tip pointing down.
    const edge = this.laneEdge;
    const surge = this.renderLinearSetpoint(
      this._surgeSp,
      clampPercent(this.surge),
      `${this._idPrefix}-surge-sp`,
      (pos, outward) =>
        `translate(${edge + outward}px, ${-pos}px) rotate(90deg)`
    );
    const sway = this.renderLinearSetpoint(
      this._swaySp,
      clampPercent(this.sway),
      `${this._idPrefix}-sway-sp`,
      (pos, outward) => `translate(${pos}px, ${-(edge + outward)}px)`
    );
    return svg`${surge}${sway}`;
  }

  override render() {
    const tickmarks = this.getTickmarks();
    const frame = computeRadialFrame({
      basePadding: 24,
      labelWidthPx: this.showLabels
        ? estimateLabelWidthPx(tickmarks.map((t) => t.text))
        : 0,
      containerPx: measureContainerPx(this),
      faceDiameter: this.faceDiameter,
    });
    this._frame = frame;
    const shownTickmarks = frame.labelsHidden
      ? tickmarks.map((t) => ({...t, text: undefined}))
      : tickmarks;

    return html`
      <div class="container">
        <obc-watch
          .arcFrame=${frame}
          .watchCircleType=${this.isInputOutput
            ? WatchCircleType.doubleThin
            : WatchCircleType.single}
          .tickmarks=${shownTickmarks}
          .crosshairEnabled=${true}
          .state=${this.state}
          .priority=${this.priority}
          .barAreas=${this.getBarAreas()}
          .angleSetpoint=${this.yawSetpoint}
          .newAngleSetpoint=${this.newYawSetpoint}
          .atAngleSetpoint=${this._yawSp.computeAtSetpoint(
            normalizeYaw(this.yaw)
          )}
          .angleSetpointAtZeroDeadband=${this.yawSetpointAtZeroDeadband}
          .setpointOverride=${this.yawSetpointOverride}
          .touching=${this.touching}
          .animateSetpoint=${this.animateSetpoint}
        ></obc-watch>
        <svg viewBox=${frame.viewBox}>
          <g>${this.axisColumns(this.surge, 'surge')}</g>
          <g transform="scale(1,-1) rotate(90)">
            ${this.axisColumns(this.sway, 'sway')}
          </g>
          ${this.renderLinearSetpoints()}
        </svg>
      </div>
    `;
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
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-surge-sway-yaw': ObcSurgeSwayYaw;
  }
}
