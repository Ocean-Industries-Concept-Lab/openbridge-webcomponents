import {LitElement, html, css, svg} from 'lit';
import {property} from 'lit/decorators.js';
import {customElement} from '../decorator.js';

@customElement('obi-target-cancel-all-iec')
export class ObiTargetCancelAllIec extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M4 8V4H8V2H4C2.89543 2 2 2.89543 2 4V8H4Z" fill="currentColor"/>
<path d="M4 16H2V20C2 21.1046 2.89543 22 4 22H8V20H4V16Z" fill="currentColor"/>
<path d="M16 20V22H20C21.1046 22 22 21.1046 22 20V16H20V20H16Z" fill="currentColor"/>
<path d="M20 8H22V4.00002C22 2.89546 21.1046 2.00003 20 2.00002L16 2V4H20V8Z" fill="currentColor"/>
<path d="M11.957 6.95703L10.1641 8.75L11.957 10.543L10.543 11.957L8.75 10.1641L6.95703 11.957L5.54297 10.543L7.33594 8.75L5.54297 6.95703L6.95703 5.54297L8.75 7.33594L10.543 5.54297L11.957 6.95703Z" fill="currentColor"/>
<path d="M18.457 13.457L16.6641 15.25L18.457 17.043L17.043 18.457L15.25 16.6641L13.457 18.457L12.043 17.043L13.8359 15.25L12.043 13.457L13.457 12.043L15.25 13.8359L17.043 12.043L18.457 13.457Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M4 8V4H8V2H4C2.89543 2 2 2.89543 2 4V8H4Z" style="fill: var(--element-active-color)"/>
<path d="M4 16H2V20C2 21.1046 2.89543 22 4 22H8V20H4V16Z" style="fill: var(--element-active-color)"/>
<path d="M16 20V22H20C21.1046 22 22 21.1046 22 20V16H20V20H16Z" style="fill: var(--element-active-color)"/>
<path d="M20 8H22V4.00002C22 2.89546 21.1046 2.00003 20 2.00002L16 2V4H20V8Z" style="fill: var(--element-active-color)"/>
<path d="M11.957 6.95703L10.1641 8.75L11.957 10.543L10.543 11.957L8.75 10.1641L6.95703 11.957L5.54297 10.543L7.33594 8.75L5.54297 6.95703L6.95703 5.54297L8.75 7.33594L10.543 5.54297L11.957 6.95703Z" style="fill: var(--element-active-color)"/>
<path d="M18.457 13.457L16.6641 15.25L18.457 17.043L17.043 18.457L15.25 16.6641L13.457 18.457L12.043 17.043L13.8359 15.25L12.043 13.457L13.457 12.043L15.25 13.8359L17.043 12.043L18.457 13.457Z" style="fill: var(--element-active-color)"/>
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
    'obi-target-cancel-all-iec': ObiTargetCancelAllIec;
  }
}
