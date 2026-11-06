import {LitElement, html, css, svg} from 'lit';
import {property} from 'lit/decorators.js';
import {customElement} from '../decorator.js';

@customElement('obi-actuator-piston-closed')
export class ObiActuatorPistonClosed extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="25" viewBox="0 0 24 25" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M12 24L12 13" stroke-linecap="round" stroke="currentColor"/>
<path d="M4 4C4 3.44772 4.44772 3 5 3H19C19.5523 3 20 3.44772 20 4V8V12C20 12.5523 19.5523 13 19 13H5C4.44772 13 4 12.5523 4 12V8V4Z" fill="currentColor"/>
<mask id="stroke0_15289_1531" fill="white">
<path d="M4 4C4 3.44772 4.44772 3 5 3H19C19.5523 3 20 3.44772 20 4V8V12C20 12.5523 19.5523 13 19 13H5C4.44772 13 4 12.5523 4 12V8V4Z"/>
</mask>
<path d="M4 8V8.5H20V8V7.5H4V8ZM5 3V4H19V3V2H5V3ZM19 13V12H5V13V14H19V13ZM4 12H5V8H4H3V12H4ZM4 8H5V4H4H3V8H4ZM20 4H19V8H20H21V4H20ZM20 8H19V12H20H21V8H20ZM5 13V12V12H4H3C3 13.1046 3.89543 14 5 14V13ZM19 13V14C20.1046 14 21 13.1046 21 12H20H19V12V13ZM19 3V4V4H20H21C21 2.89543 20.1046 2 19 2V3ZM5 3V2C3.89543 2 3 2.89543 3 4H4H5V4V3Z" fill="currentColor" mask="url(#stroke0_15289_1531)"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M12 24L12 13" stroke-linecap="round" style="stroke: var(--automation-symbol-off-background-color)"/>
<path d="M4 4C4 3.44772 4.44772 3 5 3H19C19.5523 3 20 3.44772 20 4V8V12C20 12.5523 19.5523 13 19 13H5C4.44772 13 4 12.5523 4 12V8V4Z" style="fill: var(--automation-symbol-off-background-color)"/>
<mask id="stroke0_15289_1531" fill="white">
<path d="M4 4C4 3.44772 4.44772 3 5 3H19C19.5523 3 20 3.44772 20 4V8V12C20 12.5523 19.5523 13 19 13H5C4.44772 13 4 12.5523 4 12V8V4Z"/>
</mask>
<path d="M4 8V8.5H20V8V7.5H4V8ZM5 3V4H19V3V2H5V3ZM19 13V12H5V13V14H19V13ZM4 12H5V8H4H3V12H4ZM4 8H5V4H4H3V8H4ZM20 4H19V8H20H21V4H20ZM20 8H19V12H20H21V8H20ZM5 13V12V12H4H3C3 13.1046 3.89543 14 5 14V13ZM19 13V14C20.1046 14 21 13.1046 21 12H20H19V12V13ZM19 3V4V4H20H21C21 2.89543 20.1046 2 19 2V3ZM5 3V2C3.89543 2 3 2.89543 3 4H4H5V4V3Z" style="fill: var(--automation-symbol-off-border-color)" mask="url(#stroke0_15289_1531)"/>
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
    'obi-actuator-piston-closed': ObiActuatorPistonClosed;
  }
}
