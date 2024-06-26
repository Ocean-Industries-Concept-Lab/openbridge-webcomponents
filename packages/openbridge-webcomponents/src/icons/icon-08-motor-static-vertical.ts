import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-08-motor-static-vertical')
export class Obi08MotorStaticVertical extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M21.5 6.5C20.6716 6.5 20 7.17157 20 8V16C20 16.8284 20.6716 17.5 21.5 17.5C22.3284 17.5 23 16.8284 23 16V8C23 7.17157 22.3284 6.5 21.5 6.5Z" fill="currentColor"/>
<path d="M2.5 6.5C1.67157 6.5 1 7.17157 1 8L1 16C1 16.8284 1.67157 17.5 2.5 17.5C3.32843 17.5 4 16.8284 4 16L4 8C4 7.17157 3.32843 6.5 2.5 6.5Z" fill="currentColor"/>
<path d="M7 18C5.89543 18 5 17.1046 5 16L5 8C5 6.89543 5.89543 6 7 6V3C7 1.89543 7.89543 1 9 1L15 1C16.1046 1 17 1.89543 17 3V6C18.1046 6 19 6.89543 19 8V16C19 17.1046 18.1046 18 17 18V19C17 20.1046 16.1046 21 15 21C15 22.6569 13.6569 24 12 24C10.3431 24 9 22.6569 9 21C7.89543 21 7 20.1046 7 19L7 18Z" fill="currentColor"/>
<path d="M6 8V16C6 16.5523 6.44772 17 7 17H17C17.5523 17 18 16.5523 18 16V8C18 7.44771 17.5523 7 17 7L7 7C6.44771 7 6 7.44772 6 8Z" fill="currentColor"/>
<path d="M12 23C10.8954 23 10 22.1046 10 21H14C14 22.1046 13.1046 23 12 23Z" fill="currentColor"/>
<path d="M8 19L8 18H16V19C16 19.5523 15.5523 20 15 20H9C8.44772 20 8 19.5523 8 19Z" fill="currentColor"/>
<path d="M8 3V6L16 6V3C16 2.44772 15.5523 2 15 2L9 2C8.44771 2 8 2.44772 8 3Z" fill="currentColor"/>
<path d="M21 16V8C21 7.72386 21.2239 7.5 21.5 7.5C21.7761 7.5 22 7.72386 22 8V16C22 16.2761 21.7761 16.5 21.5 16.5C21.2239 16.5 21 16.2761 21 16Z" fill="currentColor"/>
<path d="M2 16L2 8C2 7.72386 2.22386 7.5 2.5 7.5C2.77614 7.5 3 7.72386 3 8L3 16C3 16.2761 2.77614 16.5 2.5 16.5C2.22386 16.5 2 16.2761 2 16Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M21.5 6.5C20.6716 6.5 20 7.17157 20 8V16C20 16.8284 20.6716 17.5 21.5 17.5C22.3284 17.5 23 16.8284 23 16V8C23 7.17157 22.3284 6.5 21.5 6.5Z" style="fill: var(--automation-device-secondary-color)"/>
<path d="M2.5 6.5C1.67157 6.5 1 7.17157 1 8L1 16C1 16.8284 1.67157 17.5 2.5 17.5C3.32843 17.5 4 16.8284 4 16L4 8C4 7.17157 3.32843 6.5 2.5 6.5Z" style="fill: var(--automation-device-secondary-color)"/>
<path d="M7 18C5.89543 18 5 17.1046 5 16L5 8C5 6.89543 5.89543 6 7 6V3C7 1.89543 7.89543 1 9 1L15 1C16.1046 1 17 1.89543 17 3V6C18.1046 6 19 6.89543 19 8V16C19 17.1046 18.1046 18 17 18V19C17 20.1046 16.1046 21 15 21C15 22.6569 13.6569 24 12 24C10.3431 24 9 22.6569 9 21C7.89543 21 7 20.1046 7 19L7 18Z" style="fill: var(--automation-device-secondary-color)"/>
<path d="M6 8V16C6 16.5523 6.44772 17 7 17H17C17.5523 17 18 16.5523 18 16V8C18 7.44771 17.5523 7 17 7L7 7C6.44771 7 6 7.44772 6 8Z" style="fill: var(--automation-device-primary-color)"/>
<path d="M12 23C10.8954 23 10 22.1046 10 21H14C14 22.1046 13.1046 23 12 23Z" style="fill: var(--automation-device-primary-color)"/>
<path d="M8 19L8 18H16V19C16 19.5523 15.5523 20 15 20H9C8.44772 20 8 19.5523 8 19Z" style="fill: var(--automation-device-primary-color)"/>
<path d="M8 3V6L16 6V3C16 2.44772 15.5523 2 15 2L9 2C8.44771 2 8 2.44772 8 3Z" style="fill: var(--automation-device-primary-color)"/>
<path d="M21 16V8C21 7.72386 21.2239 7.5 21.5 7.5C21.7761 7.5 22 7.72386 22 8V16C22 16.2761 21.7761 16.5 21.5 16.5C21.2239 16.5 21 16.2761 21 16Z" style="fill: var(--automation-device-primary-color)"/>
<path d="M2 16L2 8C2 7.72386 2.22386 7.5 2.5 7.5C2.77614 7.5 3 7.72386 3 8L3 16C3 16.2761 2.77614 16.5 2.5 16.5C2.22386 16.5 2 16.2761 2 16Z" style="fill: var(--automation-device-primary-color)"/>
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
    'obi-08-motor-static-vertical': Obi08MotorStaticVertical;
  }
}
