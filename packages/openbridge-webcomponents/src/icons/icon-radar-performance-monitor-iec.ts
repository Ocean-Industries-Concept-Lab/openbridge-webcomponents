import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-radar-performance-monitor-iec')
export class ObiRadarPerformanceMonitorIec extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M16.2501 9.18934V5H14.7501V9.18934L13.5304 7.96967L12.4697 9.03033L15.5001 12.0607L18.5304 9.03033L17.4697 7.96967L16.2501 9.18934Z" fill="currentColor"/>
<path d="M9.25006 12V7.81066L10.4697 9.03033L11.5304 7.96967L8.50006 4.93934L5.46973 7.96967L6.53039 9.03033L7.75006 7.81066V12H9.25006Z" fill="currentColor"/>
<path d="M6.67099 13.1646L5.32935 13.8354L7.53664 18.25H16.4637L18.671 13.8354L17.3293 13.1646L15.5366 16.75H8.46369L6.67099 13.1646Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M23 12C23 18.0751 18.0751 23 12 23C5.92487 23 1 18.0751 1 12C1 5.92487 5.92487 1 12 1C18.0751 1 23 5.92487 23 12ZM21.5 12C21.5 17.2467 17.2467 21.5 12 21.5C6.75329 21.5 2.5 17.2467 2.5 12C2.5 6.75329 6.75329 2.5 12 2.5C17.2467 2.5 21.5 6.75329 21.5 12Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M16.2501 9.18934V5H14.7501V9.18934L13.5304 7.96967L12.4697 9.03033L15.5001 12.0607L18.5304 9.03033L17.4697 7.96967L16.2501 9.18934Z" style="fill: var(--element-active-color)"/>
<path d="M9.25006 12V7.81066L10.4697 9.03033L11.5304 7.96967L8.50006 4.93934L5.46973 7.96967L6.53039 9.03033L7.75006 7.81066V12H9.25006Z" style="fill: var(--element-active-color)"/>
<path d="M6.67099 13.1646L5.32935 13.8354L7.53664 18.25H16.4637L18.671 13.8354L17.3293 13.1646L15.5366 16.75H8.46369L6.67099 13.1646Z" style="fill: var(--element-active-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M23 12C23 18.0751 18.0751 23 12 23C5.92487 23 1 18.0751 1 12C1 5.92487 5.92487 1 12 1C18.0751 1 23 5.92487 23 12ZM21.5 12C21.5 17.2467 17.2467 21.5 12 21.5C6.75329 21.5 2.5 17.2467 2.5 12C2.5 6.75329 6.75329 2.5 12 2.5C17.2467 2.5 21.5 6.75329 21.5 12Z" style="fill: var(--element-active-color)"/>
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
    'obi-radar-performance-monitor-iec': ObiRadarPerformanceMonitorIec;
  }
}