import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-sources-02-off')
export class ObiSources02Off extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M21 11.9998C21 16.6323 17.5 20.4474 13 20.9448V3.05469C17.5 3.55213 21 7.3672 21 11.9998Z" fill="currentColor"/>
<path d="M11 3.05469L11 20.9448C6.50005 20.4474 3 16.6323 3 11.9998C3 7.36721 6.50005 3.55213 11 3.05469Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M23 12C23 18.0751 18.0751 23 12 23C5.92487 23 1 18.0751 1 12C1 5.92487 5.92487 1 12 1C18.0751 1 23 5.92487 23 12ZM13 20.9451C17.5 20.4476 21 16.6326 21 12C21 7.36745 17.5 3.55237 13 3.05493V20.9451ZM11 20.9451L11 3.05493C6.50005 3.55237 3 7.36745 3 12C3 16.6326 6.50005 20.4476 11 20.9451Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M21 11.9998C21 16.6323 17.5 20.4474 13 20.9448V3.05469C17.5 3.55213 21 7.3672 21 11.9998Z" style="fill: var(--automation-device-primary-inverted-color)"/>
<path d="M11 3.05469L11 20.9448C6.50005 20.4474 3 16.6323 3 11.9998C3 7.36721 6.50005 3.55213 11 3.05469Z" style="fill: var(--automation-device-primary-inverted-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M23 12C23 18.0751 18.0751 23 12 23C5.92487 23 1 18.0751 1 12C1 5.92487 5.92487 1 12 1C18.0751 1 23 5.92487 23 12ZM13 20.9451C17.5 20.4476 21 16.6326 21 12C21 7.36745 17.5 3.55237 13 3.05493V20.9451ZM11 20.9451L11 3.05493C6.50005 3.55237 3 7.36745 3 12C3 16.6326 6.50005 20.4476 11 20.9451Z" style="fill: var(--automation-device-tertiary-inverted-color)"/>
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
    'obi-sources-02-off': ObiSources02Off;
  }
}