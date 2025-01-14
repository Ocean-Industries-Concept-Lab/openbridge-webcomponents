import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-voyages')
export class ObiVoyages extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M3 22V16H8.99982C11.7998 16 14.1667 18 15 19C14.1667 20 11.8 22 9 22H3ZM11.9649 19C11.8828 18.9466 11.7983 18.8937 11.7115 18.8418C10.8651 18.3361 9.92843 18 8.99982 18H5V20H9C9.92859 20 10.8653 19.6639 11.7115 19.1582C11.7983 19.1063 11.8828 19.0535 11.9649 19Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M2 8.5C2 6.01472 4.01472 4 6.5 4H12V6H6.5C5.11929 6 4 7.11929 4 8.5C4 9.88071 5.11929 11 6.5 11H17.5C19.9853 11 22 13.0147 22 15.5C22 17.9853 19.9853 20 17.5 20H17V18H17.5C18.8807 18 20 16.8807 20 15.5C20 14.1193 18.8807 13 17.5 13H6.5C4.01472 13 2 10.9853 2 8.5Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M17.5 6.5C18.3284 6.5 19 5.82843 19 5C19 4.17157 18.3284 3.5 17.5 3.5C16.6716 3.5 16 4.17157 16 5C16 5.82843 16.6716 6.5 17.5 6.5ZM17.5 8.5C19.433 8.5 21 6.933 21 5C21 3.067 19.433 1.5 17.5 1.5C15.567 1.5 14 3.067 14 5C14 6.933 15.567 8.5 17.5 8.5Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M3 22V16H8.99982C11.7998 16 14.1667 18 15 19C14.1667 20 11.8 22 9 22H3ZM11.9649 19C11.8828 18.9466 11.7983 18.8937 11.7115 18.8418C10.8651 18.3361 9.92843 18 8.99982 18H5V20H9C9.92859 20 10.8653 19.6639 11.7115 19.1582C11.7983 19.1063 11.8828 19.0535 11.9649 19Z" style="fill: var(--element-active-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M2 8.5C2 6.01472 4.01472 4 6.5 4H12V6H6.5C5.11929 6 4 7.11929 4 8.5C4 9.88071 5.11929 11 6.5 11H17.5C19.9853 11 22 13.0147 22 15.5C22 17.9853 19.9853 20 17.5 20H17V18H17.5C18.8807 18 20 16.8807 20 15.5C20 14.1193 18.8807 13 17.5 13H6.5C4.01472 13 2 10.9853 2 8.5Z" style="fill: var(--element-active-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M17.5 6.5C18.3284 6.5 19 5.82843 19 5C19 4.17157 18.3284 3.5 17.5 3.5C16.6716 3.5 16 4.17157 16 5C16 5.82843 16.6716 6.5 17.5 6.5ZM17.5 8.5C19.433 8.5 21 6.933 21 5C21 3.067 19.433 1.5 17.5 1.5C15.567 1.5 14 3.067 14 5C14 6.933 15.567 8.5 17.5 8.5Z" style="fill: var(--element-active-color)"/>
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
    'obi-voyages': ObiVoyages;
  }
}