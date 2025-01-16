import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-sources-01-off')
export class ObiSources01Off extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M12 21C16.6326 21 20.4476 17.5 20.9451 13L3.05493 13C3.55238 17.5 7.36745 21 12 21Z" fill="currentColor"/>
<path d="M12 3C16.6326 3 20.4476 6.50005 20.9451 11L3.05493 11C3.55238 6.50005 7.36745 3 12 3Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M23 12C23 18.0751 18.0751 23 12 23C5.92487 23 1 18.0751 1 12C1 5.92487 5.92487 1 12 1C18.0751 1 23 5.92487 23 12ZM20.9451 13C20.4476 17.5 16.6326 21 12 21C7.36745 21 3.55237 17.5 3.05493 13L20.9451 13ZM20.9451 11C20.4476 6.50005 16.6326 3 12 3C7.36745 3 3.55237 6.50005 3.05493 11L20.9451 11Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M12 21C16.6326 21 20.4476 17.5 20.9451 13L3.05493 13C3.55238 17.5 7.36745 21 12 21Z" style="fill: var(--automation-device-primary-inverted-color)"/>
<path d="M12 3C16.6326 3 20.4476 6.50005 20.9451 11L3.05493 11C3.55238 6.50005 7.36745 3 12 3Z" style="fill: var(--automation-device-primary-inverted-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M23 12C23 18.0751 18.0751 23 12 23C5.92487 23 1 18.0751 1 12C1 5.92487 5.92487 1 12 1C18.0751 1 23 5.92487 23 12ZM20.9451 13C20.4476 17.5 16.6326 21 12 21C7.36745 21 3.55237 17.5 3.05493 13L20.9451 13ZM20.9451 11C20.4476 6.50005 16.6326 3 12 3C7.36745 3 3.55237 6.50005 3.05493 11L20.9451 11Z" style="fill: var(--undefined)"/>
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
    'obi-sources-01-off': ObiSources01Off;
  }
}
