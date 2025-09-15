import {LitElement, html, css, svg} from 'lit';
import {property} from 'lit/decorators.js';
import {customElement} from '../decorator.js';

@customElement('obi-input-mouse-google')
export class ObiInputMouseGoogle extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M20 8.93V14.93C20 19.35 16.42 22.93 12 22.93C7.58 22.93 4 19.35 4 14.93V8.93C4.04 4.54 7.6 1 12 1C16.3858 1 19.9371 4.51725 19.9995 8.88764L20 8.93ZM18 14.93C18 18.24 15.31 20.93 12 20.93C8.69 20.93 6 18.24 6 14.93V10.93H18V14.93ZM11 3.09V8.93H6C6.04 5.99 8.19 3.56 11 3.09ZM18 8.93H13V3.09C15.81 3.56 17.96 5.99 18 8.93Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M20 8.93V14.93C20 19.35 16.42 22.93 12 22.93C7.58 22.93 4 19.35 4 14.93V8.93C4.04 4.54 7.6 1 12 1C16.3858 1 19.9371 4.51725 19.9995 8.88764L20 8.93ZM18 14.93C18 18.24 15.31 20.93 12 20.93C8.69 20.93 6 18.24 6 14.93V10.93H18V14.93ZM11 3.09V8.93H6C6.04 5.99 8.19 3.56 11 3.09ZM18 8.93H13V3.09C15.81 3.56 17.96 5.99 18 8.93Z" style="fill: var(--element-active-color)"/>
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
    'obi-input-mouse-google': ObiInputMouseGoogle;
  }
}
