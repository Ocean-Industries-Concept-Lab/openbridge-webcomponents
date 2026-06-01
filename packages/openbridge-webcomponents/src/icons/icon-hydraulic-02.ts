import {LitElement, html, css, svg} from 'lit';
import {property} from 'lit/decorators.js';
import {customElement} from '../decorator.js';

@customElement('obi-hydraulic-02')
export class ObiHydraulic02 extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M8.49223 1.01367L8.49223 17.0001H11.5L7.5 23.0001L3.5 17.0001H6.49223L6.49223 1.01367H8.49223Z" fill="currentColor"/>
<path d="M17.4922 22.9864V7H20.5L16.5 1L12.5 7H15.4922V22.9864H17.4922Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M8.49223 1.01367L8.49223 17.0001H11.5L7.5 23.0001L3.5 17.0001H6.49223L6.49223 1.01367H8.49223Z" style="fill: var(--element-active-color)"/>
<path d="M17.4922 22.9864V7H20.5L16.5 1L12.5 7H15.4922V22.9864H17.4922Z" style="fill: var(--element-active-color)"/>
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
    'obi-hydraulic-02': ObiHydraulic02;
  }
}
