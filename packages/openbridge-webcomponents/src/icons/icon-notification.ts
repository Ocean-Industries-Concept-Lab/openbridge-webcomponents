import {LitElement, html, css, svg} from 'lit';
import {property} from 'lit/decorators.js';
import {customElement} from '../decorator.js';

@customElement('obi-notification')
export class ObiNotification extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M18.8 3C19.9201 3 20.4802 3 20.908 3.21799C21.2843 3.40973 21.5903 3.71569 21.782 4.09202C22 4.51984 22 5.0799 22 6.2V14.8C22 15.9201 22 16.4802 21.782 16.908C21.5903 17.2843 21.2843 17.5903 20.908 17.782C20.4802 18 19.9201 18 18.8 18H16L12 22L8 18H5.2C4.0799 18 3.51984 18 3.09202 17.782C2.71569 17.5903 2.40973 17.2843 2.21799 16.908C2 16.4802 2 15.9201 2 14.8L2 6.2C2 5.0799 2 4.51984 2.21799 4.09202C2.40973 3.71569 2.71569 3.40973 3.09202 3.21799C3.51984 3 4.07989 3 5.2 3H18.8ZM4 16H8.82812L12 19.1719L15.1719 16H20V5H4V16Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M18.8 3C19.9201 3 20.4802 3 20.908 3.21799C21.2843 3.40973 21.5903 3.71569 21.782 4.09202C22 4.51984 22 5.0799 22 6.2V14.8C22 15.9201 22 16.4802 21.782 16.908C21.5903 17.2843 21.2843 17.5903 20.908 17.782C20.4802 18 19.9201 18 18.8 18H16L12 22L8 18H5.2C4.0799 18 3.51984 18 3.09202 17.782C2.71569 17.5903 2.40973 17.2843 2.21799 16.908C2 16.4802 2 15.9201 2 14.8L2 6.2C2 5.0799 2 4.51984 2.21799 4.09202C2.40973 3.71569 2.71569 3.40973 3.09202 3.21799C3.51984 3 4.07989 3 5.2 3H18.8ZM4 16H8.82812L12 19.1719L15.1719 16H20V5H4V16Z" style="fill: var(--element-active-color)"/>
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
    'obi-notification': ObiNotification;
  }
}
