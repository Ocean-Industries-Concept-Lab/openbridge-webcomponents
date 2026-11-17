import {LitElement, html, css, svg} from 'lit';
import {property} from 'lit/decorators.js';
import {customElement} from '../decorator.js';

@customElement('obi-threeway-analog-inleft-left-0')
export class ObiThreewayAnalogInleftLeft0 extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M21.3999 7.19966C22.0592 6.70533 23.0005 7.17643 23.0005 8.00045V16.0004C23.0001 16.8242 22.059 17.2945 21.3999 16.8003L16.0662 12.7995C15.5328 12.3995 15.5329 11.5995 16.0662 11.1995L21.3999 7.19966Z" fill="currentColor" stroke="currentColor"/>
<path d="M2 6.92072C2 6.11173 2.91047 5.63754 3.57324 6.10139L9.5992 10.3191C9.76727 10.4367 9.96746 10.4998 10.1726 10.4998H12.5C13.0523 10.4998 13.5 10.9475 13.5 11.4998V13.8272C13.5 14.0324 13.5631 14.2326 13.6807 14.4006L17.8984 20.4266C18.3623 21.0894 17.8881 21.9998 17.0791 21.9998H6.9209C6.11191 21.9998 5.63772 21.0894 6.10156 20.4266L10.4117 14.2686C10.4692 14.1864 10.5 14.0886 10.5 13.9884C10.5 13.7186 10.2813 13.4998 10.0114 13.4998C9.91118 13.4998 9.81338 13.5307 9.73126 13.5881L3.57324 17.8983C2.91047 18.3621 2 17.8879 2 17.0789V6.92072Z" fill="currentColor" stroke="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M21.3999 7.19966C22.0592 6.70533 23.0005 7.17643 23.0005 8.00045V16.0004C23.0001 16.8242 22.059 17.2945 21.3999 16.8003L16.0662 12.7995C15.5328 12.3995 15.5329 11.5995 16.0662 11.1995L21.3999 7.19966Z" style="fill: var(--automation-symbol-off-background-color); stroke: var(--automation-symbol-off-border-color)"/>
<path d="M2 6.92072C2 6.11173 2.91047 5.63754 3.57324 6.10139L9.5992 10.3191C9.76727 10.4367 9.96746 10.4998 10.1726 10.4998H12.5C13.0523 10.4998 13.5 10.9475 13.5 11.4998V13.8272C13.5 14.0324 13.5631 14.2326 13.6807 14.4006L17.8984 20.4266C18.3623 21.0894 17.8881 21.9998 17.0791 21.9998H6.9209C6.11191 21.9998 5.63772 21.0894 6.10156 20.4266L10.4117 14.2686C10.4692 14.1864 10.5 14.0886 10.5 13.9884C10.5 13.7186 10.2813 13.4998 10.0114 13.4998C9.91118 13.4998 9.81338 13.5307 9.73126 13.5881L3.57324 17.8983C2.91047 18.3621 2 17.8879 2 17.0789V6.92072Z" style="fill: var(--automation-symbol-on-background-color); stroke: var(--automation-symbol-on-border-color)"/>
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
    'obi-threeway-analog-inleft-left-0': ObiThreewayAnalogInleftLeft0;
  }
}
