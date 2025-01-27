import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-target-camera')
export class ObiTargetCamera extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M17 7.00024H7L7 17.0002H17V7.00024ZM7 5.00024C5.89543 5.00024 5 5.89567 5 7.00024V17.0002C5 18.1048 5.89543 19.0002 7 19.0002H17C18.1046 19.0002 19 18.1048 19 17.0002V7.00024C19 5.89567 18.1046 5.00024 17 5.00024H7Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M17 7.00024H7L7 17.0002H17V7.00024ZM7 5.00024C5.89543 5.00024 5 5.89567 5 7.00024V17.0002C5 18.1048 5.89543 19.0002 7 19.0002H17C18.1046 19.0002 19 18.1048 19 17.0002V7.00024C19 5.89567 18.1046 5.00024 17 5.00024H7Z" style="fill: var(--element-active-color)"/>
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
