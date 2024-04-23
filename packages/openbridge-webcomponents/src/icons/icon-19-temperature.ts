import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-19-temperature')
export class Obi19Temperature extends LitElement {
  @property({type: Boolean, attribute: 'use-css-color'}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M12 3C13.733 3 15.1492 4.35645 15.2449 6.06546L15.25 6.24987L15.251 12.202L15.331 12.2709C16.2565 13.0975 16.8482 14.2418 16.9746 15.4939L16.9936 15.7457L17 16C17 18.7614 14.7614 21 12 21C9.23858 21 7 18.7614 7 16C7 14.6373 7.5496 13.3655 8.48922 12.4396L8.66993 12.2701L8.749 12.202L8.75 6.25C8.75 4.57886 10.0113 3.20232 11.6339 3.0204L11.8156 3.00514L12 3ZM12 4.5C11.0818 4.5 10.3288 5.20711 10.2558 6.10651L10.25 6.25004L10.2495 12.9445L9.94128 13.1691C9.04185 13.8246 8.5 14.8664 8.5 16C8.5 17.933 10.067 19.5 12 19.5C13.933 19.5 15.5 17.933 15.5 16C15.5 14.9376 15.0241 13.9558 14.2239 13.2971L14.0595 13.1697L13.7515 12.9451L13.75 6.25C13.75 5.2835 12.9665 4.5 12 4.5ZM12 7C12.4142 7 12.75 7.33579 12.75 7.75L12.7506 13.6146C13.7646 13.9334 14.5 14.8808 14.5 16C14.5 17.3807 13.3807 18.5 12 18.5C10.6193 18.5 9.5 17.3807 9.5 16C9.5 14.8804 10.2359 13.9328 11.2504 13.6143L11.25 7.75C11.25 7.33579 11.5858 7 12 7Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M12 3C13.733 3 15.1492 4.35645 15.2449 6.06546L15.25 6.24987L15.251 12.202L15.331 12.2709C16.2565 13.0975 16.8482 14.2418 16.9746 15.4939L16.9936 15.7457L17 16C17 18.7614 14.7614 21 12 21C9.23858 21 7 18.7614 7 16C7 14.6373 7.5496 13.3655 8.48922 12.4396L8.66993 12.2701L8.749 12.202L8.75 6.25C8.75 4.57886 10.0113 3.20232 11.6339 3.0204L11.8156 3.00514L12 3ZM12 4.5C11.0818 4.5 10.3288 5.20711 10.2558 6.10651L10.25 6.25004L10.2495 12.9445L9.94128 13.1691C9.04185 13.8246 8.5 14.8664 8.5 16C8.5 17.933 10.067 19.5 12 19.5C13.933 19.5 15.5 17.933 15.5 16C15.5 14.9376 15.0241 13.9558 14.2239 13.2971L14.0595 13.1697L13.7515 12.9451L13.75 6.25C13.75 5.2835 12.9665 4.5 12 4.5ZM12 7C12.4142 7 12.75 7.33579 12.75 7.75L12.7506 13.6146C13.7646 13.9334 14.5 14.8808 14.5 16C14.5 17.3807 13.3807 18.5 12 18.5C10.6193 18.5 9.5 17.3807 9.5 16C9.5 14.8804 10.2359 13.9328 11.2504 13.6143L11.25 7.75C11.25 7.33579 11.5858 7 12 7Z" style="fill: var(--element-active-color)"/>
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
    'obi-19-temperature': Obi19Temperature;
  }
}
