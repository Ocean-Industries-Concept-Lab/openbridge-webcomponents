import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-wire-end-point')
export class ObiWireEndPoint extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M14 19L14 5L10 5V10L1.78814e-07 10L0 14L10 14L10 19H14Z" fill="currentColor"/>
<path d="M11 18H13L13 6L11 6V11L0 11V10L10 10V5H14L14 19H10L10 14L0 14V13L11 13L11 18Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M14 19L14 5L10 5V10L1.78814e-07 10L0 14L10 14L10 19H14Z" style="fill: var(--automation-pipes-primary-color)"/>
<path d="M11 18H13L13 6L11 6V11L0 11V10L10 10V5H14L14 19H10L10 14L0 14V13L11 13L11 18Z" style="fill: var(--automation-pipes-tertiary-color)"/>
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
    'obi-wire-end-point': ObiWireEndPoint;
  }
}