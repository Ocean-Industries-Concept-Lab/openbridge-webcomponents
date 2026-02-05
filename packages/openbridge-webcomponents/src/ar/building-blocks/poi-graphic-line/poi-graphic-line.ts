import {LitElement, html, unsafeCSS} from 'lit';
import {property} from 'lit/decorators.js';
import {customElement} from '../../../decorator.js';
import {POILineParams, POIStyle, POI_LINE_CONFIG} from './poi-config.js';
import componentStyle from './poi-graphic-line.css?inline';

@customElement('obc-poi-graphic-line')
export class ObcPoiGraphicLine extends LitElement {
  @property({type: Number}) lineHeight: number = 96;
  @property({type: Number}) width: number = 4;
  @property({type: Number}) lineStart: number = 1;
  @property({type: String}) lineStyle: POIStyle = POIStyle.Enhanced;
  @property({type: Number}) offset: number = 0;
  override render() {
    const style = POI_LINE_CONFIG[this.lineStyle];

    return html`
      ${graphicLine({
        style,
        lineHeight: this.lineHeight,
        totalHeight: this.lineHeight + this.lineStart,
        offset: this.offset,
      })}
    `;
  }

  static override styles = unsafeCSS(componentStyle);
}

export function graphicLine({
  style,
  lineHeight,
  totalHeight,
  offset,
}: {
  style: POILineParams;
  lineHeight: number;
  totalHeight: number;
  offset: number;
}) {
  const lineStart = 1;
  let xStart, xEnd;
  if (offset >= 0) {
    xStart = style.width / 2;
    xEnd = xStart + offset;
  } else {
    xStart = style.width / 2 - offset;
    xEnd = style.width / 2;
  }

  const width = style.width + Math.abs(offset);
  const lineEnd = lineStart + lineHeight;
  const breakStartPoint = lineStart + 10;
  const breakEndPoint = breakStartPoint + 30;

  let path: string;
  if (offset === 0) {
    path = `M${xStart} ${lineStart}V ${lineEnd}`;
  } else {
    path = `M${xStart} ${lineStart}V ${breakStartPoint} L ${xEnd} ${breakEndPoint}V ${lineEnd}`;
  }

  return html`
    <svg
      width="${width}"
      height="${totalHeight}"
      viewBox="0 0 ${width} ${totalHeight}"
      fill="none"
      vector-effect="non-scaling-stroke"
    >
      <mask id="poi_graphic_line_mask" maskUnits="userSpaceOnUse">
        <rect
          x="0"
          y="0"
          width=${width}
          height=${totalHeight}
          fill="url(#poi_graphic_line_linear_gradient)"
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
          <feGaussianBlur stdDeviation="1.5" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_11965_68245"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_11965_68245"
            result="shape"
          />
        </filter>
        <linearGradient
          id="poi_graphic_line_linear_gradient"
          gradientTransform="rotate(90)"
        >
          <stop stop-color="white" />
          <stop offset="1" stop-color="black" />
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
