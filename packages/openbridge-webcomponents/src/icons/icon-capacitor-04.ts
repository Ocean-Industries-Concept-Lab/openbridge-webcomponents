import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-capacitor-04')
export class ObiCapacitor04 extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M16.2427 2.10074L17.6569 0.686523L23.3137 6.34338L21.8995 7.75759L16.2427 2.10074Z" fill="currentColor"/>
<path d="M15.9999 6.58671L18.364 4.22266L19.7782 5.63687L15.9999 9.41514V18.4996C15.9999 19.328 15.3283 19.9996 14.4999 19.9996C13.6715 19.9996 12.9999 19.328 12.9999 18.4996V12.4151L10.9999 14.4151V18.4996C10.9999 19.328 10.3283 19.9996 9.49991 19.9996C8.67148 19.9996 7.99991 19.328 7.99991 18.4996V17.4151L4.22183 21.1932L2.80762 19.779L7.99991 14.5867V5.49959C7.99991 4.67117 8.67148 3.99959 9.49991 3.99959C10.3283 3.99959 10.9999 4.67117 10.9999 5.49959V11.5867L12.9999 9.58671V5.49959C12.9999 4.67117 13.6715 3.99959 14.4999 3.99959C15.3283 3.99959 15.9999 4.67117 15.9999 5.49959V6.58671Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M16.2427 2.10074L17.6569 0.686523L23.3137 6.34338L21.8995 7.75759L16.2427 2.10074Z" style="fill: var(--automation-device-secondary-color)"/>
<path d="M15.9999 6.58671L18.364 4.22266L19.7782 5.63687L15.9999 9.41514V18.4996C15.9999 19.328 15.3283 19.9996 14.4999 19.9996C13.6715 19.9996 12.9999 19.328 12.9999 18.4996V12.4151L10.9999 14.4151V18.4996C10.9999 19.328 10.3283 19.9996 9.49991 19.9996C8.67148 19.9996 7.99991 19.328 7.99991 18.4996V17.4151L4.22183 21.1932L2.80762 19.779L7.99991 14.5867V5.49959C7.99991 4.67117 8.67148 3.99959 9.49991 3.99959C10.3283 3.99959 10.9999 4.67117 10.9999 5.49959V11.5867L12.9999 9.58671V5.49959C12.9999 4.67117 13.6715 3.99959 14.4999 3.99959C15.3283 3.99959 15.9999 4.67117 15.9999 5.49959V6.58671Z" style="fill: var(--automation-device-secondary-color)"/>
</svg>
`;

  override render() {
    return html`
      <div class="wrapper" >
        ${this.useCssColor? this.iconCss : this.icon}
      </div>
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
    'obi-capacitor-04': ObiCapacitor04;
  }
}