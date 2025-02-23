import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-twoway-acuator-piston-closed-left')
export class ObiTwowayAcuatorPistonClosedLeft extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M7.49854 1C6.94625 1 6.49854 1.44772 6.49854 2V5.00366C6.49854 5.55595 6.94625 6.00366 7.49854 6.00366H11V14H13L20.4453 18.9635C21.1099 19.4066 22 18.9302 22 18.1315V5.86852C22 5.06982 21.1099 4.59343 20.4453 5.03647L13 10V6.00366H16.5015C17.0537 6.00366 17.5015 5.55595 17.5015 5.00366V2C17.5015 1.44772 17.0538 1 16.5015 1H7.49854ZM16.5015 2H7.49854V5.00366H16.5015V2ZM13 12.7981V11.2019L21 5.86852V18.1315L13 12.7981Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M9 10.5L3 6L3 18L9 13.5V10.5Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M9 10.5001L3 6.00011L3 18.0001L9 13.5001V10.5001ZM10 10.0001L3.6 5.20011C2.94076 4.70568 2 5.17606 2 6.00011V18.0001C2 18.8242 2.94076 19.2945 3.6 18.8001L10 14.0001V10.0001Z" fill="currentColor"/>
<path d="M21 18.1315V5.86852L13 11.2019V12.7981L21 18.1315Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M16.5015 2H7.49854L7.49854 5.00366H16.5015V2Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M7.49854 1C6.94625 1 6.49854 1.44772 6.49854 2V5.00366C6.49854 5.55595 6.94625 6.00366 7.49854 6.00366H11V14H13L20.4453 18.9635C21.1099 19.4066 22 18.9302 22 18.1315V5.86852C22 5.06982 21.1099 4.59343 20.4453 5.03647L13 10V6.00366H16.5015C17.0537 6.00366 17.5015 5.55595 17.5015 5.00366V2C17.5015 1.44772 17.0538 1 16.5015 1H7.49854ZM16.5015 2H7.49854V5.00366H16.5015V2ZM13 12.7981V11.2019L21 5.86852V18.1315L13 12.7981Z" style="fill: var(--automation-device-tertiary-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M9 10.5L3 6L3 18L9 13.5V10.5Z" style="fill: var(--automation-device-tertiary-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M9 10.5001L3 6.00011L3 18.0001L9 13.5001V10.5001ZM10 10.0001L3.6 5.20011C2.94076 4.70568 2 5.17606 2 6.00011V18.0001C2 18.8242 2.94076 19.2945 3.6 18.8001L10 14.0001V10.0001Z" style="fill: var(--automation-device-secondary-color)"/>
<path d="M21 18.1315V5.86852L13 11.2019V12.7981L21 18.1315Z" style="fill: var(--automation-device-primary-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M16.5015 2H7.49854L7.49854 5.00366H16.5015V2Z" style="fill: var(--automation-device-primary-color)"/>
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
    'obi-twoway-acuator-piston-closed-left': ObiTwowayAcuatorPistonClosedLeft;
  }
}
