import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-09-switch-horizontal-on-large')
export class Obi09SwitchHorizontalOnLarge extends LitElement {
  @property({type: Boolean, attribute: 'use-css-color'}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M2.5 10.5H21.5C22.3284 10.5 23 11.1716 23 12C23 12.8284 22.3284 13.5 21.5 13.5H2.5C1.67157 13.5 1 12.8284 1 12C1 11.1716 1.67157 10.5 2.5 10.5ZM2.5 11C1.94772 11 1.5 11.4477 1.5 12C1.5 12.5523 1.94772 13 2.5 13H21.5C22.0523 13 22.5 12.5523 22.5 12C22.5 11.4477 22.0523 11 21.5 11H2.5Z" fill="currentColor"/>
<path d="M1.5 12C1.5 11.4477 1.94772 11 2.5 11H21.5C22.0523 11 22.5 11.4477 22.5 12C22.5 12.5523 22.0523 13 21.5 13H2.5C1.94772 13 1.5 12.5523 1.5 12Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M2.5 10.5H21.5C22.3284 10.5 23 11.1716 23 12C23 12.8284 22.3284 13.5 21.5 13.5H2.5C1.67157 13.5 1 12.8284 1 12C1 11.1716 1.67157 10.5 2.5 10.5ZM2.5 11C1.94772 11 1.5 11.4477 1.5 12C1.5 12.5523 1.94772 13 2.5 13H21.5C22.0523 13 22.5 12.5523 22.5 12C22.5 11.4477 22.0523 11 21.5 11H2.5Z" style="fill: var(--automation-device-tertiary-color)"/>
<path d="M1.5 12C1.5 11.4477 1.94772 11 2.5 11H21.5C22.0523 11 22.5 11.4477 22.5 12C22.5 12.5523 22.0523 13 21.5 13H2.5C1.94772 13 1.5 12.5523 1.5 12Z" style="fill: var(--automation-device-primary-color)"/>
</svg>
`;

  override render() {
    return html`
      <div class="wrapper" >
        ${this.useCssColor? this.iconCss : this.icon}
      </div>
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
    'obi-09-switch-horizontal-on-large': Obi09SwitchHorizontalOnLarge;
  }
}