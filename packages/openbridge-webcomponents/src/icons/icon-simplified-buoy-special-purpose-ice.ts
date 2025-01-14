import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-simplified-buoy-special-purpose-ice')
export class ObiSimplifiedBuoySpecialPurposeIce extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M10.8106 4.75746C10.9219 4.3123 11.3219 4 11.7808 4H15.7192C16.3698 4 16.8471 4.61139 16.6894 5.24254L13.1894 19.2425C13.0781 19.6877 12.6781 20 12.2192 20H8.28077C7.6302 20 7.15284 19.3886 7.31062 18.7575L10.8106 4.75746Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M15.7192 5H11.7808L8.28077 19L12.2192 19L15.7192 5ZM11.7808 4C11.3219 4 10.9219 4.3123 10.8106 4.75746L7.31062 18.7575C7.15284 19.3886 7.6302 20 8.28077 20H12.2192C12.6781 20 13.0781 19.6877 13.1894 19.2425L16.6894 5.24254C16.8471 4.61139 16.3698 4 15.7192 4H11.7808Z" fill="currentColor"/>
<path d="M13 12C13 12.5523 12.5523 13 12 13C11.4477 13 11 12.5523 11 12C11 11.4477 11.4477 11 12 11C12.5523 11 13 11.4477 13 12Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M10.8106 4.75746C10.9219 4.3123 11.3219 4 11.7808 4H15.7192C16.3698 4 16.8471 4.61139 16.6894 5.24254L13.1894 19.2425C13.0781 19.6877 12.6781 20 12.2192 20H8.28077C7.6302 20 7.15284 19.3886 7.31062 18.7575L10.8106 4.75746Z" style="fill: var(--navigation-light-yellow-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M15.7192 5H11.7808L8.28077 19L12.2192 19L15.7192 5ZM11.7808 4C11.3219 4 10.9219 4.3123 10.8106 4.75746L7.31062 18.7575C7.15284 19.3886 7.6302 20 8.28077 20H12.2192C12.6781 20 13.0781 19.6877 13.1894 19.2425L16.6894 5.24254C16.8471 4.61139 16.3698 4 15.7192 4H11.7808Z" style="fill: var(--element-active-color)"/>
<path d="M13 12C13 12.5523 12.5523 13 12 13C11.4477 13 11 12.5523 11 12C11 11.4477 11.4477 11 12 11C12.5523 11 13 11.4477 13 12Z" style="fill: var(--element-active-color)"/>
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
    'obi-simplified-buoy-special-purpose-ice': ObiSimplifiedBuoySpecialPurposeIce;
  }
}