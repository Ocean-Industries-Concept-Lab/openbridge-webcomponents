import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-record-event')
export class ObiRecordEvent extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M12 21V18.875L17.3 13.575L19.425 15.7L14.125 21H12ZM3 16V14H10V16H3ZM20.125 15L18 12.875L18.725 12.15C18.9083 11.9667 19.1417 11.875 19.425 11.875C19.7083 11.875 19.9417 11.9667 20.125 12.15L20.85 12.875C21.0333 13.0583 21.125 13.2917 21.125 13.575C21.125 13.8583 21.0333 14.0917 20.85 14.275L20.125 15ZM3 12V10H14V12H3ZM3 8V6H14V8H3Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M12 21V18.875L17.3 13.575L19.425 15.7L14.125 21H12ZM3 16V14H10V16H3ZM20.125 15L18 12.875L18.725 12.15C18.9083 11.9667 19.1417 11.875 19.425 11.875C19.7083 11.875 19.9417 11.9667 20.125 12.15L20.85 12.875C21.0333 13.0583 21.125 13.2917 21.125 13.575C21.125 13.8583 21.0333 14.0917 20.85 14.275L20.125 15ZM3 12V10H14V12H3ZM3 8V6H14V8H3Z" style="fill: var(--element-active-color)"/>
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
    'obi-record-event': ObiRecordEvent;
  }
}
