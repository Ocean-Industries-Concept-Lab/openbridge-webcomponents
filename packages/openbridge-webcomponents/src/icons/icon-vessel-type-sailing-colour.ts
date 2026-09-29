import {LitElement, html, css, svg} from 'lit';
import {property} from 'lit/decorators.js';
import {customElement} from '../decorator.js';

@customElement('obi-vessel-type-sailing-colour')
export class ObiVesselTypeSailingColour extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M16.4219 19.3128L16.0001 21H8.0001L7.57829 19.3128C6.08707 13.3479 7.38118 7.05783 11.0402 2.18358C11.344 1.77897 11.664 1.38411 12.0001 1C12.3362 1.38411 12.6562 1.77897 12.96 2.18358C16.619 7.05783 17.9131 13.3479 16.4219 19.3128Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M12.7496 21H15.9996L16.4214 19.3128C17.9127 13.3479 16.6185 7.05783 12.9595 2.18358C12.6557 1.77897 12.3357 1.38411 11.9996 1C11.6635 1.38411 11.3435 1.77897 11.0397 2.18358C7.38069 7.05783 6.08658 13.3479 7.5778 19.3128L7.99962 21H11.2496V23C11.2496 23.4142 11.5854 23.75 11.9996 23.75C12.4138 23.75 12.7496 23.4142 12.7496 23V21ZM14.8285 19.5L14.9662 18.9489C16.3143 13.5567 15.2047 7.8775 11.9996 3.41074C8.79449 7.8775 7.68495 13.5567 9.03302 18.9489L9.17078 19.5H11.2496L11.2496 11.7993C10.8013 11.54 10.4996 11.0552 10.4996 10.5C10.4996 9.67157 11.1712 9 11.9996 9C12.828 9 13.4996 9.67157 13.4996 10.5C13.4996 11.0552 13.198 11.54 12.7496 11.7993L12.7496 19.5H14.8285Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M16.4219 19.3128L16.0001 21H8.0001L7.57829 19.3128C6.08707 13.3479 7.38118 7.05783 11.0402 2.18358C11.344 1.77897 11.664 1.38411 12.0001 1C12.3362 1.38411 12.6562 1.77897 12.96 2.18358C16.619 7.05783 17.9131 13.3479 16.4219 19.3128Z" style="fill: var(--base-categorical-100)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M12.7496 21H15.9996L16.4214 19.3128C17.9127 13.3479 16.6185 7.05783 12.9595 2.18358C12.6557 1.77897 12.3357 1.38411 11.9996 1C11.6635 1.38411 11.3435 1.77897 11.0397 2.18358C7.38069 7.05783 6.08658 13.3479 7.5778 19.3128L7.99962 21H11.2496V23C11.2496 23.4142 11.5854 23.75 11.9996 23.75C12.4138 23.75 12.7496 23.4142 12.7496 23V21ZM14.8285 19.5L14.9662 18.9489C16.3143 13.5567 15.2047 7.8775 11.9996 3.41074C8.79449 7.8775 7.68495 13.5567 9.03302 18.9489L9.17078 19.5H11.2496L11.2496 11.7993C10.8013 11.54 10.4996 11.0552 10.4996 10.5C10.4996 9.67157 11.1712 9 11.9996 9C12.828 9 13.4996 9.67157 13.4996 10.5C13.4996 11.0552 13.198 11.54 12.7496 11.7993L12.7496 19.5H14.8285Z" style="fill: var(--base-categorical-600)"/>
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
    'obi-vessel-type-sailing-colour': ObiVesselTypeSailingColour;
  }
}
