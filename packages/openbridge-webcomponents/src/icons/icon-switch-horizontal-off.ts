import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-switch-horizontal-off')
export class ObiSwitchHorizontalOff extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<rect x="1.31699" y="14.817" width="21" height="5" rx="2.5" transform="rotate(-30 1.31699 14.817)" fill="currentColor" stroke="#8D8D8D"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect x="1.31699" y="14.817" width="21" height="5" rx="2.5" transform="rotate(-30 1.31699 14.817)" style="fill: var(--automation-device-primary-inverted-color)" style="stroke: var(--undefined)"/>
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
    'obi-switch-horizontal-off': ObiSwitchHorizontalOff;
  }
}
