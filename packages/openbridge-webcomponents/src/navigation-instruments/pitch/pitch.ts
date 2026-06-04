import {LitElement, css, html, nothing, svg} from 'lit';
import {property} from 'lit/decorators.js';
import '../watch/watch.js';
import {
  VesselImage,
  VesselImageSize,
  WatchCircleType,
  OUTER_RING_RADIUS,
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

export enum ObcPitchType {
  /** Single arc scale on the right (default). */
  singleScale = 'single-scale',
  /** Right scale duplicated to the opposite (left) arc as well. */
  dualScale = 'dual-scale',
}

/**
 * `<obc-pitch>` — Pitch (trim) indicator with a side arc scale.
 *
 * Shows `pitch` against a watch arc centred on the right, with an average-pitch
 * band and a rotating indicator. Supports an optional opposite-side scale
 * (`dual-scale`), a centre readout (`hasReadout`), and a `regular`/`enhanced`
 * palette.
 *
 * @element obc-pitch
 */
@customElement('obc-pitch')
export class ObcPitch extends LitElement {
  @property({type: Number}) pitch = 0;
  @property({type: Number}) minAvgPitch = 0;
  @property({type: Number}) maxAvgPitch = 0;
  @property({type: String}) vesselImageSide: VesselImage = VesselImage.psvSide;
  @property({type: Number}) maxPitchAdvice: number | undefined = undefined;
  @property({type: Boolean}) triggerPitchAdvice = false;
  @property({type: Boolean}) zoomToFitArc: boolean = false;
  /**
   * When `true`, the centre shows an `<obc-readout>` with the pitch value
   * (label `Pitch`, unit `DEG`) instead of the horizon line, rotating indicator
   * and vessel. Default `false`.
   */
  @property({type: Boolean}) hasReadout: boolean = false;
  /**
   * `single-scale` shows one arc on the right (default); `dual-scale` also
   * shows the scale on the opposite (left) arc (the indicator's opposite end).
   */
  @property({type: String}) type: ObcPitchType = ObcPitchType.singleScale;
  /**
   * Colour palette for the scale fill / indicator and the readout value:
   * `regular` (default) or `enhanced`.
   */
  @property({type: String}) priority: Priority = Priority.regular;
  /**
   * Half-extent of the watch arc in degrees. The arc spans `90° ± arcAngle`
   * and pitch values are placed at their true position within it. Default
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
    // watch angle 90° (right side) and spans 90° ± arcAngle, so its edges
    // sit at SVG coords (R·cos(arcAngle), ±R·sin(arcAngle)).
    const x = watchRadius * Math.cos((arcAngle * Math.PI) / 180);
    const y = watchRadius * Math.sin((arcAngle * Math.PI) / 180);

    const areas: WatchArea[] = [
      {
        startAngle: 90 - arcAngle,
        endAngle: 90 + arcAngle,
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

    const needleTransform = `rotate(${this.pitch} 0 0)`;
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
                  x2="${watchRadius - 10}"
                  y2="0"
                  stroke="${this.indicatorColor}"
                  transform="${needleTransform}"
                />
                <g
                  style="transform: rotate(${this.pitch}deg) scale(${vesselScale}) translate(-80px, -80px);"
                >
                  ${this.zoomToFitArc ? vesselImages[this.vesselImageSide] : nothing}
                </g>
              `}
          ${this.zoomToFitArc
            ? nothing
            : this.type === ObcPitchType.dualScale
              ? svg`
                  <path
                    d="M ${x} ${-y} A ${watchRadius} ${watchRadius} 0 0 0 ${-x} ${-y}"
                    fill="none"
                    stroke="var(--instrument-frame-tertiary-color)"
                  />
                  <path
                    d="M ${x} ${y} A ${watchRadius} ${watchRadius} 0 0 1 ${-x} ${y}"
                    fill="none"
                    stroke="var(--instrument-frame-tertiary-color)"
                  />
                `
              : svg`
                  <path
                    d="M ${x} ${y} A ${watchRadius} ${watchRadius} 0 1 1 ${x} ${-y}"
                    fill="none"
                    stroke="var(--instrument-frame-tertiary-color)"
                  />
                `}
        </svg>
        ${this.renderScale(areas, false)}
        ${this.type === ObcPitchType.dualScale
          ? this.renderScale(areas, true)
          : nothing}
        ${this.hasReadout
          ? html`<div class="readout">
              <obc-readout
                .variant=${ReadoutVariant.enhanced}
                .direction=${ReadoutDirection.vertical}
                .hasSetpoint=${false}
                .hasAdvice=${false}
                .value=${this.pitch}
                .fractionDigits=${0}
                .valuePriority=${this.priority}
                label="Pitch"
                unit="DEG"
              ></obc-readout>
            </div>`
          : nothing}
      </div>
    `;
  }

  // `opposite` rotates a second watch 180° onto the opposite (left) arc for
  // dual-scale — a rotation (opposite end of the indicator), not a mirror. A
  // separate watch keeps the zoomed `arcFrame` correct.
  private renderScale(areas: WatchArea[], opposite: boolean) {
    return html`
      <obc-watch
        class=${opposite ? 'scale-opposite' : nothing}
        .priority=${this.priority}
        .watchCircleType=${WatchCircleType.double}
        .zoomToFitArc=${this.zoomToFitArc}
        .arcFrame=${this._arcFrame}
        tickmarksInside
        .areas=${areas}
        .barAreas=${[
          {
            startAngle: 90 + this.minAvgPitch,
            endAngle: 90 + this.maxAvgPitch,
            fillColor: this.scaleFillColor,
          },
        ]}
        .needles=${[
          {
            angle: 90 + this.pitch,
            fillColor: this.indicatorColor,
            strokeColor: 'var(--border-silhouette-color)',
          },
        ]}
        .vessels=${opposite || this.zoomToFitArc || this.hasReadout
          ? []
          : [
              {
                size: VesselImageSize.large,
                vesselImage: this.vesselImageSide,
                transform: `rotate(${this.pitch}deg)`,
              },
            ]}
        .tickmarks=${[{angle: 90, type: TickmarkType.main}]}
        .advices=${this.advices}
      ></obc-watch>
    `;
  }

  private get advices(): AngleAdviceRaw[] {
    if (this.maxPitchAdvice === undefined) {
      return [];
    }
    const arcAngle = normalizeArcAngle(this.arcAngle, 45);
    // Caution band fills the remainder of the arc out to a default 30° caution
    // range (clamped to the arc edge).
    const outer = Math.min(arcAngle, 30);
    const inner = Math.min(this.maxPitchAdvice, outer);
    const state = this.triggerPitchAdvice
      ? AdviceState.triggered
      : AdviceState.regular;
    return [
      {
        minAngle: 90 - outer,
        maxAngle: 90 - inner,
        type: AdviceType.caution,
        state: state,
        hideMinTickmark: true,
      },
      {
        minAngle: 90 + inner,
        maxAngle: 90 + outer,
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

    .scale-opposite {
      transform: rotate(180deg);
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-pitch': ObcPitch;
  }
}
