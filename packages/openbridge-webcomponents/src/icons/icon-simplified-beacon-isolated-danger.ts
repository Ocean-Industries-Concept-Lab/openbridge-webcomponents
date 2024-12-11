import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-simplified-beacon-isolated-danger')
export class ObiSimplifiedBeaconIsolatedDanger extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M16.5 6.5C16.5 8.98528 14.4853 11 12 11C9.51472 11 7.5 8.98528 7.5 6.5C7.5 4.01472 9.51472 2 12 2C14.4853 2 16.5 4.01472 16.5 6.5Z" fill="currentColor"/>
<path d="M16.5 17.5C16.5 19.9853 14.4853 22 12 22C9.51472 22 7.5 19.9853 7.5 17.5C7.5 15.0147 9.51472 13 12 13C14.4853 13 16.5 15.0147 16.5 17.5Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M12 10C13.933 10 15.5 8.433 15.5 6.5C15.5 4.567 13.933 3 12 3C10.067 3 8.5 4.567 8.5 6.5C8.5 8.433 10.067 10 12 10ZM12 11C14.4853 11 16.5 8.98528 16.5 6.5C16.5 4.01472 14.4853 2 12 2C9.51472 2 7.5 4.01472 7.5 6.5C7.5 8.98528 9.51472 11 12 11Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M12 21C13.933 21 15.5 19.433 15.5 17.5C15.5 15.567 13.933 14 12 14C10.067 14 8.5 15.567 8.5 17.5C8.5 19.433 10.067 21 12 21ZM12 22C14.4853 22 16.5 19.9853 16.5 17.5C16.5 15.0147 14.4853 13 12 13C9.51472 13 7.5 15.0147 7.5 17.5C7.5 19.9853 9.51472 22 12 22Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M16.5 6.5C16.5 8.98528 14.4853 11 12 11C9.51472 11 7.5 8.98528 7.5 6.5C7.5 4.01472 9.51472 2 12 2C14.4853 2 16.5 4.01472 16.5 6.5Z" style="fill: var(--navigation-light-red-color)"/>
<path d="M16.5 17.5C16.5 19.9853 14.4853 22 12 22C9.51472 22 7.5 19.9853 7.5 17.5C7.5 15.0147 9.51472 13 12 13C14.4853 13 16.5 15.0147 16.5 17.5Z" style="fill: var(--navigation-light-red-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M12 10C13.933 10 15.5 8.433 15.5 6.5C15.5 4.567 13.933 3 12 3C10.067 3 8.5 4.567 8.5 6.5C8.5 8.433 10.067 10 12 10ZM12 11C14.4853 11 16.5 8.98528 16.5 6.5C16.5 4.01472 14.4853 2 12 2C9.51472 2 7.5 4.01472 7.5 6.5C7.5 8.98528 9.51472 11 12 11Z" style="fill: var(--element-active-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M12 21C13.933 21 15.5 19.433 15.5 17.5C15.5 15.567 13.933 14 12 14C10.067 14 8.5 15.567 8.5 17.5C8.5 19.433 10.067 21 12 21ZM12 22C14.4853 22 16.5 19.9853 16.5 17.5C16.5 15.0147 14.4853 13 12 13C9.51472 13 7.5 15.0147 7.5 17.5C7.5 19.9853 9.51472 22 12 22Z" style="fill: var(--element-active-color)"/>
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
    'obi-simplified-beacon-isolated-danger': ObiSimplifiedBeaconIsolatedDanger;
  }
}
