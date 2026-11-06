import {LitElement, html, css, svg} from 'lit';
import {property} from 'lit/decorators.js';
import {customElement} from '../decorator.js';

@customElement('obi-caution-color-iec')
export class ObiCautionColorIec extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M4.8 3C3.80589 3 3 3.80589 3 4.8V19.2C3 20.1941 3.80589 21 4.8 21H19.2C20.1941 21 21 20.1941 21 19.2V4.8C21 3.80589 20.1941 3 19.2 3H4.8Z" fill-rule="evenodd" clip-rule="evenodd" fill="currentColor"/>
<mask id="stroke0_2002_1107" fill="white">
<path d="M4.8 3C3.80589 3 3 3.80589 3 4.8V19.2C3 20.1941 3.80589 21 4.8 21H19.2C20.1941 21 21 20.1941 21 19.2V4.8C21 3.80589 20.1941 3 19.2 3H4.8Z" fill-rule="evenodd" clip-rule="evenodd"/>
</mask>
<path d="M3 4.8C3 3.80589 3.80589 3 4.8 3H19.2C20.1941 3 21 3.80589 21 4.8V19.2C21 20.1941 20.1941 21 19.2 21H4.8C3.80589 21 3 20.1941 3 19.2V4.8Z" stroke-width="2" stroke="currentColor" mask="url(#stroke0_2002_1107)"/>
<path d="M11 14V6H13V14H11Z" fill="currentColor"/>
<path d="M13 16H11V18H13V16Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M4.8 3C3.80589 3 3 3.80589 3 4.8V19.2C3 20.1941 3.80589 21 4.8 21H19.2C20.1941 21 21 20.1941 21 19.2V4.8C21 3.80589 20.1941 3 19.2 3H4.8Z" fill-rule="evenodd" clip-rule="evenodd" style="fill: var(--alert-caution-color)"/>
<mask id="stroke0_2002_1107" fill="white">
<path d="M4.8 3C3.80589 3 3 3.80589 3 4.8V19.2C3 20.1941 3.80589 21 4.8 21H19.2C20.1941 21 21 20.1941 21 19.2V4.8C21 3.80589 20.1941 3 19.2 3H4.8Z" fill-rule="evenodd" clip-rule="evenodd"/>
</mask>
<path d="M3 4.8C3 3.80589 3.80589 3 4.8 3H19.2C20.1941 3 21 3.80589 21 4.8V19.2C21 20.1941 20.1941 21 19.2 21H4.8C3.80589 21 3 20.1941 3 19.2V4.8Z" stroke-width="2" style="stroke: var(--alert-caution-outline-color)" mask="url(#stroke0_2002_1107)"/>
<path d="M11 14V6H13V14H11Z" style="fill: var(--on-caution-active-color)"/>
<path d="M13 16H11V18H13V16Z" style="fill: var(--on-caution-active-color)"/>
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
    'obi-caution-color-iec': ObiCautionColorIec;
  }
}
