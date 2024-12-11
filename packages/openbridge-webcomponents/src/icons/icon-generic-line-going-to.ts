import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-generic-line-going-to')
export class ObiGenericLineGoingTo extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M0 12.9883V11.0009H10V7.1082C10 6.69064 10.4815 6.45703 10.8095 6.71549L17.01 11.6021C17.2639 11.8022 17.2641 12.187 17.0104 12.3873L10.8098 17.2825C10.4819 17.5414 10 17.3078 10 16.8901V13.0025L0 12.9883Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M0 12.9883V11.0009H10V7.1082C10 6.69064 10.4815 6.45703 10.8095 6.71549L17.01 11.6021C17.2639 11.8022 17.2641 12.187 17.0104 12.3873L10.8098 17.2825C10.4819 17.5414 10 17.3078 10 16.8901V13.0025L0 12.9883Z" style="fill: var(--automation-device-tertiary-color)"/>
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
    'obi-generic-line-going-to': ObiGenericLineGoingTo;
  }
}