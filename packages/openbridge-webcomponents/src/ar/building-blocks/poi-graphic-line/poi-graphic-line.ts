import {LitElement, html, svg, unsafeCSS} from 'lit';
import {property} from 'lit/decorators.js';
import {ifDefined} from 'lit/directives/if-defined.js';
import {customElement} from '../../../decorator.js';
import {shrinkDimensionForStroke} from '../../../svghelpers/stroke-aware.js';
import {
  getPOILineConfig,
  POILineParams,
  POILineType,
  POIStyle,
} from './poi-config.js';
import componentStyle from './poi-graphic-line.css?inline';

/**
 * `<obc-poi-graphic-line>` - Renders a POI connector/leader line graphic for AR marker visuals.
 *
 * ## Overview
 *
 * This component draws the POI line SVG used by AR point-of-interest (POI) markers,
 * including straight or offset paths with optional dashed styling. It can be used as
 * a marker line, connector line, guide line, or leader/tether line depending on context.
 * Keywords: connector line, leader line, guide line, tether line, marker stem.
 *
 * ## Features/Variants
 *
 * - `lineHeight`: Controls the rendered connector length. Default: `96`.
 * - `lineStart`: Sets the Y-axis start position for line geometry. Default: `1`.
 * - `lineStyle`: Selects style theme (for example `regular`, `enhanced`, `alarm`). Default: `enhanced`.
 * - `lineType`: Chooses path treatment (`regular` or `dashed`). Default: `regular`.
 * - `offset`: Applies horizontal offset to create angled connector segments.
 *
 * ## Usage Guidelines
 *
 * - Use this for a visual-only connector; use `<obc-poi-line>` when you need
 *   integrated pointer/label behavior.
 * - Use `lineType="regular"` for continuous POI lines and `lineType="dashed"` for
 *   non-primary or guidance-style links.
 * - Keep `lineHeight` and `lineStart` consistent with surrounding marker layout so
 *   connectors align with button/pointer elements.
 * - Use `offset` to route around dense UI and avoid visual overlap.
 *
 * ## Slots/Content
 *
 * This component has no slots.
 *
 * ## Events
 *
 * This component emits no custom events.
 *
 * ## Best Practices
 *
 * - Prefer semantic `lineStyle` values derived from UI state instead of hardcoding colors.
 * - Keep offsets minimal to preserve visual traceability between marker and target.
 * - Reuse shared `POIStyle` and `POILineType` tokens for consistent rendering across POI components.
 *
 * ## Example
 *
 * ```html
 * <obc-poi-graphic-line line-height="96" line-style="enhanced" line-type="regular" offset="0"></obc-poi-graphic-line>
 * ```
 *
 * @slot
 * @fires
 */
@customElement('obc-poi-graphic-line')
export class ObcPoiGraphicLine extends LitElement {
  private static _idCounter = 0;
  private readonly _idPrefix = `poi-graphic-line-${ObcPoiGraphicLine._idCounter++}`;
  @property({type: Number}) lineHeight: number = 96;
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
        lineStart: this.lineStart,
        totalHeight: this.lineHeight + this.lineStart,
        offset: this.offset,
        idPrefix: this._idPrefix,
      })}
    `;
  }

  static override styles = unsafeCSS(componentStyle);
}

export function graphicLine({
  style,
  lineHeight,
  lineStart = 1,
  totalHeight,
  offset,
  idPrefix,
}: {
  style: POILineParams;
  lineHeight: number;
  lineStart?: number;
  totalHeight: number;
  offset: number;
  idPrefix: string;
}) {
  const strokeWidth = style.outlineWidth;
  const halfStroke = strokeWidth / 2;
  const safeWidth = shrinkDimensionForStroke(style.width, strokeWidth);
  const xCenter = halfStroke + safeWidth / 2;

  let xStart, xEnd;
  if (offset >= 0) {
    xStart = xCenter;
    xEnd = xStart + offset;
  } else {
    xStart = xCenter - offset;
    xEnd = xCenter;
  }

  const width = style.width + Math.abs(offset);
  const yStart = Math.max(lineStart, halfStroke);
  const lineEnd = Math.min(lineStart + lineHeight, totalHeight - halfStroke);
  const breakStartPoint = lineStart + 10;
  const breakEndPoint = breakStartPoint + 30;
  const isDashed = Boolean(style.dashArray);
  const dashArray = style.dashArray;
  const dashOffset = style.dashArray ? `${style.dashOffset ?? 0}` : undefined;
  const dashedOutlineAndShadow =
    isDashed && style.dashOutlineAndShadow === true;
  const outlineDashArray = dashedOutlineAndShadow ? dashArray : undefined;
  const outlineDashOffset = dashedOutlineAndShadow ? dashOffset : undefined;
  const prefixedId = (suffix: string) => `${idPrefix}-${suffix}`;
  const maskId = prefixedId('mask');
  const filterId = prefixedId('filter');
  const gradientId = prefixedId('linear-gradient');
  const bgFixId = prefixedId('bg-fix');
  const hardAlphaId = prefixedId('hard-alpha');
  const dropShadowId = prefixedId('drop-shadow');
  const shapeId = prefixedId('shape');

  let path: string;
  if (offset === 0) {
    path = `M${xStart} ${yStart}V ${lineEnd}`;
  } else {
    path = `M${xStart} ${yStart}V ${breakStartPoint} L ${xEnd} ${breakEndPoint}V ${lineEnd}`;
  }
  const topCapPath = `M${xStart} ${yStart}V ${yStart + 0.001}`;

  return svg`
    <svg
      width="${width}"
      height="${totalHeight}"
      viewBox="0 0 ${width} ${totalHeight}"
      fill="none"
      vector-effect="non-scaling-stroke"
    >
      <mask id="${maskId}" maskUnits="userSpaceOnUse">
        <rect
          x="0"
          y="0"
          width=${width}
          height=${totalHeight}
          fill="url(#${gradientId})"
        />
      </mask>
      <g mask="url(#${maskId})">
        <g filter="url(#${filterId})">
          <path
            d=${path}
            stroke="${style.outlineColor}"
            stroke-width="${style.outlineWidth}"
            stroke-linecap="${
              dashedOutlineAndShadow ? (style.strokeLinecap ?? 'butt') : 'butt'
            }"
            stroke-linejoin="round"
            stroke-dasharray=${ifDefined(outlineDashArray)}
            stroke-dashoffset=${ifDefined(outlineDashOffset)}
          />
        </g>
        <path
          d=${path}
          stroke="${style.outlineColor}"
          stroke-width="${style.outlineWidth}"
          stroke-linecap="${
            dashedOutlineAndShadow
              ? (style.strokeLinecap ?? 'butt')
              : isDashed
                ? 'round'
                : (style.strokeLinecap ?? 'round')
          }"
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
        ${
          isDashed
            ? svg`<path
              d=${topCapPath}
              stroke="${style.lineColor}"
              stroke-width="${style.lineWidth}"
              stroke-linecap="round"
              stroke-linejoin="round"
            ></path>`
            : null
        }
      </g>
      <defs>
        <filter
          id="${filterId}"
          x="-3"
          y="-3"
          width="${width + 6}"
          height="${totalHeight + 6}"
          filterUnits="userSpaceOnUse"
          color-interpolation-filters="sRGB"
        >
          <feFlood flood-opacity="0" result="${bgFixId}" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="${hardAlphaId}"
          />
          <feOffset dy="0" />
          <feGaussianBlur stdDeviation="0.85" />
          <feComposite in2="${hardAlphaId}" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 ${style.shadowAlpha} 0"
          />
          <feBlend
            mode="normal"
            in2="${bgFixId}"
            result="${dropShadowId}"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="${dropShadowId}"
            result="${shapeId}"
          />
        </filter>
        <linearGradient
          id="${gradientId}"
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
