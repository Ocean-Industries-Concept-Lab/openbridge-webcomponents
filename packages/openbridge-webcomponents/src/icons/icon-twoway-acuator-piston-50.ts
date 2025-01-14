import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-twoway-acuator-piston-50')
export class ObiTwowayAcuatorPiston50 extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M7.49854 1C6.94625 1 6.49854 1.44772 6.49854 2V5.00366C6.49854 5.55595 6.94625 6.00366 7.49854 6.00366H11V10L3.5547 5.03647C2.89015 4.59343 2 5.06982 2 5.86852V18.1315C2 18.9302 2.89015 19.4066 3.5547 18.9635L11 14H13L20.4453 18.9635C21.1099 19.4066 22 18.9302 22 18.1315V5.86852C22 5.06982 21.1099 4.59343 20.4453 5.03647L13 10V6.00366H16.5015C17.0537 6.00366 17.5015 5.55595 17.5015 5.00366V2C17.5015 1.44772 17.0538 1 16.5015 1H7.49854ZM16.5015 2H7.49854V5.00366H16.5015V2ZM3 5.86852L5 7.20185V16.7982L3 18.1315L3 5.86852ZM6 16.1315L10.6972 13H13.3028L18 16.1315V7.86852L13.3028 11H10.6972L6 7.86852V16.1315ZM19 7.20185V16.7981L21 18.1315L21 5.86852L19 7.20185Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M3 5.86816L5 7.2015V16.7978L3 18.1311L3 5.86816ZM19 7.2015V16.7978L21 18.1311L21 5.86816L19 7.2015Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M6 16.1315L10.6972 13H13.3028L18 16.1315V7.86852L13.3028 11H10.6972L6 7.86852V16.1315Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M16.5015 2H7.49854L7.49854 5.00366H16.5015V2Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M7.49854 1C6.94625 1 6.49854 1.44772 6.49854 2V5.00366C6.49854 5.55595 6.94625 6.00366 7.49854 6.00366H11V10L3.5547 5.03647C2.89015 4.59343 2 5.06982 2 5.86852V18.1315C2 18.9302 2.89015 19.4066 3.5547 18.9635L11 14H13L20.4453 18.9635C21.1099 19.4066 22 18.9302 22 18.1315V5.86852C22 5.06982 21.1099 4.59343 20.4453 5.03647L13 10V6.00366H16.5015C17.0537 6.00366 17.5015 5.55595 17.5015 5.00366V2C17.5015 1.44772 17.0538 1 16.5015 1H7.49854ZM16.5015 2H7.49854V5.00366H16.5015V2ZM3 5.86852L5 7.20185V16.7982L3 18.1315L3 5.86852ZM6 16.1315L10.6972 13H13.3028L18 16.1315V7.86852L13.3028 11H10.6972L6 7.86852V16.1315ZM19 7.20185V16.7981L21 18.1315L21 5.86852L19 7.20185Z" style="fill: var(--automation-device-tertiary-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M3 5.86816L5 7.2015V16.7978L3 18.1311L3 5.86816ZM19 7.2015V16.7978L21 18.1311L21 5.86816L19 7.2015Z" style="fill: var(--automation-device-secondary-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M6 16.1315L10.6972 13H13.3028L18 16.1315V7.86852L13.3028 11H10.6972L6 7.86852V16.1315Z" style="fill: var(--automation-device-primary-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M16.5015 2H7.49854L7.49854 5.00366H16.5015V2Z" style="fill: var(--automation-device-primary-color)"/>
</svg>
`;

  override render() {
    return html`
      <div class="wrapper" >
        ${this.useCssColor? this.iconCss : this.icon}
      </div>
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
    'obi-twoway-acuator-piston-50': ObiTwowayAcuatorPiston50;
  }
}