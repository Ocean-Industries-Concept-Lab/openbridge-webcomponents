import {LitElement, html, css, svg} from 'lit';
import {property} from 'lit/decorators.js';
import {customElement} from '../decorator.js';

@customElement('obi-collision-avoidance-starboard-side')
export class ObiCollisionAvoidanceStarboardSide extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M15 12C15 12.5523 15.4477 13 16 13C16.5523 13 17 12.5523 17 12C17 11.4477 16.5523 11 16 11C15.4477 11 15 11.4477 15 12Z" fill="currentColor"/>
<path d="M18.5 12C18.5 12.5523 18.9477 13 19.5 13C20.0523 13 20.5 12.5523 20.5 12C20.5 11.4477 20.0523 11 19.5 11C18.9477 11 18.5 11.4477 18.5 12Z" fill="currentColor"/>
<path d="M6.99999 12C6.99999 12.5523 7.44771 13 7.99999 13C8.55228 13 8.99999 12.5523 8.99999 12C8.99999 11.4477 8.55228 11 7.99999 11C7.44771 11 6.99999 11.4477 6.99999 12Z" fill="currentColor"/>
<path d="M16 6L12 2L7.99999 6H11V20H13L13 6H16Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M1.43933 12L4.96966 8.46967L6.03032 9.53033L3.56065 12L6.03032 14.4697L4.96966 15.5303L1.43933 12Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M15 12C15 12.5523 15.4477 13 16 13C16.5523 13 17 12.5523 17 12C17 11.4477 16.5523 11 16 11C15.4477 11 15 11.4477 15 12Z" style="fill: var(--element-active-color)"/>
<path d="M18.5 12C18.5 12.5523 18.9477 13 19.5 13C20.0523 13 20.5 12.5523 20.5 12C20.5 11.4477 20.0523 11 19.5 11C18.9477 11 18.5 11.4477 18.5 12Z" style="fill: var(--element-active-color)"/>
<path d="M6.99999 12C6.99999 12.5523 7.44771 13 7.99999 13C8.55228 13 8.99999 12.5523 8.99999 12C8.99999 11.4477 8.55228 11 7.99999 11C7.44771 11 6.99999 11.4477 6.99999 12Z" style="fill: var(--element-active-color)"/>
<path d="M16 6L12 2L7.99999 6H11V20H13L13 6H16Z" style="fill: var(--element-active-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M1.43933 12L4.96966 8.46967L6.03032 9.53033L3.56065 12L6.03032 14.4697L4.96966 15.5303L1.43933 12Z" style="fill: var(--element-active-color)"/>
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
    'obi-collision-avoidance-starboard-side': ObiCollisionAvoidanceStarboardSide;
  }
}
