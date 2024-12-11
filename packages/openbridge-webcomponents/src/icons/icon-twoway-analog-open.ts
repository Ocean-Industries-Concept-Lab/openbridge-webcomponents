import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-twoway-analog-open')
export class ObiTwowayAnalogOpen extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M11 11L3.5547 6.03645C2.89015 5.59342 2 6.06981 2 6.8685V19.1315C2 19.9302 2.89015 20.4066 3.5547 19.9635L11 15H13L20.4453 19.9635C21.1099 20.4066 22 19.9302 22 19.1315V6.8685C22 6.06981 21.1099 5.59342 20.4453 6.03645L13 11H11ZM3 6.8685L3 19.1315L10.6972 14H13.3028L21 19.1315V6.8685L13.3028 12H10.6972L3 6.8685Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M9.5 5H14.5C15.3284 5 16 4.32843 16 3.5C16 2.67157 15.3284 2 14.5 2H9.5C8.67157 2 8 2.67157 8 3.5C8 4.32843 8.67157 5 9.5 5ZM9.5 4L14.5 4C14.7761 4 15 3.77614 15 3.5C15 3.22386 14.7761 3 14.5 3L9.5 3C9.22386 3 9 3.22386 9 3.5C9 3.77614 9.22386 4 9.5 4Z" fill="currentColor"/>
<path d="M10.6972 12H13.3028L21 6.8685V19.1315L13.3028 14H10.6972L3 19.1315V6.8685L10.6972 12Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M9.5 4L14.5 4C14.7761 4 15 3.77614 15 3.5C15 3.22386 14.7761 3 14.5 3L9.5 3C9.22386 3 9 3.22386 9 3.5C9 3.77614 9.22386 4 9.5 4Z" fill="currentColor"/>
<path d="M14.5 4L9.5 4C9.22386 4 9 3.77614 9 3.5C9 3.22386 9.22386 3 9.5 3L14.5 3C14.7761 3 15 3.22386 15 3.5C15 3.77614 14.7761 4 14.5 4Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M11 11L3.5547 6.03645C2.89015 5.59342 2 6.06981 2 6.8685V19.1315C2 19.9302 2.89015 20.4066 3.5547 19.9635L11 15H13L20.4453 19.9635C21.1099 20.4066 22 19.9302 22 19.1315V6.8685C22 6.06981 21.1099 5.59342 20.4453 6.03645L13 11H11ZM3 6.8685L3 19.1315L10.6972 14H13.3028L21 19.1315V6.8685L13.3028 12H10.6972L3 6.8685Z" style="fill: var(--automation-device-tertiary-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M9.5 5H14.5C15.3284 5 16 4.32843 16 3.5C16 2.67157 15.3284 2 14.5 2H9.5C8.67157 2 8 2.67157 8 3.5C8 4.32843 8.67157 5 9.5 5ZM9.5 4L14.5 4C14.7761 4 15 3.77614 15 3.5C15 3.22386 14.7761 3 14.5 3L9.5 3C9.22386 3 9 3.22386 9 3.5C9 3.77614 9.22386 4 9.5 4Z" style="fill: var(--automation-device-tertiary-color)"/>
<path d="M10.6972 12H13.3028L21 6.8685V19.1315L13.3028 14H10.6972L3 19.1315V6.8685L10.6972 12Z" style="fill: var(--automation-device-primary-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M9.5 4L14.5 4C14.7761 4 15 3.77614 15 3.5C15 3.22386 14.7761 3 14.5 3L9.5 3C9.22386 3 9 3.22386 9 3.5C9 3.77614 9.22386 4 9.5 4Z" style="fill: var(--automation-device-primary-color)"/>
<path d="M14.5 4L9.5 4C9.22386 4 9 3.77614 9 3.5C9 3.22386 9.22386 3 9.5 3L14.5 3C14.7761 3 15 3.22386 15 3.5C15 3.77614 14.7761 4 14.5 4Z" style="fill: var(--automation-device-primary-color)"/>
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
    'obi-twoway-analog-open': ObiTwowayAnalogOpen;
  }
}
