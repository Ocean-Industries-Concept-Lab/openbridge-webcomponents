import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-07-track-on')
export class Obi07TrackOn extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M21.0607 4.44836L22.5607 2.94836L21.5 1.8877L20 3.3877L21.0607 4.44836Z" fill="currentColor"/>
<path d="M18.0607 7.44836L19.5607 5.94836L18.5 4.8877L17 6.3877L18.0607 7.44836Z" fill="currentColor"/>
<path d="M7.56066 17.9484L6.06066 19.4484L5 18.3877L6.5 16.8877L7.56066 17.9484Z" fill="currentColor"/>
<path d="M4.56066 20.9484L3.06066 22.4484L2 21.3877L3.5 19.8877L4.56066 20.9484Z" fill="currentColor"/>
<path d="M14.7804 12.3618L9.3285 17.8137L6.50007 14.9853L11.9519 9.53342C12.7574 8.72791 13.8226 8.28464 14.9397 8.07049C15.4609 7.97059 15.9612 7.92711 16.3996 7.91421C16.3867 8.35262 16.3432 8.85291 16.2433 9.37404C16.0291 10.4912 15.5859 11.5563 14.7804 12.3618Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M21.0607 4.44836L22.5607 2.94836L21.5 1.8877L20 3.3877L21.0607 4.44836Z" style="fill: var(--element-active-color)"/>
<path d="M18.0607 7.44836L19.5607 5.94836L18.5 4.8877L17 6.3877L18.0607 7.44836Z" style="fill: var(--element-active-color)"/>
<path d="M7.56066 17.9484L6.06066 19.4484L5 18.3877L6.5 16.8877L7.56066 17.9484Z" style="fill: var(--element-active-color)"/>
<path d="M4.56066 20.9484L3.06066 22.4484L2 21.3877L3.5 19.8877L4.56066 20.9484Z" style="fill: var(--element-active-color)"/>
<path d="M14.7804 12.3618L9.3285 17.8137L6.50007 14.9853L11.9519 9.53342C12.7574 8.72791 13.8226 8.28464 14.9397 8.07049C15.4609 7.97059 15.9612 7.92711 16.3996 7.91421C16.3867 8.35262 16.3432 8.85291 16.2433 9.37404C16.0291 10.4912 15.5859 11.5563 14.7804 12.3618Z" style="fill: var(--element-active-color)"/>
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
    'obi-07-track-on': Obi07TrackOn;
  }
}
