import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-07-track-no')
export class Obi07TrackNo extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M15.2804 12.3618L9.8285 17.8137L7.00007 14.9853L12.4519 9.53342C13.2574 8.72791 14.3226 8.28463 15.4397 8.07049C15.9609 7.97059 16.4612 7.92711 16.8996 7.91421C16.8867 8.35262 16.8432 8.8529 16.7433 9.37404C16.5291 10.4912 16.0859 11.5563 15.2804 12.3618Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M15.2804 12.3618L9.8285 17.8137L7.00007 14.9853L12.4519 9.53342C13.2574 8.72791 14.3226 8.28463 15.4397 8.07049C15.9609 7.97059 16.4612 7.92711 16.8996 7.91421C16.8867 8.35262 16.8432 8.8529 16.7433 9.37404C16.5291 10.4912 16.0859 11.5563 15.2804 12.3618Z" style="fill: var(--element-active-color)"/>
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
    'obi-07-track-no': Obi07TrackNo;
  }
}
