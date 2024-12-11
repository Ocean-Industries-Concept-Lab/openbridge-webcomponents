import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-battery-vertical-50')
export class ObiBatteryVertical50 extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M11 1C10.4477 1 10 1.44772 10 2V3H9C7.89543 3 7 3.89543 7 5L7 20C7 21.1046 7.89543 22 9 22H15C16.1046 22 17 21.1046 17 20V5C17 3.89543 16.1046 3 15 3H14V2C14 1.44772 13.5523 1 13 1L11 1ZM15 12L15 5L9 5L9 12H15Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M11 1C10.4477 1 10 1.44772 10 2V3H9C7.89543 3 7 3.89543 7 5L7 20C7 21.1046 7.89543 22 9 22H15C16.1046 22 17 21.1046 17 20V5C17 3.89543 16.1046 3 15 3H14V2C14 1.44772 13.5523 1 13 1L11 1ZM15 12L15 5L9 5L9 12H15Z" style="fill: var(--element-active-color)"/>
</svg>
`;

  override render() {
    return html`
      <div class="wrapper" >
        ${this.useCssColor? this.iconCss : this.icon}
      </div>
    `;
  }

  static override styles = css`
  .wrapper {
    height: 100%;
    width: 100%;
    line-height: 0;
  }
  .wrapper > * {
      height: 100%;
      width: 100%;
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    'obi-battery-vertical-50': ObiBatteryVertical50;
  }
}