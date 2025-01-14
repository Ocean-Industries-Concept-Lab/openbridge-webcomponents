import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-twoway-stacked-50')
export class ObiTwowayStacked50 extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M11 0V10L3.5547 5.03647C2.89015 4.59343 2 5.06982 2 5.86852V18.1315C2 18.9302 2.89015 19.4066 3.5547 18.9635L11 14H13L20.4453 18.9635C21.1099 19.4066 22 18.9302 22 18.1315V5.86852C22 5.06982 21.1099 4.59343 20.4453 5.03647L13 10V0H11ZM3 5.86852L3 18.1315L5 16.7981V7.20185L3 5.86852ZM6 16.1315V7.86852L10.6972 11H13.3028L18 7.86852V16.1315L13.3028 13H10.6972L6 16.1315ZM19 16.7981V7.20185L21 5.86852L21 18.1315L19 16.7981Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M3 5.86816L5 7.2015V16.7978L3 18.1311L3 5.86816ZM19 7.2015V16.7978L21 18.1311L21 5.86816L19 7.2015Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M6 16.1321L10.6972 13.0006H13.3028L18 16.1321V7.86914L13.3028 11.0006H10.6972L6 7.86914V16.1321Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M11 0V10L3.5547 5.03647C2.89015 4.59343 2 5.06982 2 5.86852V18.1315C2 18.9302 2.89015 19.4066 3.5547 18.9635L11 14H13L20.4453 18.9635C21.1099 19.4066 22 18.9302 22 18.1315V5.86852C22 5.06982 21.1099 4.59343 20.4453 5.03647L13 10V0H11ZM3 5.86852L3 18.1315L5 16.7981V7.20185L3 5.86852ZM6 16.1315V7.86852L10.6972 11H13.3028L18 7.86852V16.1315L13.3028 13H10.6972L6 16.1315ZM19 16.7981V7.20185L21 5.86852L21 18.1315L19 16.7981Z" style="fill: var(--automation-device-tertiary-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M3 5.86816L5 7.2015V16.7978L3 18.1311L3 5.86816ZM19 7.2015V16.7978L21 18.1311L21 5.86816L19 7.2015Z" style="fill: var(--automation-device-secondary-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M6 16.1321L10.6972 13.0006H13.3028L18 16.1321V7.86914L13.3028 11.0006H10.6972L6 7.86914V16.1321Z" style="fill: var(--automation-device-primary-color)"/>
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
    'obi-twoway-stacked-50': ObiTwowayStacked50;
  }
}