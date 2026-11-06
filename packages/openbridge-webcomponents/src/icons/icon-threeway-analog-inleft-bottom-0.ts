import {LitElement, html, css, svg} from 'lit';
import {property} from 'lit/decorators.js';
import {customElement} from '../decorator.js';

@customElement('obi-threeway-analog-inleft-bottom-0')
export class ObiThreewayAnalogInleftBottom0 extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M0.999573 7.99938C0.999942 7.17579 1.94009 6.70572 2.59918 7.19957L7.93287 11.1994C8.46622 11.5994 8.46626 12.3994 7.93295 12.7994L2.59918 16.8002C1.93997 17.2941 0.999573 16.8233 0.999573 15.9994V7.99938Z" fill="currentColor" stroke="currentColor"/>
<path d="M20.427 6.10134C21.0897 5.63759 22.0002 6.11172 22.0002 6.92068V17.0789C22.0002 17.8878 21.0897 18.362 20.427 17.8982L14.2689 13.5881C14.1868 13.5306 14.089 13.4998 13.9888 13.4998C13.7189 13.4998 13.5002 13.7185 13.5002 13.9884C13.5002 14.0886 13.531 14.1864 13.5885 14.2685L17.8986 20.4265C18.3623 21.0893 17.8882 21.9998 17.0793 21.9998H6.92013C6.1114 21.9994 5.63792 21.0892 6.10177 20.4265L10.4119 14.2685C10.4694 14.1864 10.5002 14.0886 10.5002 13.9884V13.5003C10.5005 13.5003 10.5002 13.5 10.5002 13.5003C10.4999 13.5003 10.4992 13.4996 10.4992 13.4993V11.4998C10.4992 10.9475 10.9469 10.4998 11.4992 10.4998H13.8276C14.0327 10.4998 14.2329 10.4367 14.401 10.319L20.427 6.10134Z" fill="currentColor" stroke="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M0.999573 7.99938C0.999942 7.17579 1.94009 6.70572 2.59918 7.19957L7.93287 11.1994C8.46622 11.5994 8.46626 12.3994 7.93295 12.7994L2.59918 16.8002C1.93997 17.2941 0.999573 16.8233 0.999573 15.9994V7.99938Z" style="fill: var(--automation-symbol-off-background-color); stroke: var(--automation-symbol-off-border-color)"/>
<path d="M20.427 6.10134C21.0897 5.63759 22.0002 6.11172 22.0002 6.92068V17.0789C22.0002 17.8878 21.0897 18.362 20.427 17.8982L14.2689 13.5881C14.1868 13.5306 14.089 13.4998 13.9888 13.4998C13.7189 13.4998 13.5002 13.7185 13.5002 13.9884C13.5002 14.0886 13.531 14.1864 13.5885 14.2685L17.8986 20.4265C18.3623 21.0893 17.8882 21.9998 17.0793 21.9998H6.92013C6.1114 21.9994 5.63792 21.0892 6.10177 20.4265L10.4119 14.2685C10.4694 14.1864 10.5002 14.0886 10.5002 13.9884V13.5003C10.5005 13.5003 10.5002 13.5 10.5002 13.5003C10.4999 13.5003 10.4992 13.4996 10.4992 13.4993V11.4998C10.4992 10.9475 10.9469 10.4998 11.4992 10.4998H13.8276C14.0327 10.4998 14.2329 10.4367 14.401 10.319L20.427 6.10134Z" style="fill: var(--automation-symbol-on-background-color); stroke: var(--automation-symbol-on-border-color)"/>
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
    'obi-threeway-analog-inleft-bottom-0': ObiThreewayAnalogInleftBottom0;
  }
}
