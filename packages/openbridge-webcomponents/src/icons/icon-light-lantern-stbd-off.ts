import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-light-lantern-stbd-off')
export class ObiLightLanternStbdOff extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M16.9999 3C16.9999 2.44772 16.5522 2 15.9999 2H7.99991C7.44762 2 6.99991 2.44772 6.99991 3V4H16.9999V3Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M4.99991 7.82745L6.99991 9.82745V16C6.99991 17.1046 7.89534 18 8.99991 18H14.9999C15.0557 18 15.111 17.9977 15.1657 17.9932L19.7791 22.6066L21.1933 21.1924L2.8085 2.80762L1.39429 4.22183L2.99991 5.82745V21C2.99991 21.5523 3.44762 22 3.99991 22H16.9999V20H4.99991V7.82745ZM13.1725 16H8.99991V11.8275L13.1725 16Z" fill="currentColor"/>
<path d="M8.99991 6C8.9446 6 8.88982 6.00224 8.83566 6.00665L10.829 8H14.9999V12.1709L16.9999 14.1709V8C16.9999 6.89543 16.1045 6 14.9999 6H8.99991Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M16.9999 3C16.9999 2.44772 16.5522 2 15.9999 2H7.99991C7.44762 2 6.99991 2.44772 6.99991 3V4H16.9999V3Z" style="fill: var(--element-active-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M4.99991 7.82745L6.99991 9.82745V16C6.99991 17.1046 7.89534 18 8.99991 18H14.9999C15.0557 18 15.111 17.9977 15.1657 17.9932L19.7791 22.6066L21.1933 21.1924L2.8085 2.80762L1.39429 4.22183L2.99991 5.82745V21C2.99991 21.5523 3.44762 22 3.99991 22H16.9999V20H4.99991V7.82745ZM13.1725 16H8.99991V11.8275L13.1725 16Z" style="fill: var(--element-active-color)"/>
<path d="M8.99991 6C8.9446 6 8.88982 6.00224 8.83566 6.00665L10.829 8H14.9999V12.1709L16.9999 14.1709V8C16.9999 6.89543 16.1045 6 14.9999 6H8.99991Z" style="fill: var(--element-active-color)"/>
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
    'obi-light-lantern-stbd-off': ObiLightLanternStbdOff;
  }
}