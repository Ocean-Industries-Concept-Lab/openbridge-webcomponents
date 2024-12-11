import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-search')
export class ObiSearch extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M10.5001 2.99997C14.6423 2.99997 18.0001 6.35783 18.0001 10.5C18.0001 12.2108 17.4273 13.7879 16.4629 15.0498L20.0877 18.6746C20.4782 19.0651 20.4782 19.6983 20.0877 20.0888C19.6971 20.4793 19.064 20.4793 18.6735 20.0888L15.0485 16.4639C13.7868 17.4276 12.2103 18 10.5001 18C6.35799 18 3.00012 14.6421 3.00012 10.5C3.00012 6.35783 6.35799 2.99997 10.5001 2.99997ZM10.5001 16C13.5377 16 16.0001 13.5375 16.0001 10.5C16.0001 7.4624 13.5377 4.99997 10.5001 4.99997C7.46256 4.99997 5.00012 7.4624 5.00012 10.5C5.00012 13.5375 7.46256 16 10.5001 16Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M10.5001 2.99997C14.6423 2.99997 18.0001 6.35783 18.0001 10.5C18.0001 12.2108 17.4273 13.7879 16.4629 15.0498L20.0877 18.6746C20.4782 19.0651 20.4782 19.6983 20.0877 20.0888C19.6971 20.4793 19.064 20.4793 18.6735 20.0888L15.0485 16.4639C13.7868 17.4276 12.2103 18 10.5001 18C6.35799 18 3.00012 14.6421 3.00012 10.5C3.00012 6.35783 6.35799 2.99997 10.5001 2.99997ZM10.5001 16C13.5377 16 16.0001 13.5375 16.0001 10.5C16.0001 7.4624 13.5377 4.99997 10.5001 4.99997C7.46256 4.99997 5.00012 7.4624 5.00012 10.5C5.00012 13.5375 7.46256 16 10.5001 16Z" style="fill: var(--element-active-color)"/>
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
    'obi-search': ObiSearch;
  }
}