import {LitElement, html, css, svg} from 'lit';
import {property} from 'lit/decorators.js';
import {customElement} from '../decorator.js';

@customElement('obi-threeway-acuator-generic-closed')
export class ObiThreewayAcuatorGenericClosed extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M8 10.4775L3 6.90606V17.0197L8 13.4483V10.4775Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M21 17.0197L16 13.4483V10.4775L21 6.9061V17.0197Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M10.5146 15.9629L6.94317 20.9629H17.0568L13.4854 15.9629H10.5146Z" fill="currentColor"/>
<path d="M12 2.00366C14.3317 2.00366 16.3228 3.45534 17.123 5.50366H13V12.0037C13 12.5559 12.5523 13.0037 12 13.0037C11.4477 13.0037 11 12.5559 11 12.0037V5.50366H6.87695C7.6772 3.45534 9.66828 2.00366 12 2.00366Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M3.58124 6.09233C2.91937 5.61956 2 6.09269 2 6.90606V17.0197C2 17.8331 2.91937 18.3062 3.58124 17.8334L8.58124 14.262C8.84403 14.0743 9 13.7712 9 13.4483V10.4775C9 10.1545 8.84403 9.85147 8.58124 9.66376L3.58124 6.09233ZM8 10.4775L3 6.90606V17.0197L8 13.4483V10.4775Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M20.4188 17.8335C21.0806 18.3062 22 17.8331 22 17.0197V6.9061C22 6.09273 21.0806 5.6196 20.4188 6.09237L15.4188 9.6638C15.156 9.85151 15 10.1546 15 10.4775V13.4483C15 13.7712 15.156 14.0743 15.4188 14.262L20.4188 17.8335ZM21 17.0197L16 13.4483V10.4775L21 6.9061V17.0197Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M6.12944 20.3817C5.65667 21.0435 6.1298 21.9629 6.94317 21.9629H17.0568C17.8702 21.9629 18.3433 21.0435 17.8705 20.3817L14.2991 15.3817C14.1114 15.1189 13.8083 14.9629 13.4854 14.9629H10.5146C10.1916 14.9629 9.88858 15.1189 9.70086 15.3817L6.12944 20.3817ZM10.5146 15.9629L6.94317 20.9629H17.0568L13.4854 15.9629H10.5146Z" fill="currentColor"/>
<path d="M13 5.5H17.1231C16.3228 3.45168 14.3318 2 12 2C9.66831 2 7.67723 3.45168 6.87698 5.5H11V12L11.0049 12.1025C11.0562 12.6067 11.4824 13 12 13C12.5523 13 13 12.5523 13 12V5.5ZM14 12C14 13.1046 13.1046 14 12 14C10.8955 14 10 13.1046 10 12V6.5H6.87664C6.17282 6.5 5.68954 5.79143 5.94534 5.13574C6.89027 2.7174 9.2423 1 12 1C14.7578 1 17.1098 2.7174 18.0547 5.13574C18.3105 5.79143 17.8272 6.5 17.1234 6.5H14V12Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M8 10.4775L3 6.90606V17.0197L8 13.4483V10.4775Z" style="fill: var(--automation-device-primary-inverted-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M21 17.0197L16 13.4483V10.4775L21 6.9061V17.0197Z" style="fill: var(--automation-device-primary-inverted-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M10.5146 15.9629L6.94317 20.9629H17.0568L13.4854 15.9629H10.5146Z" style="fill: var(--automation-device-primary-inverted-color)"/>
<path d="M12 2.00366C14.3317 2.00366 16.3228 3.45534 17.123 5.50366H13V12.0037C13 12.5559 12.5523 13.0037 12 13.0037C11.4477 13.0037 11 12.5559 11 12.0037V5.50366H6.87695C7.6772 3.45534 9.66828 2.00366 12 2.00366Z" style="fill: var(--automation-device-primary-inverted-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M3.58124 6.09233C2.91937 5.61956 2 6.09269 2 6.90606V17.0197C2 17.8331 2.91937 18.3062 3.58124 17.8334L8.58124 14.262C8.84403 14.0743 9 13.7712 9 13.4483V10.4775C9 10.1545 8.84403 9.85147 8.58124 9.66376L3.58124 6.09233ZM8 10.4775L3 6.90606V17.0197L8 13.4483V10.4775Z" style="fill: var(--automation-device-tertiary-inverted-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M20.4188 17.8335C21.0806 18.3062 22 17.8331 22 17.0197V6.9061C22 6.09273 21.0806 5.6196 20.4188 6.09237L15.4188 9.6638C15.156 9.85151 15 10.1546 15 10.4775V13.4483C15 13.7712 15.156 14.0743 15.4188 14.262L20.4188 17.8335ZM21 17.0197L16 13.4483V10.4775L21 6.9061V17.0197Z" style="fill: var(--automation-device-tertiary-inverted-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M6.12944 20.3817C5.65667 21.0435 6.1298 21.9629 6.94317 21.9629H17.0568C17.8702 21.9629 18.3433 21.0435 17.8705 20.3817L14.2991 15.3817C14.1114 15.1189 13.8083 14.9629 13.4854 14.9629H10.5146C10.1916 14.9629 9.88858 15.1189 9.70086 15.3817L6.12944 20.3817ZM10.5146 15.9629L6.94317 20.9629H17.0568L13.4854 15.9629H10.5146Z" style="fill: var(--automation-device-tertiary-inverted-color)"/>
<path d="M13 5.5H17.1231C16.3228 3.45168 14.3318 2 12 2C9.66831 2 7.67723 3.45168 6.87698 5.5H11V12L11.0049 12.1025C11.0562 12.6067 11.4824 13 12 13C12.5523 13 13 12.5523 13 12V5.5ZM14 12C14 13.1046 13.1046 14 12 14C10.8955 14 10 13.1046 10 12V6.5H6.87664C6.17282 6.5 5.68954 5.79143 5.94534 5.13574C6.89027 2.7174 9.2423 1 12 1C14.7578 1 17.1098 2.7174 18.0547 5.13574C18.3105 5.79143 17.8272 6.5 17.1234 6.5H14V12Z" style="fill: var(--automation-device-tertiary-inverted-color)"/>
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
    'obi-threeway-acuator-generic-closed': ObiThreewayAcuatorGenericClosed;
  }
}
