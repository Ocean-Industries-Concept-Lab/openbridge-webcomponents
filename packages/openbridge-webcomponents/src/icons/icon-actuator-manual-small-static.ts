import {LitElement, html, css, svg} from 'lit';
import {property} from 'lit/decorators.js';
import {customElement} from '../decorator.js';

@customElement('obi-actuator-manual-small-static')
export class ObiActuatorManualSmallStatic extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M12 4V12" stroke-linecap="round" stroke="currentColor"/>
<path d="M8 2L16 2C16.5523 2 17 2.44772 17 3C17 3.55228 16.5523 4 16 4L8 4C7.44771 4 7 3.55228 7 3C7 2.44771 7.44771 2 8 2Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M12 4V12" stroke-linecap="round" style="stroke: var(--automation-symbol-static-background-color)"/>
<path d="M8 2L16 2C16.5523 2 17 2.44772 17 3C17 3.55228 16.5523 4 16 4L8 4C7.44771 4 7 3.55228 7 3C7 2.44771 7.44771 2 8 2Z" style="fill: var(--automation-symbol-static-background-color)"/>
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
    'obi-actuator-manual-small-static': ObiActuatorManualSmallStatic;
  }
}
