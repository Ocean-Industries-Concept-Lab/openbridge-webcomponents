import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-09-twoway-analog-open-75')
export class Obi09TwowayAnalogOpen75 extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M2 5.87038V18.1293C2 18.5152 2.41861 18.7557 2.75194 18.5612L10.5714 13.9999H13.4286L21.2481 18.5612C21.5814 18.7557 22 18.5152 22 18.1293V5.87038C22 5.48449 21.5814 5.24405 21.2481 5.43849L13.4286 9.99986H10.5714L2.75193 5.43849C2.41861 5.24405 2 5.48449 2 5.87038Z" fill="currentColor"/>
<path d="M20 16.6754L21 17.2588V6.74083L20 7.32416V16.6754Z" fill="currentColor"/>
<path d="M4 7.32416L3 6.74083V17.2588L4 16.6754V7.32416Z" fill="currentColor"/>
<path d="M5 16.0921V7.9075L10.3011 10.9998H13.6989L19 7.9075V16.0921L13.6989 12.9998H10.3011L5 16.0921Z" fill="currentColor"/>
<path d="M9.45604 19.164C9.18931 19.2355 9.03102 19.5096 9.10249 19.7764C9.17396 20.0431 9.44813 20.2014 9.71486 20.1299L14.5445 18.8358C14.8112 18.7644 14.9695 18.4902 14.898 18.2235C14.8266 17.9567 14.5524 17.7984 14.2857 17.8699L9.45604 19.164Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M9.97368 21.0959L14.8033 19.8018C15.6035 19.5873 16.0784 18.7648 15.864 17.9646C15.6496 17.1644 14.8271 16.6896 14.0269 16.904L9.19722 18.1981C8.39702 18.4125 7.92215 19.235 8.13656 20.0352C8.35097 20.8354 9.17348 21.3103 9.97368 21.0959ZM9.71486 20.1299L14.5445 18.8358C14.8112 18.7644 14.9695 18.4902 14.898 18.2235C14.8266 17.9567 14.5524 17.7984 14.2857 17.8699L9.45604 19.164C9.18931 19.2355 9.03102 19.5096 9.10249 19.7764C9.17396 20.0431 9.44813 20.2014 9.71486 20.1299Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M2 5.87038V18.1293C2 18.5152 2.41861 18.7557 2.75194 18.5612L10.5714 13.9999H13.4286L21.2481 18.5612C21.5814 18.7557 22 18.5152 22 18.1293V5.87038C22 5.48449 21.5814 5.24405 21.2481 5.43849L13.4286 9.99986H10.5714L2.75193 5.43849C2.41861 5.24405 2 5.48449 2 5.87038Z" style="fill: var(--automation-device-tertiary-color)"/>
<path d="M20 16.6754L21 17.2588V6.74083L20 7.32416V16.6754Z" style="fill: var(--automation-device-secondary-color)"/>
<path d="M4 7.32416L3 6.74083V17.2588L4 16.6754V7.32416Z" style="fill: var(--automation-device-secondary-color)"/>
<path d="M5 16.0921V7.9075L10.3011 10.9998H13.6989L19 7.9075V16.0921L13.6989 12.9998H10.3011L5 16.0921Z" style="fill: var(--automation-device-primary-color)"/>
<path d="M9.45604 19.164C9.18931 19.2355 9.03102 19.5096 9.10249 19.7764C9.17396 20.0431 9.44813 20.2014 9.71486 20.1299L14.5445 18.8358C14.8112 18.7644 14.9695 18.4902 14.898 18.2235C14.8266 17.9567 14.5524 17.7984 14.2857 17.8699L9.45604 19.164Z" style="fill: var(--automation-device-primary-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M9.97368 21.0959L14.8033 19.8018C15.6035 19.5873 16.0784 18.7648 15.864 17.9646C15.6496 17.1644 14.8271 16.6896 14.0269 16.904L9.19722 18.1981C8.39702 18.4125 7.92215 19.235 8.13656 20.0352C8.35097 20.8354 9.17348 21.3103 9.97368 21.0959ZM9.71486 20.1299L14.5445 18.8358C14.8112 18.7644 14.9695 18.4902 14.898 18.2235C14.8266 17.9567 14.5524 17.7984 14.2857 17.8699L9.45604 19.164C9.18931 19.2355 9.03102 19.5096 9.10249 19.7764C9.17396 20.0431 9.44813 20.2014 9.71486 20.1299Z" style="fill: var(--automation-device-tertiary-color)"/>
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
    'obi-09-twoway-analog-open-75': Obi09TwowayAnalogOpen75;
  }
}
