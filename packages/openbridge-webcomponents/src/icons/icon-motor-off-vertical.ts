import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-motor-off-vertical')
export class ObiMotorOffVertical extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M6 15C6 16.1046 6.89543 17 8 17L8 18C8 19.1046 8.89543 20 10 20H11V22C11 22.5523 11.4477 23 12 23C12.5523 23 13 22.5523 13 22V20H14C15.1046 20 16 19.1046 16 18V17C17.1046 17 18 16.1046 18 15V7.5C18 6.39543 17.1046 5.5 16 5.5V4C16 2.89543 15.1046 2 14 2H10C8.89543 2 8 2.89543 8 4V5.5C6.89543 5.5 6 6.39543 6 7.5V15ZM14 19C14.5523 19 15 18.5523 15 18V17H9L9 18C9 18.5523 9.44772 19 10 19H14ZM7 7.5V15C7 15.5523 7.44772 16 8 16H16C16.5523 16 17 15.5523 17 15V7.5C17 6.94771 16.5523 6.5 16 6.5L8 6.5C7.44771 6.5 7 6.94772 7 7.5ZM9 4V5.5L15 5.5V4C15 3.44772 14.5523 3 14 3L10 3C9.44772 3 9 3.44772 9 4Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M2 9C2 8.17157 2.67157 7.5 3.5 7.5C4.32843 7.5 5 8.17157 5 9L5 14C5 14.8284 4.32843 15.5 3.5 15.5C2.67157 15.5 2 14.8284 2 14V9ZM3 14L3 9C3 8.72386 3.22386 8.5 3.5 8.5C3.77614 8.5 4 8.72386 4 9L4 14C4 14.2761 3.77614 14.5 3.5 14.5C3.22386 14.5 3 14.2761 3 14Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M20.5 7.5C19.6716 7.5 19 8.17157 19 9V14C19 14.8284 19.6716 15.5 20.5 15.5C21.3284 15.5 22 14.8284 22 14V9C22 8.17157 21.3284 7.5 20.5 7.5ZM20 9V14C20 14.2761 20.2239 14.5 20.5 14.5C20.7761 14.5 21 14.2761 21 14V9C21 8.72386 20.7761 8.5 20.5 8.5C20.2239 8.5 20 8.72386 20 9Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M14 19C14.5523 19 15 18.5523 15 18V17H9L9 18C9 18.5523 9.44772 19 10 19H14ZM7 7.5V15C7 15.5523 7.44772 16 8 16H16C16.5523 16 17 15.5523 17 15V7.5C17 6.94771 16.5523 6.5 16 6.5L8 6.5C7.44771 6.5 7 6.94772 7 7.5ZM9 4V5.5L15 5.5V4C15 3.44772 14.5523 3 14 3L10 3C9.44772 3 9 3.44772 9 4Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M3 14L3 9C3 8.72386 3.22386 8.5 3.5 8.5C3.77614 8.5 4 8.72386 4 9L4 14C4 14.2761 3.77614 14.5 3.5 14.5C3.22386 14.5 3 14.2761 3 14Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M20 9V14C20 14.2761 20.2239 14.5 20.5 14.5C20.7761 14.5 21 14.2761 21 14V9C21 8.72386 20.7761 8.5 20.5 8.5C20.2239 8.5 20 8.72386 20 9Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M6 15C6 16.1046 6.89543 17 8 17L8 18C8 19.1046 8.89543 20 10 20H11V22C11 22.5523 11.4477 23 12 23C12.5523 23 13 22.5523 13 22V20H14C15.1046 20 16 19.1046 16 18V17C17.1046 17 18 16.1046 18 15V7.5C18 6.39543 17.1046 5.5 16 5.5V4C16 2.89543 15.1046 2 14 2H10C8.89543 2 8 2.89543 8 4V5.5C6.89543 5.5 6 6.39543 6 7.5V15ZM14 19C14.5523 19 15 18.5523 15 18V17H9L9 18C9 18.5523 9.44772 19 10 19H14ZM7 7.5V15C7 15.5523 7.44772 16 8 16H16C16.5523 16 17 15.5523 17 15V7.5C17 6.94771 16.5523 6.5 16 6.5L8 6.5C7.44771 6.5 7 6.94772 7 7.5ZM9 4V5.5L15 5.5V4C15 3.44772 14.5523 3 14 3L10 3C9.44772 3 9 3.44772 9 4Z" style="fill: var(--automation-device-tertiary-inverted-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M2 9C2 8.17157 2.67157 7.5 3.5 7.5C4.32843 7.5 5 8.17157 5 9L5 14C5 14.8284 4.32843 15.5 3.5 15.5C2.67157 15.5 2 14.8284 2 14V9ZM3 14L3 9C3 8.72386 3.22386 8.5 3.5 8.5C3.77614 8.5 4 8.72386 4 9L4 14C4 14.2761 3.77614 14.5 3.5 14.5C3.22386 14.5 3 14.2761 3 14Z" style="fill: var(--automation-device-tertiary-inverted-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M20.5 7.5C19.6716 7.5 19 8.17157 19 9V14C19 14.8284 19.6716 15.5 20.5 15.5C21.3284 15.5 22 14.8284 22 14V9C22 8.17157 21.3284 7.5 20.5 7.5ZM20 9V14C20 14.2761 20.2239 14.5 20.5 14.5C20.7761 14.5 21 14.2761 21 14V9C21 8.72386 20.7761 8.5 20.5 8.5C20.2239 8.5 20 8.72386 20 9Z" style="fill: var(--automation-device-tertiary-inverted-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M14 19C14.5523 19 15 18.5523 15 18V17H9L9 18C9 18.5523 9.44772 19 10 19H14ZM7 7.5V15C7 15.5523 7.44772 16 8 16H16C16.5523 16 17 15.5523 17 15V7.5C17 6.94771 16.5523 6.5 16 6.5L8 6.5C7.44771 6.5 7 6.94772 7 7.5ZM9 4V5.5L15 5.5V4C15 3.44772 14.5523 3 14 3L10 3C9.44772 3 9 3.44772 9 4Z" style="fill: var(--automation-device-primary-inverted-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M3 14L3 9C3 8.72386 3.22386 8.5 3.5 8.5C3.77614 8.5 4 8.72386 4 9L4 14C4 14.2761 3.77614 14.5 3.5 14.5C3.22386 14.5 3 14.2761 3 14Z" style="fill: var(--automation-device-primary-inverted-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M20 9V14C20 14.2761 20.2239 14.5 20.5 14.5C20.7761 14.5 21 14.2761 21 14V9C21 8.72386 20.7761 8.5 20.5 8.5C20.2239 8.5 20 8.72386 20 9Z" style="fill: var(--automation-device-primary-inverted-color)"/>
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
    'obi-motor-off-vertical': ObiMotorOffVertical;
  }
}