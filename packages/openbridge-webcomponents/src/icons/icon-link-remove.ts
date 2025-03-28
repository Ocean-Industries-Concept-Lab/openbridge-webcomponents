import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-link-remove')
export class ObiLinkRemove extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M17.599 16.9644L15.6346 15H15.6294L3.62904 3L2.21484 4.41424L5.15324 7.35254C3.30645 8.08766 2 9.89219 2 12C2 14.76 4.24 17 7 17H11V15H7C5.35 15 4 13.65 4 12C4 10.4148 5.24599 9.10656 6.80694 9.00619L8.80082 11H8V13H10.8009L13 15.1991V17H14.801L18.9431 21.142L20.3573 19.7278L17.5945 16.965L17.599 16.9644Z" fill="currentColor"/>
<path d="M18.2077 14.7447C19.2607 14.2777 20 13.221 20 12C20 10.35 18.65 9 17 9H13V7H17C19.76 7 22 9.24 22 12C22 13.7732 21.0755 15.3317 19.6825 16.2195L18.2077 14.7447Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M17.599 16.9644L15.6346 15H15.6294L3.62904 3L2.21484 4.41424L5.15324 7.35254C3.30645 8.08766 2 9.89219 2 12C2 14.76 4.24 17 7 17H11V15H7C5.35 15 4 13.65 4 12C4 10.4148 5.24599 9.10656 6.80694 9.00619L8.80082 11H8V13H10.8009L13 15.1991V17H14.801L18.9431 21.142L20.3573 19.7278L17.5945 16.965L17.599 16.9644Z" style="fill: var(--element-active-color)"/>
<path d="M18.2077 14.7447C19.2607 14.2777 20 13.221 20 12C20 10.35 18.65 9 17 9H13V7H17C19.76 7 22 9.24 22 12C22 13.7732 21.0755 15.3317 19.6825 16.2195L18.2077 14.7447Z" style="fill: var(--element-active-color)"/>
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
    'obi-link-remove': ObiLinkRemove;
  }
}
