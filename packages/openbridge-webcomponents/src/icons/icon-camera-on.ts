import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-camera-on')
export class ObiCameraOn extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M18 9.85043V7C18 5.89543 17.1046 5 16 5H5C3.89543 5 3 5.89543 3 7V16C3 17.1046 3.89543 18 5 18H16C17.1046 18 18 17.1046 18 16V13.1496L21 16V7L18 9.85043ZM5 7H16V16H5L5 7Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M18 9.85043V7C18 5.89543 17.1046 5 16 5H5C3.89543 5 3 5.89543 3 7V16C3 17.1046 3.89543 18 5 18H16C17.1046 18 18 17.1046 18 16V13.1496L21 16V7L18 9.85043ZM5 7H16V16H5L5 7Z" style="fill: var(--element-active-color)"/>
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
    'obi-camera-on': ObiCameraOn;
  }
}