import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-duct-going-to')
export class ObiDuctGoingTo extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M9 17.9999L-2.1523e-07 17.9999L-7.39148e-07 6.0141L9 5.99994L9 2.07946C9 1.24115 9.96954 0.774913 10.6244 1.29833L23.133 11.2254C23.634 11.6259 23.6338 12.3879 23.1325 12.788L10.6239 22.7034C9.969 23.2263 9 22.76 9 21.922L9 17.9999Z" fill="currentColor"/>
<path d="M9 21.922C9 22.76 9.969 23.2263 10.6239 22.7034L23.1325 12.788C23.6338 12.3879 23.634 11.6259 23.133 11.2254L10.6244 1.29833C9.96954 0.774913 9 1.24115 9 2.07946L9 5.99994L-7.3921e-07 6.01269L-6.95498e-07 7.0127L10 6.99854L10 2.07946L22.5086 12.0066L10 21.922L10 16.9999L-2.58941e-07 16.9999L-2.1523e-07 17.9999L9 17.9999L9 21.922Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M9 17.9999L-2.1523e-07 17.9999L-7.39148e-07 6.0141L9 5.99994L9 2.07946C9 1.24115 9.96954 0.774913 10.6244 1.29833L23.133 11.2254C23.634 11.6259 23.6338 12.3879 23.1325 12.788L10.6239 22.7034C9.969 23.2263 9 22.76 9 21.922L9 17.9999Z" style="fill: var(--automation-pipe-primary-color)"/>
<path d="M9 21.922C9 22.76 9.969 23.2263 10.6239 22.7034L23.1325 12.788C23.6338 12.3879 23.634 11.6259 23.133 11.2254L10.6244 1.29833C9.96954 0.774913 9 1.24115 9 2.07946L9 5.99994L-7.3921e-07 6.01269L-6.95498e-07 7.0127L10 6.99854L10 2.07946L22.5086 12.0066L10 21.922L10 16.9999L-2.58941e-07 16.9999L-2.1523e-07 17.9999L9 17.9999L9 21.922Z" style="fill: var(--automation-pipe-tertiary-color)"/>
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
    'obi-duct-going-to': ObiDuctGoingTo;
  }
}
