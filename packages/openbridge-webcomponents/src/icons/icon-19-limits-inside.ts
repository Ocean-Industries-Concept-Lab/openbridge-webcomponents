import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-19-limits-inside')
export class Obi19LimitsInside extends LitElement {
  @property({type: Boolean, attribute: 'use-css-color'}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M19 5L21 5V3H19V5Z" fill="currentColor"/>
<path d="M5 19H3V21H5V19Z" fill="currentColor"/>
<path d="M21 19H19V21H21V19Z" fill="currentColor"/>
<path d="M15 19H17V21H15V19Z" fill="currentColor"/>
<path d="M13 21V19H11V21H13Z" fill="currentColor"/>
<path d="M7 19H9V21H7V19Z" fill="currentColor"/>
<path d="M3 3H5V5H3V3Z" fill="currentColor"/>
<path d="M17 3L15 3V5H17V3Z" fill="currentColor"/>
<path d="M13 3L11 3V5H13V3Z" fill="currentColor"/>
<path d="M7 5L9 5V3H7V5Z" fill="currentColor"/>
<path d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M19 5L21 5V3H19V5Z" style="fill: var(--element-active-color)"/>
<path d="M5 19H3V21H5V19Z" style="fill: var(--element-active-color)"/>
<path d="M21 19H19V21H21V19Z" style="fill: var(--element-active-color)"/>
<path d="M15 19H17V21H15V19Z" style="fill: var(--element-active-color)"/>
<path d="M13 21V19H11V21H13Z" style="fill: var(--element-active-color)"/>
<path d="M7 19H9V21H7V19Z" style="fill: var(--element-active-color)"/>
<path d="M3 3H5V5H3V3Z" style="fill: var(--element-active-color)"/>
<path d="M17 3L15 3V5H17V3Z" style="fill: var(--element-active-color)"/>
<path d="M13 3L11 3V5H13V3Z" style="fill: var(--element-active-color)"/>
<path d="M7 5L9 5V3H7V5Z" style="fill: var(--element-active-color)"/>
<path d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z" style="fill: var(--element-active-color)"/>
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
    'obi-19-limits-inside': Obi19LimitsInside;
  }
}
