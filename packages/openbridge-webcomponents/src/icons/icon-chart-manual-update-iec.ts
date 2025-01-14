import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-chart-manual-update-iec')
export class ObiChartManualUpdateIec extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M9 22V17.75L18.175 8.57498C18.375 8.37498 18.6 8.22498 18.85 8.12498C19.1 8.02498 19.35 7.97498 19.6 7.97498C19.8667 7.97498 20.1208 8.02498 20.3625 8.12498C20.6042 8.22498 20.825 8.37498 21.025 8.57498L22.425 9.99998C22.6083 10.2 22.75 10.4208 22.85 10.6625C22.95 10.9041 23 11.15 23 11.4C23 11.65 22.9542 11.8958 22.8625 12.1375C22.7708 12.3791 22.625 12.6 22.425 12.8L13.25 22H9ZM11 20H12.4L18.2 14.2L17.5 13.5L16.775 12.8L11 18.575V20Z" fill="currentColor"/>
<path d="M5 1L1 6H9L5 1Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M2 15C2 13.7599 2.75245 12.6955 3.8257 12.2385L1 8H9L6.1743 12.2385C7.24755 12.6955 8 13.7599 8 15C8 16.6569 6.65685 18 5 18C3.34315 18 2 16.6569 2 15ZM4.68829 13.5324C4.00946 13.6759 3.5 14.2785 3.5 15C3.5 15.8284 4.17157 16.5 5 16.5C5.82843 16.5 6.5 15.8284 6.5 15C6.5 14.2785 5.99054 13.6759 5.31171 13.5324C5.21116 13.5112 5.10688 13.5 5 13.5C4.89312 13.5 4.78884 13.5112 4.68829 13.5324Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M9 22V17.75L18.175 8.57498C18.375 8.37498 18.6 8.22498 18.85 8.12498C19.1 8.02498 19.35 7.97498 19.6 7.97498C19.8667 7.97498 20.1208 8.02498 20.3625 8.12498C20.6042 8.22498 20.825 8.37498 21.025 8.57498L22.425 9.99998C22.6083 10.2 22.75 10.4208 22.85 10.6625C22.95 10.9041 23 11.15 23 11.4C23 11.65 22.9542 11.8958 22.8625 12.1375C22.7708 12.3791 22.625 12.6 22.425 12.8L13.25 22H9ZM11 20H12.4L18.2 14.2L17.5 13.5L16.775 12.8L11 18.575V20Z" style="fill: var(--element-active-color)"/>
<path d="M5 1L1 6H9L5 1Z" style="fill: var(--element-active-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M2 15C2 13.7599 2.75245 12.6955 3.8257 12.2385L1 8H9L6.1743 12.2385C7.24755 12.6955 8 13.7599 8 15C8 16.6569 6.65685 18 5 18C3.34315 18 2 16.6569 2 15ZM4.68829 13.5324C4.00946 13.6759 3.5 14.2785 3.5 15C3.5 15.8284 4.17157 16.5 5 16.5C5.82843 16.5 6.5 15.8284 6.5 15C6.5 14.2785 5.99054 13.6759 5.31171 13.5324C5.21116 13.5112 5.10688 13.5 5 13.5C4.89312 13.5 4.78884 13.5112 4.68829 13.5324Z" style="fill: var(--element-active-color)"/>
</svg>
`;

  override render() {
    return html`
      <div class="wrapper" >
        ${this.useCssColor? this.iconCss : this.icon}
      </div>
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
    'obi-chart-manual-update-iec': ObiChartManualUpdateIec;
  }
}