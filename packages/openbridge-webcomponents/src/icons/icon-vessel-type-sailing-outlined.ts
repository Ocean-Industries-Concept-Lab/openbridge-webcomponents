import {LitElement, html, css, svg} from 'lit';
import {property} from 'lit/decorators.js';
import {customElement} from '../decorator.js';

@customElement('obi-vessel-type-sailing-outlined')
export class ObiVesselTypeSailingOutlined extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M12.7501 21H16.0001L16.4219 19.3128C17.9131 13.3479 16.619 7.05783 12.96 2.18358C12.6562 1.77897 12.3362 1.38411 12.0001 1C11.664 1.38411 11.344 1.77897 11.0402 2.18358C7.38118 7.05783 6.08707 13.3479 7.57829 19.3128L8.0001 21H11.2501V23C11.2501 23.4142 11.5859 23.75 12.0001 23.75C12.4143 23.75 12.7501 23.4142 12.7501 23V21ZM14.8289 19.5L14.9667 18.9489C16.3148 13.5567 15.2052 7.8775 12.0001 3.41074C8.79498 7.8775 7.68544 13.5567 9.03351 18.9489L9.17127 19.5H11.2501L11.2501 11.7993C10.8018 11.54 10.5001 11.0552 10.5001 10.5C10.5001 9.67157 11.1717 9 12.0001 9C12.8285 9 13.5001 9.67157 13.5001 10.5C13.5001 11.0552 13.1985 11.54 12.7501 11.7993L12.7501 19.5H14.8289Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M12.7501 21H16.0001L16.4219 19.3128C17.9131 13.3479 16.619 7.05783 12.96 2.18358C12.6562 1.77897 12.3362 1.38411 12.0001 1C11.664 1.38411 11.344 1.77897 11.0402 2.18358C7.38118 7.05783 6.08707 13.3479 7.57829 19.3128L8.0001 21H11.2501V23C11.2501 23.4142 11.5859 23.75 12.0001 23.75C12.4143 23.75 12.7501 23.4142 12.7501 23V21ZM14.8289 19.5L14.9667 18.9489C16.3148 13.5567 15.2052 7.8775 12.0001 3.41074C8.79498 7.8775 7.68544 13.5567 9.03351 18.9489L9.17127 19.5H11.2501L11.2501 11.7993C10.8018 11.54 10.5001 11.0552 10.5001 10.5C10.5001 9.67157 11.1717 9 12.0001 9C12.8285 9 13.5001 9.67157 13.5001 10.5C13.5001 11.0552 13.1985 11.54 12.7501 11.7993L12.7501 19.5H14.8289Z" style="fill: var(--element-active-color)"/>
</svg>
`;

  override render() {
    return html`
      <div class="wrapper">${this.useCssColor ? this.iconCss : this.icon}</div>
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
    'obi-vessel-type-sailing-outlined': ObiVesselTypeSailingOutlined;
  }
}
