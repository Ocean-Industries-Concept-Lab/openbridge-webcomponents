import {LitElement, html, css, svg} from 'lit';
import {property} from 'lit/decorators.js';
import {customElement} from '../decorator.js';

@customElement('obi-actuator-pneumatic-static')
export class ObiActuatorPneumaticStatic extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="25" viewBox="0 0 24 25" fill="currentColor" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
<path d="M12 24L12 12" stroke-linecap="round" stroke="currentColor"/>
<use xlink:href="#stroke0_15291_1680" fill="currentColor"/>
<mask id="stroke1_15291_1680" fill="white">
<use xlink:href="#stroke0_15291_1680"/>
</mask>
<path d="M21.2388 8.17317C21.6135 9.07783 21.8526 10.0309 21.95 11.0017C22.0052 11.5512 21.5523 12 21 12H12L3 12C2.44772 12 1.99482 11.5512 2.04996 11.0017C2.14736 10.0309 2.38648 9.07783 2.7612 8.17317C3.26375 6.95991 4.00035 5.85752 4.92893 4.92893C5.85752 4.00035 6.95991 3.26375 8.17317 2.7612C9.38642 2.25866 10.6868 2 12 2C13.3132 2 14.6136 2.25866 15.8268 2.7612C17.0401 3.26375 18.1425 4.00035 19.0711 4.92893C19.9997 5.85752 20.7362 6.95991 21.2388 8.17317Z" stroke-width="2" stroke="currentColor" mask="url(#stroke1_15291_1680)"/>
<defs>
<path id="stroke0_15291_1680" d="M21 12C21.5523 12 22.0052 11.5512 21.95 11.0017C21.8526 10.0309 21.6135 9.07783 21.2388 8.17317C20.7362 6.95991 19.9997 5.85752 19.0711 4.92893C18.1425 4.00035 17.0401 3.26375 15.8268 2.7612C14.6136 2.25866 13.3132 2 12 2C10.6868 2 9.38642 2.25866 8.17317 2.7612C6.95991 3.26375 5.85752 4.00035 4.92893 4.92893C4.00035 5.85752 3.26375 6.95991 2.7612 8.17317C2.38648 9.07783 2.14736 10.0309 2.04996 11.0017C1.99482 11.5512 2.44772 12 3 12L12 12H21Z"/>
</defs>
</svg>
`;

  private iconCss = svg`<svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
<path d="M12 24L12 12" stroke-linecap="round" style="stroke: var(--automation-symbol-static-background-color)"/>
<use xlink:href="#stroke0_15291_1680" style="fill: var(--automation-symbol-static-background-color)"/>
<mask id="stroke1_15291_1680" fill="white">
<use xlink:href="#stroke0_15291_1680"/>
</mask>
<path d="M21.2388 8.17317C21.6135 9.07783 21.8526 10.0309 21.95 11.0017C22.0052 11.5512 21.5523 12 21 12H12L3 12C2.44772 12 1.99482 11.5512 2.04996 11.0017C2.14736 10.0309 2.38648 9.07783 2.7612 8.17317C3.26375 6.95991 4.00035 5.85752 4.92893 4.92893C5.85752 4.00035 6.95991 3.26375 8.17317 2.7612C9.38642 2.25866 10.6868 2 12 2C13.3132 2 14.6136 2.25866 15.8268 2.7612C17.0401 3.26375 18.1425 4.00035 19.0711 4.92893C19.9997 5.85752 20.7362 6.95991 21.2388 8.17317Z" stroke-width="2" style="stroke: var(--automation-symbol-static-border-color)" mask="url(#stroke1_15291_1680)"/>
<defs>
<path id="stroke0_15291_1680" d="M21 12C21.5523 12 22.0052 11.5512 21.95 11.0017C21.8526 10.0309 21.6135 9.07783 21.2388 8.17317C20.7362 6.95991 19.9997 5.85752 19.0711 4.92893C18.1425 4.00035 17.0401 3.26375 15.8268 2.7612C14.6136 2.25866 13.3132 2 12 2C10.6868 2 9.38642 2.25866 8.17317 2.7612C6.95991 3.26375 5.85752 4.00035 4.92893 4.92893C4.00035 5.85752 3.26375 6.95991 2.7612 8.17317C2.38648 9.07783 2.14736 10.0309 2.04996 11.0017C1.99482 11.5512 2.44772 12 3 12L12 12H21Z"/>
</defs>
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
    'obi-actuator-pneumatic-static': ObiActuatorPneumaticStatic;
  }
}
