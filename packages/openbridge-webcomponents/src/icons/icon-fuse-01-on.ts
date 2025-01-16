import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-fuse-01-on')
export class ObiFuse01On extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_2268_82)">
<path d="M19 7H5V11H19V7Z" fill="currentColor"/>
<path d="M19 17V13H5V17H19Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M4 11H0V13H4V17C4 17.5523 4.44772 18 5 18H19C19.5523 18 20 17.5523 20 17V13H24V11H20V7C20 6.44772 19.5523 6 19 6H5C4.44772 6 4 6.44772 4 7V11ZM5 7H19V11H5V7ZM19 13V17H5V13H19Z" fill="currentColor"/>
</g>
<defs>
<clipPath id="clip0_2268_82">
<rect width="24" height="24" fill="currentColor"/>
</clipPath>
</defs>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_2268_82)">
<path d="M19 7H5V11H19V7Z" style="fill: var(--automation-device-primary-color)"/>
<path d="M19 17V13H5V17H19Z" style="fill: var(--automation-device-primary-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M4 11H0V13H4V17C4 17.5523 4.44772 18 5 18H19C19.5523 18 20 17.5523 20 17V13H24V11H20V7C20 6.44772 19.5523 6 19 6H5C4.44772 6 4 6.44772 4 7V11ZM5 7H19V11H5V7ZM19 13V17H5V13H19Z" style="fill: var(--automation-device-tertiary-color)"/>
</g>
<defs>
<clipPath id="clip0_2268_82">
<rect width="24" height="24" style="fill: var(--automation-device-primary-color)"/>
</clipPath>
</defs>
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
    'obi-fuse-01-on': ObiFuse01On;
  }
}
