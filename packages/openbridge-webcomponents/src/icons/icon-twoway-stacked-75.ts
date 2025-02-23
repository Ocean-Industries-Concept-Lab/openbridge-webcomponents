import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-twoway-stacked-75')
export class ObiTwowayStacked75 extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M11 0V10L3.5547 5.03647C2.89015 4.59343 2 5.06982 2 5.86852V18.1315C2 18.9302 2.89015 19.4066 3.5547 18.9635L11 14H13L20.4453 18.9635C21.1099 19.4066 22 18.9302 22 18.1315V5.86852C22 5.06982 21.1099 4.59343 20.4453 5.03647L13 10V0H11ZM3 5.86852L3 18.1315L4 17.4648V6.53518L3 5.86852ZM5 16.7981V7.20185L10.6972 11H13.3028L19 7.20185V16.7981L13.3028 13H10.6972L5 16.7981ZM20 17.4648V6.53518L21 5.86852V18.1315L20 17.4648Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M3 5.86816L4 6.53483V17.4645L3 18.1311L3 5.86816ZM20 6.53483V17.4645L21 18.1311V5.86816L20 6.53483Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M5 16.7984L10.6972 13.0003H13.3028L19 16.7984V7.20215L13.3028 11.0003H10.6972L5 7.20215V16.7984Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M11 0V10L3.5547 5.03647C2.89015 4.59343 2 5.06982 2 5.86852V18.1315C2 18.9302 2.89015 19.4066 3.5547 18.9635L11 14H13L20.4453 18.9635C21.1099 19.4066 22 18.9302 22 18.1315V5.86852C22 5.06982 21.1099 4.59343 20.4453 5.03647L13 10V0H11ZM3 5.86852L3 18.1315L4 17.4648V6.53518L3 5.86852ZM5 16.7981V7.20185L10.6972 11H13.3028L19 7.20185V16.7981L13.3028 13H10.6972L5 16.7981ZM20 17.4648V6.53518L21 5.86852V18.1315L20 17.4648Z" style="fill: var(--automation-device-tertiary-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M3 5.86816L4 6.53483V17.4645L3 18.1311L3 5.86816ZM20 6.53483V17.4645L21 18.1311V5.86816L20 6.53483Z" style="fill: var(--automation-device-secondary-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M5 16.7984L10.6972 13.0003H13.3028L19 16.7984V7.20215L13.3028 11.0003H10.6972L5 7.20215V16.7984Z" style="fill: var(--automation-device-primary-color)"/>
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
    'obi-twoway-stacked-75': ObiTwowayStacked75;
  }
}
