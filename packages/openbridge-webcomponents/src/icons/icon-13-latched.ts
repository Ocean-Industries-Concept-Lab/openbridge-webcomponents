import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-13-latched')
export class Obi13Latched extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M8 12C8 13.6569 6.65685 15 5 15C3.34315 15 2 13.6569 2 12C2 10.3431 3.34315 9 5 9C6.65685 9 8 10.3431 8 12Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M4 11H12V13H4V11Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M22 13H15V11H22V13Z" fill="currentColor"/>
<path d="M15 9C13.3431 9 12 10.3431 12 12V13H10V12C10 9.23858 12.2386 7 15 7C17.0503 7 18.8124 8.2341 19.584 10H17.2361C16.6868 9.38625 15.8885 9 15 9Z" fill="currentColor"/>
<path d="M17.2361 14C16.6868 14.6137 15.8885 15 15 15C14.4477 15 14 15.4477 14 16C14 16.5523 14.4477 17 15 17C17.0503 17 18.8124 15.7659 19.584 14H17.2361Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M8 12C8 13.6569 6.65685 15 5 15C3.34315 15 2 13.6569 2 12C2 10.3431 3.34315 9 5 9C6.65685 9 8 10.3431 8 12Z" style="fill: var(--element-active-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M4 11H12V13H4V11Z" style="fill: var(--element-active-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M22 13H15V11H22V13Z" style="fill: var(--element-active-color)"/>
<path d="M15 9C13.3431 9 12 10.3431 12 12V13H10V12C10 9.23858 12.2386 7 15 7C17.0503 7 18.8124 8.2341 19.584 10H17.2361C16.6868 9.38625 15.8885 9 15 9Z" style="fill: var(--element-active-color)"/>
<path d="M17.2361 14C16.6868 14.6137 15.8885 15 15 15C14.4477 15 14 15.4477 14 16C14 16.5523 14.4477 17 15 17C17.0503 17 18.8124 15.7659 19.584 14H17.2361Z" style="fill: var(--element-active-color)"/>
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
    'obi-13-latched': Obi13Latched;
  }
}
