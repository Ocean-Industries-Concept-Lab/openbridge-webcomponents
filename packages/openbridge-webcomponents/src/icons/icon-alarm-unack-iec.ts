import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-alarm-unack-iec')
export class ObiAlarmUnackIec extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M1.11648 20.5339L11.1158 1.53427C11.4907 0.821889 12.5105 0.821913 12.8854 1.53432L22.8835 20.5339C23.234 21.1999 22.7512 22 21.9987 22L2.00128 22C1.24879 22 0.765943 21.1999 1.11648 20.5339Z" fill="currentColor"/>
<path d="M12.5 10.557C14.1514 10.9983 15.3571 12.3734 15.3571 14C15.3571 14.5886 15.1993 15.1443 14.9195 15.6347L15.7239 16.4391C16.2158 15.7315 16.5 14.8956 16.5 14C16.5 11.8039 14.7914 9.96693 12.5 9.5V10.557Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M13.9286 14C13.9286 14.1955 13.9016 14.3851 13.8507 14.566L12.5 13.2153V11.9322C13.3457 12.3119 13.9286 13.0918 13.9286 14Z" fill="currentColor"/>
<path d="M11 11.7153V9.5L9.99307 10.7083L11 11.7153Z" fill="currentColor"/>
<path d="M12.5 17.443V18.5C13.1419 18.3692 13.7381 18.1309 14.2637 17.8073L15.7846 19.3281L16.4917 18.6211L15.0668 17.1962L14.3015 16.4309L13.3391 15.4685L12.5 14.6294L11 13.1294L9.35028 11.4797L8.00639 10.1358L7.29932 10.8428L8.70749 12.251L8.5 12.5H6.5V15.5H8.5L11 18.5V14.5435L12.5 16.0435L12.5133 16.0568L13.4935 17.037C13.1878 17.2108 12.8541 17.3484 12.5 17.443Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M1.11648 20.5339L11.1158 1.53427C11.4907 0.821889 12.5105 0.821913 12.8854 1.53432L22.8835 20.5339C23.234 21.1999 22.7512 22 21.9987 22L2.00128 22C1.24879 22 0.765943 21.1999 1.11648 20.5339Z" style="fill: var(--alert-alarm-color)"/>
<path d="M12.5 10.557C14.1514 10.9983 15.3571 12.3734 15.3571 14C15.3571 14.5886 15.1993 15.1443 14.9195 15.6347L15.7239 16.4391C16.2158 15.7315 16.5 14.8956 16.5 14C16.5 11.8039 14.7914 9.96693 12.5 9.5V10.557Z" style="fill: var(--on-alarm-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M13.9286 14C13.9286 14.1955 13.9016 14.3851 13.8507 14.566L12.5 13.2153V11.9322C13.3457 12.3119 13.9286 13.0918 13.9286 14Z" style="fill: var(--on-alarm-color)"/>
<path d="M11 11.7153V9.5L9.99307 10.7083L11 11.7153Z" style="fill: var(--on-alarm-color)"/>
<path d="M12.5 17.443V18.5C13.1419 18.3692 13.7381 18.1309 14.2637 17.8073L15.7846 19.3281L16.4917 18.6211L15.0668 17.1962L14.3015 16.4309L13.3391 15.4685L12.5 14.6294L11 13.1294L9.35028 11.4797L8.00639 10.1358L7.29932 10.8428L8.70749 12.251L8.5 12.5H6.5V15.5H8.5L11 18.5V14.5435L12.5 16.0435L12.5133 16.0568L13.4935 17.037C13.1878 17.2108 12.8541 17.3484 12.5 17.443Z" style="fill: var(--on-alarm-color)"/>
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
    'obi-alarm-unack-iec': ObiAlarmUnackIec;
  }
}
