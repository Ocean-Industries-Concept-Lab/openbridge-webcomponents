import {LitElement, html, css, svg} from 'lit';
import {property} from 'lit/decorators.js';
import {customElement} from '../decorator.js';

@customElement('obi-motor-off-vertical')
export class ObiMotorOffVertical extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M14 19C14.5523 19 15 18.5523 15 18V17H9L9 18C9 18.5523 9.44772 19 10 19H14ZM7 7.5V15C7 15.5523 7.44772 16 8 16H16C16.5523 16 17 15.5523 17 15V7.5C17 6.94771 16.5523 6.5 16 6.5L8 6.5C7.44771 6.5 7 6.94772 7 7.5ZM9 4V5.5L15 5.5V4C15 3.44772 14.5523 3 14 3L10 3C9.44772 3 9 3.44772 9 4Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M3 14L3 9C3 8.72386 3.22386 8.5 3.5 8.5C3.77614 8.5 4 8.72386 4 9L4 14C4 14.2761 3.77614 14.5 3.5 14.5C3.22386 14.5 3 14.2761 3 14Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M20 9V14C20 14.2761 20.2239 14.5 20.5 14.5C20.7761 14.5 21 14.2761 21 14V9C21 8.72386 20.7761 8.5 20.5 8.5C20.2239 8.5 20 8.72386 20 9Z" fill="currentColor"/>
<path d="M11 20H13V21C13 21.5523 12.5523 22 12 22C11.4477 22 11 21.5523 11 21V20Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M14 2C15.1046 2 16 2.89543 16 4V5.5C17.1046 5.5 18 6.39543 18 7.5V15C18 16.1046 17.1046 17 16 17V18C16 19.1046 15.1046 20 14 20V21C14 22.1046 13.1046 23 12 23C10.8954 23 10 22.1046 10 21V20C8.89543 20 8 19.1046 8 18V17C6.89543 17 6 16.1046 6 15V7.5C6 6.39543 6.89543 5.5 8 5.5V4C8 2.89543 8.89543 2 10 2H14ZM11 20V21C11 21.5523 11.4477 22 12 22C12.5523 22 13 21.5523 13 21V20H11ZM9 18C9 18.5523 9.44772 19 10 19H14C14.5523 19 15 18.5523 15 18V17H9V18ZM8 6.5C7.44772 6.5 7 6.94772 7 7.5V15C7 15.5523 7.44772 16 8 16H16C16.5523 16 17 15.5523 17 15V7.5C17 6.94771 16.5523 6.5 16 6.5H8ZM10 3C9.44772 3 9 3.44772 9 4V5.5H15V4C15 3.44772 14.5523 3 14 3H10Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M3.5 7.5C4.32843 7.5 5 8.17157 5 9V14C5 14.8284 4.32843 15.5 3.5 15.5C2.67157 15.5 2 14.8284 2 14V9C2 8.17157 2.67157 7.5 3.5 7.5ZM3.5 8.5C3.22386 8.5 3 8.72386 3 9V14C3 14.2761 3.22386 14.5 3.5 14.5C3.77614 14.5 4 14.2761 4 14V9C4 8.72386 3.77614 8.5 3.5 8.5Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M20.5 7.5C21.3284 7.5 22 8.17157 22 9V14C22 14.8284 21.3284 15.5 20.5 15.5C19.6716 15.5 19 14.8284 19 14V9C19 8.17157 19.6716 7.5 20.5 7.5ZM20.5 8.5C20.2239 8.5 20 8.72386 20 9V14C20 14.2761 20.2239 14.5 20.5 14.5C20.7761 14.5 21 14.2761 21 14V9C21 8.72386 20.7761 8.5 20.5 8.5Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M14 19C14.5523 19 15 18.5523 15 18V17H9L9 18C9 18.5523 9.44772 19 10 19H14ZM7 7.5V15C7 15.5523 7.44772 16 8 16H16C16.5523 16 17 15.5523 17 15V7.5C17 6.94771 16.5523 6.5 16 6.5L8 6.5C7.44771 6.5 7 6.94772 7 7.5ZM9 4V5.5L15 5.5V4C15 3.44772 14.5523 3 14 3L10 3C9.44772 3 9 3.44772 9 4Z" style="fill: var(--automation-device-primary-inverted-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M3 14L3 9C3 8.72386 3.22386 8.5 3.5 8.5C3.77614 8.5 4 8.72386 4 9L4 14C4 14.2761 3.77614 14.5 3.5 14.5C3.22386 14.5 3 14.2761 3 14Z" style="fill: var(--automation-device-primary-inverted-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M20 9V14C20 14.2761 20.2239 14.5 20.5 14.5C20.7761 14.5 21 14.2761 21 14V9C21 8.72386 20.7761 8.5 20.5 8.5C20.2239 8.5 20 8.72386 20 9Z" style="fill: var(--automation-device-primary-inverted-color)"/>
<path d="M11 20H13V21C13 21.5523 12.5523 22 12 22C11.4477 22 11 21.5523 11 21V20Z" style="fill: var(--automation-device-primary-inverted-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M14 2C15.1046 2 16 2.89543 16 4V5.5C17.1046 5.5 18 6.39543 18 7.5V15C18 16.1046 17.1046 17 16 17V18C16 19.1046 15.1046 20 14 20V21C14 22.1046 13.1046 23 12 23C10.8954 23 10 22.1046 10 21V20C8.89543 20 8 19.1046 8 18V17C6.89543 17 6 16.1046 6 15V7.5C6 6.39543 6.89543 5.5 8 5.5V4C8 2.89543 8.89543 2 10 2H14ZM11 20V21C11 21.5523 11.4477 22 12 22C12.5523 22 13 21.5523 13 21V20H11ZM9 18C9 18.5523 9.44772 19 10 19H14C14.5523 19 15 18.5523 15 18V17H9V18ZM8 6.5C7.44772 6.5 7 6.94772 7 7.5V15C7 15.5523 7.44772 16 8 16H16C16.5523 16 17 15.5523 17 15V7.5C17 6.94771 16.5523 6.5 16 6.5H8ZM10 3C9.44772 3 9 3.44772 9 4V5.5H15V4C15 3.44772 14.5523 3 14 3H10Z" style="fill: var(--automation-device-tertiary-inverted-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M3.5 7.5C4.32843 7.5 5 8.17157 5 9V14C5 14.8284 4.32843 15.5 3.5 15.5C2.67157 15.5 2 14.8284 2 14V9C2 8.17157 2.67157 7.5 3.5 7.5ZM3.5 8.5C3.22386 8.5 3 8.72386 3 9V14C3 14.2761 3.22386 14.5 3.5 14.5C3.77614 14.5 4 14.2761 4 14V9C4 8.72386 3.77614 8.5 3.5 8.5Z" style="fill: var(--automation-device-tertiary-inverted-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M20.5 7.5C21.3284 7.5 22 8.17157 22 9V14C22 14.8284 21.3284 15.5 20.5 15.5C19.6716 15.5 19 14.8284 19 14V9C19 8.17157 19.6716 7.5 20.5 7.5ZM20.5 8.5C20.2239 8.5 20 8.72386 20 9V14C20 14.2761 20.2239 14.5 20.5 14.5C20.7761 14.5 21 14.2761 21 14V9C21 8.72386 20.7761 8.5 20.5 8.5Z" style="fill: var(--automation-device-tertiary-inverted-color)"/>
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
    'obi-motor-off-vertical': ObiMotorOffVertical;
  }
}
