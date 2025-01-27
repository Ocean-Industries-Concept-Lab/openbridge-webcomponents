import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-buoy-conical-north')
export class ObiBuoyConicalNorth extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M6.67286 18.5H5V20H9C9 21.6569 10.3431 23 12 23C13.6569 23 15 21.6569 15 20H19V18.5H17.2639C17.118 17.809 16.882 16.8368 16.5 15.4999C15.6505 12.5265 14 9.99988 14 9.99988C14 9.99988 10.5455 10.9315 8.5 13.9999C7.38432 15.6735 6.89099 17.3472 6.67286 18.5ZM14.5986 18.4999H15.7288C15.5883 17.8728 15.3765 17.0277 15.0577 15.9119C14.6697 14.5537 14.091 13.2752 13.599 12.3238C13.512 12.1556 13.4283 11.9986 13.3495 11.8544C13.162 11.9416 12.957 12.044 12.7407 12.1632C11.7553 12.7058 10.5958 13.5603 9.7481 14.8319C8.87506 16.1415 8.43486 17.4579 8.21432 18.4503L8.20342 18.4999H9.40142C9.92015 17.6032 10.8896 17 12 17C13.1104 17 14.0799 17.6032 14.5986 18.4999ZM13.5 20C13.5 20.8284 12.8284 21.5 12 21.5C11.1716 21.5 10.5 20.8284 10.5 20C10.5 19.1716 11.1716 18.5 12 18.5C12.8284 18.5 13.5 19.1716 13.5 20Z" fill="currentColor"/>
<path d="M18 4H14L17 1L18 4Z" fill="currentColor"/>
<path d="M13 8H17L16 5L13 8Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M6.67286 18.5H5V20H9C9 21.6569 10.3431 23 12 23C13.6569 23 15 21.6569 15 20H19V18.5H17.2639C17.118 17.809 16.882 16.8368 16.5 15.4999C15.6505 12.5265 14 9.99988 14 9.99988C14 9.99988 10.5455 10.9315 8.5 13.9999C7.38432 15.6735 6.89099 17.3472 6.67286 18.5ZM14.5986 18.4999H15.7288C15.5883 17.8728 15.3765 17.0277 15.0577 15.9119C14.6697 14.5537 14.091 13.2752 13.599 12.3238C13.512 12.1556 13.4283 11.9986 13.3495 11.8544C13.162 11.9416 12.957 12.044 12.7407 12.1632C11.7553 12.7058 10.5958 13.5603 9.7481 14.8319C8.87506 16.1415 8.43486 17.4579 8.21432 18.4503L8.20342 18.4999H9.40142C9.92015 17.6032 10.8896 17 12 17C13.1104 17 14.0799 17.6032 14.5986 18.4999ZM13.5 20C13.5 20.8284 12.8284 21.5 12 21.5C11.1716 21.5 10.5 20.8284 10.5 20C10.5 19.1716 11.1716 18.5 12 18.5C12.8284 18.5 13.5 19.1716 13.5 20Z" style="fill: var(--element-active-color)"/>
<path d="M18 4H14L17 1L18 4Z" style="fill: var(--element-active-color)"/>
<path d="M13 8H17L16 5L13 8Z" style="fill: var(--element-active-color)"/>
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
    'obi-buoy-conical-north': ObiBuoyConicalNorth;
  }
}
