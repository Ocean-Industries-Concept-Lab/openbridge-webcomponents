import {LitElement, html, css, svg} from 'lit';
import {property} from 'lit/decorators.js';
import {customElement} from '../decorator.js';

@customElement('obi-alarm-acknowledged-iec')
export class ObiAlarmAcknowledgedIec extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
<use xlink:href="#stroke0_2002_1081" fill="currentColor"/>
<mask id="stroke1_2002_1081" fill="white">
<use xlink:href="#stroke0_2002_1081"/>
</mask>
<path d="M11.1158 1.53427L1.11648 20.5338C0.765943 21.1999 1.24879 22 2.00128 22L21.9987 22C22.7512 22 23.234 21.1999 22.8835 20.5339L12.8854 1.53432C12.5105 0.821914 11.4907 0.821889 11.1158 1.53427Z" stroke-width="2" stroke="currentColor" mask="url(#stroke1_2002_1081)"/>
<path d="M11 15V7H13V15H11Z" fill="currentColor"/>
<path d="M13 17H11V19H13V17Z" fill="currentColor"/>
<defs>
<path id="stroke0_2002_1081" d="M1.11648 20.5338L11.1158 1.53427C11.4907 0.821889 12.5105 0.821913 12.8854 1.53432L22.8835 20.5339C23.234 21.1999 22.7512 22 21.9987 22L2.00128 22C1.24879 22 0.765943 21.1999 1.11648 20.5338Z"/>
</defs>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
<use xlink:href="#stroke0_2002_1081" style="fill: var(--alert-alarm-color)"/>
<mask id="stroke1_2002_1081" fill="white">
<use xlink:href="#stroke0_2002_1081"/>
</mask>
<path d="M11.1158 1.53427L1.11648 20.5338C0.765943 21.1999 1.24879 22 2.00128 22L21.9987 22C22.7512 22 23.234 21.1999 22.8835 20.5339L12.8854 1.53432C12.5105 0.821914 11.4907 0.821889 11.1158 1.53427Z" stroke-width="2" style="stroke: var(--alert-alarm-outline-color)" mask="url(#stroke1_2002_1081)"/>
<path d="M11 15V7H13V15H11Z" style="fill: var(--on-alarm-color)"/>
<path d="M13 17H11V19H13V17Z" style="fill: var(--on-alarm-color)"/>
<defs>
<path id="stroke0_2002_1081" d="M1.11648 20.5338L11.1158 1.53427C11.4907 0.821889 12.5105 0.821913 12.8854 1.53432L22.8835 20.5339C23.234 21.1999 22.7512 22 21.9987 22L2.00128 22C1.24879 22 0.765943 21.1999 1.11648 20.5338Z"/>
</defs>
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
    'obi-alarm-acknowledged-iec': ObiAlarmAcknowledgedIec;
  }
}
