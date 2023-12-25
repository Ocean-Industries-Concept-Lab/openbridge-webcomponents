import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-19-trend-down')
export class Obi19TrendDown extends LitElement {
  @property({type: Number}) size = 24;
  @property({type: Boolean, attribute: 'use-css-color'}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M22.6077 16.3225L21.5078 10.6016L19.9849 11.9613L13.5 4.66771L9.5 8.66771L3.5 2.65771L2 4.15771L9.5 11.6677L13.5 7.66771L18.4994 13.2876L17.0475 14.584L22.6077 16.3225Z" fill="currentColor"/>
<path d="M2.30371 19H22.3037L22 21H2L2.30371 19Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M22.6077 16.3225L21.5078 10.6016L19.9849 11.9613L13.5 4.66771L9.5 8.66771L3.5 2.65771L2 4.15771L9.5 11.6677L13.5 7.66771L18.4994 13.2876L17.0475 14.584L22.6077 16.3225Z" style="fill: var(--element-active-color)"/>
<path d="M2.30371 19H22.3037L22 21H2L2.30371 19Z" style="fill: var(--element-active-color)"/>
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
    'obi-19-trend-down': Obi19TrendDown;
  }
}
