import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-plotted-position-iec')
export class ObiPlottedPositionIec extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="25" height="24" viewBox="0 0 25 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M4.5164 11.5H11.5V4.5164C7.75625 4.76282 4.76282 7.75625 4.5164 11.5ZM12.5 4.5164V11.5H19.4836C19.2372 7.75625 16.2438 4.76282 12.5 4.5164ZM19.4836 12.5H12.5V19.4836C16.2438 19.2372 19.2372 16.2438 19.4836 12.5ZM11.5 19.4836V12.5H4.5164C4.76282 16.2438 7.75625 19.2372 11.5 19.4836ZM3.5 12C3.5 7.30558 7.30558 3.5 12 3.5C16.6944 3.5 20.5 7.30558 20.5 12C20.5 16.6944 16.6944 20.5 12 20.5C7.30558 20.5 3.5 16.6944 3.5 12Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M4.5164 11.5H11.5V4.5164C7.75625 4.76282 4.76282 7.75625 4.5164 11.5ZM12.5 4.5164V11.5H19.4836C19.2372 7.75625 16.2438 4.76282 12.5 4.5164ZM19.4836 12.5H12.5V19.4836C16.2438 19.2372 19.2372 16.2438 19.4836 12.5ZM11.5 19.4836V12.5H4.5164C4.76282 16.2438 7.75625 19.2372 11.5 19.4836ZM3.5 12C3.5 7.30558 7.30558 3.5 12 3.5C16.6944 3.5 20.5 7.30558 20.5 12C20.5 16.6944 16.6944 20.5 12 20.5C7.30558 20.5 3.5 16.6944 3.5 12Z" style="fill: var(--element-active-color)"/>
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
    'obi-plotted-position-iec': ObiPlottedPositionIec;
  }
}
