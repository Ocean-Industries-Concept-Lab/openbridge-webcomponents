import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-09-connector-3way')
export class Obi09Connector3way extends LitElement {
  @property({type: Boolean, attribute: 'use-css-color'}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M10 11.5H14V12.5L10 12.5V11.5Z" fill="currentColor"/>
<path d="M4 11.5H8V12.5L4 12.5V11.5Z" fill="currentColor"/>
<path d="M0 11.5H2L2 12.5L0 12.5V11.5Z" fill="currentColor"/>
<path d="M22 11.5L24 11.5V12.5L22 12.5V11.5Z" fill="currentColor"/>
<path d="M16 11.5H20V12.5L16 12.5V11.5Z" fill="currentColor"/>
<path d="M12.5 24V22.1667H11.5V24H12.5Z" fill="currentColor"/>
<path d="M12.5 20.3333L12.5 16.6667H11.5L11.5 20.3333H12.5Z" fill="currentColor"/>
<path d="M12.5 14.8333V13L11.5 13V14.8333H12.5Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M10 11.5H14V12.5L10 12.5V11.5Z" style="fill: var(--element-active-color)"/>
<path d="M4 11.5H8V12.5L4 12.5V11.5Z" style="fill: var(--element-active-color)"/>
<path d="M0 11.5H2L2 12.5L0 12.5V11.5Z" style="fill: var(--element-active-color)"/>
<path d="M22 11.5L24 11.5V12.5L22 12.5V11.5Z" style="fill: var(--element-active-color)"/>
<path d="M16 11.5H20V12.5L16 12.5V11.5Z" style="fill: var(--element-active-color)"/>
<path d="M12.5 24V22.1667H11.5V24H12.5Z" style="fill: var(--element-active-color)"/>
<path d="M12.5 20.3333L12.5 16.6667H11.5L11.5 20.3333H12.5Z" style="fill: var(--element-active-color)"/>
<path d="M12.5 14.8333V13L11.5 13V14.8333H12.5Z" style="fill: var(--element-active-color)"/>
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
    'obi-09-connector-3way': Obi09Connector3way;
  }
}
