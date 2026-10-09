import {LitElement, html, css, svg} from 'lit';
import {property} from 'lit/decorators.js';
import {customElement} from '../decorator.js';

@customElement('obi-output')
export class ObiOutput extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M22 12L17 17L15.5996 15.5996L18.1748 13H8V11H18.1748L15.5996 8.40039L17 7L22 12Z" fill="currentColor"/>
<path d="M8.09961 2.78711C9.31628 2.26211 10.6167 2 12 2V4C9.76667 4 7.8752 4.7752 6.3252 6.3252C4.7752 7.8752 4 9.76667 4 12C4 14.2333 4.7752 16.1248 6.3252 17.6748C7.8752 19.2248 9.76667 20 12 20V22C10.6167 22 9.31628 21.7379 8.09961 21.2129C6.88302 20.6879 5.82476 19.9751 4.9248 19.0752C4.02485 18.1752 3.3121 17.117 2.78711 15.9004C2.26211 14.6837 2 13.3833 2 12C2 10.6167 2.26211 9.31628 2.78711 8.09961C3.3121 6.88302 4.02485 5.82476 4.9248 4.9248C5.82476 4.02485 6.88302 3.3121 8.09961 2.78711Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M22 12L17 17L15.5996 15.5996L18.1748 13H8V11H18.1748L15.5996 8.40039L17 7L22 12Z" style="fill: var(--element-active-color)"/>
<path d="M8.09961 2.78711C9.31628 2.26211 10.6167 2 12 2V4C9.76667 4 7.8752 4.7752 6.3252 6.3252C4.7752 7.8752 4 9.76667 4 12C4 14.2333 4.7752 16.1248 6.3252 17.6748C7.8752 19.2248 9.76667 20 12 20V22C10.6167 22 9.31628 21.7379 8.09961 21.2129C6.88302 20.6879 5.82476 19.9751 4.9248 19.0752C4.02485 18.1752 3.3121 17.117 2.78711 15.9004C2.26211 14.6837 2 13.3833 2 12C2 10.6167 2.26211 9.31628 2.78711 8.09961C3.3121 6.88302 4.02485 5.82476 4.9248 4.9248C5.82476 4.02485 6.88302 3.3121 8.09961 2.78711Z" style="fill: var(--element-active-color)"/>
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
    'obi-output': ObiOutput;
  }
}
