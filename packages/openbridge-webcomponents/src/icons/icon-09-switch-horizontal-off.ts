import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-09-switch-horizontal-off')
export class Obi09SwitchHorizontalOff extends LitElement {
  @property({type: Boolean, attribute: 'use-css-color'}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<rect x="1.31699" y="14.817" width="21" height="5" rx="2.5" transform="rotate(-30 1.31699 14.817)" fill="currentColor" stroke="#808080"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect x="1.31699" y="14.817" width="21" height="5" rx="2.5" transform="rotate(-30 1.31699 14.817)" style="fill: var(--automation-device-primary-inverted-color)" style="stroke: var(--automation-device-tertiary-inverted-color)"/>
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
    }
    .wrapper > * {
      height: 100%;
      width: 100%;
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    'obi-09-switch-horizontal-off': Obi09SwitchHorizontalOff;
  }
}
