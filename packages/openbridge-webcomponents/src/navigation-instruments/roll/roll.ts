import {LitElement, css, html, nothing, svg} from 'lit';
import {property} from 'lit/decorators.js';
import '../watch/watch.js';
import {
  OUTER_RING_RADIUS,
  VesselImage,
  VesselImageSize,
  WatchCircleType,
  innerRingRadiusFor,
  vesselImages,
} from '../watch/watch.js';
import {TickmarkType} from '../watch/tickmark.js';
import {AdviceState, AdviceType, AngleAdviceRaw} from '../watch/advice.js';
import {customElement} from '../../decorator.js';
import {
  computeZoomToFitArcFrame,
  shiftArcFrameToOuterEdge,
  type ZoomToFitArcFrame,
} from '../../svghelpers/arc-frame.js';

const watchRadius = OUTER_RING_RADIUS;
/** Half-side of the centre overlay viewBox in SVG units. */
const CENTRE_HALF = 200;

@customElement('obc-roll')
export class ObcRoll extends LitElement {
  @property({type: Number}) roll = 0;
  @property({type: Number}) minAvgRoll = 0;
  @property({type: Number}) maxAvgRoll = 0;
  @property({type: String}) vesselImageFore: VesselImage = VesselImage.psvFore;
  @property({type: Number}) maxRollAdvice: number | undefined = undefined;
  @property({type: Boolean}) triggerRollAdvice = false;
  @property({type: Boolean}) zoomToFitArc: boolean = false;
  /**
   * Half-extent of the watch arc in degrees. The arc spans `180° ± arcAngle`
   * and roll values are placed at their true position within it. Default
   * `45` reproduces the historical 90°-wide arc.
   *
   * Smaller values render a narrower arc. Combined with `zoomToFitArc`, the
   * narrower arc is enlarged (its radius grows) on its own layer, while the
   * vessel image and the rotating indicator line stay at their natural size
   * and position on a separate central layer. The two layers are
   * intentionally visually disconnected.
   */
  @property({type: Number}) arcAngle: number = 45;

  private _arcFrame: ZoomToFitArcFrame | undefined;

  override render() {
    const arcAngle = Math.max(2, this.arcAngle);
    const cutAngle = 180 - arcAngle;
    const x = watchRadius * Math.cos((cutAngle * Math.PI) / 180);
    const y = watchRadius * Math.sin((cutAngle * Math.PI) / 180);

    const areas = [
      {
        startAngle: 180 - arcAngle,
        endAngle: 180 + arcAngle,
        roundOutsideCut: true,
        roundInsideCut: true,
      },
    ];

    if (this.zoomToFitArc) {
      const ext = 48;
      const targetSize = (176 + ext) * 2;
      // Pure arc-only fit (compass-sector style). The viewBox is centred on
      // the enlarged arc bbox, so the origin (centre of the instrument) is
      // typically OUTSIDE this viewBox. The vessel and central elements
      // therefore need their own normal-scale layer.
      const baseFrame = computeZoomToFitArcFrame({
        areas,
        outerRadius: OUTER_RING_RADIUS,
        innerRadius: innerRingRadiusFor(WatchCircleType.double),
        extension: ext,
        targetSize,
      });
      // Push the enlarged arc to the side so its outer edge aligns with the
      // central layer's outer ring. Direction is derived from the arc bbox
      // centre so left/right/top/bottom is handled automatically.
      this._arcFrame = shiftArcFrameToOuterEdge(
        baseFrame,
        OUTER_RING_RADIUS + baseFrame.radiusOffset,
        OUTER_RING_RADIUS,
        CENTRE_HALF
      );
    } else {
      this._arcFrame = undefined;
    }

    const needleTransform = `rotate(${this.roll} 0 0)`;
    const centreViewBox = `-${CENTRE_HALF} -${CENTRE_HALF} ${CENTRE_HALF * 2} ${CENTRE_HALF * 2}`;
    const vesselScale = 224 / 160;

    return html`
      <div class="container">
        <svg viewBox="${centreViewBox}">
          ${svg`
            <line
              x1="-${watchRadius}"
              y1="0"
              x2="${watchRadius}"
              y2="0"
              stroke="var(--instrument-frame-tertiary-color)"
            />
            <line
              x1="0"
              y1="0"
              y2="${watchRadius - 10}"
              x2="0"
              stroke="var(--instrument-enhanced-secondary-color)"
              transform="${needleTransform}"
            />
            <g
              style="transform: rotate(${this.roll}deg) scale(${vesselScale}) translate(-80px, -80px);"
            >
              ${vesselImages[this.vesselImageFore]}
            </g>
            ${
              this.zoomToFitArc
                ? nothing
                : svg`
                    <path
                      d="M ${x} ${y} A ${watchRadius} ${watchRadius} 0 1 1 ${-x} ${y}"
                      fill="none"
                      stroke="var(--instrument-frame-tertiary-color)"
                    />
                  `
            }
          `}
        </svg>
        <obc-watch
          .watchCircleType=${WatchCircleType.double}
          .zoomToFitArc=${this.zoomToFitArc}
          .arcFrame=${this._arcFrame}
          tickmarksInside
          .areas=${areas}
          .barAreas=${[
            {
              startAngle: 180 + this.minAvgRoll,
              endAngle: 180 + this.maxAvgRoll,
              fillColor: 'var(--instrument-enhanced-tertiary-color)',
            },
          ]}
          .needles=${[
            {
              angle: 180 + this.roll,
              fillColor: 'var(--instrument-enhanced-secondary-color)',
              strokeColor: 'var(--border-silhouette-color)',
            },
          ]}
          .vessels=${this.zoomToFitArc
            ? []
            : [
                {
                  size: VesselImageSize.large,
                  vesselImage: this.vesselImageFore,
                  transform: `rotate(${this.roll}deg)`,
                },
              ]}
          .tickmarks=${[
            {
              angle: 180,
              type: TickmarkType.main,
            },
          ]}
          .advices=${this.advices}
        ></obc-watch>
      </div>
    `;
  }

  private get advices(): AngleAdviceRaw[] {
    const advices = [];
    if (this.maxRollAdvice !== undefined) {
      const arcAngle = Math.max(2, this.arcAngle);
      // Caution band fills the remainder of the arc out to a default 45°
      // caution range (clamped to the arc edge).
      const outer = Math.min(arcAngle, 45);
      const inner = Math.min(this.maxRollAdvice, outer);
      const state = this.triggerRollAdvice
        ? AdviceState.triggered
        : AdviceState.regular;
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
    'obc-roll': ObcRoll;
  }
}
