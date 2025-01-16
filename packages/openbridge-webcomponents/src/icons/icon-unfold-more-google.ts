import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-unfold-more-google')
export class ObiUnfoldMoreGoogle extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M11.9999 6.83L15.1699 10L16.5799 8.59L11.9999 4L7.40991 8.59L8.82991 10L11.9999 6.83Z" fill="currentColor"/>
<path d="M11.9999 17.17L8.82991 14L7.41991 15.41L11.9999 20L16.5899 15.41L15.1699 14L11.9999 17.17Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M11.9999 6.83L15.1699 10L16.5799 8.59L11.9999 4L7.40991 8.59L8.82991 10L11.9999 6.83Z" style="fill: var(--element-active-color)"/>
<path d="M11.9999 17.17L8.82991 14L7.41991 15.41L11.9999 20L16.5899 15.41L15.1699 14L11.9999 17.17Z" style="fill: var(--element-active-color)"/>
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
    'obi-unfold-more-google': ObiUnfoldMoreGoogle;
  }
}
