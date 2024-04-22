import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-09-twoway-digital-closed')
export class Obi09TwowayDigitalClosed extends LitElement {
  @property({type: Boolean, attribute: 'use-css-color'}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M3 17.6001L10 13.289V10.711L3 6.39991V12V17.6001ZM11 10.1524L2.75193 5.0727C2.41861 4.86742 2 5.12126 2 5.52868V18.4713C2 18.8787 2.41861 19.1326 2.75194 18.9273L11 13.8476V10.1524ZM21 17.6001V6.39991L14 10.711V13.289L21 17.6001ZM13 13.8476L21.2481 18.9273C21.5814 19.1326 22 18.8787 22 18.4713V5.52868C22 5.12126 21.5814 4.86742 21.2481 5.0727L13 10.1524V13.8476Z" fill="currentColor"/>
<path d="M10 13.289L3 17.6001V12V6.39991L10 10.711V13.289Z" fill="currentColor"/>
<path d="M21 6.39991V17.6001L14 13.289V10.711L21 6.39991Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M3 17.6001L10 13.289V10.711L3 6.39991V12V17.6001ZM11 10.1524L2.75193 5.0727C2.41861 4.86742 2 5.12126 2 5.52868V18.4713C2 18.8787 2.41861 19.1326 2.75194 18.9273L11 13.8476V10.1524ZM21 17.6001V6.39991L14 10.711V13.289L21 17.6001ZM13 13.8476L21.2481 18.9273C21.5814 19.1326 22 18.8787 22 18.4713V5.52868C22 5.12126 21.5814 4.86742 21.2481 5.0727L13 10.1524V13.8476Z" style="fill: var(--automation-device-tertiary-inverted-color)"/>
<path d="M10 13.289L3 17.6001V12V6.39991L10 10.711V13.289Z" style="fill: var(--automation-device-tertiary-color)"/>
<path d="M21 6.39991V17.6001L14 13.289V10.711L21 6.39991Z" style="fill: var(--automation-device-tertiary-color)"/>
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
    'obi-09-twoway-digital-closed': Obi09TwowayDigitalClosed;
  }
}