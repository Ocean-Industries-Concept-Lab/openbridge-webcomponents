import {LitElement, html, css, svg} from 'lit';
import {property} from 'lit/decorators.js';
import {customElement} from '../decorator.js';

@customElement('obi-force-gusts-true')
export class ObiForceGustsTrue extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M11.4328 1.55605C11.6071 1.02397 12.3933 1.02396 12.5675 1.55605L12.5949 1.67812L14.422 15.3783L17.6056 14.5834C18.1536 14.4465 18.5703 15.0739 18.2316 15.5258L12.4806 23.1937C12.2407 23.5134 11.7597 23.5133 11.5197 23.1937L5.76872 15.5258C5.45129 15.1023 5.79739 14.5249 6.29313 14.5668L6.3947 14.5834L9.57731 15.3783L11.4054 1.67812L11.4328 1.55605Z" fill="currentColor"/>
<path d="M7.24821 2.67421C7.48597 2.17133 8.24356 2.37389 8.19841 2.92812L7.60661 10.1361C7.55554 10.7579 6.9534 11.1824 6.35075 11.0209L4.80192 10.6059C4.19941 10.4444 3.89004 9.77626 4.15642 9.2123L7.24821 2.67421Z" fill="currentColor"/>
<path d="M15.8019 2.92909C15.7564 2.37457 16.5143 2.17121 16.7521 2.67421L19.8429 9.2123C20.1096 9.77622 19.8008 10.4442 19.1984 10.6059L17.6486 11.0209C17.0461 11.182 16.4448 10.7578 16.3937 10.1361L15.8019 2.92909Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M11.4328 1.55605C11.6071 1.02397 12.3933 1.02396 12.5675 1.55605L12.5949 1.67812L14.422 15.3783L17.6056 14.5834C18.1536 14.4465 18.5703 15.0739 18.2316 15.5258L12.4806 23.1937C12.2407 23.5134 11.7597 23.5133 11.5197 23.1937L5.76872 15.5258C5.45129 15.1023 5.79739 14.5249 6.29313 14.5668L6.3947 14.5834L9.57731 15.3783L11.4054 1.67812L11.4328 1.55605Z" style="fill: var(--element-active-color)"/>
<path d="M7.24821 2.67421C7.48597 2.17133 8.24356 2.37389 8.19841 2.92812L7.60661 10.1361C7.55554 10.7579 6.9534 11.1824 6.35075 11.0209L4.80192 10.6059C4.19941 10.4444 3.89004 9.77626 4.15642 9.2123L7.24821 2.67421Z" style="fill: var(--element-active-color)"/>
<path d="M15.8019 2.92909C15.7564 2.37457 16.5143 2.17121 16.7521 2.67421L19.8429 9.2123C20.1096 9.77622 19.8008 10.4442 19.1984 10.6059L17.6486 11.0209C17.0461 11.182 16.4448 10.7578 16.3937 10.1361L15.8019 2.92909Z" style="fill: var(--element-active-color)"/>
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
    'obi-force-gusts-true': ObiForceGustsTrue;
  }
}
