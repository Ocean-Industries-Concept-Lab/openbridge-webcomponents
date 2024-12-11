import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-twoway-acuator-piston-closed-right')
export class ObiTwowayAcuatorPistonClosedRight extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M16.5015 1C17.0537 1 17.5015 1.44772 17.5015 2V5.00366C17.5015 5.55595 17.0537 6.00366 16.5015 6.00366H13V14H11L3.5547 18.9635C2.89014 19.4066 2 18.9302 2 18.1315V5.86852C2 5.06982 2.89015 4.59343 3.5547 5.03647L11 10V6.00366H7.49854C6.94625 6.00366 6.49854 5.55595 6.49854 5.00366V2C6.49854 1.44772 6.94625 1 7.49854 1H16.5015ZM7.49854 2H16.5015V5.00366H7.49854V2ZM11 12.7981V11.2019L3 5.86852V18.1315L11 12.7981Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M15 10.5L21 6V18L15 13.5V10.5Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M15 10.4999L21 5.99986V17.9999L15 13.4999V10.4999ZM14 9.99986L20.4 5.19986C21.0592 4.70544 22 5.17582 22 5.99986V17.9999C22 18.8239 21.0592 19.2943 20.4 18.7999L14 13.9999V9.99986Z" fill="currentColor"/>
<path d="M3 18.1315V5.86852L11 11.2019V12.7981L3 18.1315Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M7.49854 2H16.5015V5.00366H7.49854V2Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M16.5015 1C17.0537 1 17.5015 1.44772 17.5015 2V5.00366C17.5015 5.55595 17.0537 6.00366 16.5015 6.00366H13V14H11L3.5547 18.9635C2.89014 19.4066 2 18.9302 2 18.1315V5.86852C2 5.06982 2.89015 4.59343 3.5547 5.03647L11 10V6.00366H7.49854C6.94625 6.00366 6.49854 5.55595 6.49854 5.00366V2C6.49854 1.44772 6.94625 1 7.49854 1H16.5015ZM7.49854 2H16.5015V5.00366H7.49854V2ZM11 12.7981V11.2019L3 5.86852V18.1315L11 12.7981Z" style="fill: var(--automation-device-tertiary-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M15 10.5L21 6V18L15 13.5V10.5Z" style="fill: var(--automation-device-tertiary-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M15 10.4999L21 5.99986V17.9999L15 13.4999V10.4999ZM14 9.99986L20.4 5.19986C21.0592 4.70544 22 5.17582 22 5.99986V17.9999C22 18.8239 21.0592 19.2943 20.4 18.7999L14 13.9999V9.99986Z" style="fill: var(--automation-device-secondary-color)"/>
<path d="M3 18.1315V5.86852L11 11.2019V12.7981L3 18.1315Z" style="fill: var(--automation-device-primary-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M7.49854 2H16.5015V5.00366H7.49854V2Z" style="fill: var(--automation-device-primary-color)"/>
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
    'obi-twoway-acuator-piston-closed-right': ObiTwowayAcuatorPistonClosedRight;
  }
}