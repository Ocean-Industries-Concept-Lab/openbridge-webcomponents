import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-04-illumination-high')
export class Obi04IlluminationHigh extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M19.7782 5.63589L18.364 4.22168L15.5355 7.05011L16.9497 8.46432L19.7782 5.63589Z" fill="currentColor"/>
<path d="M10 5.99988H14V8.53498C15.1956 9.2266 16 10.5193 16 11.9999C16 14.209 14.2091 15.9999 12 15.9999C9.79086 15.9999 8 14.209 8 11.9999C8 10.5193 8.8044 9.2266 10 8.53498V5.99988Z" fill="currentColor"/>
<path d="M2 12.9999V10.9999H6V12.9999H2Z" fill="currentColor"/>
<path d="M5.63605 4.22168L4.22183 5.63589L7.05026 8.46432L8.46447 7.05011L5.63605 4.22168Z" fill="currentColor"/>
<path d="M13 17.9999V21.9999H11V17.9999H13Z" fill="currentColor"/>
<path d="M8.46446 16.9496L7.05025 15.5354L4.22182 18.3638L5.63603 19.778L8.46446 16.9496Z" fill="currentColor"/>
<path d="M18 10.9999H22V12.9999H18V10.9999Z" fill="currentColor"/>
<path d="M16.9498 15.5354L15.5355 16.9496L18.364 19.778L19.7782 18.3638L16.9498 15.5354Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M19.7782 5.63589L18.364 4.22168L15.5355 7.05011L16.9497 8.46432L19.7782 5.63589Z" style="fill: var(--element-active-color)"/>
<path d="M10 5.99988H14V8.53498C15.1956 9.2266 16 10.5193 16 11.9999C16 14.209 14.2091 15.9999 12 15.9999C9.79086 15.9999 8 14.209 8 11.9999C8 10.5193 8.8044 9.2266 10 8.53498V5.99988Z" style="fill: var(--element-active-color)"/>
<path d="M2 12.9999V10.9999H6V12.9999H2Z" style="fill: var(--element-active-color)"/>
<path d="M5.63605 4.22168L4.22183 5.63589L7.05026 8.46432L8.46447 7.05011L5.63605 4.22168Z" style="fill: var(--element-active-color)"/>
<path d="M13 17.9999V21.9999H11V17.9999H13Z" style="fill: var(--element-active-color)"/>
<path d="M8.46446 16.9496L7.05025 15.5354L4.22182 18.3638L5.63603 19.778L8.46446 16.9496Z" style="fill: var(--element-active-color)"/>
<path d="M18 10.9999H22V12.9999H18V10.9999Z" style="fill: var(--element-active-color)"/>
<path d="M16.9498 15.5354L15.5355 16.9496L18.364 19.778L19.7782 18.3638L16.9498 15.5354Z" style="fill: var(--element-active-color)"/>
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
    'obi-04-illumination-high': Obi04IlluminationHigh;
  }
}
