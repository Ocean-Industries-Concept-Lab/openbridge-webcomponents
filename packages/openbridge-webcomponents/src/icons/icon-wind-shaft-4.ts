import {LitElement, html, css, svg} from 'lit';
import {property} from 'lit/decorators.js';
import {customElement} from '../decorator.js';

@customElement('obi-wind-shaft-4')
export class ObiWindShaft4 extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M19 1C19.5523 1 20 1.44772 20 2C20 2.55228 19.5523 3 19 3H13V24H11V2.09961C11.0002 1.4924 11.4924 1.00021 12.0996 1H19Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M19 1C19.5523 1 20 1.44772 20 2C20 2.55228 19.5523 3 19 3H13V24H11V2.09961C11.0002 1.4924 11.4924 1.00021 12.0996 1H19Z" style="fill: var(--element-active-color)"/>
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
    'obi-wind-shaft-4': ObiWindShaft4;
  }
}
