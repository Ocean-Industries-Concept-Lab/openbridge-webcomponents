import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-05-pc')
export class Obi05Pc extends LitElement {
  @property({type: Boolean, attribute: 'use-css-color'}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M4 2H20C21.1 2 22 2.9 22 4V14C22 15.1 21.1 16 20 16H14V17H10V16H4C2.9 16 2 15.1 2 14V4C2 2.9 2.9 2 4 2ZM20 14H4V4H20V14Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M4 18H20V22H4V18ZM5 21V19H7V21H5Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M4 2H20C21.1 2 22 2.9 22 4V14C22 15.1 21.1 16 20 16H14V17H10V16H4C2.9 16 2 15.1 2 14V4C2 2.9 2.9 2 4 2ZM20 14H4V4H20V14Z" style="fill: var(--element-active-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M4 18H20V22H4V18ZM5 21V19H7V21H5Z" style="fill: var(--element-active-color)"/>
</svg>
`;

  override render() {
    return html`
      <div class="wrapper" >
        ${this.useCssColor? this.iconCss : this.icon}
      </div>
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
    'obi-05-pc': Obi05Pc;
  }
}