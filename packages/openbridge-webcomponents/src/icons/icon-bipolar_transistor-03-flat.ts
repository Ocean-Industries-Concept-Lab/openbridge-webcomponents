import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-bipolar_transistor-03-flat')
export class ObiBipolar_transistor03Flat extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M8 13.8245V10.1753L19.3032 3.64938L18.5532 2.35034L8 8.44325V5.99997C8 5.44768 7.55228 4.99997 7 4.99997C6.44772 4.99997 6 5.44768 6 5.99997V11.25H1.00049V12.75H6V18C6 18.5522 6.44772 19 7 19C7.55228 19 8 18.5522 8 18V15.5565L13.5211 18.7441L9.80576 19.7396L10.194 21.1885L16.3825 19.5303L14.7243 13.3418L13.2754 13.73L14.2708 17.4449L8 13.8245Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M8 13.8245V10.1753L19.3032 3.64938L18.5532 2.35034L8 8.44325V5.99997C8 5.44768 7.55228 4.99997 7 4.99997C6.44772 4.99997 6 5.44768 6 5.99997V11.25H1.00049V12.75H6V18C6 18.5522 6.44772 19 7 19C7.55228 19 8 18.5522 8 18V15.5565L13.5211 18.7441L9.80576 19.7396L10.194 21.1885L16.3825 19.5303L14.7243 13.3418L13.2754 13.73L14.2708 17.4449L8 13.8245Z" style="fill: var(--automation-device-secondary-color)"/>
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
    'obi-bipolar_transistor-03-flat': ObiBipolar_transistor03Flat;
  }
}