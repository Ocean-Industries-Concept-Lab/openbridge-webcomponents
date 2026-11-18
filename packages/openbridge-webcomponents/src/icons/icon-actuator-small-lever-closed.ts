import {LitElement, html, css, svg} from 'lit';
import {property} from 'lit/decorators.js';
import {customElement} from '../decorator.js';

@customElement('obi-actuator-small-lever-closed')
export class ObiActuatorSmallLeverClosed extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M11.5 12C11.5 12.2762 11.7239 12.5 12 12.5C12.2761 12.5 12.5 12.2762 12.5 12H12H11.5ZM12 3H11.5V12H12H12.5V3H12Z" fill="currentColor"/>
<path d="M17.0004 3C17.4146 3 17.7504 3.33579 17.7504 3.75C17.7504 4.16421 17.4146 4.5 17.0004 4.5H12V3H17.0004Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M11.5 12C11.5 12.2762 11.7239 12.5 12 12.5C12.2761 12.5 12.5 12.2762 12.5 12H12H11.5ZM12 3H11.5V12H12H12.5V3H12Z" style="fill: var(--automation-symbol-off-line-color)"/>
<path d="M17.0004 3C17.4146 3 17.7504 3.33579 17.7504 3.75C17.7504 4.16421 17.4146 4.5 17.0004 4.5H12V3H17.0004Z" style="fill: var(--automation-symbol-off-line-color)"/>
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
    'obi-actuator-small-lever-closed': ObiActuatorSmallLeverClosed;
  }
}
