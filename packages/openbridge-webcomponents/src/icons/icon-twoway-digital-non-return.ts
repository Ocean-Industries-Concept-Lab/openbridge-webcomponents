import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-twoway-digital-non-return')
export class ObiTwowayDigitalNonReturn extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M13 10.0004V14.0004H11L3.5547 18.9639C2.89015 19.4069 2 18.9305 2 18.1318V5.86887C2 5.07017 2.89015 4.59378 3.5547 5.03682L11 10.0004H13ZM10.6972 11.0004H12V13.0004H10.6972L3 18.1318L3 5.86887L10.6972 11.0004Z" fill="currentColor"/>
<path d="M14 13.9999V9.99986L20.4 5.19986C21.0592 4.70544 22 5.17582 22 5.99986V17.9999C22 18.8239 21.0592 19.2943 20.4 18.7999L14 13.9999Z" fill="currentColor"/>
<path d="M10.6972 10.9996H12V12.9996H10.6972L3 18.1311V5.86816L10.6972 10.9996Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M13 10.0004V14.0004H11L3.5547 18.9639C2.89015 19.4069 2 18.9305 2 18.1318V5.86887C2 5.07017 2.89015 4.59378 3.5547 5.03682L11 10.0004H13ZM10.6972 11.0004H12V13.0004H10.6972L3 18.1318L3 5.86887L10.6972 11.0004Z" style="fill: var(--automation-device-secondary-color)"/>
<path d="M14 13.9999V9.99986L20.4 5.19986C21.0592 4.70544 22 5.17582 22 5.99986V17.9999C22 18.8239 21.0592 19.2943 20.4 18.7999L14 13.9999Z" style="fill: var(--automation-device-secondary-color)"/>
<path d="M10.6972 10.9996H12V12.9996H10.6972L3 18.1311V5.86816L10.6972 10.9996Z" style="fill: var(--automation-device-primary-color)"/>
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
    'obi-twoway-digital-non-return': ObiTwowayDigitalNonReturn;
  }
}