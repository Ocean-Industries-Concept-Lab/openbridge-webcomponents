import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-alarm-transferred-iec')
export class ObiAlarmTransferredIec extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M1.11648 20.5339L11.1158 1.53427C11.4907 0.821889 12.5105 0.821913 12.8854 1.53432L22.8835 20.5339C23.234 21.1999 22.7512 22 21.9987 22L2.00128 22C1.24879 22 0.765943 21.1999 1.11648 20.5339Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M12.7071 9.79297L17.9142 15.0001L12.7071 20.2072L11.2929 18.793L14.0858 16.0001H6.5V14.0001H14.0858L11.2929 11.2072L12.7071 9.79297Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M1.11648 20.5339L11.1158 1.53427C11.4907 0.821889 12.5105 0.821913 12.8854 1.53432L22.8835 20.5339C23.234 21.1999 22.7512 22 21.9987 22L2.00128 22C1.24879 22 0.765943 21.1999 1.11648 20.5339Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M12.7071 9.79297L17.9142 15.0001L12.7071 20.2072L11.2929 18.793L14.0858 16.0001H6.5V14.0001H14.0858L11.2929 11.2072L12.7071 9.79297Z" style="fill: var(--on-alarm-active-color)"/>
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
    'obi-alarm-transferred-iec': ObiAlarmTransferredIec;
  }
}
