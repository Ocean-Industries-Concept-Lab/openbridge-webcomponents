import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-ais-sar-aircraft-helicopter-iec')
export class ObiAisSarAircraftHelicopterIec extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M11.4998 22L11.4998 16H12.4998V22H11.4998Z" fill="currentColor"/>
<path d="M8.99976 13.8391V12.4249L3.86824 17.5564L4.57535 18.2635L8.99976 13.8391Z" fill="currentColor"/>
<path d="M8.99976 7.8387V7C8.99976 6.81949 9.0157 6.64271 9.04625 6.47098L4.57527 2L3.86816 2.70711L8.99976 7.8387Z" fill="currentColor"/>
<path d="M19.4245 18.2635L14.9998 13.8387V12.4245L20.1316 17.5563L19.4245 18.2635Z" fill="currentColor"/>
<path d="M14.9998 7.83909L20.1317 2.70715L19.4246 2.00005L14.9533 6.47131C14.9838 6.64294 14.9998 6.81961 14.9998 7V7.83909Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M13.9998 15V7C13.9998 5.89543 13.1043 5 11.9998 5C10.8952 5 9.99976 5.89543 9.99976 7V15H13.9998ZM11.9998 4C10.3429 4 8.99976 5.34315 8.99976 7V16H14.9998V7C14.9998 5.34315 13.6566 4 11.9998 4Z" fill="currentColor"/>
<path d="M8.99976 19H14.9998V20H8.99976V19Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M11.4998 22L11.4998 16H12.4998V22H11.4998Z" style="fill: var(--element-active-color)"/>
<path d="M8.99976 13.8391V12.4249L3.86824 17.5564L4.57535 18.2635L8.99976 13.8391Z" style="fill: var(--element-active-color)"/>
<path d="M8.99976 7.8387V7C8.99976 6.81949 9.0157 6.64271 9.04625 6.47098L4.57527 2L3.86816 2.70711L8.99976 7.8387Z" style="fill: var(--element-active-color)"/>
<path d="M19.4245 18.2635L14.9998 13.8387V12.4245L20.1316 17.5563L19.4245 18.2635Z" style="fill: var(--element-active-color)"/>
<path d="M14.9998 7.83909L20.1317 2.70715L19.4246 2.00005L14.9533 6.47131C14.9838 6.64294 14.9998 6.81961 14.9998 7V7.83909Z" style="fill: var(--element-active-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M13.9998 15V7C13.9998 5.89543 13.1043 5 11.9998 5C10.8952 5 9.99976 5.89543 9.99976 7V15H13.9998ZM11.9998 4C10.3429 4 8.99976 5.34315 8.99976 7V16H14.9998V7C14.9998 5.34315 13.6566 4 11.9998 4Z" style="fill: var(--element-active-color)"/>
<path d="M8.99976 19H14.9998V20H8.99976V19Z" style="fill: var(--element-active-color)"/>
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
    'obi-ais-sar-aircraft-helicopter-iec': ObiAisSarAircraftHelicopterIec;
  }
}