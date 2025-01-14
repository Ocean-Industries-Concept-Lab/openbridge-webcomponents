import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-capacitor-02-on')
export class ObiCapacitor02On extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M2.75 1V2.75L1 2.75V4.25H2.75V6H4.25V4.25H6V2.75L4.25 2.75V1H2.75Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M11 6C11 4.89543 10.1046 4 9 4C7.89543 4 7 4.89543 7 6V18C7 19.1046 7.89543 20 9 20C10.1046 20 11 19.1046 11 18L11 6ZM10 18L10 6C10 5.44771 9.55228 5 9 5C8.44772 5 8 5.44771 8 6L8 18C8 18.5523 8.44771 19 9 19C9.55228 19 10 18.5523 10 18Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M17 6C17 4.89543 16.1046 4 15 4C13.8954 4 13 4.89543 13 6V18C13 19.1046 13.8954 20 15 20C16.1046 20 17 19.1046 17 18L17 6ZM16 18L16 6C16 5.44771 15.5523 5 15 5C14.4477 5 14 5.44771 14 6V18C14 18.5523 14.4477 19 15 19C15.5523 19 16 18.5523 16 18Z" fill="currentColor"/>
<path d="M10 6L10 18C10 18.5523 9.55228 19 9 19C8.44772 19 8 18.5523 8 18V6C8 5.44772 8.44772 5 9 5C9.55228 5 10 5.44772 10 6Z" fill="currentColor"/>
<path d="M16 6L16 18C16 18.5523 15.5523 19 15 19C14.4477 19 14 18.5523 14 18L14 6C14 5.44772 14.4477 5 15 5C15.5523 5 16 5.44772 16 6Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M2.75 1V2.75L1 2.75V4.25H2.75V6H4.25V4.25H6V2.75L4.25 2.75V1H2.75Z" style="fill: var(--automation-device-tertiary-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M11 6C11 4.89543 10.1046 4 9 4C7.89543 4 7 4.89543 7 6V18C7 19.1046 7.89543 20 9 20C10.1046 20 11 19.1046 11 18L11 6ZM10 18L10 6C10 5.44771 9.55228 5 9 5C8.44772 5 8 5.44771 8 6L8 18C8 18.5523 8.44771 19 9 19C9.55228 19 10 18.5523 10 18Z" style="fill: var(--automation-device-tertiary-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M17 6C17 4.89543 16.1046 4 15 4C13.8954 4 13 4.89543 13 6V18C13 19.1046 13.8954 20 15 20C16.1046 20 17 19.1046 17 18L17 6ZM16 18L16 6C16 5.44771 15.5523 5 15 5C14.4477 5 14 5.44771 14 6V18C14 18.5523 14.4477 19 15 19C15.5523 19 16 18.5523 16 18Z" style="fill: var(--automation-device-tertiary-color)"/>
<path d="M10 6L10 18C10 18.5523 9.55228 19 9 19C8.44772 19 8 18.5523 8 18V6C8 5.44772 8.44772 5 9 5C9.55228 5 10 5.44772 10 6Z" style="fill: var(--automation-device-primary-color)"/>
<path d="M16 6L16 18C16 18.5523 15.5523 19 15 19C14.4477 19 14 18.5523 14 18L14 6C14 5.44772 14.4477 5 15 5C15.5523 5 16 5.44772 16 6Z" style="fill: var(--automation-device-primary-color)"/>
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
    'obi-capacitor-02-on': ObiCapacitor02On;
  }
}