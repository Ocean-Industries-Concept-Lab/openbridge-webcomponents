import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-twoway-stacked-closed-left')
export class ObiTwowayStackedClosedLeft extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M11 0V14H13L20.4453 18.9635C21.1099 19.4066 22 18.9302 22 18.1315V5.86852C22 5.06982 21.1099 4.59343 20.4453 5.03647L13 10V0H11ZM13 11.25V12.75L21 18.1315V5.86852L13 11.25Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M9 10.4999L3 5.99986L3 17.9999L9 13.4999V10.4999Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M9 10.4999L3 5.99986L3 17.9999L9 13.4999V10.4999ZM10 9.99986L3.6 5.19986C2.94076 4.70544 2 5.17582 2 5.99986V17.9999C2 18.8239 2.94076 19.2943 3.6 18.7999L10 13.9999V9.99986Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M12.9999 12.7496L21 18.1311L21 5.86816L13 11.2496L12.9999 12.7496Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M11 0V14H13L20.4453 18.9635C21.1099 19.4066 22 18.9302 22 18.1315V5.86852C22 5.06982 21.1099 4.59343 20.4453 5.03647L13 10V0H11ZM13 11.25V12.75L21 18.1315V5.86852L13 11.25Z" style="fill: var(--automation-device-tertiary-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M9 10.4999L3 5.99986L3 17.9999L9 13.4999V10.4999Z" style="fill: var(--automation-device-tertiary-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M9 10.4999L3 5.99986L3 17.9999L9 13.4999V10.4999ZM10 9.99986L3.6 5.19986C2.94076 4.70544 2 5.17582 2 5.99986V17.9999C2 18.8239 2.94076 19.2943 3.6 18.7999L10 13.9999V9.99986Z" style="fill: var(--automation-device-secondary-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M12.9999 12.7496L21 18.1311L21 5.86816L13 11.2496L12.9999 12.7496Z" style="fill: var(--automation-device-primary-color)"/>
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
    'obi-twoway-stacked-closed-left': ObiTwowayStackedClosedLeft;
  }
}
