import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-light-searchlight-off')
export class ObiLightSearchlightOff extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M5.54729 8.37471L1.39441 4.22183L2.80862 2.80762L21.1934 21.1924L19.7792 22.6066L13 15.8275V20H16C16.5523 20 17 20.4477 17 21V22H7.00003V21C7.00003 20.4477 7.44774 20 8.00003 20H10V17.3509L8.30391 18.3302C7.82561 18.6063 7.21402 18.4424 6.93788 17.9641L2.93788 11.0359C2.66174 10.5577 2.82561 9.94606 3.30391 9.66992L5.54729 8.37471ZM11.4037 14.2311L8.16993 16.0981L5.16993 10.902L7.01139 9.83881L11.4037 14.2311Z" fill="currentColor"/>
<path d="M16.8192 11.1044L14.9898 12.1607L16.4539 13.6248L17.8303 12.8301L18.8305 14.5623L20.5625 13.5623L13.5625 1.43799L11.8305 2.43799L12.8303 4.16983L9.1334 6.30427L10.5975 7.76837L13.8192 5.90829L16.8192 11.1044Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M5.54729 8.37471L1.39441 4.22183L2.80862 2.80762L21.1934 21.1924L19.7792 22.6066L13 15.8275V20H16C16.5523 20 17 20.4477 17 21V22H7.00003V21C7.00003 20.4477 7.44774 20 8.00003 20H10V17.3509L8.30391 18.3302C7.82561 18.6063 7.21402 18.4424 6.93788 17.9641L2.93788 11.0359C2.66174 10.5577 2.82561 9.94606 3.30391 9.66992L5.54729 8.37471ZM11.4037 14.2311L8.16993 16.0981L5.16993 10.902L7.01139 9.83881L11.4037 14.2311Z" style="fill: var(--element-active-color)"/>
<path d="M16.8192 11.1044L14.9898 12.1607L16.4539 13.6248L17.8303 12.8301L18.8305 14.5623L20.5625 13.5623L13.5625 1.43799L11.8305 2.43799L12.8303 4.16983L9.1334 6.30427L10.5975 7.76837L13.8192 5.90829L16.8192 11.1044Z" style="fill: var(--element-active-color)"/>
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
    'obi-light-searchlight-off': ObiLightSearchlightOff;
  }
}
