import {LitElement, html, css, svg} from 'lit';
import {property} from 'lit/decorators.js';
import {customElement} from '../decorator.js';

@customElement('obi-diesel-engine')
export class ObiDieselEngine extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M21.3721 17.424H14.8281V6H21.3721V7.904H17.1321V10.528H21.0841V12.432H17.1321V15.504H21.3721V17.424Z" fill="currentColor"/>
<path d="M12.44 11.6C12.44 12.88 12.1947 13.952 11.704 14.816C11.2133 15.68 10.504 16.3307 9.576 16.768C8.648 17.2053 7.528 17.424 6.216 17.424H3V6H6.568C7.76267 6 8.79733 6.21333 9.672 6.64C10.5467 7.06667 11.224 7.696 11.704 8.528C12.1947 9.34933 12.44 10.3733 12.44 11.6ZM10.04 11.664C10.04 10.8 9.912 10.0907 9.656 9.536C9.4 8.98133 9.016 8.57067 8.504 8.304C8.00267 8.03733 7.38933 7.904 6.664 7.904H5.304V15.504H6.408C7.624 15.504 8.53067 15.184 9.128 14.544C9.736 13.904 10.04 12.944 10.04 11.664Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M21.3721 17.424H14.8281V6H21.3721V7.904H17.1321V10.528H21.0841V12.432H17.1321V15.504H21.3721V17.424Z" style="fill: var(--element-active-color)"/>
<path d="M12.44 11.6C12.44 12.88 12.1947 13.952 11.704 14.816C11.2133 15.68 10.504 16.3307 9.576 16.768C8.648 17.2053 7.528 17.424 6.216 17.424H3V6H6.568C7.76267 6 8.79733 6.21333 9.672 6.64C10.5467 7.06667 11.224 7.696 11.704 8.528C12.1947 9.34933 12.44 10.3733 12.44 11.6ZM10.04 11.664C10.04 10.8 9.912 10.0907 9.656 9.536C9.4 8.98133 9.016 8.57067 8.504 8.304C8.00267 8.03733 7.38933 7.904 6.664 7.904H5.304V15.504H6.408C7.624 15.504 8.53067 15.184 9.128 14.544C9.736 13.904 10.04 12.944 10.04 11.664Z" style="fill: var(--element-active-color)"/>
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
    'obi-diesel-engine': ObiDieselEngine;
  }
}
