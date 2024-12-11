import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-light-flashlight-off')
export class ObiLightFlashlightOff extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M7.00003 9.82745L1.39441 4.22183L2.80862 2.80762L21.1934 21.1924L19.7792 22.6066L15 17.8275V22H9.00003V13L7.00003 11V9.82745ZM13 15.8275V20H11V13.8275L13 15.8275Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M15 10.1716L14.0004 11.1712L15.4146 12.5854L17 11V2H7.00003V4.1709L10.8291 8H15V10.1716ZM15 6H9.00003V4H15V6Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M7.00003 9.82745L1.39441 4.22183L2.80862 2.80762L21.1934 21.1924L19.7792 22.6066L15 17.8275V22H9.00003V13L7.00003 11V9.82745ZM13 15.8275V20H11V13.8275L13 15.8275Z" style="fill: var(--element-active-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M15 10.1716L14.0004 11.1712L15.4146 12.5854L17 11V2H7.00003V4.1709L10.8291 8H15V10.1716ZM15 6H9.00003V4H15V6Z" style="fill: var(--element-active-color)"/>
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
    'obi-light-flashlight-off': ObiLightFlashlightOff;
  }
}