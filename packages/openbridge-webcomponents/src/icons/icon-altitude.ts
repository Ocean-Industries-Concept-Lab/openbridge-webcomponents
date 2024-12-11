import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-altitude')
export class ObiAltitude extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M2 21H22V19H2V21Z" fill="currentColor"/>
<path d="M15 8.5H13V14.5H15L12 17.5L9 14.5H11V8.5H9L12 5.5L15 8.5Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M5 4H3V2H5V4Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M9 4H7V2H9V4Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M13 4H11V2H13V4Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M17 4H15V2H17V4Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M21 4H19V2H21V4Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M2 21H22V19H2V21Z" style="fill: var(--element-active-color)"/>
<path d="M15 8.5H13V14.5H15L12 17.5L9 14.5H11V8.5H9L12 5.5L15 8.5Z" style="fill: var(--element-active-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M5 4H3V2H5V4Z" style="fill: var(--element-active-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M9 4H7V2H9V4Z" style="fill: var(--element-active-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M13 4H11V2H13V4Z" style="fill: var(--element-active-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M17 4H15V2H17V4Z" style="fill: var(--element-active-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M21 4H19V2H21V4Z" style="fill: var(--element-active-color)"/>
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
    'obi-altitude': ObiAltitude;
  }
}