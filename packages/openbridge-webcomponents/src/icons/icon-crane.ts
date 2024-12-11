import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-crane')
export class ObiCrane extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M22 6V4L7.82929 4C7.41746 2.83481 6.30622 2 5 2C3.34315 2 2 3.34315 2 5C2 6.12286 2.61689 7.10164 3.53024 7.61591L6.5 19H3V22H16V19H13L7.38094 6.82538C7.57099 6.57787 7.7233 6.29988 7.82929 6L22 6ZM5 6C5.55228 6 6 5.55228 6 5C6 4.44772 5.55228 4 5 4C4.44772 4 4 4.44772 4 5C4 5.55228 4.44772 6 5 6Z" fill="currentColor"/>
<path d="M18 7V12H15V16H23V12H20V7H18Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M22 6V4L7.82929 4C7.41746 2.83481 6.30622 2 5 2C3.34315 2 2 3.34315 2 5C2 6.12286 2.61689 7.10164 3.53024 7.61591L6.5 19H3V22H16V19H13L7.38094 6.82538C7.57099 6.57787 7.7233 6.29988 7.82929 6L22 6ZM5 6C5.55228 6 6 5.55228 6 5C6 4.44772 5.55228 4 5 4C4.44772 4 4 4.44772 4 5C4 5.55228 4.44772 6 5 6Z" style="fill: var(--element-active-color)"/>
<path d="M18 7V12H15V16H23V12H20V7H18Z" style="fill: var(--element-active-color)"/>
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
    'obi-crane': ObiCrane;
  }
}