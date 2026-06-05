import {LitElement, html, css, svg} from 'lit';
import {property} from 'lit/decorators.js';
import {customElement} from '../decorator.js';

@customElement('obi-add-column-after')
export class ObiAddColumnAfter extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M5 19L5 5L10 5L10 19H5ZM4 3C3.44772 3 3 3.44772 3 4L3 20C3 20.5523 3.44772 21 4 21H20C20.5523 21 21 20.5523 21 20V19H12L12 5L21 5V4C21 3.44772 20.5523 3 20 3L4 3ZM14 13H17V16H19V13H22V11H19V8H17L17 11H14V13Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M5 19L5 5L10 5L10 19H5ZM4 3C3.44772 3 3 3.44772 3 4L3 20C3 20.5523 3.44772 21 4 21H20C20.5523 21 21 20.5523 21 20V19H12L12 5L21 5V4C21 3.44772 20.5523 3 20 3L4 3ZM14 13H17V16H19V13H22V11H19V8H17L17 11H14V13Z" style="fill: var(--element-active-color)"/>
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
    'obi-add-column-after': ObiAddColumnAfter;
  }
}
