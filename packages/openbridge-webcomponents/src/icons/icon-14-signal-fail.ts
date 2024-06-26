import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-14-signal-fail')
export class Obi14SignalFail extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M10 4H14V15H10V4Z" fill="currentColor"/>
<path d="M14 18C14 19.1046 13.1046 20 12 20C10.8954 20 10 19.1046 10 18C10 16.8954 10.8954 16 12 16C13.1046 16 14 16.8954 14 18Z" fill="currentColor"/>
<path d="M17.24 16.198C18.33 15.1287 19 13.6436 19 12C19 10.3564 18.33 8.87129 17.24 7.80198L15.82 9.20792C16.55 9.92079 17 10.9109 17 12C17 13.0891 16.55 14.0792 15.83 14.802L17.24 16.198Z" fill="currentColor"/>
<path d="M21 12C21 14.1881 20.1 16.1683 18.65 17.5941L20.07 19C21.88 17.2079 23 14.7327 23 12C23 9.26733 21.88 6.79208 20.07 5L18.65 6.40594C20.1 7.83168 21 9.81188 21 12Z" fill="currentColor"/>
<path d="M6.76 16.198C5.67 15.1287 5 13.6436 5 12C5 10.3564 5.67 8.87129 6.76 7.80198L8.18 9.20792C7.45 9.92079 7 10.9109 7 12C7 13.0891 7.45 14.0792 8.17 14.802L6.76 16.198Z" fill="currentColor"/>
<path d="M5.35 6.40594L3.93 5C2.12 6.79208 1 9.26733 1 12C1 14.7327 2.12 17.2079 3.93 19L5.35 17.5941C3.9 16.1683 3 14.1881 3 12C3 9.81188 3.9 7.83168 5.35 6.40594Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M10 4H14V15H10V4Z" style="fill: var(--element-active-color)"/>
<path d="M14 18C14 19.1046 13.1046 20 12 20C10.8954 20 10 19.1046 10 18C10 16.8954 10.8954 16 12 16C13.1046 16 14 16.8954 14 18Z" style="fill: var(--element-active-color)"/>
<path d="M17.24 16.198C18.33 15.1287 19 13.6436 19 12C19 10.3564 18.33 8.87129 17.24 7.80198L15.82 9.20792C16.55 9.92079 17 10.9109 17 12C17 13.0891 16.55 14.0792 15.83 14.802L17.24 16.198Z" style="fill: var(--element-active-color)"/>
<path d="M21 12C21 14.1881 20.1 16.1683 18.65 17.5941L20.07 19C21.88 17.2079 23 14.7327 23 12C23 9.26733 21.88 6.79208 20.07 5L18.65 6.40594C20.1 7.83168 21 9.81188 21 12Z" style="fill: var(--element-active-color)"/>
<path d="M6.76 16.198C5.67 15.1287 5 13.6436 5 12C5 10.3564 5.67 8.87129 6.76 7.80198L8.18 9.20792C7.45 9.92079 7 10.9109 7 12C7 13.0891 7.45 14.0792 8.17 14.802L6.76 16.198Z" style="fill: var(--element-active-color)"/>
<path d="M5.35 6.40594L3.93 5C2.12 6.79208 1 9.26733 1 12C1 14.7327 2.12 17.2079 3.93 19L5.35 17.5941C3.9 16.1683 3 14.1881 3 12C3 9.81188 3.9 7.83168 5.35 6.40594Z" style="fill: var(--element-active-color)"/>
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
    'obi-14-signal-fail': Obi14SignalFail;
  }
}
