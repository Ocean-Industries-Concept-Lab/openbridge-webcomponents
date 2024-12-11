import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-expand')
export class ObiExpand extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M3 21V15H5V17.5859L8.29297 14.293L9.70718 15.7072L6.41436 19H9V21H3Z" fill="currentColor"/>
<path d="M17.5859 5L14.293 8.29297L15.7072 9.70718L19 6.41437V9H21V3H15V5H17.5859Z" fill="currentColor"/>
<path d="M3 3H9V5L6.41406 5L9.70703 8.29297L8.29282 9.70718L5 6.41436L5 9H3V3Z" fill="currentColor"/>
<path d="M19 17.5859L15.707 14.293L14.2928 15.7072L17.5856 19H15V21H21V15H19V17.5859Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M3 21V15H5V17.5859L8.29297 14.293L9.70718 15.7072L6.41436 19H9V21H3Z" style="fill: var(--element-active-color)"/>
<path d="M17.5859 5L14.293 8.29297L15.7072 9.70718L19 6.41437V9H21V3H15V5H17.5859Z" style="fill: var(--element-active-color)"/>
<path d="M3 3H9V5L6.41406 5L9.70703 8.29297L8.29282 9.70718L5 6.41436L5 9H3V3Z" style="fill: var(--element-active-color)"/>
<path d="M19 17.5859L15.707 14.293L14.2928 15.7072L17.5856 19H15V21H21V15H19V17.5859Z" style="fill: var(--element-active-color)"/>
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
    'obi-expand': ObiExpand;
  }
}