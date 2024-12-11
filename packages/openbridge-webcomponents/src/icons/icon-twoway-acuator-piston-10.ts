import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-twoway-acuator-piston-10')
export class ObiTwowayAcuatorPiston10 extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M20.4453 5.03647C21.1099 4.59343 22 5.06982 22 5.86852V18.1315C22 18.9302 21.1099 19.4066 20.4453 18.9635L13 14H11L3.5547 18.9635C2.89015 19.4066 2 18.9302 2 18.1315V5.86852C2 5.06982 2.89014 4.59343 3.5547 5.03647L11 10V6L7.49854 6.00366C6.94625 6.00366 6.49854 5.55595 6.49854 5.00366V2C6.49854 1.44772 6.94625 1 7.49854 1H16.5015C17.0538 1 17.5015 1.44772 17.5015 2V5.00366C17.5015 5.55595 17.0537 6.00366 16.5015 6.00366L13 6V10L20.4453 5.03647ZM3 5.86852L3 18.1315L9 14.1315V9.86852L3 5.86852ZM14 13.4648V10.5352L13.3028 11H10.6972L10 10.5352V13.4648L10.6972 13H13.3028L14 13.4648ZM15 9.86852V14.1315L21 18.1315L21 5.86852L15 9.86852ZM16.5015 2H7.49854V5.00366H16.5015V2Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M9 14.1311L3 18.1311L3 5.86816L9 9.86817V14.1311ZM15 9.86816V14.1311L21 18.1311L21 5.86816M21 5.86816L15 9.86816L21 5.86816Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M10 13.4648L10.6972 13H13.3028L14 13.4648V10.5352L13.3028 11H10.6972L10 10.5352V13.4648Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M16.5015 2H7.49854L7.49854 5.00366H16.5015V2Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M20.4453 5.03647C21.1099 4.59343 22 5.06982 22 5.86852V18.1315C22 18.9302 21.1099 19.4066 20.4453 18.9635L13 14H11L3.5547 18.9635C2.89015 19.4066 2 18.9302 2 18.1315V5.86852C2 5.06982 2.89014 4.59343 3.5547 5.03647L11 10V6L7.49854 6.00366C6.94625 6.00366 6.49854 5.55595 6.49854 5.00366V2C6.49854 1.44772 6.94625 1 7.49854 1H16.5015C17.0538 1 17.5015 1.44772 17.5015 2V5.00366C17.5015 5.55595 17.0537 6.00366 16.5015 6.00366L13 6V10L20.4453 5.03647ZM3 5.86852L3 18.1315L9 14.1315V9.86852L3 5.86852ZM14 13.4648V10.5352L13.3028 11H10.6972L10 10.5352V13.4648L10.6972 13H13.3028L14 13.4648ZM15 9.86852V14.1315L21 18.1315L21 5.86852L15 9.86852ZM16.5015 2H7.49854V5.00366H16.5015V2Z" style="fill: var(--automation-device-tertiary-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M9 14.1311L3 18.1311L3 5.86816L9 9.86817V14.1311ZM15 9.86816V14.1311L21 18.1311L21 5.86816M21 5.86816L15 9.86816L21 5.86816Z" style="fill: var(--automation-device-secondary-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M10 13.4648L10.6972 13H13.3028L14 13.4648V10.5352L13.3028 11H10.6972L10 10.5352V13.4648Z" style="fill: var(--automation-device-primary-color)"/>
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
    'obi-twoway-acuator-piston-10': ObiTwowayAcuatorPiston10;
  }
}