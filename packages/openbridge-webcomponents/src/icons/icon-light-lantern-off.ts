import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-light-lantern-off')
export class ObiLightLanternOff extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M6.99991 9.82843L1.39331 4.22183L2.80752 2.80762L21.1923 21.1924L19.7781 22.6066L15.1648 17.9933C15.1104 17.9977 15.0554 18 14.9999 18H8.99991C7.89534 18 6.99991 17.1046 6.99991 16V9.82843ZM13.1715 16H8.99991V11.8284L13.1715 16Z" fill="currentColor"/>
<path d="M14.9999 8V12.1719L16.9999 14.1719V8C16.9999 6.89543 16.1045 6 14.9999 6H8.99991C8.9443 6 8.88922 6.00227 8.83475 6.00672L10.828 8H14.9999Z" fill="currentColor"/>
<path d="M7.99991 2C7.44762 2 6.99991 2.44772 6.99991 3V4H16.9999V3C16.9999 2.44772 16.5522 2 15.9999 2H7.99991Z" fill="currentColor"/>
<path d="M6.99991 20H16.9999V21C16.9999 21.5523 16.5522 22 15.9999 22H7.99991C7.44762 22 6.99991 21.5523 6.99991 21V20Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M6.99991 9.82843L1.39331 4.22183L2.80752 2.80762L21.1923 21.1924L19.7781 22.6066L15.1648 17.9933C15.1104 17.9977 15.0554 18 14.9999 18H8.99991C7.89534 18 6.99991 17.1046 6.99991 16V9.82843ZM13.1715 16H8.99991V11.8284L13.1715 16Z" style="fill: var(--element-active-color)"/>
<path d="M14.9999 8V12.1719L16.9999 14.1719V8C16.9999 6.89543 16.1045 6 14.9999 6H8.99991C8.9443 6 8.88922 6.00227 8.83475 6.00672L10.828 8H14.9999Z" style="fill: var(--element-active-color)"/>
<path d="M7.99991 2C7.44762 2 6.99991 2.44772 6.99991 3V4H16.9999V3C16.9999 2.44772 16.5522 2 15.9999 2H7.99991Z" style="fill: var(--element-active-color)"/>
<path d="M6.99991 20H16.9999V21C16.9999 21.5523 16.5522 22 15.9999 22H7.99991C7.44762 22 6.99991 21.5523 6.99991 21V20Z" style="fill: var(--element-active-color)"/>
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
    'obi-light-lantern-off': ObiLightLanternOff;
  }
}
