import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-04-illumination-low')
export class Obi04IlluminationLow extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M7.05025 5.63623L5.63604 7.05044L7.05025 8.46466L8.46447 7.05044L7.05025 5.63623Z" fill="currentColor"/>
<path d="M18.364 7.05045L16.9497 5.63623L15.5355 7.05045L16.9497 8.46466L18.364 7.05045Z" fill="currentColor"/>
<path d="M10 7.00024H14V9.76409C14.6137 10.3134 15 11.1117 15 12.0002C15 13.657 13.6569 15.0002 12 15.0002C10.3431 15.0002 9 13.657 9 12.0002C9 11.1117 9.38625 10.3134 10 9.76409V7.00024Z" fill="currentColor"/>
<path d="M4 13.0002V11.0002H6L6 13.0002H4Z" fill="currentColor"/>
<path d="M13 18.0002V20.0002H11V18.0002H13Z" fill="currentColor"/>
<path d="M8.46447 16.9499L7.05025 15.5357L5.63604 16.9499L7.05025 18.3642L8.46447 16.9499Z" fill="currentColor"/>
<path d="M18 13.0002V11.0002H20V13.0002H18Z" fill="currentColor"/>
<path d="M16.9498 15.5357L15.5355 16.9499L16.9498 18.3642L18.364 16.9499L16.9498 15.5357Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M7.05025 5.63623L5.63604 7.05044L7.05025 8.46466L8.46447 7.05044L7.05025 5.63623Z" style="fill: var(--element-active-color)"/>
<path d="M18.364 7.05045L16.9497 5.63623L15.5355 7.05045L16.9497 8.46466L18.364 7.05045Z" style="fill: var(--element-active-color)"/>
<path d="M10 7.00024H14V9.76409C14.6137 10.3134 15 11.1117 15 12.0002C15 13.657 13.6569 15.0002 12 15.0002C10.3431 15.0002 9 13.657 9 12.0002C9 11.1117 9.38625 10.3134 10 9.76409V7.00024Z" style="fill: var(--element-active-color)"/>
<path d="M4 13.0002V11.0002H6L6 13.0002H4Z" style="fill: var(--element-active-color)"/>
<path d="M13 18.0002V20.0002H11V18.0002H13Z" style="fill: var(--element-active-color)"/>
<path d="M8.46447 16.9499L7.05025 15.5357L5.63604 16.9499L7.05025 18.3642L8.46447 16.9499Z" style="fill: var(--element-active-color)"/>
<path d="M18 13.0002V11.0002H20V13.0002H18Z" style="fill: var(--element-active-color)"/>
<path d="M16.9498 15.5357L15.5355 16.9499L16.9498 18.3642L18.364 16.9499L16.9498 15.5357Z" style="fill: var(--element-active-color)"/>
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
    'obi-04-illumination-low': Obi04IlluminationLow;
  }
}
