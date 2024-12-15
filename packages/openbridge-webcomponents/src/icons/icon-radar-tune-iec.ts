import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-radar-tune-iec')
export class ObiRadarTuneIec extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M19.7147 19.3633C21.1423 17.6348 22 15.417 22 13C22 7.47754 17.5228 3 12 3C6.47717 3 2 7.47754 2 13C2 15.417 2.85767 17.6348 4.28528 19.3633C3.78125 18.3408 3.5 17.2012 3.5 16C3.5 11.582 7.30554 8 12 8C16.6945 8 20.5 11.582 20.5 16C20.5 17.2012 20.2188 18.3408 19.7147 19.3633Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M19.7147 19.3633C21.1423 17.6348 22 15.417 22 13C22 7.47754 17.5228 3 12 3C6.47717 3 2 7.47754 2 13C2 15.417 2.85767 17.6348 4.28528 19.3633C3.78125 18.3408 3.5 17.2012 3.5 16C3.5 11.582 7.30554 8 12 8C16.6945 8 20.5 11.582 20.5 16C20.5 17.2012 20.2188 18.3408 19.7147 19.3633Z" style="fill: var(--element-active-color)"/>
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
    'obi-radar-tune-iec': ObiRadarTuneIec;
  }
}
