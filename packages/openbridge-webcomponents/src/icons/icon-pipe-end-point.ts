import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-pipe-end-point')
export class ObiPipeEndPoint extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M9 9L9 4L15 4L15 20H9L9 15L0 15L2.38419e-07 9L9 9Z" fill="currentColor"/>
<path d="M10 19H14L14 5L10 5L10 10L0 10V9L9 9L9 4H15L15 20H9L9 15L0 15V14L10 14L10 19Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M9 9L9 4L15 4L15 20H9L9 15L0 15L2.38419e-07 9L9 9Z" style="fill: var(--automation-pipes-primary-color)"/>
<path d="M10 19H14L14 5L10 5L10 10L0 10V9L9 9L9 4H15L15 20H9L9 15L0 15V14L10 14L10 19Z" style="fill: var(--automation-pipes-tertiary-color)"/>
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
    'obi-pipe-end-point': ObiPipeEndPoint;
  }
}
