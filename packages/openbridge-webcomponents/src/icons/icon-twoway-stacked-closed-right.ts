import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-twoway-stacked-closed-right')
export class ObiTwowayStackedClosedRight extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M13 0V14H11L3.5547 18.9635C2.89014 19.4066 2 18.9302 2 18.1315V5.86852C2 5.06982 2.89015 4.59343 3.5547 5.03647L11 10V0H13ZM11 11.25V12.75L3 18.1315V5.86852L11 11.25Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M15 10.4999L21 5.99986V17.9999L15 13.4999V10.4999Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M15 10.4999L21 5.99986V17.9999L15 13.4999V10.4999ZM14 9.99986L20.4 5.19986C21.0592 4.70544 22 5.17582 22 5.99986V17.9999C22 18.8239 21.0592 19.2943 20.4 18.7999L14 13.9999V9.99986Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M10.9999 12.7496L2.99988 18.1311L2.99988 5.86816L10.9999 11.2496L10.9999 12.7496Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M13 0V14H11L3.5547 18.9635C2.89014 19.4066 2 18.9302 2 18.1315V5.86852C2 5.06982 2.89015 4.59343 3.5547 5.03647L11 10V0H13ZM11 11.25V12.75L3 18.1315V5.86852L11 11.25Z" style="fill: var(--automation-device-tertiary-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M15 10.4999L21 5.99986V17.9999L15 13.4999V10.4999Z" style="fill: var(--automation-device-tertiary-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M15 10.4999L21 5.99986V17.9999L15 13.4999V10.4999ZM14 9.99986L20.4 5.19986C21.0592 4.70544 22 5.17582 22 5.99986V17.9999C22 18.8239 21.0592 19.2943 20.4 18.7999L14 13.9999V9.99986Z" style="fill: var(--automation-device-secondary-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M10.9999 12.7496L2.99988 18.1311L2.99988 5.86816L10.9999 11.2496L10.9999 12.7496Z" style="fill: var(--automation-device-primary-color)"/>
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
    'obi-twoway-stacked-closed-right': ObiTwowayStackedClosedRight;
  }
}
