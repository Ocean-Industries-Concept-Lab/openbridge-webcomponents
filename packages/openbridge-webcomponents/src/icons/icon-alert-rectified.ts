import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-alert-rectified')
export class ObiAlertRectified extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M1.55895 20.7667L11.5583 1.76714C11.7457 1.41094 12.2555 1.41096 12.4429 1.76716L22.4411 20.7667C22.6165 21.1 22.3747 21.5 21.9987 21.5L2.00128 21.5C1.62529 21.5 1.38352 21.1 1.55895 20.7667Z" fill="currentColor" stroke="#CDCDCD"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M1.55895 20.7667L11.5583 1.76714C11.7457 1.41094 12.2555 1.41096 12.4429 1.76716L22.4411 20.7667C22.6165 21.1 22.3747 21.5 21.9987 21.5L2.00128 21.5C1.62529 21.5 1.38352 21.1 1.55895 20.7667Z" style="fill: var(--indent-enabled-background-color)" style="stroke: var(--indent-enabled-border-color)"/>
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
    'obi-alert-rectified': ObiAlertRectified;
  }
}