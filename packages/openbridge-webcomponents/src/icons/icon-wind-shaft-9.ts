import {LitElement, html, css, svg} from 'lit';
import {property} from 'lit/decorators.js';
import {customElement} from '../decorator.js';

@customElement('obi-wind-shaft-9')
export class ObiWindShaft9 extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M19 1C19.5523 1 20 1.44772 20 2C20 2.55228 19.5523 3 19 3H13V5H19C19.5523 5 20 5.44772 20 6C20 6.55228 19.5523 7 19 7H13V9H19C19.5523 9 20 9.44772 20 10C20 10.5523 19.5523 11 19 11H13V13H16C16.5523 13 17 13.4477 17 14C17 14.5523 16.5523 15 16 15H13V24H11V2.09961C11.0002 1.4924 11.4924 1.00021 12.0996 1H19Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M19 1C19.5523 1 20 1.44772 20 2C20 2.55228 19.5523 3 19 3H13V5H19C19.5523 5 20 5.44772 20 6C20 6.55228 19.5523 7 19 7H13V9H19C19.5523 9 20 9.44772 20 10C20 10.5523 19.5523 11 19 11H13V13H16C16.5523 13 17 13.4477 17 14C17 14.5523 16.5523 15 16 15H13V24H11V2.09961C11.0002 1.4924 11.4924 1.00021 12.0996 1H19Z" style="fill: var(--element-active-color)"/>
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
    'obi-wind-shaft-9': ObiWindShaft9;
  }
}
