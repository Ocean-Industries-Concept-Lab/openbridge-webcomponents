import {LitElement, html, unsafeCSS} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import {POILineParams, POIStyle, POI_LINE_CONFIG} from './poi-config';
import componentStyle from './poi-graphic-line.css?inline';

@customElement('obc-poi-graphic-line')
export class ObcPoiGraphicLine extends LitElement {
  @property({type: Number}) lineHeight: number = 96;
  @property({type: Number}) width: number = 4;
  @property({type: Number}) lineStart: number = 1;
  @property({type: String}) lineStyle: POIStyle = POIStyle.Enhanced;

  override render() {
    const style = POI_LINE_CONFIG[this.lineStyle];
    const filterDimensions = style.filterDimensions;
    const path = `M${this.width / 2} ${this.lineStart}L${this.width / 2} ${this.lineHeight + this.lineStart}`;

    return html`
      <svg
        width="${this.width}"
        height="${this.lineHeight + style.lineEnd}"
        viewBox="0 0 ${this.width} ${this.lineHeight + style.lineEnd}"
        fill="none"
        vector-effect="non-scaling-stroke"
      >
        <mask
          id="poi_graphic_line_mask"
          style="mask-type:alpha"
          maskUnits="userSpaceOnUse"
          x="${this.width / 2 - 2}"
          y="-1"
          width="4"
          height="${this.lineHeight + 4}"
        >
          <path
            d="${path}"
            stroke="url(#poi_graphic_line_linear_gradient)"
            stroke-width="4"
            stroke-linecap="round"
          />
        </mask>
        <g mask="url(#poi_graphic_line_mask)">
          <g filter="url(#poi_graphic_line_filter)">
            <path
              d=${path}
              stroke="${style.outlineColor}"
              stroke-width="${style.outlineWidth}"
              stroke-linecap="round"
            />
          </g>
          <path
            d=${path}
            stroke="${style.lineColor}"
            stroke-width="${style.lineWidth}"
            stroke-linecap="round"
          />
        </g>
        <defs>
          <filter
            id="poi_graphic_line_filter"
            x="${filterDimensions.x}"
            y="${filterDimensions.y}"
            width="${filterDimensions.width}"
            height="${this.lineHeight + filterDimensions.width}"
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
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 ${style.shadowAlpha} 0"
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
            id="poi_graphic_line_linear_gradient"
            x1="${this.width / 2 + 0.5}"
            y1="${this.lineStart}"
            x2="${this.width / 2 + 0.5}"
            y2="${this.lineHeight + this.lineStart}"
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

export function graphicLine({
  style,
  lineHeight,
  totalHeight,
}: {
  style: POILineParams;
  lineHeight: number;
  totalHeight: number;
}) {
  const lineStart = 1;
  const lineEnd = lineStart + lineHeight;

  const width = style.width;
  const filterDimensions = style.filterDimensions;
  const path = `M${width / 2} ${lineStart}L${width / 2} ${lineEnd}`;

  return html`
    <svg
      width="${width}"
      height="${totalHeight}"
      viewBox="0 0 ${width} ${totalHeight}"
      fill="none"
      vector-effect="non-scaling-stroke"
    >
      <mask
        id="poi_graphic_line_mask"
        style="mask-type:alpha"
        maskUnits="userSpaceOnUse"
        x="${width / 2 - 2}"
        y="-1"
        width="4"
        height="${lineHeight + 4}"
      >
        <path
          d="${path}"
          stroke="url(#poi_graphic_line_linear_gradient)"
          stroke-width="4"
          stroke-linecap="round"
        />
      </mask>
      <g mask="url(#poi_graphic_line_mask)">
        <g filter="url(#poi_graphic_line_filter)">
          <path
            d=${path}
            stroke="${style.outlineColor}"
            stroke-width="${style.outlineWidth}"
            stroke-linecap="round"
          />
        </g>
        <path
          d=${path}
          stroke="${style.lineColor}"
          stroke-width="${style.lineWidth}"
          stroke-linecap="round"
        />
      </g>
      <defs>
        <filter
          id="poi_graphic_line_filter"
          x="${filterDimensions.x + width / 2 - 2}"
          y="${filterDimensions.y}"
          width="${filterDimensions.width}"
          height="${lineHeight + filterDimensions.width}"
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
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 ${style.shadowAlpha} 0"
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
          id="poi_graphic_line_linear_gradient"
          x1="${width / 2 + 0.5}"
          y1="${lineStart}"
          x2="${width / 2 + 0.5}"
          y2="${lineEnd}"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#C2C2C2" />
          <stop offset="0.989583" stop-color="#C2C2C2" stop-opacity="0" />
        </linearGradient>
      </defs>
    </svg>
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-poi-graphic-line': ObcPoiGraphicLine;
  }
}
