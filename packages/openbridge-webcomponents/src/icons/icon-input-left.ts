import {LitElement, html, css, svg} from 'lit';
import {property} from 'lit/decorators.js';
import {customElement} from '../decorator.js';

@customElement('obi-input-left')
export class ObiInputLeft extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M17.0001 7.20388C17.0001 6.21538 15.8242 5.65113 15.0002 6.24423L7.7225 11.1724C7.13688 11.569 7.13675 12.4316 7.72224 12.8283L15.0002 17.76C15.8242 18.3531 17.0001 17.7889 17.0001 16.8004V7.20388Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M17.0001 7.20388C17.0001 6.21538 15.8242 5.65113 15.0002 6.24423L7.7225 11.1724C7.13688 11.569 7.13675 12.4316 7.72224 12.8283L15.0002 17.76C15.8242 18.3531 17.0001 17.7889 17.0001 16.8004V7.20388Z" style="fill: var(--element-active-color)"/>
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
    'obi-input-left': ObiInputLeft;
  }
}
