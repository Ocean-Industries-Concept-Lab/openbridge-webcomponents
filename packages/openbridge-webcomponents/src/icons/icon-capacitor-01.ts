import {LitElement, html, css, svg} from 'lit';
import {property} from 'lit/decorators.js';
import {customElement} from '../decorator.js';

@customElement('obi-capacitor-01')
export class ObiCapacitor01 extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M10 6L10 18C10 18.5523 9.55228 19 9 19C8.44772 19 8 18.5523 8 18V6C8 5.44772 8.44772 5 9 5C9.55228 5 10 5.44772 10 6Z" fill="currentColor"/>
<path d="M16 6L16 18C16 18.5523 15.5523 19 15 19C14.4477 19 14 18.5523 14 18L14 6C14 5.44772 14.4477 5 15 5C15.5523 5 16 5.44772 16 6Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M10 6L10 18C10 18.5523 9.55228 19 9 19C8.44772 19 8 18.5523 8 18V6C8 5.44772 8.44772 5 9 5C9.55228 5 10 5.44772 10 6Z" style="fill: var(--automation-symbol-static-background-color)"/>
<path d="M16 6L16 18C16 18.5523 15.5523 19 15 19C14.4477 19 14 18.5523 14 18L14 6C14 5.44772 14.4477 5 15 5C15.5523 5 16 5.44772 16 6Z" style="fill: var(--automation-symbol-static-background-color)"/>
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
    'obi-capacitor-01': ObiCapacitor01;
  }
}
