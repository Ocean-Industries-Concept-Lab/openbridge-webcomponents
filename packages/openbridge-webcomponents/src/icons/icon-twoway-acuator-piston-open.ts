import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-twoway-acuator-piston-open')
export class ObiTwowayAcuatorPistonOpen extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M7.49854 1C6.94625 1 6.49854 1.44772 6.49854 2V5.00366C6.49854 5.55595 6.94625 6.00366 7.49854 6.00366H11V10L3.5547 5.03647C2.89015 4.59343 2 5.06982 2 5.86852V18.1315C2 18.9302 2.89015 19.4066 3.5547 18.9635L11 14H13L20.4453 18.9635C21.1099 19.4066 22 18.9302 22 18.1315V5.86852C22 5.06982 21.1099 4.59343 20.4453 5.03647L13 10V6.00366H16.5015C17.0537 6.00366 17.5015 5.55595 17.5015 5.00366V2C17.5015 1.44772 17.0538 1 16.5015 1H7.49854ZM16.5015 2H7.49854V5.00366H16.5015V2ZM3 5.86852L10.6972 11H13.3028L21 5.86852V18.1315L13.3028 13H10.6972L3 18.1315L3 5.86852Z" fill="currentColor"/>
<path d="M3 5.86852V18.1315L10.6972 13H13.3028L21 18.1315V5.86852L13.3028 11H10.6972L3 5.86852Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M16.5015 2H7.49854V5.00366H16.5015V2Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M7.49854 1C6.94625 1 6.49854 1.44772 6.49854 2V5.00366C6.49854 5.55595 6.94625 6.00366 7.49854 6.00366H11V10L3.5547 5.03647C2.89015 4.59343 2 5.06982 2 5.86852V18.1315C2 18.9302 2.89015 19.4066 3.5547 18.9635L11 14H13L20.4453 18.9635C21.1099 19.4066 22 18.9302 22 18.1315V5.86852C22 5.06982 21.1099 4.59343 20.4453 5.03647L13 10V6.00366H16.5015C17.0537 6.00366 17.5015 5.55595 17.5015 5.00366V2C17.5015 1.44772 17.0538 1 16.5015 1H7.49854ZM16.5015 2H7.49854V5.00366H16.5015V2ZM3 5.86852L10.6972 11H13.3028L21 5.86852V18.1315L13.3028 13H10.6972L3 18.1315L3 5.86852Z" style="fill: var(--automation-device-tertiary-color)"/>
<path d="M3 5.86852V18.1315L10.6972 13H13.3028L21 18.1315V5.86852L13.3028 11H10.6972L3 5.86852Z" style="fill: var(--automation-device-primary-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M16.5015 2H7.49854V5.00366H16.5015V2Z" style="fill: var(--automation-device-primary-color)"/>
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
    'obi-twoway-acuator-piston-open': ObiTwowayAcuatorPistonOpen;
  }
}
