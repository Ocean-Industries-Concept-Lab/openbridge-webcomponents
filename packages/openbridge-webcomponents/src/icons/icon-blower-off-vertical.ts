import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-blower-off-vertical')
export class ObiBlowerOffVertical extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M9.33333 2C9.33333 1.44772 8.88562 1 8.33333 1H5C4.44772 1 4 1.44772 4 2V11.9C4 16.3735 7.58172 20 12 20C16.4183 20 20 16.3735 20 11.9C20 7.42649 16.4183 3.8 12 3.8C11.065 3.8 10.1674 3.96242 9.33333 4.26091V2Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M8.33333 2C8.33333 3.43747 8.33333 4.24341 8.33333 5.68088L9.67027 5.20243C10.3979 4.94204 11.1816 4.8 12 4.8C15.8543 4.8 19 7.96703 19 11.9C19 15.833 15.8543 19 12 19C8.14568 19 5 15.833 5 11.9V2H8.33333Z" fill="currentColor"/>
<path d="M14.5 9.5C14.7761 9.5 15 9.72386 15 10C15 10.2761 14.7761 10.5 14.5 10.5H9.5C9.22386 10.5 9 10.2761 9 10C9 9.72386 9.22386 9.5 9.5 9.5H14.5Z" fill="currentColor"/>
<path d="M14.5 11.5C14.7761 11.5 15 11.7239 15 12C15 12.2761 14.7761 12.5 14.5 12.5H9.5C9.22386 12.5 9 12.2761 9 12C9 11.7239 9.22386 11.5 9.5 11.5H14.5Z" fill="currentColor"/>
<path d="M14.5 13.5C14.7761 13.5 15 13.7239 15 14C15 14.2761 14.7761 14.5 14.5 14.5H9.5C9.22386 14.5 9 14.2761 9 14C9 13.7239 9.22386 13.5 9.5 13.5H14.5Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M8.33333 5.68088V2H5V11.9C5 15.833 8.14568 19 12 19C15.8543 19 19 15.833 19 11.9C19 7.96703 15.8543 4.8 12 4.8C11.1816 4.8 10.3979 4.94204 9.67027 5.20243L8.33333 5.68088ZM9 10C9 10.2761 9.22386 10.5 9.5 10.5H14.5C14.7761 10.5 15 10.2761 15 10C15 9.72386 14.7761 9.5 14.5 9.5H9.5C9.22386 9.5 9 9.72386 9 10ZM9.5 12.5C9.22386 12.5 9 12.2761 9 12C9 11.7239 9.22386 11.5 9.5 11.5H14.5C14.7761 11.5 15 11.7239 15 12C15 12.2761 14.7761 12.5 14.5 12.5H9.5ZM9 14C9 14.2761 9.22386 14.5 9.5 14.5H14.5C14.7761 14.5 15 14.2761 15 14C15 13.7239 14.7761 13.5 14.5 13.5H9.5C9.22386 13.5 9 13.7239 9 14Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M9.33333 2C9.33333 1.44772 8.88562 1 8.33333 1H5C4.44772 1 4 1.44772 4 2V11.9C4 16.3735 7.58172 20 12 20C16.4183 20 20 16.3735 20 11.9C20 7.42649 16.4183 3.8 12 3.8C11.065 3.8 10.1674 3.96242 9.33333 4.26091V2Z" style="fill: var(--undefined)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M8.33333 2C8.33333 3.43747 8.33333 4.24341 8.33333 5.68088L9.67027 5.20243C10.3979 4.94204 11.1816 4.8 12 4.8C15.8543 4.8 19 7.96703 19 11.9C19 15.833 15.8543 19 12 19C8.14568 19 5 15.833 5 11.9V2H8.33333Z" style="fill: var(--automation-device-primary-inverted-color)"/>
<path d="M14.5 9.5C14.7761 9.5 15 9.72386 15 10C15 10.2761 14.7761 10.5 14.5 10.5H9.5C9.22386 10.5 9 10.2761 9 10C9 9.72386 9.22386 9.5 9.5 9.5H14.5Z" style="fill: var(--undefined)"/>
<path d="M14.5 11.5C14.7761 11.5 15 11.7239 15 12C15 12.2761 14.7761 12.5 14.5 12.5H9.5C9.22386 12.5 9 12.2761 9 12C9 11.7239 9.22386 11.5 9.5 11.5H14.5Z" style="fill: var(--undefined)"/>
<path d="M14.5 13.5C14.7761 13.5 15 13.7239 15 14C15 14.2761 14.7761 14.5 14.5 14.5H9.5C9.22386 14.5 9 14.2761 9 14C9 13.7239 9.22386 13.5 9.5 13.5H14.5Z" style="fill: var(--undefined)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M8.33333 5.68088V2H5V11.9C5 15.833 8.14568 19 12 19C15.8543 19 19 15.833 19 11.9C19 7.96703 15.8543 4.8 12 4.8C11.1816 4.8 10.3979 4.94204 9.67027 5.20243L8.33333 5.68088ZM9 10C9 10.2761 9.22386 10.5 9.5 10.5H14.5C14.7761 10.5 15 10.2761 15 10C15 9.72386 14.7761 9.5 14.5 9.5H9.5C9.22386 9.5 9 9.72386 9 10ZM9.5 12.5C9.22386 12.5 9 12.2761 9 12C9 11.7239 9.22386 11.5 9.5 11.5H14.5C14.7761 11.5 15 11.7239 15 12C15 12.2761 14.7761 12.5 14.5 12.5H9.5ZM9 14C9 14.2761 9.22386 14.5 9.5 14.5H14.5C14.7761 14.5 15 14.2761 15 14C15 13.7239 14.7761 13.5 14.5 13.5H9.5C9.22386 13.5 9 13.7239 9 14Z" style="fill: var(--automation-device-primary-inverted-color)"/>
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
    'obi-blower-off-vertical': ObiBlowerOffVertical;
  }
}
