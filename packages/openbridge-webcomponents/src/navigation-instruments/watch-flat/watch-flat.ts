import {LitElement, SVGTemplateResult, html, svg, unsafeCSS} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import compentStyle from './watch-flat.css?inline';
import {Tickmark, TickmarkStyle, tickmark} from './tickmark-flat';
import {rect} from '../../svghelpers/rectangular';
import {Label} from '../compass-flat/compass-flat';

@customElement('obc-watch-flat')
export class ObcWatchFlat extends LitElement {
  @property({type: Number}) width = 352;
  @property({type: Number}) height = 72;
  @property({type: Number}) padding = 0;
  @property({type: Number}) rotation = 0;
  @property({type: Number}) tickmarkSpacing = 0;
  @property({type: Number}) angleSetpoint: number | undefined;
  @property({type: Array, attribute: false}) tickmarks: Tickmark[] = [];
  @property({type: Array, attribute: false}) labels: Label[] = [];
  @property({type: Number}) trackHeight = (2 / 3) * this.height;
  @property({type: Number}) ticksHeight = this.height - this.trackHeight;
  @property({type: Number}) borderRadius = 8;

  private renderClipPath(offsetY: number = 0): SVGTemplateResult {
    return svg`
      <clipPath id="frameClipPath${offsetY === 0 ? '' : 'Tickmarks'}">
        <rect x="${-this.width / 2}" y="${-this.height / 2 + offsetY}" 
              width="${this.width}" height="${this.height}" 
              rx="${this.borderRadius}" />
      </clipPath>
    `;
  }

  private renderLabelMask(): SVGTemplateResult {
    return svg`
      <mask id="labelMask">
        <rect x="${-this.width / 2}" y="${-70}" 
              width="${this.width}" height="${32}"
               />
        <linearGradient id="fadeGradient" gradientUnits="userSpaceOnUse"
                        x1="${-this.width / 2}" y1="0" x2="${this.width / 2}" y2="0">
          <stop offset="0%" style="stop-color:black; stop-opacity:1;" />
          <stop offset="10%" style="stop-color:white; stop-opacity:1;" />
          <stop offset="50%" style="stop-color:white; stop-opacity:1" />
          <stop offset="90%" style="stop-color:white; stop-opacity:1" />
          <stop offset="100%" style="stop-color:black; stop-opacity:1;" />
        </linearGradient>
        <rect x="${-this.width / 2}" y="${-70}" 
              width="${this.width}" height="${32}"
              fill="url(#fadeGradient)" />
      </mask>
    `;
  }

  private watchFace(): SVGTemplateResult {
    const strokeWidth = 1;

    return svg`
      ${this.renderClipPath()}
      ${this.renderClipPath(-40)}
      <g clip-path="url(#frameClipPath)">
        ${rect('frame-track', {
          width: this.width,
          height: this.trackHeight,
          y: this.height / 2 - this.trackHeight,
          strokeWidth: strokeWidth,
          strokeColor: 'var(--instrument-frame-secondary-color)',
          strokePosition: 'inside',
          fillColor: 'var(--instrument-frame-secondary-color)',
          borderRadius: 0,
        })}
        ${rect('frame-ticks', {
          width: this.width,
          height: this.ticksHeight,
          y: this.height / 2 - this.trackHeight - this.ticksHeight,
          strokeWidth: strokeWidth,
          strokeColor: 'var(--instrument-frame-primary-color)',
          strokePosition: 'inside',
          fillColor: 'var(--instrument-frame-primary-color)',
          borderRadius: 0,
        })}
      </g>
      ${rect('frame-outline', {
        width: this.width,
        height: this.height,
        strokeWidth: strokeWidth,
        strokeColor: 'var(--instrument-frame-tertiary-color)',
        strokePosition: 'inside',
        fillColor: 'none',
        borderRadius: this.borderRadius,
      })}
    `;
  }

  override render() {
    const width = (this.width / 2 + this.padding) * 2;
    const viewBox = `-${width / 2} -${this.height / 2} ${width} ${this.height}`;
    const scale = this.clientWidth / width;

    return html`
      <svg
        width="100%"
        height="100%"
        viewBox=${viewBox}
        style="--scale: ${scale}"
      >
        ${this.watchFace()} ${this.renderLabelMask()}

        <g clip-path="url(#frameClipPath)">
          ${this.tickmarks.map(
            (t) => svg`
            <g transform="translate(${-this.rotation * this.tickmarkSpacing}, 0)">
              ${tickmark(t.angle, t.type, TickmarkStyle.hinted)}
            </g>
          `
          )}
        </g>

        <g mask="url(#labelMask)">
          ${this.labels.map(
            (l) => svg`
              <g transform="translate(${-this.rotation * this.tickmarkSpacing}, 0)">
                ${l}
              </g>`
          )}
        </g>
      </svg>
    `;
  }

  static override styles = unsafeCSS(compentStyle);
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-watch-flat': ObcWatchFlat;
  }
}
