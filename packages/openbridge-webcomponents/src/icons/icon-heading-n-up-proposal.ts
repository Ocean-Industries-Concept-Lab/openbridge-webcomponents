import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-heading-n-up-proposal')
export class ObiHeadingNUpProposal extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M17 7L12 1L7 7H17Z" fill="currentColor"/>
<path d="M13.9244 20.9999H16.8364V9.57593H14.7564V15.0959L14.7884 15.8959C14.7991 16.1626 14.8044 16.4293 14.8044 16.6959C14.8151 16.9519 14.8258 17.2133 14.8364 17.4799C14.8471 17.7359 14.8578 17.9866 14.8684 18.2319H14.8204L9.73243 9.57593H6.83643V20.9999H8.90043V15.5119L8.86843 14.6799C8.85776 14.4026 8.84176 14.1306 8.82043 13.8639C8.80976 13.5866 8.79909 13.3146 8.78843 13.0479C8.77776 12.7813 8.76709 12.5199 8.75643 12.2639H8.82043L13.9244 20.9999Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M17 7L12 1L7 7H17Z" style="fill: var(--element-active-color)"/>
<path d="M13.9244 20.9999H16.8364V9.57593H14.7564V15.0959L14.7884 15.8959C14.7991 16.1626 14.8044 16.4293 14.8044 16.6959C14.8151 16.9519 14.8258 17.2133 14.8364 17.4799C14.8471 17.7359 14.8578 17.9866 14.8684 18.2319H14.8204L9.73243 9.57593H6.83643V20.9999H8.90043V15.5119L8.86843 14.6799C8.85776 14.4026 8.84176 14.1306 8.82043 13.8639C8.80976 13.5866 8.79909 13.3146 8.78843 13.0479C8.77776 12.7813 8.76709 12.5199 8.75643 12.2639H8.82043L13.9244 20.9999Z" style="fill: var(--element-active-color)"/>
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
    'obi-heading-n-up-proposal': ObiHeadingNUpProposal;
  }
}
