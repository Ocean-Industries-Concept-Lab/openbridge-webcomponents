import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-light-aol-off')
export class ObiLightAolOff extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M21.1934 21.1924L2.80862 2.80762L1.39441 4.22183L7.11261 9.94003C7.03886 10.2817 7.00003 10.6363 7.00003 11V17H6.00003V18L8.57146 21H15.4286L16.6951 19.5225L19.7792 22.6066L21.1934 21.1924ZM14.1726 17L9.00003 11.8275V17H14.1726Z" fill="currentColor"/>
<path d="M15 11V12.1709L17 14.1709V11C17 8.23858 14.7615 6 12 6C11.0888 6 10.2345 6.24376 9.49877 6.66964L10.9999 8.17076C11.3127 8.06017 11.6493 8 12 8C13.6569 8 15 9.34315 15 11Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M21.1934 21.1924L2.80862 2.80762L1.39441 4.22183L7.11261 9.94003C7.03886 10.2817 7.00003 10.6363 7.00003 11V17H6.00003V18L8.57146 21H15.4286L16.6951 19.5225L19.7792 22.6066L21.1934 21.1924ZM14.1726 17L9.00003 11.8275V17H14.1726Z" style="fill: var(--element-active-color)"/>
<path d="M15 11V12.1709L17 14.1709V11C17 8.23858 14.7615 6 12 6C11.0888 6 10.2345 6.24376 9.49877 6.66964L10.9999 8.17076C11.3127 8.06017 11.6493 8 12 8C13.6569 8 15 9.34315 15 11Z" style="fill: var(--element-active-color)"/>
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
