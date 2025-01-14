import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-sources-03-off')
export class ObiSources03Off extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_2228_2718)">
<path d="M11.9999 2.82812L3.82837 10.9997L20.1715 10.9997L11.9999 2.82812Z" fill="currentColor"/>
<path d="M12 21.1713L3.82837 12.9997L20.1717 12.9997L12 21.1713Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M12.0001 24.0001L0 12L12 0L24.0001 12.0001L12.0001 24.0001ZM3.82843 11L12 2.82843L20.1716 11L3.82843 11ZM3.82843 13L12.0001 21.1716L20.1717 13L3.82843 13Z" fill="currentColor"/>
</g>
<defs>
<clipPath id="clip0_2228_2718">
<rect width="24" height="24" fill="currentColor"/>
</clipPath>
</defs>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_2228_2718)">
<path d="M11.9999 2.82812L3.82837 10.9997L20.1715 10.9997L11.9999 2.82812Z" style="fill: var(--automation-device-primary-inverted-color)"/>
<path d="M12 21.1713L3.82837 12.9997L20.1717 12.9997L12 21.1713Z" style="fill: var(--automation-device-primary-inverted-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M12.0001 24.0001L0 12L12 0L24.0001 12.0001L12.0001 24.0001ZM3.82843 11L12 2.82843L20.1716 11L3.82843 11ZM3.82843 13L12.0001 21.1716L20.1717 13L3.82843 13Z" style="fill: var(--undefined)"/>
</g>
<defs>
<clipPath id="clip0_2228_2718">
<rect width="24" height="24" fill="none"/>
</clipPath>
</defs>
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
    'obi-sources-03-off': ObiSources03Off;
  }
}