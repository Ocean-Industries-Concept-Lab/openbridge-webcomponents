import {LitElement, html, nothing, unsafeCSS} from 'lit';
import {property} from 'lit/decorators.js';
import componentStyle from './poi-line.css?inline';
import '../poi-graphic-line/poi-graphic-line.js';
import {renderPointerDot} from './pointerDot.js';
import {
  getPOILineConfig,
  POILineType,
  POIStyle,
  resolvePOIStyle,
} from '../poi-graphic-line/poi-config.js';
import {graphicLine} from '../poi-graphic-line/poi-graphic-line.js';
import {customElement} from '../../../decorator.js';

@customElement('obc-poi-line')
export class ObcPoiLine extends LitElement {
  private static _idCounter = 0;
  private readonly _idPrefix = `poi-line-${ObcPoiLine._idCounter++}`;
  @property({type: Number}) height: number = 96;
  @property({type: String}) poiStyle: POIStyle = POIStyle.Normal;
  @property({type: String}) lineType: POILineType = POILineType.Regular;
  @property({type: Number}) offset: number = 0;
  @property({type: Boolean}) hasPointer = false;
  @property({type: Boolean, attribute: 'animate-position'})
  animatePosition = false;
  override render() {
    const style = getPOILineConfig(this.poiStyle, this.lineType);
    const resolvedStyle = resolvePOIStyle(this.poiStyle);
    let lineHeight = this.height - 2;
    let centerX = 2;
    let centerYOffset = 1;
    if (resolvedStyle === POIStyle.Regular) {
      lineHeight = this.height - 2;
      centerYOffset = 2;
      centerX = 2;
    }

    const totalHeight = lineHeight + style.width + style.dotStart;
    const translateX = -style.width / 2 + (this.offset < 0 ? this.offset : 0);

    return html`
      <div
        class="offset-wrapper"
        style="--obc-poi-line-transition-duration: ${this.animatePosition
          ? '0.1s'
          : '0s'};"
      >
        <div
          class="container"
          style="height: ${totalHeight}px; width: ${style.width}px; transform: translateX(${translateX}px);"
        >
          ${graphicLine({
            style,
            lineHeight,
            totalHeight,
            offset: this.offset,
            idPrefix: this._idPrefix,
          })}
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
