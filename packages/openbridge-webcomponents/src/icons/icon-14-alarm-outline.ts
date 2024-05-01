import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-14-alarm-outline')
export class Obi14AlarmOutline extends LitElement {
  @property({type: Boolean, attribute: 'use-css-color'}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M3.60163 20.0002H20.3983L12 5.49403L3.60163 20.0002ZM1.86898 19.9992C1.48301 20.6659 1.96407 21.5002 2.73441 21.5002H21.2655C22.0358 21.5002 22.5169 20.6659 22.1309 19.9992L12.8654 3.99506C12.4802 3.32977 11.5197 3.32977 11.1345 3.99506L1.86898 19.9992Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M11 10.0002H13V15.0002H11V10.0002ZM13 17.0002V19.0002H11V17.0002H13Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M3.60163 20.0002H20.3983L12 5.49403L3.60163 20.0002ZM1.86898 19.9992C1.48301 20.6659 1.96407 21.5002 2.73441 21.5002H21.2655C22.0358 21.5002 22.5169 20.6659 22.1309 19.9992L12.8654 3.99506C12.4802 3.32977 11.5197 3.32977 11.1345 3.99506L1.86898 19.9992Z" style="fill: var(--element-active-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M11 10.0002H13V15.0002H11V10.0002ZM13 17.0002V19.0002H11V17.0002H13Z" style="fill: var(--element-active-color)"/>
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
    'obi-14-alarm-outline': Obi14AlarmOutline;
  }
}
