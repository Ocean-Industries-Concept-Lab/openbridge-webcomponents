import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-14-warning-transferred')
export class Obi14WarningTransferred extends LitElement {
  @property({type: Boolean, attribute: 'use-css-color'}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12ZM11.7317 7.78607L12.9196 6.5L18 12L12.9197 17.5L11.7317 16.2139L14.7772 12.911H6V11.089H14.7772L11.7317 7.78607Z" fill="currentColor"/>
<path d="M12.9196 6.5L11.7317 7.78607L14.7772 11.089H6V12.911H14.7772L11.7317 16.2139L12.9197 17.5L18 12L12.9196 6.5Z" fill="currentColor" />
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12ZM11.7317 7.78607L12.9196 6.5L18 12L12.9197 17.5L11.7317 16.2139L14.7772 12.911H6V11.089H14.7772L11.7317 7.78607Z" style="fill: var(--warning-enabled-background-color)"/>
<path d="M12.9196 6.5L11.7317 7.78607L14.7772 11.089H6V12.911H14.7772L11.7317 16.2139L12.9197 17.5L18 12L12.9196 6.5Z" style="fill: var(--on-warning-active-color)" />
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
    'obi-14-warning-transferred': Obi14WarningTransferred;
  }
}