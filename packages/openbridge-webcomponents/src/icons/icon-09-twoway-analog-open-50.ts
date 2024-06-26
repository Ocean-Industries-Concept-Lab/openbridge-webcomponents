import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-09-twoway-analog-open-50')
export class Obi09TwowayAnalogOpen50 extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M2 5.87038V18.1293C2 18.5152 2.41861 18.7557 2.75194 18.5612L10.5714 13.9999H13.4286L21.2481 18.5612C21.5814 18.7557 22 18.5152 22 18.1293V5.87038C22 5.48449 21.5814 5.24405 21.2481 5.43849L13.4286 9.99986H10.5714L2.75193 5.43849C2.41861 5.24405 2 5.48449 2 5.87038Z" fill="currentColor"/>
<path d="M5 16.0921V7.9075L3 6.74083V17.2588L5 16.0921Z" fill="currentColor"/>
<path d="M19 16.0921V7.9075L21 6.74083V17.2588L19 16.0921Z" fill="currentColor"/>
<path d="M6 15.5088V8.49083L10.3011 10.9998H13.6989L18 8.49083V15.5088L13.6989 12.9998H10.3011L6 15.5088Z" fill="currentColor"/>
<path d="M9.8781 20.4141C9.68284 20.6094 9.68284 20.926 9.8781 21.1213C10.0734 21.3165 10.3899 21.3165 10.5852 21.1213L14.1207 17.5857C14.316 17.3905 14.316 17.0739 14.1207 16.8786C13.9255 16.6834 13.6089 16.6834 13.4136 16.8786L9.8781 20.4141Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M11.2923 21.8284L14.8278 18.2928C15.4136 17.707 15.4136 16.7573 14.8278 16.1715C14.2421 15.5857 13.2923 15.5857 12.7065 16.1715L9.17099 19.707C8.58521 20.2928 8.58521 21.2426 9.17099 21.8284C9.75678 22.4141 10.7065 22.4141 11.2923 21.8284ZM10.5852 21.1213L14.1207 17.5857C14.316 17.3905 14.316 17.0739 14.1207 16.8786C13.9255 16.6834 13.6089 16.6834 13.4136 16.8786L9.8781 20.4141C9.68284 20.6094 9.68284 20.926 9.8781 21.1213C10.0734 21.3165 10.3899 21.3165 10.5852 21.1213Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M2 5.87038V18.1293C2 18.5152 2.41861 18.7557 2.75194 18.5612L10.5714 13.9999H13.4286L21.2481 18.5612C21.5814 18.7557 22 18.5152 22 18.1293V5.87038C22 5.48449 21.5814 5.24405 21.2481 5.43849L13.4286 9.99986H10.5714L2.75193 5.43849C2.41861 5.24405 2 5.48449 2 5.87038Z" style="fill: var(--automation-device-tertiary-color)"/>
<path d="M5 16.0921V7.9075L3 6.74083V17.2588L5 16.0921Z" style="fill: var(--automation-device-secondary-color)"/>
<path d="M19 16.0921V7.9075L21 6.74083V17.2588L19 16.0921Z" style="fill: var(--automation-device-secondary-color)"/>
<path d="M6 15.5088V8.49083L10.3011 10.9998H13.6989L18 8.49083V15.5088L13.6989 12.9998H10.3011L6 15.5088Z" style="fill: var(--automation-device-primary-color)"/>
<path d="M9.8781 20.4141C9.68284 20.6094 9.68284 20.926 9.8781 21.1213C10.0734 21.3165 10.3899 21.3165 10.5852 21.1213L14.1207 17.5857C14.316 17.3905 14.316 17.0739 14.1207 16.8786C13.9255 16.6834 13.6089 16.6834 13.4136 16.8786L9.8781 20.4141Z" style="fill: var(--automation-device-primary-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M11.2923 21.8284L14.8278 18.2928C15.4136 17.707 15.4136 16.7573 14.8278 16.1715C14.2421 15.5857 13.2923 15.5857 12.7065 16.1715L9.17099 19.707C8.58521 20.2928 8.58521 21.2426 9.17099 21.8284C9.75678 22.4141 10.7065 22.4141 11.2923 21.8284ZM10.5852 21.1213L14.1207 17.5857C14.316 17.3905 14.316 17.0739 14.1207 16.8786C13.9255 16.6834 13.6089 16.6834 13.4136 16.8786L9.8781 20.4141C9.68284 20.6094 9.68284 20.926 9.8781 21.1213C10.0734 21.3165 10.3899 21.3165 10.5852 21.1213Z" style="fill: var(--element-active-color)"/>
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
    'obi-09-twoway-analog-open-50': Obi09TwowayAnalogOpen50;
  }
}
