import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-20-cell-low')
export class Obi20CellLow extends LitElement {
  @property({type: Boolean, attribute: 'use-css-color'}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M13 12.8291C14.165 12.4175 15 11.3062 15 10C15 8.34326 13.6572 7 12 7C10.3428 7 9 8.34326 9 10C9 11.3062 9.83496 12.4175 11 12.8291V22H13V12.8291Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M13 12.8291C14.165 12.4175 15 11.3062 15 10C15 8.34326 13.6572 7 12 7C10.3428 7 9 8.34326 9 10C9 11.3062 9.83496 12.4175 11 12.8291V22H13V12.8291Z" style="fill: var(--element-active-color)"/>
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
    'obi-20-cell-low': Obi20CellLow;
  }
}