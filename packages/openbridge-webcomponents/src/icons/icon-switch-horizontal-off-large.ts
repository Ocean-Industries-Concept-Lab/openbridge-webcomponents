import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-switch-horizontal-off-large')
export class ObiSwitchHorizontalOffLarge extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M3.11603 15.567C2.39859 15.9812 2.15277 16.8986 2.56699 17.616C2.9812 18.3335 3.89859 18.5793 4.61603 18.1651L21.0705 8.66506C21.7879 8.25085 22.0338 7.33347 21.6195 6.61603C21.2053 5.89859 20.2879 5.65277 19.5705 6.06699L3.11603 15.567Z" fill="currentColor" stroke="#8D8D8D"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M3.11603 15.567C2.39859 15.9812 2.15277 16.8986 2.56699 17.616C2.9812 18.3335 3.89859 18.5793 4.61603 18.1651L21.0705 8.66506C21.7879 8.25085 22.0338 7.33347 21.6195 6.61603C21.2053 5.89859 20.2879 5.65277 19.5705 6.06699L3.11603 15.567Z" style="fill: var(--automation-device-primary-inverted-color)" style="stroke: var(--automation-device-tertiary-inverted-color)"/>
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
    'obi-switch-horizontal-off-large': ObiSwitchHorizontalOffLarge;
  }
}
