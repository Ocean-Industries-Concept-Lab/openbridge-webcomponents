import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-16-command-available')
export class Obi16CommandAvailable extends LitElement {
  @property({type: Number}) size = 24;
  @property({type: Boolean, attribute: 'use-css-color'}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M14 17C15.1046 17 16 16.1046 16 15C16 13.8954 15.1046 13 14 13C12.8954 13 12 13.8954 12 15C12 16.1046 12.8954 17 14 17Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M12 8V6C12 3.24 9.76 1 7 1C4.24 1 2 3.24 2 6H4C4 4.34 5.34 3 7 3C8.66 3 10 4.34 10 6V8H8C6.89543 8 6 8.89543 6 10V20C6 21.1046 6.89543 22 8 22H20C21.1046 22 22 21.1046 22 20V10C22 8.89543 21.1046 8 20 8H12ZM20 10H8V20H20V10Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M14 17C15.1046 17 16 16.1046 16 15C16 13.8954 15.1046 13 14 13C12.8954 13 12 13.8954 12 15C12 16.1046 12.8954 17 14 17Z" style="fill: var(--element-active-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M12 8V6C12 3.24 9.76 1 7 1C4.24 1 2 3.24 2 6H4C4 4.34 5.34 3 7 3C8.66 3 10 4.34 10 6V8H8C6.89543 8 6 8.89543 6 10V20C6 21.1046 6.89543 22 8 22H20C21.1046 22 22 21.1046 22 20V10C22 8.89543 21.1046 8 20 8H12ZM20 10H8V20H20V10Z" style="fill: var(--element-active-color)"/>
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
    'obi-16-command-available': Obi16CommandAvailable;
  }
}
