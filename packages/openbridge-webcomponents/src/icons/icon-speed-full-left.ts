import {LitElement, html, css, svg} from 'lit';
import {property} from 'lit/decorators.js';
import {customElement} from '../decorator.js';

@customElement('obi-speed-full-left')
export class ObiSpeedFullLeft extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M7 17H9.82105L4.83 12L9.82105 7H7L2 12L7 17Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M13 17H15.821L10.83 12L15.821 7H13L7.99996 12L13 17Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M19 17H21.821L16.83 12L21.821 7H18.9999L14 12L19 17Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M7 17H9.82105L4.83 12L9.82105 7H7L2 12L7 17Z" style="fill: var(--element-active-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M13 17H15.821L10.83 12L15.821 7H13L7.99996 12L13 17Z" style="fill: var(--element-active-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M19 17H21.821L16.83 12L21.821 7H18.9999L14 12L19 17Z" style="fill: var(--element-active-color)"/>
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
    'obi-speed-full-left': ObiSpeedFullLeft;
  }
}
