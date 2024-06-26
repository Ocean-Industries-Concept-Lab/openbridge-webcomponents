import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-07-track-off-strb')
export class Obi07TrackOffStrb extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M22.2794 2.78039L20.7794 4.28039L19.7188 3.21973L21.2188 1.71973L22.2794 2.78039ZM19.2794 5.78039L17.7794 7.28039L16.7188 6.21973L18.2188 4.71973L19.2794 5.78039ZM16.2794 8.78039L14.7794 10.2804L13.7188 9.21973L15.2188 7.71973L16.2794 8.78039ZM13.2794 11.7804L11.7794 13.2804L10.7188 12.2197L12.2188 10.7197L13.2794 11.7804ZM10.2794 14.7804L8.77941 16.2804L7.71875 15.2197L9.21875 13.7197L10.2794 14.7804ZM7.27941 17.7804L5.77941 19.2804L4.71875 18.2197L6.21875 16.7197L7.27941 17.7804ZM4.27941 20.7804L2.77941 22.2804L1.71875 21.2197L3.21875 19.7197L4.27941 20.7804Z" fill="currentColor"/>
<path d="M20.2804 15.8618L14.8285 21.3137L12.0001 18.4853L17.4519 13.0334C18.2574 12.2279 19.3226 11.7846 20.4397 11.5705C20.9609 11.4706 21.4612 11.4271 21.8996 11.4142C21.8867 11.8526 21.8432 12.3529 21.7433 12.874C21.5291 13.9912 21.0859 15.0563 20.2804 15.8618Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M22.2794 2.78039L20.7794 4.28039L19.7188 3.21973L21.2188 1.71973L22.2794 2.78039ZM19.2794 5.78039L17.7794 7.28039L16.7188 6.21973L18.2188 4.71973L19.2794 5.78039ZM16.2794 8.78039L14.7794 10.2804L13.7188 9.21973L15.2188 7.71973L16.2794 8.78039ZM13.2794 11.7804L11.7794 13.2804L10.7188 12.2197L12.2188 10.7197L13.2794 11.7804ZM10.2794 14.7804L8.77941 16.2804L7.71875 15.2197L9.21875 13.7197L10.2794 14.7804ZM7.27941 17.7804L5.77941 19.2804L4.71875 18.2197L6.21875 16.7197L7.27941 17.7804ZM4.27941 20.7804L2.77941 22.2804L1.71875 21.2197L3.21875 19.7197L4.27941 20.7804Z" style="fill: var(--element-active-color)"/>
<path d="M20.2804 15.8618L14.8285 21.3137L12.0001 18.4853L17.4519 13.0334C18.2574 12.2279 19.3226 11.7846 20.4397 11.5705C20.9609 11.4706 21.4612 11.4271 21.8996 11.4142C21.8867 11.8526 21.8432 12.3529 21.7433 12.874C21.5291 13.9912 21.0859 15.0563 20.2804 15.8618Z" style="fill: var(--element-active-color)"/>
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
    'obi-07-track-off-strb': Obi07TrackOffStrb;
  }
}
