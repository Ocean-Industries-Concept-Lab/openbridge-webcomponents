import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-push-button-off')
export class ObiPushButtonOff extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M18 5C18 5.55229 17.5523 6 17 6L7 6C6.44771 6 6 5.55228 6 5C6 4.44771 6.44771 4 7 4H17C17.5523 4 18 4.44772 18 5ZM1 12.0001C1 10.8955 1.89543 10.0001 3 10.0001C4.10457 10.0001 5 10.8955 5 12.0001C5 13.1046 4.10457 14.0001 3 14.0001C1.89543 14.0001 1 13.1046 1 12.0001ZM21 10C19.8954 10 19 10.8954 19 12C19 13.1046 19.8954 14 21 14C22.1046 14 23 13.1046 23 12C23 10.8954 22.1046 10 21 10Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M17 7C18.1046 7 19 6.10457 19 5C19 3.89543 18.1046 3 17 3H7C5.89543 3 5 3.89543 5 5C5 6.10457 5.89543 7 7 7L11 7V18H3C2.44772 18 2 18.4477 2 19V21C2 21.5523 2.44771 22 3 22H21C21.5523 22 22 21.5523 22 21V19C22 18.4477 21.5523 18 21 18H13V7L17 7ZM17 6C17.5523 6 18 5.55229 18 5C18 4.44772 17.5523 4 17 4H7C6.44771 4 6 4.44771 6 5C6 5.55228 6.44771 6 7 6L17 6Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M3 9.00006C1.34315 9.00006 0 10.3432 0 12.0001C0 13.6569 1.34315 15.0001 3 15.0001C4.65685 15.0001 6 13.6569 6 12.0001C6 10.3432 4.65685 9.00006 3 9.00006ZM1 12.0001C1 10.8955 1.89543 10.0001 3 10.0001C4.10457 10.0001 5 10.8955 5 12.0001C5 13.1046 4.10457 14.0001 3 14.0001C1.89543 14.0001 1 13.1046 1 12.0001Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M18 12C18 10.3431 19.3431 9 21 9C22.6569 9 24 10.3431 24 12C24 13.6569 22.6569 15 21 15C19.3431 15 18 13.6569 18 12ZM19 12C19 10.8954 19.8954 10 21 10C22.1046 10 23 10.8954 23 12C23 13.1046 22.1046 14 21 14C19.8954 14 19 13.1046 19 12Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M18 5C18 5.55229 17.5523 6 17 6L7 6C6.44771 6 6 5.55228 6 5C6 4.44771 6.44771 4 7 4H17C17.5523 4 18 4.44772 18 5ZM1 12.0001C1 10.8955 1.89543 10.0001 3 10.0001C4.10457 10.0001 5 10.8955 5 12.0001C5 13.1046 4.10457 14.0001 3 14.0001C1.89543 14.0001 1 13.1046 1 12.0001ZM21 10C19.8954 10 19 10.8954 19 12C19 13.1046 19.8954 14 21 14C22.1046 14 23 13.1046 23 12C23 10.8954 22.1046 10 21 10Z" style="fill: var(--automation-device-primary-inverted-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M17 7C18.1046 7 19 6.10457 19 5C19 3.89543 18.1046 3 17 3H7C5.89543 3 5 3.89543 5 5C5 6.10457 5.89543 7 7 7L11 7V18H3C2.44772 18 2 18.4477 2 19V21C2 21.5523 2.44771 22 3 22H21C21.5523 22 22 21.5523 22 21V19C22 18.4477 21.5523 18 21 18H13V7L17 7ZM17 6C17.5523 6 18 5.55229 18 5C18 4.44772 17.5523 4 17 4H7C6.44771 4 6 4.44771 6 5C6 5.55228 6.44771 6 7 6L17 6Z" style="fill: var(--automation-device-tertiary-inverted-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M3 9.00006C1.34315 9.00006 0 10.3432 0 12.0001C0 13.6569 1.34315 15.0001 3 15.0001C4.65685 15.0001 6 13.6569 6 12.0001C6 10.3432 4.65685 9.00006 3 9.00006ZM1 12.0001C1 10.8955 1.89543 10.0001 3 10.0001C4.10457 10.0001 5 10.8955 5 12.0001C5 13.1046 4.10457 14.0001 3 14.0001C1.89543 14.0001 1 13.1046 1 12.0001Z" style="fill: var(--automation-device-tertiary-inverted-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M18 12C18 10.3431 19.3431 9 21 9C22.6569 9 24 10.3431 24 12C24 13.6569 22.6569 15 21 15C19.3431 15 18 13.6569 18 12ZM19 12C19 10.8954 19.8954 10 21 10C22.1046 10 23 10.8954 23 12C23 13.1046 22.1046 14 21 14C19.8954 14 19 13.1046 19 12Z" style="fill: var(--automation-device-tertiary-inverted-color)"/>
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
    'obi-push-button-off': ObiPushButtonOff;
  }
}
