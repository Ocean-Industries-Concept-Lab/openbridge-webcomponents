import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-alarm-noack-iec')
export class ObiAlarmNoackIec extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M1.11648 20.5339L11.1158 1.53427C11.4907 0.821889 12.5105 0.821913 12.8854 1.53432L22.8835 20.5339C23.234 21.1999 22.7512 22 21.9987 22L2.00128 22C1.24879 22 0.765943 21.1999 1.11648 20.5339Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M10.6718 15.0001L6.52379 10.2595L7.5219 8.36304L12.0006 13.4815L16.479 8.36338L17.477 10.26L13.3294 15.0001L19.4543 22.0001L16.7968 22.0001L12.0006 16.5187L7.20441 22.0001L4.54688 22.0001L10.6718 15.0001Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M1.11648 20.5339L11.1158 1.53427C11.4907 0.821889 12.5105 0.821913 12.8854 1.53432L22.8835 20.5339C23.234 21.1999 22.7512 22 21.9987 22L2.00128 22C1.24879 22 0.765943 21.1999 1.11648 20.5339Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M10.6718 15.0001L6.52379 10.2595L7.5219 8.36304L12.0006 13.4815L16.479 8.36338L17.477 10.26L13.3294 15.0001L19.4543 22.0001L16.7968 22.0001L12.0006 16.5187L7.20441 22.0001L4.54688 22.0001L10.6718 15.0001Z" style="fill: var(--on-alarm-color)"/>
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
    'obi-alarm-noack-iec': ObiAlarmNoackIec;
  }
}