import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-light-lantern-stbd-off')
export class ObiLightLanternStbdOff extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M6.99997 3C6.99997 2.44772 7.44769 2 7.99997 2H16C16.5523 2 17 2.44772 17 3V4H6.99997V3Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M19 7.82745L17 9.82745V16C17 17.1046 16.1045 18 15 18H8.99997C8.94415 18 8.88886 17.9977 8.8342 17.9932L4.22082 22.6066L2.8066 21.1924L21.1914 2.80762L22.6056 4.22183L21 5.82745V21C21 21.5523 20.5523 22 20 22H6.99997V20H19V7.82745ZM10.8274 16H15V11.8275L10.8274 16Z" fill="currentColor"/>
<path d="M15 6C15.0553 6 15.1101 6.00224 15.1642 6.00665L13.1709 8H8.99997V12.1709L6.99997 14.1709V8C6.99997 6.89543 7.8954 6 8.99997 6H15Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M6.99997 3C6.99997 2.44772 7.44769 2 7.99997 2H16C16.5523 2 17 2.44772 17 3V4H6.99997V3Z" style="fill: var(--element-active-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M19 7.82745L17 9.82745V16C17 17.1046 16.1045 18 15 18H8.99997C8.94415 18 8.88886 17.9977 8.8342 17.9932L4.22082 22.6066L2.8066 21.1924L21.1914 2.80762L22.6056 4.22183L21 5.82745V21C21 21.5523 20.5523 22 20 22H6.99997V20H19V7.82745ZM10.8274 16H15V11.8275L10.8274 16Z" style="fill: var(--element-active-color)"/>
<path d="M15 6C15.0553 6 15.1101 6.00224 15.1642 6.00665L13.1709 8H8.99997V12.1709L6.99997 14.1709V8C6.99997 6.89543 7.8954 6 8.99997 6H15Z" style="fill: var(--element-active-color)"/>
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
    'obi-light-lantern-stbd-off': ObiLightLanternStbdOff;
  }
}
