import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-search')
export class ObiSearch extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M10.5 2.99997C14.6421 2.99997 18 6.35783 18 10.5C18 12.2108 17.4271 13.7879 16.4628 15.0498L20.0875 18.6746C20.4781 19.0651 20.4781 19.6983 20.0875 20.0888C19.697 20.4793 19.0639 20.4793 18.6733 20.0888L15.0484 16.4639C13.7867 17.4276 12.2102 18 10.5 18C6.35786 18 3 14.6421 3 10.5C3 6.35783 6.35786 2.99997 10.5 2.99997ZM10.5 16C13.5376 16 16 13.5375 16 10.5C16 7.4624 13.5376 4.99997 10.5 4.99997C7.46243 4.99997 5 7.4624 5 10.5C5 13.5375 7.46243 16 10.5 16Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M10.5 2.99997C14.6421 2.99997 18 6.35783 18 10.5C18 12.2108 17.4271 13.7879 16.4628 15.0498L20.0875 18.6746C20.4781 19.0651 20.4781 19.6983 20.0875 20.0888C19.697 20.4793 19.0639 20.4793 18.6733 20.0888L15.0484 16.4639C13.7867 17.4276 12.2102 18 10.5 18C6.35786 18 3 14.6421 3 10.5C3 6.35783 6.35786 2.99997 10.5 2.99997ZM10.5 16C13.5376 16 16 13.5375 16 10.5C16 7.4624 13.5376 4.99997 10.5 4.99997C7.46243 4.99997 5 7.4624 5 10.5C5 13.5375 7.46243 16 10.5 16Z" style="fill: var(--element-active-color)"/>
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
    'obi-search': ObiSearch;
  }
}
