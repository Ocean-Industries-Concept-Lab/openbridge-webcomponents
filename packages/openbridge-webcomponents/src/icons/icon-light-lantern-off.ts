import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-light-lantern-off')
export class ObiLightLanternOff extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M7.00003 9.82843L1.39343 4.22183L2.80765 2.80762L21.1924 21.1924L19.7782 22.6066L15.1649 17.9933C15.1105 17.9977 15.0555 18 15 18H9.00003C7.89546 18 7.00003 17.1046 7.00003 16V9.82843ZM13.1716 16H9.00003V11.8284L13.1716 16Z" fill="currentColor"/>
<path d="M15 8V12.1719L17 14.1719V8C17 6.89543 16.1046 6 15 6H9.00003C8.94442 6 8.88934 6.00227 8.83488 6.00672L10.8282 8H15Z" fill="currentColor"/>
<path d="M8.00003 2C7.44774 2 7.00003 2.44772 7.00003 3V4H17V3C17 2.44772 16.5523 2 16 2H8.00003Z" fill="currentColor"/>
<path d="M7.00003 20H17V21C17 21.5523 16.5523 22 16 22H8.00003C7.44774 22 7.00003 21.5523 7.00003 21V20Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M7.00003 9.82843L1.39343 4.22183L2.80765 2.80762L21.1924 21.1924L19.7782 22.6066L15.1649 17.9933C15.1105 17.9977 15.0555 18 15 18H9.00003C7.89546 18 7.00003 17.1046 7.00003 16V9.82843ZM13.1716 16H9.00003V11.8284L13.1716 16Z" style="fill: var(--element-active-color)"/>
<path d="M15 8V12.1719L17 14.1719V8C17 6.89543 16.1046 6 15 6H9.00003C8.94442 6 8.88934 6.00227 8.83488 6.00672L10.8282 8H15Z" style="fill: var(--element-active-color)"/>
<path d="M8.00003 2C7.44774 2 7.00003 2.44772 7.00003 3V4H17V3C17 2.44772 16.5523 2 16 2H8.00003Z" style="fill: var(--element-active-color)"/>
<path d="M7.00003 20H17V21C17 21.5523 16.5523 22 16 22H8.00003C7.44774 22 7.00003 21.5523 7.00003 21V20Z" style="fill: var(--element-active-color)"/>
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
    'obi-light-lantern-off': ObiLightLanternOff;
  }
}