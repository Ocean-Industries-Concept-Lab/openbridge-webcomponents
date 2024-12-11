import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-light-roof-colour-on')
export class ObiLightRoofColourOn extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M15 6.80269V5H18V2H6V5H9V6.80269C7.2066 7.84012 6 9.77915 6 12C6 15.3137 8.68629 18 12 18C15.3137 18 18 15.3137 18 12C18 9.77915 16.7934 7.84012 15 6.80269ZM11 7.95628L10.0015 8.53391C8.80063 9.22854 8 10.522 8 12C8 14.2091 9.79086 16 12 16C14.2091 16 16 14.2091 16 12C16 10.522 15.1994 9.22854 13.9985 8.53391L13 7.95628V5H11V7.95628Z" fill="currentColor"/>
<path d="M4 13H2C1.44772 13 1 12.5523 1 12C1 11.4477 1.44772 11 2 11H4V13Z" fill="currentColor"/>
<path d="M23 12C23 12.5523 22.5523 13 22 13H20V11H22C22.5523 11 23 11.4477 23 12Z" fill="currentColor"/>
<path d="M11 20V22C11 22.5523 11.4477 23 12 23C12.5523 23 13 22.5523 13 22V20H11Z" fill="currentColor"/>
<path d="M19.7782 19.7782C19.3877 20.1687 18.7545 20.1687 18.364 19.7782L16.9497 18.364L18.364 16.9497L19.7782 18.364C20.1687 18.7545 20.1687 19.3876 19.7782 19.7782Z" fill="currentColor"/>
<path d="M5.63716 16.9497L4.22295 18.364C3.83242 18.7545 3.83242 19.3876 4.22295 19.7782C4.61347 20.1687 5.24664 20.1687 5.63716 19.7782L7.05137 18.364L5.63716 16.9497Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M11 7.95628L10.0015 8.53391C8.80063 9.22854 8 10.522 8 12C8 14.2091 9.79086 16 12 16C14.2091 16 16 14.2091 16 12C16 10.522 15.1994 9.22854 13.9985 8.53391L13 7.95628V5H11V7.95628Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M15 6.80269V5H18V2H6V5H9V6.80269C7.2066 7.84012 6 9.77915 6 12C6 15.3137 8.68629 18 12 18C15.3137 18 18 15.3137 18 12C18 9.77915 16.7934 7.84012 15 6.80269ZM11 7.95628L10.0015 8.53391C8.80063 9.22854 8 10.522 8 12C8 14.2091 9.79086 16 12 16C14.2091 16 16 14.2091 16 12C16 10.522 15.1994 9.22854 13.9985 8.53391L13 7.95628V5H11V7.95628Z" style="fill: var(--automation-device-tertiary-color)"/>
<path d="M4 13H2C1.44772 13 1 12.5523 1 12C1 11.4477 1.44772 11 2 11H4V13Z" style="fill: var(--automation-device-tertiary-color)"/>
<path d="M23 12C23 12.5523 22.5523 13 22 13H20V11H22C22.5523 11 23 11.4477 23 12Z" style="fill: var(--automation-device-tertiary-color)"/>
<path d="M11 20V22C11 22.5523 11.4477 23 12 23C12.5523 23 13 22.5523 13 22V20H11Z" style="fill: var(--automation-device-tertiary-color)"/>
<path d="M19.7782 19.7782C19.3877 20.1687 18.7545 20.1687 18.364 19.7782L16.9497 18.364L18.364 16.9497L19.7782 18.364C20.1687 18.7545 20.1687 19.3876 19.7782 19.7782Z" style="fill: var(--automation-device-tertiary-color)"/>
<path d="M5.63716 16.9497L4.22295 18.364C3.83242 18.7545 3.83242 19.3876 4.22295 19.7782C4.61347 20.1687 5.24664 20.1687 5.63716 19.7782L7.05137 18.364L5.63716 16.9497Z" style="fill: var(--automation-device-tertiary-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M11 7.95628L10.0015 8.53391C8.80063 9.22854 8 10.522 8 12C8 14.2091 9.79086 16 12 16C14.2091 16 16 14.2091 16 12C16 10.522 15.1994 9.22854 13.9985 8.53391L13 7.95628V5H11V7.95628Z" style="fill: var(--navigation-light-yellow-color)"/>
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
    'obi-light-roof-colour-on': ObiLightRoofColourOn;
  }
}