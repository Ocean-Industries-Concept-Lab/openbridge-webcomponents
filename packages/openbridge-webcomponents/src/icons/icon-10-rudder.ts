import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-10-rudder')
export class Obi10Rudder extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M15 9C15 9.46313 14.895 9.90173 14.7078 10.2933L19.7283 15.3138L18.314 16.7281L13.2935 11.7076C12.9019 11.895 12.4631 12 12 12C10.3433 12 9 10.6569 9 9C9 7.34314 10.3433 6 12 6C13.6567 6 15 7.34314 15 9Z" fill="currentColor"/>
<path d="M2 9C2 14.5228 6.47705 19 12 19C13.8301 19 15.5454 18.5084 17.021 17.65L15.9167 16.5457C14.7444 17.1555 13.4121 17.5001 11.9995 17.5001C7.30493 17.5001 3.49951 13.6946 3.49951 9H2Z" fill="currentColor"/>
<path d="M22 9C22 10.8528 21.4961 12.588 20.6179 14.0758L19.5154 12.9734C20.1436 11.7877 20.4995 10.4355 20.4995 9H22Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M15 9C15 9.46313 14.895 9.90173 14.7078 10.2933L19.7283 15.3138L18.314 16.7281L13.2935 11.7076C12.9019 11.895 12.4631 12 12 12C10.3433 12 9 10.6569 9 9C9 7.34314 10.3433 6 12 6C13.6567 6 15 7.34314 15 9Z" style="fill: var(--element-active-color)"/>
<path d="M2 9C2 14.5228 6.47705 19 12 19C13.8301 19 15.5454 18.5084 17.021 17.65L15.9167 16.5457C14.7444 17.1555 13.4121 17.5001 11.9995 17.5001C7.30493 17.5001 3.49951 13.6946 3.49951 9H2Z" style="fill: var(--element-active-color)"/>
<path d="M22 9C22 10.8528 21.4961 12.588 20.6179 14.0758L19.5154 12.9734C20.1436 11.7877 20.4995 10.4355 20.4995 9H22Z" style="fill: var(--element-active-color)"/>
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
    'obi-10-rudder': Obi10Rudder;
  }
}
