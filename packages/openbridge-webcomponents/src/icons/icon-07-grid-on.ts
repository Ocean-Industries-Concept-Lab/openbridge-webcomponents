import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-07-grid-on')
export class Obi07GridOn extends LitElement {
  @property({type: Boolean, attribute: 'use-css-color'}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M20 2H4V4H8H10H14H16H20V2Z" fill="currentColor"/>
<path d="M22 4C22 2.9 21.1 2 20 2V4V8V10V14V16V20V22C21.1 22 22 21.1 22 20V4Z" fill="currentColor"/>
<path d="M2 20C2 21.1 2.9 22 4 22V20V16V14V10V8V4V2C2.9 2 2 2.9 2 4V20Z" fill="currentColor"/>
<path d="M4 22H20V20H16H14H10H8H4V22Z" fill="currentColor"/>
<path d="M8 16V20H10V16V14V10V8V4H8V8V10V14V16Z" fill="currentColor"/>
<path d="M14 16V20H16V16V14V10V8V4H14V8V10V14V16Z" fill="currentColor"/>
<path d="M10 16H14V14H10V16Z" fill="currentColor"/>
<path d="M16 16H20V14H16V16Z" fill="currentColor"/>
<path d="M16 10H20V8H16V10Z" fill="currentColor"/>
<path d="M10 10H14V8H10V10Z" fill="currentColor"/>
<path d="M4 10H8V8H4V10Z" fill="currentColor"/>
<path d="M4 16H8V14H4V16Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M20 2H4V4H8H10H14H16H20V2Z" style="fill: var(--element-active-color)"/>
<path d="M22 4C22 2.9 21.1 2 20 2V4V8V10V14V16V20V22C21.1 22 22 21.1 22 20V4Z" style="fill: var(--element-active-color)"/>
<path d="M2 20C2 21.1 2.9 22 4 22V20V16V14V10V8V4V2C2.9 2 2 2.9 2 4V20Z" style="fill: var(--element-active-color)"/>
<path d="M4 22H20V20H16H14H10H8H4V22Z" style="fill: var(--element-active-color)"/>
<path d="M8 16V20H10V16V14V10V8V4H8V8V10V14V16Z" style="fill: var(--element-active-color)"/>
<path d="M14 16V20H16V16V14V10V8V4H14V8V10V14V16Z" style="fill: var(--element-active-color)"/>
<path d="M10 16H14V14H10V16Z" style="fill: var(--element-active-color)"/>
<path d="M16 16H20V14H16V16Z" style="fill: var(--element-active-color)"/>
<path d="M16 10H20V8H16V10Z" style="fill: var(--element-active-color)"/>
<path d="M10 10H14V8H10V10Z" style="fill: var(--element-active-color)"/>
<path d="M4 10H8V8H4V10Z" style="fill: var(--element-active-color)"/>
<path d="M4 16H8V14H4V16Z" style="fill: var(--element-active-color)"/>
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
    'obi-07-grid-on': Obi07GridOn;
  }
}