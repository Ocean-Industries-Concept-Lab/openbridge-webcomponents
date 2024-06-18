import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-01-expanditem')
export class Obi01Expanditem extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M16.5 5.29297L14 7.79297L15.4142 9.20718L17.9142 6.70718L20.2071 9.00003V3.00003L14.2071 3.00003L16.5 5.29297Z" fill="currentColor"/>
<path d="M17.9142 16.5L15.4142 14L14 15.4142L16.5 17.9142L14.2072 20.2071H20.2072V14.2071L17.9142 16.5Z" fill="currentColor"/>
<path d="M5.29294 6.70706L7.79294 9.20706L9.20715 7.79285L6.70715 5.29285L9 3L3 3L3 9L5.29294 6.70706Z" fill="currentColor"/>
<path d="M6.70715 17.9144L9.20715 15.4144L7.79294 14.0002L5.29294 16.5002L3.00009 14.2073V20.2073H9.00009L6.70715 17.9144Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M16.5 5.29297L14 7.79297L15.4142 9.20718L17.9142 6.70718L20.2071 9.00003V3.00003L14.2071 3.00003L16.5 5.29297Z" style="fill: var(--element-active-color)"/>
<path d="M17.9142 16.5L15.4142 14L14 15.4142L16.5 17.9142L14.2072 20.2071H20.2072V14.2071L17.9142 16.5Z" style="fill: var(--element-active-color)"/>
<path d="M5.29294 6.70706L7.79294 9.20706L9.20715 7.79285L6.70715 5.29285L9 3L3 3L3 9L5.29294 6.70706Z" style="fill: var(--element-active-color)"/>
<path d="M6.70715 17.9144L9.20715 15.4144L7.79294 14.0002L5.29294 16.5002L3.00009 14.2073V20.2073H9.00009L6.70715 17.9144Z" style="fill: var(--element-active-color)"/>
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
    'obi-01-expanditem': Obi01Expanditem;
  }
}
