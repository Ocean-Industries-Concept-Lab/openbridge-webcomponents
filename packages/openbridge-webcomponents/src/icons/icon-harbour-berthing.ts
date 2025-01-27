import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-harbour-berthing')
export class ObiHarbourBerthing extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M20 2V22H22V2H20Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M13.4605 6.78366C13.3297 6.11657 13.1345 5.48583 12.9297 4.93775C12.3527 5.0345 11.7088 5.18074 11.0657 5.40103C9.68714 5.87327 8.49373 6.62113 7.82922 7.7721L3.33167 15.5621L8.52782 18.5621L13.0254 10.7721C13.6899 9.62113 13.7409 8.21368 13.4605 6.78366ZM7.97878 16.5131L11.7263 10.0221C12.1375 9.31002 12.2331 8.31971 11.9885 7.07222C11.9644 6.94929 11.9376 6.82723 11.9086 6.70643C11.7895 6.74167 11.6703 6.77949 11.5518 6.82009C10.3492 7.23204 9.53938 7.81001 9.12826 8.5221L5.3807 15.0131L7.97878 16.5131Z" fill="currentColor"/>
<path d="M14 18H12V16H14V18Z" fill="currentColor"/>
<path d="M16 18H18V16H16V18Z" fill="currentColor"/>
<path d="M18 8H16V6H18V8Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M20 2V22H22V2H20Z" style="fill: var(--element-active-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M13.4605 6.78366C13.3297 6.11657 13.1345 5.48583 12.9297 4.93775C12.3527 5.0345 11.7088 5.18074 11.0657 5.40103C9.68714 5.87327 8.49373 6.62113 7.82922 7.7721L3.33167 15.5621L8.52782 18.5621L13.0254 10.7721C13.6899 9.62113 13.7409 8.21368 13.4605 6.78366ZM7.97878 16.5131L11.7263 10.0221C12.1375 9.31002 12.2331 8.31971 11.9885 7.07222C11.9644 6.94929 11.9376 6.82723 11.9086 6.70643C11.7895 6.74167 11.6703 6.77949 11.5518 6.82009C10.3492 7.23204 9.53938 7.81001 9.12826 8.5221L5.3807 15.0131L7.97878 16.5131Z" style="fill: var(--element-active-color)"/>
<path d="M14 18H12V16H14V18Z" style="fill: var(--element-active-color)"/>
<path d="M16 18H18V16H16V18Z" style="fill: var(--element-active-color)"/>
<path d="M18 8H16V6H18V8Z" style="fill: var(--element-active-color)"/>
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
    'obi-harbour-berthing': ObiHarbourBerthing;
  }
}
