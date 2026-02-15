import {LitElement, html, css, nothing, svg} from 'lit';
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

@customElement('obc-depth-actual')
export class ObcDepthActual extends LitElement {
  @property({type: Number}) depth = 0;
  @property({type: Number}) draft = 0;
  @property({type: Array}) advice: LinearAdvice[] = [];
  @property({type: Number}) vesselScale = 1;

  @property({type: Number}) instrumentRange = 10;
  @property({type: Number}) primaryTickbarsInterval = 50;
  @property({type: Number}) secondaryTickbarsInterval = 10;
  @property({type: String}) vesselImage: VesselImage = VesselImage.psvFore;
  @property({type: String}) priority: Priority = Priority.regular;

  private _toValue(value: number) {
    return -value;
  }

  private _toTranslatedValue(value: number) {
    return (value * (this._boxWidth / 2)) / this.instrumentRange;
  }
  _boxWidth = 336;
  _gaugeWidth = 72;
  _scaleWidth = 24;

  private _getAdvice(): LinearAdviceRaw[] {
    return this.advice.map((advice) => {
      const isActive = this.depth >= advice.min && this.depth <= advice.max;
      const state = isActive
        ? AdviceState.triggered
        : advice.hinted
          ? AdviceState.hinted
          : AdviceState.regular;
      return {
        ...advice,
        min: this._toValue(advice.max),
        max: this._toValue(advice.min),
        state,
      } satisfies LinearAdviceRaw;
    });
  }

  override render() {
    const gaugeOffset = this._boxWidth / 2 - this._gaugeWidth / 2;
    const r = 8;

    const seabed = svg`
    <rect fill="url(#seabedPattern)" y=${this._toTranslatedValue(this.depth)} x=${-this._boxWidth / 2} width=${this._boxWidth - this._gaugeWidth} height=${this._toTranslatedValue(this.instrumentRange - this.depth)} fill="red" />
    `;
    const darkColor =
      this.priority === Priority.enhanced
        ? 'var(--instrument-enhanced-secondary-color)'
        : 'var(--instrument-regular-secondary-color)';

    const vesselScale = (this.vesselScale * 50) / this.instrumentRange;

    return html`
      <div class="container">
        <svg viewbox="-200 -200 400 400">
          <rect
            mask="url(#heaveClip)"
            x=${-this._boxWidth / 2}
            y=${0}
            width=${this._boxWidth - this._gaugeWidth}
            height=${this._toTranslatedValue(this.instrumentRange)}
            fill="var(--instrument-frame-secondary-color)"
          />

          <g transform="translate(${gaugeOffset}, ${this._boxWidth / 4})">
            ${watchfaceLinear(
              {
                height: this._boxWidth / 2,
                minValue: this._toValue(this.instrumentRange),
                maxValue: this._toValue(0),
                width: this._gaugeWidth,
                scaleWidth: this._scaleWidth,
              },
              [
                {
                  min: this._toValue(this.depth),
                  max: this._toValue(0),
                },
                {
                  min: this._toValue(this.draft),
                  max: this._toValue(0),
                  fill: darkColor,
                },
              ],
              {
                value: this._toValue(this.depth),
              },
              {container: 'var(--instrument-frame-primary-color)'},
              {hideContainer: false, off: false, priority: this.priority},
              {
                mainTickbar: false,
                primaryTickbarsInterval: this.primaryTickbarsInterval,
                secondaryTickbarsInterval: this.secondaryTickbarsInterval,
              },
              this._getAdvice()
            )}
          </g>
          <defs>
            <mask id="hearlineMask">
              <rect x="-200" y="-200" width="400" height="400" fill="white" />
              <line
                y1=${-this._boxWidth / 2 + 5}
                y2=${this._boxWidth / 2 + 5}
                x1=${this._boxWidth / 2 - this._gaugeWidth}
                x2=${this._boxWidth / 2 - this._gaugeWidth}
                stroke="black"
                stroke-width="3"
                vector-effect="non-scaling-stroke"
              />
            </mask>
            <mask id="heaveClip">
              <rect
                x=${-this._boxWidth / 2}
                y=${-this._boxWidth / 2}
                width=${this._boxWidth}
                height=${this._boxWidth}
                rx=${r}
                fill="white"
                vector-effect="non-scaling-stroke"
              />
              <line
                y1=${-this._boxWidth / 2}
                y2=${this._boxWidth / 2}
                x1=${this._boxWidth / 2 - this._gaugeWidth}
                x2=${this._boxWidth / 2 - this._gaugeWidth}
                stroke="black"
                stroke-width="3"
                vector-effect="non-scaling-stroke"
              />
            </mask>
            <pattern
              id="seabedPattern"
              patternUnits="userSpaceOnUse"
              patternTransform="matrix(8 0 0 16 164 294)"
              preserveAspectRatio="none"
              viewBox="0 0 16 32"
              width="1"
              height="1"
            >
              <g id="seabeadInner">
                <rect
                  x="6"
                  y="6"
                  width="4"
                  height="4"
                  fill="var(--instrument-frame-tertiary-color)"
                />
              </g>
              <use xlink:href="#seabeadInner" transform="translate(-16 0)" />
              <use xlink:href="#seabeadInner" transform="translate(-8 16)" />
              <use xlink:href="#seabeadInner" transform="translate(8 16)" />
            </pattern>
          </defs>

          <g mask="url(#heaveClip)">
            <line
              x1=${this._boxWidth / 2 - this._gaugeWidth}
              x2=${-this._boxWidth / 2}
              y1=${0}
              y2=${0}
              stroke="var(--instrument-frame-tertiary-color)"
              stroke-width="1"
              vector-effect="non-scaling-stroke"
            />
            <g
              transform="
              translate(0, ${this._toTranslatedValue(this.draft) -
              21 * vesselScale})
            translate(${-this._gaugeWidth / 2 - 80} , -80)
            scale(${vesselScale * 3} )"
              transform-origin="80 80"
            >
              ${this.vesselImage ? vesselImages[this.vesselImage] : nothing}
            </g>
            ${seabed}
          </g>
          <g mask="url(#heaveClip)">
            <line
              x1=${this._boxWidth / 2 - this._gaugeWidth}
              x2=${-this._boxWidth / 2}
              y1=${this._toTranslatedValue(this.draft)}
              y2=${this._toTranslatedValue(this.draft)}
              stroke=${darkColor}
              stroke-width="1"
              vector-effect="non-scaling-stroke"
            />
            <line
              x1=${this._boxWidth / 2 - this._gaugeWidth}
              x2=${-this._boxWidth / 2}
              y1=${this._toTranslatedValue(this.depth)}
              y2=${this._toTranslatedValue(this.depth)}
              stroke=${darkColor}
              stroke-width="1"
              vector-effect="non-scaling-stroke"
            />
          </g>
          <path
            mask="url(#hearlineMask)"
            d="M ${this._boxWidth / 2} 0
            V -${this._boxWidth / 2 - r}
             a ${r} ${r} 0 0 0 ${-r} ${-r}
             H ${-this._boxWidth / 2 + r} 
             a ${r} ${r} 0 0 0 ${-r} ${r}
             V ${this._boxWidth / 2 - r}
             a ${r} ${r} 0 0 0 ${r} ${r}
             H ${this._boxWidth / 2 - this._gaugeWidth}"
            stroke="var(--instrument-frame-tertiary-color)"
            fill="none"
            vector-effect="non-scaling-stroke"
          />
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
    'obc-depth-actual': ObcDepthActual;
  }
}
