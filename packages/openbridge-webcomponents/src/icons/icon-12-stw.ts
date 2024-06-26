import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-12-stw')
export class Obi12Stw extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M18 7L14 3H11L15 7L11 11H14L18 7Z" fill="currentColor"/>
<path d="M15.7037 15.2993C14.7004 16.3177 13.2598 17.78 12 17.78C10.7402 17.78 9.29957 16.3177 8.29626 15.2993C8.1927 15.1942 8.09356 15.0936 8 15C7 16 4.39 17.82 3 17.82H2V20H3C4.38 20 7 19 8 18C9 19 10.63 19.98 12 19.98C13.37 19.98 15 19 16 18C17 19 19.62 20 21 20H22V17.82H21C19.61 17.82 17 16 16 15C15.9064 15.0936 15.8073 15.1942 15.7037 15.2993Z" fill="currentColor"/>
<path d="M6 3H9L13 7L9 11H6L10 7L6 3Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M18 7L14 3H11L15 7L11 11H14L18 7Z" style="fill: var(--element-active-color)"/>
<path d="M15.7037 15.2993C14.7004 16.3177 13.2598 17.78 12 17.78C10.7402 17.78 9.29957 16.3177 8.29626 15.2993C8.1927 15.1942 8.09356 15.0936 8 15C7 16 4.39 17.82 3 17.82H2V20H3C4.38 20 7 19 8 18C9 19 10.63 19.98 12 19.98C13.37 19.98 15 19 16 18C17 19 19.62 20 21 20H22V17.82H21C19.61 17.82 17 16 16 15C15.9064 15.0936 15.8073 15.1942 15.7037 15.2993Z" style="fill: var(--element-active-color)"/>
<path d="M6 3H9L13 7L9 11H6L10 7L6 3Z" style="fill: var(--element-active-color)"/>
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
    'obi-12-stw': Obi12Stw;
  }
}
