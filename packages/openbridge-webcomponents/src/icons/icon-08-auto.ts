import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-08-auto')
export class Obi08Auto extends LitElement {
  @property({type: Boolean, attribute: 'use-css-color'}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M2.99939 20.9992L9.42785 2.99951H13.9278L21 20.9992H16.5001L14.9848 17.1421H8.87684L7.49931 20.9992H2.99939ZM10.2544 13.285H13.4695L11.7854 8.99815L10.2544 13.285Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M2.99939 20.9992L9.42785 2.99951H13.9278L21 20.9992H16.5001L14.9848 17.1421H8.87684L7.49931 20.9992H2.99939ZM10.2544 13.285H13.4695L11.7854 8.99815L10.2544 13.285Z" style="fill: var(--element-active-color)"/>
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
    'obi-08-auto': Obi08Auto;
  }
}
