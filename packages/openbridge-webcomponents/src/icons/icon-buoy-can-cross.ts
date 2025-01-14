import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-buoy-can-cross')
export class ObiBuoyCanCross extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M15.891 5.75007L15.2236 8.19741L13.7764 7.80273L14.3362 5.75007L12 5.75007V4.25007L14.7453 4.25007L15.2764 2.30273L16.7236 2.69741L16.3001 4.25007L19 4.25007V5.75007L15.891 5.75007Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M9.17071 21.0001H2V19.5001H4.27273L6 10.0001H22L20.2727 19.5001H22V21.0001H14.8293C14.4175 22.1653 13.3062 23.0001 12 23.0001C10.6938 23.0001 9.58254 22.1653 9.17071 21.0001ZM20.2027 11.5001L18.7481 19.5001H14.9585C14.7205 18.0812 13.4865 17.0001 12 17.0001C10.5135 17.0001 9.27952 18.0812 9.04148 19.5001H5.79732L7.25186 11.5001H20.2027ZM13.5 20.0001C13.5 20.8285 12.8284 21.5001 12 21.5001C11.1716 21.5001 10.5 20.8285 10.5 20.0001C10.5 19.1716 11.1716 18.5001 12 18.5001C12.8284 18.5001 13.5 19.1716 13.5 20.0001Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M15.891 5.75007L15.2236 8.19741L13.7764 7.80273L14.3362 5.75007L12 5.75007V4.25007L14.7453 4.25007L15.2764 2.30273L16.7236 2.69741L16.3001 4.25007L19 4.25007V5.75007L15.891 5.75007Z" style="fill: var(--element-active-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M9.17071 21.0001H2V19.5001H4.27273L6 10.0001H22L20.2727 19.5001H22V21.0001H14.8293C14.4175 22.1653 13.3062 23.0001 12 23.0001C10.6938 23.0001 9.58254 22.1653 9.17071 21.0001ZM20.2027 11.5001L18.7481 19.5001H14.9585C14.7205 18.0812 13.4865 17.0001 12 17.0001C10.5135 17.0001 9.27952 18.0812 9.04148 19.5001H5.79732L7.25186 11.5001H20.2027ZM13.5 20.0001C13.5 20.8285 12.8284 21.5001 12 21.5001C11.1716 21.5001 10.5 20.8285 10.5 20.0001C10.5 19.1716 11.1716 18.5001 12 18.5001C12.8284 18.5001 13.5 19.1716 13.5 20.0001Z" style="fill: var(--element-active-color)"/>
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
    'obi-buoy-can-cross': ObiBuoyCanCross;
  }
}