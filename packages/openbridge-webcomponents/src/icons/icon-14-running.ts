import {LitElement, html, css, svg, unsafeCSS} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-14-running')
export class Obi14Running extends LitElement {
  @property({type: Boolean, attribute: 'use-css-color'}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M12 2.00781C6.48 2.00781 2 6.48781 2 12.0078C2 17.5278 6.48 22.0078 12 22.0078C17.52 22.0078 22 17.5278 22 12.0078C22 6.48781 17.52 2.00781 12 2.00781ZM5 12.0078L10 17.0078L19 8.00781L17.59 6.58781L10 14.1778L6.41 10.5978L5 12.0078Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M12 2.00781C6.48 2.00781 2 6.48781 2 12.0078C2 17.5278 6.48 22.0078 12 22.0078C17.52 22.0078 22 17.5278 22 12.0078C22 6.48781 17.52 2.00781 12 2.00781ZM5 12.0078L10 17.0078L19 8.00781L17.59 6.58781L10 14.1778L6.41 10.5978L5 12.0078Z" style="fill: var(--element-active-color)"/>
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
    }
    .wrapper > * {
      height: 100%;
      width: 100%;
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    'obi-14-running': Obi14Running;
  }
}
