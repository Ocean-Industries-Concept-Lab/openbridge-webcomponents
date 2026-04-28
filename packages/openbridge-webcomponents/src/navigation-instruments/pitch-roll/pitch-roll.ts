import {LitElement, css, html, svg} from 'lit';
import {property} from 'lit/decorators.js';
import '../watch/watch.js';
import {
  VesselImage,
  VesselImageSize,
  WatchCircleType,
  type WatchArea,
  OUTER_RING_RADIUS,
  innerRingRadiusFor,
  vesselImages,
} from '../watch/watch.js';
import {TickmarkType} from '../watch/tickmark.js';
import {AdviceState, AdviceType, AngleAdviceRaw} from '../watch/advice.js';
import {customElement} from '../../decorator.js';
import {Priority} from '../types.js';
import {
  computeZoomToFitArcFrame,
  shiftArcFrameToOuterEdge,
} from '../../svghelpers/arc-frame.js';

export enum PitchRollPriorityElement {
  pitch = 'pitch',
  roll = 'roll',
}

/** Half-side of the centre overlay viewBox in SVG units. */
const CENTRE_HALF = 200;

@customElement('obc-pitch-roll')
export class ObcPitchRoll extends LitElement {
  @property({type: Number}) pitch = 0;
  @property({type: Number}) roll = 0;
  @property({type: Number}) minAvgPitch = 0;
  @property({type: Number}) maxAvgPitch = 0;
  @property({type: Number}) minAvgRoll = 0;
  @property({type: Number}) maxAvgRoll = 0;
  @property({type: String}) vesselImageFore: VesselImage = VesselImage.psvFore;
  @property({type: String}) vesselImageSide: VesselImage = VesselImage.psvSide;
  @property({type: Number}) maxPitchAdvice: number | undefined = undefined;
  @property({type: Number}) maxRollAdvice: number | undefined = undefined;
  @property({type: Boolean}) triggerPitchAdvice = false;
  @property({type: Boolean}) triggerRollAdvice = false;
  @property({type: String}) priority: Priority = Priority.regular;
  @property({type: Array, attribute: false})
  priorityElements: PitchRollPriorityElement[] = [
    PitchRollPriorityElement.pitch,
    PitchRollPriorityElement.roll,
  ];
  @property({type: Boolean}) zoomToFitArc: boolean = false;
  /**
   * Half-extent of each of the four watch arcs in degrees, measured from the
   * arc's natural center (0°/90°/180°/270°). Each arc spans
   * `center ± arcAngle`. Default `30` reproduces the historical 60°-wide
   * arcs; smaller values produce narrower arcs that, combined with
   * `zoomToFitArc`, reveal more detail in the relevant motion range.
   */
  @property({type: Number}) arcAngle: number = 30;

  private priorityFor(element: PitchRollPriorityElement): Priority {
    const selected = Array.isArray(this.priorityElements)
      ? this.priorityElements
      : [];
    return selected.includes(element) ? this.priority : Priority.regular;
  }

  private needleColor(element: PitchRollPriorityElement): string {
    return this.priorityFor(element) === Priority.enhanced
      ? 'var(--instrument-enhanced-secondary-color)'
      : 'var(--instrument-regular-secondary-color)';
  }

  private barColor(element: PitchRollPriorityElement): string {
    return this.priorityFor(element) === Priority.enhanced
      ? 'var(--instrument-enhanced-tertiary-color)'
      : 'var(--instrument-regular-tertiary-color)';
  }

  override render() {
    const arcAngle = Math.max(2, this.arcAngle);
    const areas = [
      {
        startAngle: 90 - arcAngle,
        endAngle: 90 + arcAngle,
        roundOutsideCut: true,
        roundInsideCut: true,
      },
      {
        startAngle: 270 - arcAngle,
        endAngle: 270 + arcAngle,
        roundOutsideCut: true,
        roundInsideCut: true,
      },
      {
        startAngle: 360 - arcAngle,
        endAngle: arcAngle,
        roundOutsideCut: true,
        roundInsideCut: true,
      },
      {
        startAngle: 180 - arcAngle,
        endAngle: 180 + arcAngle,
        roundOutsideCut: true,
        roundInsideCut: true,
      },
    ];

    const overlayViewBox = `-${CENTRE_HALF} -${CENTRE_HALF} ${CENTRE_HALF * 2} ${CENTRE_HALF * 2}`;
    const vesselScale = 224 / 160;

    return html`
      <div class="container">
        <svg viewBox="${overlayViewBox}">
          ${svg`
            <line
              x1="-150"
              y1="0"
              x2="150"
              y2="0"
              stroke="var(--instrument-frame-tertiary-color)"
            />
            <g
              style="transform: rotate(${this.pitch}deg) scale(${vesselScale}) translate(-80px, -80px);"
            >
              ${vesselImages[this.vesselImageSide]}
            </g>
            <g
              style="transform: rotate(${this.roll}deg) scale(${vesselScale}) translate(-80px, -80px);"
            >
              ${vesselImages[this.vesselImageFore]}
            </g>
          `}
        </svg>
        ${this.zoomToFitArc
          ? this.renderZoomedArcs(arcAngle)
          : this.renderFullWatch(areas)}
      </div>
    `;
  }

  /**
   * Zoomed-arc layer: four CSS-rotated `<obc-watch>` instances, each
   * containing a single arc rendered at the watch's natural top
   * (`0° ± arcAngle`). Each watch handles its own `zoomToFitArc` framing,
   * so each visible arc spans almost the full container — exactly like the
   * pitch and roll narrow stories. The four are rotated 0 / 90 / 180 / 270
   * to land at top / right / bottom / left. Top + bottom carry roll data,
   * right + left carry pitch data.
   */
  private renderZoomedArcs(arcAngle: number) {
    const subAreas = [
      {
        startAngle: -arcAngle,
        endAngle: arcAngle,
        roundOutsideCut: true,
        roundInsideCut: true,
      },
    ];
    const tickmarks = [{angle: 0, type: TickmarkType.main}];

    // Compute one shared arc-frame for every sub-watch (they all render the
    // same single top-arc geometry). The frame is shifted upward so the
    // arc's outer edge aligns with the central layer's outer ring; CSS
    // rotation then carries that alignment to the right/bottom/left sides.
    const ext = 48;
    const targetSize = (176 + ext) * 2;
    const baseFrame = computeZoomToFitArcFrame({
      areas: subAreas,
      outerRadius: OUTER_RING_RADIUS,
      innerRadius: innerRingRadiusFor(WatchCircleType.double),
      extension: ext,
      targetSize,
    });
    const subArcFrame = shiftArcFrameToOuterEdge(
      baseFrame,
      OUTER_RING_RADIUS + baseFrame.radiusOffset,
      OUTER_RING_RADIUS,
      CENTRE_HALF
    );

    const rollAdvices = this.subAdvices('roll');
    const pitchAdvices = this.subAdvices('pitch');

    const rollNeedles = [
      {
        angle: this.roll,
        fillColor: this.needleColor(PitchRollPriorityElement.roll),
        strokeColor: 'var(--border-silhouette-color)',
      },
    ];
    const pitchNeedles = [
      {
        angle: this.pitch,
        fillColor: this.needleColor(PitchRollPriorityElement.pitch),
        strokeColor: 'var(--border-silhouette-color)',
      },
    ];
    const rollBars = [
      {
        startAngle: this.minAvgRoll,
        endAngle: this.maxAvgRoll,
        fillColor: this.barColor(PitchRollPriorityElement.roll),
      },
    ];
    const pitchBars = [
      {
        startAngle: this.minAvgPitch,
        endAngle: this.maxAvgPitch,
        fillColor: this.barColor(PitchRollPriorityElement.pitch),
      },
    ];

    const subWatch = (
      rotation: number,
      barAreas: typeof rollBars,
      needles: typeof rollNeedles,
      advices: AngleAdviceRaw[]
    ) => html`
      <obc-watch
        class="sub-watch"
        style="transform: rotate(${rotation}deg);"
        .watchCircleType=${WatchCircleType.double}
        .zoomToFitArc=${true}
        .arcFrame=${subArcFrame}
        .areas=${subAreas}
        .barAreas=${barAreas}
        .needles=${needles}
        .vessels=${[]}
        .tickmarks=${tickmarks}
        .advices=${advices}
      ></obc-watch>
    `;

    return html`
      ${subWatch(0, rollBars, rollNeedles, rollAdvices)}
      ${subWatch(90, pitchBars, pitchNeedles, pitchAdvices)}
      ${subWatch(180, rollBars, rollNeedles, rollAdvices)}
      ${subWatch(270, pitchBars, pitchNeedles, pitchAdvices)}
    `;
  }

  /**
   * Caution advices for a single sub-watch axis, emitted at sub-watch local
   * angles (centred on 0°). Outer extent is clamped to the sub-arc's half
   * width, mirroring the original `advices` getter logic for one cardinal
   * side only.
   */
  private subAdvices(axis: 'pitch' | 'roll'): AngleAdviceRaw[] {
    const arcAngle = Math.max(2, this.arcAngle);
    const advices: AngleAdviceRaw[] = [];
    const max = axis === 'pitch' ? this.maxPitchAdvice : this.maxRollAdvice;
    if (max === undefined) return advices;
    const trigger =
      axis === 'pitch' ? this.triggerPitchAdvice : this.triggerRollAdvice;
    const cap = axis === 'pitch' ? 30 : 45;
    const outer = Math.min(arcAngle, cap);
    const inner = Math.min(max, outer);
    const state = trigger ? AdviceState.triggered : AdviceState.regular;
    advices.push({
      minAngle: -outer,
      maxAngle: -inner,
      type: AdviceType.caution,
      state,
      hideMinTickmark: true,
    });
    advices.push({
      minAngle: inner,
      maxAngle: outer,
      type: AdviceType.caution,
      state,
      hideMaxTickmark: true,
    });
    return advices;
  }

  /** Full unzoomed watch — original single-instance render. */
  private renderFullWatch(areas: WatchArea[]) {
    return html`
      <obc-watch
        .watchCircleType=${WatchCircleType.double}
        .zoomToFitArc=${false}
        .areas=${areas}
        .barAreas=${[
          {
            startAngle: this.minAvgRoll,
            endAngle: this.maxAvgRoll,
            fillColor: this.barColor(PitchRollPriorityElement.roll),
          },
          {
            startAngle: 180 + this.minAvgRoll,
            endAngle: 180 + this.maxAvgRoll,
            fillColor: this.barColor(PitchRollPriorityElement.roll),
          },
          {
            startAngle: 90 + this.minAvgPitch,
            endAngle: 90 + this.maxAvgPitch,
            fillColor: this.barColor(PitchRollPriorityElement.pitch),
          },
          {
            startAngle: 270 + this.minAvgPitch,
            endAngle: 270 + this.maxAvgPitch,
            fillColor: this.barColor(PitchRollPriorityElement.pitch),
          },
        ]}
        .needles=${[
          {
            angle: this.roll,
            fillColor: this.needleColor(PitchRollPriorityElement.roll),
            strokeColor: 'var(--border-silhouette-color)',
          },
          {
            angle: 180 + this.roll,
            fillColor: this.needleColor(PitchRollPriorityElement.roll),
            strokeColor: 'var(--border-silhouette-color)',
          },
          {
            angle: 90 + this.pitch,
            fillColor: this.needleColor(PitchRollPriorityElement.pitch),
            strokeColor: 'var(--border-silhouette-color)',
          },
          {
            angle: 270 + this.pitch,
            fillColor: this.needleColor(PitchRollPriorityElement.pitch),
            strokeColor: 'var(--border-silhouette-color)',
          },
        ]}
        .vessels=${[
          {
            size: VesselImageSize.large,
            vesselImage: this.vesselImageSide,
            transform: `rotate(${this.pitch}deg)`,
          },
          {
            size: VesselImageSize.large,
            vesselImage: this.vesselImageFore,
            transform: `rotate(${this.roll}deg)`,
          },
        ]}
        .tickmarks=${[
          {angle: 0, type: TickmarkType.main},
          {angle: 90, type: TickmarkType.main},
          {angle: 180, type: TickmarkType.main},
          {angle: 270, type: TickmarkType.main},
        ]}
        .advices=${this.advices}
      ></obc-watch>
    `;
  }

  private get advices(): AngleAdviceRaw[] {
    const arcAngle = Math.max(2, this.arcAngle);
    const advices = [];
    if (this.maxPitchAdvice !== undefined) {
      const outer = Math.min(arcAngle, 30);
      const inner = Math.min(this.maxPitchAdvice, outer);
      const state = this.triggerPitchAdvice
        ? AdviceState.triggered
        : AdviceState.regular;
      advices.push({
        minAngle: 90 - outer,
        maxAngle: 90 - inner,
        type: AdviceType.caution,
        state: state,
        hideMinTickmark: true,
      });
      advices.push({
        minAngle: 90 + inner,
        maxAngle: 90 + outer,
        type: AdviceType.caution,
        state: state,
        hideMaxTickmark: true,
      });
      advices.push({
        minAngle: 270 - outer,
        maxAngle: 270 - inner,
        type: AdviceType.caution,
        state: state,
        hideMinTickmark: true,
      });
      advices.push({
        minAngle: 270 + inner,
        maxAngle: 270 + outer,
        type: AdviceType.caution,
        state: state,
        hideMaxTickmark: true,
      });
    }
    if (this.maxRollAdvice !== undefined) {
      const outer = Math.min(arcAngle, 45);
      const inner = Math.min(this.maxRollAdvice, outer);
      const state = this.triggerRollAdvice
        ? AdviceState.triggered
        : AdviceState.regular;
      advices.push({
        minAngle: -outer,
        maxAngle: -inner,
        type: AdviceType.caution,
        state: state,
        hideMinTickmark: true,
      });
      advices.push({
        minAngle: inner,
        maxAngle: outer,
        type: AdviceType.caution,
        state: state,
        hideMaxTickmark: true,
      });
      advices.push({
        minAngle: 180 - outer,
        maxAngle: 180 - inner,
        type: AdviceType.caution,
        state: state,
        hideMinTickmark: true,
      });
      advices.push({
        minAngle: 180 + inner,
        maxAngle: 180 + outer,
        type: AdviceType.caution,
        state: state,
        hideMaxTickmark: true,
      });
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
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-pitch-roll': ObcPitchRoll;
  }
}
