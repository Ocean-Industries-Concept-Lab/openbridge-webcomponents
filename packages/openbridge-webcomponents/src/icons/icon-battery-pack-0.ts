import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-battery-pack-0')
export class ObiBatteryPack0 extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M17.4 6.4H18.069C18.58 6.4 19 6.82 19 7.331V18.069C19 18.58 18.58 19 18.062 19H13.931C13.42 19 13 18.58 13 18.062V7.331C13 6.82 13.42 6.4 13.931 6.4H14.6V5H17.4V6.4ZM14.6 8H17.4V17H14.6V8Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M10.069 6.4H9.4V5H6.6V6.4H5.931C5.42 6.4 5 6.82 5 7.331V18.062C5 18.58 5.42 19 5.931 19H10.062C10.58 19 11 18.58 11 18.069V7.331C11 6.82 10.58 6.4 10.069 6.4ZM9.4 8H6.6V17H9.4V8Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M20 3.5H4C3.72386 3.5 3.5 3.72386 3.5 4V20C3.5 20.2761 3.72386 20.5 4 20.5H20C20.2761 20.5 20.5 20.2761 20.5 20V4C20.5 3.72386 20.2761 3.5 20 3.5ZM4 2C2.89543 2 2 2.89543 2 4V20C2 21.1046 2.89543 22 4 22H20C21.1046 22 22 21.1046 22 20V4C22 2.89543 21.1046 2 20 2H4Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M17.4 6.4H18.069C18.58 6.4 19 6.82 19 7.331V18.069C19 18.58 18.58 19 18.062 19H13.931C13.42 19 13 18.58 13 18.062V7.331C13 6.82 13.42 6.4 13.931 6.4H14.6V5H17.4V6.4ZM14.6 8H17.4V17H14.6V8Z" style="fill: var(--element-active-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M10.069 6.4H9.4V5H6.6V6.4H5.931C5.42 6.4 5 6.82 5 7.331V18.062C5 18.58 5.42 19 5.931 19H10.062C10.58 19 11 18.58 11 18.069V7.331C11 6.82 10.58 6.4 10.069 6.4ZM9.4 8H6.6V17H9.4V8Z" style="fill: var(--element-active-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M20 3.5H4C3.72386 3.5 3.5 3.72386 3.5 4V20C3.5 20.2761 3.72386 20.5 4 20.5H20C20.2761 20.5 20.5 20.2761 20.5 20V4C20.5 3.72386 20.2761 3.5 20 3.5ZM4 2C2.89543 2 2 2.89543 2 4V20C2 21.1046 2.89543 22 4 22H20C21.1046 22 22 21.1046 22 20V4C22 2.89543 21.1046 2 20 2H4Z" style="fill: var(--element-active-color)"/>
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
    'obi-battery-pack-0': ObiBatteryPack0;
  }
}
