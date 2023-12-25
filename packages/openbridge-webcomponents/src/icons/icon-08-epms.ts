import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-08-epms')
export class Obi08Epms extends LitElement {
  @property({type: Number}) size = 24;
  @property({type: Boolean, attribute: 'use-css-color'}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M12 2.02002C6.49002 2.02002 2.02002 6.49002 2.02002 12C2.02002 17.51 6.49002 21.98 12 21.98C17.51 21.98 21.98 17.51 21.98 12C21.98 6.49002 17.51 2.02002 12 2.02002ZM11.48 20V13.74H8.00002L13 4.00002V10.26H16.35L11.48 20Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M12 2.02002C6.49002 2.02002 2.02002 6.49002 2.02002 12C2.02002 17.51 6.49002 21.98 12 21.98C17.51 21.98 21.98 17.51 21.98 12C21.98 6.49002 17.51 2.02002 12 2.02002ZM11.48 20V13.74H8.00002L13 4.00002V10.26H16.35L11.48 20Z" style="fill: var(--element-active-color)"/>
</svg>
`;

  override render() {
    return html`
      <div class="wrapper" style="--size:${this.size}px">
        ${this.useCssColor ? this.iconCss : this.icon}
      </div>
    `;
  }

  static override styles = css`
    .wrapper {
      height: var(--size);
      width: var(--size);
    }
    .wrapper > * {
      height: 100%;
      width: 100%;
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    'obi-08-epms': Obi08Epms;
  }
}
