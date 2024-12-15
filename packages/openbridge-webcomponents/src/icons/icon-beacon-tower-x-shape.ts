import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-beacon-tower-x-shape')
export class ObiBeaconTowerXShape extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M15.7072 2.35363L14.6465 1.29297L12.0001 3.93942L9.35363 1.29297L8.29297 2.35363L10.9394 5.00008L8.29297 7.64652L9.35363 8.70718L12.0001 6.06074L14.6465 8.70718L15.7072 7.64652L13.0607 5.00008L15.7072 2.35363Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M15 10.0001L17.5909 19.5001H19V21.0001H14.8293C14.4175 22.1653 13.3062 23.0001 12 23.0001C10.6938 23.0001 9.58254 22.1653 9.17071 21.0001H5V19.5001H6.40909L9 10.0001H15ZM9.04148 19.5001H7.96388L10.1457 11.5001H13.8543L16.0361 19.5001H14.9585C14.7205 18.0812 13.4865 17.0001 12 17.0001C10.5135 17.0001 9.27952 18.0812 9.04148 19.5001ZM13.5 20.0001C13.5 20.8285 12.8284 21.5001 12 21.5001C11.1716 21.5001 10.5 20.8285 10.5 20.0001C10.5 19.1716 11.1716 18.5001 12 18.5001C12.8284 18.5001 13.5 19.1716 13.5 20.0001Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M15.7072 2.35363L14.6465 1.29297L12.0001 3.93942L9.35363 1.29297L8.29297 2.35363L10.9394 5.00008L8.29297 7.64652L9.35363 8.70718L12.0001 6.06074L14.6465 8.70718L15.7072 7.64652L13.0607 5.00008L15.7072 2.35363Z" style="fill: var(--element-active-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M15 10.0001L17.5909 19.5001H19V21.0001H14.8293C14.4175 22.1653 13.3062 23.0001 12 23.0001C10.6938 23.0001 9.58254 22.1653 9.17071 21.0001H5V19.5001H6.40909L9 10.0001H15ZM9.04148 19.5001H7.96388L10.1457 11.5001H13.8543L16.0361 19.5001H14.9585C14.7205 18.0812 13.4865 17.0001 12 17.0001C10.5135 17.0001 9.27952 18.0812 9.04148 19.5001ZM13.5 20.0001C13.5 20.8285 12.8284 21.5001 12 21.5001C11.1716 21.5001 10.5 20.8285 10.5 20.0001C10.5 19.1716 11.1716 18.5001 12 18.5001C12.8284 18.5001 13.5 19.1716 13.5 20.0001Z" style="fill: var(--element-active-color)"/>
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
    'obi-beacon-tower-x-shape': ObiBeaconTowerXShape;
  }
}
