import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-diodes-01-off')
export class ObiDiodes01Off extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M6 5.79004L16.092 12.0005L6 18.2109L6 5.79004Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M18 3C17.4477 3 17 3.44772 17 4V11.3846L5 4L5 20L17 12.6154L17 20C17 20.5523 17.4477 21 18 21C18.5523 21 19 20.5523 19 20L19 4C19 3.44772 18.5523 3 18 3ZM6 5.78957L16.092 12L6 18.2104L6 5.78957Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M6 5.79004L16.092 12.0005L6 18.2109L6 5.79004Z" style="fill: var(--automation-device-primary-inverted-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M18 3C17.4477 3 17 3.44772 17 4V11.3846L5 4L5 20L17 12.6154L17 20C17 20.5523 17.4477 21 18 21C18.5523 21 19 20.5523 19 20L19 4C19 3.44772 18.5523 3 18 3ZM6 5.78957L16.092 12L6 18.2104L6 5.78957Z" style="fill: var(--automation-device-tertiary-inverted-color)"/>
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
    'obi-diodes-01-off': ObiDiodes01Off;
  }
}
