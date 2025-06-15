import {LitElement, css, html} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import '../watch/watch.js';
import {VesselImage, VesselImageSize, WatchCircleType, OUTER_RING_RADIUS} from '../watch/watch.js';
import {TickmarkType} from '../watch/tickmark.js';
import {AdviceState, AdviceType, AngleAdviceRaw} from '../watch/advice.js';


const cutAngle = 45;
const watchRadius = OUTER_RING_RADIUS;
const x = watchRadius * Math.cos(cutAngle * Math.PI / 180);
const y = watchRadius * Math.sin(cutAngle * Math.PI / 180);

@customElement('obc-pitch')
export class ObcPitch extends LitElement {
  @property({type: Number}) pitch = 0;
  @property({type: Number}) minAvgPitch = 0;
  @property({type: Number}) maxAvgPitch = 0;
  @property({type: String}) vesselImageSide: VesselImage = VesselImage.psvSide;
  @property({type: Number}) maxPitchAdvice: number | undefined = undefined;
  @property({type: Boolean}) triggerPitchAdvice = false;

  override render() {
    return html`
      <div class="container">
        <svg viewBox="-200 -200 400 400">
          <line
            x1="-${watchRadius}"
            y1="0"
            x2="${watchRadius}"
            y2="0"
            stroke="var(--instrument-frame-tertiary-color)"
          />
          <line x1="0" y1="0" x2="${watchRadius-10}" y2="0" stroke="var(--instrument-enhanced-secondary-color)" transform="rotate(${this.pitch} 0 0)"/>
          <path d="M ${x} ${y} A ${watchRadius} ${watchRadius} 0 1 1 ${x} ${-y}" fill="none" stroke="var(--instrument-frame-tertiary-color)" />
        </svg>
        <obc-watch
          .watchCircleType=${WatchCircleType.double}
          .areas=${[
            {
              startAngle: cutAngle,
              endAngle: 180 - cutAngle,
              roundOutsideCut: true,
              roundInsideCut: true,
            },
          ]}
          .barAreas=${[
            {
              startAngle: 90 + this.minAvgPitch,
              endAngle: 90 + this.maxAvgPitch,
              fillColor: 'var(--instrument-enhanced-tertiary-color)',
            },
          ]}
          .needles=${[
            {
              angle: 90 + this.pitch,
              fillColor: 'var(--instrument-enhanced-secondary-color)',
              strokeColor: 'var(--border-silhouette-color)',
            },
          ]}
          .vessels=${[
            {
              size: VesselImageSize.large,
              vesselImage: this.vesselImageSide,
              transform: `rotate(${this.pitch}deg)`,
            },
          ]}
          .tickmarks=${[
            {
              angle: 90,
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
    if (this.maxPitchAdvice !== undefined) {
      const state = this.triggerPitchAdvice
        ? AdviceState.triggered
        : AdviceState.regular;
      advices.push({
        minAngle: 60,
        maxAngle: 90 - this.maxPitchAdvice,
        type: AdviceType.caution,
        state: state,
        hideMinTickmark: true,
      });
      advices.push({
        minAngle: 90 + this.maxPitchAdvice,
        maxAngle: 120,
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
    'obc-pitch': ObcPitch;
  }
}
