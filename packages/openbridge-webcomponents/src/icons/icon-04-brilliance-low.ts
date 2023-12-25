import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-04-brilliance-low')
export class Obi04BrillianceLow extends LitElement {
  @property({type: Number}) size = 24;
  @property({type: Boolean, attribute: 'use-css-color'}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M11 4H13V6H11V4Z" fill="currentColor"/>
<path d="M15 12C15 13.6569 13.6569 15 12 15C10.3431 15 9 13.6569 9 12C9 10.3431 10.3431 9 12 9C13.6569 9 15 10.3431 15 12Z" fill="currentColor"/>
<path d="M18.364 7.05025L16.9497 5.63604L15.5355 7.05025L16.9497 8.46447L18.364 7.05025Z" fill="currentColor"/>
<path d="M4 13V11H6L6 13H4Z" fill="currentColor"/>
<path d="M7.05025 5.63604L5.63604 7.05025L7.05025 8.46446L8.46447 7.05025L7.05025 5.63604Z" fill="currentColor"/>
<path d="M13 18V20H11V18H13Z" fill="currentColor"/>
<path d="M8.46447 16.9498L7.05025 15.5355L5.63604 16.9498L7.05025 18.364L8.46447 16.9498Z" fill="currentColor"/>
<path d="M18 11H20V13H18V11Z" fill="currentColor"/>
<path d="M16.9498 15.5355L15.5355 16.9497L16.9498 18.364L18.364 16.9497L16.9498 15.5355Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M11 4H13V6H11V4Z" style="fill: var(--element-active-color)"/>
<path d="M15 12C15 13.6569 13.6569 15 12 15C10.3431 15 9 13.6569 9 12C9 10.3431 10.3431 9 12 9C13.6569 9 15 10.3431 15 12Z" style="fill: var(--element-active-color)"/>
<path d="M18.364 7.05025L16.9497 5.63604L15.5355 7.05025L16.9497 8.46447L18.364 7.05025Z" style="fill: var(--element-active-color)"/>
<path d="M4 13V11H6L6 13H4Z" style="fill: var(--element-active-color)"/>
<path d="M7.05025 5.63604L5.63604 7.05025L7.05025 8.46446L8.46447 7.05025L7.05025 5.63604Z" style="fill: var(--element-active-color)"/>
<path d="M13 18V20H11V18H13Z" style="fill: var(--element-active-color)"/>
<path d="M8.46447 16.9498L7.05025 15.5355L5.63604 16.9498L7.05025 18.364L8.46447 16.9498Z" style="fill: var(--element-active-color)"/>
<path d="M18 11H20V13H18V11Z" style="fill: var(--element-active-color)"/>
<path d="M16.9498 15.5355L15.5355 16.9497L16.9498 18.364L18.364 16.9497L16.9498 15.5355Z" style="fill: var(--element-active-color)"/>
</svg>
`;

  override render() {
    return html`
      <div class="wrapper" style="--size:${this.size}px">
        ${this.useCssColor ? this.iconCss : this.icon}
      </div>
    `;
  }

  static override styles = css`
    .wrapper {
      height: var(--size);
      width: var(--size);
    }
    .wrapper > * {
      height: 100%;
      width: 100%;
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    'obi-04-brilliance-low': Obi04BrillianceLow;
  }
}
