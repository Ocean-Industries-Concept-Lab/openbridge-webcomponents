import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-clear-polartwilight-colour')
export class ObiClearPolartwilightColour extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="32" height="32" viewBox="0 0 32 32" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M6.84974 12.6667C6.84974 12.8969 6.75579 13.127 6.56787 13.2931L3.61636 15.9027C3.0697 16.386 3.36266 17.2917 4.08777 17.36L8.00269 17.7286C8.5012 17.7755 8.84542 18.2514 8.73582 18.7421L7.8751 22.5958C7.71568 23.3096 8.48268 23.8693 9.10926 23.4965L12.4922 21.4834C12.923 21.2271 13.48 21.4088 13.6785 21.8705L15.2373 25.4964C15.526 26.168 16.4741 26.168 16.7628 25.4964L18.3216 21.8705C18.5201 21.4088 19.0771 21.2271 19.5079 21.4834L22.8908 23.4965C23.5174 23.8693 24.2844 23.3096 24.125 22.5958L23.2643 18.7421C23.1547 18.2514 23.4989 17.7755 23.9974 17.7286L27.9123 17.36C28.6374 17.2917 28.9304 16.386 28.3837 15.9027L25.4322 13.2931C25.2443 13.127 25.1503 12.8969 25.1503 12.6667H22.6667C22.6667 16.3486 19.6819 19.3334 16 19.3334C12.3181 19.3334 9.33337 16.3486 9.33337 12.6667H6.84974Z" fill="currentColor"/>
<rect x="2.66663" y="11.3333" width="26.6667" height="1.33333" rx="0.666667" fill="currentColor"/>
<path d="M22.6667 12.6667C22.6667 13.5422 22.4943 14.4091 22.1592 15.218C21.8242 16.0268 21.3331 16.7617 20.7141 17.3808C20.095 17.9999 19.3601 18.4909 18.5513 18.8259C17.7424 19.161 16.8755 19.3334 16 19.3334C15.1246 19.3334 14.2577 19.161 13.4488 18.8259C12.64 18.4909 11.9051 17.9999 11.286 17.3808C10.6669 16.7617 10.1759 16.0268 9.84084 15.218C9.50581 14.4091 9.33337 13.5422 9.33337 12.6667L22.6667 12.6667Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M6.84974 12.6667C6.84974 12.8969 6.75579 13.127 6.56787 13.2931L3.61636 15.9027C3.0697 16.386 3.36266 17.2917 4.08777 17.36L8.00269 17.7286C8.5012 17.7755 8.84542 18.2514 8.73582 18.7421L7.8751 22.5958C7.71568 23.3096 8.48268 23.8693 9.10926 23.4965L12.4922 21.4834C12.923 21.2271 13.48 21.4088 13.6785 21.8705L15.2373 25.4964C15.526 26.168 16.4741 26.168 16.7628 25.4964L18.3216 21.8705C18.5201 21.4088 19.0771 21.2271 19.5079 21.4834L22.8908 23.4965C23.5174 23.8693 24.2844 23.3096 24.125 22.5958L23.2643 18.7421C23.1547 18.2514 23.4989 17.7755 23.9974 17.7286L27.9123 17.36C28.6374 17.2917 28.9304 16.386 28.3837 15.9027L25.4322 13.2931C25.2443 13.127 25.1503 12.8969 25.1503 12.6667H22.6667C22.6667 16.3486 19.6819 19.3334 16 19.3334C12.3181 19.3334 9.33337 16.3486 9.33337 12.6667H6.84974Z" style="fill: var(--data-weather-sun-primary-color)"/>
<rect x="2.66663" y="11.3333" width="26.6667" height="1.33333" rx="0.666667" style="fill: var(--data-weather-sun-primary-color)"/>
<path d="M22.6667 12.6667C22.6667 13.5422 22.4943 14.4091 22.1592 15.218C21.8242 16.0268 21.3331 16.7617 20.7141 17.3808C20.095 17.9999 19.3601 18.4909 18.5513 18.8259C17.7424 19.161 16.8755 19.3334 16 19.3334C15.1246 19.3334 14.2577 19.161 13.4488 18.8259C12.64 18.4909 11.9051 17.9999 11.286 17.3808C10.6669 16.7617 10.1759 16.0268 9.84084 15.218C9.50581 14.4091 9.33337 13.5422 9.33337 12.6667L22.6667 12.6667Z" style="fill: var(--data-weather-sun-secondary-color)"/>
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
    'obi-clear-polartwilight-colour': ObiClearPolartwilightColour;
  }
}
