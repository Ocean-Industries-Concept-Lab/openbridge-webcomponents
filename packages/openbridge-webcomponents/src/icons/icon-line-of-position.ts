import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-line-of-position')
export class ObiLineOfPosition extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M14.4906 7.37622L17.1631 2.29859L15.8357 1.59998L13.1761 6.65319C12.2025 6.23158 11.1285 5.99791 10 5.99791C5.58172 5.99791 2 9.57963 2 13.9979C2 18.4162 5.58172 21.9979 10 21.9979C14.1654 21.9979 17.5872 18.8145 17.9653 14.7479L23 14.7479V13.2479L17.9653 13.2479C17.7383 10.8064 16.4141 8.68323 14.4906 7.37622ZM12.4748 7.98564C11.712 7.6713 10.8763 7.49791 10 7.49791C6.66381 7.49791 3.91465 10.0113 3.5428 13.2479H7.09451C7.42755 11.954 8.60212 10.9979 10 10.9979C10.2874 10.9979 10.5653 11.0383 10.8284 11.1138L12.4748 7.98564ZM12.1218 11.8771L13.7865 8.71409C15.2382 9.75626 16.2428 11.3819 16.4572 13.2479H12.9055C12.7699 12.721 12.4947 12.2502 12.1218 11.8771ZM8.09197 16.3131C7.61038 15.9157 7.25488 15.371 7.09451 14.7479H3.5428C3.76844 16.7119 4.86941 18.4095 6.44571 19.441L8.09197 16.3131ZM7.78774 20.1117L9.4528 16.9481C9.63023 16.9808 9.81312 16.9979 10 16.9979C11.3979 16.9979 12.5725 16.0418 12.9055 14.7479H16.4572C16.0853 17.9845 13.3362 20.4979 10 20.4979C9.22322 20.4979 8.47827 20.3617 7.78774 20.1117Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M14.4906 7.37622L17.1631 2.29859L15.8357 1.59998L13.1761 6.65319C12.2025 6.23158 11.1285 5.99791 10 5.99791C5.58172 5.99791 2 9.57963 2 13.9979C2 18.4162 5.58172 21.9979 10 21.9979C14.1654 21.9979 17.5872 18.8145 17.9653 14.7479L23 14.7479V13.2479L17.9653 13.2479C17.7383 10.8064 16.4141 8.68323 14.4906 7.37622ZM12.4748 7.98564C11.712 7.6713 10.8763 7.49791 10 7.49791C6.66381 7.49791 3.91465 10.0113 3.5428 13.2479H7.09451C7.42755 11.954 8.60212 10.9979 10 10.9979C10.2874 10.9979 10.5653 11.0383 10.8284 11.1138L12.4748 7.98564ZM12.1218 11.8771L13.7865 8.71409C15.2382 9.75626 16.2428 11.3819 16.4572 13.2479H12.9055C12.7699 12.721 12.4947 12.2502 12.1218 11.8771ZM8.09197 16.3131C7.61038 15.9157 7.25488 15.371 7.09451 14.7479H3.5428C3.76844 16.7119 4.86941 18.4095 6.44571 19.441L8.09197 16.3131ZM7.78774 20.1117L9.4528 16.9481C9.63023 16.9808 9.81312 16.9979 10 16.9979C11.3979 16.9979 12.5725 16.0418 12.9055 14.7479H16.4572C16.0853 17.9845 13.3362 20.4979 10 20.4979C9.22322 20.4979 8.47827 20.3617 7.78774 20.1117Z" style="fill: var(--element-active-color)"/>
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
    'obi-line-of-position': ObiLineOfPosition;
  }
}
