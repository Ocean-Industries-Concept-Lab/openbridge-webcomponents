import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-08-ethernet-switch')
export class Obi08EthernetSwitch extends LitElement {
  @property({type: Number}) size = 24;
  @property({type: Boolean, attribute: 'use-css-color'}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M8 5.00002L5 8.03111L8 11.0622V9.03111H11V7.03111H8V5.00002Z" fill="currentColor"/>
<path d="M16 11.0622L19 8.03109L16 5V7.03109H13V9.03109H16V11.0622Z" fill="currentColor"/>
<path d="M8 13L5 16.0311L8 19.0622V17.0311H11V15.0311H8V13Z" fill="currentColor"/>
<path d="M16 19.0622L19 16.0311L16 13V15.0311H13V17.0311H16V19.0622Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M2 3C2 2.44772 2.44772 2 3 2H21C21.5523 2 22 2.44772 22 3V21C22 21.5523 21.5523 22 21 22H3C2.44772 22 2 21.5523 2 21V3ZM4 4V20H20V4H4Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M8 5.00002L5 8.03111L8 11.0622V9.03111H11V7.03111H8V5.00002Z" style="fill: var(--element-active-color)"/>
<path d="M16 11.0622L19 8.03109L16 5V7.03109H13V9.03109H16V11.0622Z" style="fill: var(--element-active-color)"/>
<path d="M8 13L5 16.0311L8 19.0622V17.0311H11V15.0311H8V13Z" style="fill: var(--element-active-color)"/>
<path d="M16 19.0622L19 16.0311L16 13V15.0311H13V17.0311H16V19.0622Z" style="fill: var(--element-active-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M2 3C2 2.44772 2.44772 2 3 2H21C21.5523 2 22 2.44772 22 3V21C22 21.5523 21.5523 22 21 22H3C2.44772 22 2 21.5523 2 21V3ZM4 4V20H20V4H4Z" style="fill: var(--element-active-color)"/>
</svg>
`;

  override render() {
    return html`
      <div class="wrapper" style="--size:${this.size}px">
        ${this.useCssColor ? this.iconCss : this.icon}
      </div>
    `;
  }

  static override styles = css`
    .wrapper {
      height: var(--size);
      width: var(--size);
    }
    .wrapper > * {
      height: 100%;
      width: 100%;
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    'obi-08-ethernet-switch': Obi08EthernetSwitch;
  }
}
