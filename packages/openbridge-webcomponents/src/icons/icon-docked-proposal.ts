import {LitElement, html, css, svg} from 'lit';
import {property} from 'lit/decorators.js';
import {customElement} from '../decorator.js';

@customElement('obi-docked-proposal')
export class ObiDockedProposal extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M18 2V22H16V4H12V2H18Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M10 6C10.4513 6.37229 10.936 6.82069 11.3828 7.33301C12.3406 8.43127 13 9.67586 13 11.0049V20H7V11.0049C7 9.67586 7.6594 8.43127 8.61719 7.33301C9.06397 6.82069 9.54869 6.37229 10 6ZM9.74805 8.31934C8.91254 9.2774 8.5 10.1826 8.5 11.0049V18.5H11.5V11.0049C11.5 10.1826 11.0875 9.2774 10.252 8.31934C10.1696 8.22493 10.0856 8.13207 10 8.04199C9.91444 8.13207 9.83038 8.22493 9.74805 8.31934Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M18 2V22H16V4H12V2H18Z" style="fill: var(--element-active-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M10 6C10.4513 6.37229 10.936 6.82069 11.3828 7.33301C12.3406 8.43127 13 9.67586 13 11.0049V20H7V11.0049C7 9.67586 7.6594 8.43127 8.61719 7.33301C9.06397 6.82069 9.54869 6.37229 10 6ZM9.74805 8.31934C8.91254 9.2774 8.5 10.1826 8.5 11.0049V18.5H11.5V11.0049C11.5 10.1826 11.0875 9.2774 10.252 8.31934C10.1696 8.22493 10.0856 8.13207 10 8.04199C9.91444 8.13207 9.83038 8.22493 9.74805 8.31934Z" style="fill: var(--element-active-color)"/>
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
    'obi-docked-proposal': ObiDockedProposal;
  }
}
