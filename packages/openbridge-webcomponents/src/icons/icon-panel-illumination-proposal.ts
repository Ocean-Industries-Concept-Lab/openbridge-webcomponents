import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-panel-illumination-proposal')
export class ObiPanelIlluminationProposal extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M18.364 4.22192L19.7782 5.63614L16.9497 8.46456L15.5355 7.05035L18.364 4.22192Z" fill="currentColor"/>
<path d="M2 11.0001V13.0001H6V11.0001H2Z" fill="currentColor"/>
<path d="M5.63605 4.22192L4.22183 5.63614L7.05026 8.46457L8.46447 7.05035L5.63605 4.22192Z" fill="currentColor"/>
<path d="M13 22.0001V18.0001H11V22.0001H13Z" fill="currentColor"/>
<path d="M8.46446 16.9499L7.05025 15.5356L4.22182 18.3641L5.63603 19.7783L8.46446 16.9499Z" fill="currentColor"/>
<path d="M22 11.0001H18V13.0001H22V11.0001Z" fill="currentColor"/>
<path d="M16.9498 15.5356L15.5355 16.9498L18.364 19.7783L19.7782 18.3641L16.9498 15.5356Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M12 16C14.2091 16 16 14.2091 16 12C16 10.5194 15.1956 9.22675 14 8.53513V4H10V8.53513C8.8044 9.22675 8 10.5194 8 12C8 14.2091 9.79086 16 12 16ZM12 14C13.1046 14 14 13.1046 14 12C14 10.8954 13.1046 10 12 10C10.8954 10 10 10.8954 10 12C10 13.1046 10.8954 14 12 14Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M18.364 4.22192L19.7782 5.63614L16.9497 8.46456L15.5355 7.05035L18.364 4.22192Z" style="fill: var(--element-active-color)"/>
<path d="M2 11.0001V13.0001H6V11.0001H2Z" style="fill: var(--element-active-color)"/>
<path d="M5.63605 4.22192L4.22183 5.63614L7.05026 8.46457L8.46447 7.05035L5.63605 4.22192Z" style="fill: var(--element-active-color)"/>
<path d="M13 22.0001V18.0001H11V22.0001H13Z" style="fill: var(--element-active-color)"/>
<path d="M8.46446 16.9499L7.05025 15.5356L4.22182 18.3641L5.63603 19.7783L8.46446 16.9499Z" style="fill: var(--element-active-color)"/>
<path d="M22 11.0001H18V13.0001H22V11.0001Z" style="fill: var(--element-active-color)"/>
<path d="M16.9498 15.5356L15.5355 16.9498L18.364 19.7783L19.7782 18.3641L16.9498 15.5356Z" style="fill: var(--element-active-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M12 16C14.2091 16 16 14.2091 16 12C16 10.5194 15.1956 9.22675 14 8.53513V4H10V8.53513C8.8044 9.22675 8 10.5194 8 12C8 14.2091 9.79086 16 12 16ZM12 14C13.1046 14 14 13.1046 14 12C14 10.8954 13.1046 10 12 10C10.8954 10 10 10.8954 10 12C10 13.1046 10.8954 14 12 14Z" style="fill: var(--element-active-color)"/>
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
    'obi-panel-illumination-proposal': ObiPanelIlluminationProposal;
  }
}