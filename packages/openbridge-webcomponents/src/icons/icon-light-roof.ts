import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-light-roof')
export class ObiLightRoof extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M15 6.80269V5H18V2H6V5H9V6.80269C7.2066 7.84012 6 9.77915 6 12C6 15.3137 8.68629 18 12 18C15.3137 18 18 15.3137 18 12C18 9.77915 16.7934 7.84012 15 6.80269ZM11 7.95628L10.0015 8.53391C8.80063 9.22854 8 10.522 8 12C8 14.2091 9.79086 16 12 16C14.2091 16 16 14.2091 16 12C16 10.522 15.1994 9.22854 13.9985 8.53391L13 7.95628V5H11V7.95628Z" fill="currentColor"/>
<path d="M4 13H1V11H4V13Z" fill="currentColor"/>
<path d="M23 13H20V11H23V13Z" fill="currentColor"/>
<path d="M11 20V23H13V20H11Z" fill="currentColor"/>
<path d="M19.0711 20.4853L16.9497 18.364L18.364 16.9497L20.4853 19.0711L19.0711 20.4853Z" fill="currentColor"/>
<path d="M5.63716 16.9497L3.51584 19.0711L4.93005 20.4853L7.05137 18.364L5.63716 16.9497Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M15 6.80269V5H18V2H6V5H9V6.80269C7.2066 7.84012 6 9.77915 6 12C6 15.3137 8.68629 18 12 18C15.3137 18 18 15.3137 18 12C18 9.77915 16.7934 7.84012 15 6.80269ZM11 7.95628L10.0015 8.53391C8.80063 9.22854 8 10.522 8 12C8 14.2091 9.79086 16 12 16C14.2091 16 16 14.2091 16 12C16 10.522 15.1994 9.22854 13.9985 8.53391L13 7.95628V5H11V7.95628Z" style="fill: var(--element-active-color)"/>
<path d="M4 13H1V11H4V13Z" style="fill: var(--element-active-color)"/>
<path d="M23 13H20V11H23V13Z" style="fill: var(--element-active-color)"/>
<path d="M11 20V23H13V20H11Z" style="fill: var(--element-active-color)"/>
<path d="M19.0711 20.4853L16.9497 18.364L18.364 16.9497L20.4853 19.0711L19.0711 20.4853Z" style="fill: var(--element-active-color)"/>
<path d="M5.63716 16.9497L3.51584 19.0711L4.93005 20.4853L7.05137 18.364L5.63716 16.9497Z" style="fill: var(--element-active-color)"/>
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
    'obi-light-roof': ObiLightRoof;
  }
}
