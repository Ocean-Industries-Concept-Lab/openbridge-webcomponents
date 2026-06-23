import {LitElement, html, nothing, unsafeCSS} from 'lit';
import {property} from 'lit/decorators.js';
import componentStyle from './poi-line.css?inline';
import '../poi-graphic-line/poi-graphic-line.js';
import {renderPointerDot} from './pointerDot.js';
import {
  getPOILineConfig,
  POILineType,
  POIStyle,
} from '../poi-graphic-line/poi-graphic-line.js';
import {customElement} from '../../../decorator.js';

/**
 * `<obc-poi-line>` - Connector line wrapper that combines a POI line graphic with an optional end dot.
 *
 * ## Overview
 * Use this component to render a marker stem, leader line, or tether between a target and its label/button.
 * It wraps `obc-poi-graphic-line` and can add a pointer dot at the line end.
 *
 * ## Features/Variants
 * - `height` (default `96`): Controls the connector length.
 * - `poiStyle` (default `normal`): Selects the visual style token used by `getPOILineConfig(...)`.
 * - `lineType` (default `regular`): Selects regular or dashed line treatment.
 * - `offset` (default `0`): Bends the line horizontally by shifting the line end.
 * - `hasPointer` (default `false`): Renders an end dot/pointer.
 * - `animatePosition` (default `false`): Uses a short transition duration for position updates.
 *
 * ## Usage Guidelines
 * - Use `<obc-poi-line>` when you need both the connector and optional end-dot in one primitive.
 * - Use `<obc-poi-graphic-line>` directly when you only need the raw line SVG.
 * - Keep `height` and `offset` finite for predictable geometry.
 *
 * ## Slots/Content
 * This component has no slots.
 *
 * ## Events
 * This component does not emit custom events.
 *
 * ## Best Practices
 * - Keep offsets minimal so the visual relationship between source and target stays clear.
 * - Drive `poiStyle` and `lineType` from state tokens instead of hardcoded CSS overrides.
 *
 * ## Example
 * ```html
 * <obc-poi-line
 *   height="96"
 *   .poiStyle=${POIStyle.Regular}
 *   .lineType=${POILineType.Regular}
 *   .hasPointer=${true}
 * ></obc-poi-line>
 * ```
 */
@customElement('obc-poi-line')
export class ObcPoiLine extends LitElement {
  @property({type: Number}) height: number = 96;
  @property({type: String})
  poiStyle: POIStyle = POIStyle.Normal;
  @property({type: String})
  lineType: POILineType = POILineType.Regular;
  @property({type: Number}) offset: number = 0;
  @property({type: Boolean}) hasPointer = false;
  @property({type: Boolean}) animatePosition = false;
  override render() {
    const style = getPOILineConfig(this.poiStyle, this.lineType);
    const lineHeight = this.height - 2;
    const centerX = 2;
    const isRegularStyle =
      this.poiStyle === POIStyle.Regular || this.poiStyle === POIStyle.Normal;
    const centerYOffset = isRegularStyle ? 2 : 1;

    const totalHeight = lineHeight + style.width + style.dotStart;
    const translateX = -style.width / 2 + (this.offset < 0 ? this.offset : 0);

    return html`
      <div
        class="offset-wrapper poi-style-${this.poiStyle} line-type-${this
          .lineType}${this.animatePosition ? ' animate-position' : ''}"
      >
        <div
          class="container"
          style="height: ${totalHeight}px; width: ${style.width}px; transform: translateX(${translateX}px);"
        >
          <obc-poi-graphic-line
            .lineHeight=${lineHeight}
            .lineStyle=${this.poiStyle}
            .lineType=${this.lineType}
            .offset=${this.offset}
          ></obc-poi-graphic-line>
          ${this.hasPointer
            ? renderPointerDot({
                lineStyle: this.poiStyle,
                centerX: centerX + (this.offset > 0 ? this.offset : 0),
                centerY: lineHeight + centerYOffset,
                width: style.width + (this.offset > 0 ? this.offset : 0),
                vbHeight: totalHeight,
                lineColor: style.lineColor,
                outlineColor: style.outlineColor,
              })
            : nothing}
        </div>
      </div>
    `;
  }

  static override styles = unsafeCSS(componentStyle);
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-poi-line': ObcPoiLine;
  }
}
