import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-hydraulic-separator')
export class ObiHydraulicSeparator extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M2 4C2 2.89543 2.89543 2 4 2H20C21.1046 2 22 2.89543 22 4V6.01199H21V4C21 3.44772 20.5523 3 20 3H4C3.44772 3 3 3.44772 3 4V6.01199H2V4Z" fill="currentColor"/>
<path d="M21 9.99048H22V14.0418H21V9.99048Z" fill="currentColor"/>
<path d="M3 14.0418V9.99048H2V14.0418H3Z" fill="currentColor"/>
<path d="M21 18.0062H22V20C22 21.1046 21.1046 22 20 22H4C2.89543 22 2 21.1046 2 20V18.0062H3V20C3 20.5523 3.44772 21 4 21H20C20.5523 21 21 20.5523 21 20V18.0062Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M23 17.0083H1V15.0083H23V17.0083Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M23 8.99996L1 8.99996L1 6.99996L23 6.99996V8.99996Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M2 4C2 2.89543 2.89543 2 4 2H20C21.1046 2 22 2.89543 22 4V6.01199H21V4C21 3.44772 20.5523 3 20 3H4C3.44772 3 3 3.44772 3 4V6.01199H2V4Z" style="fill: var(--element-active-color)"/>
<path d="M21 9.99048H22V14.0418H21V9.99048Z" style="fill: var(--element-active-color)"/>
<path d="M3 14.0418V9.99048H2V14.0418H3Z" style="fill: var(--element-active-color)"/>
<path d="M21 18.0062H22V20C22 21.1046 21.1046 22 20 22H4C2.89543 22 2 21.1046 2 20V18.0062H3V20C3 20.5523 3.44772 21 4 21H20C20.5523 21 21 20.5523 21 20V18.0062Z" style="fill: var(--element-active-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M23 17.0083H1V15.0083H23V17.0083Z" style="fill: var(--element-active-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M23 8.99996L1 8.99996L1 6.99996L23 6.99996V8.99996Z" style="fill: var(--element-active-color)"/>
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
    'obi-hydraulic-separator': ObiHydraulicSeparator;
  }
}
