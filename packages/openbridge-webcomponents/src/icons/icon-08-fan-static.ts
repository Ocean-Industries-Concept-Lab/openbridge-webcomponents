import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-08-fan-static')
export class Obi08FanStatic extends LitElement {
  @property({type: Boolean, attribute: 'use-css-color'}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M12.9517 15.0554C12.1553 14.2519 10.8516 14.2684 10.0757 15.0917L5.51256 19.9338C5.46662 19.9826 5.38667 19.9733 5.35318 19.9153L4.03888 17.6388C2.72014 15.3547 3.93428 12.4418 6.48492 11.7705L9.37308 11.0104C10.4671 10.7225 11.1048 9.58519 10.7797 8.5016L8.86784 2.12874C8.84859 2.06457 8.89664 2 8.96362 2H11.5922C14.2297 2 16.1452 4.50791 15.4513 7.05247L14.6655 9.93376C14.3678 11.0252 15.0339 12.1461 16.1349 12.4063L22.6099 13.9371C22.6751 13.9525 22.707 14.0264 22.6735 14.0844L21.3592 16.3608C20.0404 18.645 16.9108 19.0499 15.0541 17.1766L12.9517 15.0554Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M10.8035 15.7775L6.24032 20.6197C5.73497 21.1559 4.85558 21.0534 4.48715 20.4153L3.17286 18.1388C1.52442 15.2836 3.04211 11.6426 6.23041 10.8035L9.11856 10.0434C9.66559 9.8994 9.98441 9.33074 9.82188 8.78895L7.91002 2.41608C7.69829 1.71031 8.22677 1 8.96362 1H11.5922C14.8891 1 17.2835 4.13489 16.416 7.31559L15.6302 10.1969C15.4814 10.7426 15.8145 11.303 16.3649 11.4332L22.84 12.9639C23.557 13.1334 23.9079 13.9463 23.5395 14.5844L22.2252 16.8608C20.5768 19.716 16.6647 20.2222 14.3438 17.8806L12.2415 15.7594C11.8433 15.3576 11.1914 15.3658 10.8035 15.7775ZM21.3592 16.3608C20.0404 18.645 16.9108 19.0499 15.0541 17.1766L12.9517 15.0554C12.1553 14.2519 10.8516 14.2684 10.0757 15.0917L5.51256 19.9338C5.46662 19.9826 5.38667 19.9733 5.35318 19.9153L4.03888 17.6388C2.72014 15.3547 3.93428 12.4418 6.48492 11.7705L9.37308 11.0104C10.4671 10.7225 11.1048 9.58519 10.7797 8.5016L8.86784 2.12874C8.84859 2.06457 8.89664 2 8.96362 2H11.5922C14.2297 2 16.1452 4.50791 15.4513 7.05247L14.6655 9.93376C14.3678 11.0252 15.0339 12.1461 16.1349 12.4063L22.6099 13.9371C22.6751 13.9525 22.707 14.0264 22.6735 14.0844L21.3592 16.3608Z" fill="currentColor"/>
<path d="M13.8307 12C13.8307 12.8284 13.1591 13.5 12.3307 13.5C11.5022 13.5 10.8307 12.8284 10.8307 12C10.8307 11.1716 11.5022 10.5 12.3307 10.5C13.1591 10.5 13.8307 11.1716 13.8307 12Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M12.9517 15.0554C12.1553 14.2519 10.8516 14.2684 10.0757 15.0917L5.51256 19.9338C5.46662 19.9826 5.38667 19.9733 5.35318 19.9153L4.03888 17.6388C2.72014 15.3547 3.93428 12.4418 6.48492 11.7705L9.37308 11.0104C10.4671 10.7225 11.1048 9.58519 10.7797 8.5016L8.86784 2.12874C8.84859 2.06457 8.89664 2 8.96362 2H11.5922C14.2297 2 16.1452 4.50791 15.4513 7.05247L14.6655 9.93376C14.3678 11.0252 15.0339 12.1461 16.1349 12.4063L22.6099 13.9371C22.6751 13.9525 22.707 14.0264 22.6735 14.0844L21.3592 16.3608C20.0404 18.645 16.9108 19.0499 15.0541 17.1766L12.9517 15.0554Z" style="fill: var(--automation-device-primary-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M10.8035 15.7775L6.24032 20.6197C5.73497 21.1559 4.85558 21.0534 4.48715 20.4153L3.17286 18.1388C1.52442 15.2836 3.04211 11.6426 6.23041 10.8035L9.11856 10.0434C9.66559 9.8994 9.98441 9.33074 9.82188 8.78895L7.91002 2.41608C7.69829 1.71031 8.22677 1 8.96362 1H11.5922C14.8891 1 17.2835 4.13489 16.416 7.31559L15.6302 10.1969C15.4814 10.7426 15.8145 11.303 16.3649 11.4332L22.84 12.9639C23.557 13.1334 23.9079 13.9463 23.5395 14.5844L22.2252 16.8608C20.5768 19.716 16.6647 20.2222 14.3438 17.8806L12.2415 15.7594C11.8433 15.3576 11.1914 15.3658 10.8035 15.7775ZM21.3592 16.3608C20.0404 18.645 16.9108 19.0499 15.0541 17.1766L12.9517 15.0554C12.1553 14.2519 10.8516 14.2684 10.0757 15.0917L5.51256 19.9338C5.46662 19.9826 5.38667 19.9733 5.35318 19.9153L4.03888 17.6388C2.72014 15.3547 3.93428 12.4418 6.48492 11.7705L9.37308 11.0104C10.4671 10.7225 11.1048 9.58519 10.7797 8.5016L8.86784 2.12874C8.84859 2.06457 8.89664 2 8.96362 2H11.5922C14.2297 2 16.1452 4.50791 15.4513 7.05247L14.6655 9.93376C14.3678 11.0252 15.0339 12.1461 16.1349 12.4063L22.6099 13.9371C22.6751 13.9525 22.707 14.0264 22.6735 14.0844L21.3592 16.3608Z" style="fill: var(--automation-device-secondary-color)"/>
<path d="M13.8307 12C13.8307 12.8284 13.1591 13.5 12.3307 13.5C11.5022 13.5 10.8307 12.8284 10.8307 12C10.8307 11.1716 11.5022 10.5 12.3307 10.5C13.1591 10.5 13.8307 11.1716 13.8307 12Z" style="fill: var(--automation-device-secondary-color)"/>
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
    'obi-08-fan-static': Obi08FanStatic;
  }
}