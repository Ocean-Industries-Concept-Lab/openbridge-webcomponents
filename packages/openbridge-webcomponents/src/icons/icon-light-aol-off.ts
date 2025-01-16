import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-light-aol-off')
export class ObiLightAolOff extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M21.1933 21.1924L2.8085 2.80762L1.39429 4.22183L7.11248 9.94003C7.03874 10.2817 6.99991 10.6363 6.99991 11V17H5.99991V18L8.57134 21H15.4285L16.6949 19.5225L19.7791 22.6066L21.1933 21.1924ZM14.1725 17L8.99991 11.8275V17H14.1725Z" fill="currentColor"/>
<path d="M14.9999 11V12.1709L16.9999 14.1709V11C16.9999 8.23858 14.7613 6 11.9999 6C11.0887 6 10.2344 6.24376 9.49865 6.66964L10.9998 8.17076C11.3126 8.06017 11.6492 8 11.9999 8C13.6568 8 14.9999 9.34315 14.9999 11Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M21.1933 21.1924L2.8085 2.80762L1.39429 4.22183L7.11248 9.94003C7.03874 10.2817 6.99991 10.6363 6.99991 11V17H5.99991V18L8.57134 21H15.4285L16.6949 19.5225L19.7791 22.6066L21.1933 21.1924ZM14.1725 17L8.99991 11.8275V17H14.1725Z" style="fill: var(--element-active-color)"/>
<path d="M14.9999 11V12.1709L16.9999 14.1709V11C16.9999 8.23858 14.7613 6 11.9999 6C11.0887 6 10.2344 6.24376 9.49865 6.66964L10.9998 8.17076C11.3126 8.06017 11.6492 8 11.9999 8C13.6568 8 14.9999 9.34315 14.9999 11Z" style="fill: var(--element-active-color)"/>
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
    'obi-light-aol-off': ObiLightAolOff;
  }
}
