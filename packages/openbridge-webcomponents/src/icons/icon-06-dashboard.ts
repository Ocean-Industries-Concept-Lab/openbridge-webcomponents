import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-06-dashboard')
export class Obi06Dashboard extends LitElement {
  @property({type: Boolean, attribute: 'use-css-color'}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M11 21H5C3.9 21 3 20.1 3 19V5C3 3.9 3.9 3 5 3H11V21ZM13 21H19C20.1 21 21 20.1 21 19V12H13V21ZM21 10V5C21 3.9 20.1 3 19 3H13V10H21Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M11 21H5C3.9 21 3 20.1 3 19V5C3 3.9 3.9 3 5 3H11V21ZM13 21H19C20.1 21 21 20.1 21 19V12H13V21ZM21 10V5C21 3.9 20.1 3 19 3H13V10H21Z" style="fill: var(--element-active-color)"/>
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
    }
    .wrapper > * {
      height: 100%;
      width: 100%;
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    'obi-06-dashboard': Obi06Dashboard;
  }
}
