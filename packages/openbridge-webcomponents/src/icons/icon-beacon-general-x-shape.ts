import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-beacon-general-x-shape')
export class ObiBeaconGeneralXShape extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M9.17071 21.0001H6V19.5001H9.04148C9.15648 18.8146 9.50394 18.2079 10 17.7639L10 10.0001H14V17.764C14.4961 18.208 14.8435 18.8146 14.9585 19.5001H18V21.0001H14.8293C14.4175 22.1653 13.3062 23.0001 12 23.0001C10.6938 23.0001 9.58254 22.1653 9.17071 21.0001ZM13.5 20.0001C13.5 20.8285 12.8284 21.5001 12 21.5001C11.1716 21.5001 10.5 20.8285 10.5 20.0001C10.5 19.1716 11.1716 18.5001 12 18.5001C12.8284 18.5001 13.5 19.1716 13.5 20.0001Z" fill="currentColor"/>
<path d="M15.7072 2.35363L14.6465 1.29297L12.0001 3.93942L9.35363 1.29297L8.29297 2.35363L10.9394 5.00008L8.29297 7.64652L9.35363 8.70718L12.0001 6.06074L14.6465 8.70718L15.7072 7.64652L13.0607 5.00008L15.7072 2.35363Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M9.17071 21.0001H6V19.5001H9.04148C9.15648 18.8146 9.50394 18.2079 10 17.7639L10 10.0001H14V17.764C14.4961 18.208 14.8435 18.8146 14.9585 19.5001H18V21.0001H14.8293C14.4175 22.1653 13.3062 23.0001 12 23.0001C10.6938 23.0001 9.58254 22.1653 9.17071 21.0001ZM13.5 20.0001C13.5 20.8285 12.8284 21.5001 12 21.5001C11.1716 21.5001 10.5 20.8285 10.5 20.0001C10.5 19.1716 11.1716 18.5001 12 18.5001C12.8284 18.5001 13.5 19.1716 13.5 20.0001Z" style="fill: var(--element-active-color)"/>
<path d="M15.7072 2.35363L14.6465 1.29297L12.0001 3.93942L9.35363 1.29297L8.29297 2.35363L10.9394 5.00008L8.29297 7.64652L9.35363 8.70718L12.0001 6.06074L14.6465 8.70718L15.7072 7.64652L13.0607 5.00008L15.7072 2.35363Z" style="fill: var(--element-active-color)"/>
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
    'obi-beacon-general-x-shape': ObiBeaconGeneralXShape;
  }
}