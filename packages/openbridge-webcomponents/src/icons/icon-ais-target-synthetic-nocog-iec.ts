import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-ais-target-synthetic-nocog-iec')
export class ObiAisTargetSyntheticNocogIec extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M11.9998 2L9.12696 7.7456L10.8621 8.7474L11.9998 6.47214L14.0607 10.5941L17.2043 12.409L11.9998 2Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M22.0223 17.5001L21.0223 19.2322L19.404 18.2979L11.9998 22L3.99976 18L7.33488 11.3297L1.96973 8.23217L2.96973 6.50012L22.0223 17.5001ZM9.07005 12.3315L6.68304 17.1056L11.9998 19.7639L17.3165 17.1056L17.3074 17.0874L9.07005 12.3315Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M11.9998 2L9.12696 7.7456L10.8621 8.7474L11.9998 6.47214L14.0607 10.5941L17.2043 12.409L11.9998 2Z" style="fill: var(--element-active-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M22.0223 17.5001L21.0223 19.2322L19.404 18.2979L11.9998 22L3.99976 18L7.33488 11.3297L1.96973 8.23217L2.96973 6.50012L22.0223 17.5001ZM9.07005 12.3315L6.68304 17.1056L11.9998 19.7639L17.3165 17.1056L17.3074 17.0874L9.07005 12.3315Z" style="fill: var(--element-active-color)"/>
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
    'obi-ais-target-synthetic-nocog-iec': ObiAisTargetSyntheticNocogIec;
  }
}
