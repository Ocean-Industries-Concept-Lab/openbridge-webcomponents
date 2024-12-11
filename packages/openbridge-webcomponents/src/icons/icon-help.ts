import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-help')
export class ObiHelp extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M9.56704 15.7132V15.4408C9.57258 14.5061 9.6585 13.761 9.8248 13.2055C9.99663 12.65 10.2461 12.2014 10.5731 11.8595C10.9002 11.5177 11.2937 11.2079 11.7538 10.9302C12.0975 10.7165 12.4051 10.4949 12.6768 10.2652C12.9484 10.0355 13.1646 9.78182 13.3253 9.50408C13.4861 9.221 13.5664 8.90587 13.5664 8.55869C13.5664 8.19015 13.475 7.86701 13.2921 7.58927C13.1091 7.31153 12.8625 7.09788 12.552 6.94833C12.2472 6.79878 11.909 6.724 11.5376 6.724C11.1773 6.724 10.8364 6.80145 10.5149 6.95634C10.1934 7.10589 9.93012 7.33022 9.72502 7.62933C9.51992 7.92309 9.40906 8.28896 9.39243 8.72694H6C6.02772 7.6587 6.29379 6.77741 6.79822 6.08306C7.30265 5.38336 7.9706 4.8626 8.80208 4.52076C9.63356 4.17359 10.551 4 11.5543 4C12.6574 4 13.633 4.17626 14.4811 4.52878C15.3292 4.87595 15.9944 5.38069 16.4766 6.043C16.9589 6.7053 17.2 7.50381 17.2 8.43852C17.2 9.06343 17.0919 9.61891 16.8757 10.105C16.6651 10.5857 16.3685 11.013 15.986 11.3868C15.6036 11.7554 15.1518 12.0892 14.6307 12.3883C14.1928 12.6393 13.8325 12.9011 13.5498 13.1735C13.2727 13.4459 13.0648 13.761 12.9262 14.1189C12.7932 14.4767 12.7239 14.9174 12.7183 15.4408V15.7132H9.56704Z" fill="currentColor"/>
<path d="M9.56704 16.9684H12.7088V20H9.56704V16.9684Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M9.56704 15.7132V15.4408C9.57258 14.5061 9.6585 13.761 9.8248 13.2055C9.99663 12.65 10.2461 12.2014 10.5731 11.8595C10.9002 11.5177 11.2937 11.2079 11.7538 10.9302C12.0975 10.7165 12.4051 10.4949 12.6768 10.2652C12.9484 10.0355 13.1646 9.78182 13.3253 9.50408C13.4861 9.221 13.5664 8.90587 13.5664 8.55869C13.5664 8.19015 13.475 7.86701 13.2921 7.58927C13.1091 7.31153 12.8625 7.09788 12.552 6.94833C12.2472 6.79878 11.909 6.724 11.5376 6.724C11.1773 6.724 10.8364 6.80145 10.5149 6.95634C10.1934 7.10589 9.93012 7.33022 9.72502 7.62933C9.51992 7.92309 9.40906 8.28896 9.39243 8.72694H6C6.02772 7.6587 6.29379 6.77741 6.79822 6.08306C7.30265 5.38336 7.9706 4.8626 8.80208 4.52076C9.63356 4.17359 10.551 4 11.5543 4C12.6574 4 13.633 4.17626 14.4811 4.52878C15.3292 4.87595 15.9944 5.38069 16.4766 6.043C16.9589 6.7053 17.2 7.50381 17.2 8.43852C17.2 9.06343 17.0919 9.61891 16.8757 10.105C16.6651 10.5857 16.3685 11.013 15.986 11.3868C15.6036 11.7554 15.1518 12.0892 14.6307 12.3883C14.1928 12.6393 13.8325 12.9011 13.5498 13.1735C13.2727 13.4459 13.0648 13.761 12.9262 14.1189C12.7932 14.4767 12.7239 14.9174 12.7183 15.4408V15.7132H9.56704Z" style="fill: var(--element-active-color)"/>
<path d="M9.56704 16.9684H12.7088V20H9.56704V16.9684Z" style="fill: var(--element-active-color)"/>
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
    'obi-help': ObiHelp;
  }
}
