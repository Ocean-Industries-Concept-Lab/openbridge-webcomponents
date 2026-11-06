import {LitElement, html, css, svg} from 'lit';
import {property} from 'lit/decorators.js';
import {customElement} from '../decorator.js';

@customElement('obi-valve-four-way-closed-bottom')
export class ObiValveFourWayClosedBottom extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M7.99928 23.0004C7.17523 23.0004 6.70505 22.059 7.19947 21.3998L11.1993 16.067C11.5993 15.5337 12.3993 15.5337 12.7993 16.067L16.7991 21.3998C17.2935 22.059 16.8232 23.0002 15.9993 23.0004L7.99928 23.0004Z" fill="currentColor" stroke="currentColor"/>
<path d="M17.0784 2C17.8874 2 18.3616 2.91047 17.8977 3.57324L13.5877 9.73008C13.5301 9.81233 13.4993 9.91047 13.4993 10.0109C13.4993 10.2807 13.718 10.5 13.9878 10.5C14.0881 10.5 14.1859 10.4692 14.268 10.4117L20.426 6.10156C21.0888 5.63762 21.9993 6.11188 21.9993 6.9209V17.0791C21.9993 17.8881 21.0888 18.3624 20.426 17.8984L14.4011 13.6808C14.233 13.5631 14.0328 13.5 13.8276 13.5H10.1729C9.96772 13.5 9.76751 13.5631 9.59942 13.6808L3.57446 17.8984C2.91169 18.3623 2.00122 17.8881 2.00122 17.0791V6.9209C2.00122 6.11193 2.9117 5.63778 3.57446 6.10156L9.73286 10.412C9.81473 10.4693 9.91224 10.5 10.0122 10.5C10.2812 10.5 10.4993 10.2802 10.4993 10.0112C10.4993 9.91083 10.4684 9.81233 10.4108 9.73008L6.10083 3.57324C5.63698 2.91047 6.11118 2 6.92017 2H17.0784Z" fill="currentColor" stroke="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M7.99928 23.0004C7.17523 23.0004 6.70505 22.059 7.19947 21.3998L11.1993 16.067C11.5993 15.5337 12.3993 15.5337 12.7993 16.067L16.7991 21.3998C17.2935 22.059 16.8232 23.0002 15.9993 23.0004L7.99928 23.0004Z" style="fill: var(--automation-symbol-off-background-color); stroke: var(--automation-symbol-off-border-color)"/>
<path d="M17.0784 2C17.8874 2 18.3616 2.91047 17.8977 3.57324L13.5877 9.73008C13.5301 9.81233 13.4993 9.91047 13.4993 10.0109C13.4993 10.2807 13.718 10.5 13.9878 10.5C14.0881 10.5 14.1859 10.4692 14.268 10.4117L20.426 6.10156C21.0888 5.63762 21.9993 6.11188 21.9993 6.9209V17.0791C21.9993 17.8881 21.0888 18.3624 20.426 17.8984L14.4011 13.6808C14.233 13.5631 14.0328 13.5 13.8276 13.5H10.1729C9.96772 13.5 9.76751 13.5631 9.59942 13.6808L3.57446 17.8984C2.91169 18.3623 2.00122 17.8881 2.00122 17.0791V6.9209C2.00122 6.11193 2.9117 5.63778 3.57446 6.10156L9.73286 10.412C9.81473 10.4693 9.91224 10.5 10.0122 10.5C10.2812 10.5 10.4993 10.2802 10.4993 10.0112C10.4993 9.91083 10.4684 9.81233 10.4108 9.73008L6.10083 3.57324C5.63698 2.91047 6.11118 2 6.92017 2H17.0784Z" style="fill: var(--automation-symbol-on-background-color); stroke: var(--automation-symbol-on-border-color)"/>
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
    'obi-valve-four-way-closed-bottom': ObiValveFourWayClosedBottom;
  }
}
