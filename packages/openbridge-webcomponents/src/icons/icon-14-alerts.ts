import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-14-alerts')
export class Obi14Alerts extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M12 23C13.1 23 13.99 22.1307 13.99 21.0563H10.01C10.01 22.1307 10.9 23 12 23ZM19 17.1395V11.2791C19 8.00698 16.64 5.27209 13.5 4.60791V3.46512C13.5 2.65442 12.83 2 12 2C11.17 2 10.5 2.65442 10.5 3.46512V4.60791C7.36 5.27209 5 8.00698 5 11.2791V17.1395L3 19.093V20.0698H21V19.093L19 17.1395Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M12 23C13.1 23 13.99 22.1307 13.99 21.0563H10.01C10.01 22.1307 10.9 23 12 23ZM19 17.1395V11.2791C19 8.00698 16.64 5.27209 13.5 4.60791V3.46512C13.5 2.65442 12.83 2 12 2C11.17 2 10.5 2.65442 10.5 3.46512V4.60791C7.36 5.27209 5 8.00698 5 11.2791V17.1395L3 19.093V20.0698H21V19.093L19 17.1395Z" style="fill: var(--element-active-color)"/>
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
    'obi-14-alerts': Obi14Alerts;
  }
}
