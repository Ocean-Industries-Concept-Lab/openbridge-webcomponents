import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-07-track-off-port')
export class Obi07TrackOffPort extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M22.2804 2.78039L20.7804 4.28039L19.7197 3.21973L21.2197 1.71973L22.2804 2.78039ZM19.2804 5.78039L17.7804 7.28039L16.7197 6.21973L18.2197 4.71973L19.2804 5.78039ZM16.2804 8.78039L14.7804 10.2804L13.7197 9.21973L15.2197 7.71973L16.2804 8.78039ZM13.2804 11.7804L11.7804 13.2804L10.7197 12.2197L12.2197 10.7197L13.2804 11.7804ZM10.2804 14.7804L8.78039 16.2804L7.71973 15.2197L9.21973 13.7197L10.2804 14.7804ZM7.28039 17.7804L5.78039 19.2804L4.71973 18.2197L6.21973 16.7197L7.28039 17.7804ZM4.28039 20.7804L2.78039 22.2804L1.71973 21.2197L3.21973 19.7197L4.28039 20.7804Z" fill="currentColor"/>
<path d="M10.7804 6.36184L5.3285 11.8137L2.50007 8.98528L7.95193 3.53342C8.75744 2.72791 9.82258 2.28463 10.9397 2.07049C11.4609 1.97059 11.9612 1.92711 12.3996 1.91421C12.3867 2.35262 12.3432 2.8529 12.2433 3.37404C12.0291 4.4912 11.5859 5.55633 10.7804 6.36184Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M22.2804 2.78039L20.7804 4.28039L19.7197 3.21973L21.2197 1.71973L22.2804 2.78039ZM19.2804 5.78039L17.7804 7.28039L16.7197 6.21973L18.2197 4.71973L19.2804 5.78039ZM16.2804 8.78039L14.7804 10.2804L13.7197 9.21973L15.2197 7.71973L16.2804 8.78039ZM13.2804 11.7804L11.7804 13.2804L10.7197 12.2197L12.2197 10.7197L13.2804 11.7804ZM10.2804 14.7804L8.78039 16.2804L7.71973 15.2197L9.21973 13.7197L10.2804 14.7804ZM7.28039 17.7804L5.78039 19.2804L4.71973 18.2197L6.21973 16.7197L7.28039 17.7804ZM4.28039 20.7804L2.78039 22.2804L1.71973 21.2197L3.21973 19.7197L4.28039 20.7804Z" style="fill: var(--element-active-color)"/>
<path d="M10.7804 6.36184L5.3285 11.8137L2.50007 8.98528L7.95193 3.53342C8.75744 2.72791 9.82258 2.28463 10.9397 2.07049C11.4609 1.97059 11.9612 1.92711 12.3996 1.91421C12.3867 2.35262 12.3432 2.8529 12.2433 3.37404C12.0291 4.4912 11.5859 5.55633 10.7804 6.36184Z" style="fill: var(--element-active-color)"/>
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
    'obi-07-track-off-port': Obi07TrackOffPort;
  }
}
