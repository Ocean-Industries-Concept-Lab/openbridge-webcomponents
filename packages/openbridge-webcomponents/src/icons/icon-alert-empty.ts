import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-alert-empty')
export class ObiAlertEmpty extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M1.11648 20.5339L11.1158 1.53427C11.4907 0.821889 12.5105 0.821913 12.8854 1.53432L22.8835 20.5339C23.234 21.1999 22.7512 22 21.9987 22L2.00128 22C1.24879 22 0.765943 21.1999 1.11648 20.5339Z" fill="currentColor" />
<path d="M1.55895 20.7667L11.5583 1.76714C11.7457 1.41094 12.2555 1.41096 12.4429 1.76716L22.4411 20.7667C22.6165 21.1 22.3747 21.5 21.9987 21.5L2.00128 21.5C1.62529 21.5 1.38352 21.1 1.55895 20.7667Z" stroke="black" stroke-opacity="0.06"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M1.11648 20.5339L11.1158 1.53427C11.4907 0.821889 12.5105 0.821913 12.8854 1.53432L22.8835 20.5339C23.234 21.1999 22.7512 22 21.9987 22L2.00128 22C1.24879 22 0.765943 21.1999 1.11648 20.5339Z" style="fill: var(--indent-enabled-border-color)" />
<path d="M1.55895 20.7667L11.5583 1.76714C11.7457 1.41094 12.2555 1.41096 12.4429 1.76716L22.4411 20.7667C22.6165 21.1 22.3747 21.5 21.9987 21.5L2.00128 21.5C1.62529 21.5 1.38352 21.1 1.55895 20.7667Z" style="stroke: var(--indent-enabled-border-color)" />
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
    'obi-alert-empty': ObiAlertEmpty;
  }
}
