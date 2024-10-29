import {LitElement, html, svg, unsafeCSS} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import compentStyle from './poi-line.css?inline';
import '../poi-graphic-line/poi-graphic-line';
import {renderPointer} from './pointer';

@customElement('obc-poi-line')
export class ObcPoiLine extends LitElement {
  @property({type: Number}) height: number = 96;
  @property({type: Number}) pointerWidth: number = 8;
  override render() {
    return svg`
      <div class="container">
          <obc-poi-graphic-line height="${this.height - this.pointerWidth}" width="${this.pointerWidth}"></obc-poi-graphic-line>
          <svg width="${this.pointerWidth}" height="${this.height}" viewBox="0 0 ${this.pointerWidth} ${this.height}}" fill="none" xmlns="http://www.w3.org/2000/svg">
        ${renderPointer({fill: 'var(--instrument-enhanced-secondary-color)', y: this.height})}
        </svg>
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
