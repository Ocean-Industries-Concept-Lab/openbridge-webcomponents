import {LitElement, html, css, svg} from 'lit';
import {property} from 'lit/decorators.js';
import {customElement} from '../decorator.js';

@customElement('obi-actuator-electro-motor-static')
export class ObiActuatorElectroMotorStatic extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M12 24L12 16" stroke-linecap="round" stroke="currentColor"/>
<path d="M12 0.5C16.1421 0.5 19.5 3.85786 19.5 8C19.5 12.1421 16.1421 15.5 12 15.5C7.85786 15.5 4.5 12.1421 4.5 8C4.5 3.85786 7.85786 0.5 12 0.5Z" fill="currentColor" stroke="currentColor"/>
<path d="M11.2998 12L8.97676 5.2035H8.93076C8.93842 5.35683 8.94992 5.5715 8.96526 5.8475C8.98059 6.11583 8.99209 6.411 8.99976 6.733C9.01509 7.04733 9.02276 7.34633 9.02276 7.63V12H7.74626V3.789H9.72426L11.9438 10.2865H11.9783L14.2898 3.789H16.2563V12H14.9108V7.561C14.9108 7.30033 14.9146 7.0205 14.9223 6.7215C14.9376 6.41483 14.9491 6.12733 14.9568 5.859C14.9721 5.583 14.9836 5.36833 14.9913 5.215H14.9453L12.5418 12H11.2998Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M12 24L12 16" stroke-linecap="round" style="stroke: var(--automation-symbol-static-background-color)"/>
<path d="M12 0.5C16.1421 0.5 19.5 3.85786 19.5 8C19.5 12.1421 16.1421 15.5 12 15.5C7.85786 15.5 4.5 12.1421 4.5 8C4.5 3.85786 7.85786 0.5 12 0.5Z" style="fill: var(--automation-symbol-static-background-color); stroke: var(--automation-symbol-static-border-color)"/>
<path d="M11.2998 12L8.97676 5.2035H8.93076C8.93842 5.35683 8.94992 5.5715 8.96526 5.8475C8.98059 6.11583 8.99209 6.411 8.99976 6.733C9.01509 7.04733 9.02276 7.34633 9.02276 7.63V12H7.74626V3.789H9.72426L11.9438 10.2865H11.9783L14.2898 3.789H16.2563V12H14.9108V7.561C14.9108 7.30033 14.9146 7.0205 14.9223 6.7215C14.9376 6.41483 14.9491 6.12733 14.9568 5.859C14.9721 5.583 14.9836 5.36833 14.9913 5.215H14.9453L12.5418 12H11.2998Z" style="fill: var(--automation-symbol-static-border-color)"/>
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
    'obi-actuator-electro-motor-static': ObiActuatorElectroMotorStatic;
  }
}
