import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-heading-line-off-proposal')
export class ObiHeadingLineOffProposal extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M12 1.5C8.75257 1.5 5.56236 2.35482 2.75 3.97853L3.5 5.27757C5.86745 3.91072 8.52629 3.13682 11.25 3.01655V6.11117L11.9992 6.86039L12.75 6.10961V3.01655C15.4737 3.13682 18.1325 3.91072 20.5 5.27757L21.25 3.97853C18.4376 2.35482 15.2474 1.5 12 1.5Z" fill="currentColor"/>
<path d="M15.7118 5.97705L16.7725 7.03771L13.0606 10.7497L16.7734 14.4625L15.7127 15.5231L11.9996 11.8106L8.28722 15.523L7.22656 14.4623L10.9392 10.7497L7.22741 7.03784L8.28807 5.97718L11.9995 9.68857L15.7118 5.97705Z" fill="currentColor"/>
<path d="M11.25 15.3878L11.9992 14.6386L12.75 15.3893V17.6145C13.7643 17.933 14.5 18.8806 14.5 20C14.5 21.3807 13.3807 22.5 12 22.5C10.6193 22.5 9.5 21.3807 9.5 20C9.5 18.8806 10.2357 17.933 11.25 17.6145V15.3878Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M12 1.5C8.75257 1.5 5.56236 2.35482 2.75 3.97853L3.5 5.27757C5.86745 3.91072 8.52629 3.13682 11.25 3.01655V6.11117L11.9992 6.86039L12.75 6.10961V3.01655C15.4737 3.13682 18.1325 3.91072 20.5 5.27757L21.25 3.97853C18.4376 2.35482 15.2474 1.5 12 1.5Z" style="fill: var(--element-active-color)"/>
<path d="M15.7118 5.97705L16.7725 7.03771L13.0606 10.7497L16.7734 14.4625L15.7127 15.5231L11.9996 11.8106L8.28722 15.523L7.22656 14.4623L10.9392 10.7497L7.22741 7.03784L8.28807 5.97718L11.9995 9.68857L15.7118 5.97705Z" style="fill: var(--element-active-color)"/>
<path d="M11.25 15.3878L11.9992 14.6386L12.75 15.3893V17.6145C13.7643 17.933 14.5 18.8806 14.5 20C14.5 21.3807 13.3807 22.5 12 22.5C10.6193 22.5 9.5 21.3807 9.5 20C9.5 18.8806 10.2357 17.933 11.25 17.6145V15.3878Z" style="fill: var(--element-active-color)"/>
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
    'obi-heading-line-off-proposal': ObiHeadingLineOffProposal;
  }
}