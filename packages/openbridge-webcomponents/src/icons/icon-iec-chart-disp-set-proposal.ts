import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-iec-chart-disp-set-proposal')
export class ObiIecChartDispSetProposal extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M17.4999 11.0498L23.2216 15.5L21.293 17L23.2216 18.5L17.4999 22.9501L11.7783 18.5L13.7069 17L11.7783 15.5L17.4999 11.0498ZM17.4999 19.9501L20.0714 17.9501L20.7783 18.5L17.4999 21.0498L14.2216 18.5L14.9285 17.9501L17.4999 19.9501ZM14.2216 15.5L17.4999 18.0498L20.7783 15.5L17.4999 12.9501L14.2216 15.5Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M2.10608 4.74025L8.5 2L15.5 4L21.2253 2.36421C21.8641 2.18169 22.5 2.66135 22.5 3.32573V12.5L21 11.5V3.98859L16.25 5.34574V10L14.75 11V5.34574L9.25 3.77431V18.6786L2.89392 21.4026C2.23405 21.6854 1.5 21.2014 1.5 20.4835V5.6594C1.5 5.25937 1.7384 4.89783 2.10608 4.74025ZM3 5.98909L7.75 3.95338V17.6895L3 19.7252V5.98909Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M17.4999 11.0498L23.2216 15.5L21.293 17L23.2216 18.5L17.4999 22.9501L11.7783 18.5L13.7069 17L11.7783 15.5L17.4999 11.0498ZM17.4999 19.9501L20.0714 17.9501L20.7783 18.5L17.4999 21.0498L14.2216 18.5L14.9285 17.9501L17.4999 19.9501ZM14.2216 15.5L17.4999 18.0498L20.7783 15.5L17.4999 12.9501L14.2216 15.5Z" style="fill: var(--element-active-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M2.10608 4.74025L8.5 2L15.5 4L21.2253 2.36421C21.8641 2.18169 22.5 2.66135 22.5 3.32573V12.5L21 11.5V3.98859L16.25 5.34574V10L14.75 11V5.34574L9.25 3.77431V18.6786L2.89392 21.4026C2.23405 21.6854 1.5 21.2014 1.5 20.4835V5.6594C1.5 5.25937 1.7384 4.89783 2.10608 4.74025ZM3 5.98909L7.75 3.95338V17.6895L3 19.7252V5.98909Z" style="fill: var(--element-active-color)"/>
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
    'obi-iec-chart-disp-set-proposal': ObiIecChartDispSetProposal;
  }
}
