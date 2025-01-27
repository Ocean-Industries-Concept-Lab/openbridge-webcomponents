import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-auto')
export class ObiAuto extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M9.42846 3L3 20.9997H7.49992L8.94642 17.1426H15.0548L16.5013 20.9997H21.0012L14.5728 3H9.42846ZM12.0006 8.99864L10.3929 13.2855H13.6083L12.0006 8.99864Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M9.42846 3L3 20.9997H7.49992L8.94642 17.1426H15.0548L16.5013 20.9997H21.0012L14.5728 3H9.42846ZM12.0006 8.99864L10.3929 13.2855H13.6083L12.0006 8.99864Z" style="fill: var(--element-active-color)"/>
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
    'obi-auto': ObiAuto;
  }
}
