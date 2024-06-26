import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-07-target-cancel-all')
export class Obi07TargetCancelAll extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M2 8.66667V4.22222C2 3 3 2 4.22222 2H8.66667V4.22222H4.22222V8.66667H2Z" fill="currentColor"/>
<path d="M2 15.3334H4.22222V19.7779H8.66667V22.0001H4.22222C3 22.0001 2 21.0001 2 19.7779V15.3334Z" fill="currentColor"/>
<path d="M19.7778 19.7779H15.3333V22.0001H19.7778C21 22.0001 22 21.0001 22 19.7779V15.3334H19.7778V19.7779Z" fill="currentColor"/>
<path d="M15.3333 2H19.7778C21 2 22 3 22 4.22222V8.66667H19.7778V4.22222H15.3333V2Z" fill="currentColor"/>
<path d="M17.7782 12.7073L16.2427 14.2427L17.7782 15.7782L17.0711 16.4854L15.5356 14.9498L14 16.4854L13.2929 15.7783L14.8285 14.2427L13.2929 12.7072L14 12.0001L15.5356 13.5356L17.0711 12.0001L17.7782 12.7073Z" fill="currentColor"/>
<path d="M9.2427 9.24274L10.7782 7.70725L10.0711 7.00015L8.5356 8.53563L7.00004 7.00007L6.29293 7.70718L7.82849 9.24274L6.29291 10.7783L7.00001 11.4854L8.5356 9.94984L10.0711 11.4854L10.7782 10.7782L9.2427 9.24274Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M2 8.66667V4.22222C2 3 3 2 4.22222 2H8.66667V4.22222H4.22222V8.66667H2Z" style="fill: var(--element-active-color)"/>
<path d="M2 15.3334H4.22222V19.7779H8.66667V22.0001H4.22222C3 22.0001 2 21.0001 2 19.7779V15.3334Z" style="fill: var(--element-active-color)"/>
<path d="M19.7778 19.7779H15.3333V22.0001H19.7778C21 22.0001 22 21.0001 22 19.7779V15.3334H19.7778V19.7779Z" style="fill: var(--element-active-color)"/>
<path d="M15.3333 2H19.7778C21 2 22 3 22 4.22222V8.66667H19.7778V4.22222H15.3333V2Z" style="fill: var(--element-active-color)"/>
<path d="M17.7782 12.7073L16.2427 14.2427L17.7782 15.7782L17.0711 16.4854L15.5356 14.9498L14 16.4854L13.2929 15.7783L14.8285 14.2427L13.2929 12.7072L14 12.0001L15.5356 13.5356L17.0711 12.0001L17.7782 12.7073Z" style="fill: var(--element-active-color)"/>
<path d="M9.2427 9.24274L10.7782 7.70725L10.0711 7.00015L8.5356 8.53563L7.00004 7.00007L6.29293 7.70718L7.82849 9.24274L6.29291 10.7783L7.00001 11.4854L8.5356 9.94984L10.0711 11.4854L10.7782 10.7782L9.2427 9.24274Z" style="fill: var(--element-active-color)"/>
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
    'obi-07-target-cancel-all': Obi07TargetCancelAll;
  }
}
