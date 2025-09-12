import {LitElement, html, css, svg} from 'lit';
import {property} from 'lit/decorators.js';
import {customElement} from '../decorator.js';

@customElement('obi-event-marker-filled')
export class ObiEventMarkerFilled extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<rect x="2" y="4" width="20" height="16" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M2 4V20H22V4H2ZM20 7.24988V18H5.6665L20 7.24988ZM18.3332 6L4 16.7499V6H18.3332Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect x="2" y="4" width="20" height="16" style="fill: var(--element-active-inverted-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M2 4V20H22V4H2ZM20 7.24988V18H5.6665L20 7.24988ZM18.3332 6L4 16.7499V6H18.3332Z" style="fill: var(--element-neutral-color)"/>
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
    'obi-event-marker-filled': ObiEventMarkerFilled;
  }
}
