import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-converter-dcac')
export class ObiConverterDcac extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M13 15L21 15V17H13L13 15Z" fill="currentColor"/>
<path d="M13 19H21V21H13V19Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M0 1C0 0.447716 0.447715 0 1 0L23 0C23.5523 0 24 0.447715 24 1L24 23C24 23.5523 23.5523 24 23 24L1 24C0.447716 24 0 23.5523 0 23L0 1ZM1 1L22.2929 1L1 22.2929L1 1ZM1.70711 23L23 23L23 1.70711L1.70711 23Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M7.23178 6.64018C6.43538 5.68451 4.93761 5.78662 4.27829 6.84154L3.848 7.53L2.152 6.47L2.58229 5.78154C3.96321 3.57207 7.10021 3.3582 8.76822 5.35982C9.56462 6.31549 11.0624 6.21338 11.7217 5.15846L12.152 4.47L13.848 5.53L13.4177 6.21846C12.0368 8.42793 8.89979 8.6418 7.23178 6.64018Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M13 15L21 15V17H13L13 15Z" style="fill: var(--automation-device-secondary-color)"/>
<path d="M13 19H21V21H13V19Z" style="fill: var(--automation-device-secondary-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M0 1C0 0.447716 0.447715 0 1 0L23 0C23.5523 0 24 0.447715 24 1L24 23C24 23.5523 23.5523 24 23 24L1 24C0.447716 24 0 23.5523 0 23L0 1ZM1 1L22.2929 1L1 22.2929L1 1ZM1.70711 23L23 23L23 1.70711L1.70711 23Z" style="fill: var(--automation-device-secondary-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M7.23178 6.64018C6.43538 5.68451 4.93761 5.78662 4.27829 6.84154L3.848 7.53L2.152 6.47L2.58229 5.78154C3.96321 3.57207 7.10021 3.3582 8.76822 5.35982C9.56462 6.31549 11.0624 6.21338 11.7217 5.15846L12.152 4.47L13.848 5.53L13.4177 6.21846C12.0368 8.42793 8.89979 8.6418 7.23178 6.64018Z" style="fill: var(--automation-device-secondary-color)"/>
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
    'obi-converter-dcac': ObiConverterDcac;
  }
}
