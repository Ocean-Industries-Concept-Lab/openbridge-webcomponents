import {LitElement, css, html, nothing, svg} from 'lit';
import {property} from 'lit/decorators.js';
import '../watch/watch.js';
import {
  VesselImage,
  VesselImageSize,
  WatchCircleType,
  OUTER_RING_RADIUS,
  type WatchArea,
} from '../watch/watch.js';
import {TickmarkType} from '../watch/tickmark.js';
import {AdviceState, AdviceType, AngleAdviceRaw} from '../watch/advice.js';
import {customElement} from '../../decorator.js';
import {Priority} from '../types.js';
import {renderInstrumentReadout} from '../readout/instrument-readout.js';
import {normalizeArcAngle} from '../../svghelpers/arc-frame.js';
import {watchfaceLinear} from '../../building-blocks/instrument-linear/instrument-linear.js';
import {
  LinearAdvice,
  LinearAdviceRaw,
} from '../../building-blocks/instrument-linear/advice.js';

export enum PitchRollHeaveType {
  /** One roll arc (bottom), one pitch arc (right), heave gauge on the left. */
  singleScale = 'single-scale',
  /** Pitch and roll arcs on both opposing sides, heave gauge in the centre. */
  dualScale = 'dual-scale',
  /** Single-scale arcs with stacked pitch/roll/heave readouts in the centre. */
  readout = 'readout',
}

export enum PitchRollHeavePriorityElement {
  pitch = 'pitch',
  roll = 'roll',
  heave = 'heave',
}

/** Half-side of the overlay viewBox in SVG units. */
const CENTRE_HALF = 200;

/**
 * Heave gauge geometry in overlay SVG units (viewBox side 400 = the 384 px
 * design tile, so 1 design px = 25/24 units). The gauge is 72×184 px in the
 * design; centred in `dual-scale`, flush with the left tile edge otherwise.
 */
const GAUGE_WIDTH = 75;
const GAUGE_HEIGHT = 192;
const GAUGE_SCALE_WIDTH = 25;
const GAUGE_LEFT_CENTRE_X = -158.33;

/** Vertical clearance kept free of centre lines around the readout stack. */
const READOUT_CLEARANCE = 104;

/**
 * `<obc-pitch-roll-heave>` – Combined three-axis motion instrument showing
 * pitch and roll on watch arcs and heave on a vertical linear gauge.
 *
 * ## Features / Variants
 *
 * - **`type`:** `single-scale` (default) shows one roll arc at the bottom, one
 *   pitch arc on the right, the heave gauge flush with the left edge and the
 *   vessel silhouettes in the centre; `dual-scale` mirrors the pitch and roll
 *   arcs onto both opposing sides and centres the heave gauge;
 *   `readout` uses the single-scale arcs with stacked pitch/roll/heave
 *   readouts in the centre instead of the vessel images.
 * - **Trend bands:** `minAvgPitch`/`maxAvgPitch`, `minAvgRoll`/`maxAvgRoll`
 *   render arc bands; `minTrendHeave`/`maxTrendHeave` render a box on the
 *   heave gauge.
 * - **Advices:** optional caution bands for pitch and roll
 *   (`maxPitchAdvice`/`maxRollAdvice` with triggers) and linear advices for
 *   heave (`heaveAdvice`).
 * - **Priority:** `priority` + `priorityElements` switch individual axes
 *   between the `regular` and `enhanced` palette.
 * - **Arc extents:** `pitchArcAngle` (default 30°) and `rollArcAngle`
 *   (default 45°) set each arc's half-extent.
 * - **Vessel imagery:** `vesselImageSide`/`vesselImageFore` pick the centre
 *   silhouettes (e.g. PSV or ROV) and `scaleForeImage` scales the fore image;
 *   only rendered in the `single-scale` type.
 *
 * ## Usage Guidelines
 *
 * Use when all three motion axes should be monitored in one instrument. For a
 * single axis, use `obc-pitch`, `obc-roll` or `obc-heave` instead; for pitch
 * and roll only, use `obc-pitch-roll`.
 *
 * @experimental
 */
@customElement('obc-pitch-roll-heave')
export class ObcPitchRollHeave extends LitElement {
  @property({type: String}) type: PitchRollHeaveType =
    PitchRollHeaveType.singleScale;
  @property({type: Number}) pitch = 0;
  @property({type: Number}) roll = 0;
  @property({type: Number}) heave = 0;
  @property({type: Number}) minAvgPitch = 0;
  @property({type: Number}) maxAvgPitch = 0;
  @property({type: Number}) minAvgRoll = 0;
  @property({type: Number}) maxAvgRoll = 0;
  @property({type: Number}) minTrendHeave = 0;
  @property({type: Number}) maxTrendHeave = 0;
  /** Value range of the heave gauge; the scale spans `±heaveRange`. */
  @property({type: Number}) heaveRange = 10;
  /**
   * Vessel image shown from the fore (rotates with `roll`).
   * @availableWhen type=='single-scale'
   */
  @property({type: String}) vesselImageFore: VesselImage = VesselImage.psvFore;
  /**
   * Vessel image shown from the side (rotates with `pitch`).
   * @availableWhen type=='single-scale'
   */
  @property({type: String}) vesselImageSide: VesselImage = VesselImage.psvSide;
  /**
   * Scale factor for the fore vessel image, clamped to `0–2`.
   * @availableWhen type=='single-scale'
   */
  @property({type: Number}) scaleForeImage = 1;
  @property({type: Number}) maxPitchAdvice: number | undefined = undefined;
  @property({type: Number}) maxRollAdvice: number | undefined = undefined;
  /** @availableWhen maxPitchAdvice!=undefined */
  @property({type: Boolean}) triggerPitchAdvice = false;
  /** @availableWhen maxRollAdvice!=undefined */
  @property({type: Boolean}) triggerRollAdvice = false;
  @property({type: Array}) heaveAdvice: LinearAdvice[] = [];
  @property({type: String}) priority: Priority = Priority.regular;
  @property({type: Array, attribute: false})
  priorityElements: PitchRollHeavePriorityElement[] = [
    PitchRollHeavePriorityElement.pitch,
    PitchRollHeavePriorityElement.roll,
    PitchRollHeavePriorityElement.heave,
  ];
  /**
   * Label for the pitch readout. Default `Pitch`.
   * @availableWhen type=='readout'
   */
  @property({type: String}) pitchLabel = 'Pitch';
  /**
   * Label for the roll readout. Default `Roll`.
   * @availableWhen type=='readout'
   */
  @property({type: String}) rollLabel = 'Roll';
  /**
   * Label for the heave readout. Default `Heave`.
   * @availableWhen type=='readout'
   */
  @property({type: String}) heaveLabel = 'Heave';
  /**
   * Unit shown in the pitch and roll readouts. Default `DEG`.
   * @availableWhen type=='readout'
   */
  @property({type: String}) unit = 'DEG';
  /**
   * Unit shown in the heave readout. Default `m`.
   * @availableWhen type=='readout'
   */
  @property({type: String}) heaveUnit = 'm';
  /**
   * Number of fraction digits shown in the pitch and roll readouts.
   * Default `0`.
   * @availableWhen type=='readout'
   */
  @property({type: Number}) fractionDigits = 0;
  /**
   * Number of fraction digits shown in the heave readout. Default `0`.
   * @availableWhen type=='readout'
   */
  @property({type: Number}) heaveFractionDigits = 0;
  /** Half-extent of the pitch arc(s) in degrees. Default `30`. */
  @property({type: Number}) pitchArcAngle = 30;
  /** Half-extent of the roll arc(s) in degrees. Default `45`. */
  @property({type: Number}) rollArcAngle = 45;

  private priorityFor(element: PitchRollHeavePriorityElement): Priority {
    const selected = Array.isArray(this.priorityElements)
      ? this.priorityElements
      : [];
    return selected.includes(element) ? this.priority : Priority.regular;
  }

  private needleColor(element: PitchRollHeavePriorityElement): string {
    return this.priorityFor(element) === Priority.enhanced
      ? 'var(--instrument-enhanced-secondary-color)'
      : 'var(--instrument-regular-secondary-color)';
  }

  private barColor(element: PitchRollHeavePriorityElement): string {
    return this.priorityFor(element) === Priority.enhanced
      ? 'var(--instrument-enhanced-tertiary-color)'
      : 'var(--instrument-regular-tertiary-color)';
  }

  private get normalizedScaleForeImage(): number {
    if (!Number.isFinite(this.scaleForeImage)) {
      return 1;
    }
    return Math.max(0, Math.min(2, this.scaleForeImage));
  }

  private get normalizedPitchArcAngle(): number {
    return normalizeArcAngle(this.pitchArcAngle, 30);
  }

  private get normalizedRollArcAngle(): number {
    return normalizeArcAngle(this.rollArcAngle, 45);
  }

  private get isDualScale(): boolean {
    return this.type === PitchRollHeaveType.dualScale;
  }

  override render() {
    const pitchArc = this.normalizedPitchArcAngle;
    const rollArc = this.normalizedRollArcAngle;

    const overlayViewBox = `-${CENTRE_HALF} -${CENTRE_HALF} ${CENTRE_HALF * 2} ${CENTRE_HALF * 2}`;

    return html`
      <div class="container">
        <svg viewBox="${overlayViewBox}">
          ${this.renderCentreLines()}
          ${this.isDualScale
            ? nothing
            : this.renderRingComplement(pitchArc, rollArc)}
        </svg>
        ${this.renderWatch(pitchArc, rollArc)}
        <svg viewBox="${overlayViewBox}">${this.renderHeaveGauge()}</svg>
        ${this.type === PitchRollHeaveType.readout
          ? html`<div class="readout">
              <div class="readout-group">
                ${renderInstrumentReadout({
                  value: this.pitch,
                  priority: this.priorityFor(
                    PitchRollHeavePriorityElement.pitch
                  ),
                  label: this.pitchLabel,
                  unit: this.unit,
                  fractionDigits: this.fractionDigits,
                })}
                <div class="readout-divider"></div>
                ${renderInstrumentReadout({
                  value: this.roll,
                  priority: this.priorityFor(
                    PitchRollHeavePriorityElement.roll
                  ),
                  label: this.rollLabel,
                  unit: this.unit,
                  fractionDigits: this.fractionDigits,
                })}
                <div class="readout-divider"></div>
                ${renderInstrumentReadout({
                  value: this.heave,
                  priority: this.priorityFor(
                    PitchRollHeavePriorityElement.heave
                  ),
                  label: this.heaveLabel,
                  unit: this.heaveUnit,
                  fractionDigits: this.heaveFractionDigits,
                })}
              </div>
            </div>`
          : nothing}
      </div>
    `;
  }

  /**
   * Horizontal and vertical hairlines through the instrument centre. The
   * readout variant keeps the centre clear and only draws the vertical line
   * segments above and below the readout stack.
   */
  private renderCentreLines() {
    const r = OUTER_RING_RADIUS;
    const stroke = 'var(--instrument-frame-tertiary-color)';
    if (this.type === PitchRollHeaveType.readout) {
      return svg`
        <line x1="0" y1=${-r} x2="0" y2=${-READOUT_CLEARANCE} stroke=${stroke} />
        <line x1="0" y1=${READOUT_CLEARANCE} x2="0" y2=${r} stroke=${stroke} />
      `;
    }
    return svg`
      <line x1=${-r} y1="0" x2=${r} y2="0" stroke=${stroke} />
      <line x1="0" y1=${-r} x2="0" y2=${r} stroke=${stroke} />
    `;
  }

  /**
   * Thin ring segments completing the circle between the single-scale arcs:
   * one short segment between the pitch (right) and roll (bottom) arcs, and
   * one long segment the other way around (left and top).
   */
  private renderRingComplement(pitchArc: number, rollArc: number) {
    const r = OUTER_RING_RADIUS;
    const pt = (deg: number): [number, number] => {
      const rad = ((deg - 90) * Math.PI) / 180;
      return [r * Math.cos(rad), r * Math.sin(rad)];
    };
    const segment = (from: number, to: number) => {
      if (to - from <= 0) {
        return nothing;
      }
      const [x1, y1] = pt(from);
      const [x2, y2] = pt(to);
      const large = to - from > 180 ? 1 : 0;
      return svg`
        <path
          d="M ${x1} ${y1} A ${r} ${r} 0 ${large} 1 ${x2} ${y2}"
          fill="none"
          stroke="var(--instrument-frame-tertiary-color)"
        />
      `;
    };
    return svg`
      ${segment(90 + pitchArc, 180 - rollArc)}
      ${segment(180 + rollArc, 450 - pitchArc)}
    `;
  }

  private renderWatch(pitchArc: number, rollArc: number) {
    const dual = this.isDualScale;

    const areas: WatchArea[] = [
      {
        startAngle: 90 - pitchArc,
        endAngle: 90 + pitchArc,
        roundOutsideCut: true,
        roundInsideCut: true,
      },
      {
        startAngle: 180 - rollArc,
        endAngle: 180 + rollArc,
        roundOutsideCut: true,
        roundInsideCut: true,
      },
    ];
    const barAreas = [
      {
        startAngle: 90 + this.minAvgPitch,
        endAngle: 90 + this.maxAvgPitch,
        fillColor: this.barColor(PitchRollHeavePriorityElement.pitch),
      },
      {
        startAngle: 180 + this.minAvgRoll,
        endAngle: 180 + this.maxAvgRoll,
        fillColor: this.barColor(PitchRollHeavePriorityElement.roll),
      },
    ];
    const needles = [
      {
        angle: 90 + this.pitch,
        fillColor: this.needleColor(PitchRollHeavePriorityElement.pitch),
        strokeColor: 'var(--border-silhouette-color)',
      },
      {
        angle: 180 + this.roll,
        fillColor: this.needleColor(PitchRollHeavePriorityElement.roll),
        strokeColor: 'var(--border-silhouette-color)',
      },
    ];
    const tickmarks = [
      {angle: 90, type: TickmarkType.main},
      {angle: 180, type: TickmarkType.main},
    ];

    if (dual) {
      areas.push(
        {
          startAngle: 270 - pitchArc,
          endAngle: 270 + pitchArc,
          roundOutsideCut: true,
          roundInsideCut: true,
        },
        {
          startAngle: 360 - rollArc,
          endAngle: rollArc,
          roundOutsideCut: true,
          roundInsideCut: true,
        }
      );
      barAreas.push(
        {
          startAngle: 270 + this.minAvgPitch,
          endAngle: 270 + this.maxAvgPitch,
          fillColor: this.barColor(PitchRollHeavePriorityElement.pitch),
        },
        {
          startAngle: this.minAvgRoll,
          endAngle: this.maxAvgRoll,
          fillColor: this.barColor(PitchRollHeavePriorityElement.roll),
        }
      );
      needles.push(
        {
          angle: 270 + this.pitch,
          fillColor: this.needleColor(PitchRollHeavePriorityElement.pitch),
          strokeColor: 'var(--border-silhouette-color)',
        },
        {
          angle: this.roll,
          fillColor: this.needleColor(PitchRollHeavePriorityElement.roll),
          strokeColor: 'var(--border-silhouette-color)',
        }
      );
      tickmarks.push(
        {angle: 0, type: TickmarkType.main},
        {angle: 270, type: TickmarkType.main}
      );
    }

    return html`
      <obc-watch
        .watchCircleType=${WatchCircleType.double}
        .areas=${areas}
        .barAreas=${barAreas}
        .needles=${needles}
        .vessels=${this.type === PitchRollHeaveType.singleScale
          ? [
              {
                size: VesselImageSize.large,
                vesselImage: this.vesselImageSide,
                transform: `rotate(${this.pitch}deg)`,
              },
              {
                size: VesselImageSize.large,
                vesselImage: this.vesselImageFore,
                transform: `rotate(${this.roll}deg) scale(${this.normalizedScaleForeImage})`,
              },
            ]
          : []}
        .tickmarks=${tickmarks}
        .advices=${this.advices}
      ></obc-watch>
    `;
  }

  /**
   * Vertical linear heave gauge rendered with the shared
   * {@link watchfaceLinear} building block. Centred in `dual-scale` with the
   * tick scale on the right; flush with the left tile edge and mirrored (tick
   * scale on the left) otherwise.
   */
  private renderHeaveGauge() {
    const mirrored = !this.isDualScale;
    const transform = mirrored
      ? `translate(${GAUGE_LEFT_CENTRE_X} 0) scale(-1 1)`
      : 'translate(0 0)';
    return svg`
      <g transform=${transform}>
        ${watchfaceLinear(
          {
            height: GAUGE_HEIGHT,
            width: GAUGE_WIDTH,
            scaleWidth: GAUGE_SCALE_WIDTH,
            minValue: -this.heaveRange,
            maxValue: this.heaveRange,
          },
          [
            {
              min: this.minTrendHeave,
              max: this.maxTrendHeave,
            },
          ],
          {value: this.heave},
          {container: 'var(--instrument-frame-primary-color)'},
          {
            hideContainer: false,
            off: false,
            priority: this.priorityFor(PitchRollHeavePriorityElement.heave),
          },
          {
            mainTickmarks: [0],
            primaryTickmarkInterval: this.heaveRange <= 5 ? 1 : 5,
            secondaryTickmarkInterval: this.heaveRange <= 5 ? 0.5 : 1,
          },
          this.heaveAdvices
        )}
      </g>
    `;
  }

  private get heaveAdvices(): LinearAdviceRaw[] {
    return this.heaveAdvice.map((advice) => {
      const isActive =
        this.maxTrendHeave >= advice.min && this.minTrendHeave <= advice.max;
      const state = isActive
        ? AdviceState.triggered
        : advice.hinted
          ? AdviceState.hinted
          : AdviceState.regular;
      return {
        ...advice,
        state,
      } satisfies LinearAdviceRaw;
    });
  }

  private get advices(): AngleAdviceRaw[] {
    const advices: AngleAdviceRaw[] = [];
    const pushPair = (
      center: number,
      inner: number,
      outer: number,
      state: AdviceState
    ) => {
      advices.push({
        minAngle: center - outer,
        maxAngle: center - inner,
        type: AdviceType.caution,
        state,
        hideMinTickmark: true,
      });
      advices.push({
        minAngle: center + inner,
        maxAngle: center + outer,
        type: AdviceType.caution,
        state,
        hideMaxTickmark: true,
      });
    };
    if (this.maxPitchAdvice !== undefined) {
      const outer = Math.min(this.normalizedPitchArcAngle, 30);
      const inner = Math.min(this.maxPitchAdvice, outer);
      const state = this.triggerPitchAdvice
        ? AdviceState.triggered
        : AdviceState.regular;
      pushPair(90, inner, outer, state);
      if (this.isDualScale) {
        pushPair(270, inner, outer, state);
      }
    }
    if (this.maxRollAdvice !== undefined) {
      const outer = Math.min(this.normalizedRollArcAngle, 45);
      const inner = Math.min(this.maxRollAdvice, outer);
      const state = this.triggerRollAdvice
        ? AdviceState.triggered
        : AdviceState.regular;
      pushPair(180, inner, outer, state);
      if (this.isDualScale) {
        pushPair(0, inner, outer, state);
      }
    }
    return advices;
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

    .readout {
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .readout-group {
      display: flex;
      flex-direction: column;
      align-items: center;
      width: fit-content;
    }

    .readout-divider {
      align-self: stretch;
      height: 1px;
      background: var(--border-divider-color);
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-pitch-roll-heave': ObcPitchRollHeave;
  }
}
