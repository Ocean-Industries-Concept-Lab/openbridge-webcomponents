import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-09-switch-horizontal-on')
export class Obi09SwitchHorizontalOn extends LitElement {
  @property({type: Boolean, attribute: 'use-css-color'}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M4 9H20C21.6569 9 23 10.3431 23 12C23 13.6569 21.6569 15 20 15H4C2.34315 15 1 13.6569 1 12C1 10.3431 2.34315 9 4 9ZM4 10C2.89543 10 2 10.8954 2 12C2 13.1046 2.89543 14 4 14H20C21.1046 14 22 13.1046 22 12C22 10.8954 21.1046 10 20 10H4Z" fill="currentColor"/>
<path d="M2 12C2 10.8954 2.89543 10 4 10H20C21.1046 10 22 10.8954 22 12C22 13.1046 21.1046 14 20 14H4C2.89543 14 2 13.1046 2 12Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M4 9H20C21.6569 9 23 10.3431 23 12C23 13.6569 21.6569 15 20 15H4C2.34315 15 1 13.6569 1 12C1 10.3431 2.34315 9 4 9ZM4 10C2.89543 10 2 10.8954 2 12C2 13.1046 2.89543 14 4 14H20C21.1046 14 22 13.1046 22 12C22 10.8954 21.1046 10 20 10H4Z" style="fill: var(--automation-device-tertiary-color)"/>
<path d="M2 12C2 10.8954 2.89543 10 4 10H20C21.1046 10 22 10.8954 22 12C22 13.1046 21.1046 14 20 14H4C2.89543 14 2 13.1046 2 12Z" style="fill: var(--automation-device-primary-color)"/>
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
    }
    .wrapper > * {
      height: 100%;
      width: 100%;
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    'obi-09-switch-horizontal-on': Obi09SwitchHorizontalOn;
  }
}
