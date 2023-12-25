import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-20-wifi-bad')
export class Obi20WifiBad extends LitElement {
  @property({type: Number}) size = 24;
  @property({type: Boolean, attribute: 'use-css-color'}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M24 8.48C20.93 5.4 16.69 3.5 12 3.5C7.31 3.5 3.07 5.4 0 8.48L12 20.5V11.5H20.99L24 8.48ZM19.59 13.5L17.5 15.59L15.41 13.5L14 14.91L16.09 17L14 19.09L15.41 20.5L17.5 18.42L19.59 20.5L21 19.09L18.92 17L21 14.91L19.59 13.5Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M24 8.48C20.93 5.4 16.69 3.5 12 3.5C7.31 3.5 3.07 5.4 0 8.48L12 20.5V11.5H20.99L24 8.48ZM19.59 13.5L17.5 15.59L15.41 13.5L14 14.91L16.09 17L14 19.09L15.41 20.5L17.5 18.42L19.59 20.5L21 19.09L18.92 17L21 14.91L19.59 13.5Z" fill="currentColor"/>
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
    'obi-20-wifi-bad': Obi20WifiBad;
  }
}
