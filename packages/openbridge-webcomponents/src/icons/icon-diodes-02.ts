import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-diodes-02')
export class ObiDiodes02 extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M17 4C17 3.44772 17.4477 3 18 3C18.5523 3 19 3.44772 19 4L19 20C19 20.5523 18.5523 21 18 21L14 21C13.4477 21 13 20.5523 13 20C13 19.4477 13.4477 19 14 19H17V12.6154L5 20L5 4L17 11.3846V4ZM6 5.78957L16.092 12L6 18.2104L6 5.78957Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M17 4C17 3.44772 17.4477 3 18 3C18.5523 3 19 3.44772 19 4L19 20C19 20.5523 18.5523 21 18 21L14 21C13.4477 21 13 20.5523 13 20C13 19.4477 13.4477 19 14 19H17V12.6154L5 20L5 4L17 11.3846V4ZM6 5.78957L16.092 12L6 18.2104L6 5.78957Z" style="fill: var(--automation-device-secondary-color)"/>
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
    'obi-diodes-02': ObiDiodes02;
  }
}
