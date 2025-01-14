import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-converter-dcac')
export class ObiConverterDcac extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M3 3H11V5H3V3Z" fill="currentColor"/>
<path d="M3 7L11 7V9H3V7Z" fill="currentColor"/>
<path d="M12.2783 18.8414C12.9376 17.7865 14.4354 17.6844 15.2318 18.6401C16.8998 20.6417 20.0368 20.4278 21.4177 18.2183L21.848 17.5299L20.152 16.4699L19.7217 17.1583C19.0624 18.2133 17.5646 18.3154 16.7682 17.3597C15.1002 15.3581 11.9632 15.572 10.5823 17.7814L10.152 18.4699L11.848 19.5299L12.2783 18.8414Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M0 1C0 0.447716 0.447715 0 1 0H23C23.5523 0 24 0.447715 24 1V23C24 23.5523 23.5523 24 23 24H1C0.447716 24 0 23.5523 0 23V1ZM1 1H22.2929L1 22.2929V1ZM1.70711 23H23V1.70711L1.70711 23Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M3 3H11V5H3V3Z" style="fill: var(--automation-device-secondary-color)"/>
<path d="M3 7L11 7V9H3V7Z" style="fill: var(--automation-device-secondary-color)"/>
<path d="M12.2783 18.8414C12.9376 17.7865 14.4354 17.6844 15.2318 18.6401C16.8998 20.6417 20.0368 20.4278 21.4177 18.2183L21.848 17.5299L20.152 16.4699L19.7217 17.1583C19.0624 18.2133 17.5646 18.3154 16.7682 17.3597C15.1002 15.3581 11.9632 15.572 10.5823 17.7814L10.152 18.4699L11.848 19.5299L12.2783 18.8414Z" style="fill: var(--automation-device-secondary-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M0 1C0 0.447716 0.447715 0 1 0H23C23.5523 0 24 0.447715 24 1V23C24 23.5523 23.5523 24 23 24H1C0.447716 24 0 23.5523 0 23V1ZM1 1H22.2929L1 22.2929V1ZM1.70711 23H23V1.70711L1.70711 23Z" style="fill: var(--automation-device-secondary-color)"/>
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
    'obi-converter-dcac': ObiConverterDcac;
  }
}