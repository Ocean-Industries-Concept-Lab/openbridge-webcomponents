import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-misc')
export class ObiMisc extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M8.25 13.25C8.94036 13.25 9.5 12.6904 9.5 12C9.5 11.3096 8.94036 10.75 8.25 10.75C7.55964 10.75 7 11.3096 7 12C7 12.6904 7.55964 13.25 8.25 13.25Z" fill="currentColor"/>
<path d="M12 13.25C12.6904 13.25 13.25 12.6904 13.25 12C13.25 11.3096 12.6904 10.75 12 10.75C11.3096 10.75 10.75 11.3096 10.75 12C10.75 12.6904 11.3096 13.25 12 13.25Z" fill="currentColor"/>
<path d="M15.75 13.25C16.4404 13.25 17 12.6904 17 12C17 11.3096 16.4404 10.75 15.75 10.75C15.0596 10.75 14.5 11.3096 14.5 12C14.5 12.6904 15.0596 13.25 15.75 13.25Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22ZM19.5 12C19.5 16.1421 16.1421 19.5 12 19.5C7.85786 19.5 4.5 16.1421 4.5 12C4.5 7.85786 7.85786 4.5 12 4.5C16.1421 4.5 19.5 7.85786 19.5 12Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M8.25 13.25C8.94036 13.25 9.5 12.6904 9.5 12C9.5 11.3096 8.94036 10.75 8.25 10.75C7.55964 10.75 7 11.3096 7 12C7 12.6904 7.55964 13.25 8.25 13.25Z" style="fill: var(--element-active-color)"/>
<path d="M12 13.25C12.6904 13.25 13.25 12.6904 13.25 12C13.25 11.3096 12.6904 10.75 12 10.75C11.3096 10.75 10.75 11.3096 10.75 12C10.75 12.6904 11.3096 13.25 12 13.25Z" style="fill: var(--element-active-color)"/>
<path d="M15.75 13.25C16.4404 13.25 17 12.6904 17 12C17 11.3096 16.4404 10.75 15.75 10.75C15.0596 10.75 14.5 11.3096 14.5 12C14.5 12.6904 15.0596 13.25 15.75 13.25Z" style="fill: var(--element-active-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22ZM19.5 12C19.5 16.1421 16.1421 19.5 12 19.5C7.85786 19.5 4.5 16.1421 4.5 12C4.5 7.85786 7.85786 4.5 12 4.5C16.1421 4.5 19.5 7.85786 19.5 12Z" style="fill: var(--element-active-color)"/>
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
    'obi-misc': ObiMisc;
  }
}
