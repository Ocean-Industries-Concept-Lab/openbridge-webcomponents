import {LitElement, html, css, svg} from 'lit';
import {property} from 'lit/decorators.js';
import {customElement} from '../decorator.js';

@customElement('obi-threeway-digital-closed-left')
export class ObiThreewayDigitalClosedLeft extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M0.999573 7.99962C0.999944 7.17604 1.9401 6.70596 2.59918 7.19981L7.93287 11.1997C8.46622 11.5996 8.46626 12.3996 7.93295 12.7997L2.59918 16.8004C1.93997 17.2943 0.999573 16.8235 0.999573 15.9996V7.99962Z" fill="currentColor" stroke="currentColor"/>
<path d="M20.427 6.10159C21.0898 5.63783 22.0003 6.11197 22.0003 6.92092V17.0791C22.0003 17.8881 21.0898 18.3622 20.427 17.8985L14.269 13.5883C14.1869 13.5309 14.0891 13.5 13.9888 13.5C13.719 13.5 13.5003 13.7188 13.5003 13.9886C13.5003 14.0888 13.5311 14.1866 13.5886 14.2688L17.8987 20.4268C18.3624 21.0895 17.8883 22 17.0794 22H6.92019C6.11146 21.9997 5.63798 21.0894 6.10183 20.4268L10.412 14.2688C10.4694 14.1866 10.5003 14.0888 10.5003 13.9886L10.4998 13.5L10.4993 11.5C10.4993 10.9477 10.947 10.5 11.4993 10.5H13.8277C14.0328 10.5 14.233 10.4369 14.4011 10.3193L20.427 6.10159Z" fill="currentColor" stroke="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M0.999573 7.99962C0.999944 7.17604 1.9401 6.70596 2.59918 7.19981L7.93287 11.1997C8.46622 11.5996 8.46626 12.3996 7.93295 12.7997L2.59918 16.8004C1.93997 17.2943 0.999573 16.8235 0.999573 15.9996V7.99962Z" style="fill: var(--automation-symbol-off-background-color); stroke: var(--automation-symbol-off-border-color)"/>
<path d="M20.427 6.10159C21.0898 5.63783 22.0003 6.11197 22.0003 6.92092V17.0791C22.0003 17.8881 21.0898 18.3622 20.427 17.8985L14.269 13.5883C14.1869 13.5309 14.0891 13.5 13.9888 13.5C13.719 13.5 13.5003 13.7188 13.5003 13.9886C13.5003 14.0888 13.5311 14.1866 13.5886 14.2688L17.8987 20.4268C18.3624 21.0895 17.8883 22 17.0794 22H6.92019C6.11146 21.9997 5.63798 21.0894 6.10183 20.4268L10.412 14.2688C10.4694 14.1866 10.5003 14.0888 10.5003 13.9886L10.4998 13.5L10.4993 11.5C10.4993 10.9477 10.947 10.5 11.4993 10.5H13.8277C14.0328 10.5 14.233 10.4369 14.4011 10.3193L20.427 6.10159Z" style="fill: var(--automation-symbol-on-background-color); stroke: var(--automation-symbol-on-border-color)"/>
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
    'obi-threeway-digital-closed-left': ObiThreewayDigitalClosedLeft;
  }
}
