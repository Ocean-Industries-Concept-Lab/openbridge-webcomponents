import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-buoy-pilar-cross')
export class ObiBuoyPilarCross extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M15.891 5.75007L15.2236 8.19741L13.7764 7.80273L14.3362 5.75007L12 5.75007V4.25007L14.7453 4.25007L15.2764 2.30273L16.7236 2.69741L16.3001 4.25007L19 4.25007V5.75007L15.891 5.75007Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M20 20.0001H15C15 21.6569 13.6569 23.0001 12 23.0001C10.3431 23.0001 9 21.6569 9 20.0001H4V18.5001H6.375L10.5 14.0001L11.7667 10.0001H16.5L16 15.0001L17.4 18.5001H20V20.0001ZM9.40135 18.5001C9.92006 17.6034 10.8896 17.0001 12 17.0001C13.1104 17.0001 14.0799 17.6034 14.5987 18.5001H15.7845L14.4709 15.2162L14.8425 11.5001H12.8651L11.8299 14.7691L8.40985 18.5001H9.40135ZM13.5 20.0001C13.5 20.8285 12.8284 21.5001 12 21.5001C11.1716 21.5001 10.5 20.8285 10.5 20.0001C10.5 19.1716 11.1716 18.5001 12 18.5001C12.8284 18.5001 13.5 19.1716 13.5 20.0001Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M15.891 5.75007L15.2236 8.19741L13.7764 7.80273L14.3362 5.75007L12 5.75007V4.25007L14.7453 4.25007L15.2764 2.30273L16.7236 2.69741L16.3001 4.25007L19 4.25007V5.75007L15.891 5.75007Z" style="fill: var(--element-active-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M20 20.0001H15C15 21.6569 13.6569 23.0001 12 23.0001C10.3431 23.0001 9 21.6569 9 20.0001H4V18.5001H6.375L10.5 14.0001L11.7667 10.0001H16.5L16 15.0001L17.4 18.5001H20V20.0001ZM9.40135 18.5001C9.92006 17.6034 10.8896 17.0001 12 17.0001C13.1104 17.0001 14.0799 17.6034 14.5987 18.5001H15.7845L14.4709 15.2162L14.8425 11.5001H12.8651L11.8299 14.7691L8.40985 18.5001H9.40135ZM13.5 20.0001C13.5 20.8285 12.8284 21.5001 12 21.5001C11.1716 21.5001 10.5 20.8285 10.5 20.0001C10.5 19.1716 11.1716 18.5001 12 18.5001C12.8284 18.5001 13.5 19.1716 13.5 20.0001Z" style="fill: var(--element-active-color)"/>
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
    'obi-buoy-pilar-cross': ObiBuoyPilarCross;
  }
}