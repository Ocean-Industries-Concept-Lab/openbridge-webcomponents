import {LitElement, html, css, svg, unsafeCSS} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-09-damper-horizontal-off-large')
export class Obi09DamperHorizontalOffLarge extends LitElement {
  @property({type: Boolean, attribute: 'use-css-color'}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M13.4274 10.5985L20.4102 6.56701C20.6493 6.42894 20.9551 6.51088 21.0932 6.75002C21.2312 6.98917 21.1493 7.29497 20.9102 7.43304L13.9274 11.4645C14.1664 12.3226 13.807 13.2661 12.9999 13.7321C12.1928 14.198 11.196 14.0376 10.5724 13.4015L3.58966 17.433C3.35051 17.5711 3.04472 17.4892 2.90665 17.25C2.76857 17.0109 2.85051 16.7051 3.08966 16.567L10.0724 12.5355C9.8334 11.6775 10.1928 10.7339 10.9999 10.268C11.807 9.80201 12.8038 9.96248 13.4274 10.5985Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M12.8659 11.5C13.1421 11.9783 12.9782 12.5899 12.4999 12.866C12.0216 13.1422 11.41 12.9783 11.1339 12.5C10.8577 12.0217 11.0216 11.4101 11.4999 11.134C11.9782 10.8579 12.5898 11.0217 12.8659 11.5Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M20.1602 6.134L13.4847 9.98809C12.7092 9.41646 11.6381 9.32215 10.7499 9.83496C9.8617 10.3478 9.40781 11.3225 9.51514 12.2799L2.83966 16.134C2.36137 16.4101 2.19749 17.0217 2.47363 17.5C2.74978 17.9783 3.36137 18.1422 3.83966 17.866L10.5151 14.012C11.2906 14.5836 12.3617 14.6779 13.2499 14.1651C14.1381 13.6523 14.592 12.6775 14.4847 11.7201L21.1602 7.86605C21.6385 7.58991 21.8023 6.97832 21.5262 6.50002C21.25 6.02173 20.6385 5.85786 20.1602 6.134ZM20.4102 6.56701L13.4274 10.5985C12.8038 9.96248 11.807 9.80201 10.9999 10.268C10.1928 10.7339 9.8334 11.6775 10.0724 12.5355L3.08966 16.567C2.85051 16.7051 2.76857 17.0109 2.90665 17.25C3.04472 17.4892 3.35051 17.5711 3.58966 17.433L10.5724 13.4015C11.196 14.0376 12.1928 14.198 12.9999 13.7321C13.807 13.2661 14.1664 12.3226 13.9274 11.4645L20.9102 7.43304C21.1493 7.29497 21.2312 6.98917 21.0932 6.75002C20.9551 6.51088 20.6493 6.42894 20.4102 6.56701Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M13.4274 10.5985L20.4102 6.56701C20.6493 6.42894 20.9551 6.51088 21.0932 6.75002C21.2312 6.98917 21.1493 7.29497 20.9102 7.43304L13.9274 11.4645C14.1664 12.3226 13.807 13.2661 12.9999 13.7321C12.1928 14.198 11.196 14.0376 10.5724 13.4015L3.58966 17.433C3.35051 17.5711 3.04472 17.4892 2.90665 17.25C2.76857 17.0109 2.85051 16.7051 3.08966 16.567L10.0724 12.5355C9.8334 11.6775 10.1928 10.7339 10.9999 10.268C11.807 9.80201 12.8038 9.96248 13.4274 10.5985Z" style="fill: var(--automation-device-primary-inverted-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M12.8659 11.5C13.1421 11.9783 12.9782 12.5899 12.4999 12.866C12.0216 13.1422 11.41 12.9783 11.1339 12.5C10.8577 12.0217 11.0216 11.4101 11.4999 11.134C11.9782 10.8579 12.5898 11.0217 12.8659 11.5Z" style="fill: var(--automation-device-tertiary-inverted-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M20.1602 6.134L13.4847 9.98809C12.7092 9.41646 11.6381 9.32215 10.7499 9.83496C9.8617 10.3478 9.40781 11.3225 9.51514 12.2799L2.83966 16.134C2.36137 16.4101 2.19749 17.0217 2.47363 17.5C2.74978 17.9783 3.36137 18.1422 3.83966 17.866L10.5151 14.012C11.2906 14.5836 12.3617 14.6779 13.2499 14.1651C14.1381 13.6523 14.592 12.6775 14.4847 11.7201L21.1602 7.86605C21.6385 7.58991 21.8023 6.97832 21.5262 6.50002C21.25 6.02173 20.6385 5.85786 20.1602 6.134ZM20.4102 6.56701L13.4274 10.5985C12.8038 9.96248 11.807 9.80201 10.9999 10.268C10.1928 10.7339 9.8334 11.6775 10.0724 12.5355L3.08966 16.567C2.85051 16.7051 2.76857 17.0109 2.90665 17.25C3.04472 17.4892 3.35051 17.5711 3.58966 17.433L10.5724 13.4015C11.196 14.0376 12.1928 14.198 12.9999 13.7321C13.807 13.2661 14.1664 12.3226 13.9274 11.4645L20.9102 7.43304C21.1493 7.29497 21.2312 6.98917 21.0932 6.75002C20.9551 6.51088 20.6493 6.42894 20.4102 6.56701Z" style="fill: var(--automation-device-tertiary-inverted-color)"/>
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
    }
    .wrapper > * {
      height: 100%;
      width: 100%;
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    'obi-09-damper-horizontal-off-large': Obi09DamperHorizontalOffLarge;
  }
}
