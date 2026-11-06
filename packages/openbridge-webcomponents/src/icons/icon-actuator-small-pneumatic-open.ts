import {LitElement, html, css, svg} from 'lit';
import {property} from 'lit/decorators.js';
import {customElement} from '../decorator.js';

@customElement('obi-actuator-small-pneumatic-open')
export class ObiActuatorSmallPneumaticOpen extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M12 5V12" stroke-linecap="round" stroke="currentColor"/>
<path d="M16 5C16 3.93913 15.5786 2.92172 14.8284 2.17157C14.0783 1.42143 13.0609 1 12 1C10.9391 1 9.92172 1.42143 9.17157 2.17157C8.42143 2.92172 8 3.93913 8 5L16 5Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M12 5V12" stroke-linecap="round" style="stroke: var(--on-line-color)"/>
<path d="M16 5C16 3.93913 15.5786 2.92172 14.8284 2.17157C14.0783 1.42143 13.0609 1 12 1C10.9391 1 9.92172 1.42143 9.17157 2.17157C8.42143 2.92172 8 3.93913 8 5L16 5Z" style="fill: var(--on-line-color)"/>
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
    'obi-actuator-small-pneumatic-open': ObiActuatorSmallPneumaticOpen;
  }
}
