import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-13-container')
export class Obi13Container extends LitElement {
  @property({type: Boolean, attribute: 'use-css-color'}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M16.5502 11L12.4998 7.75969V2H11.4998V7.75969L7.44946 11H3V21H21V11H16.5502ZM14.9495 11L11.9998 8.64031L9.05024 11H14.9495ZM19 13H17V19H19V13ZM15 13H13V19H15V13ZM9 13H11V19H9V13ZM7 13V19H5V13H7Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M16.5502 11L12.4998 7.75969V2H11.4998V7.75969L7.44946 11H3V21H21V11H16.5502ZM14.9495 11L11.9998 8.64031L9.05024 11H14.9495ZM19 13H17V19H19V13ZM15 13H13V19H15V13ZM9 13H11V19H9V13ZM7 13V19H5V13H7Z" style="fill: var(--element-active-color)"/>
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
    'obi-13-container': Obi13Container;
  }
}
