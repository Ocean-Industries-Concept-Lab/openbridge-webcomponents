import {LitElement, html, css, svg} from 'lit';
import {property} from 'lit/decorators.js';
import {customElement} from '../decorator.js';

@customElement('obi-text-align-left')
export class ObiTextAlignLeft extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M3.5 19C3.22386 19 3 18.7761 3 18.5V17.5C3 17.2239 3.22386 17 3.5 17H14.5C14.7761 17 15 17.2239 15 17.5V18.5C15 18.7761 14.7761 19 14.5 19H3.5ZM3.5 15C3.22386 15 3 14.7761 3 14.5V13.5C3 13.2239 3.22386 13 3.5 13H20.5C20.7761 13 21 13.2239 21 13.5V14.5C21 14.7761 20.7761 15 20.5 15H3.5ZM3.5 11C3.22386 11 3 10.7761 3 10.5V9.5C3 9.22386 3.22386 9 3.5 9H14.5C14.7761 9 15 9.22386 15 9.5V10.5C15 10.7761 14.7761 11 14.5 11H3.5ZM3.5 7C3.22386 7 3 6.77614 3 6.5V5.5C3 5.22386 3.22386 5 3.5 5H20.5C20.7761 5 21 5.22386 21 5.5V6.5C21 6.77614 20.7761 7 20.5 7H3.5Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M3.5 19C3.22386 19 3 18.7761 3 18.5V17.5C3 17.2239 3.22386 17 3.5 17H14.5C14.7761 17 15 17.2239 15 17.5V18.5C15 18.7761 14.7761 19 14.5 19H3.5ZM3.5 15C3.22386 15 3 14.7761 3 14.5V13.5C3 13.2239 3.22386 13 3.5 13H20.5C20.7761 13 21 13.2239 21 13.5V14.5C21 14.7761 20.7761 15 20.5 15H3.5ZM3.5 11C3.22386 11 3 10.7761 3 10.5V9.5C3 9.22386 3.22386 9 3.5 9H14.5C14.7761 9 15 9.22386 15 9.5V10.5C15 10.7761 14.7761 11 14.5 11H3.5ZM3.5 7C3.22386 7 3 6.77614 3 6.5V5.5C3 5.22386 3.22386 5 3.5 5H20.5C20.7761 5 21 5.22386 21 5.5V6.5C21 6.77614 20.7761 7 20.5 7H3.5Z" style="fill: var(--element-active-color)"/>
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
    'obi-text-align-left': ObiTextAlignLeft;
  }
}
