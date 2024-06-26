import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-03-filter')
export class Obi03Filter extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M8.73244 4H22V6H8.73244C8.38663 6.5978 7.74028 7 7 7C6.25972 7 5.61337 6.5978 5.26756 6H2V4H5.26756C5.61337 3.4022 6.25972 3 7 3C7.74028 3 8.38663 3.4022 8.73244 4Z" fill="currentColor"/>
<path d="M19.7324 11H22V13H19.7324C19.3866 13.5978 18.7403 14 18 14C17.2597 14 16.6134 13.5978 16.2676 13H2V11H16.2676C16.6134 10.4022 17.2597 10 18 10C18.7403 10 19.3866 10.4022 19.7324 11Z" fill="currentColor"/>
<path d="M8.73244 18H22V20H8.73244C8.38663 20.5978 7.74028 21 7 21C6.25972 21 5.61337 20.5978 5.26756 20H2V18H5.26756C5.61337 17.4022 6.25972 17 7 17C7.74028 17 8.38663 17.4022 8.73244 18Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M8.73244 4H22V6H8.73244C8.38663 6.5978 7.74028 7 7 7C6.25972 7 5.61337 6.5978 5.26756 6H2V4H5.26756C5.61337 3.4022 6.25972 3 7 3C7.74028 3 8.38663 3.4022 8.73244 4Z" style="fill: var(--element-active-color)"/>
<path d="M19.7324 11H22V13H19.7324C19.3866 13.5978 18.7403 14 18 14C17.2597 14 16.6134 13.5978 16.2676 13H2V11H16.2676C16.6134 10.4022 17.2597 10 18 10C18.7403 10 19.3866 10.4022 19.7324 11Z" style="fill: var(--element-active-color)"/>
<path d="M8.73244 18H22V20H8.73244C8.38663 20.5978 7.74028 21 7 21C6.25972 21 5.61337 20.5978 5.26756 20H2V18H5.26756C5.61337 17.4022 6.25972 17 7 17C7.74028 17 8.38663 17.4022 8.73244 18Z" style="fill: var(--element-active-color)"/>
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
    'obi-03-filter': Obi03Filter;
  }
}
