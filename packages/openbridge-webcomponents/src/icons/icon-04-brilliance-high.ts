import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-04-brilliance-high')
export class Obi04BrillianceHigh extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M11 2H13V6H11V2Z" fill="currentColor"/>
<path d="M16 12C16 14.2091 14.2091 16 12 16C9.79086 16 8 14.2091 8 12C8 9.79086 9.79086 8 12 8C14.2091 8 16 9.79086 16 12Z" fill="currentColor"/>
<path d="M19.7782 5.63604L18.364 4.22182L15.5355 7.05025L16.9497 8.46447L19.7782 5.63604Z" fill="currentColor"/>
<path d="M2 13V11H6V13H2Z" fill="currentColor"/>
<path d="M5.63605 4.22183L4.22183 5.63604L7.05026 8.46447L8.46447 7.05025L5.63605 4.22183Z" fill="currentColor"/>
<path d="M13 18V22H11V18H13Z" fill="currentColor"/>
<path d="M8.46446 16.9498L7.05025 15.5355L4.22182 18.364L5.63603 19.7782L8.46446 16.9498Z" fill="currentColor"/>
<path d="M18 11H22V13H18V11Z" fill="currentColor"/>
<path d="M16.9498 15.5355L15.5355 16.9497L18.364 19.7782L19.7782 18.364L16.9498 15.5355Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M11 2H13V6H11V2Z" style="fill: var(--element-active-color)"/>
<path d="M16 12C16 14.2091 14.2091 16 12 16C9.79086 16 8 14.2091 8 12C8 9.79086 9.79086 8 12 8C14.2091 8 16 9.79086 16 12Z" style="fill: var(--element-active-color)"/>
<path d="M19.7782 5.63604L18.364 4.22182L15.5355 7.05025L16.9497 8.46447L19.7782 5.63604Z" style="fill: var(--element-active-color)"/>
<path d="M2 13V11H6V13H2Z" style="fill: var(--element-active-color)"/>
<path d="M5.63605 4.22183L4.22183 5.63604L7.05026 8.46447L8.46447 7.05025L5.63605 4.22183Z" style="fill: var(--element-active-color)"/>
<path d="M13 18V22H11V18H13Z" style="fill: var(--element-active-color)"/>
<path d="M8.46446 16.9498L7.05025 15.5355L4.22182 18.364L5.63603 19.7782L8.46446 16.9498Z" style="fill: var(--element-active-color)"/>
<path d="M18 11H22V13H18V11Z" style="fill: var(--element-active-color)"/>
<path d="M16.9498 15.5355L15.5355 16.9497L18.364 19.7782L19.7782 18.364L16.9498 15.5355Z" style="fill: var(--element-active-color)"/>
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
    'obi-04-brilliance-high': Obi04BrillianceHigh;
  }
}
