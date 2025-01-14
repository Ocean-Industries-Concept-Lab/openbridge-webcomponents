import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-buoy-can-cube')
export class ObiBuoyCanCube extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M16.6507 3.04939L14.049 4.55146L15.5511 7.15312L18.1528 5.65105L16.6507 3.04939ZM17.6997 1.86638C17.4236 1.38809 16.812 1.22421 16.3337 1.50035L12.866 3.50242C12.3877 3.77856 12.2239 4.39015 12.5 4.86845L14.5021 8.33613C14.7782 8.81442 15.3898 8.9783 15.8681 8.70216L19.3358 6.70009C19.8141 6.42395 19.9779 5.81236 19.7018 5.33406L17.6997 1.86638Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M9.17071 21.0004H2V19.5004H4.27273L6 10.0004H22L20.2727 19.5004H22V21.0004H14.8293C14.4175 22.1655 13.3062 23.0004 12 23.0004C10.6938 23.0004 9.58254 22.1655 9.17071 21.0004ZM20.2027 11.5004L18.7481 19.5004H14.9585C14.7205 18.0815 13.4865 17.0004 12 17.0004C10.5135 17.0004 9.27952 18.0815 9.04148 19.5004H5.79732L7.25186 11.5004H20.2027ZM13.5 20.0004C13.5 20.8288 12.8284 21.5004 12 21.5004C11.1716 21.5004 10.5 20.8288 10.5 20.0004C10.5 19.1719 11.1716 18.5004 12 18.5004C12.8284 18.5004 13.5 19.1719 13.5 20.0004Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M16.6507 3.04939L14.049 4.55146L15.5511 7.15312L18.1528 5.65105L16.6507 3.04939ZM17.6997 1.86638C17.4236 1.38809 16.812 1.22421 16.3337 1.50035L12.866 3.50242C12.3877 3.77856 12.2239 4.39015 12.5 4.86845L14.5021 8.33613C14.7782 8.81442 15.3898 8.9783 15.8681 8.70216L19.3358 6.70009C19.8141 6.42395 19.9779 5.81236 19.7018 5.33406L17.6997 1.86638Z" style="fill: var(--element-active-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M9.17071 21.0004H2V19.5004H4.27273L6 10.0004H22L20.2727 19.5004H22V21.0004H14.8293C14.4175 22.1655 13.3062 23.0004 12 23.0004C10.6938 23.0004 9.58254 22.1655 9.17071 21.0004ZM20.2027 11.5004L18.7481 19.5004H14.9585C14.7205 18.0815 13.4865 17.0004 12 17.0004C10.5135 17.0004 9.27952 18.0815 9.04148 19.5004H5.79732L7.25186 11.5004H20.2027ZM13.5 20.0004C13.5 20.8288 12.8284 21.5004 12 21.5004C11.1716 21.5004 10.5 20.8288 10.5 20.0004C10.5 19.1719 11.1716 18.5004 12 18.5004C12.8284 18.5004 13.5 19.1719 13.5 20.0004Z" style="fill: var(--element-active-color)"/>
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
    'obi-buoy-can-cube': ObiBuoyCanCube;
  }
}