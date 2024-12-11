import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-buoy-mooring-can')
export class ObiBuoyMooringCan extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M16.5 6.5C16.5 7.3178 16.1073 8.04389 15.5002 8.5H22L20.25 19H22V20.5H14.9585C14.7205 21.9189 13.4865 23 12 23C10.5135 23 9.27952 21.9189 9.04148 20.5H2V19H4.25L6 8.5H12.4998C11.8927 8.04389 11.5 7.3178 11.5 6.5C11.5 5.11929 12.6193 4 14 4C15.3807 4 16.5 5.11929 16.5 6.5ZM9.17071 19C9.58254 17.8348 10.6938 17 12 17C13.3062 17 14.4175 17.8348 14.8293 19H18.7293L20.2293 10H7.27069L5.77069 19H9.17071ZM14 7.5C14.5523 7.5 15 7.05228 15 6.5C15 5.94772 14.5523 5.5 14 5.5C13.4477 5.5 13 5.94772 13 6.5C13 7.05228 13.4477 7.5 14 7.5ZM13.5 20C13.5 20.8284 12.8284 21.5 12 21.5C11.1716 21.5 10.5 20.8284 10.5 20C10.5 19.1716 11.1716 18.5 12 18.5C12.8284 18.5 13.5 19.1716 13.5 20Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M16.5 6.5C16.5 7.3178 16.1073 8.04389 15.5002 8.5H22L20.25 19H22V20.5H14.9585C14.7205 21.9189 13.4865 23 12 23C10.5135 23 9.27952 21.9189 9.04148 20.5H2V19H4.25L6 8.5H12.4998C11.8927 8.04389 11.5 7.3178 11.5 6.5C11.5 5.11929 12.6193 4 14 4C15.3807 4 16.5 5.11929 16.5 6.5ZM9.17071 19C9.58254 17.8348 10.6938 17 12 17C13.3062 17 14.4175 17.8348 14.8293 19H18.7293L20.2293 10H7.27069L5.77069 19H9.17071ZM14 7.5C14.5523 7.5 15 7.05228 15 6.5C15 5.94772 14.5523 5.5 14 5.5C13.4477 5.5 13 5.94772 13 6.5C13 7.05228 13.4477 7.5 14 7.5ZM13.5 20C13.5 20.8284 12.8284 21.5 12 21.5C11.1716 21.5 10.5 20.8284 10.5 20C10.5 19.1716 11.1716 18.5 12 18.5C12.8284 18.5 13.5 19.1716 13.5 20Z" style="fill: var(--element-active-color)"/>
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
    'obi-buoy-mooring-can': ObiBuoyMooringCan;
  }
}