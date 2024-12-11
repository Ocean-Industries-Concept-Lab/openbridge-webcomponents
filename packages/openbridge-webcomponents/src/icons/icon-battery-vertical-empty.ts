import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-battery-vertical-empty')
export class ObiBatteryVerticalEmpty extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M10 2C10 1.44772 10.4477 1 11 1L13 1C13.5523 1 14 1.44772 14 2V3H15C16.1046 3 17 3.89543 17 5V20C17 21.1046 16.1046 22 15 22H9C7.89543 22 7 21.1046 7 20L7 5C7 3.89543 7.89543 3 9 3H10V2ZM9 20L9 5L15 5L15 20H9Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M10 2C10 1.44772 10.4477 1 11 1L13 1C13.5523 1 14 1.44772 14 2V3H15C16.1046 3 17 3.89543 17 5V20C17 21.1046 16.1046 22 15 22H9C7.89543 22 7 21.1046 7 20L7 5C7 3.89543 7.89543 3 9 3H10V2ZM9 20L9 5L15 5L15 20H9Z" style="fill: var(--element-active-color)"/>
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
    'obi-battery-vertical-empty': ObiBatteryVerticalEmpty;
  }
}