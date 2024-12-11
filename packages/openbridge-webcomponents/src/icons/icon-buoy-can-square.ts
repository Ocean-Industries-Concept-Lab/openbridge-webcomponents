import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-buoy-can-square')
export class ObiBuoyCanSquare extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M15.7478 2.5L14.0811 7.5H16.2522L17.9189 2.5H15.7478ZM15.3874 1C14.957 1 14.5749 1.27543 14.4387 1.68377L12.4387 7.68377C12.2229 8.3313 12.7049 9 13.3874 9H16.6126C17.043 9 17.4251 8.72457 17.5613 8.31623L19.5613 2.31623C19.7771 1.6687 19.2951 1 18.6126 1H15.3874Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M9.17071 21H2V19.5H4.27273L6 10H22L20.2727 19.5H22V21H14.8293C14.4175 22.1652 13.3062 23 12 23C10.6938 23 9.58254 22.1652 9.17071 21ZM20.2027 11.5L18.7481 19.5H14.9585C14.7205 18.0811 13.4865 17 12 17C10.5135 17 9.27952 18.0811 9.04148 19.5H5.79732L7.25186 11.5H20.2027ZM13.5 20C13.5 20.8284 12.8284 21.5 12 21.5C11.1716 21.5 10.5 20.8284 10.5 20C10.5 19.1716 11.1716 18.5 12 18.5C12.8284 18.5 13.5 19.1716 13.5 20Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M15.7478 2.5L14.0811 7.5H16.2522L17.9189 2.5H15.7478ZM15.3874 1C14.957 1 14.5749 1.27543 14.4387 1.68377L12.4387 7.68377C12.2229 8.3313 12.7049 9 13.3874 9H16.6126C17.043 9 17.4251 8.72457 17.5613 8.31623L19.5613 2.31623C19.7771 1.6687 19.2951 1 18.6126 1H15.3874Z" style="fill: var(--element-active-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M9.17071 21H2V19.5H4.27273L6 10H22L20.2727 19.5H22V21H14.8293C14.4175 22.1652 13.3062 23 12 23C10.6938 23 9.58254 22.1652 9.17071 21ZM20.2027 11.5L18.7481 19.5H14.9585C14.7205 18.0811 13.4865 17 12 17C10.5135 17 9.27952 18.0811 9.04148 19.5H5.79732L7.25186 11.5H20.2027ZM13.5 20C13.5 20.8284 12.8284 21.5 12 21.5C11.1716 21.5 10.5 20.8284 10.5 20C10.5 19.1716 11.1716 18.5 12 18.5C12.8284 18.5 13.5 19.1716 13.5 20Z" style="fill: var(--element-active-color)"/>
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
    'obi-buoy-can-square': ObiBuoyCanSquare;
  }
}
