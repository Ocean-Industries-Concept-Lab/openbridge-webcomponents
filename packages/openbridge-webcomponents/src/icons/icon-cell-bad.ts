import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-cell-bad')
export class ObiCellBad extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M15 10C15 11.3062 14.1651 12.4175 13 12.8291V22H11V12.8291C9.83498 12.4175 9.00002 11.3062 9.00002 10C9.00002 8.34326 10.3428 7 12 7C13.6572 7 15 8.34326 15 10Z" fill="currentColor"/>
<path d="M2.12134 16.0354L3.53555 14.6212L5.65687 16.7425L7.77819 14.6212L9.19241 16.0354L7.07109 18.1567L9.19241 20.2781L7.77819 21.6923L5.65687 19.571L3.53555 21.6923L2.12134 20.2781L4.24266 18.1567L2.12134 16.0354Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M15 10C15 11.3062 14.1651 12.4175 13 12.8291V22H11V12.8291C9.83498 12.4175 9.00002 11.3062 9.00002 10C9.00002 8.34326 10.3428 7 12 7C13.6572 7 15 8.34326 15 10Z" style="fill: var(--element-active-color)"/>
<path d="M2.12134 16.0354L3.53555 14.6212L5.65687 16.7425L7.77819 14.6212L9.19241 16.0354L7.07109 18.1567L9.19241 20.2781L7.77819 21.6923L5.65687 19.571L3.53555 21.6923L2.12134 20.2781L4.24266 18.1567L2.12134 16.0354Z" style="fill: var(--element-active-color)"/>
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
    'obi-cell-bad': ObiCellBad;
  }
}