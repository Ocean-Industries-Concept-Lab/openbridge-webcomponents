import {LitElement, html, css, svg} from 'lit';
import {property} from 'lit/decorators.js';
import {customElement} from '../decorator.js';

@customElement('obi-wind-shaft-3')
export class ObiWindShaft3 extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M12 1C12.5523 1 13 1.44772 13 2V5H16C16.5523 5 17 5.44772 17 6C17 6.55228 16.5523 7 16 7H13V24H11V2C11 1.44772 11.4477 1 12 1Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M12 1C12.5523 1 13 1.44772 13 2V5H16C16.5523 5 17 5.44772 17 6C17 6.55228 16.5523 7 16 7H13V24H11V2C11 1.44772 11.4477 1 12 1Z" style="fill: var(--element-active-color)"/>
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
    'obi-wind-shaft-3': ObiWindShaft3;
  }
}
