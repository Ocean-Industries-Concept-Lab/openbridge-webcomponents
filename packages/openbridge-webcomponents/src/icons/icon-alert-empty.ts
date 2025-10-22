import {LitElement, html, css, svg} from 'lit';
import {property} from 'lit/decorators.js';
import {customElement} from '../decorator.js';

@customElement('obi-alert-empty')
export class ObiAlertEmpty extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M1.11648 20.5339L11.1158 1.53427C11.4907 0.821889 12.5105 0.821913 12.8854 1.53432L22.8835 20.5339C23.234 21.1999 22.7512 22 21.9987 22L2.00128 22C1.24879 22 0.765943 21.1999 1.11648 20.5339Z" fill="currentColor" />
<path d="M11.5586 1.76758C11.7461 1.41138 12.2559 1.41137 12.4434 1.76758L22.4414 20.7666C22.6167 21.0998 22.3748 21.4998 21.999 21.5H2.00098C1.62518 21.4998 1.38327 21.0998 1.55859 20.7666L11.5586 1.76758Z" stroke="black" stroke-opacity="0.1"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M1.11648 20.5339L11.1158 1.53427C11.4907 0.821889 12.5105 0.821913 12.8854 1.53432L22.8835 20.5339C23.234 21.1999 22.7512 22 21.9987 22L2.00128 22C1.24879 22 0.765943 21.1999 1.11648 20.5339Z" style="fill: var(--indent-enabled-border-color)" />
<path d="M11.5586 1.76758C11.7461 1.41138 12.2559 1.41137 12.4434 1.76758L22.4414 20.7666C22.6167 21.0998 22.3748 21.4998 21.999 21.5H2.00098C1.62518 21.4998 1.38327 21.0998 1.55859 20.7666L11.5586 1.76758Z" style="stroke: var(--indent-enabled-border-color)" />
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
