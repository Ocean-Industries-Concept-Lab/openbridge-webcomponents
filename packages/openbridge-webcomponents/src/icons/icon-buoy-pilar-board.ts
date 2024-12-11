import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-buoy-pilar-board')
export class ObiBuoyPilarBoard extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M15.0155 4.5L14.2155 6.5H16.9845L17.7845 4.5H15.0155ZM19.4514 4.37139C19.7142 3.71453 19.2304 3 18.523 3H14.677C14.2681 3 13.9004 3.24895 13.7486 3.62861L12.5486 6.62861C12.2858 7.28547 12.7696 8 13.477 8H17.323C17.7319 8 18.0996 7.75105 18.2514 7.37139L19.4514 4.37139Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M20 20H15C15 21.6569 13.6569 23 12 23C10.3431 23 9 21.6569 9 20H4V18.5H6.375L10.5 14L11.7667 10H16.5L16 15L17.4 18.5H20V20ZM9.40135 18.5C9.92006 17.6033 10.8896 17 12 17C13.1104 17 14.0799 17.6033 14.5987 18.5H15.7845L14.4709 15.2161L14.8425 11.5H12.8651L11.8299 14.7691L8.40985 18.5H9.40135ZM13.5 20C13.5 20.8284 12.8284 21.5 12 21.5C11.1716 21.5 10.5 20.8284 10.5 20C10.5 19.1716 11.1716 18.5 12 18.5C12.8284 18.5 13.5 19.1716 13.5 20Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M15.0155 4.5L14.2155 6.5H16.9845L17.7845 4.5H15.0155ZM19.4514 4.37139C19.7142 3.71453 19.2304 3 18.523 3H14.677C14.2681 3 13.9004 3.24895 13.7486 3.62861L12.5486 6.62861C12.2858 7.28547 12.7696 8 13.477 8H17.323C17.7319 8 18.0996 7.75105 18.2514 7.37139L19.4514 4.37139Z" style="fill: var(--element-active-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M20 20H15C15 21.6569 13.6569 23 12 23C10.3431 23 9 21.6569 9 20H4V18.5H6.375L10.5 14L11.7667 10H16.5L16 15L17.4 18.5H20V20ZM9.40135 18.5C9.92006 17.6033 10.8896 17 12 17C13.1104 17 14.0799 17.6033 14.5987 18.5H15.7845L14.4709 15.2161L14.8425 11.5H12.8651L11.8299 14.7691L8.40985 18.5H9.40135ZM13.5 20C13.5 20.8284 12.8284 21.5 12 21.5C11.1716 21.5 10.5 20.8284 10.5 20C10.5 19.1716 11.1716 18.5 12 18.5C12.8284 18.5 13.5 19.1716 13.5 20Z" style="fill: var(--element-active-color)"/>
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
    'obi-buoy-pilar-board': ObiBuoyPilarBoard;
  }
}