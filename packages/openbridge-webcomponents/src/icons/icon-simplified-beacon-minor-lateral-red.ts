import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-simplified-beacon-minor-lateral-red')
export class ObiSimplifiedBeaconMinorLateralRed extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M9 4C9 3.44772 9.44772 3 10 3H14C14.5523 3 15 3.44772 15 4V20C15 20.5523 14.5523 21 14 21H10C9.44772 21 9 20.5523 9 20V4Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M14 4H10L10 20H14V4ZM10 3C9.44772 3 9 3.44772 9 4V20C9 20.5523 9.44772 21 10 21H14C14.5523 21 15 20.5523 15 20V4C15 3.44772 14.5523 3 14 3H10Z" fill="currentColor"/>
<path d="M13 12C13 12.5523 12.5523 13 12 13C11.4477 13 11 12.5523 11 12C11 11.4477 11.4477 11 12 11C12.5523 11 13 11.4477 13 12Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M9 4C9 3.44772 9.44772 3 10 3H14C14.5523 3 15 3.44772 15 4V20C15 20.5523 14.5523 21 14 21H10C9.44772 21 9 20.5523 9 20V4Z" style="fill: var(--navigation-light-red-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M14 4H10L10 20H14V4ZM10 3C9.44772 3 9 3.44772 9 4V20C9 20.5523 9.44772 21 10 21H14C14.5523 21 15 20.5523 15 20V4C15 3.44772 14.5523 3 14 3H10Z" style="fill: var(--element-active-color)"/>
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
    'obi-simplified-beacon-minor-lateral-red': ObiSimplifiedBeaconMinorLateralRed;
  }
}