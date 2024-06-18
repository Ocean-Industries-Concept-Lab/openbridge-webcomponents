import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-20-sensor-wind')
export class Obi20SensorWind extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M4 2H2V22H4V11.4286L6 12L10 12.3333V3.5L6 2.5L4 2.78571V2ZM4 3.78571V10.381L6 10.8889V3.5L4 3.78571ZM12 11.8889V3.83333L16 4.83333V11.2222L12 11.8889ZM22 8.61111L18 10.7778V4.66667L22 4.16667V8.61111Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M4 2H2V22H4V11.4286L6 12L10 12.3333V3.5L6 2.5L4 2.78571V2ZM4 3.78571V10.381L6 10.8889V3.5L4 3.78571ZM12 11.8889V3.83333L16 4.83333V11.2222L12 11.8889ZM22 8.61111L18 10.7778V4.66667L22 4.16667V8.61111Z" style="fill: var(--element-active-color)"/>
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
    'obi-20-sensor-wind': Obi20SensorWind;
  }
}
