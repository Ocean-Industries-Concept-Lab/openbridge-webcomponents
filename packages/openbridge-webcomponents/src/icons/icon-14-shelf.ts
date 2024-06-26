import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-14-shelf')
export class Obi14Shelf extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M16.4 4H17.3V7.15L20 8.752L19.55 9.49L16.4 7.6V4Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M11 7C11 3.688 13.682 1 16.994 1C20.312 1 23 3.688 23 7C23 10.312 20.312 13 16.994 13C13.682 13 11 10.312 11 7ZM12.2 7C12.2 9.652 14.348 11.8 17 11.8C19.652 11.8 21.8 9.652 21.8 7C21.8 4.348 19.652 2.2 17 2.2C14.348 2.2 12.2 4.348 12.2 7Z" fill="currentColor"/>
<path d="M9.5 5C9.77125 5 10.022 5.08387 10.2266 5.22658C10.0787 5.79296 10 6.38729 10 7C10 10.2917 12.272 13.0527 15.3333 13.8004V17.6163L17 19.2442V20.0581H2V19.2442L3.66667 17.6163V12.7326C3.66667 10.0058 5.63333 7.72674 8.25 7.17326V6.22093C8.25 5.54535 8.80833 5 9.5 5Z" fill="currentColor"/>
<path d="M9.5 22.5C10.4167 22.5 11.1583 21.7756 11.1583 20.8802H7.84167C7.84167 21.7756 8.58333 22.5 9.5 22.5Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M16.4 4H17.3V7.15L20 8.752L19.55 9.49L16.4 7.6V4Z" style="fill: var(--element-active-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M11 7C11 3.688 13.682 1 16.994 1C20.312 1 23 3.688 23 7C23 10.312 20.312 13 16.994 13C13.682 13 11 10.312 11 7ZM12.2 7C12.2 9.652 14.348 11.8 17 11.8C19.652 11.8 21.8 9.652 21.8 7C21.8 4.348 19.652 2.2 17 2.2C14.348 2.2 12.2 4.348 12.2 7Z" style="fill: var(--element-active-color)"/>
<path d="M9.5 5C9.77125 5 10.022 5.08387 10.2266 5.22658C10.0787 5.79296 10 6.38729 10 7C10 10.2917 12.272 13.0527 15.3333 13.8004V17.6163L17 19.2442V20.0581H2V19.2442L3.66667 17.6163V12.7326C3.66667 10.0058 5.63333 7.72674 8.25 7.17326V6.22093C8.25 5.54535 8.80833 5 9.5 5Z" style="fill: var(--element-active-color)"/>
<path d="M9.5 22.5C10.4167 22.5 11.1583 21.7756 11.1583 20.8802H7.84167C7.84167 21.7756 8.58333 22.5 9.5 22.5Z" style="fill: var(--element-active-color)"/>
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
    'obi-14-shelf': Obi14Shelf;
  }
}
