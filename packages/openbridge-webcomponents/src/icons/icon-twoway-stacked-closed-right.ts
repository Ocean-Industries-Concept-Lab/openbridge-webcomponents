import {LitElement, html, css, svg} from 'lit';
import {property} from 'lit/decorators.js';
import {customElement} from '../decorator.js';

@customElement('obi-twoway-stacked-closed-right')
export class ObiTwowayStackedClosedRight extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M13 0V14H11L3.5547 18.9635C2.89014 19.4066 2 18.9302 2 18.1315V5.86852C2 5.06982 2.89015 4.59343 3.5547 5.03647L11 10V0H13ZM11 11.25V12.75L3 18.1315V5.86852L11 11.25Z" fill-rule="evenodd" clip-rule="evenodd" fill="currentColor"/>
<path d="M15 10.4999L21 5.99986V17.9999L15 13.4999V10.4999Z" fill-rule="evenodd" clip-rule="evenodd" fill="currentColor"/>
<path d="M15 10.4999L21 5.99986V17.9999L15 13.4999V10.4999ZM14 9.99986L20.4 5.19986C21.0592 4.70544 22 5.17582 22 5.99986V17.9999C22 18.8239 21.0592 19.2943 20.4 18.7999L14 13.9999V9.99986Z" fill-rule="evenodd" clip-rule="evenodd" fill="currentColor"/>
<path d="M11.0001 12.7496L3 18.1311L3 5.86816L11 11.2496L11.0001 12.7496Z" fill-rule="evenodd" clip-rule="evenodd" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M13 0V14H11L3.5547 18.9635C2.89014 19.4066 2 18.9302 2 18.1315V5.86852C2 5.06982 2.89015 4.59343 3.5547 5.03647L11 10V0H13ZM11 11.25V12.75L3 18.1315V5.86852L11 11.25Z" fill-rule="evenodd" clip-rule="evenodd" style="fill: var(--automation-symbol-on-border-color)"/>
<path d="M15 10.4999L21 5.99986V17.9999L15 13.4999V10.4999Z" fill-rule="evenodd" clip-rule="evenodd" style="fill: var(--automation-symbol-on-border-color)"/>
<path d="M15 10.4999L21 5.99986V17.9999L15 13.4999V10.4999ZM14 9.99986L20.4 5.19986C21.0592 4.70544 22 5.17582 22 5.99986V17.9999C22 18.8239 21.0592 19.2943 20.4 18.7999L14 13.9999V9.99986Z" fill-rule="evenodd" clip-rule="evenodd" style="fill: var(--automation-symbol-static-background-color)"/>
<path d="M11.0001 12.7496L3 18.1311L3 5.86816L11 11.2496L11.0001 12.7496Z" fill-rule="evenodd" clip-rule="evenodd" style="fill: var(--automation-symbol-on-background-color)"/>
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
    'obi-twoway-stacked-closed-right': ObiTwowayStackedClosedRight;
  }
}
