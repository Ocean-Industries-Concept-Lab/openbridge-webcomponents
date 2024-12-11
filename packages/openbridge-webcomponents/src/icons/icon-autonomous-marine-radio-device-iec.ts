import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-autonomous-marine-radio-device-iec')
export class ObiAutonomousMarineRadioDeviceIec extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M12 7.1547L7.80383 9.57735V14.4227L12 16.8453L16.1961 14.4227V9.57735L12 7.1547ZM17.1961 9L12 6L6.80383 9V15L12 18L17.1961 15V9Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M12 7.1547L7.80383 9.57735V14.4227L12 16.8453L16.1961 14.4227V9.57735L12 7.1547ZM17.1961 9L12 6L6.80383 9V15L12 18L17.1961 15V9Z" style="fill: var(--element-active-color)"/>
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
    'obi-autonomous-marine-radio-device-iec': ObiAutonomousMarineRadioDeviceIec;
  }
}