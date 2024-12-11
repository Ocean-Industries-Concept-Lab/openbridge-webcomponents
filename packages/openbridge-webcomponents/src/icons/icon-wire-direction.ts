import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-wire-direction')
export class ObiWireDirection extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M11.0705 10L13.0674 12L11.0702 14H0V10H11.0705Z" fill="currentColor"/>
<path d="M16.7248 10L18.7248 12L16.7248 14H24V10H16.7248Z" fill="currentColor"/>
<path d="M12.0688 13H0V14H11.0702L12.0688 13Z" fill="currentColor"/>
<path d="M16.7248 14H24V13H17.7248L16.7248 14Z" fill="currentColor"/>
<path d="M17.7248 11H24V10H16.7248L17.7248 11Z" fill="currentColor"/>
<path d="M11.0705 10H0V11H12.069L11.0705 10Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M8.48979 6L14.4807 12L8.48926 18H11.3107L17.3107 12L11.3107 6H8.48979Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M11.0705 10L13.0674 12L11.0702 14H0V10H11.0705Z" style="fill: var(--automation-pipes-primary-color)"/>
<path d="M16.7248 10L18.7248 12L16.7248 14H24V10H16.7248Z" style="fill: var(--automation-pipes-primary-color)"/>
<path d="M12.0688 13H0V14H11.0702L12.0688 13Z" style="fill: var(--automation-pipes-tertiary-color)"/>
<path d="M16.7248 14H24V13H17.7248L16.7248 14Z" style="fill: var(--automation-pipes-tertiary-color)"/>
<path d="M17.7248 11H24V10H16.7248L17.7248 11Z" style="fill: var(--automation-pipes-tertiary-color)"/>
<path d="M11.0705 10H0V11H12.069L11.0705 10Z" style="fill: var(--automation-pipes-tertiary-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M8.48979 6L14.4807 12L8.48926 18H11.3107L17.3107 12L11.3107 6H8.48979Z" style="fill: var(--automation-pipes-tertiary-color)"/>
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
    'obi-wire-direction': ObiWireDirection;
  }
}