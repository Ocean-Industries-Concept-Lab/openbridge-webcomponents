import {LitElement, html, css, svg} from 'lit';
import {property} from 'lit/decorators.js';
import {customElement} from '../decorator.js';

@customElement('obi-unfold-less-google')
export class ObiUnfoldLessGoogle extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M11.9902 8.17L8.82016 5L7.41016 6.41L11.9902 11L16.5802 6.41L15.1602 5L11.9902 8.17ZM12.0102 15.83L15.1802 19L16.5902 17.59L12.0102 13L7.42015 17.59L8.84015 19L12.0102 15.83Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M11.9902 8.17L8.82016 5L7.41016 6.41L11.9902 11L16.5802 6.41L15.1602 5L11.9902 8.17ZM12.0102 15.83L15.1802 19L16.5902 17.59L12.0102 13L7.42015 17.59L8.84015 19L12.0102 15.83Z" style="fill: var(--element-active-color)"/>
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
    'obi-unfold-less-google': ObiUnfoldLessGoogle;
  }
}
