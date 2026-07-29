import {LitElement, html, css, nothing, svg, type SVGTemplateResult} from 'lit';
import {customElement} from '../../decorator.js';
import {
  verticalScaleTickmarks,
  watchfaceLinear,
} from '../../building-blocks/instrument-linear/instrument-linear.js';
import {property} from 'lit/decorators.js';
import {VesselImage} from '../watch/watch.js';
import {vesselImages} from '../watch/vessel.js';
import {
  LinearAdvice,
  resolveLinearAdvice,
} from '../../building-blocks/instrument-linear/advice.js';
import {Priority} from '../types.js';

export enum ObcHeaveType {
  /** Vessel silhouette in a framed box, with the scale column at its right. */
  vessel = 'vessel',
  /** Scale column on its own — no frame, reference line or vessel. */
  bar = 'bar',
}

/** `vessel` viewBox: the 336×336 frame plus its surrounding padding. */
const VESSEL_VIEW_BOX = '-200 -200 400 400';
/** `bar` viewBox: the 72×336 scale column centred in a 128×384 frame. */
const BAR_VIEW_BOX = '-64 -192 128 384';

/**
 * `<obc-heave>` — Vertical heave indicator.
 *
 * Shows `heave` on a linear scale with a trend band, optional advice zones and
 * a `regular`/`enhanced` palette.
 *
 * Variants (`type`):
 * - `vessel` (default) — the scale beside a framed box holding a vessel
 *   silhouette that rises and falls with the measured heave.
 * - `bar` — the scale column alone, for use beside another instrument or in a
 *   narrow strip. The host is 128×384 rather than square.
 *
 * @element obc-heave
 * @stable
 */
@customElement('obc-heave')
export class ObcHeave extends LitElement {
  @property({type: Number}) heave = 0;
  /** @availableWhen type==vessel */
  @property({type: Number}) gainScale = 10;
  @property({type: Number}) minTrendHeave = 0;
  @property({type: Number}) maxTrendHeave = 0;
  /** @availableWhen type==vessel */
  @property({type: Number}) draftOffset = 0;
  @property({type: Array}) advice: LinearAdvice[] = [];

  @property({type: Number}) instrumentRange = 10;
  /** @availableWhen type==vessel */
  @property({type: String}) vesselImage: VesselImage = VesselImage.psvFore;
  @property({type: String}) priority: Priority = Priority.regular;
  /**
   * `vessel` (default) frames the scale next to a vessel silhouette; `bar`
   * renders the scale column on its own.
   */
  @property({type: String}) type: ObcHeaveType = ObcHeaveType.vessel;

  private _toTranslatedValue(value: number) {
    return (value * (this._boxWidth / 2)) / this.instrumentRange;
  }
  _boxWidth = 336;
  _gaugeWidth = 72;
  _scaleWidth = 24;

  private renderFrame(): SVGTemplateResult {
    const r = 8;
    return svg`
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
    `;
  }

  private renderVessel(): SVGTemplateResult {
    return svg`
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
    `;
  }

  override render() {
    const isBar = this.type === ObcHeaveType.bar;
    const gaugeOffset = isBar ? 0 : this._boxWidth / 2 - this._gaugeWidth / 2;

    return html`
      <div class="container">
        <svg viewBox=${isBar ? BAR_VIEW_BOX : VESSEL_VIEW_BOX}>
          ${isBar ? nothing : this.renderFrame()}
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
              verticalScaleTickmarks(this.instrumentRange),
              resolveLinearAdvice(
                this.advice,
                this.minTrendHeave,
                this.maxTrendHeave
              )
            )}
          </g>
          ${isBar ? nothing : this.renderVessel()}
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
