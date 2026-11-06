import {LitElement, html, css, svg} from 'lit';
import {property} from 'lit/decorators.js';
import {customElement} from '../decorator.js';

@customElement('obi-actuator-small-solenoid-open')
export class ObiActuatorSmallSolenoidOpen extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M12 7V12" stroke-linecap="round" stroke="currentColor"/>
<path d="M9 2C9 1.44772 9.44772 1 10 1H14C14.5523 1 15 1.44772 15 2V6C15 6.55228 14.5523 7 14 7H10C9.44772 7 9 6.55228 9 6V2Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M12 7V12" stroke-linecap="round" style="stroke: var(--on-line-color)"/>
<path d="M9 2C9 1.44772 9.44772 1 10 1H14C14.5523 1 15 1.44772 15 2V6C15 6.55228 14.5523 7 14 7H10C9.44772 7 9 6.55228 9 6V2Z" style="fill: var(--on-line-color)"/>
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
    'obi-actuator-small-solenoid-open': ObiActuatorSmallSolenoidOpen;
  }
}
