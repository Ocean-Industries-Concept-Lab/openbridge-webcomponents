import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-antenna-off')
export class ObiAntennaOff extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M13 10.0599L14.9691 7.5H13V10.0599Z" fill="currentColor"/>
<path d="M11 7.5V10.0599L9.03086 7.5H11Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22ZM4.96913 5.5H19.0309L13 13.3401V20H11V13.3401L4.96913 5.5Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M19.0309 5.5H4.96913L11 13.3401V20H13V13.3401L19.0309 5.5ZM14.9691 7.5L13 10.0599V7.5H14.9691ZM11 10.0599V7.5H9.03086L11 10.0599Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M23 12C23 18.0751 18.0751 23 12 23C5.92487 23 1 18.0751 1 12C1 5.92487 5.92487 1 12 1C18.0751 1 23 5.92487 23 12ZM22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M13 10.0599L14.9691 7.5H13V10.0599Z" style="fill: var(--automation-device-primary-inverted-color)"/>
<path d="M11 7.5V10.0599L9.03086 7.5H11Z" style="fill: var(--automation-device-primary-inverted-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22ZM4.96913 5.5H19.0309L13 13.3401V20H11V13.3401L4.96913 5.5Z" style="fill: var(--automation-device-primary-inverted-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M19.0309 5.5H4.96913L11 13.3401V20H13V13.3401L19.0309 5.5ZM14.9691 7.5L13 10.0599V7.5H14.9691ZM11 10.0599V7.5H9.03086L11 10.0599Z" style="fill: var(--automation-device-tertiary-inverted-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M23 12C23 18.0751 18.0751 23 12 23C5.92487 23 1 18.0751 1 12C1 5.92487 5.92487 1 12 1C18.0751 1 23 5.92487 23 12ZM22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z" style="fill: var(--automation-device-tertiary-inverted-color)"/>
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
    'obi-antenna-off': ObiAntennaOff;
  }
}
