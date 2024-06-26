import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-04-daynight')
export class Obi04Daynight extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M13.1373 2H11.1123V6.04994H13.1373V2Z" fill="currentColor"/>
<path d="M18.5684 4.24957L20.0003 5.68144L17.1366 8.54519L15.7047 7.11331L18.5684 4.24957Z" fill="currentColor"/>
<path d="M2 13.1374V11.1124L6.04994 11.1124V13.1374H2Z" fill="currentColor"/>
<path d="M4.24973 5.68141L5.6816 4.24954L8.54534 7.11329L7.11347 8.54516L4.24973 5.68141Z" fill="currentColor"/>
<path d="M8.54528 17.1363L7.11341 15.7045L4.24967 18.5682L5.68154 20.0001L8.54528 17.1363Z" fill="currentColor"/>
<path d="M15.6085 9.71256C15.2214 9.32543 14.7618 9.01833 14.256 8.80882C13.7501 8.59931 13.208 8.49147 12.6605 8.49147C12.113 8.49147 11.5709 8.59931 11.0651 8.80882C10.5593 9.01833 10.0997 9.32543 9.71256 9.71256C9.32543 10.0997 9.01833 10.5593 8.80882 11.0651C8.59931 11.5709 8.49147 12.113 8.49147 12.6605C8.49147 13.208 8.59931 13.7501 8.80882 14.256C9.01833 14.7618 9.32543 15.2214 9.71256 15.6085L15.6085 9.71256Z" fill="currentColor"/>
<path d="M22 11.253C21.4154 11.088 20.8 11 20.1538 11C16.7569 11 14 13.464 14 16.5C14 19.536 16.7569 22 20.1538 22C20.8 22 21.4154 21.912 22 21.747C19.5015 21.0485 17.6923 18.964 17.6923 16.5C17.6923 14.036 19.5015 11.9515 22 11.253Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M13.1373 2H11.1123V6.04994H13.1373V2Z" style="fill: var(--element-active-color)"/>
<path d="M18.5684 4.24957L20.0003 5.68144L17.1366 8.54519L15.7047 7.11331L18.5684 4.24957Z" style="fill: var(--element-active-color)"/>
<path d="M2 13.1374V11.1124L6.04994 11.1124V13.1374H2Z" style="fill: var(--element-active-color)"/>
<path d="M4.24973 5.68141L5.6816 4.24954L8.54534 7.11329L7.11347 8.54516L4.24973 5.68141Z" style="fill: var(--element-active-color)"/>
<path d="M8.54528 17.1363L7.11341 15.7045L4.24967 18.5682L5.68154 20.0001L8.54528 17.1363Z" style="fill: var(--element-active-color)"/>
<path d="M15.6085 9.71256C15.2214 9.32543 14.7618 9.01833 14.256 8.80882C13.7501 8.59931 13.208 8.49147 12.6605 8.49147C12.113 8.49147 11.5709 8.59931 11.0651 8.80882C10.5593 9.01833 10.0997 9.32543 9.71256 9.71256C9.32543 10.0997 9.01833 10.5593 8.80882 11.0651C8.59931 11.5709 8.49147 12.113 8.49147 12.6605C8.49147 13.208 8.59931 13.7501 8.80882 14.256C9.01833 14.7618 9.32543 15.2214 9.71256 15.6085L15.6085 9.71256Z" style="fill: var(--element-active-color)"/>
<path d="M22 11.253C21.4154 11.088 20.8 11 20.1538 11C16.7569 11 14 13.464 14 16.5C14 19.536 16.7569 22 20.1538 22C20.8 22 21.4154 21.912 22 21.747C19.5015 21.0485 17.6923 18.964 17.6923 16.5C17.6923 14.036 19.5015 11.9515 22 11.253Z" style="fill: var(--element-active-color)"/>
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
    'obi-04-daynight': Obi04Daynight;
  }
}
