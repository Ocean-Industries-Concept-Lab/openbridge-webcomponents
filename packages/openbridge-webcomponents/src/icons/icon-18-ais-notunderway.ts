import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-18-ais-notunderway')
export class Obi18AisNotunderway extends LitElement {
  @property({type: Boolean, attribute: 'use-css-color'}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M4 8.68629L8.68629 4H15.3137L20 8.68629V15.3137L15.3137 20H8.68629L4 15.3137V8.68629Z" stroke="#1A1A1A" stroke-width="2"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M4 8.68629L8.68629 4H15.3137L20 8.68629V15.3137L15.3137 20H8.68629L4 15.3137V8.68629Z" style="stroke: var(--element-active-color)" stroke-width="2"/>
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
    'obi-18-ais-notunderway': Obi18AisNotunderway;
  }
}