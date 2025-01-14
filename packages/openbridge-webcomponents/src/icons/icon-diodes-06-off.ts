import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-diodes-06-off')
export class ObiDiodes06Off extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M17 1L17 6.45454L7 1V23H8V17.5455L18 23L18 1H17ZM17 11.5455L17 7.54546L8 12.4545V16.4545L17 11.5455ZM17 21.3155V12.6845L9.08833 17L17 21.3155ZM8 2.68454L8 11.3155L15.9117 7L8 2.68454Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M9.08833 17L17 12.6846V21.3155L9.08833 17ZM8 11.3155L8 2.68457L15.9117 7.00003L8 11.3155Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M17 1L17 6.45454L7 1V23H8V17.5455L18 23L18 1H17ZM17 11.5455L17 7.54546L8 12.4545V16.4545L17 11.5455ZM17 21.3155V12.6845L9.08833 17L17 21.3155ZM8 2.68454L8 11.3155L15.9117 7L8 2.68454Z" style="fill: var(--undefined)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M9.08833 17L17 12.6846V21.3155L9.08833 17ZM8 11.3155L8 2.68457L15.9117 7.00003L8 11.3155Z" style="fill: var(--automation-device-primary-inverted-color)"/>
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
    'obi-diodes-06-off': ObiDiodes06Off;
  }
}