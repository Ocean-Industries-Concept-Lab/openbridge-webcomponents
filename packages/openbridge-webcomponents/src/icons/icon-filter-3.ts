import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-filter-3')
export class ObiFilter3 extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M23 1L1 1L1 23L23 23L23 1ZM1 0C0.447715 0 0 0.447716 0 1L0 23C0 23.5523 0.447716 24 1 24L23 24C23.5523 24 24 23.5523 24 23L24 1C24 0.447715 23.5523 0 23 0L1 0Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M11.47 16.848C9.79218 15.7994 7.68266 15.7244 5.93468 16.6514L4.4685 17.4289L3.5315 15.662L4.99767 14.8845C7.37628 13.6231 10.2469 13.725 12.53 15.152C14.2078 16.2006 16.3173 16.2756 18.0653 15.3486L19.5315 14.5711L20.4685 16.338L19.0023 17.1155C16.6237 18.3769 13.7531 18.275 11.47 16.848Z" fill="currentColor"/>
<path d="M10.2937 8.29216L8.29289 10.293L9.70711 11.7072L12.1762 9.23811C14.326 10.2812 16.8631 10.2495 19.0023 9.11506L20.4685 8.33754L19.5315 6.57062L18.0653 7.34813C16.7068 8.06854 15.13 8.18382 13.7071 7.70718L15.7071 5.70718L14.2929 4.29297L11.8246 6.76131C9.67455 5.71786 7.13711 5.74946 4.99767 6.88401L3.53149 7.66152L4.4685 9.42845L5.93467 8.65093C7.29342 7.93038 8.87062 7.81521 10.2937 8.29216Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M23 1L1 1L1 23L23 23L23 1ZM1 0C0.447715 0 0 0.447716 0 1L0 23C0 23.5523 0.447716 24 1 24L23 24C23.5523 24 24 23.5523 24 23L24 1C24 0.447715 23.5523 0 23 0L1 0Z" style="fill: var(--automation-device-secondary-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M11.47 16.848C9.79218 15.7994 7.68266 15.7244 5.93468 16.6514L4.4685 17.4289L3.5315 15.662L4.99767 14.8845C7.37628 13.6231 10.2469 13.725 12.53 15.152C14.2078 16.2006 16.3173 16.2756 18.0653 15.3486L19.5315 14.5711L20.4685 16.338L19.0023 17.1155C16.6237 18.3769 13.7531 18.275 11.47 16.848Z" style="fill: var(--automation-device-secondary-color)"/>
<path d="M10.2937 8.29216L8.29289 10.293L9.70711 11.7072L12.1762 9.23811C14.326 10.2812 16.8631 10.2495 19.0023 9.11506L20.4685 8.33754L19.5315 6.57062L18.0653 7.34813C16.7068 8.06854 15.13 8.18382 13.7071 7.70718L15.7071 5.70718L14.2929 4.29297L11.8246 6.76131C9.67455 5.71786 7.13711 5.74946 4.99767 6.88401L3.53149 7.66152L4.4685 9.42845L5.93467 8.65093C7.29342 7.93038 8.87062 7.81521 10.2937 8.29216Z" style="fill: var(--automation-device-secondary-color)"/>
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
    'obi-filter-3': ObiFilter3;
  }
}