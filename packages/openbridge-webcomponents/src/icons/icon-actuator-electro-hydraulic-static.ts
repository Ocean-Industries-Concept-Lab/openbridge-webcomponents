import {LitElement, html, css, svg} from 'lit';
import {property} from 'lit/decorators.js';
import {customElement} from '../decorator.js';

@customElement('obi-actuator-electro-hydraulic-static')
export class ObiActuatorElectroHydraulicStatic extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M12 24L12 12" stroke-linecap="round" stroke="currentColor"/>
<rect x="4" y="4" width="16" height="8" rx="1" fill="currentColor" stroke="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M12 24L12 12" stroke-linecap="round" style="stroke: var(--automation-symbol-static-background-color)"/>
<rect x="4" y="4" width="16" height="8" rx="1" style="fill: var(--automation-symbol-static-background-color); stroke: var(--automation-symbol-static-border-color)"/>
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
    'obi-actuator-electro-hydraulic-static': ObiActuatorElectroHydraulicStatic;
  }
}
