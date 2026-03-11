import {LitElement, html, css, svg} from 'lit';
import {property} from 'lit/decorators.js';
import {customElement} from '../decorator.js';

@customElement('obi-switch-horizontal-off-large')
export class ObiSwitchHorizontalOffLarge extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M19.5705 6.06699C20.2879 5.65277 21.2053 5.89859 21.6195 6.61603C22.0338 7.33346 21.7879 8.25085 21.0705 8.66506L4.61603 18.1651C3.89859 18.5793 2.9812 18.3335 2.56699 17.616C2.15277 16.8986 2.39859 15.9812 3.11603 15.567L19.5705 6.06699Z" fill="currentColor" stroke="#BEBEBE"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M19.5705 6.06699C20.2879 5.65277 21.2053 5.89859 21.6195 6.61603C22.0338 7.33346 21.7879 8.25085 21.0705 8.66506L4.61603 18.1651C3.89859 18.5793 2.9812 18.3335 2.56699 17.616C2.15277 16.8986 2.39859 15.9812 3.11603 15.567L19.5705 6.06699Z" style="fill: var(--automation-device-primary-inverted-color)" style="stroke: var(--automation-device-tertiary-inverted-color)"/>
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
