import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-alertheader-group-large-iec')
export class ObiAlertheaderGroupLargeIec extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M7 3H9V7H13V9H9V13H7V9H3V7H7V3Z" fill="currentColor"/>
<path d="M15 11H17V15H21V17H17V21H15V17H11V15H15V11Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M7 3H9V7H13V9H9V13H7V9H3V7H7V3Z" style="fill: var(--element-active-color)"/>
<path d="M15 11H17V15H21V17H17V21H15V17H11V15H15V11Z" style="fill: var(--element-active-color)"/>
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
    'obi-alertheader-group-large-iec': ObiAlertheaderGroupLargeIec;
  }
}