import {LitElement, html, svg, unsafeCSS, SVGTemplateResult} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import {POIStyle, POIState, POIStyleConfig, POI_STYLES} from './poi-config';
import componentStyle from './poi-graphic-line.css?inline';

function getPOIStyleConfig(style: POIStyle): POIStyleConfig {
  const config = POI_STYLES[style];
  if (!config) {
    throw new Error(`Style: ${style} not supported`);
  }
  return config;
}

@customElement('obc-poi-graphic-line')
export class ObcPoiGraphicLine extends LitElement {
  @property({type: Number}) width: number = 4;
  @property({type: Number}) height: number = 92;
  @property({type: String}) poiStyle: POIStyle = POIStyle.enhanced;
  @property({type: String}) poiState: POIState = POIState.solid;

  override render() {
    const config = getPOIStyleConfig(this.poiStyle);
    const path = `M${this.width / 2} ${this.width}L${this.width / 2} ${this.height}`;
    return svg`<svg width="${this.width}"
                    height="${this.height}" viewBox="0 0 ${this.width} ${this.height}">
      <mask
        id="mask0_903_40238"
        style="mask-type:alpha"
        maskUnits="userSpaceOnUse"
        x="0"
        y="0"
        width="${this.width}"
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
            stroke="${config.outlineColor}"
            stroke-width="${config.outlineWidth}"
            stroke-linecap="round"
          />
        </g>
        <path
          d=${path}
          stroke="${config.lineColor}"
          stroke-width="${config.lineWidth}"
          stroke-linecap="round"
        />
      </g>
      <defs>
        <filter
          id="filter0_d_903_40238"
          x="${config.filterAttributes(this.height).x}"
          y="${config.filterAttributes(this.height).y}"
          width="${config.filterAttributes(this.height).width}"
          height="${config.filterAttributes(this.height).height}"
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
          <feColorMatrix type="matrix" values="${config.colorMatrixValues}" />
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
          x1="${config.linearGradient(this.height).x1}"
          y1="${config.linearGradient(this.height).y1}"
          x2="${config.linearGradient(this.height).x2}"
          y2="${config.linearGradient(this.height).y2}"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#C2C2C2" />
          <stop offset="0.989583" stop-color="#C2C2C2" stop-opacity="0" />
        </linearGradient>
      </defs>
      </svg>
     `;
  }

  static override styles = unsafeCSS(componentStyle);
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-poi-graphic-line': ObcPoiGraphicLine;
  }
}
