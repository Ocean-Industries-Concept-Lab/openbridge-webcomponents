import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-buoy-spar-cube')
export class ObiBuoySparCube extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M16.6507 3.04939L14.049 4.55146L15.5511 7.15312L18.1528 5.65105L16.6507 3.04939ZM17.6997 1.86638C17.4236 1.38809 16.812 1.22421 16.3337 1.50035L12.866 3.50242C12.3877 3.77856 12.2239 4.39015 12.5 4.86845L14.5021 8.33613C14.7782 8.81442 15.3898 8.9783 15.8681 8.70216L19.3358 6.70009C19.8141 6.42395 19.9779 5.81236 19.7018 5.33406L17.6997 1.86638Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M9.04148 20.5004H6V19.0004H9.17071C9.4323 18.2602 9.97609 17.6534 10.6728 17.3092L12.5 10.0004H16.5L14.4374 18.2509C14.6013 18.4789 14.734 18.7308 14.8293 19.0004H18V20.5004H14.9585C14.7205 21.9192 13.4865 23.0004 12 23.0004C10.5135 23.0004 9.27952 21.9192 9.04148 20.5004ZM13.5 20.0004C13.5 20.8288 12.8284 21.5004 12 21.5004C11.1716 21.5004 10.5 20.8288 10.5 20.0004C10.5 19.1719 11.1716 18.5004 12 18.5004C12.8284 18.5004 13.5 19.1719 13.5 20.0004Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M16.6507 3.04939L14.049 4.55146L15.5511 7.15312L18.1528 5.65105L16.6507 3.04939ZM17.6997 1.86638C17.4236 1.38809 16.812 1.22421 16.3337 1.50035L12.866 3.50242C12.3877 3.77856 12.2239 4.39015 12.5 4.86845L14.5021 8.33613C14.7782 8.81442 15.3898 8.9783 15.8681 8.70216L19.3358 6.70009C19.8141 6.42395 19.9779 5.81236 19.7018 5.33406L17.6997 1.86638Z" style="fill: var(--element-active-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M9.04148 20.5004H6V19.0004H9.17071C9.4323 18.2602 9.97609 17.6534 10.6728 17.3092L12.5 10.0004H16.5L14.4374 18.2509C14.6013 18.4789 14.734 18.7308 14.8293 19.0004H18V20.5004H14.9585C14.7205 21.9192 13.4865 23.0004 12 23.0004C10.5135 23.0004 9.27952 21.9192 9.04148 20.5004ZM13.5 20.0004C13.5 20.8288 12.8284 21.5004 12 21.5004C11.1716 21.5004 10.5 20.8288 10.5 20.0004C10.5 19.1719 11.1716 18.5004 12 18.5004C12.8284 18.5004 13.5 19.1719 13.5 20.0004Z" style="fill: var(--element-active-color)"/>
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
    'obi-buoy-spar-cube': ObiBuoySparCube;
  }
}
