import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-02-unfold-less')
export class Obi02UnfoldLess extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M11.99 8.17L8.82003 5L7.41003 6.41L11.99 11L16.58 6.41L15.16 5L11.99 8.17ZM12.01 15.83L15.18 19L16.59 17.59L12.01 13L7.42003 17.59L8.84003 19L12.01 15.83Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M11.99 8.17L8.82003 5L7.41003 6.41L11.99 11L16.58 6.41L15.16 5L11.99 8.17ZM12.01 15.83L15.18 19L16.59 17.59L12.01 13L7.42003 17.59L8.84003 19L12.01 15.83Z" style="fill: var(--element-active-color)"/>
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
    'obi-02-unfold-less': Obi02UnfoldLess;
  }
}
