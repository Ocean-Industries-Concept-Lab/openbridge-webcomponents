import {LitElement, html, css, svg} from 'lit';
import {property} from 'lit/decorators.js';
import {customElement} from '../decorator.js';

@customElement('obi-hydraulic-10')
export class ObiHydraulic10 extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M4.5 15V17H6.5L6.5 23H8.5V17H10.5V15H4.5Z" fill="currentColor"/>
<path d="M14.1857 18.2373L6.32843 2.6272C6.22032 2.37684 6.16455 2.10703 6.16455 1.83433V0.958984H8.16455V1.83433L16.0374 17.4754L18.3084 16.5409L17.1646 22.959L11.835 19.2045L14.1857 18.2373Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M4.5 15V17H6.5L6.5 23H8.5V17H10.5V15H4.5Z" style="fill: var(--element-active-color)"/>
<path d="M14.1857 18.2373L6.32843 2.6272C6.22032 2.37684 6.16455 2.10703 6.16455 1.83433V0.958984H8.16455V1.83433L16.0374 17.4754L18.3084 16.5409L17.1646 22.959L11.835 19.2045L14.1857 18.2373Z" style="fill: var(--element-active-color)"/>
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
    'obi-hydraulic-10': ObiHydraulic10;
  }
}
