import {LitElement, html, unsafeCSS} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import {POIStyle, POIState, POIStyleConfig, POI_STYLES} from './poi-config';
import componentStyle from './poi-graphic-line.css?inline';

function getLineColors(style: POIStyle): POIStyleConfig {
  const colors = POI_STYLES[style];
  if (!colors) {
    throw new Error(`Style: ${style} not supported`);
  }
  return colors;
}

@customElement('obc-poi-graphic-line')
export class ObcPoiGraphicLine extends LitElement {
  @property({type: Number}) height: number = 100;
  @property({type: String}) lineStyle: POIStyle = POIStyle.Enhanced;
  @property({type: String}) lineState: POIState = POIState.solid;

  override render() {
    const colors = getLineColors(this.lineStyle);
    const path = `M2 1L2 ${this.height}`;

    return html`<div class="wrapper">
      <svg width="4" height="${this.height}" viewBox="0 0 4 ${this.height}">
        <mask
          id="mask0_903_40238"
          style="mask-type:alpha"
          maskUnits="userSpaceOnUse"
          x="0"
          y="0"
          width="4"
          height="${this.height}"
        >
          <path
            d="${path}"
            stroke="url(#paint0_linear_903_40238)"
            stroke-width="4"
            stroke-linecap="round"
          />
        </mask>
        <g mask="url(#mask0_903_40238)">
          <g filter="url(#filter0_d_903_40238)">
            <path
              d=${path}
              stroke="${colors.outlineColor}"
              stroke-width="2"
              stroke-linecap="round"
            />
          </g>
          <path
            d=${path}
            stroke="${colors.lineColor}"
            stroke-width="1"
            stroke-linecap="round"
          />
        </g>
        <defs>
          <filter
            id="filter0_d_903_40238"
            x="0"
            y="0"
            width="4"
            height="${this.height}"
            filterUnits="userSpaceOnUse"
            color-interpolation-filters="sRGB"
          >
            <feFlood flood-opacity="0" result="BackgroundImageFix" />
            <feColorMatrix
              in="SourceAlpha"
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
              result="hardAlpha"
            />
            <feOffset dy="1" />
            <feGaussianBlur stdDeviation="0.5" />
            <feColorMatrix
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.2 0"
            />
            <feBlend
              mode="normal"
              in2="BackgroundImageFix"
              result="effect1_dropShadow_903_40238"
            />
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="effect1_dropShadow_903_40238"
              result="shape"
            />
          </filter>
          <linearGradient
            id="paint0_linear_903_40238"
            x1="2.5"
            y1="1"
            x2="2.5"
            y2="${this.height}"
            gradientUnits="userSpaceOnUse"
          >
            <stop stop-color="#C2C2C2" />
            <stop offset="0.989583" stop-color="#C2C2C2" stop-opacity="0" />
          </linearGradient>
        </defs>
      </svg>
    </div> `;
  }

  static override styles = unsafeCSS(componentStyle);
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-poi-graphic-line': ObcPoiGraphicLine;
  }
}
