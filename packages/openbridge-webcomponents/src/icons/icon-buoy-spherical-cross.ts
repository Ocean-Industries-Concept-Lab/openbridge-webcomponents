import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-buoy-spherical-cross')
export class ObiBuoySphericalCross extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M15.891 5.75007L15.2236 8.19741L13.7764 7.80273L14.3362 5.75007L12 5.75007V4.25007L14.7453 4.25007L15.2764 2.30273L16.7236 2.69741L16.3001 4.25007L19 4.25007V5.75007L15.891 5.75007Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M20 20.0001H15C15 21.6569 13.6569 23.0001 12 23.0001C10.3431 23.0001 9 21.6569 9 20.0001H4V18.5001H6.54404C6.19474 17.739 6 16.8923 6 16.0001C6 12.6864 8.68629 10.0001 12 10.0001C15.3137 10.0001 18 12.6864 18 16.0001C18 16.8923 17.8053 17.739 17.456 18.5001H20V20.0001ZM9.40135 18.5001C9.92006 17.6034 10.8896 17.0001 12 17.0001C13.1104 17.0001 14.0799 17.6034 14.5987 18.5001H15.7425C16.2215 17.7849 16.5 16.9262 16.5 16.0001C16.5 13.5148 14.4853 11.5001 12 11.5001C9.51472 11.5001 7.5 13.5148 7.5 16.0001C7.5 16.9262 7.7785 17.7849 8.25754 18.5001H9.40135ZM13.5 20.0001C13.5 20.8285 12.8284 21.5001 12 21.5001C11.1716 21.5001 10.5 20.8285 10.5 20.0001C10.5 19.1716 11.1716 18.5001 12 18.5001C12.8284 18.5001 13.5 19.1716 13.5 20.0001Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M15.891 5.75007L15.2236 8.19741L13.7764 7.80273L14.3362 5.75007L12 5.75007V4.25007L14.7453 4.25007L15.2764 2.30273L16.7236 2.69741L16.3001 4.25007L19 4.25007V5.75007L15.891 5.75007Z" style="fill: var(--element-active-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M20 20.0001H15C15 21.6569 13.6569 23.0001 12 23.0001C10.3431 23.0001 9 21.6569 9 20.0001H4V18.5001H6.54404C6.19474 17.739 6 16.8923 6 16.0001C6 12.6864 8.68629 10.0001 12 10.0001C15.3137 10.0001 18 12.6864 18 16.0001C18 16.8923 17.8053 17.739 17.456 18.5001H20V20.0001ZM9.40135 18.5001C9.92006 17.6034 10.8896 17.0001 12 17.0001C13.1104 17.0001 14.0799 17.6034 14.5987 18.5001H15.7425C16.2215 17.7849 16.5 16.9262 16.5 16.0001C16.5 13.5148 14.4853 11.5001 12 11.5001C9.51472 11.5001 7.5 13.5148 7.5 16.0001C7.5 16.9262 7.7785 17.7849 8.25754 18.5001H9.40135ZM13.5 20.0001C13.5 20.8285 12.8284 21.5001 12 21.5001C11.1716 21.5001 10.5 20.8285 10.5 20.0001C10.5 19.1716 11.1716 18.5001 12 18.5001C12.8284 18.5001 13.5 19.1716 13.5 20.0001Z" style="fill: var(--element-active-color)"/>
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
    'obi-buoy-spherical-cross': ObiBuoySphericalCross;
  }
}