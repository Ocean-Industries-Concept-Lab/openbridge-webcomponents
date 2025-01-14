import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-chart-display-settings-iec')
export class ObiChartDisplaySettingsIec extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M4.5 2.5C3.94772 2.5 3.5 2.94772 3.5 3.5V4H20V20.5H20.5C21.0523 20.5 21.5 20.0523 21.5 19.5V3.5C21.5 2.94772 21.0523 2.5 20.5 2.5H4.5Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M3 22H17C17.5523 22 18 21.5523 18 21V7C18 6.44772 17.5523 6 17 6H3C2.44772 6 2 6.44772 2 7V21C2 21.5523 2.44772 22 3 22ZM3.5 7.5V12H7.23529V13.7391L9.11765 13.7391V15.4783H9.35294C10.2626 15.4783 11 16.1596 11 17V18.9565L8.17647 18.9565V20.5H16.5V16H15.3667C13.9491 16 12.8 14.9447 12.8 13.6429V12.5714H12.5667C11.1491 12.5714 10 11.5161 10 10.2143V7.5H3.5ZM11.4 7.5V10.2143C11.4 10.806 11.9223 11.2857 12.5667 11.2857H14.2V13.6429C14.2 14.2346 14.7223 14.7143 15.3667 14.7143H16.5V7.5H11.4ZM3.5 20.5V13.3043H5.82353L5.82353 15.0435H7.70588L7.70588 16.7826H9.35294C9.48289 16.7826 9.58824 16.8799 9.58824 17V17.6522L6.76471 17.6522V20.5H3.5Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M4.5 2.5C3.94772 2.5 3.5 2.94772 3.5 3.5V4H20V20.5H20.5C21.0523 20.5 21.5 20.0523 21.5 19.5V3.5C21.5 2.94772 21.0523 2.5 20.5 2.5H4.5Z" style="fill: var(--element-active-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M3 22H17C17.5523 22 18 21.5523 18 21V7C18 6.44772 17.5523 6 17 6H3C2.44772 6 2 6.44772 2 7V21C2 21.5523 2.44772 22 3 22ZM3.5 7.5V12H7.23529V13.7391L9.11765 13.7391V15.4783H9.35294C10.2626 15.4783 11 16.1596 11 17V18.9565L8.17647 18.9565V20.5H16.5V16H15.3667C13.9491 16 12.8 14.9447 12.8 13.6429V12.5714H12.5667C11.1491 12.5714 10 11.5161 10 10.2143V7.5H3.5ZM11.4 7.5V10.2143C11.4 10.806 11.9223 11.2857 12.5667 11.2857H14.2V13.6429C14.2 14.2346 14.7223 14.7143 15.3667 14.7143H16.5V7.5H11.4ZM3.5 20.5V13.3043H5.82353L5.82353 15.0435H7.70588L7.70588 16.7826H9.35294C9.48289 16.7826 9.58824 16.8799 9.58824 17V17.6522L6.76471 17.6522V20.5H3.5Z" style="fill: var(--element-active-color)"/>
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
    'obi-chart-display-settings-iec': ObiChartDisplaySettingsIec;
  }
}