import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-cursor-setpoint-icon')
export class ObiCursorSetpointIcon extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M22 12C22 17.5229 17.5229 22 12 22C6.47715 22 2 17.5229 2 12C2 6.47715 6.47715 2 12 2C17.5229 2 22 6.47715 22 12ZM17 11H20.4418C19.9853 7.10482 16.8952 4.01469 13 3.5582L13 7L11 7L11 3.5582C7.10482 4.01469 4.01469 7.10482 3.5582 11L7 11L7 13L3.5582 13C4.01469 16.8952 7.10482 19.9853 11 20.4418V17H13V20.4418C16.8952 19.9853 19.9853 16.8952 20.4418 13H17V11Z" fill="currentColor"/>
<path d="M13 12C13 12.5523 12.5523 13 12 13C11.4477 13 11 12.5523 11 12C11 11.4477 11.4477 11 12 11C12.5523 11 13 11.4477 13 12Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M22 12C22 17.5229 17.5229 22 12 22C6.47715 22 2 17.5229 2 12C2 6.47715 6.47715 2 12 2C17.5229 2 22 6.47715 22 12ZM17 11H20.4418C19.9853 7.10482 16.8952 4.01469 13 3.5582L13 7L11 7L11 3.5582C7.10482 4.01469 4.01469 7.10482 3.5582 11L7 11L7 13L3.5582 13C4.01469 16.8952 7.10482 19.9853 11 20.4418V17H13V20.4418C16.8952 19.9853 19.9853 16.8952 20.4418 13H17V11Z" style="fill: var(--element-active-color)"/>
<path d="M13 12C13 12.5523 12.5523 13 12 13C11.4477 13 11 12.5523 11 12C11 11.4477 11.4477 11 12 11C12.5523 11 13 11.4477 13 12Z" style="fill: var(--element-active-color)"/>
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
    'obi-cursor-setpoint-icon': ObiCursorSetpointIcon;
  }
}