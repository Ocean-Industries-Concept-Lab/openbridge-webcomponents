import {LitElement, html, css, svg} from 'lit';
import {property} from 'lit/decorators.js';
import {customElement} from '../decorator.js';

@customElement('obi-vessel-in-distress-ais')
export class ObiVesselInDistressAis extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M18.767 19.335C18.8807 19.66 18.6395 20.0001 18.295 20.0001H5.70451C5.36009 20.0001 5.1188 19.66 5.23258 19.335L11.5278 1.3485C11.6841 0.902063 12.3154 0.902064 12.4717 1.3485L18.767 19.335ZM9.93337 16.5001H14.0662L11.9998 10.5949L9.93337 16.5001Z" fill="currentColor"/>
<path d="M11.5284 1.3485C11.6846 0.902064 12.3155 0.902064 12.4717 1.3485L18.7676 19.3348C18.8812 19.6598 18.6393 19.9999 18.295 19.9999H5.70513L5.64165 19.996C5.33175 19.9575 5.12598 19.6396 5.23247 19.3348L11.5284 1.3485ZM6.40923 18.9999H17.5909L12.0001 3.02623L6.40923 18.9999ZM15.4756 17.4999H8.52446L12.0001 7.56725L15.4756 17.4999ZM9.93364 16.4999H14.0665L12.0001 10.5946L9.93364 16.4999Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M18.767 19.335C18.8807 19.66 18.6395 20.0001 18.295 20.0001H5.70451C5.36009 20.0001 5.1188 19.66 5.23258 19.335L11.5278 1.3485C11.6841 0.902063 12.3154 0.902064 12.4717 1.3485L18.767 19.335ZM9.93337 16.5001H14.0662L11.9998 10.5949L9.93337 16.5001Z" style="fill: var(--alert-caution-color)"/>
<path d="M11.5284 1.3485C11.6846 0.902064 12.3155 0.902064 12.4717 1.3485L18.7676 19.3348C18.8812 19.6598 18.6393 19.9999 18.295 19.9999H5.70513L5.64165 19.996C5.33175 19.9575 5.12598 19.6396 5.23247 19.3348L11.5284 1.3485ZM6.40923 18.9999H17.5909L12.0001 3.02623L6.40923 18.9999ZM15.4756 17.4999H8.52446L12.0001 7.56725L15.4756 17.4999ZM9.93364 16.4999H14.0665L12.0001 10.5946L9.93364 16.4999Z" style="fill: var(--on-caution-color)"/>
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
    'obi-vessel-in-distress-ais': ObiVesselInDistressAis;
  }
}
