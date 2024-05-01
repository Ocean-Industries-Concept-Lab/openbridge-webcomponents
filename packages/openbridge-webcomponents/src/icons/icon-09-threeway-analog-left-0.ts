import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-09-threeway-analog-left-0')
export class Obi09ThreewayAnalogLeft0 extends LitElement {
  @property({type: Boolean, attribute: 'use-css-color'}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M6.80902 2H17.191C17.5627 2 17.8044 2.39116 17.6382 2.72361L14 10L21.2764 6.3618C21.6088 6.19558 22 6.43733 22 6.80902V17.191C22 17.5627 21.6088 17.8044 21.2764 17.6382L14 14H10L2.72361 17.6382C2.39116 17.8044 2 17.5627 2 17.191V6.80902C2 6.43733 2.39116 6.19558 2.72361 6.3618L10 10L6.3618 2.72361C6.19558 2.39116 6.43733 2 6.80902 2Z" fill="currentColor"/>
<path d="M14 12.8819L21 16.3819V7.61792L14 11.1179V12.8819Z" fill="currentColor"/>
<path d="M16.3811 3L13 9.76224V13H9.7637L3 16.3819V7.61792L9.76416 11H11V9.76562L7.61719 3H16.3811Z" fill="currentColor"/>
<path d="M11.5001 21.5002C11.5001 21.7763 11.7239 22.0002 12.0001 22.0002C12.2762 22.0002 12.5001 21.7763 12.5001 21.5002V16.5002C12.5001 16.224 12.2762 16.0002 12.0001 16.0002C11.7239 16.0002 11.5001 16.224 11.5001 16.5002V21.5002Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M13.5001 21.5002V16.5002C13.5001 15.6717 12.8285 15.0002 12.0001 15.0002C11.1717 15.0002 10.5001 15.6717 10.5001 16.5002V21.5002C10.5001 22.3286 11.1717 23.0002 12.0001 23.0002C12.8285 23.0002 13.5001 22.3286 13.5001 21.5002ZM12.5001 21.5002V16.5002C12.5001 16.224 12.2762 16.0002 12.0001 16.0002C11.7239 16.0002 11.5001 16.224 11.5001 16.5002V21.5002C11.5001 21.7763 11.7239 22.0002 12.0001 22.0002C12.2762 22.0002 12.5001 21.7763 12.5001 21.5002Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M6.80902 2H17.191C17.5627 2 17.8044 2.39116 17.6382 2.72361L14 10L21.2764 6.3618C21.6088 6.19558 22 6.43733 22 6.80902V17.191C22 17.5627 21.6088 17.8044 21.2764 17.6382L14 14H10L2.72361 17.6382C2.39116 17.8044 2 17.5627 2 17.191V6.80902C2 6.43733 2.39116 6.19558 2.72361 6.3618L10 10L6.3618 2.72361C6.19558 2.39116 6.43733 2 6.80902 2Z" style="fill: var(--automation-device-tertiary-color)"/>
<path d="M14 12.8819L21 16.3819V7.61792L14 11.1179V12.8819Z" style="fill: var(--automation-device-secondary-color)"/>
<path d="M16.3811 3L13 9.76224V13H9.7637L3 16.3819V7.61792L9.76416 11H11V9.76562L7.61719 3H16.3811Z" style="fill: var(--automation-device-primary-color)"/>
<path d="M11.5001 21.5002C11.5001 21.7763 11.7239 22.0002 12.0001 22.0002C12.2762 22.0002 12.5001 21.7763 12.5001 21.5002V16.5002C12.5001 16.224 12.2762 16.0002 12.0001 16.0002C11.7239 16.0002 11.5001 16.224 11.5001 16.5002V21.5002Z" style="fill: var(--automation-device-primary-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M13.5001 21.5002V16.5002C13.5001 15.6717 12.8285 15.0002 12.0001 15.0002C11.1717 15.0002 10.5001 15.6717 10.5001 16.5002V21.5002C10.5001 22.3286 11.1717 23.0002 12.0001 23.0002C12.8285 23.0002 13.5001 22.3286 13.5001 21.5002ZM12.5001 21.5002V16.5002C12.5001 16.224 12.2762 16.0002 12.0001 16.0002C11.7239 16.0002 11.5001 16.224 11.5001 16.5002V21.5002C11.5001 21.7763 11.7239 22.0002 12.0001 22.0002C12.2762 22.0002 12.5001 21.7763 12.5001 21.5002Z" style="fill: var(--automation-device-tertiary-color)"/>
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
    'obi-09-threeway-analog-left-0': Obi09ThreewayAnalogLeft0;
  }
}
