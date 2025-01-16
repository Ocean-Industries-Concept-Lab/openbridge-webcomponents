import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-diodes-03-off')
export class ObiDiodes03Off extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M18 3C17.4822 3 17.0564 3.3935 17.0052 3.89776C17.0017 3.93137 17 3.96548 17 4V11.3846L5 4V20L17 12.6154V19H14C13.4477 19 13 19.4477 13 20C13 20.5523 13.4477 21 14 21H18C18.5523 21 19 20.5523 19 20V5H22C22.5523 5 23 4.55228 23 4C23 3.44772 22.5523 3 22 3H18ZM6 5.78957L16.092 12L6 18.2104L6 5.78957Z" fill="currentColor"/>
<path d="M6 5.79004L16.092 12.0005L6 18.2109V5.79004Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M18 3C17.4822 3 17.0564 3.3935 17.0052 3.89776C17.0017 3.93137 17 3.96548 17 4V11.3846L5 4V20L17 12.6154V19H14C13.4477 19 13 19.4477 13 20C13 20.5523 13.4477 21 14 21H18C18.5523 21 19 20.5523 19 20V5H22C22.5523 5 23 4.55228 23 4C23 3.44772 22.5523 3 22 3H18ZM6 5.78957L16.092 12L6 18.2104L6 5.78957Z" style="fill: var(--undefined)"/>
<path d="M6 5.79004L16.092 12.0005L6 18.2109V5.79004Z" style="fill: var(--automation-device-primary-inverted-color)"/>
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
    'obi-diodes-03-off': ObiDiodes03Off;
  }
}
