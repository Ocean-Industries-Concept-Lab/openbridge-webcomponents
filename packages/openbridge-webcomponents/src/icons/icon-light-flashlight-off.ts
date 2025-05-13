import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-light-flashlight-off')
export class ObiLightFlashlightOff extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M6.99991 9.82745L1.39429 4.22183L2.8085 2.80762L21.1933 21.1924L19.7791 22.6066L14.9999 17.8275V22H8.99991V13L6.99991 11V9.82745ZM12.9999 15.8275V20H10.9999V13.8275L12.9999 15.8275Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M14.9999 10.1716L14.0002 11.1712L15.4145 12.5854L16.9999 11V2H6.99991V4.1709L10.829 8H14.9999V10.1716ZM14.9999 6H8.99991V4H14.9999V6Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M6.99991 9.82745L1.39429 4.22183L2.8085 2.80762L21.1933 21.1924L19.7791 22.6066L14.9999 17.8275V22H8.99991V13L6.99991 11V9.82745ZM12.9999 15.8275V20H10.9999V13.8275L12.9999 15.8275Z" style="fill: var(--element-active-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M14.9999 10.1716L14.0002 11.1712L15.4145 12.5854L16.9999 11V2H6.99991V4.1709L10.829 8H14.9999V10.1716ZM14.9999 6H8.99991V4H14.9999V6Z" style="fill: var(--element-active-color)"/>
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
    'obi-light-flashlight-off': ObiLightFlashlightOff;
  }
}
