import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-log-add-google')
export class ObiLogAddGoogle extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M3.5875 20.4125C3.97917 20.8042 4.45 21 5 21H11.675C11.525 20.7 11.3958 20.3833 11.2875 20.05C11.1792 19.7167 11.1 19.3667 11.05 19H5V11.075V11V5H19V11.075C19.35 11.125 19.6917 11.2042 20.025 11.3125C20.3583 11.4208 20.6833 11.55 21 11.7V5C21 4.45 20.8042 3.97917 20.4125 3.5875C20.0208 3.19583 19.55 3 19 3H5C4.45 3 3.97917 3.19583 3.5875 3.5875C3.19583 3.97917 3 4.45 3 5V19C3 19.55 3.19583 20.0208 3.5875 20.4125ZM11.075 17H7V15H11.675C11.5417 15.3167 11.4208 15.6417 11.3125 15.975C11.2042 16.3083 11.125 16.65 11.075 17ZM13.1 13H7V11H17V11.075C16.25 11.1917 15.5458 11.4167 14.8875 11.75C14.2292 12.0833 13.6333 12.5 13.1 13ZM17 9H7V7H17V9ZM14.4625 21.5375C15.4375 22.5125 16.6167 23 18 23C19.3833 23 20.5625 22.5125 21.5375 21.5375C22.5125 20.5625 23 19.3833 23 18C23 16.6167 22.5125 15.4375 21.5375 14.4625C20.5625 13.4875 19.3833 13 18 13C16.6167 13 15.4375 13.4875 14.4625 14.4625C13.4875 15.4375 13 16.6167 13 18C13 19.3833 13.4875 20.5625 14.4625 21.5375ZM18.5 21H17.5V18.5H15V17.5H17.5V15H18.5V17.5H21V18.5H18.5V21Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M3.5875 20.4125C3.97917 20.8042 4.45 21 5 21H11.675C11.525 20.7 11.3958 20.3833 11.2875 20.05C11.1792 19.7167 11.1 19.3667 11.05 19H5V11.075V11V5H19V11.075C19.35 11.125 19.6917 11.2042 20.025 11.3125C20.3583 11.4208 20.6833 11.55 21 11.7V5C21 4.45 20.8042 3.97917 20.4125 3.5875C20.0208 3.19583 19.55 3 19 3H5C4.45 3 3.97917 3.19583 3.5875 3.5875C3.19583 3.97917 3 4.45 3 5V19C3 19.55 3.19583 20.0208 3.5875 20.4125ZM11.075 17H7V15H11.675C11.5417 15.3167 11.4208 15.6417 11.3125 15.975C11.2042 16.3083 11.125 16.65 11.075 17ZM13.1 13H7V11H17V11.075C16.25 11.1917 15.5458 11.4167 14.8875 11.75C14.2292 12.0833 13.6333 12.5 13.1 13ZM17 9H7V7H17V9ZM14.4625 21.5375C15.4375 22.5125 16.6167 23 18 23C19.3833 23 20.5625 22.5125 21.5375 21.5375C22.5125 20.5625 23 19.3833 23 18C23 16.6167 22.5125 15.4375 21.5375 14.4625C20.5625 13.4875 19.3833 13 18 13C16.6167 13 15.4375 13.4875 14.4625 14.4625C13.4875 15.4375 13 16.6167 13 18C13 19.3833 13.4875 20.5625 14.4625 21.5375ZM18.5 21H17.5V18.5H15V17.5H17.5V15H18.5V17.5H21V18.5H18.5V21Z" style="fill: var(--element-active-color)"/>
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
    'obi-log-add-google': ObiLogAddGoogle;
  }
}
