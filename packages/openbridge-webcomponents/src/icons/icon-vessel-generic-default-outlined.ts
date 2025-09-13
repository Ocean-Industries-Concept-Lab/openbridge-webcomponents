import {LitElement, html, css, svg} from 'lit';
import {property} from 'lit/decorators.js';
import {customElement} from '../decorator.js';

@customElement('obi-vessel-generic-default-outlined')
export class ObiVesselGenericDefaultOutlined extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M10.6587 1.82037C11.2056 0.726548 12.7954 0.726538 13.3423 1.82037L13.3931 1.93365L20.8511 20.2637C21.5955 22.0942 19.5493 23.663 17.9556 22.709L12.0005 19.1641L6.04541 22.71L6.04443 22.709C4.45083 23.6621 2.40558 22.0939 3.1499 20.2637L10.6079 1.93365L10.6587 1.82037ZM5.00927 20.9971C5.01149 20.9961 5.01531 20.9955 5.01904 20.9932L5.02197 20.9913L12.0005 16.836L18.979 20.9913L18.9819 20.9932C18.9852 20.9952 18.9886 20.9961 18.9907 20.9971L12.0005 3.81744L5.00927 20.9971Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M10.6587 1.82037C11.2056 0.726548 12.7954 0.726538 13.3423 1.82037L13.3931 1.93365L20.8511 20.2637C21.5955 22.0942 19.5493 23.663 17.9556 22.709L12.0005 19.1641L6.04541 22.71L6.04443 22.709C4.45083 23.6621 2.40558 22.0939 3.1499 20.2637L10.6079 1.93365L10.6587 1.82037ZM5.00927 20.9971C5.01149 20.9961 5.01531 20.9955 5.01904 20.9932L5.02197 20.9913L12.0005 16.836L18.979 20.9913L18.9819 20.9932C18.9852 20.9952 18.9886 20.9961 18.9907 20.9971L12.0005 3.81744L5.00927 20.9971Z" style="fill: var(--element-active-color)"/>
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
    'obi-vessel-generic-default-outlined': ObiVesselGenericDefaultOutlined;
  }
}
