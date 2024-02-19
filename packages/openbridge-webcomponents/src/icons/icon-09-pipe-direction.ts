import {LitElement, html, css, svg, unsafeCSS} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-09-pipe-direction')
export class Obi09PipeDirection extends LitElement {
  @property({type: Boolean, attribute: 'use-css-color'}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M11.0001 10.6103L11.0001 24H13.0001L13.0001 10.6103L17.1426 17.5145L18.8576 16.4855L13.0001 6.72302L13.0001 0H11.0001L11.0001 6.72302L5.14258 16.4855L6.85756 17.5145L11.0001 10.6103Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M11.0001 10.6103L11.0001 24H13.0001L13.0001 10.6103L17.1426 17.5145L18.8576 16.4855L13.0001 6.72302L13.0001 0H11.0001L11.0001 6.72302L5.14258 16.4855L6.85756 17.5145L11.0001 10.6103Z" style="fill: var(--element-active-color)"/>
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
    'obi-09-pipe-direction': Obi09PipeDirection;
  }
}
