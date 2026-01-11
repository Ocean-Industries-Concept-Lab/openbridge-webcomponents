import {LitElement, html, css, svg} from 'lit';
import {property} from 'lit/decorators.js';
import {customElement} from '../decorator.js';

@customElement('obi-reorder-horizontal-google')
export class ObiReorderHorizontalGoogle extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M1.58594 16L6.29304 11.2929L7.70726 12.7071L5.41436 15H14.0002V17H5.41436L7.70726 19.2929L6.29304 20.7071L1.58594 16Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M22.4144 8L17.7073 12.7071L16.293 11.2929L18.5859 9H10.0002V7H18.5859L16.293 4.70711L17.7073 3.29289L22.4144 8Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M1.58594 16L6.29304 11.2929L7.70726 12.7071L5.41436 15H14.0002V17H5.41436L7.70726 19.2929L6.29304 20.7071L1.58594 16Z" style="fill: var(--element-active-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M22.4144 8L17.7073 12.7071L16.293 11.2929L18.5859 9H10.0002V7H18.5859L16.293 4.70711L17.7073 3.29289L22.4144 8Z" style="fill: var(--element-active-color)"/>
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
    'obi-reorder-horizontal-google': ObiReorderHorizontalGoogle;
  }
}
