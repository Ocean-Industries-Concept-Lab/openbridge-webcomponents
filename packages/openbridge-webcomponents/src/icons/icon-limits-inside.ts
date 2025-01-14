import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-limits-inside')
export class ObiLimitsInside extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z" fill="currentColor"/>
<path d="M5 21V19H3V21H5Z" fill="currentColor"/>
<path d="M21 19H19V21H21V19Z" fill="currentColor"/>
<path d="M17 19H15V21H17V19Z" fill="currentColor"/>
<path d="M13 19H11V21H13V19Z" fill="currentColor"/>
<path d="M9 21H7V19H9V21Z" fill="currentColor"/>
<path d="M5 5V3H3V5H5Z" fill="currentColor"/>
<path d="M21 3H19V5H21V3Z" fill="currentColor"/>
<path d="M17 3H15V5H17V3Z" fill="currentColor"/>
<path d="M13 3H11V5H13V3Z" fill="currentColor"/>
<path d="M9 5H7V3H9V5Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z" style="fill: var(--element-active-color)"/>
<path d="M5 21V19H3V21H5Z" style="fill: var(--element-active-color)"/>
<path d="M21 19H19V21H21V19Z" style="fill: var(--element-active-color)"/>
<path d="M17 19H15V21H17V19Z" style="fill: var(--element-active-color)"/>
<path d="M13 19H11V21H13V19Z" style="fill: var(--element-active-color)"/>
<path d="M9 21H7V19H9V21Z" style="fill: var(--element-active-color)"/>
<path d="M5 5V3H3V5H5Z" style="fill: var(--element-active-color)"/>
<path d="M21 3H19V5H21V3Z" style="fill: var(--element-active-color)"/>
<path d="M17 3H15V5H17V3Z" style="fill: var(--element-active-color)"/>
<path d="M13 3H11V5H13V3Z" style="fill: var(--element-active-color)"/>
<path d="M9 5H7V3H9V5Z" style="fill: var(--element-active-color)"/>
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
    'obi-limits-inside': ObiLimitsInside;
  }
}