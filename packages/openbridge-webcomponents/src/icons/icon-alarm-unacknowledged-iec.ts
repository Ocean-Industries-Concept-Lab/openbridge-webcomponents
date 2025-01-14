import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-alarm-unacknowledged-iec')
export class ObiAlarmUnacknowledgedIec extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M1.11648 20.5339L11.1158 1.53427C11.4907 0.821889 12.5105 0.821913 12.8854 1.53432L22.8835 20.5339C23.234 21.1999 22.7512 22 21.9987 22L2.00128 22C1.24879 22 0.765943 21.1999 1.11648 20.5339Z" fill="currentColor"/>
<path d="M8.5 16.5H7C6.72386 16.5 6.5 16.2761 6.5 16V13C6.5 12.7239 6.72386 12.5 7 12.5H8.5L12 9V12.879V20L8.5 16.5Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M14.2678 16.2678C13.9186 16.617 13.4767 16.8522 13 16.9495V12.0505C13.4767 12.1478 13.9186 12.3831 14.2678 12.7323C14.7366 13.2011 15 13.837 15 14.5C15 15.1631 14.7366 15.799 14.2678 16.2678Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M13 9.09167V10.3693C13.7529 10.5516 14.4484 10.938 15.0052 11.4948C15.8022 12.2919 16.25 13.3729 16.25 14.5C16.25 15.6272 15.8022 16.7082 15.0052 17.5052C14.4484 18.0621 13.7529 18.4484 13 18.6307V19.9084C14.0869 19.7074 15.0965 19.1817 15.8891 18.3891C16.9205 17.3577 17.5 15.9587 17.5 14.5C17.5 13.0413 16.9205 11.6424 15.8891 10.6109C15.0965 9.81836 14.0869 9.29266 13 9.09167Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M1.11648 20.5339L11.1158 1.53427C11.4907 0.821889 12.5105 0.821913 12.8854 1.53432L22.8835 20.5339C23.234 21.1999 22.7512 22 21.9987 22L2.00128 22C1.24879 22 0.765943 21.1999 1.11648 20.5339Z" style="fill: var(--alert-alarm-color)"/>
<path d="M8.5 16.5H7C6.72386 16.5 6.5 16.2761 6.5 16V13C6.5 12.7239 6.72386 12.5 7 12.5H8.5L12 9V12.879V20L8.5 16.5Z" style="fill: var(--on-alarm-active-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M14.2678 16.2678C13.9186 16.617 13.4767 16.8522 13 16.9495V12.0505C13.4767 12.1478 13.9186 12.3831 14.2678 12.7323C14.7366 13.2011 15 13.837 15 14.5C15 15.1631 14.7366 15.799 14.2678 16.2678Z" style="fill: var(--on-alarm-active-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M13 9.09167V10.3693C13.7529 10.5516 14.4484 10.938 15.0052 11.4948C15.8022 12.2919 16.25 13.3729 16.25 14.5C16.25 15.6272 15.8022 16.7082 15.0052 17.5052C14.4484 18.0621 13.7529 18.4484 13 18.6307V19.9084C14.0869 19.7074 15.0965 19.1817 15.8891 18.3891C16.9205 17.3577 17.5 15.9587 17.5 14.5C17.5 13.0413 16.9205 11.6424 15.8891 10.6109C15.0965 9.81836 14.0869 9.29266 13 9.09167Z" style="fill: var(--on-alarm-active-color)"/>
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
    'obi-alarm-unacknowledged-iec': ObiAlarmUnacknowledgedIec;
  }
}