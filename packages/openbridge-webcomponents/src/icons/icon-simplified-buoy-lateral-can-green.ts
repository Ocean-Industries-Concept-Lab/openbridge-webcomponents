import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-simplified-buoy-lateral-can-green')
export class ObiSimplifiedBuoyLateralCanGreen extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M5.81063 4.75746C5.92193 4.3123 6.32191 4 6.78078 4H20.7192C21.3698 4 21.8472 4.61139 21.6894 5.24254L18.1894 19.2425C18.0781 19.6877 17.6781 20 17.2192 20H3.28078C2.6302 20 2.15285 19.3886 2.31063 18.7575L5.81063 4.75746Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M20.7192 5H6.78077L3.28077 19L17.2192 19L20.7192 5ZM6.78077 4C6.3219 4 5.92192 4.3123 5.81062 4.75746L2.31062 18.7575C2.15284 19.3886 2.63019 20 3.28077 20H17.2192C17.6781 20 18.0781 19.6877 18.1894 19.2425L21.6894 5.24254C21.8471 4.61139 21.3698 4 20.7192 4H6.78077Z" fill="currentColor"/>
<path d="M13 12C13 12.5523 12.5523 13 12 13C11.4477 13 11 12.5523 11 12C11 11.4477 11.4477 11 12 11C12.5523 11 13 11.4477 13 12Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M5.81063 4.75746C5.92193 4.3123 6.32191 4 6.78078 4H20.7192C21.3698 4 21.8472 4.61139 21.6894 5.24254L18.1894 19.2425C18.0781 19.6877 17.6781 20 17.2192 20H3.28078C2.6302 20 2.15285 19.3886 2.31063 18.7575L5.81063 4.75746Z" style="fill: var(--navigation-light-green-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M20.7192 5H6.78077L3.28077 19L17.2192 19L20.7192 5ZM6.78077 4C6.3219 4 5.92192 4.3123 5.81062 4.75746L2.31062 18.7575C2.15284 19.3886 2.63019 20 3.28077 20H17.2192C17.6781 20 18.0781 19.6877 18.1894 19.2425L21.6894 5.24254C21.8471 4.61139 21.3698 4 20.7192 4H6.78077Z" style="fill: var(--element-active-color)"/>
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
    'obi-simplified-buoy-lateral-can-green': ObiSimplifiedBuoyLateralCanGreen;
  }
}