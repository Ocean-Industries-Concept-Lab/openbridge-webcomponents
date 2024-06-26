import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-08-motor-on-vertical')
export class Obi08MotorOnVertical extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M21.5 6C20.6716 6 20 6.67157 20 7.5V15.5C20 16.3284 20.6716 17 21.5 17C22.3284 17 23 16.3284 23 15.5V7.5C23 6.67157 22.3284 6 21.5 6Z" fill="currentColor"/>
<path d="M2.5 6C1.67157 6 1 6.67157 1 7.5L1 15.5C1 16.3284 1.67157 17 2.5 17C3.32843 17 4 16.3284 4 15.5L4 7.5C4 6.67157 3.32843 6 2.5 6Z" fill="currentColor"/>
<path d="M7 17.5C5.89543 17.5 5 16.6046 5 15.5L5 7.5C5 6.39543 5.89543 5.5 7 5.5V2.5C7 1.39543 7.89543 0.5 9 0.5L15 0.5C16.1046 0.5 17 1.39543 17 2.5V5.5C18.1046 5.5 19 6.39543 19 7.5V15.5C19 16.6046 18.1046 17.5 17 17.5V18.5C17 19.6046 16.1046 20.5 15 20.5C15 22.1569 13.6569 23.5 12 23.5C10.3431 23.5 9 22.1569 9 20.5C7.89543 20.5 7 19.6046 7 18.5L7 17.5Z" fill="currentColor"/>
<path d="M6 7.5V15.5C6 16.0523 6.44772 16.5 7 16.5H17C17.5523 16.5 18 16.0523 18 15.5V7.5C18 6.94771 17.5523 6.5 17 6.5L7 6.5C6.44771 6.5 6 6.94772 6 7.5Z" fill="currentColor"/>
<path d="M12 22.5C10.8954 22.5 10 21.6046 10 20.5H14C14 21.6046 13.1046 22.5 12 22.5Z" fill="currentColor"/>
<path d="M8 18.5L8 17.5H16V18.5C16 19.0523 15.5523 19.5 15 19.5H9C8.44772 19.5 8 19.0523 8 18.5Z" fill="currentColor"/>
<path d="M8 2.5V5.5L16 5.5V2.5C16 1.94772 15.5523 1.5 15 1.5L9 1.5C8.44771 1.5 8 1.94772 8 2.5Z" fill="currentColor"/>
<path d="M21 15.5V7.5C21 7.22386 21.2239 7 21.5 7C21.7761 7 22 7.22386 22 7.5V15.5C22 15.7761 21.7761 16 21.5 16C21.2239 16 21 15.7761 21 15.5Z" fill="currentColor"/>
<path d="M2 15.5L2 7.5C2 7.22386 2.22386 7 2.5 7C2.77614 7 3 7.22386 3 7.5L3 15.5C3 15.7761 2.77614 16 2.5 16C2.22386 16 2 15.7761 2 15.5Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M21.5 6C20.6716 6 20 6.67157 20 7.5V15.5C20 16.3284 20.6716 17 21.5 17C22.3284 17 23 16.3284 23 15.5V7.5C23 6.67157 22.3284 6 21.5 6Z" style="fill: var(--automation-device-tertiary-color)"/>
<path d="M2.5 6C1.67157 6 1 6.67157 1 7.5L1 15.5C1 16.3284 1.67157 17 2.5 17C3.32843 17 4 16.3284 4 15.5L4 7.5C4 6.67157 3.32843 6 2.5 6Z" style="fill: var(--automation-device-tertiary-color)"/>
<path d="M7 17.5C5.89543 17.5 5 16.6046 5 15.5L5 7.5C5 6.39543 5.89543 5.5 7 5.5V2.5C7 1.39543 7.89543 0.5 9 0.5L15 0.5C16.1046 0.5 17 1.39543 17 2.5V5.5C18.1046 5.5 19 6.39543 19 7.5V15.5C19 16.6046 18.1046 17.5 17 17.5V18.5C17 19.6046 16.1046 20.5 15 20.5C15 22.1569 13.6569 23.5 12 23.5C10.3431 23.5 9 22.1569 9 20.5C7.89543 20.5 7 19.6046 7 18.5L7 17.5Z" style="fill: var(--automation-device-tertiary-color)"/>
<path d="M6 7.5V15.5C6 16.0523 6.44772 16.5 7 16.5H17C17.5523 16.5 18 16.0523 18 15.5V7.5C18 6.94771 17.5523 6.5 17 6.5L7 6.5C6.44771 6.5 6 6.94772 6 7.5Z" style="fill: var(--automation-device-primary-color)"/>
<path d="M12 22.5C10.8954 22.5 10 21.6046 10 20.5H14C14 21.6046 13.1046 22.5 12 22.5Z" style="fill: var(--automation-device-primary-color)"/>
<path d="M8 18.5L8 17.5H16V18.5C16 19.0523 15.5523 19.5 15 19.5H9C8.44772 19.5 8 19.0523 8 18.5Z" style="fill: var(--automation-device-primary-color)"/>
<path d="M8 2.5V5.5L16 5.5V2.5C16 1.94772 15.5523 1.5 15 1.5L9 1.5C8.44771 1.5 8 1.94772 8 2.5Z" style="fill: var(--automation-device-primary-color)"/>
<path d="M21 15.5V7.5C21 7.22386 21.2239 7 21.5 7C21.7761 7 22 7.22386 22 7.5V15.5C22 15.7761 21.7761 16 21.5 16C21.2239 16 21 15.7761 21 15.5Z" style="fill: var(--automation-device-primary-color)"/>
<path d="M2 15.5L2 7.5C2 7.22386 2.22386 7 2.5 7C2.77614 7 3 7.22386 3 7.5L3 15.5C3 15.7761 2.77614 16 2.5 16C2.22386 16 2 15.7761 2 15.5Z" style="fill: var(--automation-device-primary-color)"/>
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
    'obi-08-motor-on-vertical': Obi08MotorOnVertical;
  }
}
