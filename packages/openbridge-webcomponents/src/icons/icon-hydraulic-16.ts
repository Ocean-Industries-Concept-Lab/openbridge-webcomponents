import {LitElement, html, css, svg} from 'lit';
import {property} from 'lit/decorators.js';
import {customElement} from '../decorator.js';

@customElement('obi-hydraulic-16')
export class ObiHydraulic16 extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M13.5 15V17H15.5V23H17.5V17H19.5V15H13.5Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M4.5 15V17H6.5L6.5 23H8.5V17H10.5V15H4.5Z" fill="currentColor"/>
<path d="M17.5 7V1H15.5V7H13.5V9H19.5V7H17.5Z" fill="currentColor"/>
<path d="M8.5 7L8.5 1H6.5L6.5 7H4.5V9H10.5V7H8.5Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M13.5 15V17H15.5V23H17.5V17H19.5V15H13.5Z" style="fill: var(--element-active-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M4.5 15V17H6.5L6.5 23H8.5V17H10.5V15H4.5Z" style="fill: var(--element-active-color)"/>
<path d="M17.5 7V1H15.5V7H13.5V9H19.5V7H17.5Z" style="fill: var(--element-active-color)"/>
<path d="M8.5 7L8.5 1H6.5L6.5 7H4.5V9H10.5V7H8.5Z" style="fill: var(--element-active-color)"/>
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
    'obi-hydraulic-16': ObiHydraulic16;
  }
}
