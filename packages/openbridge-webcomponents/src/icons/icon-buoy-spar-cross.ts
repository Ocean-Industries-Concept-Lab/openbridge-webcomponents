import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-buoy-spar-cross')
export class ObiBuoySparCross extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M15.891 5.75007L15.2236 8.19741L13.7764 7.80273L14.3362 5.75007L12 5.75007V4.25007L14.7453 4.25007L15.2764 2.30273L16.7236 2.69741L16.3001 4.25007L19 4.25007V5.75007L15.891 5.75007Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M9.04148 20.5001H6V19.0001H9.17071C9.4323 18.2599 9.97609 17.6531 10.6728 17.3089L12.5 10.0001H16.5L14.4374 18.2506C14.6013 18.4786 14.734 18.7305 14.8293 19.0001H18V20.5001H14.9585C14.7205 21.9189 13.4865 23.0001 12 23.0001C10.5135 23.0001 9.27952 21.9189 9.04148 20.5001ZM13.5 20.0001C13.5 20.8285 12.8284 21.5001 12 21.5001C11.1716 21.5001 10.5 20.8285 10.5 20.0001C10.5 19.1716 11.1716 18.5001 12 18.5001C12.8284 18.5001 13.5 19.1716 13.5 20.0001Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M15.891 5.75007L15.2236 8.19741L13.7764 7.80273L14.3362 5.75007L12 5.75007V4.25007L14.7453 4.25007L15.2764 2.30273L16.7236 2.69741L16.3001 4.25007L19 4.25007V5.75007L15.891 5.75007Z" style="fill: var(--element-active-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M9.04148 20.5001H6V19.0001H9.17071C9.4323 18.2599 9.97609 17.6531 10.6728 17.3089L12.5 10.0001H16.5L14.4374 18.2506C14.6013 18.4786 14.734 18.7305 14.8293 19.0001H18V20.5001H14.9585C14.7205 21.9189 13.4865 23.0001 12 23.0001C10.5135 23.0001 9.27952 21.9189 9.04148 20.5001ZM13.5 20.0001C13.5 20.8285 12.8284 21.5001 12 21.5001C11.1716 21.5001 10.5 20.8285 10.5 20.0001C10.5 19.1716 11.1716 18.5001 12 18.5001C12.8284 18.5001 13.5 19.1716 13.5 20.0001Z" style="fill: var(--element-active-color)"/>
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
    'obi-buoy-spar-cross': ObiBuoySparCross;
  }
}