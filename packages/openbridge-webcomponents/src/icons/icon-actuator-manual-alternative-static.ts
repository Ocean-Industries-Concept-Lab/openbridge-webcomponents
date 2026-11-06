import {LitElement, html, css, svg} from 'lit';
import {property} from 'lit/decorators.js';
import {customElement} from '../decorator.js';

@customElement('obi-actuator-manual-alternative-static')
export class ObiActuatorManualAlternativeStatic extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M12 24V8" stroke-linecap="round" stroke="currentColor"/>
<path d="M17 13V9H7C5.89543 9 5 8.10457 5 7V3C5 2.44772 5.44772 2 6 2C6.55228 2 7 2.44772 7 3V7H17C18.1046 7 19 7.89543 19 9V13C19 13.5523 18.5523 14 18 14C17.4477 14 17 13.5523 17 13Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M12 24V8" stroke-linecap="round" style="stroke: var(--automation-symbol-static-background-color)"/>
<path d="M17 13V9H7C5.89543 9 5 8.10457 5 7V3C5 2.44772 5.44772 2 6 2C6.55228 2 7 2.44772 7 3V7H17C18.1046 7 19 7.89543 19 9V13C19 13.5523 18.5523 14 18 14C17.4477 14 17 13.5523 17 13Z" style="fill: var(--automation-symbol-static-background-color)"/>
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
    'obi-actuator-manual-alternative-static': ObiActuatorManualAlternativeStatic;
  }
}
