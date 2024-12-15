import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-diodes-03')
export class ObiDiodes03 extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M18 3C17.4822 3 17.0564 3.3935 17.0052 3.89776C17.0017 3.93137 17 3.96548 17 4V11.3846L5 4L5 20L17 12.6154V19H14C13.4477 19 13 19.4477 13 20C13 20.5523 13.4477 21 14 21L18 21C18.5523 21 19 20.5523 19 20L19 5L22 5C22.5523 5 23 4.55228 23 4C23 3.44772 22.5523 3 22 3L18 3ZM6 5.78957L16.092 12L6 18.2104L6 5.78957Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M18 3C17.4822 3 17.0564 3.3935 17.0052 3.89776C17.0017 3.93137 17 3.96548 17 4V11.3846L5 4L5 20L17 12.6154V19H14C13.4477 19 13 19.4477 13 20C13 20.5523 13.4477 21 14 21L18 21C18.5523 21 19 20.5523 19 20L19 5L22 5C22.5523 5 23 4.55228 23 4C23 3.44772 22.5523 3 22 3L18 3ZM6 5.78957L16.092 12L6 18.2104L6 5.78957Z" style="fill: var(--automation-device-secondary-color)"/>
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
    'obi-diodes-03': ObiDiodes03;
  }
}
