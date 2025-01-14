import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-battery-vertical-error')
export class ObiBatteryVerticalError extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M10 2C10 1.44772 10.4477 1 11 1H13C13.5523 1 14 1.44772 14 2V3H15C16.1046 3 17 3.89543 17 5V14H15L15 5L9 5L9 20H13V22H9C7.89543 22 7 21.1046 7 20V5C7 3.89543 7.89543 3 9 3H10V2Z" fill="currentColor"/>
<path d="M14.4654 16.8787L15.8797 15.4645L18.0007 17.5855L20.1217 15.4645L21.5359 16.8787L19.4149 18.9997L21.5365 21.1213L20.1223 22.5355L18.0007 20.4139L15.8791 22.5356L14.4648 21.1214L16.5865 18.9997L14.4654 16.8787Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M10 2C10 1.44772 10.4477 1 11 1H13C13.5523 1 14 1.44772 14 2V3H15C16.1046 3 17 3.89543 17 5V14H15L15 5L9 5L9 20H13V22H9C7.89543 22 7 21.1046 7 20V5C7 3.89543 7.89543 3 9 3H10V2Z" style="fill: var(--element-active-color)"/>
<path d="M14.4654 16.8787L15.8797 15.4645L18.0007 17.5855L20.1217 15.4645L21.5359 16.8787L19.4149 18.9997L21.5365 21.1213L20.1223 22.5355L18.0007 20.4139L15.8791 22.5356L14.4648 21.1214L16.5865 18.9997L14.4654 16.8787Z" style="fill: var(--element-active-color)"/>
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
    'obi-battery-vertical-error': ObiBatteryVerticalError;
  }
}