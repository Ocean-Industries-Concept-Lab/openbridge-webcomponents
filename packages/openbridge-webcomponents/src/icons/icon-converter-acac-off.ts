import {LitElement, html, css, svg} from 'lit';
import {property} from 'lit/decorators.js';
import {customElement} from '../decorator.js';

@customElement('obi-converter-acac-off')
export class ObiConverterAcacOff extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect x="1" y="1" width="22" height="22" fill="currentColor"/>
<path d="M12.2783 18.8414C12.9376 17.7865 14.4354 17.6844 15.2318 18.6401C16.8998 20.6417 20.0368 20.4278 21.4177 18.2183L21.848 17.5299L20.152 16.4699L19.7217 17.1583C19.0624 18.2133 17.5646 18.3154 16.7682 17.3597C15.1002 15.3581 11.9632 15.572 10.5823 17.7814L10.152 18.4699L11.848 19.5299L12.2783 18.8414Z" fill="currentColor"/>
<path d="M0 1C0 0.447716 0.447715 0 1 0H23C23.5523 0 24 0.447715 24 1V23C24 23.5523 23.5523 24 23 24H1C0.447716 24 0 23.5523 0 23V1ZM1 1H22.2929L1 22.2929V1ZM1.70711 23H23V1.70711L1.70711 23Z" fill-rule="evenodd" clip-rule="evenodd" fill="currentColor"/>
<path d="M4.12628 6.859C4.78561 5.80408 6.28338 5.70197 7.07978 6.65765C8.74779 8.65927 11.8848 8.4454 13.2657 6.23592L13.696 5.54746L12 4.48746L11.5697 5.17592C10.9104 6.23085 9.41262 6.33296 8.61622 5.37728C6.9482 3.37566 3.81121 3.58953 2.43029 5.79901L2 6.48746L3.696 7.54746L4.12628 6.859Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect x="1" y="1" width="22" height="22" style="fill: var(--automation-symbol-off-background-color)"/>
<path d="M12.2783 18.8414C12.9376 17.7865 14.4354 17.6844 15.2318 18.6401C16.8998 20.6417 20.0368 20.4278 21.4177 18.2183L21.848 17.5299L20.152 16.4699L19.7217 17.1583C19.0624 18.2133 17.5646 18.3154 16.7682 17.3597C15.1002 15.3581 11.9632 15.572 10.5823 17.7814L10.152 18.4699L11.848 19.5299L12.2783 18.8414Z" style="fill: var(--automation-symbol-off-border-color)"/>
<path d="M0 1C0 0.447716 0.447715 0 1 0H23C23.5523 0 24 0.447715 24 1V23C24 23.5523 23.5523 24 23 24H1C0.447716 24 0 23.5523 0 23V1ZM1 1H22.2929L1 22.2929V1ZM1.70711 23H23V1.70711L1.70711 23Z" fill-rule="evenodd" clip-rule="evenodd" style="fill: var(--automation-symbol-off-border-color)"/>
<path d="M4.12628 6.859C4.78561 5.80408 6.28338 5.70197 7.07978 6.65765C8.74779 8.65927 11.8848 8.4454 13.2657 6.23592L13.696 5.54746L12 4.48746L11.5697 5.17592C10.9104 6.23085 9.41262 6.33296 8.61622 5.37728C6.9482 3.37566 3.81121 3.58953 2.43029 5.79901L2 6.48746L3.696 7.54746L4.12628 6.859Z" style="fill: var(--automation-symbol-off-border-color)"/>
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
    'obi-converter-acac-off': ObiConverterAcacOff;
  }
}
