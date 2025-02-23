import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-latched')
export class ObiLatched extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M8.35986 12C8.35986 13.6569 7.01672 15 5.35986 15C3.70301 15 2.35986 13.6569 2.35986 12C2.35986 10.3431 3.70301 9 5.35986 9C7.01672 9 8.35986 10.3431 8.35986 12Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M4.35986 11H12.3599V13H4.35986V11Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M22.3599 13H15.3599V11H22.3599V13Z" fill="currentColor"/>
<path d="M15.3599 9C13.703 9 12.3599 10.3431 12.3599 12V13H10.3599V12C10.3599 9.23858 12.5984 7 15.3599 7C17.4102 7 19.1723 8.2341 19.9438 10H17.596C17.0466 9.38625 16.2484 9 15.3599 9Z" fill="currentColor"/>
<path d="M17.596 14C17.0466 14.6137 16.2484 15 15.3599 15C14.8076 15 14.3599 15.4477 14.3599 16C14.3599 16.5523 14.8076 17 15.3599 17C17.4102 17 19.1723 15.7659 19.9438 14H17.596Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M8.35986 12C8.35986 13.6569 7.01672 15 5.35986 15C3.70301 15 2.35986 13.6569 2.35986 12C2.35986 10.3431 3.70301 9 5.35986 9C7.01672 9 8.35986 10.3431 8.35986 12Z" style="fill: var(--element-active-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M4.35986 11H12.3599V13H4.35986V11Z" style="fill: var(--element-active-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M22.3599 13H15.3599V11H22.3599V13Z" style="fill: var(--element-active-color)"/>
<path d="M15.3599 9C13.703 9 12.3599 10.3431 12.3599 12V13H10.3599V12C10.3599 9.23858 12.5984 7 15.3599 7C17.4102 7 19.1723 8.2341 19.9438 10H17.596C17.0466 9.38625 16.2484 9 15.3599 9Z" style="fill: var(--element-active-color)"/>
<path d="M17.596 14C17.0466 14.6137 16.2484 15 15.3599 15C14.8076 15 14.3599 15.4477 14.3599 16C14.3599 16.5523 14.8076 17 15.3599 17C17.4102 17 19.1723 15.7659 19.9438 14H17.596Z" style="fill: var(--element-active-color)"/>
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
    'obi-latched': ObiLatched;
  }
}
