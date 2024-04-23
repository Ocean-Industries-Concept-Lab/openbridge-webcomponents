import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-14-message')
export class Obi14Message extends LitElement {
  @property({type: Boolean, attribute: 'use-css-color'}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M20 2.00781H4C2.9 2.00781 2 2.90781 2 4.00781V22.0078L6 18.0078H20C21.1 18.0078 22 17.1078 22 16.0078V4.00781C22 2.90781 21.1 2.00781 20 2.00781ZM11 5L13 4.99219V11L11 11.0078V5ZM13 13H11V15H13V13Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M20 2.00781H4C2.9 2.00781 2 2.90781 2 4.00781V22.0078L6 18.0078H20C21.1 18.0078 22 17.1078 22 16.0078V4.00781C22 2.90781 21.1 2.00781 20 2.00781ZM11 5L13 4.99219V11L11 11.0078V5ZM13 13H11V15H13V13Z" style="fill: var(--element-active-color)"/>
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
    'obi-14-message': Obi14Message;
  }
}
