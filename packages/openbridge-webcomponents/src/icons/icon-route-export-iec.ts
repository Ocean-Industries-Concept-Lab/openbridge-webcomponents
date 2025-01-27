import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-route-export-iec')
export class ObiRouteExportIec extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M2.10608 4.74025L8.5 2L15.5 4L21.2253 2.36421C21.8641 2.18169 22.5 2.66135 22.5 3.32573V6H21V3.98859L16.25 5.34574V6H14.75V5.34574L9.25 3.77431V17.6895L14.75 20.0466V18H16.25V20.0466L21 18.0109V18H22.5V18.3406C22.5 18.7406 22.2616 19.1022 21.8939 19.2597L15.5 22L8.5 19L2.89392 21.4026C2.23405 21.6854 1.5 21.2014 1.5 20.4835V5.6594C1.5 5.25937 1.7384 4.89783 2.10608 4.74025ZM3 5.98909L7.75 3.95338V17.6895L3 19.7252V5.98909Z" fill="currentColor"/>
<path d="M12 11L20.175 11L17.6 8.4L19 7L24 12L19 17L17.6 15.6L20.175 13L12 13V11Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M2.10608 4.74025L8.5 2L15.5 4L21.2253 2.36421C21.8641 2.18169 22.5 2.66135 22.5 3.32573V6H21V3.98859L16.25 5.34574V6H14.75V5.34574L9.25 3.77431V17.6895L14.75 20.0466V18H16.25V20.0466L21 18.0109V18H22.5V18.3406C22.5 18.7406 22.2616 19.1022 21.8939 19.2597L15.5 22L8.5 19L2.89392 21.4026C2.23405 21.6854 1.5 21.2014 1.5 20.4835V5.6594C1.5 5.25937 1.7384 4.89783 2.10608 4.74025ZM3 5.98909L7.75 3.95338V17.6895L3 19.7252V5.98909Z" style="fill: var(--element-active-color)"/>
<path d="M12 11L20.175 11L17.6 8.4L19 7L24 12L19 17L17.6 15.6L20.175 13L12 13V11Z" style="fill: var(--element-active-color)"/>
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
    'obi-route-export-iec': ObiRouteExportIec;
  }
}
