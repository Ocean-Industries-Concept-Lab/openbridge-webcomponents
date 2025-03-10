import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-warning-transferred-iec')
export class ObiWarningTransferredIec extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M13.2071 6.79297L18.4142 12.0001L13.2071 17.2072L11.7929 15.793L14.5858 13.0001H6V11.0001H14.5858L11.7929 8.20718L13.2071 6.79297Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z" style="fill: var(--alert-warning-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M13.2071 6.79297L18.4142 12.0001L13.2071 17.2072L11.7929 15.793L14.5858 13.0001H6V11.0001H14.5858L11.7929 8.20718L13.2071 6.79297Z" style="fill: var(--on-warning-active-color)"/>
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
    'obi-warning-transferred-iec': ObiWarningTransferredIec;
  }
}
