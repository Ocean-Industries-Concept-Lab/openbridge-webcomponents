import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-buoy-default')
export class ObiBuoyDefault extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M9.40052 18.5014C6.82166 17.4694 5 14.9474 5 12C5 8.13401 8.13401 5 12 5C15.866 5 19 8.13401 19 12C19 14.9474 17.1783 17.4694 14.5995 18.5014C14.6906 18.6591 14.7677 18.8259 14.8293 19H20V20.5H14.9585C14.7205 21.9189 13.4865 23 12 23C10.5135 23 9.27952 21.9189 9.04148 20.5H4V19H9.17071C9.23225 18.8259 9.30942 18.6591 9.40052 18.5014ZM17.5 12C17.5 14.5657 15.7432 16.7211 13.3669 17.3288C12.957 17.1186 12.4923 17 12 17C11.5077 17 11.043 17.1186 10.6331 17.3288C8.25679 16.7211 6.5 14.5657 6.5 12C6.5 8.96243 8.96243 6.5 12 6.5C15.0376 6.5 17.5 8.96243 17.5 12ZM13.5 20C13.5 20.8284 12.8284 21.5 12 21.5C11.1716 21.5 10.5 20.8284 10.5 20C10.5 19.1716 11.1716 18.5 12 18.5C12.8284 18.5 13.5 19.1716 13.5 20Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M9.40052 18.5014C6.82166 17.4694 5 14.9474 5 12C5 8.13401 8.13401 5 12 5C15.866 5 19 8.13401 19 12C19 14.9474 17.1783 17.4694 14.5995 18.5014C14.6906 18.6591 14.7677 18.8259 14.8293 19H20V20.5H14.9585C14.7205 21.9189 13.4865 23 12 23C10.5135 23 9.27952 21.9189 9.04148 20.5H4V19H9.17071C9.23225 18.8259 9.30942 18.6591 9.40052 18.5014ZM17.5 12C17.5 14.5657 15.7432 16.7211 13.3669 17.3288C12.957 17.1186 12.4923 17 12 17C11.5077 17 11.043 17.1186 10.6331 17.3288C8.25679 16.7211 6.5 14.5657 6.5 12C6.5 8.96243 8.96243 6.5 12 6.5C15.0376 6.5 17.5 8.96243 17.5 12ZM13.5 20C13.5 20.8284 12.8284 21.5 12 21.5C11.1716 21.5 10.5 20.8284 10.5 20C10.5 19.1716 11.1716 18.5 12 18.5C12.8284 18.5 13.5 19.1716 13.5 20Z" style="fill: var(--element-active-color)"/>
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
    'obi-buoy-default': ObiBuoyDefault;
  }
}
