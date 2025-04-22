import {LitElement, html, unsafeCSS} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import compentStyle from './poi-line.css?inline';
import '../../ar/poi-graphic-line/poi-graphic-line.js';
import {renderPointerDot} from './pointerDot.js';
import {
  POI_LINE_CONFIG,
  POIStyle,
} from '../../ar/poi-graphic-line/poi-config.js';
import {graphicLine} from '../../ar/poi-graphic-line/poi-graphic-line.js';

@customElement('obc-poi-line')
export class ObcPoiLine extends LitElement {
  @property({type: Number}) height: number = 96;
  @property({type: String}) poiStyle: POIStyle = POIStyle.Normal;

  override render() {
    const style = POI_LINE_CONFIG[this.poiStyle];
    let lineHeight = this.height - 4;
    let centerX = 2;
    let centerYOffset = 1;
    if (this.poiStyle === POIStyle.Normal) {
      lineHeight = this.height - 3;
      centerYOffset = 2;
      centerX = 1;
    }

    const totalHeight = lineHeight + style.width + style.dotStart;

    return html`
      <div
        class="container"
        style="height: ${totalHeight}px; width: ${style.width}px;"
      >
        ${graphicLine({style, lineHeight, totalHeight})}
        ${renderPointerDot({
          lineStyle: this.poiStyle,
          centerX: centerX,
          centerY: lineHeight + centerYOffset,
          width: style.width,
          vbHeight: totalHeight,
          lineColor: style.lineColor,
          outlineColor: style.outlineColor,
        })}
      </div>
    `;
  }

  static override styles = unsafeCSS(compentStyle);
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-poi-line': ObcPoiLine;
  }
}
