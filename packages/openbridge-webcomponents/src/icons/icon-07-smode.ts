import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-07-smode')
export class Obi07Smode extends LitElement {
  @property({type: Boolean, attribute: 'use-css-color'}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M8 14V16H4.22222V17H8V19H9L9 5H8V7H4.22222V8H8V10H4.22222V11H8V13H4.22222V14H8Z" fill="currentColor"/>
<path d="M9 5H19.7778V3H4.22222V5H8H9Z" fill="currentColor"/>
<path d="M4.22222 16V14V13V11V10V8V7V5V3C3 3 2 3.9 2 5V19C2 20.1 3 21 4.22222 21V19V17V16Z" fill="currentColor"/>
<path d="M19.7778 19H9H8H4.22222V21H19.7778V19Z" fill="currentColor"/>
<path d="M19.7778 5V19V21C21 21 22 20.1 22 19V5C22 3.9 21 3 19.7778 3V5Z" fill="currentColor"/>
<path d="M17.3301 13.6211C17.3301 14.3945 17.0508 15.0039 16.4922 15.4492C15.9375 15.8945 15.1641 16.1172 14.1719 16.1172C13.2578 16.1172 12.4492 15.9453 11.7461 15.6016V13.9141C12.3242 14.1719 12.8125 14.3535 13.2109 14.459C13.6133 14.5645 13.9805 14.6172 14.3125 14.6172C14.7109 14.6172 15.0156 14.541 15.2266 14.3887C15.4414 14.2363 15.5488 14.0098 15.5488 13.709C15.5488 13.541 15.502 13.3926 15.4082 13.2637C15.3145 13.1309 15.1758 13.0039 14.9922 12.8828C14.8125 12.7617 14.4434 12.5684 13.8848 12.3027C13.3613 12.0566 12.9688 11.8203 12.707 11.5938C12.4453 11.3672 12.2363 11.1035 12.0801 10.8027C11.9238 10.502 11.8457 10.1504 11.8457 9.74805C11.8457 8.99023 12.1016 8.39453 12.6133 7.96094C13.1289 7.52734 13.8398 7.31055 14.7461 7.31055C15.1914 7.31055 15.6152 7.36328 16.0176 7.46875C16.4238 7.57422 16.8477 7.72266 17.2891 7.91406L16.7031 9.32617C16.2461 9.13867 15.8672 9.00781 15.5664 8.93359C15.2695 8.85938 14.9766 8.82227 14.6875 8.82227C14.3438 8.82227 14.0801 8.90234 13.8965 9.0625C13.7129 9.22266 13.6211 9.43164 13.6211 9.68945C13.6211 9.84961 13.6582 9.99023 13.7324 10.1113C13.8066 10.2285 13.9238 10.3438 14.084 10.457C14.248 10.5664 14.6328 10.7656 15.2383 11.0547C16.0391 11.4375 16.5879 11.8223 16.8848 12.209C17.1816 12.5918 17.3301 13.0625 17.3301 13.6211Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M8 14V16H4.22222V17H8V19H9L9 5H8V7H4.22222V8H8V10H4.22222V11H8V13H4.22222V14H8Z" style="fill: var(--element-active-color)"/>
<path d="M9 5H19.7778V3H4.22222V5H8H9Z" style="fill: var(--element-active-color)"/>
<path d="M4.22222 16V14V13V11V10V8V7V5V3C3 3 2 3.9 2 5V19C2 20.1 3 21 4.22222 21V19V17V16Z" style="fill: var(--element-active-color)"/>
<path d="M19.7778 19H9H8H4.22222V21H19.7778V19Z" style="fill: var(--element-active-color)"/>
<path d="M19.7778 5V19V21C21 21 22 20.1 22 19V5C22 3.9 21 3 19.7778 3V5Z" style="fill: var(--element-active-color)"/>
<path d="M17.3301 13.6211C17.3301 14.3945 17.0508 15.0039 16.4922 15.4492C15.9375 15.8945 15.1641 16.1172 14.1719 16.1172C13.2578 16.1172 12.4492 15.9453 11.7461 15.6016V13.9141C12.3242 14.1719 12.8125 14.3535 13.2109 14.459C13.6133 14.5645 13.9805 14.6172 14.3125 14.6172C14.7109 14.6172 15.0156 14.541 15.2266 14.3887C15.4414 14.2363 15.5488 14.0098 15.5488 13.709C15.5488 13.541 15.502 13.3926 15.4082 13.2637C15.3145 13.1309 15.1758 13.0039 14.9922 12.8828C14.8125 12.7617 14.4434 12.5684 13.8848 12.3027C13.3613 12.0566 12.9688 11.8203 12.707 11.5938C12.4453 11.3672 12.2363 11.1035 12.0801 10.8027C11.9238 10.502 11.8457 10.1504 11.8457 9.74805C11.8457 8.99023 12.1016 8.39453 12.6133 7.96094C13.1289 7.52734 13.8398 7.31055 14.7461 7.31055C15.1914 7.31055 15.6152 7.36328 16.0176 7.46875C16.4238 7.57422 16.8477 7.72266 17.2891 7.91406L16.7031 9.32617C16.2461 9.13867 15.8672 9.00781 15.5664 8.93359C15.2695 8.85938 14.9766 8.82227 14.6875 8.82227C14.3438 8.82227 14.0801 8.90234 13.8965 9.0625C13.7129 9.22266 13.6211 9.43164 13.6211 9.68945C13.6211 9.84961 13.6582 9.99023 13.7324 10.1113C13.8066 10.2285 13.9238 10.3438 14.084 10.457C14.248 10.5664 14.6328 10.7656 15.2383 11.0547C16.0391 11.4375 16.5879 11.8223 16.8848 12.209C17.1816 12.5918 17.3301 13.0625 17.3301 13.6211Z" style="fill: var(--element-active-color)"/>
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
    'obi-07-smode': Obi07Smode;
  }
}
