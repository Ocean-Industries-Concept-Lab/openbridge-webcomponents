import {LitElement, html, css, nothing} from 'lit';
import {customElement} from '../../decorator.js';
import {watchfaceLinear} from '../../building-blocks/instrument-linear/instrument-linear.js';
import {property} from 'lit/decorators.js';
import {VesselImage} from '../watch/watch.js';
import {vesselImages} from '../watch/vessel.js';
import {
  LinearAdvice,
  LinearAdviceRaw,
} from '../../building-blocks/instrument-linear/advice.js';
import {AdviceState} from '../watch/advice.js';
import {Priority} from '../types.js';

@customElement('obc-heave')
export class ObcHeave extends LitElement {
  @property({type: Number}) heave = 0;
  @property({type: Number}) gainScale = 10;
  @property({type: Number}) minTrendHeave = 0;
  @property({type: Number}) maxTrendHeave = 0;
  @property({type: Number}) draftOffset = 0;
  @property({type: Array}) advice: LinearAdvice[] = [];

  @property({type: Number}) instrumentRange = 10;
  @property({type: String}) vesselImage: VesselImage = VesselImage.psvFore;
  @property({type: String}) priority: Priority = Priority.regular;

  private _toTranslatedValue(value: number) {
    return (value * (this._boxWidth / 2)) / this.instrumentRange;
  }
  _boxWidth = 336;
  _gaugeWidth = 72;
  _scaleWidth = 24;

  private _getAdvice(): LinearAdviceRaw[] {
    return this.advice.map((advice) => {
      const isActive =
        this.maxTrendHeave >= advice.min && this.minTrendHeave <= advice.max;
      const state = isActive
        ? AdviceState.triggered
        : advice.hinted
          ? AdviceState.hinted
          : AdviceState.regular;
      return {
        ...advice,
        min: advice.min,
        max: advice.max,
        state,
      } satisfies LinearAdviceRaw;
    });
  }

  override render() {
    const gaugeOffset = this._boxWidth / 2 - this._gaugeWidth / 2;
    const r = 8;

    return html`
      <div class="container">
        <svg viewbox="-200 -200 400 400">
          <path
            d="M ${this._boxWidth / 2 - this._gaugeWidth} ${-this._boxWidth / 2}
             H ${-this._boxWidth / 2 + r} 
             a ${r} ${r} 0 0 0 ${-r} ${r}
             V ${this._boxWidth / 2 - r}
             a ${r} ${r} 0 0 0 ${r} ${r}
             H ${this._boxWidth / 2 - this._gaugeWidth}"
            stroke="var(--instrument-frame-tertiary-color)"
            fill="none"
            vector-effect="non-scaling-stroke"
          />
          <line
            x1=${this._boxWidth / 2 - this._gaugeWidth}
            x2=${-this._boxWidth / 2}
            y1=${0}
            y2=${0}
            stroke="var(--instrument-frame-tertiary-color)"
            stroke-width="1"
            vector-effect="non-scaling-stroke"
          />
          <g transform="translate(${gaugeOffset}, 0)">
            ${watchfaceLinear(
              {
                height: this._boxWidth,
                width: this._gaugeWidth,
                scaleWidth: this._scaleWidth,
                minValue: -this.instrumentRange,
                maxValue: this.instrumentRange,
              },
              [
                {
                  min: this.minTrendHeave,
                  max: this.maxTrendHeave,
                },
              ],
              {
                value: this.heave,
              },
              {container: 'var(--instrument-frame-primary-color)'},
              {hideContainer: false, off: false, priority: this.priority},
              {
                mainTickbar: true,
                primaryTickbarsInterval: this.instrumentRange <= 5 ? 1 : 5,
                secondaryTickbarsInterval: this.instrumentRange <= 5 ? 0.5 : 1,
              },
              this._getAdvice()
            )}
          </g>
          <defs>
            <clipPath id="heaveClip">
              <rect
                x="-200"
                y=${this._toTranslatedValue(-this.instrumentRange)}
                width="400"
                height=${this._toTranslatedValue(this.instrumentRange) * 2}
              />
            </clipPath>
          </defs>
          <g clip-path="url(#heaveClip)">
            <g
              transform="translate(0, ${this._toTranslatedValue(
                (-this.heave + this.draftOffset) / this.gainScale
              )}) scale(3) 
            translate(${-this._gaugeWidth / 2 - 80 / 1.5} , ${-80})"
            >
              ${this.vesselImage ? vesselImages[this.vesselImage] : nothing}
            </g>
          </g>
        </svg>
      </div>
    `;
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
    'obc-heave': ObcHeave;
  }
}
