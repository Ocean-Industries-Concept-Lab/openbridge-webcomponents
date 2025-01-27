import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-converter-filter-1')
export class ObiConverterFilter1 extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="25" height="25" viewBox="0 0 25 25" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M20.8275 11.9825L16.4017 11.9825V7.29627H14.8396V11.3642L8.33098 7.29627V11.9825H4.16546V13.0239H8.33098V17.7101L14.8396 13.6422L14.8396 17.7101H16.4017L16.4017 13.0239L20.8275 13.0239V11.9825ZM9.89305 10.1146L12.8816 11.9825H9.89305V10.1146ZM9.89305 14.8917V13.0239H12.8816L9.89305 14.8917Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M12.6513 24.8588L0.141105 12.3486L12.4897 0L24.9999 12.5102L12.6513 24.8588ZM1.61384 12.3486L12.4897 1.47273L23.5272 12.5102L12.6513 23.3861L1.61384 12.3486Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M20.8275 11.9825L16.4017 11.9825V7.29627H14.8396V11.3642L8.33098 7.29627V11.9825H4.16546V13.0239H8.33098V17.7101L14.8396 13.6422L14.8396 17.7101H16.4017L16.4017 13.0239L20.8275 13.0239V11.9825ZM9.89305 10.1146L12.8816 11.9825H9.89305V10.1146ZM9.89305 14.8917V13.0239H12.8816L9.89305 14.8917Z" style="fill: var(--automation-device-secondary-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M12.6513 24.8588L0.141105 12.3486L12.4897 0L24.9999 12.5102L12.6513 24.8588ZM1.61384 12.3486L12.4897 1.47273L23.5272 12.5102L12.6513 23.3861L1.61384 12.3486Z" style="fill: var(--automation-device-secondary-color)"/>
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
    'obi-converter-filter-1': ObiConverterFilter1;
  }
}
