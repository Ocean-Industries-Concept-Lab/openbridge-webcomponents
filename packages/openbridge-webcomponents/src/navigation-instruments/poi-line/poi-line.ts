import {LitElement, html, unsafeCSS} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import compentStyle from './poi-line.css?inline';
import '../poi-graphic-line/poi-graphic-line';
import {renderPointerDot} from './pointerDot';
import {POIStyle} from '../poi-graphic-line/poi-config';

@customElement('obc-poi-line')
export class ObcPoiLine extends LitElement {
  @property({type: Number}) height: number = 96;
  @property({type: String}) lineStyle: POIStyle = POIStyle.Normal;

  override render() {
    return html`
      <div class="wrapper">
        <obc-poi-graphic-line
          height=${this.height}
          lineStyle=${this.lineStyle}
        ></obc-poi-graphic-line>
        ${renderPointerDot({lineStyle: this.lineStyle})}
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
