import {LitElement, html, css, svg} from 'lit';
import {property} from 'lit/decorators.js';
import {customElement} from '../decorator.js';

@customElement('obi-sign-arrow-left')
export class ObiSignArrowLeft extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M15.6568 4L9.99991 4L2 11.9999L10.0001 20L15.6569 20L9.65685 13.9999L21 13.9999L21 9.99991L9.65685 9.99991L15.6568 4Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M15.6568 4L9.99991 4L2 11.9999L10.0001 20L15.6569 20L9.65685 13.9999L21 13.9999L21 9.99991L9.65685 9.99991L15.6568 4Z" style="fill: var(--element-active-color)"/>
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
    'obi-sign-arrow-left': ObiSignArrowLeft;
  }
}
