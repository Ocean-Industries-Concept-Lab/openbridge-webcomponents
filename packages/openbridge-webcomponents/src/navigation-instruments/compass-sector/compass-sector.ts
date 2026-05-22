import {LitElement, PropertyValues, html, svg, unsafeCSS, nothing} from 'lit';
import {property} from 'lit/decorators.js';
import componentStyle from './compass-sector.css?inline';
import '../watch/watch.js';
import {Tickmark, TickmarkType, TickmarkStyle} from '../watch/tickmark.js';
import {arrow, ArrowStyle} from '../compass/arrow.js';
import {AdviceState, AngleAdvice, AngleAdviceRaw} from '../watch/advice.js';
import {
  WatchCircleType,
  WatchArea,
  OUTER_RING_RADIUS,
  innerRingRadiusFor,
  RotType,
  RotPosition,
} from '../watch/watch.js';
import {SetpointBundle} from '../../svghelpers/setpoint-bundle.js';
import {
  computeZoomToFitArcFrame,
  type ZoomToFitArcFrame,
} from '../../svghelpers/arc-frame.js';
import {ROT_ZERO_DEADBAND_DEG} from '../rate-of-turn/rot-renderer.js';
import {customElement} from '../../decorator.js';
import {InstrumentState, Priority} from '../types.js';
export {RotType, RotPosition};

export enum CompassSectorPriorityElement {
  hdg = 'hdg',
  cog = 'cog',
  rot = 'rot',
}

const PADDING = 72;
const WATCH_TYPE = WatchCircleType.triple;
const INNER_RADIUS = innerRingRadiusFor(WATCH_TYPE);
/** Half of the fixed 120° arc on the watch face. */
const ARC_HALF_EXTENT = 60;
const SCALE_INNER_RADIUS = innerRingRadiusFor(WatchCircleType.single);

interface TickDensity {
  mainInterval: number;
  primaryInterval: number;
  secondaryInterval: number | undefined;
}

function tickDensityForFOV(fov: number): TickDensity {
  if (fov <= 30) {
    return {mainInterval: 10, primaryInterval: 5, secondaryInterval: 1};
  } else if (fov <= 60) {
    return {mainInterval: 10, primaryInterval: 5, secondaryInterval: undefined};
  } else if (fov <= 120) {
    return {mainInterval: 30, primaryInterval: 10, secondaryInterval: 5};
  } else {
    return {mainInterval: 90, primaryInterval: 30, secondaryInterval: 10};
  }
}

function normalizeAngle(a: number): number {
  return ((a % 360) + 360) % 360;
}

/**
 * `<obc-compass-sector>` — Curved compass strip that auto‑scales to keep HDG and COG visible.
 *
 * Renders a fixed 120° arc of a triple‑ring compass face. The visible
 * compass range (field of view) adjusts automatically so that both the
 * heading (HDG) and course‑over‑ground (COG) arrows are always in view.
 * This is the radial equivalent of `<obc-compass-flat>`: the arc shape
 * never changes — only the scale (compass‑degrees per arc‑degree) changes.
 *
 * ## Features
 *
 * - **Fixed 120° arc**: The watch face is always a 120° sector (±60° from
 *   center), identical in shape to `<obc-rot-sector>`.
 * - **FOV auto‑scaling**: The field of view widens when the HDG–COG
 *   angular difference grows, compressing more compass degrees into the
 *   fixed arc. Tickmark density adjusts automatically.
 * - **HDG / COG arrows**: Solid (HDG) arrow is always at the arc center.
 *   Hollow (COG) arrow is positioned proportionally within the arc.
 * - **North arrow**: A gray triangle in the outer scale band indicates
 *   north when it falls within the visible FOV.
 * - **Heading setpoint**: Optional setpoint marker with auto at‑setpoint
 *   detection and confirm animation, positioned at the mapped arc angle.
 * - **Advice zones**: Pass `headingAdvices` to render caution/alert arcs,
 *   mapped into the scaled arc.
 * - **Rate of turn**: Animated ROT indicator (dots or bar) spanning from
 *   HDG to the mapped COG position, clipped to the arc.
 * - **Zoom to fit**: When `zoomToFitArc` is `true`, the fixed 120° arc is
 *   enlarged to fill the available space.
 *
 * ## Usage Guidelines
 *
 * - Set `heading` and `courseOverGround` to sensor values in degrees.
 * - Adjust `minFOV` to control the minimum zoom level (default 30°).
 * - Enable `zoomToFitArc` to enlarge the arc to fill the viewport.
 * - For a full‑circle compass, use `<obc-compass>` instead.
 *
 * @fires None
 */
@customElement('obc-compass-sector')
export class ObcCompassSector extends LitElement {
  @property({type: Number}) heading = 0;
  @property({type: Number}) courseOverGround = 0;

  @property({type: Number}) headingSetpoint: number | null = null;
  @property({type: Number}) newHeadingSetpoint: number | undefined;
  @property({type: Boolean}) atHeadingSetpoint: boolean = false;
  @property({type: Number}) headingSetpointAtZeroDeadband: number = 0.5;
  @property({type: Boolean}) headingSetpointOverride: boolean = false;
  @property({type: Boolean, attribute: false}) autoAtHeadingSetpoint = true;
  @property({type: Number}) autoAtHeadingSetpointDeadband: number = 2;
  @property({type: Boolean}) animateSetpoint: boolean = false;
  @property({type: Boolean}) touching: boolean = false;
  @property({type: Array, attribute: false}) headingAdvices: AngleAdvice[] = [];

  @property({type: Number}) minFOV: number = 30;

  @property({type: String}) rotType: RotType | undefined;
  @property({type: String}) rotPosition: RotPosition = RotPosition.innerCircle;
  /**
   * Measured rate of turn in degrees per minute (positive = starboard).
   * Drives both the bar extent and (after multiplication by
   * `rotDotAnimationFactor`) the spinning dot animation. When `undefined`,
   * falls back to the deprecated `rotationsPerMinute`.
   */
  @property({type: Number}) rateOfTurnDegreesPerMinute: number | undefined;
  /**
   * Visual amplification applied only to the spinning dot animation
   * (not to the bar extent). Default `18` keeps the legacy visual feel
   * (≈1 rpm at 20°/min).
   */
  @property({type: Number}) rotDotAnimationFactor: number = 18;
  /**
   * @deprecated Use `rateOfTurnDegreesPerMinute` (and optionally
   * `rotDotAnimationFactor`) instead. Takes effect only when
   * `rateOfTurnDegreesPerMinute` is `undefined`.
   */
  @property({type: Number}) rotationsPerMinute: number = 1;
  /**
   * Bar-extent reference value in **degrees per minute**. The bar fills the
   * full ±`ARC_HALF_EXTENT` arc when the measured ROT equals
   * ±`rotMaxValue`. Default `60` aligns with ES-TRIN 2025/1 Art. 3.02.
   *
   * Note: the unit changed from rotations per minute to degrees per minute
   * with the introduction of `rateOfTurnDegreesPerMinute`.
   */
  @property({type: Number}) rotMaxValue: number = 60;
  @property({type: Boolean}) rotPortStarboard: boolean = false;
  @property({type: Number}) rotAtZeroDeadband: number = ROT_ZERO_DEADBAND_DEG;

  @property({type: String}) state: InstrumentState = InstrumentState.active;
  @property({type: String}) priority: Priority = Priority.regular;
  @property({type: Array, attribute: false})
  priorityElements: CompassSectorPriorityElement[] = [
    CompassSectorPriorityElement.hdg,
  ];
  @property({type: Boolean}) tickmarksInside: boolean = false;
  @property({type: Boolean}) zoomToFitArc: boolean = false;

  private _headingSp = new SetpointBundle({
    angularWraparound: true,
    onAnimationEnd: () => this.requestUpdate(),
  });

  // Cached computed values — updated in willUpdate()
  private _halfFOV = 30;
  private _arcHalfExtent = ARC_HALF_EXTENT;
  private _scale = 1;
  private _radiusOffset = 0;
  private _cachedViewBox = '';
  private _cachedArcFrame: ZoomToFitArcFrame | undefined;
  private _cachedAreas: WatchArea[] = [];
  private _cachedTickmarks: Tickmark[] = [];
  private _cachedAdvices: AngleAdviceRaw[] = [];

  override willUpdate(changed: PropertyValues): void {
    super.willUpdate(changed);
    this._headingSp.sync({
      setpoint: this.headingSetpoint ?? undefined,
      newSetpoint: this.newHeadingSetpoint,
      atSetpoint: this.atHeadingSetpoint,
      touching: this.touching,
      autoAtSetpoint: this.autoAtHeadingSetpoint,
      autoAtSetpointDeadband: this.autoAtHeadingSetpointDeadband,
      setpointAtZeroDeadband: this.headingSetpointAtZeroDeadband,
      setpointOverride: this.headingSetpointOverride,
      animateSetpoint: this.animateSetpoint,
    });

    const arcInputsChanged =
      changed.has('heading') ||
      changed.has('courseOverGround') ||
      changed.has('minFOV') ||
      changed.has('zoomToFitArc');

    if (arcInputsChanged) {
      let diff = this.courseOverGround - this.heading;
      if (diff > 180) diff -= 360;
      else if (diff < -180) diff += 360;
      const minFov = Math.max(1, this.minFOV);
      const MARGIN = 15;

      if (this.zoomToFitArc) {
        const needed = Math.max(minFov, Math.abs(diff) + MARGIN);
        if (needed <= ARC_HALF_EXTENT) {
          this._halfFOV = needed;
          this._arcHalfExtent = needed;
          this._scale = 1;
        } else {
          this._halfFOV = needed;
          this._arcHalfExtent = ARC_HALF_EXTENT;
          this._scale = ARC_HALF_EXTENT / needed;
        }
      } else {
        this._halfFOV = Math.max(minFov, Math.abs(diff));
        this._arcHalfExtent = ARC_HALF_EXTENT;
        this._scale = ARC_HALF_EXTENT / this._halfFOV;
      }

      this._cachedAreas = [
        {
          startAngle: this.heading - this._arcHalfExtent,
          endAngle: this.heading + this._arcHalfExtent,
          roundInsideCut: true,
          roundOutsideCut: true,
        },
      ];

      this._computeViewBox();
      this._cachedTickmarks = this._buildTickmarks();
    }

    if (arcInputsChanged || changed.has('headingAdvices')) {
      this._cachedAdvices = this._buildAdvices();
    }
  }

  override disconnectedCallback(): void {
    super.disconnectedCallback();
    this._headingSp.dispose();
  }

  // ---------------------------------------------------------------------------
  // Angle mapping — maps compass degrees to arc positions
  // ---------------------------------------------------------------------------

  private _mapAngle(compassDeg: number): number {
    let diff = compassDeg - this.heading;
    if (diff > 180) diff -= 360;
    else if (diff < -180) diff += 360;
    return this.heading + diff * this._scale;
  }

  // ---------------------------------------------------------------------------
  // Areas — fixed 120° arc centered on heading (built in willUpdate)
  // ---------------------------------------------------------------------------

  // ---------------------------------------------------------------------------
  // Tickmarks — compass-degree labels at mapped arc positions
  // ---------------------------------------------------------------------------

  private _buildTickmarks(): Tickmark[] {
    const fov = this._halfFOV * 2;
    const {mainInterval, primaryInterval, secondaryInterval} =
      tickDensityForFOV(fov);
    const halfFov = this._halfFOV;
    const compassStart = this.heading - halfFov;
    const compassEnd = this.heading + halfFov;

    const tickmarks: Tickmark[] = [];
    const added = new Set<number>();

    const addTick = (
      arcAngle: number,
      type: TickmarkType,
      text?: string
    ): void => {
      const key = Math.round(arcAngle * 1000);
      if (added.has(key)) return;
      added.add(key);
      tickmarks.push({angle: arcAngle, type, text});
    };

    const step = secondaryInterval ?? primaryInterval;
    const firstTick = Math.ceil(compassStart / step) * step;

    for (
      let compassDeg = firstTick;
      compassDeg <= compassEnd;
      compassDeg += step
    ) {
      const norm = normalizeAngle(compassDeg);
      const arcAngle = this._mapAngle(compassDeg);
      const isMain = norm % mainInterval === 0;
      const isPrimary = norm % primaryInterval === 0;

      if (isMain) {
        addTick(arcAngle, TickmarkType.main, Math.round(norm).toString());
      } else if (isPrimary) {
        addTick(arcAngle, TickmarkType.primary);
      } else {
        addTick(arcAngle, TickmarkType.secondary);
      }
    }

    return tickmarks;
  }

  // ---------------------------------------------------------------------------
  // ViewBox
  // ---------------------------------------------------------------------------

  private _computeViewBox(): void {
    if (this.zoomToFitArc) {
      const targetSize = (176 + PADDING) * 2;
      const frame = computeZoomToFitArcFrame({
        areas: this._cachedAreas,
        outerRadius: OUTER_RING_RADIUS,
        innerRadius: INNER_RADIUS,
        extension: PADDING,
        targetSize,
      });
      this._radiusOffset = frame.radiusOffset;
      this._cachedViewBox = frame.viewBox;
      this._cachedArcFrame = frame;
    } else {
      this._radiusOffset = 0;
      const width = (176 + PADDING) * 2;
      this._cachedViewBox = `-${width / 2} -${width / 2} ${width} ${width}`;
      this._cachedArcFrame = undefined;
    }
  }

  // ---------------------------------------------------------------------------
  // North arrow — rendered in overlay at mapped 0° position
  // ---------------------------------------------------------------------------

  private _renderNorthArrow(rOff: number) {
    let northOffset = -this.heading;
    if (northOffset > 180) northOffset -= 360;
    else if (northOffset < -180) northOffset += 360;
    if (Math.abs(northOffset) > this._halfFOV) return nothing;

    const northArcAngle = this._mapAngle(0);
    const radius = OUTER_RING_RADIUS + rOff;
    return svg`
      <g transform="rotate(${northArcAngle}) translate(0, ${-radius})">
        <path fill-rule="evenodd" clip-rule="evenodd"
          d="M-17.8457 24.984 0 0 17.8458 24.984C11.9868 24.3338 6.0324 24 0 24-6.0323 24-11.9867 24.3338-17.8457 24.984Z"
          fill="var(--instrument-frame-tertiary-color)"/>
      </g>
    `;
  }

  // ---------------------------------------------------------------------------
  // Priority & advice helpers
  // ---------------------------------------------------------------------------

  private _angleInRange(value: number, min: number, max: number): boolean {
    const v = normalizeAngle(value);
    const start = normalizeAngle(min);
    const end = normalizeAngle(max);
    return start <= end ? v >= start && v <= end : v >= start || v <= end;
  }

  private _buildAdvices(): AngleAdviceRaw[] {
    return this.headingAdvices.map(({minAngle, maxAngle, hinted, type}) => {
      const state = this._angleInRange(this.heading, minAngle, maxAngle)
        ? AdviceState.triggered
        : hinted
          ? AdviceState.hinted
          : AdviceState.regular;
      return {
        minAngle: this._mapAngle(minAngle),
        maxAngle: this._mapAngle(maxAngle),
        type,
        state,
      };
    });
  }

  private get _effectiveRotDegPerMin(): number {
    return this.rateOfTurnDegreesPerMinute ?? this.rotationsPerMinute;
  }

  private get _rotEndAngle(): number {
    const maxVal = this.rotMaxValue || 1;
    const barCompassDeg =
      (this._effectiveRotDegPerMin / maxVal) * ARC_HALF_EXTENT;
    return this._mapAngle(this.heading + barCompassDeg);
  }

  private priorityFor(element: CompassSectorPriorityElement): Priority {
    const selected = Array.isArray(this.priorityElements)
      ? this.priorityElements
      : [];
    return selected.includes(element) ? this.priority : Priority.regular;
  }

  // ---------------------------------------------------------------------------
  // Render
  // ---------------------------------------------------------------------------

  override render() {
    const rotation = -this.heading;
    const viewBox = this._cachedViewBox;
    const rOff = this._radiusOffset;

    const mappedCOG = this._mapAngle(this.courseOverGround);
    const mappedSetpoint =
      this.headingSetpoint != null
        ? this._mapAngle(this.headingSetpoint)
        : undefined;
    const mappedNewSetpoint =
      this.newHeadingSetpoint != null
        ? this._mapAngle(this.newHeadingSetpoint)
        : undefined;

    return html`
      <div class="container">
        <obc-watch
          .touching=${this.touching}
          .padding=${PADDING}
          .advices=${this._cachedAdvices}
          .tickmarks=${this._cachedTickmarks}
          .tickmarkStyle=${TickmarkStyle.regular}
          .tickmarksInside=${this.tickmarksInside}
          .state=${this.state}
          .watchCircleType=${WATCH_TYPE}
          .northArrow=${false}
          .areas=${this._cachedAreas}
          .arcFrame=${this._cachedArcFrame}
          .zoomToFitArc=${this.zoomToFitArc}
          .tickFadeAngle=${this._arcHalfExtent * 0.2}
          .rotation=${rotation}
          .angleSetpoint=${mappedSetpoint}
          .newAngleSetpoint=${mappedNewSetpoint}
          .atAngleSetpoint=${this._headingSp.computeAtSetpoint(this.heading)}
          .angleSetpointAtZeroDeadband=${this.headingSetpointAtZeroDeadband}
          .setpointOverride=${this.headingSetpointOverride}
          .priority=${this.priority}
          .animateSetpoint=${this.animateSetpoint}
          .rotType=${this.rotType}
          .rotPosition=${this.rotPosition}
          .rotStartAngle=${this.heading}
          .rotEndAngle=${this._rotEndAngle}
          .rotPriority=${this.priorityFor(CompassSectorPriorityElement.rot)}
          .rotPortStarboard=${this.rotPortStarboard}
          .rotAtZeroDeadband=${this.rotAtZeroDeadband}
          .rateOfTurnDegreesPerMinute=${this.rateOfTurnDegreesPerMinute}
          .rotDotAnimationFactor=${this.rotDotAnimationFactor}
          .rotationsPerMinute=${this.rotationsPerMinute}
        >
        </obc-watch>
        <svg viewBox="${viewBox}" transform="rotate(${rotation})">
          <g transform="rotate(${this.heading})">
            <line
              x1="0"
              y1="${-(SCALE_INNER_RADIUS + rOff)}"
              x2="0"
              y2="${-(INNER_RADIUS + rOff)}"
              stroke="var(--instrument-frame-tertiary-color)"
              stroke-width="1"
              vector-effect="non-scaling-stroke"
            />
          </g>
          ${this._renderNorthArrow(rOff)}
          ${arrow(
            ArrowStyle.HDG,
            this.heading,
            this.priorityFor(CompassSectorPriorityElement.hdg),
            rOff
          )}
          ${arrow(
            ArrowStyle.COG,
            mappedCOG,
            this.priorityFor(CompassSectorPriorityElement.cog),
            rOff
          )}
        </svg>
      </div>
    `;
  }

  static override styles = unsafeCSS(componentStyle);
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-compass-sector': ObcCompassSector;
  }
}
