import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-wire-going-to')
export class ObiWireGoingTo extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M9 14H3.57629e-07L1.78814e-07 10.0142L9 10V6.07902C9 5.24081 9.96935 4.77454 10.6242 5.29777L18.1321 11.2252C18.6334 11.6257 18.6331 12.3881 18.1314 12.7882L10.6235 18.7052C9.96853 19.2276 9 18.7612 9 17.9234V14Z" fill="currentColor"/>
<path d="M9 17.9234C9 18.7612 9.96853 19.2276 10.6235 18.7052L18.1314 12.7882C18.6331 12.3881 18.6334 11.6257 18.1321 11.2252L10.6242 5.29777C9.96935 4.77454 9 5.24081 9 6.07902V10.0014L0 10.0142V11.0142L10 11V6.07902L17.5079 12.0064L10 17.9234V13H0V14H9V17.9234Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M9 14H3.57629e-07L1.78814e-07 10.0142L9 10V6.07902C9 5.24081 9.96935 4.77454 10.6242 5.29777L18.1321 11.2252C18.6334 11.6257 18.6331 12.3881 18.1314 12.7882L10.6235 18.7052C9.96853 19.2276 9 18.7612 9 17.9234V14Z" style="fill: var(--automation-pipes-primary-color)"/>
<path d="M9 17.9234C9 18.7612 9.96853 19.2276 10.6235 18.7052L18.1314 12.7882C18.6331 12.3881 18.6334 11.6257 18.1321 11.2252L10.6242 5.29777C9.96935 4.77454 9 5.24081 9 6.07902V10.0014L0 10.0142V11.0142L10 11V6.07902L17.5079 12.0064L10 17.9234V13H0V14H9V17.9234Z" style="fill: var(--automation-pipes-tertiary-color)"/>
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
    'obi-wire-going-to': ObiWireGoingTo;
  }
}