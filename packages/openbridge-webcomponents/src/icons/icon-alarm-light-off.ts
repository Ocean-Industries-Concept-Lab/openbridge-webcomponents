import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-alarm-light-off')
export class ObiAlarmLightOff extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M21.1933 21.1924L2.8085 2.80762L1.39429 4.22183L6.97153 9.79908L5.42848 17H2.99991V19H16.1725L19.7791 22.6066L21.1933 21.1924ZM14.1725 17L12.9999 15.8275V17H14.1725ZM10.0067 12.8342L8.65598 11.4835L7.47388 17H10.9999V14.7324C10.4021 14.3866 9.99991 13.7403 9.99991 13C9.99991 12.9442 10.0022 12.8889 10.0067 12.8342Z" fill="currentColor"/>
<path d="M14.3831 7L15.6251 12.7961L18.2283 15.3993L16.3387 6.58094C16.1411 5.6588 15.3261 5 14.3831 5H9.61674C9.12372 5 8.66573 5.18005 8.31265 5.48364L9.82901 7H14.3831Z" fill="currentColor"/>
<path d="M20.9999 18.1709L19.829 17H20.9999V18.1709Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M21.1933 21.1924L2.8085 2.80762L1.39429 4.22183L6.97153 9.79908L5.42848 17H2.99991V19H16.1725L19.7791 22.6066L21.1933 21.1924ZM14.1725 17L12.9999 15.8275V17H14.1725ZM10.0067 12.8342L8.65598 11.4835L7.47388 17H10.9999V14.7324C10.4021 14.3866 9.99991 13.7403 9.99991 13C9.99991 12.9442 10.0022 12.8889 10.0067 12.8342Z" style="fill: var(--element-active-color)"/>
<path d="M14.3831 7L15.6251 12.7961L18.2283 15.3993L16.3387 6.58094C16.1411 5.6588 15.3261 5 14.3831 5H9.61674C9.12372 5 8.66573 5.18005 8.31265 5.48364L9.82901 7H14.3831Z" style="fill: var(--element-active-color)"/>
<path d="M20.9999 18.1709L19.829 17H20.9999V18.1709Z" style="fill: var(--element-active-color)"/>
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
    'obi-alarm-light-off': ObiAlarmLightOff;
  }
}
