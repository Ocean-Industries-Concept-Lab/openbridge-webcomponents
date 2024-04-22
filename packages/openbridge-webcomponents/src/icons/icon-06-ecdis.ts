import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-06-ecdis')
export class Obi06Ecdis extends LitElement {
  @property({type: Boolean, attribute: 'use-css-color'}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M8.36111 18.675L15.6667 21L21.2778 19.2C21.4815 19.1333 21.6528 19.0333 21.7917 18.9C21.9306 18.7667 22 18.6083 22 18.425V4.3C22 3.96667 21.8472 3.72083 21.5417 3.5625C21.2361 3.40417 20.9259 3.39167 20.6111 3.525L15.6667 5.3L8.36111 3L2.75 4.775C2.52778 4.85833 2.34722 4.98333 2.20833 5.15C2.06944 5.31667 2 5.50833 2 5.725V19.675C2 20.0083 2.15278 20.2583 2.45833 20.425C2.76389 20.5917 3.07407 20.6 3.38889 20.45L8.36111 18.675ZM20.3333 17.95L16.3889 19.125V14.3125L14.7222 16V19.125L8.36111 17.2077L3.66667 18.825V6.025L7.61111 4.85V8L9.27778 9V4.85L15.6667 6.72553L20.3333 5.15V17.95Z" fill="currentColor"/>
<path d="M9.07925 12.5861L9.06638 12.5819L5.8308 11.5001L5 13.9851L8.24097 15.0687L8.24841 15.0712L8.25585 15.0737C8.25853 15.0745 8.26119 15.0754 8.26385 15.0764C8.26777 15.0777 8.27169 15.0791 8.27565 15.0803C8.86531 15.2618 9.55572 14.9749 10.2239 14.3502C10.0658 13.4493 9.68673 12.8049 9.10645 12.5953C9.10372 12.5943 9.10096 12.5934 9.0982 12.5925L9.09208 12.5905L9.07925 12.5861Z" fill="currentColor"/>
<path d="M18.9999 9.5C18.9999 10.3284 18.3284 11 17.4999 11C16.6715 11 15.9999 10.3284 15.9999 9.5C15.9999 8.67157 16.6715 8 17.4999 8C18.3284 8 18.9999 8.67157 18.9999 9.5ZM17.0026 9.5C17.0026 9.77469 17.2253 9.99736 17.4999 9.99736C17.7746 9.99736 17.9973 9.77469 17.9973 9.5C17.9973 9.22531 17.7746 9.00264 17.4999 9.00264C17.2253 9.00264 17.0026 9.22531 17.0026 9.5Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M15.8007 11.3447L15.0948 11.8938L14.5169 11.1508L15.2229 10.6017L15.8007 11.3447ZM14.3888 12.4428L12.977 13.541L12.3991 12.798L13.811 11.6998L14.3888 12.4428ZM12.271 14.09L11.5651 14.6391L10.9872 13.8961L11.6931 13.347L12.271 14.09Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M8.36111 18.675L15.6667 21L21.2778 19.2C21.4815 19.1333 21.6528 19.0333 21.7917 18.9C21.9306 18.7667 22 18.6083 22 18.425V4.3C22 3.96667 21.8472 3.72083 21.5417 3.5625C21.2361 3.40417 20.9259 3.39167 20.6111 3.525L15.6667 5.3L8.36111 3L2.75 4.775C2.52778 4.85833 2.34722 4.98333 2.20833 5.15C2.06944 5.31667 2 5.50833 2 5.725V19.675C2 20.0083 2.15278 20.2583 2.45833 20.425C2.76389 20.5917 3.07407 20.6 3.38889 20.45L8.36111 18.675ZM20.3333 17.95L16.3889 19.125V14.3125L14.7222 16V19.125L8.36111 17.2077L3.66667 18.825V6.025L7.61111 4.85V8L9.27778 9V4.85L15.6667 6.72553L20.3333 5.15V17.95Z" style="fill: var(--element-active-color)"/>
<path d="M9.07925 12.5861L9.06638 12.5819L5.8308 11.5001L5 13.9851L8.24097 15.0687L8.24841 15.0712L8.25585 15.0737C8.25853 15.0745 8.26119 15.0754 8.26385 15.0764C8.26777 15.0777 8.27169 15.0791 8.27565 15.0803C8.86531 15.2618 9.55572 14.9749 10.2239 14.3502C10.0658 13.4493 9.68673 12.8049 9.10645 12.5953C9.10372 12.5943 9.10096 12.5934 9.0982 12.5925L9.09208 12.5905L9.07925 12.5861Z" style="fill: var(--element-active-color)"/>
<path d="M18.9999 9.5C18.9999 10.3284 18.3284 11 17.4999 11C16.6715 11 15.9999 10.3284 15.9999 9.5C15.9999 8.67157 16.6715 8 17.4999 8C18.3284 8 18.9999 8.67157 18.9999 9.5ZM17.0026 9.5C17.0026 9.77469 17.2253 9.99736 17.4999 9.99736C17.7746 9.99736 17.9973 9.77469 17.9973 9.5C17.9973 9.22531 17.7746 9.00264 17.4999 9.00264C17.2253 9.00264 17.0026 9.22531 17.0026 9.5Z" style="fill: var(--element-active-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M15.8007 11.3447L15.0948 11.8938L14.5169 11.1508L15.2229 10.6017L15.8007 11.3447ZM14.3888 12.4428L12.977 13.541L12.3991 12.798L13.811 11.6998L14.3888 12.4428ZM12.271 14.09L11.5651 14.6391L10.9872 13.8961L11.6931 13.347L12.271 14.09Z" style="fill: var(--element-active-color)"/>
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
    'obi-06-ecdis': Obi06Ecdis;
  }
}