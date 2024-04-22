import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-02-chevron-double-down')
export class Obi02ChevronDoubleDown extends LitElement {
  @property({type: Boolean, attribute: 'use-css-color'}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M16.295 5.29511L17.705 6.70511L11.705 12.7051L5.70496 6.70511L7.11496 5.29511L11.705 9.87511L16.295 5.29511Z" fill="currentColor"/>
<path d="M16.295 11.2951L17.705 12.7051L11.705 18.7051L5.70496 12.7051L7.11496 11.2951L11.705 15.8751L16.295 11.2951Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M16.295 5.29511L17.705 6.70511L11.705 12.7051L5.70496 6.70511L7.11496 5.29511L11.705 9.87511L16.295 5.29511Z" style="fill: var(--element-active-color)"/>
<path d="M16.295 11.2951L17.705 12.7051L11.705 18.7051L5.70496 12.7051L7.11496 11.2951L11.705 15.8751L16.295 11.2951Z" style="fill: var(--element-active-color)"/>
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
    'obi-02-chevron-double-down': Obi02ChevronDoubleDown;
  }
}