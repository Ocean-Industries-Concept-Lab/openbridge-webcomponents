import {LitElement, html, css, svg} from 'lit';
import {property} from 'lit/decorators.js';
import {customElement} from '../decorator.js';

@customElement('obi-actuator-small-electro-hydraulic-static')
export class ObiActuatorSmallElectroHydraulicStatic extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M12 5V12" stroke-linecap="round" stroke="currentColor"/>
<path d="M8 2C8 1.44772 8.44772 1 9 1H15C15.5523 1 16 1.44772 16 2V4C16 4.55228 15.5523 5 15 5H9C8.44772 5 8 4.55228 8 4V2Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M12 5V12" stroke-linecap="round" style="stroke: var(--automation-symbol-static-background-color)"/>
<path d="M8 2C8 1.44772 8.44772 1 9 1H15C15.5523 1 16 1.44772 16 2V4C16 4.55228 15.5523 5 15 5H9C8.44772 5 8 4.55228 8 4V2Z" style="fill: var(--automation-symbol-static-background-color)"/>
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
    'obi-actuator-small-electro-hydraulic-static': ObiActuatorSmallElectroHydraulicStatic;
  }
}
