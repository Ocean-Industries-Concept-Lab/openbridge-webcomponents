import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-ais-target-synthetic-nocog-iec')
export class ObiAisTargetSyntheticNocogIec extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M12 2L9.1272 7.7456L10.8624 8.7474L12 6.47214L14.061 10.5941L17.2045 12.409L12 2Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M22.0225 17.5001L21.0225 19.2322L19.4043 18.2979L12 22L4 18L7.33513 11.3297L1.96997 8.23217L2.96997 6.50012L22.0225 17.5001ZM9.07029 12.3315L6.68328 17.1056L12 19.7639L17.3167 17.1056L17.3076 17.0874L9.07029 12.3315Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M12 2L9.1272 7.7456L10.8624 8.7474L12 6.47214L14.061 10.5941L17.2045 12.409L12 2Z" style="fill: var(--element-active-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M22.0225 17.5001L21.0225 19.2322L19.4043 18.2979L12 22L4 18L7.33513 11.3297L1.96997 8.23217L2.96997 6.50012L22.0225 17.5001ZM9.07029 12.3315L6.68328 17.1056L12 19.7639L17.3167 17.1056L17.3076 17.0874L9.07029 12.3315Z" style="fill: var(--element-active-color)"/>
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
