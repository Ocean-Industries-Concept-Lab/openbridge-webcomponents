import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-buoy-spar-board')
export class ObiBuoySparBoard extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M15.0155 4.5L14.2155 6.5H16.9845L17.7845 4.5H15.0155ZM19.4514 4.37139C19.7142 3.71453 19.2304 3 18.523 3H14.677C14.2681 3 13.9004 3.24895 13.7486 3.62861L12.5486 6.62861C12.2858 7.28547 12.7696 8 13.477 8H17.323C17.7319 8 18.0996 7.75105 18.2514 7.37139L19.4514 4.37139Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M9.04148 20.5H6V19H9.17071C9.4323 18.2599 9.97609 17.653 10.6728 17.3088L12.5 10H16.5L14.4374 18.2505C14.6013 18.4785 14.734 18.7304 14.8293 19H18V20.5H14.9585C14.7205 21.9189 13.4865 23 12 23C10.5135 23 9.27952 21.9189 9.04148 20.5ZM13.5 20C13.5 20.8284 12.8284 21.5 12 21.5C11.1716 21.5 10.5 20.8284 10.5 20C10.5 19.1716 11.1716 18.5 12 18.5C12.8284 18.5 13.5 19.1716 13.5 20Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M15.0155 4.5L14.2155 6.5H16.9845L17.7845 4.5H15.0155ZM19.4514 4.37139C19.7142 3.71453 19.2304 3 18.523 3H14.677C14.2681 3 13.9004 3.24895 13.7486 3.62861L12.5486 6.62861C12.2858 7.28547 12.7696 8 13.477 8H17.323C17.7319 8 18.0996 7.75105 18.2514 7.37139L19.4514 4.37139Z" style="fill: var(--element-active-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M9.04148 20.5H6V19H9.17071C9.4323 18.2599 9.97609 17.653 10.6728 17.3088L12.5 10H16.5L14.4374 18.2505C14.6013 18.4785 14.734 18.7304 14.8293 19H18V20.5H14.9585C14.7205 21.9189 13.4865 23 12 23C10.5135 23 9.27952 21.9189 9.04148 20.5ZM13.5 20C13.5 20.8284 12.8284 21.5 12 21.5C11.1716 21.5 10.5 20.8284 10.5 20C10.5 19.1716 11.1716 18.5 12 18.5C12.8284 18.5 13.5 19.1716 13.5 20Z" style="fill: var(--element-active-color)"/>
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
    'obi-buoy-spar-board': ObiBuoySparBoard;
  }
}
