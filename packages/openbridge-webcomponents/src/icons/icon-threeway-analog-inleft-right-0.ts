import {LitElement, html, css, svg} from 'lit';
import {property} from 'lit/decorators.js';
import {customElement} from '../decorator.js';

@customElement('obi-threeway-analog-inleft-right-0')
export class ObiThreewayAnalogInleftRight0 extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M16.8052 21.4001C17.2993 22.0593 16.8292 22.9995 16.0054 22.9997H8.00538C7.18134 22.9997 6.71115 22.0594 7.20558 21.4001L11.2054 16.0665C11.6054 15.5332 12.4054 15.5332 12.8054 16.0665L16.8052 21.4001Z" fill="currentColor" stroke="currentColor"/>
<path d="M20.4268 6.10139C21.0895 5.63754 22 6.11173 22 6.92072V17.0789C22 17.8879 21.0895 18.3621 20.4268 17.8983L14.4008 13.6806C14.2327 13.5629 14.0325 13.4998 13.8274 13.4998H10.1726C9.96746 13.4998 9.76727 13.5629 9.5992 13.6806L3.57324 17.8983C2.91047 18.3621 2 17.8879 2 17.0789V6.92072C2 6.11174 2.91047 5.63754 3.57324 6.10139L9.5992 10.3191C9.76727 10.4367 9.96746 10.4998 10.1726 10.4998H13.8274C14.0325 10.4998 14.2327 10.4367 14.4008 10.3191L20.4268 6.10139Z" fill="currentColor" stroke="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M16.8052 21.4001C17.2993 22.0593 16.8292 22.9995 16.0054 22.9997H8.00538C7.18134 22.9997 6.71115 22.0594 7.20558 21.4001L11.2054 16.0665C11.6054 15.5332 12.4054 15.5332 12.8054 16.0665L16.8052 21.4001Z" style="fill: var(--automation-symbol-off-background-color); stroke: var(--automation-symbol-off-border-color)"/>
<path d="M20.4268 6.10139C21.0895 5.63754 22 6.11173 22 6.92072V17.0789C22 17.8879 21.0895 18.3621 20.4268 17.8983L14.4008 13.6806C14.2327 13.5629 14.0325 13.4998 13.8274 13.4998H10.1726C9.96746 13.4998 9.76727 13.5629 9.5992 13.6806L3.57324 17.8983C2.91047 18.3621 2 17.8879 2 17.0789V6.92072C2 6.11174 2.91047 5.63754 3.57324 6.10139L9.5992 10.3191C9.76727 10.4367 9.96746 10.4998 10.1726 10.4998H13.8274C14.0325 10.4998 14.2327 10.4367 14.4008 10.3191L20.4268 6.10139Z" style="fill: var(--automation-symbol-on-background-color); stroke: var(--automation-symbol-on-border-color)"/>
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
    'obi-threeway-analog-inleft-right-0': ObiThreewayAnalogInleftRight0;
  }
}
