import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-09-threeway-analog-right-100')
export class Obi09ThreewayAnalogRight100 extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M6.80902 2H17.191C17.5627 2 17.8044 2.39116 17.6382 2.72361L14 10L21.2764 6.3618C21.6088 6.19558 22 6.43733 22 6.80902V17.191C22 17.5627 21.6088 17.8044 21.2764 17.6382L14 14H10L2.72361 17.6382C2.39116 17.8044 2 17.5627 2 17.191V6.80902C2 6.43733 2.39116 6.19558 2.72361 6.3618L10 10L6.3618 2.72361C6.19558 2.39116 6.43733 2 6.80902 2Z" fill="currentColor"/>
<path d="M10 11.1179L3 7.6179L3 16.3818L10 12.8818V11.1179Z" fill="currentColor"/>
<path d="M16.3811 3L13 9.76224V11H14.2358L21 7.61792V16.3819L14.2363 13H11V9.76562L7.61719 3H16.3811Z" fill="currentColor"/>
<path d="M11.5 21.5C11.5 21.7761 11.7239 22 12 22C12.2761 22 12.5 21.7761 12.5 21.5V16.5C12.5 16.2239 12.2761 16 12 16C11.7239 16 11.5 16.2239 11.5 16.5V21.5Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M13.5 21.5V16.5C13.5 15.6716 12.8284 15 12 15C11.1716 15 10.5 15.6716 10.5 16.5V21.5C10.5 22.3284 11.1716 23 12 23C12.8284 23 13.5 22.3284 13.5 21.5ZM12.5 21.5V16.5C12.5 16.2239 12.2761 16 12 16C11.7239 16 11.5 16.2239 11.5 16.5V21.5C11.5 21.7761 11.7239 22 12 22C12.2761 22 12.5 21.7761 12.5 21.5Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M6.80902 2H17.191C17.5627 2 17.8044 2.39116 17.6382 2.72361L14 10L21.2764 6.3618C21.6088 6.19558 22 6.43733 22 6.80902V17.191C22 17.5627 21.6088 17.8044 21.2764 17.6382L14 14H10L2.72361 17.6382C2.39116 17.8044 2 17.5627 2 17.191V6.80902C2 6.43733 2.39116 6.19558 2.72361 6.3618L10 10L6.3618 2.72361C6.19558 2.39116 6.43733 2 6.80902 2Z" style="fill: var(--automation-device-tertiary-color)"/>
<path d="M10 11.1179L3 7.6179L3 16.3818L10 12.8818V11.1179Z" style="fill: var(--automation-device-secondary-color)"/>
<path d="M16.3811 3L13 9.76224V11H14.2358L21 7.61792V16.3819L14.2363 13H11V9.76562L7.61719 3H16.3811Z" style="fill: var(--automation-device-primary-color)"/>
<path d="M11.5 21.5C11.5 21.7761 11.7239 22 12 22C12.2761 22 12.5 21.7761 12.5 21.5V16.5C12.5 16.2239 12.2761 16 12 16C11.7239 16 11.5 16.2239 11.5 16.5V21.5Z" style="fill: var(--automation-device-primary-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M13.5 21.5V16.5C13.5 15.6716 12.8284 15 12 15C11.1716 15 10.5 15.6716 10.5 16.5V21.5C10.5 22.3284 11.1716 23 12 23C12.8284 23 13.5 22.3284 13.5 21.5ZM12.5 21.5V16.5C12.5 16.2239 12.2761 16 12 16C11.7239 16 11.5 16.2239 11.5 16.5V21.5C11.5 21.7761 11.7239 22 12 22C12.2761 22 12.5 21.7761 12.5 21.5Z" style="fill: var(--automation-device-tertiary-color)"/>
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
    'obi-09-threeway-analog-right-100': Obi09ThreewayAnalogRight100;
  }
}
