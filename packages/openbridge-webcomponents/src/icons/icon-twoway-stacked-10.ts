import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-twoway-stacked-10')
export class ObiTwowayStacked10 extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M11 0V10L3.5547 5.03647C2.89014 4.59343 2 5.06982 2 5.86852V18.1315C2 18.9302 2.89015 19.4066 3.5547 18.9635L11 14H13L20.4453 18.9635C21.1099 19.4066 22 18.9302 22 18.1315V5.86852C22 5.06982 21.1099 4.59343 20.4453 5.03647L13 10V0H11ZM9 14.1315V9.86852L3 5.86852L3 18.1315L9 14.1315ZM10 13.4648V10.5352L10.6972 11H13.3028L14 10.5352V13.4648L13.3028 13H10.6972L10 13.4648ZM15 14.1315V9.86852L21 5.86852L21 18.1315L15 14.1315Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M9 14.1311L3 18.1311L3 5.86816L9 9.86817V14.1311ZM15 9.86816V14.1311L21 18.1311L21 5.86816M21 5.86816L15 9.86816L21 5.86816Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M10 13.4648L10.6972 13H13.3028L14 13.4648V10.5352L13.3028 11H10.6972L10 10.5352V13.4648Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M11 0V10L3.5547 5.03647C2.89014 4.59343 2 5.06982 2 5.86852V18.1315C2 18.9302 2.89015 19.4066 3.5547 18.9635L11 14H13L20.4453 18.9635C21.1099 19.4066 22 18.9302 22 18.1315V5.86852C22 5.06982 21.1099 4.59343 20.4453 5.03647L13 10V0H11ZM9 14.1315V9.86852L3 5.86852L3 18.1315L9 14.1315ZM10 13.4648V10.5352L10.6972 11H13.3028L14 10.5352V13.4648L13.3028 13H10.6972L10 13.4648ZM15 14.1315V9.86852L21 5.86852L21 18.1315L15 14.1315Z" style="fill: var(--automation-device-tertiary-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M9 14.1311L3 18.1311L3 5.86816L9 9.86817V14.1311ZM15 9.86816V14.1311L21 18.1311L21 5.86816M21 5.86816L15 9.86816L21 5.86816Z" style="fill: var(--automation-device-secondary-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M10 13.4648L10.6972 13H13.3028L14 13.4648V10.5352L13.3028 11H10.6972L10 10.5352V13.4648Z" style="fill: var(--automation-device-primary-color)"/>
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
    'obi-twoway-stacked-10': ObiTwowayStacked10;
  }
}
