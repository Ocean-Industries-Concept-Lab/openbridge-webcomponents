import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-04-night')
export class Obi04Night extends LitElement {
  @property({type: Number}) size = 24;
  @property({type: Boolean, attribute: 'use-css-color'}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M17 2.46C16.05 2.16 15.05 2 14 2C8.48 2 4 6.48 4 12C4 17.52 8.48 22 14 22C15.05 22 16.05 21.84 17 21.54C12.94 20.27 10 16.48 10 12C10 7.52 12.94 3.73 17 2.46Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M17 2.46C16.05 2.16 15.05 2 14 2C8.48 2 4 6.48 4 12C4 17.52 8.48 22 14 22C15.05 22 16.05 21.84 17 21.54C12.94 20.27 10 16.48 10 12C10 7.52 12.94 3.73 17 2.46Z" style="fill: var(--element-active-color)"/>
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
    'obi-04-night': Obi04Night;
  }
}
