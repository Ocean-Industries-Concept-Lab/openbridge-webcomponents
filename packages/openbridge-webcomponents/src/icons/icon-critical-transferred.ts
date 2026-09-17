import {LitElement, html, css, svg} from 'lit';
import {property} from 'lit/decorators.js';
import {customElement} from '../decorator.js';

@customElement('obi-critical-transferred')
export class ObiCriticalTransferred extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M7.28516 4L16.7139 4L21.4199 12L16.7139 20L7.28516 20L2.5791 12L7.28516 4Z" fill="currentColor" stroke="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M13.2071 6.79297L18.4142 12.0001L13.2071 17.2072L11.7929 15.793L14.5858 13.0001H6V11.0001H14.5858L11.7929 8.20718L13.2071 6.79297Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M7.28516 4L16.7139 4L21.4199 12L16.7139 20L7.28516 20L2.5791 12L7.28516 4Z" style="fill: var(--alert-critical-color); stroke: var(--alert-critical-outline-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M13.2071 6.79297L18.4142 12.0001L13.2071 17.2072L11.7929 15.793L14.5858 13.0001H6V11.0001H14.5858L11.7929 8.20718L13.2071 6.79297Z" style="fill: var(--on-critical-active-color)"/>
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
    'obi-critical-transferred': ObiCriticalTransferred;
  }
}
