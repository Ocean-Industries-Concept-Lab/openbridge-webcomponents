import {LitElement, html, css, svg} from 'lit';
import {property} from 'lit/decorators.js';
import {customElement} from '../decorator.js';

@customElement('obi-converter-vacac-static')
export class ObiConverterVacacStatic extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect x="1" y="1" width="22" height="22" fill="currentColor"/>
<path d="M10.582 17.7812C11.963 15.5718 15.1005 15.3578 16.7686 17.3594C17.565 18.3151 19.0624 18.2131 19.7217 17.1582L20.1523 16.4697L21.8477 17.5303L21.418 18.2188C20.037 20.4281 16.8994 20.6412 15.2314 18.6396C14.435 17.6844 12.9376 17.787 12.2783 18.8418L11.8477 19.5303L10.1523 18.4697L10.582 17.7812Z" fill="currentColor"/>
<path d="M11.4062 5.32031L10.6992 4.61328L4.47461 10.8379C4.27937 11.0331 3.96285 11.0331 3.76758 10.8379C3.57263 10.6426 3.57242 10.326 3.76758 10.1309L6.62891 7.26855C5.80595 6.76421 4.67528 6.98049 4.12598 7.85938L3.69629 8.54785L2 7.4873L2.43066 6.79883C3.67085 4.81492 6.32672 4.44029 8.06348 5.83398L9.99219 3.90625L9.28516 3.19922L12.4775 2.14941L11.4062 5.32031Z" fill="currentColor"/>
<path d="M13.6963 6.54785L13.2656 7.23633C12.1469 9.02596 9.8759 9.5058 8.16699 8.55957L9.7168 7.00977C10.4108 7.12489 11.1552 6.83827 11.5693 6.17578L12 5.4873L13.6963 6.54785Z" fill="currentColor"/>
<path d="M23 0C23.5523 0 24 0.447715 24 1V23C24 23.5523 23.5523 24 23 24H1C0.447716 24 0 23.5523 0 23V1C2.57704e-07 0.447716 0.447715 0 1 0H23ZM1.70703 23H23V1.70703L1.70703 23ZM1 22.293L22.293 1H1V22.293Z" fill-rule="evenodd" clip-rule="evenodd" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect x="1" y="1" width="22" height="22" style="fill: var(--automation-symbol-static-border-color)"/>
<path d="M10.582 17.7812C11.963 15.5718 15.1005 15.3578 16.7686 17.3594C17.565 18.3151 19.0624 18.2131 19.7217 17.1582L20.1523 16.4697L21.8477 17.5303L21.418 18.2188C20.037 20.4281 16.8994 20.6412 15.2314 18.6396C14.435 17.6844 12.9376 17.787 12.2783 18.8418L11.8477 19.5303L10.1523 18.4697L10.582 17.7812Z" style="fill: var(--automation-symbol-static-background-color)"/>
<path d="M11.4062 5.32031L10.6992 4.61328L4.47461 10.8379C4.27937 11.0331 3.96285 11.0331 3.76758 10.8379C3.57263 10.6426 3.57242 10.326 3.76758 10.1309L6.62891 7.26855C5.80595 6.76421 4.67528 6.98049 4.12598 7.85938L3.69629 8.54785L2 7.4873L2.43066 6.79883C3.67085 4.81492 6.32672 4.44029 8.06348 5.83398L9.99219 3.90625L9.28516 3.19922L12.4775 2.14941L11.4062 5.32031Z" style="fill: var(--automation-symbol-static-background-color)"/>
<path d="M13.6963 6.54785L13.2656 7.23633C12.1469 9.02596 9.8759 9.5058 8.16699 8.55957L9.7168 7.00977C10.4108 7.12489 11.1552 6.83827 11.5693 6.17578L12 5.4873L13.6963 6.54785Z" style="fill: var(--automation-symbol-static-background-color)"/>
<path d="M23 0C23.5523 0 24 0.447715 24 1V23C24 23.5523 23.5523 24 23 24H1C0.447716 24 0 23.5523 0 23V1C2.57704e-07 0.447716 0.447715 0 1 0H23ZM1.70703 23H23V1.70703L1.70703 23ZM1 22.293L22.293 1H1V22.293Z" fill-rule="evenodd" clip-rule="evenodd" style="fill: var(--automation-symbol-static-background-color)"/>
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
    'obi-converter-vacac-static': ObiConverterVacacStatic;
  }
}
