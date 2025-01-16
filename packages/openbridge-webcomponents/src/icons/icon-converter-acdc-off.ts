import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-converter-acdc-off')
export class ObiConverterAcdcOff extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M1 1H22.2929L1 22.2929V1ZM4.27829 6.84154C4.93761 5.78662 6.43538 5.68451 7.23178 6.64018C8.89979 8.6418 12.0368 8.42793 13.4177 6.21846L13.848 5.53L12.152 4.47L11.7217 5.15846C11.0624 6.21338 9.56462 6.31549 8.76822 5.35982C7.10021 3.3582 3.96321 3.57207 2.58229 5.78154L2.152 6.47L3.848 7.53L4.27829 6.84154Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M1.70711 23H23V1.70711L1.70711 23ZM21 15H13V17H21V15ZM21 19H13V21H21V19Z" fill="currentColor"/>
<path d="M13 15H21V17H13V15Z" fill="currentColor"/>
<path d="M13 19H21V21H13V19Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M0 1C0 0.447716 0.447715 0 1 0H23C23.5523 0 24 0.447715 24 1V23C24 23.5523 23.5523 24 23 24H1C0.447716 24 0 23.5523 0 23V1ZM1 1H22.2929L1 22.2929V1ZM1.70711 23H23V1.70711L1.70711 23Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M7.23178 6.64018C6.43538 5.68451 4.93761 5.78662 4.27829 6.84154L3.848 7.53L2.152 6.47L2.58229 5.78154C3.96321 3.57207 7.10021 3.3582 8.76822 5.35982C9.56462 6.31549 11.0624 6.21338 11.7217 5.15846L12.152 4.47L13.848 5.53L13.4177 6.21846C12.0368 8.42793 8.89979 8.6418 7.23178 6.64018Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M1 1H22.2929L1 22.2929V1ZM4.27829 6.84154C4.93761 5.78662 6.43538 5.68451 7.23178 6.64018C8.89979 8.6418 12.0368 8.42793 13.4177 6.21846L13.848 5.53L12.152 4.47L11.7217 5.15846C11.0624 6.21338 9.56462 6.31549 8.76822 5.35982C7.10021 3.3582 3.96321 3.57207 2.58229 5.78154L2.152 6.47L3.848 7.53L4.27829 6.84154Z" style="fill: var(--automation-device-primary-inverted-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M1.70711 23H23V1.70711L1.70711 23ZM21 15H13V17H21V15ZM21 19H13V21H21V19Z" style="fill: var(--automation-device-primary-inverted-color)"/>
<path d="M13 15H21V17H13V15Z" style="fill: var(--undefined)"/>
<path d="M13 19H21V21H13V19Z" style="fill: var(--undefined)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M0 1C0 0.447716 0.447715 0 1 0H23C23.5523 0 24 0.447715 24 1V23C24 23.5523 23.5523 24 23 24H1C0.447716 24 0 23.5523 0 23V1ZM1 1H22.2929L1 22.2929V1ZM1.70711 23H23V1.70711L1.70711 23Z" style="fill: var(--undefined)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M7.23178 6.64018C6.43538 5.68451 4.93761 5.78662 4.27829 6.84154L3.848 7.53L2.152 6.47L2.58229 5.78154C3.96321 3.57207 7.10021 3.3582 8.76822 5.35982C9.56462 6.31549 11.0624 6.21338 11.7217 5.15846L12.152 4.47L13.848 5.53L13.4177 6.21846C12.0368 8.42793 8.89979 8.6418 7.23178 6.64018Z" style="fill: var(--undefined)"/>
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
    'obi-converter-acdc-off': ObiConverterAcdcOff;
  }
}
