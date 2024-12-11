import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-battery-horizontal-empty')
export class ObiBatteryHorizontalEmpty extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M2 9C2 7.89543 2.89543 7 4 7H19C20.1046 7 21 7.89543 21 9V10H22C22.5523 10 23 10.4477 23 11V13C23 13.5523 22.5523 14 22 14H21V15C21 16.1046 20.1046 17 19 17H4C2.89543 17 2 16.1046 2 15V9ZM4 9H19V15H4V9Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M2 9C2 7.89543 2.89543 7 4 7H19C20.1046 7 21 7.89543 21 9V10H22C22.5523 10 23 10.4477 23 11V13C23 13.5523 22.5523 14 22 14H21V15C21 16.1046 20.1046 17 19 17H4C2.89543 17 2 16.1046 2 15V9ZM4 9H19V15H4V9Z" style="fill: var(--element-active-color)"/>
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
    'obi-battery-horizontal-empty': ObiBatteryHorizontalEmpty;
  }
}