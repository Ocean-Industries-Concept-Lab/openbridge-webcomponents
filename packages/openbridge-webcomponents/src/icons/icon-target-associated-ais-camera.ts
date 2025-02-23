import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-target-associated-ais-camera')
export class ObiTargetAssociatedAisCamera extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M12 1L19 21H5L12 1ZM7.81896 19L12 7.05418L16.181 19H7.81896Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M0 2C0 0.89543 0.895431 0 2 0L22 0C23.1046 0 24 0.895431 24 2V22C24 23.1046 23.1046 24 22 24H2C0.89543 24 0 23.1046 0 22L0 2ZM12 1H22C22.5523 1 23 1.44772 23 2V22C23 22.5523 22.5523 23 22 23H2C1.44772 23 1 22.5523 1 22V2C1 1.44772 1.44772 1 2 1H12Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M12 1L19 21H5L12 1ZM7.81896 19L12 7.05418L16.181 19H7.81896Z" style="fill: var(--element-active-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M0 2C0 0.89543 0.895431 0 2 0L22 0C23.1046 0 24 0.895431 24 2V22C24 23.1046 23.1046 24 22 24H2C0.89543 24 0 23.1046 0 22L0 2ZM12 1H22C22.5523 1 23 1.44772 23 2V22C23 22.5523 22.5523 23 22 23H2C1.44772 23 1 22.5523 1 22V2C1 1.44772 1.44772 1 2 1H12Z" style="fill: var(--element-active-color)"/>
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
    'obi-target-associated-ais-camera': ObiTargetAssociatedAisCamera;
  }
}
