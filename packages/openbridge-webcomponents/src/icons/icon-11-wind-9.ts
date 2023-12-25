import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-11-wind-9')
export class Obi11Wind9 extends LitElement {
  @property({type: Number}) size = 24;
  @property({type: Boolean, attribute: 'use-css-color'}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M0 11V13H17V15L24 12L17 9V11H0Z" fill="currentColor"/>
<path d="M0 5H1V11H0V5Z" fill="currentColor"/>
<path d="M3 5H4V11H3V5Z" fill="currentColor"/>
<path d="M6 5H7V11H6V5Z" fill="currentColor"/>
<path d="M9 8H10V11H9V8Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M0 11V13H17V15L24 12L17 9V11H0Z" style="fill: var(--element-active-color)"/>
<path d="M0 5H1V11H0V5Z" style="fill: var(--element-active-color)"/>
<path d="M3 5H4V11H3V5Z" style="fill: var(--element-active-color)"/>
<path d="M6 5H7V11H6V5Z" style="fill: var(--element-active-color)"/>
<path d="M9 8H10V11H9V8Z" style="fill: var(--element-active-color)"/>
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
    'obi-11-wind-9': Obi11Wind9;
  }
}
