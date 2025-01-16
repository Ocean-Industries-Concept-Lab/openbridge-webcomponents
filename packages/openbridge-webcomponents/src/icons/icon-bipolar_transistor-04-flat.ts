import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-bipolar_transistor-04-flat')
export class ObiBipolar_transistor04Flat extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M16.7924 9.23967L16.4042 10.6886L10.2156 9.03034L11.8739 2.8418L13.3228 3.23003L12.3273 6.94503L19.4194 2.8504L20.1694 4.14944L13.0772 8.24417L16.7924 9.23967Z" fill="currentColor"/>
<path d="M6 6.00003C6 5.44774 6.44772 5.00002 7 5.00002C7.55228 5.00002 8 5.44774 8 6.00002V13.8245L19.3032 20.3504L18.5532 21.6494L8 15.5565V18C8 18.5523 7.55228 19 7 19C6.44772 19 6 18.5523 6 18V12.75H1V11.25H6V6.00003Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M16.7924 9.23967L16.4042 10.6886L10.2156 9.03034L11.8739 2.8418L13.3228 3.23003L12.3273 6.94503L19.4194 2.8504L20.1694 4.14944L13.0772 8.24417L16.7924 9.23967Z" style="fill: var(--automation-device-secondary-color)"/>
<path d="M6 6.00003C6 5.44774 6.44772 5.00002 7 5.00002C7.55228 5.00002 8 5.44774 8 6.00002V13.8245L19.3032 20.3504L18.5532 21.6494L8 15.5565V18C8 18.5523 7.55228 19 7 19C6.44772 19 6 18.5523 6 18V12.75H1V11.25H6V6.00003Z" style="fill: var(--automation-device-secondary-color)"/>
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
    'obi-bipolar_transistor-04-flat': ObiBipolar_transistor04Flat;
  }
}
