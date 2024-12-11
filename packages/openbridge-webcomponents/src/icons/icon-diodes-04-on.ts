import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-diodes-04-on')
export class ObiDiodes04On extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M17.0052 2.89776C17.0017 2.93137 17 2.96548 17 3V11.3846L5 4L5 20L17 12.6154L17 20L15 20L15 18C15 17.4477 14.5523 17 14 17C13.4477 17 13 17.4477 13 18L13 21C13 21.5523 13.4477 22 14 22L18 22C18.5523 22 19 21.5523 19 21L19 4L21 4V6C21 6.55228 21.4477 7 22 7C22.5523 7 23 6.55228 23 6V3C23 2.44772 22.5523 2 22 2L18 2C17.4822 2 17.0564 2.3935 17.0052 2.89776ZM6 5.78957L16.092 12L6 18.2104L6 5.78957Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M6 5.78955L16.092 12L6 18.2104V5.78955Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M17.0052 2.89776C17.0017 2.93137 17 2.96548 17 3V11.3846L5 4L5 20L17 12.6154L17 20L15 20L15 18C15 17.4477 14.5523 17 14 17C13.4477 17 13 17.4477 13 18L13 21C13 21.5523 13.4477 22 14 22L18 22C18.5523 22 19 21.5523 19 21L19 4L21 4V6C21 6.55228 21.4477 7 22 7C22.5523 7 23 6.55228 23 6V3C23 2.44772 22.5523 2 22 2L18 2C17.4822 2 17.0564 2.3935 17.0052 2.89776ZM6 5.78957L16.092 12L6 18.2104L6 5.78957Z" style="fill: var(--automation-device-tertiary-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M6 5.78955L16.092 12L6 18.2104V5.78955Z" style="fill: var(--automation-device-primary-color)"/>
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
    'obi-diodes-04-on': ObiDiodes04On;
  }
}