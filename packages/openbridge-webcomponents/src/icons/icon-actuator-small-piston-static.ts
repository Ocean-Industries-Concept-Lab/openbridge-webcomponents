import {LitElement, html, css, svg} from 'lit';
import {property} from 'lit/decorators.js';
import {customElement} from '../decorator.js';

@customElement('obi-actuator-small-piston-static')
export class ObiActuatorSmallPistonStatic extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M12 7V12" stroke-linecap="round" stroke="currentColor"/>
<path d="M15 1H9C8.44772 1 8 1.44772 8 2V3H16V2C16 1.44772 15.5523 1 15 1Z" fill="currentColor"/>
<path d="M9 7H15C15.5523 7 16 6.55228 16 6V5H8V6C8 6.55228 8.44772 7 9 7Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M12 7V12" stroke-linecap="round" style="stroke: var(--automation-symbol-static-background-color)"/>
<path d="M15 1H9C8.44772 1 8 1.44772 8 2V3H16V2C16 1.44772 15.5523 1 15 1Z" style="fill: var(--automation-symbol-static-background-color)"/>
<path d="M9 7H15C15.5523 7 16 6.55228 16 6V5H8V6C8 6.55228 8.44772 7 9 7Z" style="fill: var(--automation-symbol-static-background-color)"/>
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
    'obi-actuator-small-piston-static': ObiActuatorSmallPistonStatic;
  }
}
