import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-com-pa-list')
export class ObiComPaList extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M2 4.99833V3H19.8218V4.99833H2Z" fill="currentColor"/>
<path d="M2.0198 8.99833V7H15V9L2.0198 8.99833Z" fill="currentColor"/>
<path d="M2 11V12.9983L9 13V11H2Z" fill="currentColor"/>
<path d="M15.5 11H12.1C11.6627 11 11.3361 11.1004 11.109 11.546C11 11.7599 11 12.0399 11 12.6V14.4C11 14.9601 11 15.2401 11.109 15.454C11.2049 15.6422 11.3578 15.7951 11.546 15.891C11.7599 16 11.9399 16 12.5 16V19H14.5V16H15.5L18.776 17.735C19.1755 17.9847 19.3752 18.1095 19.5401 18.0963C19.6837 18.0847 19.8155 18.0117 19.9014 17.896C20 17.7632 20 17.5277 20 17.0566V15.437C20.8626 15.215 21.5 14.4319 21.5 13.5C21.5 12.5681 20.8626 11.785 20 11.563V9.9434C20 9.4723 20 9.23676 19.9014 9.104C19.8155 8.98828 19.6837 8.91528 19.5401 8.90373C19.3752 8.89048 19.1755 9.01532 18.776 9.265L15.5 11Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M2 4.99833V3H19.8218V4.99833H2Z" style="fill: var(--element-active-color)"/>
<path d="M2.0198 8.99833V7H15V9L2.0198 8.99833Z" style="fill: var(--element-active-color)"/>
<path d="M2 11V12.9983L9 13V11H2Z" style="fill: var(--element-active-color)"/>
<path d="M15.5 11H12.1C11.6627 11 11.3361 11.1004 11.109 11.546C11 11.7599 11 12.0399 11 12.6V14.4C11 14.9601 11 15.2401 11.109 15.454C11.2049 15.6422 11.3578 15.7951 11.546 15.891C11.7599 16 11.9399 16 12.5 16V19H14.5V16H15.5L18.776 17.735C19.1755 17.9847 19.3752 18.1095 19.5401 18.0963C19.6837 18.0847 19.8155 18.0117 19.9014 17.896C20 17.7632 20 17.5277 20 17.0566V15.437C20.8626 15.215 21.5 14.4319 21.5 13.5C21.5 12.5681 20.8626 11.785 20 11.563V9.9434C20 9.4723 20 9.23676 19.9014 9.104C19.8155 8.98828 19.6837 8.91528 19.5401 8.90373C19.3752 8.89048 19.1755 9.01532 18.776 9.265L15.5 11Z" style="fill: var(--element-active-color)"/>
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
    'obi-com-pa-list': ObiComPaList;
  }
}