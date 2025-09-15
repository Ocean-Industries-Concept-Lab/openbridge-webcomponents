import {LitElement, html, css, svg} from 'lit';
import {property} from 'lit/decorators.js';
import {customElement} from '../decorator.js';

@customElement('obi-collision-avoidance-port-side')
export class ObiCollisionAvoidancePortSide extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M9 12C9 12.5523 8.55228 13 8 13C7.44772 13 7 12.5523 7 12C7 11.4477 7.44772 11 8 11C8.55228 11 9 11.4477 9 12Z" fill="currentColor"/>
<path d="M5.5 12C5.5 12.5523 5.05228 13 4.5 13C3.94772 13 3.5 12.5523 3.5 12C3.5 11.4477 3.94772 11 4.5 11C5.05228 11 5.5 11.4477 5.5 12Z" fill="currentColor"/>
<path d="M17 12C17 12.5523 16.5523 13 16 13C15.4477 13 15 12.5523 15 12C15 11.4477 15.4477 11 16 11C16.5523 11 17 11.4477 17 12Z" fill="currentColor"/>
<path d="M8 6L12 2L16 6H13V20H11L11 6H8Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M22.5607 12L19.0303 8.46967L17.9697 9.53033L20.4393 12L17.9697 14.4697L19.0303 15.5303L22.5607 12Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M9 12C9 12.5523 8.55228 13 8 13C7.44772 13 7 12.5523 7 12C7 11.4477 7.44772 11 8 11C8.55228 11 9 11.4477 9 12Z" style="fill: var(--element-active-color)"/>
<path d="M5.5 12C5.5 12.5523 5.05228 13 4.5 13C3.94772 13 3.5 12.5523 3.5 12C3.5 11.4477 3.94772 11 4.5 11C5.05228 11 5.5 11.4477 5.5 12Z" style="fill: var(--element-active-color)"/>
<path d="M17 12C17 12.5523 16.5523 13 16 13C15.4477 13 15 12.5523 15 12C15 11.4477 15.4477 11 16 11C16.5523 11 17 11.4477 17 12Z" style="fill: var(--element-active-color)"/>
<path d="M8 6L12 2L16 6H13V20H11L11 6H8Z" style="fill: var(--element-active-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M22.5607 12L19.0303 8.46967L17.9697 9.53033L20.4393 12L17.9697 14.4697L19.0303 15.5303L22.5607 12Z" style="fill: var(--element-active-color)"/>
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
    'obi-collision-avoidance-port-side': ObiCollisionAvoidancePortSide;
  }
}
