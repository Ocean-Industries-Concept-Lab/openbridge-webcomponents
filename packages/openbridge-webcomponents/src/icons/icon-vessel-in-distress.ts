import {LitElement, html, css, svg} from 'lit';
import {property} from 'lit/decorators.js';
import {customElement} from '../decorator.js';

@customElement('obi-vessel-in-distress')
export class ObiVesselInDistress extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M10.3809 13.0645L8.69629 16.4346L12 18.0859L15.3037 16.4346L14.9326 15.6934L19.4248 18.2871L12 22L4 18L7.34375 11.3115L10.3809 13.0645Z" fill="currentColor"/>
<path d="M18.8115 15.624L13.3096 12.4473L12 9.82715L11.2764 11.2734L8.23926 9.51953L12 2L18.8115 15.624Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M21.5264 19.5L20.5264 21.2324L17.2812 19.3584L12 22L4 18L6.44727 13.1035L1.47363 10.2324L2.47363 8.5L21.5264 19.5ZM5.3418 17.5527L12 20.8818L16.2432 18.7588L14.6865 17.8604L12 19.2041L7.35449 16.8818L8.61621 14.3555L7.31445 13.6045L5.3418 17.5527ZM8.69629 16.4346L12 18.0859L13.6484 17.2617L9.48438 14.8574L8.69629 16.4346Z" fill="currentColor"/>
<path d="M18.8115 15.624L17.2393 14.7158L12 4.23633L9.10742 10.0205L8.23926 9.51953L12 2L18.8115 15.624Z" fill="currentColor"/>
<path d="M14.8818 13.3545L13.3096 12.4473L12 9.82715L11.2764 11.2734L10.4082 10.7725L12 7.59082L14.8818 13.3545Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M10.3809 13.0645L8.69629 16.4346L12 18.0859L15.3037 16.4346L14.9326 15.6934L19.4248 18.2871L12 22L4 18L7.34375 11.3115L10.3809 13.0645Z" style="fill: var(--alert-caution-color)"/>
<path d="M18.8115 15.624L13.3096 12.4473L12 9.82715L11.2764 11.2734L8.23926 9.51953L12 2L18.8115 15.624Z" style="fill: var(--alert-caution-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M21.5264 19.5L20.5264 21.2324L17.2812 19.3584L12 22L4 18L6.44727 13.1035L1.47363 10.2324L2.47363 8.5L21.5264 19.5ZM5.3418 17.5527L12 20.8818L16.2432 18.7588L14.6865 17.8604L12 19.2041L7.35449 16.8818L8.61621 14.3555L7.31445 13.6045L5.3418 17.5527ZM8.69629 16.4346L12 18.0859L13.6484 17.2617L9.48438 14.8574L8.69629 16.4346Z" style="fill: var(--on-caution-color)"/>
<path d="M18.8115 15.624L17.2393 14.7158L12 4.23633L9.10742 10.0205L8.23926 9.51953L12 2L18.8115 15.624Z" style="fill: var(--on-caution-color)"/>
<path d="M14.8818 13.3545L13.3096 12.4473L12 9.82715L11.2764 11.2734L10.4082 10.7725L12 7.59082L14.8818 13.3545Z" style="fill: var(--on-caution-color)"/>
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
    'obi-vessel-in-distress': ObiVesselInDistress;
  }
}
