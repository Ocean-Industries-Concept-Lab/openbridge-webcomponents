import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-com-radio-emergency')
export class ObiComRadioEmergency extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M5 8V2H7V8H11V7H13V8C14.1046 8 15 8.89543 15 10V11.5871C14.9298 11.6817 14.8649 11.7831 14.8059 11.8912L13.5 14.2853V10C13.5 9.72386 13.2761 9.5 13 9.5H5C4.72386 9.5 4.5 9.72386 4.5 10V20C4.5 20.2761 4.72386 20.5 5 20.5H10.2328C10.1251 21.0184 10.1916 21.5402 10.3935 22H5C3.89543 22 3 21.1046 3 20V10C3 8.89543 3.89543 8 5 8Z" fill="currentColor"/>
<path d="M6 12.5H12V11H6V12.5Z" fill="currentColor"/>
<path d="M12 15.5H6V14H12V15.5Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M12.685 22C11.9259 22 11.4436 21.1875 11.8071 20.5211L16.1226 12.6095C16.5016 11.9146 17.4993 11.9146 17.8784 12.6095L22.1938 20.5211C22.5573 21.1875 22.075 22 21.3159 22H12.685Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M5 8V2H7V8H11V7H13V8C14.1046 8 15 8.89543 15 10V11.5871C14.9298 11.6817 14.8649 11.7831 14.8059 11.8912L13.5 14.2853V10C13.5 9.72386 13.2761 9.5 13 9.5H5C4.72386 9.5 4.5 9.72386 4.5 10V20C4.5 20.2761 4.72386 20.5 5 20.5H10.2328C10.1251 21.0184 10.1916 21.5402 10.3935 22H5C3.89543 22 3 21.1046 3 20V10C3 8.89543 3.89543 8 5 8Z" style="fill: var(--element-active-color)"/>
<path d="M6 12.5H12V11H6V12.5Z" style="fill: var(--element-active-color)"/>
<path d="M12 15.5H6V14H12V15.5Z" style="fill: var(--element-active-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M12.685 22C11.9259 22 11.4436 21.1875 11.8071 20.5211L16.1226 12.6095C16.5016 11.9146 17.4993 11.9146 17.8784 12.6095L22.1938 20.5211C22.5573 21.1875 22.075 22 21.3159 22H12.685Z" style="fill: var(--element-active-color)"/>
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
    'obi-com-radio-emergency': ObiComRadioEmergency;
  }
}
