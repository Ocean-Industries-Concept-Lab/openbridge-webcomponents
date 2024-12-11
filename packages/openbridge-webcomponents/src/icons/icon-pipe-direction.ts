import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-pipe-direction')
export class ObiPipeDirection extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M9.99461 9L12.99 12L9.99427 15H0V9H9.99461Z" fill="currentColor"/>
<path d="M15.6474 9L18.6474 12L15.6474 15H24V9H15.6474Z" fill="currentColor"/>
<path d="M10.9928 14H0V15H9.99427L10.9928 14Z" fill="currentColor"/>
<path d="M15.6474 15H24V14H16.6474L15.6474 15Z" fill="currentColor"/>
<path d="M16.6474 10H24V9H15.6474L16.6474 10Z" fill="currentColor"/>
<path d="M9.99461 9H0V10H10.9931L9.99461 9Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M8.48979 6L14.4807 12L8.48926 18H11.3107L17.3107 12L11.3107 6H8.48979Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M9.99461 9L12.99 12L9.99427 15H0V9H9.99461Z" style="fill: var(--automation-pipes-primary-color)"/>
<path d="M15.6474 9L18.6474 12L15.6474 15H24V9H15.6474Z" style="fill: var(--automation-pipes-primary-color)"/>
<path d="M10.9928 14H0V15H9.99427L10.9928 14Z" style="fill: var(--automation-pipes-tertiary-color)"/>
<path d="M15.6474 15H24V14H16.6474L15.6474 15Z" style="fill: var(--automation-pipes-tertiary-color)"/>
<path d="M16.6474 10H24V9H15.6474L16.6474 10Z" style="fill: var(--automation-pipes-tertiary-color)"/>
<path d="M9.99461 9H0V10H10.9931L9.99461 9Z" style="fill: var(--automation-pipes-tertiary-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M8.48979 6L14.4807 12L8.48926 18H11.3107L17.3107 12L11.3107 6H8.48979Z" style="fill: var(--element-active-color)"/>
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
    'obi-pipe-direction': ObiPipeDirection;
  }
}
