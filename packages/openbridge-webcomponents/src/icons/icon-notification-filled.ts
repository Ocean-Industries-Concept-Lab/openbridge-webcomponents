import {LitElement, html, css, svg} from 'lit';
import {property} from 'lit/decorators.js';
import {customElement} from '../decorator.js';

@customElement('obi-notification-filled')
export class ObiNotificationFilled extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M8 17H6.2C5.0799 17 4.51984 17 4.09202 16.782C3.71569 16.5903 3.40973 16.2843 3.21799 15.908C3 15.4802 3 14.9201 3 13.8L3 6.2C3 5.0799 3 4.51984 3.21799 4.09202C3.40973 3.71569 3.71569 3.40973 4.09202 3.21799C4.51984 3 5.0799 3 6.2 3H17.8C18.9201 3 19.4802 3 19.908 3.21799C20.2843 3.40973 20.5903 3.71569 20.782 4.09202C21 4.51984 21 5.0799 21 6.2V13.8C21 14.9201 21 15.4802 20.782 15.908C20.5903 16.2843 20.2843 16.5903 19.908 16.782C19.4802 17 18.9201 17 17.8 17H16L12 21L8 17Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M8 17H6.2C5.0799 17 4.51984 17 4.09202 16.782C3.71569 16.5903 3.40973 16.2843 3.21799 15.908C3 15.4802 3 14.9201 3 13.8L3 6.2C3 5.0799 3 4.51984 3.21799 4.09202C3.40973 3.71569 3.71569 3.40973 4.09202 3.21799C4.51984 3 5.0799 3 6.2 3H17.8C18.9201 3 19.4802 3 19.908 3.21799C20.2843 3.40973 20.5903 3.71569 20.782 4.09202C21 4.51984 21 5.0799 21 6.2V13.8C21 14.9201 21 15.4802 20.782 15.908C20.5903 16.2843 20.2843 16.5903 19.908 16.782C19.4802 17 18.9201 17 17.8 17H16L12 21L8 17Z" style="fill: var(--element-active-color)"/>
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
    'obi-notification-filled': ObiNotificationFilled;
  }
}
