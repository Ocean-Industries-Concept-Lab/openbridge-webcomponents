import {LitElement, html, css, svg} from 'lit';
import {property} from 'lit/decorators.js';
import {customElement} from '../decorator.js';

@customElement('obi-vessel-type-passenger-outlined')
export class ObiVesselTypePassengerOutlined extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M9 12H11V14H9V12Z" fill="currentColor"/>
<path d="M11 9H9V11H11V9Z" fill="currentColor"/>
<path d="M9 15H11V17H9V15Z" fill="currentColor"/>
<path d="M11 18H9V20H11V18Z" fill="currentColor"/>
<path d="M13 12H15V14H13V12Z" fill="currentColor"/>
<path d="M15 9H13V11H15V9Z" fill="currentColor"/>
<path d="M13 15H15V17H13V15Z" fill="currentColor"/>
<path d="M15 18H13V20H15V18Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M6 6C6 3.23858 8.23858 1 11 1H13C15.7614 1 18 3.23858 18 6V23H6V6ZM11 2.5H13C14.933 2.5 16.5 4.067 16.5 6V7.25C14.4283 3.91233 9.57166 3.91233 7.5 7.25V6C7.5 4.067 9.067 2.5 11 2.5ZM7.5 8.92705V21.5H16.5V8.92705C14.5572 5.36525 9.4428 5.36525 7.5 8.92705Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M9 12H11V14H9V12Z" style="fill: var(--element-active-color)"/>
<path d="M11 9H9V11H11V9Z" style="fill: var(--element-active-color)"/>
<path d="M9 15H11V17H9V15Z" style="fill: var(--element-active-color)"/>
<path d="M11 18H9V20H11V18Z" style="fill: var(--element-active-color)"/>
<path d="M13 12H15V14H13V12Z" style="fill: var(--element-active-color)"/>
<path d="M15 9H13V11H15V9Z" style="fill: var(--element-active-color)"/>
<path d="M13 15H15V17H13V15Z" style="fill: var(--element-active-color)"/>
<path d="M15 18H13V20H15V18Z" style="fill: var(--element-active-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M6 6C6 3.23858 8.23858 1 11 1H13C15.7614 1 18 3.23858 18 6V23H6V6ZM11 2.5H13C14.933 2.5 16.5 4.067 16.5 6V7.25C14.4283 3.91233 9.57166 3.91233 7.5 7.25V6C7.5 4.067 9.067 2.5 11 2.5ZM7.5 8.92705V21.5H16.5V8.92705C14.5572 5.36525 9.4428 5.36525 7.5 8.92705Z" style="fill: var(--element-active-color)"/>
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
    'obi-vessel-type-passenger-outlined': ObiVesselTypePassengerOutlined;
  }
}
