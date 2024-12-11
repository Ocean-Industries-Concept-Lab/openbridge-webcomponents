import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-ais-sar-aircraft-helicopter-iec')
export class ObiAisSarAircraftHelicopterIec extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M11.5 22L11.5 16H12.5V22H11.5Z" fill="currentColor"/>
<path d="M9 13.8391V12.4249L3.86848 17.5564L4.57559 18.2635L9 13.8391Z" fill="currentColor"/>
<path d="M9 7.8387V7C9 6.81949 9.01594 6.64271 9.04649 6.47098L4.57552 2L3.86841 2.70711L9 7.8387Z" fill="currentColor"/>
<path d="M19.4248 18.2635L15 13.8387V12.4245L20.1319 17.5563L19.4248 18.2635Z" fill="currentColor"/>
<path d="M15 7.83909L20.1319 2.70715L19.4248 2.00005L14.9536 6.47131C14.9841 6.64294 15 6.81961 15 7V7.83909Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M14 15V7C14 5.89543 13.1046 5 12 5C10.8954 5 10 5.89543 10 7V15H14ZM12 4C10.3431 4 9 5.34315 9 7V16H15V7C15 5.34315 13.6569 4 12 4Z" fill="currentColor"/>
<path d="M9 19H15V20H9V19Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M11.5 22L11.5 16H12.5V22H11.5Z" style="fill: var(--element-active-color)"/>
<path d="M9 13.8391V12.4249L3.86848 17.5564L4.57559 18.2635L9 13.8391Z" style="fill: var(--element-active-color)"/>
<path d="M9 7.8387V7C9 6.81949 9.01594 6.64271 9.04649 6.47098L4.57552 2L3.86841 2.70711L9 7.8387Z" style="fill: var(--element-active-color)"/>
<path d="M19.4248 18.2635L15 13.8387V12.4245L20.1319 17.5563L19.4248 18.2635Z" style="fill: var(--element-active-color)"/>
<path d="M15 7.83909L20.1319 2.70715L19.4248 2.00005L14.9536 6.47131C14.9841 6.64294 15 6.81961 15 7V7.83909Z" style="fill: var(--element-active-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M14 15V7C14 5.89543 13.1046 5 12 5C10.8954 5 10 5.89543 10 7V15H14ZM12 4C10.3431 4 9 5.34315 9 7V16H15V7C15 5.34315 13.6569 4 12 4Z" style="fill: var(--element-active-color)"/>
<path d="M9 19H15V20H9V19Z" style="fill: var(--element-active-color)"/>
</svg>
`;

  override render() {
    return html`
      <div class="wrapper" >
        ${this.useCssColor? this.iconCss : this.icon}
      </div>
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
    'obi-ais-sar-aircraft-helicopter-iec': ObiAisSarAircraftHelicopterIec;
  }
}