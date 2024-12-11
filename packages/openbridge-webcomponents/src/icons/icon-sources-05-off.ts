import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-sources-05-off')
export class ObiSources05Off extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M12 4C10.8954 4 10 4.89543 10 6C10 7.10457 10.8954 8 12 8C13.1046 8 14 7.10457 14 6C14 4.89543 13.1046 4 12 4Z" fill="currentColor"/>
<path d="M14 18C14 19.1046 13.1046 20 12 20C10.8954 20 10 19.1046 10 18C10 16.8954 10.8954 16 12 16C13.1046 16 14 16.8954 14 18Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M13 0V2.12602C14.7252 2.57006 16 4.13616 16 6C16 8.20914 14.2091 10 12 10C9.79086 10 8 8.20914 8 6C8 4.13616 9.27477 2.57006 11 2.12602V0H13ZM10 6C10 4.89543 10.8954 4 12 4C13.1046 4 14 4.89543 14 6C14 7.10457 13.1046 8 12 8C10.8954 8 10 7.10457 10 6Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M16 18C16 19.8638 14.7252 21.4299 13 21.874V24H11V21.874C9.27477 21.4299 8 19.8638 8 18C8 15.7909 9.79086 14 12 14C14.2091 14 16 15.7909 16 18ZM12 20C13.1046 20 14 19.1046 14 18C14 16.8954 13.1046 16 12 16C10.8954 16 10 16.8954 10 18C10 19.1046 10.8954 20 12 20Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M12 4C10.8954 4 10 4.89543 10 6C10 7.10457 10.8954 8 12 8C13.1046 8 14 7.10457 14 6C14 4.89543 13.1046 4 12 4Z" style="fill: var(--automation-device-primary-inverted-color)"/>
<path d="M14 18C14 19.1046 13.1046 20 12 20C10.8954 20 10 19.1046 10 18C10 16.8954 10.8954 16 12 16C13.1046 16 14 16.8954 14 18Z" style="fill: var(--automation-device-primary-inverted-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M13 0V2.12602C14.7252 2.57006 16 4.13616 16 6C16 8.20914 14.2091 10 12 10C9.79086 10 8 8.20914 8 6C8 4.13616 9.27477 2.57006 11 2.12602V0H13ZM10 6C10 4.89543 10.8954 4 12 4C13.1046 4 14 4.89543 14 6C14 7.10457 13.1046 8 12 8C10.8954 8 10 7.10457 10 6Z" style="fill: var(--automation-device-tertiary-inverted-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M16 18C16 19.8638 14.7252 21.4299 13 21.874V24H11V21.874C9.27477 21.4299 8 19.8638 8 18C8 15.7909 9.79086 14 12 14C14.2091 14 16 15.7909 16 18ZM12 20C13.1046 20 14 19.1046 14 18C14 16.8954 13.1046 16 12 16C10.8954 16 10 16.8954 10 18C10 19.1046 10.8954 20 12 20Z" style="fill: var(--automation-device-tertiary-inverted-color)"/>
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
    'obi-sources-05-off': ObiSources05Off;
  }
}