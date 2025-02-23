import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-chart-submarine-cables')
export class ObiChartSubmarineCables extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M2.37132 10.5303L3.84099 9.06066L2.78033 8L0.25 10.5303L2.25 12.5303L0.78033 14L1.84099 15.0607L4.37132 12.5303L2.37132 10.5303Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M14.3713 10.5303L15.841 9.06066L14.7803 8L12.25 10.5303L14.25 12.5303L12.7803 14L13.841 15.0607L16.3713 12.5303L14.3713 10.5303Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M21.3107 11.4697L22.7803 10L23.841 11.0607L21.3107 13.591L19.3107 11.591L17.841 13.0607L16.7803 12L19.3107 9.46967L21.3107 11.4697Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M9.31066 11.4697L10.7803 10L11.841 11.0607L9.31066 13.591L7.31066 11.591L5.84099 13.0607L4.78033 12L7.31066 9.46967L9.31066 11.4697Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M2.37132 10.5303L3.84099 9.06066L2.78033 8L0.25 10.5303L2.25 12.5303L0.78033 14L1.84099 15.0607L4.37132 12.5303L2.37132 10.5303Z" style="fill: var(--element-active-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M14.3713 10.5303L15.841 9.06066L14.7803 8L12.25 10.5303L14.25 12.5303L12.7803 14L13.841 15.0607L16.3713 12.5303L14.3713 10.5303Z" style="fill: var(--element-active-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M21.3107 11.4697L22.7803 10L23.841 11.0607L21.3107 13.591L19.3107 11.591L17.841 13.0607L16.7803 12L19.3107 9.46967L21.3107 11.4697Z" style="fill: var(--element-active-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M9.31066 11.4697L10.7803 10L11.841 11.0607L9.31066 13.591L7.31066 11.591L5.84099 13.0607L4.78033 12L7.31066 9.46967L9.31066 11.4697Z" style="fill: var(--element-active-color)"/>
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
    'obi-chart-submarine-cables': ObiChartSubmarineCables;
  }
}
