import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-buoy-pilar-sphere')
export class ObiBuoyPilarSphere extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M17 6C17 7.10457 16.1046 8 15 8C13.8954 8 13 7.10457 13 6C13 4.89543 13.8954 4 15 4C16.1046 4 17 4.89543 17 6Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M20 20H15C15 21.6569 13.6569 23 12 23C10.3431 23 9 21.6569 9 20H4V18.5H6.375L10.5 14L11.7667 10H16.5L16 15L17.4 18.5H20V20ZM9.40135 18.5C9.92006 17.6033 10.8896 17 12 17C13.1104 17 14.0799 17.6033 14.5987 18.5H15.7845L14.4709 15.2161L14.8425 11.5H12.8651L11.8299 14.7691L8.40985 18.5H9.40135ZM13.5 20C13.5 20.8284 12.8284 21.5 12 21.5C11.1716 21.5 10.5 20.8284 10.5 20C10.5 19.1716 11.1716 18.5 12 18.5C12.8284 18.5 13.5 19.1716 13.5 20Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M17 6C17 7.10457 16.1046 8 15 8C13.8954 8 13 7.10457 13 6C13 4.89543 13.8954 4 15 4C16.1046 4 17 4.89543 17 6Z" style="fill: var(--element-active-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M20 20H15C15 21.6569 13.6569 23 12 23C10.3431 23 9 21.6569 9 20H4V18.5H6.375L10.5 14L11.7667 10H16.5L16 15L17.4 18.5H20V20ZM9.40135 18.5C9.92006 17.6033 10.8896 17 12 17C13.1104 17 14.0799 17.6033 14.5987 18.5H15.7845L14.4709 15.2161L14.8425 11.5H12.8651L11.8299 14.7691L8.40985 18.5H9.40135ZM13.5 20C13.5 20.8284 12.8284 21.5 12 21.5C11.1716 21.5 10.5 20.8284 10.5 20C10.5 19.1716 11.1716 18.5 12 18.5C12.8284 18.5 13.5 19.1716 13.5 20Z" style="fill: var(--element-active-color)"/>
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
    'obi-buoy-pilar-sphere': ObiBuoyPilarSphere;
  }
}
