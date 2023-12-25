import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-05-screen-pad')
export class Obi05ScreenPad extends LitElement {
  @property({type: Number}) size = 24;
  @property({type: Boolean, attribute: 'use-css-color'}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M4 5H20C21.1 5 22 5.9 22 7V17C22 18.1 21.1 19 20 19H14H10.5H4C2.9 19 2 18.1 2 17V7C2 5.9 2.9 5 4 5ZM20 17H4V7H20V17Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M4 5H20C21.1 5 22 5.9 22 7V17C22 18.1 21.1 19 20 19H14H10.5H4C2.9 19 2 18.1 2 17V7C2 5.9 2.9 5 4 5ZM20 17H4V7H20V17Z" style="fill: var(--element-active-color)"/>
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
    'obi-05-screen-pad': Obi05ScreenPad;
  }
}
