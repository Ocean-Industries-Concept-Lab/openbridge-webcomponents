import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-epms')
export class ObiEpms extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M12 2C6.47896 2 2 6.47896 2 12C2 17.521 6.47896 22 12 22C17.521 22 22 17.521 22 12C22 6.47896 17.521 2 12 2ZM11.479 20.016V13.7435H7.99198L13.002 3.98397V10.2565H16.3587L11.479 20.016Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M12 2C6.47896 2 2 6.47896 2 12C2 17.521 6.47896 22 12 22C17.521 22 22 17.521 22 12C22 6.47896 17.521 2 12 2ZM11.479 20.016V13.7435H7.99198L13.002 3.98397V10.2565H16.3587L11.479 20.016Z" style="fill: var(--element-active-color)"/>
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
    'obi-epms': ObiEpms;
  }
}