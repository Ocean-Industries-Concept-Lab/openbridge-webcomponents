import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-warning-silenced-iec')
export class ObiWarningSilencedIec extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z" fill="currentColor"/>
<path d="M17.3133 14.6648C17.7506 13.8758 17.9996 12.968 17.9996 12.0021C17.9996 9.306 16.0598 7.06302 13.4996 6.59276V8.12809C15.2249 8.57213 16.4996 10.1382 16.4996 12.0021C16.4996 12.5483 16.3901 13.069 16.1919 13.5434L17.3133 14.6648Z" fill="currentColor"/>
<path d="M14.9784 12.3298C14.9924 12.2226 14.9996 12.1132 14.9996 12.0021C14.9996 10.9769 14.3826 10.0959 13.4996 9.7101V10.8511L14.9784 12.3298Z" fill="currentColor"/>
<path d="M11.9996 9.35111V6.50244L10.4368 8.104L11.9996 9.35111Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M11.9996 17.4114V13.06L14.4403 15.5006C14.1473 15.6634 13.8318 15.7906 13.4996 15.8761V17.4114C14.2393 17.2755 14.9271 16.9917 15.5314 16.5918L16.9693 18.0297L18.0283 16.9707L7.0311 5.97021L5.97046 7.03086L8.71851 9.78369L8.49964 10.0021H5.99964V14.0021H8.49964L11.9996 17.4114Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z" style="fill: var(--alert-warning-color)"/>
<path d="M17.3133 14.6648C17.7506 13.8758 17.9996 12.968 17.9996 12.0021C17.9996 9.306 16.0598 7.06302 13.4996 6.59276V8.12809C15.2249 8.57213 16.4996 10.1382 16.4996 12.0021C16.4996 12.5483 16.3901 13.069 16.1919 13.5434L17.3133 14.6648Z" style="fill: var(--on-warning-active-color)"/>
<path d="M14.9784 12.3298C14.9924 12.2226 14.9996 12.1132 14.9996 12.0021C14.9996 10.9769 14.3826 10.0959 13.4996 9.7101V10.8511L14.9784 12.3298Z" style="fill: var(--on-warning-active-color)"/>
<path d="M11.9996 9.35111V6.50244L10.4368 8.104L11.9996 9.35111Z" style="fill: var(--on-warning-active-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M11.9996 17.4114V13.06L14.4403 15.5006C14.1473 15.6634 13.8318 15.7906 13.4996 15.8761V17.4114C14.2393 17.2755 14.9271 16.9917 15.5314 16.5918L16.9693 18.0297L18.0283 16.9707L7.0311 5.97021L5.97046 7.03086L8.71851 9.78369L8.49964 10.0021H5.99964V14.0021H8.49964L11.9996 17.4114Z" style="fill: var(--on-warning-active-color)"/>
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
    'obi-warning-silenced-iec': ObiWarningSilencedIec;
  }
}
