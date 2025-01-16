import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-chart-display-settings-proposal')
export class ObiChartDisplaySettingsProposal extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M16.9999 23L16.6999 21.5C16.4999 21.4167 16.3124 21.3292 16.1374 21.2375C15.9624 21.1458 15.7832 21.0333 15.5999 20.9L14.1499 21.35L13.1499 19.65L14.2999 18.65C14.2666 18.4167 14.2499 18.2 14.2499 18C14.2499 17.8 14.2666 17.5833 14.2999 17.35L13.1499 16.35L14.1499 14.65L15.5999 15.1C15.7832 14.9667 15.9624 14.8542 16.1374 14.7625C16.3124 14.6708 16.4999 14.5833 16.6999 14.5L16.9999 13H18.9999L19.2999 14.5C19.4999 14.5833 19.6874 14.675 19.8624 14.775C20.0374 14.875 20.2166 15 20.3999 15.15L21.8499 14.65L22.8499 16.4L21.6999 17.4C21.7332 17.6 21.7499 17.8083 21.7499 18.025C21.7499 18.2417 21.7332 18.45 21.6999 18.65L22.8499 19.65L21.8499 21.35L20.3999 20.9C20.2166 21.0333 20.0374 21.1458 19.8624 21.2375C19.6874 21.3292 19.4999 21.4167 19.2999 21.5L18.9999 23H16.9999ZM17.9999 20C18.5499 20 19.0207 19.8042 19.4124 19.4125C19.8041 19.0208 19.9999 18.55 19.9999 18C19.9999 17.45 19.8041 16.9792 19.4124 16.5875C19.0207 16.1958 18.5499 16 17.9999 16C17.4499 16 16.9791 16.1958 16.5874 16.5875C16.1957 16.9792 15.9999 17.45 15.9999 18C15.9999 18.55 16.1957 19.0208 16.5874 19.4125C16.9791 19.8042 17.4499 20 17.9999 20Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M1.5 8.5L10.5 15.5L19.5 8.5L10.5 1.5L1.5 8.5ZM16.25 8.5L10.5 12.95L4.75 8.5L10.5 4.05L16.25 8.5Z" fill="currentColor"/>
<path d="M10.5 20.55L1.5 13.55L3.15 12.3L10.5 18L12 16.8367V19.3833L10.5 20.55Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M16.9999 23L16.6999 21.5C16.4999 21.4167 16.3124 21.3292 16.1374 21.2375C15.9624 21.1458 15.7832 21.0333 15.5999 20.9L14.1499 21.35L13.1499 19.65L14.2999 18.65C14.2666 18.4167 14.2499 18.2 14.2499 18C14.2499 17.8 14.2666 17.5833 14.2999 17.35L13.1499 16.35L14.1499 14.65L15.5999 15.1C15.7832 14.9667 15.9624 14.8542 16.1374 14.7625C16.3124 14.6708 16.4999 14.5833 16.6999 14.5L16.9999 13H18.9999L19.2999 14.5C19.4999 14.5833 19.6874 14.675 19.8624 14.775C20.0374 14.875 20.2166 15 20.3999 15.15L21.8499 14.65L22.8499 16.4L21.6999 17.4C21.7332 17.6 21.7499 17.8083 21.7499 18.025C21.7499 18.2417 21.7332 18.45 21.6999 18.65L22.8499 19.65L21.8499 21.35L20.3999 20.9C20.2166 21.0333 20.0374 21.1458 19.8624 21.2375C19.6874 21.3292 19.4999 21.4167 19.2999 21.5L18.9999 23H16.9999ZM17.9999 20C18.5499 20 19.0207 19.8042 19.4124 19.4125C19.8041 19.0208 19.9999 18.55 19.9999 18C19.9999 17.45 19.8041 16.9792 19.4124 16.5875C19.0207 16.1958 18.5499 16 17.9999 16C17.4499 16 16.9791 16.1958 16.5874 16.5875C16.1957 16.9792 15.9999 17.45 15.9999 18C15.9999 18.55 16.1957 19.0208 16.5874 19.4125C16.9791 19.8042 17.4499 20 17.9999 20Z" style="fill: var(--element-active-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M1.5 8.5L10.5 15.5L19.5 8.5L10.5 1.5L1.5 8.5ZM16.25 8.5L10.5 12.95L4.75 8.5L10.5 4.05L16.25 8.5Z" style="fill: var(--element-active-color)"/>
<path d="M10.5 20.55L1.5 13.55L3.15 12.3L10.5 18L12 16.8367V19.3833L10.5 20.55Z" style="fill: var(--element-active-color)"/>
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
    'obi-chart-display-settings-proposal': ObiChartDisplaySettingsProposal;
  }
}