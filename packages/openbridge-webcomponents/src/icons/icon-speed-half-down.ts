import {LitElement, html, css, svg} from 'lit';
import {property} from 'lit/decorators.js';
import {customElement} from '../decorator.js';

@customElement('obi-speed-half-down')
export class ObiSpeedHalfDown extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M17 13.8211V11L12 15.9911L7 11L7 13.8211L12 18.8211L17 13.8211Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M17 7.82106V5L12 9.99106L7 5L7 7.82109L12 12.8211L17 7.82106Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M17 13.8211V11L12 15.9911L7 11L7 13.8211L12 18.8211L17 13.8211Z" style="fill: var(--element-active-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M17 7.82106V5L12 9.99106L7 5L7 7.82109L12 12.8211L17 7.82106Z" style="fill: var(--element-active-color)"/>
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
    'obi-speed-half-down': ObiSpeedHalfDown;
  }
}
