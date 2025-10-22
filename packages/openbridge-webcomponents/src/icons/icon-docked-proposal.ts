import {LitElement, html, css, svg} from 'lit';
import {property} from 'lit/decorators.js';
import {customElement} from '../decorator.js';

@customElement('obi-docked-proposal')
export class ObiDockedProposal extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M20 2V22H18V4H14V2H20Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M12 6C12.4513 6.37229 12.936 6.82069 13.3828 7.33301C14.3406 8.43127 15 9.67586 15 11.0049V20H9V11.0049C9 9.67586 9.6594 8.43127 10.6172 7.33301C11.064 6.82069 11.5487 6.37229 12 6ZM11.748 8.31934C10.9125 9.2774 10.5 10.1826 10.5 11.0049V18.5H13.5V11.0049C13.5 10.1826 13.0875 9.2774 12.252 8.31934C12.1696 8.22493 12.0856 8.13207 12 8.04199C11.9144 8.13207 11.8304 8.22493 11.748 8.31934Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M20 2V22H18V4H14V2H20Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M12 6C12.4513 6.37229 12.936 6.82069 13.3828 7.33301C14.3406 8.43127 15 9.67586 15 11.0049V20H9V11.0049C9 9.67586 9.6594 8.43127 10.6172 7.33301C11.064 6.82069 11.5487 6.37229 12 6ZM11.748 8.31934C10.9125 9.2774 10.5 10.1826 10.5 11.0049V18.5H13.5V11.0049C13.5 10.1826 13.0875 9.2774 12.252 8.31934C12.1696 8.22493 12.0856 8.13207 12 8.04199C11.9144 8.13207 11.8304 8.22493 11.748 8.31934Z" fill="currentColor"/>
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
