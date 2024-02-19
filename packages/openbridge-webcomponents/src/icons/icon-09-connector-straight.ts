import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-09-connector-straight')
export class Obi09ConnectorStraight extends LitElement {
  @property({type: Boolean, attribute: 'use-css-color'}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M2 12.5H0L0 11.5H2V12.5ZM8 12.5H4V11.5H8V12.5ZM14 12.5H10V11.5H14V12.5ZM20 12.5H16V11.5H20V12.5ZM24 12.5H22V11.5H24V12.5Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M2 12.5H0L0 11.5H2V12.5ZM8 12.5H4V11.5H8V12.5ZM14 12.5H10V11.5H14V12.5ZM20 12.5H16V11.5H20V12.5ZM24 12.5H22V11.5H24V12.5Z" style="fill: var(--element-active-color)"/>
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
    'obi-09-connector-straight': Obi09ConnectorStraight;
  }
}
