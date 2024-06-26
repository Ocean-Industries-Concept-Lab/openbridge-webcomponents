import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-09-twoway-analog-open-25')
export class Obi09TwowayAnalogOpen25 extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M2 5.87038V18.1293C2 18.5152 2.41861 18.7557 2.75194 18.5612L10.5714 13.9999H13.4286L21.2481 18.5612C21.5814 18.7557 22 18.5152 22 18.1293V5.87038C22 5.48449 21.5814 5.24405 21.2481 5.43849L13.4286 9.99986H10.5714L2.75193 5.43849C2.41861 5.24405 2 5.48449 2 5.87038Z" fill="currentColor"/>
<path d="M6 15.5088V8.49083L3 6.74083V17.2588L6 15.5088Z" fill="currentColor"/>
<path d="M18 15.5088V8.49083L21 6.74083V17.2588L18 15.5088Z" fill="currentColor"/>
<path d="M7 14.9254V9.07416L10.3011 10.9998H13.6989L17 9.07417V14.9254L13.6989 12.9998H10.3011L7 14.9254Z" fill="currentColor"/>
<path d="M10.317 20.9149C10.1789 21.1541 10.2609 21.4599 10.5 21.5979C10.7391 21.736 11.0449 21.6541 11.183 21.4149L13.683 17.0848C13.8211 16.8457 13.7391 16.5399 13.5 16.4018C13.2609 16.2637 12.9551 16.3457 12.817 16.5848L10.317 20.9149Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M12.049 21.9149L14.549 17.5848C14.9633 16.8674 14.7174 15.95 14 15.5358C13.2826 15.1215 12.3652 15.3674 11.951 16.0848L9.45096 20.4149C9.03675 21.1324 9.28256 22.0498 10 22.464C10.7174 22.8782 11.6348 22.6324 12.049 21.9149ZM11.183 21.4149L13.683 17.0848C13.8211 16.8457 13.7391 16.5399 13.5 16.4018C13.2609 16.2637 12.9551 16.3457 12.817 16.5848L10.317 20.9149C10.1789 21.1541 10.2609 21.4599 10.5 21.5979C10.7391 21.736 11.0449 21.6541 11.183 21.4149Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M2 5.87038V18.1293C2 18.5152 2.41861 18.7557 2.75194 18.5612L10.5714 13.9999H13.4286L21.2481 18.5612C21.5814 18.7557 22 18.5152 22 18.1293V5.87038C22 5.48449 21.5814 5.24405 21.2481 5.43849L13.4286 9.99986H10.5714L2.75193 5.43849C2.41861 5.24405 2 5.48449 2 5.87038Z" style="fill: var(--automation-device-tertiary-color)"/>
<path d="M6 15.5088V8.49083L3 6.74083V17.2588L6 15.5088Z" style="fill: var(--automation-device-secondary-color)"/>
<path d="M18 15.5088V8.49083L21 6.74083V17.2588L18 15.5088Z" style="fill: var(--automation-device-secondary-color)"/>
<path d="M7 14.9254V9.07416L10.3011 10.9998H13.6989L17 9.07417V14.9254L13.6989 12.9998H10.3011L7 14.9254Z" style="fill: var(--automation-device-primary-color)"/>
<path d="M10.317 20.9149C10.1789 21.1541 10.2609 21.4599 10.5 21.5979C10.7391 21.736 11.0449 21.6541 11.183 21.4149L13.683 17.0848C13.8211 16.8457 13.7391 16.5399 13.5 16.4018C13.2609 16.2637 12.9551 16.3457 12.817 16.5848L10.317 20.9149Z" style="fill: var(--automation-device-primary-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M12.049 21.9149L14.549 17.5848C14.9633 16.8674 14.7174 15.95 14 15.5358C13.2826 15.1215 12.3652 15.3674 11.951 16.0848L9.45096 20.4149C9.03675 21.1324 9.28256 22.0498 10 22.464C10.7174 22.8782 11.6348 22.6324 12.049 21.9149ZM11.183 21.4149L13.683 17.0848C13.8211 16.8457 13.7391 16.5399 13.5 16.4018C13.2609 16.2637 12.9551 16.3457 12.817 16.5848L10.317 20.9149C10.1789 21.1541 10.2609 21.4599 10.5 21.5979C10.7391 21.736 11.0449 21.6541 11.183 21.4149Z" style="fill: var(--automation-device-tertiary-color)"/>
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
    'obi-09-twoway-analog-open-25': Obi09TwowayAnalogOpen25;
  }
}
