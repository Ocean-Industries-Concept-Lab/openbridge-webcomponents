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
  type WatchArea,
} from '../watch/watch.js';
import '../readout/readout.js';
import {ReadoutDirection, ReadoutVariant} from '../readout/readout.js';
import {Priority} from '../types.js';
import {TickmarkType} from '../watch/tickmark.js';
import {AdviceState, AdviceType, AngleAdviceRaw} from '../watch/advice.js';
import {customElement} from '../../decorator.js';
import {
  computeZoomToFitArcFrame,
  normalizeArcAngle,
  shiftArcFrameToOuterEdge,
  type ZoomToFitArcFrame,
} from '../../svghelpers/arc-frame.js';

const watchRadius = OUTER_RING_RADIUS;
/** Half-side of the centre overlay viewBox in SVG units. */
const CENTRE_HALF = 200;

export enum ObcRollType {
  /** Single arc scale at the bottom (default). */
  singleScale = 'single-scale',
  /** Bottom scale duplicated to the top as well. */
  dualScale = 'dual-scale',
}

/**
 * `<obc-roll>` — Roll (heel) indicator with a bottom arc scale.
 *
 * Shows `roll` against a watch arc centred at the bottom, with an average-roll
 * band and a rotating indicator. Supports an optional top scale (`dual-scale`),
 * a centre readout (`hasReadout`), and a `regular`/`enhanced` palette. See the
 * individual properties for details.
 *
 * @element obc-roll
 */
@customElement('obc-roll')
export class ObcRoll extends LitElement {
  @property({type: Number}) roll = 0;
  @property({type: Number}) minAvgRoll = 0;
  @property({type: Number}) maxAvgRoll = 0;
  @property({type: String}) vesselImageFore: VesselImage = VesselImage.psvFore;
  @property({type: Number}) scaleForeImage = 1;
  @property({type: Number}) maxRollAdvice: number | undefined = undefined;
  @property({type: Boolean}) triggerRollAdvice = false;
  @property({type: Boolean}) zoomToFitArc: boolean = false;
  /**
   * When `true`, the centre shows an `<obc-readout>` with the roll value
   * (label `Roll`, unit `DEG`) instead of the horizon line, rotating indicator
   * and vessel. Default `false`.
   */
  @property({type: Boolean}) hasReadout: boolean = false;
  /**
   * `single-scale` shows one arc at the bottom (default); `dual-scale` also
   * shows the scale on the top arc (the indicator's opposite end).
   */
  @property({type: String}) type: ObcRollType = ObcRollType.singleScale;
  /**
   * Colour palette for the scale fill / indicator and the readout value:
   * `regular` (default) or `enhanced`.
   */
  @property({type: String}) priority: Priority = Priority.regular;
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

  private get normalizedScaleForeImage(): number {
    if (!Number.isFinite(this.scaleForeImage)) {
      return 1;
    }
    return Math.max(0, Math.min(2, this.scaleForeImage));
  }

  private get scaleFillColor(): string {
    return this.priority === Priority.enhanced
      ? 'var(--instrument-enhanced-tertiary-color)'
      : 'var(--instrument-regular-tertiary-color)';
  }

  private get indicatorColor(): string {
    return this.priority === Priority.enhanced
      ? 'var(--instrument-enhanced-secondary-color)'
      : 'var(--instrument-regular-secondary-color)';
  }

  override render() {
    const arcAngle = normalizeArcAngle(this.arcAngle, 45);
    // Outer thin-ring complement endpoints. The arc band is centred at
    // watch angle 180° (bottom) and spans 180° ± arcAngle, so its edges
    // sit at SVG coords (±R·sin(arcAngle), R·cos(arcAngle)).
    const x = watchRadius * Math.sin((arcAngle * Math.PI) / 180);
    const y = watchRadius * Math.cos((arcAngle * Math.PI) / 180);

    const areas: WatchArea[] = [
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
          ${this.hasReadout
            ? nothing
            : svg`
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
                  stroke="${this.indicatorColor}"
                  transform="${needleTransform}"
                />
                <g
                  style="transform: rotate(${this.roll}deg) scale(${vesselScale * this.normalizedScaleForeImage}) translate(-80px, -80px);"
                >
                  ${this.zoomToFitArc ? vesselImages[this.vesselImageFore] : nothing}
                </g>
              `}
          ${this.zoomToFitArc
            ? nothing
            : svg`
                <path
                  d="M ${-x} ${y} A ${watchRadius} ${watchRadius} 0 1 1 ${x} ${y}"
                  fill="none"
                  stroke="var(--instrument-frame-tertiary-color)"
                />
              `}
        </svg>
        ${this.renderScale(areas, false)}
        ${this.type === ObcRollType.dualScale
          ? this.renderScale(areas, true)
          : nothing}
        ${this.hasReadout
          ? html`<div class="readout">
              <obc-readout
                .variant=${ReadoutVariant.enhanced}
                .direction=${ReadoutDirection.vertical}
                .hasSetpoint=${false}
                .hasAdvice=${false}
                .value=${this.roll}
                .fractionDigits=${0}
                .valuePriority=${this.priority}
                label="Roll"
                unit="DEG"
              ></obc-readout>
            </div>`
          : nothing}
      </div>
    `;
  }

  // `top` rotates a second watch 180° onto the top arc for dual-scale — a
  // rotation (opposite end of the indicator), not a mirror. A separate watch
  // keeps the zoomed `arcFrame` correct.
  private renderScale(areas: WatchArea[], top: boolean) {
    return html`
      <obc-watch
        class=${top ? 'scale-top' : nothing}
        .priority=${this.priority}
        .watchCircleType=${WatchCircleType.double}
        .zoomToFitArc=${this.zoomToFitArc}
        .arcFrame=${this._arcFrame}
        tickmarksInside
        .areas=${areas}
        .barAreas=${[
          {
            startAngle: 180 + this.minAvgRoll,
            endAngle: 180 + this.maxAvgRoll,
            fillColor: this.scaleFillColor,
          },
        ]}
        .needles=${[
          {
            angle: 180 + this.roll,
            fillColor: this.indicatorColor,
            strokeColor: 'var(--border-silhouette-color)',
          },
        ]}
        .vessels=${top || this.zoomToFitArc || this.hasReadout
          ? []
          : [
              {
                size: VesselImageSize.large,
                vesselImage: this.vesselImageFore,
                transform: `rotate(${this.roll}deg) scale(${this.normalizedScaleForeImage})`,
              },
            ]}
        .tickmarks=${[{angle: 180, type: TickmarkType.main}]}
        .advices=${this.advices}
      ></obc-watch>
    `;
  }

  private get advices(): AngleAdviceRaw[] {
    if (this.maxRollAdvice === undefined) {
      return [];
    }
    const arcAngle = normalizeArcAngle(this.arcAngle, 45);
    // Caution band fills the remainder of the arc out to a default 45° caution
    // range (clamped to the arc edge).
    const outer = Math.min(arcAngle, 45);
    const inner = Math.min(this.maxRollAdvice, outer);
    const state = this.triggerRollAdvice
      ? AdviceState.triggered
      : AdviceState.regular;
    return [
      {
        minAngle: 180 - outer,
        maxAngle: 180 - inner,
        type: AdviceType.caution,
        state: state,
        hideMinTickmark: true,
      },
      {
        minAngle: 180 + inner,
        maxAngle: 180 + outer,
        type: AdviceType.caution,
        state: state,
        hideMaxTickmark: true,
      },
    ];
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

    .scale-top {
      transform: rotate(180deg);
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-roll': ObcRoll;
  }
}
