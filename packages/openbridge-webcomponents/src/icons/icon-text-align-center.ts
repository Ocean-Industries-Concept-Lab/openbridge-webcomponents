import {LitElement, html, css, svg} from 'lit';
import {property} from 'lit/decorators.js';
import {customElement} from '../decorator.js';

@customElement('obi-text-align-center')
export class ObiTextAlignCenter extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M7.5 19C7.22386 19 7 18.7761 7 18.5V17.5C7 17.2239 7.22386 17 7.5 17H16.5C16.7761 17 17 17.2239 17 17.5V18.5C17 18.7761 16.7761 19 16.5 19H7.5ZM3.5 15C3.22386 15 3 14.7761 3 14.5V13.5C3 13.2239 3.22386 13 3.5 13H20.5C20.7761 13 21 13.2239 21 13.5V14.5C21 14.7761 20.7761 15 20.5 15H3.5ZM7.5 11C7.22386 11 7 10.7761 7 10.5V9.5C7 9.22386 7.22386 9 7.5 9H16.5C16.7761 9 17 9.22386 17 9.5V10.5C17 10.7761 16.7761 11 16.5 11H7.5ZM3.5 7C3.22386 7 3 6.77614 3 6.5V5.5C3 5.22386 3.22386 5 3.5 5H20.5C20.7761 5 21 5.22386 21 5.5V6.5C21 6.77614 20.7761 7 20.5 7H3.5Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M7.5 19C7.22386 19 7 18.7761 7 18.5V17.5C7 17.2239 7.22386 17 7.5 17H16.5C16.7761 17 17 17.2239 17 17.5V18.5C17 18.7761 16.7761 19 16.5 19H7.5ZM3.5 15C3.22386 15 3 14.7761 3 14.5V13.5C3 13.2239 3.22386 13 3.5 13H20.5C20.7761 13 21 13.2239 21 13.5V14.5C21 14.7761 20.7761 15 20.5 15H3.5ZM7.5 11C7.22386 11 7 10.7761 7 10.5V9.5C7 9.22386 7.22386 9 7.5 9H16.5C16.7761 9 17 9.22386 17 9.5V10.5C17 10.7761 16.7761 11 16.5 11H7.5ZM3.5 7C3.22386 7 3 6.77614 3 6.5V5.5C3 5.22386 3.22386 5 3.5 5H20.5C20.7761 5 21 5.22386 21 5.5V6.5C21 6.77614 20.7761 7 20.5 7H3.5Z" style="fill: var(--element-active-color)"/>
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
    'obi-text-align-center': ObiTextAlignCenter;
  }
}
