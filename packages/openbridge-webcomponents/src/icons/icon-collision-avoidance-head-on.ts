import {LitElement, html, css, svg} from 'lit';
import {property} from 'lit/decorators.js';
import {customElement} from '../decorator.js';

@customElement('obi-collision-avoidance-head-on')
export class ObiCollisionAvoidanceHeadOn extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M12 13L16 17H13V22H11V17H8L12 13Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M12 11.5607L15.5303 8.03033L14.4697 6.96967L12 9.43934L9.53033 6.96967L8.46967 8.03033L12 11.5607Z" fill="currentColor"/>
<path d="M13 5.5C13 6.05228 12.5523 6.5 12 6.5C11.4477 6.5 11 6.05228 11 5.5C11 4.94772 11.4477 4.5 12 4.5C12.5523 4.5 13 4.94772 13 5.5Z" fill="currentColor"/>
<path d="M13 2C13 2.55228 12.5523 3 12 3C11.4477 3 11 2.55228 11 2C11 1.44772 11.4477 1 12 1C12.5523 1 13 1.44772 13 2Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M12 13L16 17H13V22H11V17H8L12 13Z" style="fill: var(--element-active-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M12 11.5607L15.5303 8.03033L14.4697 6.96967L12 9.43934L9.53033 6.96967L8.46967 8.03033L12 11.5607Z" style="fill: var(--element-active-color)"/>
<path d="M13 5.5C13 6.05228 12.5523 6.5 12 6.5C11.4477 6.5 11 6.05228 11 5.5C11 4.94772 11.4477 4.5 12 4.5C12.5523 4.5 13 4.94772 13 5.5Z" style="fill: var(--element-active-color)"/>
<path d="M13 2C13 2.55228 12.5523 3 12 3C11.4477 3 11 2.55228 11 2C11 1.44772 11.4477 1 12 1C12.5523 1 13 1.44772 13 2Z" style="fill: var(--element-active-color)"/>
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
    'obi-collision-avoidance-head-on': ObiCollisionAvoidanceHeadOn;
  }
}
