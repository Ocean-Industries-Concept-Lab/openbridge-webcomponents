import {LitElement, html, css, svg, unsafeCSS} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-01-application-open')
export class Obi01ApplicationOpen extends LitElement {
  @property({type: Boolean, attribute: 'use-css-color'}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M16 18H6V8H11V6H6C4.89 6 4 6.9 4 8V18C4 19.1 4.89 20 6 20H16C17.1 20 18 19.1 18 18V13H16V18Z" fill="currentColor"/>
<path d="M13 4V6H16.59L11.675 10.915L9.2175 13.3725L7.98875 14.6012L9.39875 16.0112L10.6275 14.7825L13.085 12.325L18 7.41V11H20V4H13Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M16 18H6V8H11V6H6C4.89 6 4 6.9 4 8V18C4 19.1 4.89 20 6 20H16C17.1 20 18 19.1 18 18V13H16V18Z" style="fill: var(--element-active-color)"/>
<path d="M13 4V6H16.59L11.675 10.915L9.2175 13.3725L7.98875 14.6012L9.39875 16.0112L10.6275 14.7825L13.085 12.325L18 7.41V11H20V4H13Z" style="fill: var(--element-active-color)"/>
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
    }
    .wrapper > * {
      height: 100%;
      width: 100%;
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    'obi-01-application-open': Obi01ApplicationOpen;
  }
}
