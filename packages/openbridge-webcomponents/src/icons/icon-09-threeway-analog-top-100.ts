import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-09-threeway-analog-top-100')
export class Obi09ThreewayAnalogTop100 extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M6.80902 2H17.191C17.5627 2 17.8044 2.39116 17.6382 2.72361L14 10L21.2764 6.3618C21.6088 6.19558 22 6.43733 22 6.80902V17.191C22 17.5627 21.6088 17.8044 21.2764 17.6382L14 14H10L2.72361 17.6382C2.39116 17.8044 2 17.5627 2 17.191V6.80902C2 6.43733 2.39116 6.19558 2.72361 6.3618L10 10L6.3618 2.72361C6.19558 2.39116 6.43733 2 6.80902 2Z" fill="currentColor"/>
<path d="M10 12.8819L3 16.3819V7.61792L10 11.1179V12.8819Z" fill="currentColor"/>
<path d="M7.61914 3L11.0003 9.76224V13H14.2366L21.0003 16.3819V7.61792L14.2361 11H13.0003V9.76562L16.3831 3H7.61914Z" fill="currentColor"/>
<path d="M12.5 16.5002C12.5 16.2241 12.2761 16.0002 12 16.0002C11.7239 16.0002 11.5 16.2241 11.5 16.5002V21.5002C11.5 21.7764 11.7239 22.0002 12 22.0002C12.2761 22.0002 12.5 21.7764 12.5 21.5002L12.5 16.5002Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M10.5 16.5002V21.5002C10.5 22.3287 11.1716 23.0002 12 23.0002C12.8284 23.0002 13.5 22.3287 13.5 21.5002L13.5 16.5002C13.5 15.6718 12.8284 15.0002 12 15.0002C11.1716 15.0002 10.5 15.6718 10.5 16.5002ZM11.5 16.5002V21.5002C11.5 21.7764 11.7239 22.0002 12 22.0002C12.2761 22.0002 12.5 21.7764 12.5 21.5002L12.5 16.5002C12.5 16.2241 12.2761 16.0002 12 16.0002C11.7239 16.0002 11.5 16.2241 11.5 16.5002Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M6.80902 2H17.191C17.5627 2 17.8044 2.39116 17.6382 2.72361L14 10L21.2764 6.3618C21.6088 6.19558 22 6.43733 22 6.80902V17.191C22 17.5627 21.6088 17.8044 21.2764 17.6382L14 14H10L2.72361 17.6382C2.39116 17.8044 2 17.5627 2 17.191V6.80902C2 6.43733 2.39116 6.19558 2.72361 6.3618L10 10L6.3618 2.72361C6.19558 2.39116 6.43733 2 6.80902 2Z" style="fill: var(--automation-device-tertiary-color)"/>
<path d="M10 12.8819L3 16.3819V7.61792L10 11.1179V12.8819Z" style="fill: var(--automation-device-secondary-color)"/>
<path d="M7.61914 3L11.0003 9.76224V13H14.2366L21.0003 16.3819V7.61792L14.2361 11H13.0003V9.76562L16.3831 3H7.61914Z" style="fill: var(--automation-device-primary-color)"/>
<path d="M12.5 16.5002C12.5 16.2241 12.2761 16.0002 12 16.0002C11.7239 16.0002 11.5 16.2241 11.5 16.5002V21.5002C11.5 21.7764 11.7239 22.0002 12 22.0002C12.2761 22.0002 12.5 21.7764 12.5 21.5002L12.5 16.5002Z" style="fill: var(--automation-device-primary-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M10.5 16.5002V21.5002C10.5 22.3287 11.1716 23.0002 12 23.0002C12.8284 23.0002 13.5 22.3287 13.5 21.5002L13.5 16.5002C13.5 15.6718 12.8284 15.0002 12 15.0002C11.1716 15.0002 10.5 15.6718 10.5 16.5002ZM11.5 16.5002V21.5002C11.5 21.7764 11.7239 22.0002 12 22.0002C12.2761 22.0002 12.5 21.7764 12.5 21.5002L12.5 16.5002C12.5 16.2241 12.2761 16.0002 12 16.0002C11.7239 16.0002 11.5 16.2241 11.5 16.5002Z" style="fill: var(--automation-device-tertiary-color)"/>
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
    'obi-09-threeway-analog-top-100': Obi09ThreewayAnalogTop100;
  }
}
