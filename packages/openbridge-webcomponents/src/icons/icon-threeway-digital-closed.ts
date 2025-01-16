import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-threeway-digital-closed')
export class ObiThreewayDigitalClosed extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M17 21L7 21L11.5 15H12.5L17 21ZM3 17L3 7L9 11.5V12.5L3 17ZM21 7V17L15 12.5V11.5L21 7Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M17 21L7 21L11.5 15H12.5L17 21ZM3 17L3 7L9 11.5V12.5L3 17ZM21 7L21 17L15 12.5V11.5L21 7ZM7 22L17 22C17.824 22 18.2944 21.0592 17.8 20.4L13.3 14.4C13.1111 14.1482 12.8148 14 12.5 14H11.5C11.1852 14 10.8889 14.1482 10.7 14.4L6.2 20.4C5.70557 21.0592 6.17595 22 7 22ZM2 17L2 7C2 6.17595 2.94076 5.70557 3.6 6.2L9.6 10.7C9.85181 10.8889 10 11.1852 10 11.5V12.5C10 12.8148 9.85181 13.1111 9.6 13.3L3.6 17.8C2.94076 18.2944 2 17.824 2 17ZM22 7L22 17C22 17.824 21.0592 18.2944 20.4 17.8L14.4 13.3C14.1482 13.1111 14 12.8148 14 12.5V11.5C14 11.1852 14.1482 10.8889 14.4 10.7L20.4 6.2C21.0592 5.70557 22 6.17595 22 7Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M17 21L7 21L11.5 15H12.5L17 21ZM3 17L3 7L9 11.5V12.5L3 17ZM21 7V17L15 12.5V11.5L21 7Z" style="fill: var(--automation-device-primary-inverted-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M17 21L7 21L11.5 15H12.5L17 21ZM3 17L3 7L9 11.5V12.5L3 17ZM21 7L21 17L15 12.5V11.5L21 7ZM7 22L17 22C17.824 22 18.2944 21.0592 17.8 20.4L13.3 14.4C13.1111 14.1482 12.8148 14 12.5 14H11.5C11.1852 14 10.8889 14.1482 10.7 14.4L6.2 20.4C5.70557 21.0592 6.17595 22 7 22ZM2 17L2 7C2 6.17595 2.94076 5.70557 3.6 6.2L9.6 10.7C9.85181 10.8889 10 11.1852 10 11.5V12.5C10 12.8148 9.85181 13.1111 9.6 13.3L3.6 17.8C2.94076 18.2944 2 17.824 2 17ZM22 7L22 17C22 17.824 21.0592 18.2944 20.4 17.8L14.4 13.3C14.1482 13.1111 14 12.8148 14 12.5V11.5C14 11.1852 14.1482 10.8889 14.4 10.7L20.4 6.2C21.0592 5.70557 22 6.17595 22 7Z" style="fill: var(--undefined)"/>
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
    'obi-threeway-digital-closed': ObiThreewayDigitalClosed;
  }
}
