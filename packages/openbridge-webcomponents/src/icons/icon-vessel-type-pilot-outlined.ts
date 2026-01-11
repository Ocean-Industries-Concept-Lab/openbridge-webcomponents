import {LitElement, html, css, svg} from 'lit';
import {property} from 'lit/decorators.js';
import {customElement} from '../decorator.js';

@customElement('obi-vessel-type-pilot-outlined')
export class ObiVesselTypePilotOutlined extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M6.06042 8.29398C6.61896 7.40071 7.37342 6.6425 8.26362 6.07952C9.03476 4.53334 10.3468 3.28102 12 2.59958C13.6532 3.28102 14.9652 4.53334 15.7364 6.07952C16.6266 6.6425 17.381 7.40071 17.9396 8.29399C17.5453 4.94874 15.2534 2.08447 12 1C8.74659 2.08447 6.45468 4.94873 6.06042 8.29398Z" fill="currentColor"/>
<path d="M18 15.6076V22H6V15.6076C6.40062 16.2725 6.90862 16.8653 7.5 17.3621V20.5H16.5V17.3621C17.0914 16.8653 17.5994 16.2725 18 15.6076Z" fill="currentColor"/>
<path d="M14 12L12 8L10 12L12 16L14 12Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M16.5 15.9687C17.4335 14.911 18 13.5217 18 12C18 10.4005 17.3741 8.94717 16.3539 7.87158C15.2605 6.71887 13.7142 6 12 6C10.2858 6 8.7395 6.71886 7.64612 7.87158C6.62589 8.94717 6 10.4005 6 12C6 13.5217 6.56645 14.911 7.5 15.9687C8.59942 17.2144 10.208 18 12 18C13.792 18 15.4006 17.2144 16.5 15.9687ZM12 16.5C14.4853 16.5 16.5 14.4853 16.5 12C16.5 9.51472 14.4853 7.5 12 7.5C9.51472 7.5 7.5 9.51472 7.5 12C7.5 14.4853 9.51472 16.5 12 16.5Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M6.06042 8.29398C6.61896 7.40071 7.37342 6.6425 8.26362 6.07952C9.03476 4.53334 10.3468 3.28102 12 2.59958C13.6532 3.28102 14.9652 4.53334 15.7364 6.07952C16.6266 6.6425 17.381 7.40071 17.9396 8.29399C17.5453 4.94874 15.2534 2.08447 12 1C8.74659 2.08447 6.45468 4.94873 6.06042 8.29398Z" style="fill: var(--element-active-color)"/>
<path d="M18 15.6076V22H6V15.6076C6.40062 16.2725 6.90862 16.8653 7.5 17.3621V20.5H16.5V17.3621C17.0914 16.8653 17.5994 16.2725 18 15.6076Z" style="fill: var(--element-active-color)"/>
<path d="M14 12L12 8L10 12L12 16L14 12Z" style="fill: var(--element-active-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M16.5 15.9687C17.4335 14.911 18 13.5217 18 12C18 10.4005 17.3741 8.94717 16.3539 7.87158C15.2605 6.71887 13.7142 6 12 6C10.2858 6 8.7395 6.71886 7.64612 7.87158C6.62589 8.94717 6 10.4005 6 12C6 13.5217 6.56645 14.911 7.5 15.9687C8.59942 17.2144 10.208 18 12 18C13.792 18 15.4006 17.2144 16.5 15.9687ZM12 16.5C14.4853 16.5 16.5 14.4853 16.5 12C16.5 9.51472 14.4853 7.5 12 7.5C9.51472 7.5 7.5 9.51472 7.5 12C7.5 14.4853 9.51472 16.5 12 16.5Z" style="fill: var(--element-active-color)"/>
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
    'obi-vessel-type-pilot-outlined': ObiVesselTypePilotOutlined;
  }
}
