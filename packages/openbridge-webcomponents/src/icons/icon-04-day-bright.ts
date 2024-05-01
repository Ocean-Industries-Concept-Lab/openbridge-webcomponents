import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-04-day-bright')
export class Obi04DayBright extends LitElement {
  @property({type: Boolean, attribute: 'use-css-color'}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M11 1V5H13V1H11Z" fill="currentColor"/>
<path d="M16.275 6.375L17.65 7.75L20.475 4.925L19.075 3.5L16.275 6.375Z" fill="currentColor"/>
<path d="M23 11H19V13H23V11Z" fill="currentColor"/>
<path d="M11 19V23H13V19H11Z" fill="currentColor"/>
<path d="M4.925 3.525L3.5 4.925L6.35 7.7L7.75 6.35L4.925 3.525Z" fill="currentColor"/>
<path d="M16.275 17.625L19.05 20.5L20.475 19.025L17.625 16.275L16.275 17.625Z" fill="currentColor"/>
<path d="M1 11V13H5V11H1Z" fill="currentColor"/>
<path d="M3.525 19.075L4.925 20.5L7.775 17.65L7.05 16.95L6.325 16.275L3.525 19.075Z" fill="currentColor"/>
<path d="M12 17C14.7614 17 17 14.7614 17 12C17 9.23858 14.7614 7 12 7C9.23858 7 7 9.23858 7 12C7 14.7614 9.23858 17 12 17Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M11 1V5H13V1H11Z" fill="currentColor"/>
<path d="M16.275 6.375L17.65 7.75L20.475 4.925L19.075 3.5L16.275 6.375Z" fill="currentColor"/>
<path d="M23 11H19V13H23V11Z" fill="currentColor"/>
<path d="M11 19V23H13V19H11Z" fill="currentColor"/>
<path d="M4.925 3.525L3.5 4.925L6.35 7.7L7.75 6.35L4.925 3.525Z" fill="currentColor"/>
<path d="M16.275 17.625L19.05 20.5L20.475 19.025L17.625 16.275L16.275 17.625Z" fill="currentColor"/>
<path d="M1 11V13H5V11H1Z" fill="currentColor"/>
<path d="M3.525 19.075L4.925 20.5L7.775 17.65L7.05 16.95L6.325 16.275L3.525 19.075Z" fill="currentColor"/>
<path d="M12 17C14.7614 17 17 14.7614 17 12C17 9.23858 14.7614 7 12 7C9.23858 7 7 9.23858 7 12C7 14.7614 9.23858 17 12 17Z" fill="currentColor"/>
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
    'obi-04-day-bright': Obi04DayBright;
  }
}
