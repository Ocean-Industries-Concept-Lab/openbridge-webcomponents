import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-simplified-simplified-buoy-isolated-danger')
export class ObiSimplifiedSimplifiedBuoyIsolatedDanger extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M18 7C18 9.20914 16.2091 11 14 11C11.7909 11 10 9.20914 10 7C10 4.79086 11.7909 3 14 3C16.2091 3 18 4.79086 18 7Z" fill="currentColor"/>
<path d="M14 17C14 19.2091 12.2091 21 10 21C7.79086 21 6 19.2091 6 17C6 14.7909 7.79086 13 10 13C12.2091 13 14 14.7909 14 17Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M14 10C15.6569 10 17 8.65685 17 7C17 5.34315 15.6569 4 14 4C12.3431 4 11 5.34315 11 7C11 8.65685 12.3431 10 14 10ZM10 20C11.6569 20 13 18.6569 13 17C13 15.3431 11.6569 14 10 14C8.34315 14 7 15.3431 7 17C7 18.6569 8.34315 20 10 20ZM14 11C16.2091 11 18 9.20914 18 7C18 4.79086 16.2091 3 14 3C11.7909 3 10 4.79086 10 7C10 9.20914 11.7909 11 14 11ZM10 21C12.2091 21 14 19.2091 14 17C14 14.7909 12.2091 13 10 13C7.79086 13 6 14.7909 6 17C6 19.2091 7.79086 21 10 21Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M18 7C18 9.20914 16.2091 11 14 11C11.7909 11 10 9.20914 10 7C10 4.79086 11.7909 3 14 3C16.2091 3 18 4.79086 18 7Z" style="fill: var(--navigation-light-red-color)"/>
<path d="M14 17C14 19.2091 12.2091 21 10 21C7.79086 21 6 19.2091 6 17C6 14.7909 7.79086 13 10 13C12.2091 13 14 14.7909 14 17Z" style="fill: var(--navigation-light-red-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M14 10C15.6569 10 17 8.65685 17 7C17 5.34315 15.6569 4 14 4C12.3431 4 11 5.34315 11 7C11 8.65685 12.3431 10 14 10ZM10 20C11.6569 20 13 18.6569 13 17C13 15.3431 11.6569 14 10 14C8.34315 14 7 15.3431 7 17C7 18.6569 8.34315 20 10 20ZM14 11C16.2091 11 18 9.20914 18 7C18 4.79086 16.2091 3 14 3C11.7909 3 10 4.79086 10 7C10 9.20914 11.7909 11 14 11ZM10 21C12.2091 21 14 19.2091 14 17C14 14.7909 12.2091 13 10 13C7.79086 13 6 14.7909 6 17C6 19.2091 7.79086 21 10 21Z" style="fill: var(--element-active-color)"/>
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
    'obi-simplified-simplified-buoy-isolated-danger': ObiSimplifiedSimplifiedBuoyIsolatedDanger;
  }
}
