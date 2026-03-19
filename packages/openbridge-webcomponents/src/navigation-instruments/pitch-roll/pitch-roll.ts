import {LitElement, css, html} from 'lit';
import {property} from 'lit/decorators.js';
import '../watch/watch.js';
import {VesselImage, VesselImageSize, WatchCircleType} from '../watch/watch.js';
import {TickmarkType} from '../watch/tickmark.js';
import {AdviceState, AdviceType, AngleAdviceRaw} from '../watch/advice.js';
import {customElement} from '../../decorator.js';
import {Priority} from '../types.js';

export enum PitchRollPriorityElement {
  pitch = 'pitch',
  roll = 'roll',
}

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
    return html`
      <div class="container">
        <svg viewBox="-200 -200 400 400">
          <line
            x1="-150"
            y1="0"
            x2="150"
            y2="0"
            stroke="var(--instrument-frame-tertiary-color)"
          />
        </svg>
        <obc-watch
          .watchCircleType=${WatchCircleType.double}
          .areas=${[
            {
              startAngle: 60,
              endAngle: 120,
              roundOutsideCut: true,
              roundInsideCut: true,
            },
            {
              startAngle: 240,
              endAngle: 300,
              roundOutsideCut: true,
              roundInsideCut: true,
            },
            {
              startAngle: 315,
              endAngle: 45,
              roundOutsideCut: true,
              roundInsideCut: true,
            },
            {
              startAngle: 135,
              endAngle: 225,
              roundOutsideCut: true,
              roundInsideCut: true,
            },
          ]}
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
            {
              angle: 0,
              type: TickmarkType.main,
            },
            {
              angle: 90,
              type: TickmarkType.main,
            },
            {
              angle: 180,
              type: TickmarkType.main,
            },
            {
              angle: 270,
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
      advices.push({
        minAngle: 240,
        maxAngle: 270 - this.maxPitchAdvice,
        type: AdviceType.caution,
        state: state,
        hideMinTickmark: true,
      });
      advices.push({
        minAngle: 270 + this.maxPitchAdvice,
        maxAngle: 300,
        type: AdviceType.caution,
        state: state,
        hideMaxTickmark: true,
      });
    }
    if (this.maxRollAdvice !== undefined) {
      const state = this.triggerRollAdvice
        ? AdviceState.triggered
        : AdviceState.regular;
      advices.push({
        minAngle: -45,
        maxAngle: -this.maxRollAdvice,
        type: AdviceType.caution,
        state: state,
        hideMinTickmark: true,
      });
      advices.push({
        minAngle: this.maxRollAdvice,
        maxAngle: 45,
        type: AdviceType.caution,
        state: state,
        hideMaxTickmark: true,
      });
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
    'obc-pitch-roll': ObcPitchRoll;
  }
}
