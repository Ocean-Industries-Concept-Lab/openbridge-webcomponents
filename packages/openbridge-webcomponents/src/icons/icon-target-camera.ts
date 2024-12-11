import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-target-camera')
export class ObiTargetCamera extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M17 7L7 7L7 17L17 17L17 7ZM7 5C5.89543 5 5 5.89543 5 7L5 17C5 18.1046 5.89543 19 7 19L17 19C18.1046 19 19 18.1046 19 17L19 7C19 5.89543 18.1046 5 17 5L7 5Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M17 7L7 7L7 17L17 17L17 7ZM7 5C5.89543 5 5 5.89543 5 7L5 17C5 18.1046 5.89543 19 7 19L17 19C18.1046 19 19 18.1046 19 17L19 7C19 5.89543 18.1046 5 17 5L7 5Z" style="fill: var(--element-active-color)"/>
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
    'obi-target-camera': ObiTargetCamera;
  }
}
