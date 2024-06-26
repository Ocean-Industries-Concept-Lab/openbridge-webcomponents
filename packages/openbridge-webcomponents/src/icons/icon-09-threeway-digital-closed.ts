import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-09-threeway-digital-closed')
export class Obi09ThreewayDigitalClosed extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M2.72361 6.3618C2.39116 6.19558 2 6.43733 2 6.80902V17.191C2 17.5627 2.39116 17.8044 2.72361 17.6382L9 14.5V9.5L2.72361 6.3618ZM9.5 9H14.5L17.6382 2.72361C17.8044 2.39116 17.5627 2 17.191 2H6.80902C6.43733 2 6.19558 2.39116 6.3618 2.72361L9.5 9ZM13.882 8L16.382 3H7.61803L10.118 8H13.882ZM15 14.5L21.2764 17.6382C21.6088 17.8044 22 17.5627 22 17.191V6.80902C22 6.43733 21.6088 6.19558 21.2764 6.3618L15 9.5V14.5ZM16 10.118V13.882L21 16.382V7.61803L16 10.118ZM8 10.118L3 7.61803V16.382L8 13.882V10.118ZM12 11C11.4477 11 11 11.4477 11 12V20C11 20.5523 11.4477 21 12 21C12.5523 21 13 20.5523 13 20V12C13 11.4477 12.5523 11 12 11Z" fill="currentColor"/>
<path d="M16.382 3L13.882 8H10.118L7.61803 3H16.382Z" fill="currentColor"/>
<path d="M16 13.882V10.118L21 7.61803V16.382L16 13.882Z" fill="currentColor"/>
<path d="M3 7.61803L8 10.118V13.882L3 16.382V7.61803Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M2.72361 6.3618C2.39116 6.19558 2 6.43733 2 6.80902V17.191C2 17.5627 2.39116 17.8044 2.72361 17.6382L9 14.5V9.5L2.72361 6.3618ZM9.5 9H14.5L17.6382 2.72361C17.8044 2.39116 17.5627 2 17.191 2H6.80902C6.43733 2 6.19558 2.39116 6.3618 2.72361L9.5 9ZM13.882 8L16.382 3H7.61803L10.118 8H13.882ZM15 14.5L21.2764 17.6382C21.6088 17.8044 22 17.5627 22 17.191V6.80902C22 6.43733 21.6088 6.19558 21.2764 6.3618L15 9.5V14.5ZM16 10.118V13.882L21 16.382V7.61803L16 10.118ZM8 10.118L3 7.61803V16.382L8 13.882V10.118ZM12 11C11.4477 11 11 11.4477 11 12V20C11 20.5523 11.4477 21 12 21C12.5523 21 13 20.5523 13 20V12C13 11.4477 12.5523 11 12 11Z" style="fill: var(--automation-device-tertiary-inverted-color)"/>
<path d="M16.382 3L13.882 8H10.118L7.61803 3H16.382Z" style="fill: var(--automation-device-primary-inverted-color)"/>
<path d="M16 13.882V10.118L21 7.61803V16.382L16 13.882Z" style="fill: var(--automation-device-primary-inverted-color)"/>
<path d="M3 7.61803L8 10.118V13.882L3 16.382V7.61803Z" style="fill: var(--automation-device-primary-inverted-color)"/>
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
    'obi-09-threeway-digital-closed': Obi09ThreewayDigitalClosed;
  }
}
