import {LitElement, html, unsafeCSS} from 'lit';
import {property} from 'lit/decorators.js';
import {ifDefined} from 'lit/directives/if-defined.js';
import {customElement} from '../../../decorator.js';
import {
  getPOILineConfig,
  POILineParams,
  POILineType,
  POIStyle,
} from './poi-config.js';
import componentStyle from './poi-graphic-line.css?inline';

@customElement('obc-poi-graphic-line')
export class ObcPoiGraphicLine extends LitElement {
  @property({type: Number}) lineHeight: number = 96;
  @property({type: Number}) width: number = 4;
  @property({type: Number}) lineStart: number = 1;
  @property({type: String}) lineStyle: POIStyle = POIStyle.Enhanced;
  @property({type: String}) lineType: POILineType = POILineType.Regular;
  @property({type: Number}) offset: number = 0;
  override render() {
    const style = getPOILineConfig(this.lineStyle, this.lineType);

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
  const isDashed = Boolean(style.dashArray);
  const dashArray = style.dashArray;
  const dashOffset = style.dashArray ? `${style.dashOffset ?? 0}` : undefined;
  const dashedOutlineAndShadow =
    isDashed && style.dashOutlineAndShadow === true;
  const outlineDashArray = dashedOutlineAndShadow ? dashArray : undefined;
  const outlineDashOffset = dashedOutlineAndShadow ? dashOffset : undefined;

  let path: string;
  if (offset === 0) {
    path = `M${xStart} ${lineStart}V ${lineEnd}`;
  } else {
    path = `M${xStart} ${lineStart}V ${breakStartPoint} L ${xEnd} ${breakEndPoint}V ${lineEnd}`;
  }
  const topCapPath = `M${xStart} ${lineStart}V ${lineStart + 0.001}`;

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
            stroke-linecap="${dashedOutlineAndShadow
              ? (style.strokeLinecap ?? 'butt')
              : 'butt'}"
            stroke-linejoin="round"
            stroke-dasharray=${ifDefined(outlineDashArray)}
            stroke-dashoffset=${ifDefined(outlineDashOffset)}
          />
        </g>
        <path
          d=${path}
          stroke="${style.outlineColor}"
          stroke-width="${style.outlineWidth}"
          stroke-linecap="${dashedOutlineAndShadow
            ? (style.strokeLinecap ?? 'butt')
            : isDashed
              ? 'round'
              : (style.strokeLinecap ?? 'round')}"
          stroke-dasharray=${ifDefined(outlineDashArray)}
          stroke-dashoffset=${ifDefined(outlineDashOffset)}
        />
        <path
          d=${path}
          stroke="${style.lineColor}"
          stroke-width="${style.lineWidth}"
          stroke-linecap="${style.strokeLinecap ?? 'round'}"
          stroke-dasharray=${ifDefined(dashArray)}
          stroke-dashoffset=${ifDefined(dashOffset)}
        />
        ${isDashed
          ? html`<path
              d=${topCapPath}
              stroke="${style.lineColor}"
              stroke-width="${style.lineWidth}"
              stroke-linecap="round"
              stroke-linejoin="round"
            />`
          : null}
      </g>
      <defs>
        <filter
          id="poi_graphic_line_filter"
          x="-3"
          y="-3"
          width="${width + 6}"
          height="${totalHeight + 6}"
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
          <feOffset dy="0" />
          <feGaussianBlur stdDeviation="0.85" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 ${style.shadowAlpha} 0"
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
