import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-12-depth')
export class Obi12Depth extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M15.7037 1.29931C14.7004 2.31773 13.2598 3.78 12 3.78C10.7402 3.78 9.29957 2.31773 8.29626 1.29931C8.19262 1.19411 8.09363 1.09363 8 1C7 2 4.39 3.82 3 3.82H2V6H3C4.38 6 7 5 8 4C9 5 10.63 5.98 12 5.98C13.37 5.98 15 5 16 4C17 5 19.62 6 21 6H22V3.82H21C19.61 3.82 17 2 16 1C15.9064 1.09363 15.8074 1.19411 15.7037 1.29931Z" fill="currentColor"/>
<path d="M13 10H15L12 7L9 10H11V16H9L12 19L15 16H13V10Z" fill="currentColor"/>
<path d="M2 22H3V20H2V22Z" fill="currentColor"/>
<path d="M5 22H7V20H5V22Z" fill="currentColor"/>
<path d="M9 22H11V20H9V22Z" fill="currentColor"/>
<path d="M13 22H15V20H13V22Z" fill="currentColor"/>
<path d="M17 22H19V20H17V22Z" fill="currentColor"/>
<path d="M21 22H22V20H21V22Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M15.7037 1.29931C14.7004 2.31773 13.2598 3.78 12 3.78C10.7402 3.78 9.29957 2.31773 8.29626 1.29931C8.19262 1.19411 8.09363 1.09363 8 1C7 2 4.39 3.82 3 3.82H2V6H3C4.38 6 7 5 8 4C9 5 10.63 5.98 12 5.98C13.37 5.98 15 5 16 4C17 5 19.62 6 21 6H22V3.82H21C19.61 3.82 17 2 16 1C15.9064 1.09363 15.8074 1.19411 15.7037 1.29931Z" style="fill: var(--element-active-color)"/>
<path d="M13 10H15L12 7L9 10H11V16H9L12 19L15 16H13V10Z" style="fill: var(--element-active-color)"/>
<path d="M2 22H3V20H2V22Z" style="fill: var(--element-active-color)"/>
<path d="M5 22H7V20H5V22Z" style="fill: var(--element-active-color)"/>
<path d="M9 22H11V20H9V22Z" style="fill: var(--element-active-color)"/>
<path d="M13 22H15V20H13V22Z" style="fill: var(--element-active-color)"/>
<path d="M17 22H19V20H17V22Z" style="fill: var(--element-active-color)"/>
<path d="M21 22H22V20H21V22Z" style="fill: var(--element-active-color)"/>
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
    'obi-12-depth': Obi12Depth;
  }
}
