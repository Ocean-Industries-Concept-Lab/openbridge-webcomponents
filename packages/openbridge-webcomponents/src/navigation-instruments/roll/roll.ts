import {LitElement, css, html} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import '../watch/watch.js';
import {OUTER_RING_RADIUS, VesselImage, VesselImageSize, WatchCircleType} from '../watch/watch.js';
import {TickmarkType} from '../watch/tickmark.js';
import {AdviceState, AdviceType, AngleAdviceRaw} from '../watch/advice.js';

const cutAngle = 180 - 45;
const watchRadius = OUTER_RING_RADIUS;
const x = watchRadius * Math.cos(cutAngle * Math.PI / 180);
const y = watchRadius * Math.sin(cutAngle * Math.PI / 180);

@customElement('obc-roll')
export class ObcRoll extends LitElement {
  @property({type: Number}) roll = 0;
  @property({type: Number}) minAvgRoll = 0;
  @property({type: Number}) maxAvgRoll = 0;
  @property({type: String}) vesselImageFore: VesselImage = VesselImage.psvFore;
  @property({type: Number}) maxRollAdvice: number | undefined = undefined;
  @property({type: Boolean}) triggerRollAdvice = false;

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
          <line x1="0" y1="0" y2="${watchRadius-10}" x2="0" stroke="var(--instrument-enhanced-secondary-color)" transform="rotate(${this.roll} 0 0)"/>
          <path d="M ${x} ${y} A ${watchRadius} ${watchRadius} 0 1 1 ${-x} ${y}" fill="none" stroke="var(--instrument-frame-tertiary-color)" />

        </svg>
        <obc-watch
          .watchCircleType=${WatchCircleType.double}
          .areas=${[
            {
              startAngle: 135,
              endAngle: 225,
              roundOutsideCut: true,
              roundInsideCut: true,
            },
          ]}
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
          .vessels=${[
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
      const state = this.triggerRollAdvice
        ? AdviceState.triggered
        : AdviceState.regular;
      advices.push({
        minAngle: 135,
        maxAngle: 180 - this.maxRollAdvice,
        type: AdviceType.caution,
        state: state,
        hideMinTickmark: true,
      });
      advices.push({
        minAngle: 180 + this.maxRollAdvice,
        maxAngle: 225,
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
