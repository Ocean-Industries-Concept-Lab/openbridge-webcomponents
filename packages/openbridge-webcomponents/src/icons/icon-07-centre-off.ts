import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-07-centre-off')
export class Obi07CentreOff extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M7 6V2H9V6H7Z" fill="currentColor"/>
<path d="M2 9H6V7H2V9Z" fill="currentColor"/>
<path d="M14 9H10V7H14V9Z" fill="currentColor"/>
<path d="M7 14V10H9V14H7Z" fill="currentColor"/>
<path d="M17.6715 13.0797L17.6452 13.1062L11 19.7514L13.2486 22L19.9049 15.3437L19.9203 15.3285L19.9355 15.3132C19.941 15.3077 19.9465 15.3022 19.952 15.2968C19.9601 15.2887 19.9682 15.2807 19.9762 15.2725C21.1649 14.0584 21.8417 12.5388 22 11C20.4612 11.1583 18.9416 11.8352 17.7275 13.0239C17.7218 13.0295 17.7162 13.0351 17.7105 13.0408C17.7064 13.045 17.7022 13.0492 17.698 13.0534L17.6715 13.0797Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M7 6V2H9V6H7Z" style="fill: var(--element-active-color)"/>
<path d="M2 9H6V7H2V9Z" style="fill: var(--element-active-color)"/>
<path d="M14 9H10V7H14V9Z" style="fill: var(--element-active-color)"/>
<path d="M7 14V10H9V14H7Z" style="fill: var(--element-active-color)"/>
<path d="M17.6715 13.0797L17.6452 13.1062L11 19.7514L13.2486 22L19.9049 15.3437L19.9203 15.3285L19.9355 15.3132C19.941 15.3077 19.9465 15.3022 19.952 15.2968C19.9601 15.2887 19.9682 15.2807 19.9762 15.2725C21.1649 14.0584 21.8417 12.5388 22 11C20.4612 11.1583 18.9416 11.8352 17.7275 13.0239C17.7218 13.0295 17.7162 13.0351 17.7105 13.0408C17.7064 13.045 17.7022 13.0492 17.698 13.0534L17.6715 13.0797Z" style="fill: var(--element-active-color)"/>
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
    'obi-07-centre-off': Obi07CentreOff;
  }
}
