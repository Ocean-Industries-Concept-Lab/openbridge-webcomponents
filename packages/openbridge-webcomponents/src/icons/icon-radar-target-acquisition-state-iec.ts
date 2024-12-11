import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-radar-target-acquisition-state-iec')
export class ObiRadarTargetAcquisitionStateIec extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M15.1779 5.76309C14.5234 5.42962 13.8205 5.20123 13.095 5.08632L13.2515 4.09863C14.0806 4.22996 14.8839 4.49097 15.6319 4.87209L15.1779 5.76309ZM10.9049 5.08641C10.1794 5.20132 9.47653 5.4297 8.82204 5.76318L8.36805 4.87217C9.11604 4.49106 9.91935 4.23004 10.7485 4.09872L10.9049 5.08641ZM7.05015 7.0505C6.53074 7.5699 6.09633 8.16783 5.76285 8.82231L4.87184 8.36832C5.25296 7.62034 5.74943 6.937 6.34304 6.34339L7.05015 7.0505ZM18.2369 8.82231C17.9035 8.16783 17.469 7.56991 16.9496 7.0505L17.6567 6.34339C18.2504 6.937 18.7468 7.62034 19.1279 8.36832L18.2369 8.82231ZM5.08618 10.9051C4.97127 11.6306 4.97127 12.3697 5.08618 13.0952L4.09849 13.2516C3.96717 12.4225 3.96717 11.5778 4.09849 10.7487L5.08618 10.9051ZM18.9137 13.0954C19.0286 12.3699 19.0286 11.6308 18.9137 10.9053L19.9014 10.7489C20.0327 11.578 20.0327 12.4227 19.9014 13.2518L18.9137 13.0954ZM5.76283 15.1781C6.09631 15.8326 6.53072 16.4305 7.05013 16.9499L6.34302 17.657C5.74942 17.0634 5.25294 16.3801 4.87182 15.6321L5.76283 15.1781ZM16.9496 16.9499C17.469 16.4305 17.9034 15.8326 18.2369 15.1781L19.1279 15.6321C18.7468 16.3801 18.2503 17.0634 17.6567 17.657L16.9496 16.9499ZM8.82197 18.2372C9.47645 18.5706 10.1794 18.799 10.9049 18.9139L10.7484 19.9016C9.91927 19.7703 9.11596 19.5093 8.36797 19.1282L8.82197 18.2372ZM13.0949 18.9141C13.8204 18.7992 14.5233 18.5708 15.1778 18.2373L15.6318 19.1283C14.8838 19.5094 14.0805 19.7704 13.2514 19.9018L13.0949 18.9141Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M15.1779 5.76309C14.5234 5.42962 13.8205 5.20123 13.095 5.08632L13.2515 4.09863C14.0806 4.22996 14.8839 4.49097 15.6319 4.87209L15.1779 5.76309ZM10.9049 5.08641C10.1794 5.20132 9.47653 5.4297 8.82204 5.76318L8.36805 4.87217C9.11604 4.49106 9.91935 4.23004 10.7485 4.09872L10.9049 5.08641ZM7.05015 7.0505C6.53074 7.5699 6.09633 8.16783 5.76285 8.82231L4.87184 8.36832C5.25296 7.62034 5.74943 6.937 6.34304 6.34339L7.05015 7.0505ZM18.2369 8.82231C17.9035 8.16783 17.469 7.56991 16.9496 7.0505L17.6567 6.34339C18.2504 6.937 18.7468 7.62034 19.1279 8.36832L18.2369 8.82231ZM5.08618 10.9051C4.97127 11.6306 4.97127 12.3697 5.08618 13.0952L4.09849 13.2516C3.96717 12.4225 3.96717 11.5778 4.09849 10.7487L5.08618 10.9051ZM18.9137 13.0954C19.0286 12.3699 19.0286 11.6308 18.9137 10.9053L19.9014 10.7489C20.0327 11.578 20.0327 12.4227 19.9014 13.2518L18.9137 13.0954ZM5.76283 15.1781C6.09631 15.8326 6.53072 16.4305 7.05013 16.9499L6.34302 17.657C5.74942 17.0634 5.25294 16.3801 4.87182 15.6321L5.76283 15.1781ZM16.9496 16.9499C17.469 16.4305 17.9034 15.8326 18.2369 15.1781L19.1279 15.6321C18.7468 16.3801 18.2503 17.0634 17.6567 17.657L16.9496 16.9499ZM8.82197 18.2372C9.47645 18.5706 10.1794 18.799 10.9049 18.9139L10.7484 19.9016C9.91927 19.7703 9.11596 19.5093 8.36797 19.1282L8.82197 18.2372ZM13.0949 18.9141C13.8204 18.7992 14.5233 18.5708 15.1778 18.2373L15.6318 19.1283C14.8838 19.5094 14.0805 19.7704 13.2514 19.9018L13.0949 18.9141Z" style="fill: var(--element-active-color)"/>
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
    'obi-radar-target-acquisition-state-iec': ObiRadarTargetAcquisitionStateIec;
  }
}
