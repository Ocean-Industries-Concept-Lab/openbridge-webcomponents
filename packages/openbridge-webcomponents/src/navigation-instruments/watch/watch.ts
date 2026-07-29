import {
  LitElement,
  PropertyValues,
  SVGTemplateResult,
  html,
  nothing,
  svg,
  unsafeCSS,
} from 'lit';
import {property, state} from 'lit/decorators.js';
import {circle} from '../../svghelpers/index.js';
import {roundedArch} from '../../svghelpers/roundedArch.js';
import {
  cssSafeAngle,
  deriveRadialSetpointConfig,
  drawSetpointMarker,
  getSetpointAnimationDurationMs,
  getSetpointOutwardOffset,
  RADIAL_SETPOINT_RADIUS,
  SetpointVisualState,
  SETPOINT_ANIMATION_CSS_VAR,
  SETPOINT_ANIMATION_DURATION_DEFAULT,
} from '../../svghelpers/setpoint.js';
import {InstrumentState, Priority} from '../types.js';
import compentStyle from './watch.css?inline';
import {ResizeController} from '@lit-labs/observers/resize-controller.js';
import {adviceMask, AngleAdviceRaw, renderAdvice} from './advice.js';
import {Tickmark, TickmarkStyle, tickmark} from './tickmark.js';
export {TickmarkStyle};
import {
  RotType,
  RotPosition,
  renderRotDots,
  renderRotBarStatic,
  renderRotBarDots,
  shortestAngularDeltaDeg,
  renderRotZeroPill,
  rotBarThresholdAngle,
  ROT_ZERO_DEADBAND_DEG,
} from '../rate-of-turn/rot-renderer.js';
export {RotType, RotPosition};
import {
  RateOfTurnController,
  disposeRotController,
} from '../rate-of-turn/rate-of-turn.controller.js';
import {
  renderLabels,
  renderNorthArrow,
  getLabelPositions,
  LabelPosition,
} from './label.js';
import {VesselImage, VesselImageSize, vesselImages} from './vessel.js';
import {renderCurrent, renderWind} from './environment.js';
import {customElement} from '../../decorator.js';
import {type ZoomToFitArcFrame} from '../../svghelpers/arc-frame.js';
import {
  applyPinnedHostSize,
  computeRadialFrame,
  estimateLabelWidthPx,
  measureContainerPx,
  NSWE_LABEL_WIDTH_PX,
  observeInnerBox,
  type RadialFrame,
} from '../../svghelpers/radial-frame.js';
export {VesselImage, VesselImageSize, vesselImages};

export enum WatchCircleType {
  single = 'single',
  double = 'double',
  doubleThin = 'doubleThin',
  triple = 'triple',
}

export interface WatchArea {
  startAngle: number;
  endAngle: number;
  roundOutsideCut: boolean;
  roundInsideCut: boolean;
}

export interface WatchBarArea {
  startAngle: number;
  endAngle: number;
  fillColor: string;
  /** Outer band radius override; defaults to the second ring (160). */
  outerRadius?: number;
  /** Inner band radius override; defaults to the third ring (112). */
  innerRadius?: number;
}

export interface WatchNeedle {
  angle: number;
  fillColor: string;
  strokeColor: string;
  /** Radial length of the needle pill; defaults to 48 (the full band). */
  length?: number;
}

export interface WatchVessel {
  size: VesselImageSize;
  transform: string;
  vesselImage: VesselImage;
}

export const OUTER_RING_RADIUS = 368 / 2;
const RING2_RADIUS = 320 / 2;
const RING3_RADIUS = 224 / 2;
const RING3B_RADIUS = 272 / 2;
const RING4_RADIUS = 176 / 2;

export function innerRingRadiusFor(type: WatchCircleType): number {
  switch (type) {
    case WatchCircleType.single:
      return RING2_RADIUS;
    case WatchCircleType.double:
      return RING3_RADIUS;
    case WatchCircleType.doubleThin:
      return RING3B_RADIUS;
    case WatchCircleType.triple:
      return RING4_RADIUS;
    default:
      throw new Error(`Unknown WatchCircleType: ${type as string}`);
  }
}

const RADIAL_SETPOINT_INWARD_ADJUST = 4;

/**
 * `<obc-watch>` - Core SVG renderer for circular/radial watch-based instruments.
 *
 * This component renders all circular instrument elements including rings, tickmarks,
 * bar areas, needles, advices, setpoints, vessel images, and environmental indicators
 * (wind/current). It serves as the foundation for compass, heading, rudder, speed-gauge,
 * and other radial navigation instruments.
 *
 * ## Setpoint Behavior
 *
 * The setpoint marker visual state is derived from the combination of `atAngleSetpoint`,
 * `angleSetpoint`, and `angleSetpointAtZeroDeadband` properties:
 *
 * - **notEqual**: Value differs from setpoint (triangular marker, offset outward)
 * - **equal**: Value matches setpoint (line marker, sits on ring)
 * - **equalZero**: Value matches setpoint at zero angle (double-line marker, offset outward)
 * - **focus**: User is actively adjusting via `newAngleSetpoint` - shows focus visual state
 *
 * ## newAngleSetpoint Pattern
 *
 * When `newAngleSetpoint` is defined, TWO setpoint markers are rendered:
 * 1. Original marker at `angleSetpoint` - dimmed (0.75 opacity)
 * 2. New marker at `newAngleSetpoint` - focus visual state, full opacity
 *
 * This enables the "adjustment preview" UX where users can see both the current
 * and proposed setpoint positions simultaneously.
 *
 * The `RADIAL_SETPOINT_INWARD_ADJUST` constant (4px) fine-tunes radial setpoint positioning
 * to match Figma designs, applied on top of visual state offsets from setpoint.ts.
 *
 * The `colorMode` property allows overriding the derived color mode (enhanced for enhanced priority,
 * regular for other states).
 *
 * ## Setpoint Animation (`animateSetpoint`)
 *
 * When `animateSetpoint` is true and a confirm occurs (`newAngleSetpoint` → `undefined`):
 * - The original setpoint slides to the new position via CSS transition
 * - The departing new-setpoint marker fades out
 * - Angular transitions always take the shortest path via accumulated
 *   CSS-safe angles (`cssSafeAngle()`), so even 350° → 10° animates +20°
 *
 * Duration: `var(--setpoint-animation-duration, 300ms)`
 *
 * Internally, `_departingNewAngleSetpoint` captures the departing angle during confirm
 * fade-out and `_animationTimer` auto-clears it after the animation duration.
 * `_setpointCssAngle` tracks the accumulated CSS angle to avoid long-way-around
 * transitions across the 0°/360° boundary.
 *
 * @experimental
 */
@customElement('obc-watch')
export class ObcWatch extends LitElement {
  private _setpointId = `watch-setpoint-${Math.random().toString(36).slice(2, 9)}`;
  private _newSetpointId = `watch-new-setpoint-${Math.random().toString(36).slice(2, 9)}`;

  /** Instrument state (active, loading, off) */
  @property({type: String}) state: InstrumentState = InstrumentState.active;
  /** Color priority (enhanced = blue palette, regular = gray palette) */
  @property({type: String}) priority: Priority = Priority.regular;
  @property({type: String}) watchCircleType: WatchCircleType =
    WatchCircleType.single;
  /**
   * When `true`, the full watch-face circle is drawn behind the dial —
   * a frame-primary fill with a tertiary outline — so partial-sector
   * instruments still read as a complete circle. In the `off` state the fill
   * is omitted (only the outline remains), keeping the off skeleton hollow.
   * With sector `areas`, the per-area arch outline is dropped; the face
   * outline takes its place.
   */
  @property({type: Boolean}) hasBackgroundCircle: boolean = false;
  @property({type: Boolean}) northArrow: boolean = false;
  @property({type: Boolean}) northArrowInside: boolean | undefined;
  /** Setpoint angle in degrees (0° = 12 o'clock) */
  @property({type: Number}) angleSetpoint: number | undefined;
  /** New setpoint being adjusted (focus mode) */
  @property({type: Number}) newAngleSetpoint: number | undefined;
  /** Whether value matches setpoint (within deadband) */
  @property({type: Boolean}) atAngleSetpoint: boolean = false;
  /** Deadband for zero detection (default 0.5°) */
  @property({type: Number}) angleSetpointAtZeroDeadband: number = 0.5;
  /** Override to derive setpoint color from priority regardless of state */
  @property({type: Boolean}) setpointOverride: boolean = false;
  @property({type: Boolean}) touching: boolean = false;

  @property({type: Boolean}) animateSetpoint: boolean = false;

  @state() private _departingNewAngleSetpoint: number | undefined;
  private _animationTimer?: ReturnType<typeof setTimeout>;

  /**
   * Accumulated CSS-safe angle for the original setpoint marker.
   * Ensures CSS rotate() transitions always take the shortest path,
   * even across the 0°/360° boundary.
   */
  private _setpointCssAngle: number = 0;

  /** Whether the setpoint CSS angle has been initialised (to skip transition on first render). */
  private _setpointCssAngleInit = false;
  /**
   * Explicit padding override in SVG units: the un-zoomed viewBox becomes
   * exactly `(176 + padding) * 2`. Setting it disables the automatic
   * width-aware label reserve (issue #1021) — the caller owns label room.
   */
  @property({type: Number}) padding: number | undefined;
  /**
   * Outer-ring diameter in CSS pixels. When set, the instrument renders at a
   * fixed intrinsic size derived from the ring, arc shape and label reserve —
   * so instruments sharing the same value have identical ring circumference
   * regardless of label width or arc extent (like obc-donut-chart's
   * fixedHeight). When unset (default), the instrument fills its container.
   */
  @property({type: Number, attribute: 'face-diameter'})
  faceDiameter: number | undefined;
  @property({type: Array, attribute: false}) areas: WatchArea[] = [];
  @property({type: Array, attribute: false}) barAreas: WatchBarArea[] = [];
  @property({type: Array, attribute: false}) needles: WatchNeedle[] = [];
  @property({type: Array, attribute: false}) tickmarks: Tickmark[] = [];
  @property({type: Boolean}) tickmarksInside: boolean = false;
  @property({type: String}) tickmarkStyle: TickmarkStyle =
    TickmarkStyle.regular;
  @property({type: Array, attribute: false}) advices: AngleAdviceRaw[] = [];
  @property({type: Boolean}) crosshairEnabled: boolean = false;
  /**
   * Cuts the crosshair out inside the inner ring, so center content (e.g.
   * center readouts) sits on a clean face.
   * @availableWhen crosshairEnabled==true
   */
  @property({type: Boolean}) crosshairCenterCutout: boolean = false;
  @property({type: Boolean}) showLabels: boolean = false;
  @property({type: Array, attribute: false}) vessels: WatchVessel[] = [];
  @property({type: Number}) windKnots: number | null = null;
  @property({type: Number}) windFromDirectionDeg: number | null = null;
  @property({type: Number}) windSymbolRadius: number | null = null;
  @property({type: String}) windColor: string | undefined;
  @property({type: Number}) current: number | null = null;
  @property({type: Number}) currentFromDirectionDeg: number | null = null;
  @property({type: Number}) currentSymbolRadius: number | null = null;
  @property({type: String}) currentColor: string | undefined;
  @property({type: Boolean}) starboardPortIndicator: boolean = false;
  /** Top clip, % of height. Ignored when `zoomToFitArc` is true. */
  @property({type: Number}) clipTop: number = 0;
  /** Bottom clip, % of height. Ignored when `zoomToFitArc` is true. */
  @property({type: Number}) clipBottom: number = 0;
  /** Left clip, % of width — horizontal counterpart of clipTop/bottom (90° sectors). Ignored when `zoomToFitArc`. */
  @property({type: Number}) clipLeft: number = 0;
  /** Right clip, % of width — horizontal counterpart of clipTop/bottom (90° sectors). Ignored when `zoomToFitArc`. */
  @property({type: Number}) clipRight: number = 0;
  /**
   * Place the horizontal end labels (±90°, e.g. min/max) below the tick instead
   * of beside it. This is the "Max-min" label placement from the radial label
   * model (External / Internal / Max-min) — see PR #903 / design discussion.
   * Currently only used by the 180° sector of `obc-gauge-radial`.
   */
  @property({type: Boolean}) endLabelsMaxMin: boolean = false;
  @property({type: Number}) scaleWindIcon: number = 1;
  @property({type: Number}) rotation: number | undefined;
  @property({type: Boolean}) zoomToFitArc: boolean = false;
  /** Pre-computed zoom-to-fit arc frame. When set, the watch skips its own `computeZoomToFitArcFrame()` call and uses these values directly. Consumer instruments (e.g. rudder, instrument-radial) should compute the frame once and pass it here to avoid redundant computation. If you pass `arcFrame`, you own keeping it in sync with `areas` / `watchCircleType` — obc-watch will NOT recompute it, so a stale frame renders stale geometry. */
  @property({attribute: false}) arcFrame: ZoomToFitArcFrame | undefined;
  @property({type: Number}) tickFadeAngle: number = 0;

  /** ROT visualization type: `'dots'` (spinning dots) or `'bar'` (arc bar with clipped dots). Undefined hides the ROT layer. */
  @property({type: String}) rotType: RotType | undefined;
  /** Track on which ROT elements are placed: `'scale'` (on the outer ring) or `'innerCircle'` (default, inside the inner ring) */
  @property({type: String}) rotPosition: RotPosition = RotPosition.innerCircle;
  /** Start angle of the ROT bar arc in degrees (0° = 12 o'clock, clockwise). Only used when `rotType` is `'bar'`. */
  @property({type: Number}) rotStartAngle: number = 0;
  /** End angle of the ROT bar arc in degrees. The bar is hidden when the difference from `rotStartAngle` is less than 0.1°. */
  @property({type: Number}) rotEndAngle: number = 0;
  /** Override priority for ROT color derivation. When set, ROT colors use this instead of the main `priority`. Useful when the ROT element has independent priority (e.g. compass per-element priority). */
  @property({type: String}) rotPriority: Priority | undefined;
  @property({type: Boolean}) rotPortStarboard: boolean = false;
  @property({type: Number}) rotAtZeroDeadband: number = ROT_ZERO_DEADBAND_DEG;
  /** Measured rate of turn in degrees per minute (the maritime/AIS convention, see ES-TRIN 2025/1 Art. 3.02 and ITU-R M.1371). Sign controls direction (positive = starboard/clockwise). When defined, this drives both the dot animation (multiplied by `rotDotAnimationFactor`) and the port/starboard direction sign. */
  @property({type: Number}) rateOfTurnDegreesPerMinute: number | undefined;
  /** Visual amplification factor applied only to the spinning-dot animation (not to bar extent). Default `18` keeps the legacy visual feel (≈1 rpm at 20°/min). */
  @property({type: Number}) rotDotAnimationFactor: number = 18;
  /**
   * @deprecated Use `rateOfTurnDegreesPerMinute` (and optionally `rotDotAnimationFactor`) instead.
   * Kept as a backward-compatible alias; takes effect only when
   * `rateOfTurnDegreesPerMinute` is `undefined`.
   */
  @property({type: Number})
  set rotationsPerMinute(value: number) {
    this._legacyRotationsPerMinute = value;
  }
  /** Legacy spin speed of the ROT dot ring, in rotations per minute (sign controls direction; positive = clockwise). */
  get rotationsPerMinute() {
    return this._legacyRotationsPerMinute;
  }
  private _legacyRotationsPerMinute = 0;
  private _rotController?: RateOfTurnController;

  /**
   * Effective rotations-per-minute for the spinning dot animation and
   * port/starboard direction sign. Resolves to:
   *   • `(rateOfTurnDegreesPerMinute / 360) * rotDotAnimationFactor` when the
   *     new physical API is in use, OR
   *   • the legacy `rotationsPerMinute` value otherwise.
   */
  private get _effectiveRpm(): number {
    if (this.rateOfTurnDegreesPerMinute != null) {
      return (
        (this.rateOfTurnDegreesPerMinute / 360) * this.rotDotAnimationFactor
      );
    }
    return this._legacyRotationsPerMinute;
  }

  private _resizeController = new ResizeController(this, {});

  override firstUpdated(changed: PropertyValues): void {
    super.firstUpdated(changed);
    observeInnerBox(this._resizeController, this.renderRoot);
  }

  override willUpdate(changed: PropertyValues): void {
    super.willUpdate(changed);

    // Push the resolved effective RPM into the live controller whenever any
    // of the inputs that compose it change.
    if (
      this._rotController &&
      (changed.has('rateOfTurnDegreesPerMinute') ||
        changed.has('rotDotAnimationFactor') ||
        changed.has('rotationsPerMinute'))
    ) {
      this._rotController.rotationsPerMinute = this._effectiveRpm;
    }

    // Detect confirm: newAngleSetpoint was defined, now undefined
    if (changed.has('newAngleSetpoint') && this.animateSetpoint) {
      const prev = changed.get('newAngleSetpoint') as number | undefined;
      if (prev !== undefined && this.newAngleSetpoint === undefined) {
        this._departingNewAngleSetpoint = prev;
        clearTimeout(this._animationTimer);
        const duration = getSetpointAnimationDurationMs(this);
        this._animationTimer = setTimeout(() => {
          this._departingNewAngleSetpoint = undefined;
        }, duration);
      }
    }
  }

  override disconnectedCallback(): void {
    super.disconnectedCallback();
    clearTimeout(this._animationTimer);
    this._rotController = disposeRotController(this, this._rotController);
  }

  override updated(changed: PropertyValues): void {
    super.updated(changed);
    this._hostSizePinned = applyPinnedHostSize(
      this,
      this.arcFrame ? undefined : this._ownFrame,
      this._hostSizePinned
    );
    const el = this.rotType
      ? this.renderRoot.querySelector('#rot-spinner')
      : null;
    if (!el) {
      this._rotController = disposeRotController(this, this._rotController);
      return;
    }
    if (!this._rotController || this._rotController.el !== el) {
      this._rotController = disposeRotController(this, this._rotController);
      this._rotController = new RateOfTurnController(
        this,
        el,
        this._effectiveRpm
      );
    }
  }

  private get innerRingRadius(): number {
    return innerRingRadiusFor(this.watchCircleType);
  }

  private _rOff = 0;

  /**
   * Set by the frame when the label reserve exceeded its cap: tick label
   * texts are dropped instead of clipped (see radial-frame.ts).
   */
  private _labelsHidden = false;

  /** The frame of the last render, when computed internally (no arcFrame). */
  private _ownFrame: RadialFrame | undefined;

  /** Whether the host size styles were set by applyPinnedHostSize. */
  private _hostSizePinned = false;

  /**
   * Radius for a dial-band edge under zoom: additive (`base + _rOff`), keeping
   * band thickness constant in SVG units. INVARIANT: every band-edge radius
   * (rings, value arc, bars, needles, inside-label `textRadius`) must go through
   * this — mixing additive and multiplicative offsets misaligns ticks, labels,
   * advice masks and arcs. The proportional experiments were removed for this
   * reason (PR #903).
   */
  private _bandRadius(base: number): number {
    return base + this._rOff;
  }

  private watchCircle(): SVGTemplateResult | SVGTemplateResult[] {
    const rings = [];
    // Full-face circle behind everything, split in two: the fill goes under
    // the rings and the outline goes on top of them — the masked track band
    // reaches exactly the face radius, so an outline drawn underneath would
    // lose its inner half wherever the band overlaps it and look thinner
    // there than across the open sector gap. In the ring branch the existing
    // outer ring already outlines the face, so only the fill applies.
    const faceFill =
      this.hasBackgroundCircle && this.state !== InstrumentState.off
        ? svg`
        <circle
          cx="0"
          cy="0"
          r="${this._bandRadius(OUTER_RING_RADIUS)}"
          fill="var(--instrument-frame-primary-color)"
          stroke="none"
        />`
        : undefined;
    const faceOutline =
      this.hasBackgroundCircle && this.areas.length > 0
        ? svg`
        <circle
          cx="0"
          cy="0"
          r="${this._bandRadius(OUTER_RING_RADIUS)}"
          fill="none"
          stroke="var(--instrument-frame-tertiary-color)"
          stroke-width="1"
          vector-effect="non-scaling-stroke"
        />`
        : undefined;
    if (this.state !== InstrumentState.off) {
      rings.push(svg`
        <circle
          cx="0"
          cy="0"
          r="${this._bandRadius(172)}"
          stroke="var(--instrument-frame-primary-color)"
          fill="none"
          stroke-width="24"
        />`);

      if (this.watchCircleType !== WatchCircleType.single) {
        const r1 = this._bandRadius(RING2_RADIUS);
        const r2 = this._bandRadius(
          this.watchCircleType === WatchCircleType.doubleThin
            ? RING3B_RADIUS
            : RING3_RADIUS
        );
        const r = (r1 + r2) / 2;
        const strokeWidth = r1 - r2;
        rings.push(
          svg`
            <circle cx="0" cy="0" r=${r} stroke="var(--instrument-frame-secondary-color)" stroke-width=${strokeWidth} fill="none" />
            <circle cx="0" cy="0" r=${r1} stroke="var(--instrument-frame-secondary-color)" stroke-width="1" fill="none" vector-effect="non-scaling-stroke" />
            <circle cx="0" cy="0" r=${r2} stroke="var(--instrument-frame-secondary-color)" stroke-width="1" fill="none" vector-effect="non-scaling-stroke" />
        `
        );
      }
      if (this.watchCircleType === WatchCircleType.triple) {
        const r1 = this._bandRadius(RING3_RADIUS);
        const r2 = this._bandRadius(RING4_RADIUS);
        const r = (r1 + r2) / 2;
        const strokeWidth = r1 - r2;
        rings.push(
          svg`<circle cx="0" cy="0" r=${r} stroke="var(--instrument-frame-primary-color)" stroke-width=${strokeWidth} fill="none" />`
        );
      }
    }

    const maskSize = Math.max(200, OUTER_RING_RADIUS + this._rOff + 50);
    let result = rings;
    if (this.areas.length > 0) {
      const areas = this.areas.map((area) => {
        const svgPath = roundedArch({
          startAngle: area.startAngle,
          endAngle: area.endAngle,
          R: this._bandRadius(OUTER_RING_RADIUS),
          r: this._bandRadius(this.innerRingRadius),
          roundOutsideCut: area.roundOutsideCut,
          roundInsideCut: area.roundInsideCut,
        });
        return svgPath;
      });
      const mask = svg`<mask id="cutMask">
        <rect x="${-maskSize}" y="${-maskSize}" width="${maskSize * 2}" height="${maskSize * 2}" fill="black" />
        ${areas.map((area) => svg`<path d=${area} fill="white" vector-effect="non-scaling-stroke" stroke="white" stroke-width="1"/>`)}
      </mask>`;
      // clipPath for ROT uses r=0 so dots at any track radius stay visible
      const rotClip = svg`<clipPath id="rot-arc-clip">${this.areas.map(
        (area) =>
          svg`<path d=${roundedArch({
            startAngle: area.startAngle,
            endAngle: area.endAngle,
            R: OUTER_RING_RADIUS + this._rOff + 20,
            r: 0,
            roundOutsideCut: area.roundOutsideCut,
            roundInsideCut: area.roundInsideCut,
          })} />`
      )}</clipPath>`;
      result = [
        mask,
        rotClip,
        ...(faceFill ? [faceFill] : []),
        svg`<g mask="url(#cutMask)">${rings}</g>`,
        ...(faceOutline ? [faceOutline] : []),
      ];
      if (!this.hasBackgroundCircle) {
        areas.forEach((area) => {
          result.push(
            svg`<path d=${area} fill="none" stroke="var(--instrument-frame-tertiary-color)" vector-effect="non-scaling-stroke"/>`
          );
        });
      }
    } else {
      if (faceFill) {
        result = [faceFill, ...rings];
      }
      if (this.state !== InstrumentState.off) {
        result.push(
          circle('outerRing', {
            radius: this._bandRadius(OUTER_RING_RADIUS),
            strokeWidth: 1,
            strokeColor: 'var(--instrument-frame-tertiary-color)',
            strokePosition: 'center',
            fillColor: 'none',
          })
        );

        result.push(svg`
          ${circle('innerRing', {
            radius: this._bandRadius(this.innerRingRadius),
            strokeWidth: 1,
            strokeColor: 'var(--instrument-frame-tertiary-color)',
            strokePosition: 'center',
            fillColor: 'none',
          })}
        `);
      } else {
        result.push(svg`
          ${circle('innerRing', {
            radius: this._bandRadius(OUTER_RING_RADIUS),
            strokeWidth: 1,
            strokeColor: 'var(--instrument-frame-tertiary-color)',
            strokePosition: 'center',
            fillColor: 'none',
          })}
        `);
      }
    }
    return result;
  }

  private _renderTickFadeDefs(): SVGTemplateResult | typeof nothing {
    if (this.tickFadeAngle <= 0 || this.areas.length === 0) return nothing;
    const area = this.areas[0];
    const arcSpan = area.endAngle - area.startAngle;
    const fade = Math.min(this.tickFadeAngle, arcSpan / 4);
    if (fade < 0.5) return nothing;

    const {startAngle, endAngle} = area;
    const R = OUTER_RING_RADIUS + this._rOff + 200;
    const toRad = (deg: number) => (deg * Math.PI) / 180;
    const px = (deg: number) => R * Math.sin(toRad(deg));
    const py = (deg: number) => -R * Math.cos(toRad(deg));

    const pieSlice = (a: number, b: number): string => {
      const x1 = px(a),
        y1 = py(a);
      const x2 = px(b),
        y2 = py(b);
      const largeArc = b - a > 180 ? 1 : 0;
      return `M 0 0 L ${x1} ${y1} A ${R} ${R} 0 ${largeArc} 1 ${x2} ${y2} Z`;
    };

    const Rm =
      (this._bandRadius(OUTER_RING_RADIUS) +
        this._bandRadius(this.innerRingRadius)) /
      2;
    const gx = (deg: number) => Rm * Math.sin(toRad(deg));
    const gy = (deg: number) => -Rm * Math.cos(toRad(deg));

    return svg`
      <defs>
        <linearGradient id="tickFadeL" gradientUnits="userSpaceOnUse"
          x1="${gx(startAngle)}" y1="${gy(startAngle)}"
          x2="${gx(startAngle + fade)}" y2="${gy(startAngle + fade)}">
          <stop offset="0" stop-color="black" />
          <stop offset="1" stop-color="white" />
        </linearGradient>
        <linearGradient id="tickFadeR" gradientUnits="userSpaceOnUse"
          x1="${gx(endAngle - fade)}" y1="${gy(endAngle - fade)}"
          x2="${gx(endAngle)}" y2="${gy(endAngle)}">
          <stop offset="0" stop-color="white" />
          <stop offset="1" stop-color="black" />
        </linearGradient>
        <mask id="tickFadeMask" maskUnits="userSpaceOnUse"
          x="${-R}" y="${-R}" width="${R * 2}" height="${R * 2}">
          <path d="${pieSlice(startAngle + fade, endAngle - fade)}" fill="white" />
          <path d="${pieSlice(startAngle, startAngle + fade)}" fill="url(#tickFadeL)" />
          <path d="${pieSlice(endAngle - fade, endAngle)}" fill="url(#tickFadeR)" />
        </mask>
      </defs>
    `;
  }

  private renderCrosshair(
    radius: number,
    labelKnockouts?: {
      positions: LabelPosition[];
      rotation: number | undefined;
      scale: number;
      /** Inner ring radius – crosshair is hidden between labelRadius and this value. */
      innerRingRadius: number;
    },
    centerCutoutRadius?: number
  ): SVGTemplateResult {
    const hasLabelKnockouts =
      !!labelKnockouts && labelKnockouts.positions.length > 0;
    const hasMask = hasLabelKnockouts || centerCutoutRadius !== undefined;

    // Radius at which labels sit (distance from centre).
    // Any position is equally valid — they're all at the same radial distance.
    const labelRadius = hasLabelKnockouts
      ? Math.max(
          ...labelKnockouts!.positions.map((l) =>
            Math.abs(l.x !== 0 ? l.x : l.y)
          )
        )
      : 0;
    // Small extra padding so the crosshair doesn't start/end right at the
    // label edge — use the same visual pad as the letter knockouts.
    const ringGapPad = hasLabelKnockouts ? 3 / labelKnockouts!.scale : 0;

    return svg`
      ${
        hasMask
          ? svg`
        <defs>
          <mask
            id="crosshair-label-mask"
            maskUnits="userSpaceOnUse"
            x="-${radius}" y="-${radius}"
            width="${radius * 2}" height="${radius * 2}"
          >
            <rect x="-${radius}" y="-${radius}" width="${radius * 2}" height="${radius * 2}" fill="white"/>
            ${
              hasLabelKnockouts
                ? svg`
            <!-- Annular ring knockout: hide crosshair between labels and inner ring -->
            <circle cx="0" cy="0" r="${labelKnockouts!.innerRingRadius}" fill="black"/>
            <circle cx="0" cy="0" r="${labelRadius - ringGapPad}" fill="white"/>
            <!-- Per-label rectangular knockouts -->
            ${labelKnockouts!.positions.map((l) => {
              const fontSize = 12 / labelKnockouts!.scale;
              const pad = 3 / labelKnockouts!.scale;
              const size = fontSize + pad * 2;
              return svg`
                <rect
                  x="${l.x - size / 2}" y="${l.y - size / 2}"
                  width="${size}" height="${size}"
                  fill="black"
                  transform="rotate(${-(labelKnockouts!.rotation ?? 0)})"
                  transform-origin="${l.x} ${l.y}"
                />
              `;
            })}`
                : nothing
            }
            ${
              centerCutoutRadius !== undefined
                ? svg`<circle cx="0" cy="0" r="${centerCutoutRadius}" fill="black"/>`
                : nothing
            }
          </mask>
        </defs>`
          : nothing
      }
      <g mask=${hasMask ? 'url(#crosshair-label-mask)' : nothing}>
        <line
          x1="-${radius}"
          y1="0"
          x2="${radius}"
          y2="0"
          stroke="var(--instrument-frame-tertiary-color)"
          stroke-width="1"
          vector-effect="non-scaling-stroke"
        />
        <line
          x1="0"
          y1="-${radius}"
          x2="0"
          y2="${radius}"
          stroke="var(--instrument-frame-tertiary-color)"
          stroke-width="1"
          vector-effect="non-scaling-stroke"
        />
      </g>
    `;
  }

  private renderBars(): SVGTemplateResult[] | typeof nothing {
    if (this.barAreas.length === 0) {
      return nothing;
    }
    return this.barAreas.map((bar, index) => {
      const startAngle = Math.min(bar.startAngle, bar.endAngle);
      const endAngle = Math.max(bar.startAngle, bar.endAngle);
      const arc = roundedArch({
        r: this._bandRadius(bar.innerRadius ?? RING3_RADIUS),
        R: this._bandRadius(bar.outerRadius ?? RING2_RADIUS),
        startAngle: startAngle,
        endAngle: endAngle,
        roundInsideCut: false,
        roundOutsideCut: false,
      });
      const barMaskR = (bar.outerRadius ?? RING2_RADIUS) + this._rOff + 40;
      // The mask is a sector to cut out the stroke on the start and end of the bar
      const mask = svg`<mask id="barMask-${index}">
        <rect x="${-barMaskR}" y="${-barMaskR}" width="${barMaskR * 2}" height="${barMaskR * 2}" fill="black" />
        <path d=${roundedArch({
          r: 1,
          R: barMaskR,
          startAngle: startAngle,
          endAngle: endAngle,
          roundInsideCut: false,
          roundOutsideCut: false,
        })} fill="white" />
      </mask>`;
      return svg`
        ${mask}
        <g mask=${this.areas.length > 0 ? 'url(#cutMask)' : nothing}>
        <path
          d=${arc}
          fill=${bar.fillColor}
          stroke=${bar.fillColor}
          stroke-width="1"
          vector-effect="non-scaling-stroke"
          mask="url(#barMask-${index})"
          />
          </g>
          `;
    });
  }

  private renderNeedles(): SVGTemplateResult[] | typeof nothing {
    if (this.needles.length === 0) {
      return nothing;
    }
    return this.needles.map((needle) => {
      return svg`
        <rect
          transform="rotate(${needle.angle})"
          x="-4" y="${-this._bandRadius(RING2_RADIUS)}" width="8" height="${needle.length ?? 48}" rx="4"
          fill=${needle.fillColor}
          stroke=${needle.strokeColor}
          stroke-width="1"
          vector-effect="non-scaling-stroke"
          paint-order="stroke fill"
        />
      `;
    });
  }

  private getScale({width, height}: {width: number; height: number}): number {
    const container = measureContainerPx(this);
    const scale = Math.min(container.width / width, container.height / height);
    // On first paint the element and its parent can both still be zero-sized, so
    // the scale is 0 (or non-finite). That value flows into `px / scale` label
    // math and yields ±Infinity coordinates the browser rejects. Fall back to a
    // 1:1 scale until a real size is available; the ResizeController re-renders
    // with the true scale once the element is laid out (issue #1032).
    if (!Number.isFinite(scale) || scale <= 0) {
      return 1;
    }
    return scale;
  }

  /**
   * Pixel width of the widest outside label, feeding the frame's label
   * reserve (issue #1021). Explicit `padding` is a hard geometry override
   * and disables the reserve, preserving legacy consumer output.
   */
  private getLabelWidthPx(): number {
    if (this.padding !== undefined || this.tickmarksInside) {
      return 0;
    }
    if (this.showLabels) {
      return NSWE_LABEL_WIDTH_PX;
    }
    return estimateLabelWidthPx(this.tickmarks.map((t) => t.text));
  }

  override render() {
    let width: number;
    let height: number;
    let viewBox: string;

    if (this.arcFrame) {
      this._rOff = this.arcFrame.radiusOffset;
      this._labelsHidden = false;
      this._ownFrame = undefined;
      width = this.arcFrame.width;
      height = this.arcFrame.height;
      viewBox = this.arcFrame.viewBox;
    } else {
      const frame = computeRadialFrame({
        basePadding: this.padding ?? 24,
        labelWidthPx: this.getLabelWidthPx(),
        clips: {
          top: this.clipTop,
          bottom: this.clipBottom,
          left: this.clipLeft,
          right: this.clipRight,
        },
        containerPx: measureContainerPx(this),
        faceDiameter: this.faceDiameter,
        zoomToFitArc: this.zoomToFitArc,
        areas: this.areas,
        innerRadius: this.innerRingRadius,
      });
      this._rOff = frame.radiusOffset;
      this._labelsHidden = frame.labelsHidden;
      this._ownFrame = frame;
      width = frame.width;
      height = frame.height;
      viewBox = frame.viewBox;
    }

    const rOff = this._rOff;
    const scale = this.getScale({width, height});
    const angleSetpoint = this.renderSetpoint();
    // Route through _bandRadius so inside labels track the (zoom-shifted) inner
    // band edge; the coupling is intentional (see _bandRadius INVARIANT).
    const textRadius = this.tickmarksInside
      ? this._bandRadius(this.innerRingRadius)
      : this._bandRadius(OUTER_RING_RADIUS);
    const maxDigits = Math.max(
      ...this.tickmarks.map((t) => t.text?.length ?? 0)
    );
    const tickmarks = this.tickmarks.map((t) =>
      tickmark(t.angle, {
        size: t.type,
        style: this.tickmarkStyle,
        scale,
        text: this.showLabels || this._labelsHidden ? undefined : t.text,
        inside: this.tickmarksInside,
        textRadius,
        rotation: this.rotation,
        maxDigits,
        color: t.color,
        radiusOffset: rOff,
        endLabelsMaxMin: this.endLabelsMaxMin,
      })
    );
    const advices = this.advices
      ? this.advices.map((a) => renderAdvice(a, rOff))
      : nothing;

    // Compute label positions once – used for both rendering and crosshair
    // knockout. NSWE labels and the north arrow are px-fixed outside decor,
    // so they follow the same labelsHidden degradation as tick label texts.
    const showNsweLabels = this.showLabels && !this._labelsHidden;
    const showNorthArrow = this.northArrow && !this._labelsHidden;
    const insideLabels = this.tickmarksInside && showNsweLabels;
    const includeNorth = !this.northArrow;
    const labelPositions = showNsweLabels
      ? getLabelPositions({
          scale,
          inside: this.tickmarksInside,
          innerRadius: this.innerRingRadius + rOff,
          includeNorth,
        })
      : undefined;

    const labels = labelPositions
      ? renderLabels({
          scale,
          rotation: this.rotation,
          inside: this.tickmarksInside,
          innerRadius: this.innerRingRadius + rOff,
          includeNorth,
        })
      : nothing;
    const northArrowEl = showNorthArrow
      ? renderNorthArrow({
          scale,
          rotation: this.rotation,
          inside: this.northArrowInside ?? this.tickmarksInside,
        })
      : nothing;
    const wind =
      this.windKnots != null && this.windFromDirectionDeg != null
        ? svg`<g transform="scale(${this.scaleWindIcon})">${renderWind({
            windKnots: this.windKnots,
            fromDirectionDeg: this.windFromDirectionDeg,
            radius: this.windSymbolRadius ?? 192,
            color: this.windColor,
          })}</g>`
        : nothing;
    const current =
      this.current != null && this.currentFromDirectionDeg != null
        ? renderCurrent({
            current: this.current,
            fromDirectionDeg: this.currentFromDirectionDeg,
            radius: this.currentSymbolRadius ?? 192,
            color: this.currentColor,
          })
        : nothing;
    return html`
      <svg
        width="100%"
        height="100%"
        viewBox=${viewBox}
        style="--scale: ${scale}"
        transform="rotate(${this.rotation ?? 0})"
      >
        ${this.watchCircle()} ${this.renderBars()}
        ${this.crosshairEnabled
          ? this.renderCrosshair(
              OUTER_RING_RADIUS + rOff,
              insideLabels && labelPositions
                ? {
                    positions: labelPositions,
                    rotation: this.rotation,
                    scale,
                    innerRingRadius: this.innerRingRadius + rOff,
                  }
                : undefined,
              this.crosshairCenterCutout
                ? this.innerRingRadius + rOff
                : undefined
            )
          : nothing}
        ${northArrowEl} ${this.renderStarboardPortIndicator()} ${current}
        ${this._renderTickFadeDefs()} ${wind}
        ${this.tickFadeAngle > 0 && this.areas.length > 0
          ? svg`<g mask="url(#tickFadeMask)">${tickmarks}</g>`
          : tickmarks}
        ${this.areas.length > 0
          ? svg`<g clip-path="url(#rot-arc-clip)">${this.renderRot()}</g>`
          : this.renderRot()}
        ${advices} ${angleSetpoint}
        ${this.tickFadeAngle > 0 && this.areas.length > 0
          ? svg`<g mask="url(#tickFadeMask)">${labels}</g>`
          : labels}
        ${this.renderVesselImage()} ${this.renderNeedles()}
      </svg>
    `;
  }

  private getRotColors(): {
    dotColor: string;
    barBgColor: string;
  } {
    const p = this.rotPriority ?? this.priority;
    const isEnhanced = p === Priority.enhanced;

    if (this.rotPortStarboard) {
      // For bar type, derive direction from bar angles (visual direction);
      // for dots, use spinner RPM.
      let direction: number;
      if (this.rotType === RotType.bar) {
        const cwSpan =
          (((this.rotEndAngle - this.rotStartAngle) % 360) + 360) % 360;
        direction = cwSpan <= 180 ? cwSpan : cwSpan - 360;
      } else {
        direction = this._effectiveRpm;
      }

      if (direction > 0) {
        return {
          dotColor: 'var(--instrument-starboard-secondary-color)',
          barBgColor: 'var(--instrument-starboard-primary-color)',
        };
      }
      if (direction < 0) {
        return {
          dotColor: 'var(--instrument-port-secondary-color)',
          barBgColor: 'var(--instrument-port-primary-color)',
        };
      }
    }

    return {
      dotColor: isEnhanced
        ? 'var(--instrument-enhanced-tertiary-color)'
        : 'var(--instrument-regular-tertiary-color)',
      barBgColor: isEnhanced
        ? 'var(--instrument-enhanced-secondary-color)'
        : 'var(--instrument-regular-secondary-color)',
    };
  }

  private renderRot(): SVGTemplateResult | typeof nothing {
    if (!this.rotType) return nothing;

    const {dotColor, barBgColor} = this.getRotColors();
    const rOff = this._rOff;

    if (this.rotType === RotType.bar) {
      const angularDelta = shortestAngularDeltaDeg(
        this.rotStartAngle,
        this.rotEndAngle
      );
      const threshold = rotBarThresholdAngle(this.rotPosition, rOff);
      const zeroDb = Number.isFinite(this.rotAtZeroDeadband)
        ? this.rotAtZeroDeadband
        : ROT_ZERO_DEADBAND_DEG;

      if (angularDelta < Math.max(zeroDb, threshold)) {
        return renderRotZeroPill(
          barBgColor,
          this.rotStartAngle,
          this.rotPosition,
          rOff
        );
      }

      return svg`
        ${renderRotBarStatic({
          startAngle: this.rotStartAngle,
          endAngle: this.rotEndAngle,
          barColor: barBgColor,
          position: this.rotPosition,
          maskId: 'rot-bar-mask',
          radiusOffset: rOff,
        })}
        ${svg`<g clip-path="url(#rot-bar-mask)">
            <g id="rot-spinner">
              ${renderRotBarDots(dotColor, this.rotPosition, rOff)}
            </g>
          </g>`}
      `;
    }

    const p = this.rotPriority ?? this.priority;
    const isEnhanced = p === Priority.enhanced;
    let dotsColor: string = isEnhanced
      ? 'var(--instrument-enhanced-secondary-color)'
      : 'var(--instrument-regular-secondary-color)';
    if (this.rotPortStarboard) {
      if (this._effectiveRpm > 0) {
        dotsColor = 'var(--instrument-starboard-secondary-color)';
      } else if (this._effectiveRpm < 0) {
        dotsColor = 'var(--instrument-port-secondary-color)';
      }
    }
    return svg`
      <g id="rot-spinner">
        ${renderRotDots(dotsColor, this.rotPosition, rOff)}
      </g>
    `;
  }

  private renderSetpoint(): SVGTemplateResult | typeof nothing {
    if (this.angleSetpoint === undefined) {
      return nothing;
    }

    const derived = deriveRadialSetpointConfig({
      state: this.state,
      priority: this.priority,
      atSetpoint: this.atAngleSetpoint,
      angleSetpoint: this.angleSetpoint,
      setpointAtZeroDeadband: this.angleSetpointAtZeroDeadband,
      newAngleSetpoint: this.newAngleSetpoint,
      touching: this.touching,
      setpointOverride: this.setpointOverride,
    });

    const {visualState, colorMode, disabled, hasNewSetpoint} = derived;

    const outwardOffset = getSetpointOutwardOffset(visualState);
    const radius =
      RADIAL_SETPOINT_RADIUS +
      this._rOff +
      outwardOffset -
      RADIAL_SETPOINT_INWARD_ADJUST;

    // Render original setpoint marker (dimmed when newAngleSetpoint is active)
    const opacity = hasNewSetpoint ? 0.75 : 1;
    const originalMarker = drawSetpointMarker({
      visualState,
      colorMode,
      disabled,
      id: this._setpointId,
    });

    const animate = this.animateSetpoint;
    const hasDeparting = this._departingNewAngleSetpoint !== undefined;

    // Compute CSS-safe accumulated angle so transitions always take the short path
    const rawAngle = this.angleSetpoint + 90;
    if (!this._setpointCssAngleInit) {
      // First render: set angle without transition
      this._setpointCssAngle = rawAngle;
      this._setpointCssAngleInit = true;
    } else {
      this._setpointCssAngle = cssSafeAngle(this._setpointCssAngle, rawAngle);
    }

    // Use CSS style transform when animating for smooth transition
    const originalSetpoint = animate
      ? svg`
        <g style="transform: rotate(${this._setpointCssAngle}deg) translateX(${-radius}px) rotate(270deg); opacity: ${opacity}; transition: transform var(${SETPOINT_ANIMATION_CSS_VAR}, ${SETPOINT_ANIMATION_DURATION_DEFAULT}) ease-out, opacity var(${SETPOINT_ANIMATION_CSS_VAR}, ${SETPOINT_ANIMATION_DURATION_DEFAULT}) ease-out;">
          ${originalMarker}
        </g>
      `
      : svg`
        <g transform="rotate(${this.angleSetpoint + 90}) translate(${-radius}, 0) rotate(270)" opacity="${opacity}">
          ${originalMarker}
        </g>
      `;

    // Render newAngleSetpoint in focus state (always on top)
    // OR render departing newAngleSetpoint during confirm fade-out
    if (hasNewSetpoint || hasDeparting) {
      const isActive = hasNewSetpoint;
      const newAngle = isActive
        ? this.newAngleSetpoint!
        : this._departingNewAngleSetpoint!;
      const targetOpacity = isActive ? 1 : 0;

      const focusOutwardOffset = getSetpointOutwardOffset(
        SetpointVisualState.focus
      );
      const focusRadius =
        RADIAL_SETPOINT_RADIUS +
        this._rOff +
        focusOutwardOffset -
        RADIAL_SETPOINT_INWARD_ADJUST;

      const newMarker = drawSetpointMarker({
        visualState: SetpointVisualState.focus,
        colorMode,
        disabled: false, // newSetpoint is never disabled
        id: this._newSetpointId,
      });

      if (animate) {
        const duration = `var(${SETPOINT_ANIMATION_CSS_VAR}, ${SETPOINT_ANIMATION_DURATION_DEFAULT})`;
        return svg`
          ${originalSetpoint}
          <g style="transform: rotate(${newAngle + 90}deg) translateX(${-focusRadius}px) rotate(270deg); opacity: ${targetOpacity}; transition: opacity ${duration} ease-out;">
            ${newMarker}
          </g>
        `;
      }

      return svg`
        ${originalSetpoint}
        <g transform="rotate(${newAngle + 90}) translate(${-focusRadius}, 0) rotate(270)" opacity="${targetOpacity}">
          ${newMarker}
        </g>
      `;
    }

    return originalSetpoint;
  }

  private renderVesselImage(): SVGTemplateResult[] | typeof nothing {
    if (this.vessels.length === 0) {
      return nothing;
    }

    return this.vessels.map((v) => {
      let size;
      switch (v.size) {
        case VesselImageSize.large:
          size = 224;
          break;
        case VesselImageSize.medium:
          size = 160;
          break;
        default:
          size = 100;
      }

      const scale = size / 160;
      return svg`<g style="transform: ${v.transform} scale(${scale}) translate(-80px, -80px) ">${vesselImages[v.vesselImage]}</g>`;
    });
  }

  private renderStarboardPortIndicator(): SVGTemplateResult[] | typeof nothing {
    if (!this.starboardPortIndicator) {
      return nothing;
    }
    return [
      adviceMask(
        0,
        180,
        'var(--instrument-starboard-secondary-color)',
        'var(--instrument-starboard-secondary-color)'
      ),
      adviceMask(
        180,
        360,
        'var(--instrument-port-secondary-color)',
        'var(--instrument-port-secondary-color)'
      ),
    ] as SVGTemplateResult[];
  }

  static override styles = unsafeCSS(compentStyle);
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-watch': ObcWatch;
  }
}
