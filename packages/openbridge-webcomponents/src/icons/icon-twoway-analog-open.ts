import {LitElement, html, css, svg} from 'lit';
import {property} from 'lit/decorators.js';
import {customElement} from '../decorator.js';

@customElement('obi-twoway-analog-open')
export class ObiTwowayAnalogOpen extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M20.4121 5.1546C21.0731 4.67431 22 5.14703 22 5.96417V18.0364C21.9998 18.8534 21.073 19.3254 20.4121 18.845L12.9541 13.4212H11.0459L3.58789 18.845C2.92702 19.3254 2.00022 18.8534 2 18.0364V5.96417C2 5.14703 2.92694 4.67432 3.58789 5.1546L10.8291 10.4212H13.1709L20.4121 5.1546Z" fill="currentColor" stroke="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M20.4121 5.1546C21.0731 4.67431 22 5.14703 22 5.96417V18.0364C21.9998 18.8534 21.073 19.3254 20.4121 18.845L12.9541 13.4212H11.0459L3.58789 18.845C2.92702 19.3254 2.00022 18.8534 2 18.0364V5.96417C2 5.14703 2.92694 4.67432 3.58789 5.1546L10.8291 10.4212H13.1709L20.4121 5.1546Z" style="fill: var(--automation-symbol-on-background-color); stroke: var(--automation-symbol-on-border-color)"/>
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
