import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-07-voyages')
export class Obi07Voyages extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M18 7.5C19.6569 7.5 21 6.15685 21 4.5C21 2.84315 19.6569 1.5 18 1.5C16.3431 1.5 15 2.84315 15 4.5C15 6.15685 16.3431 7.5 18 7.5ZM18 6C18.8284 6 19.5 5.32843 19.5 4.5C19.5 3.67157 18.8284 3 18 3C17.1716 3 16.5 3.67157 16.5 4.5C16.5 5.32843 17.1716 6 18 6Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M10.3333 21C13 21 15 18.5 15 18.5C15 18.5 13 16 10.3333 16H3V21H10.3333ZM12.8325 18.5C12.8108 18.4833 12.7889 18.4667 12.7667 18.45C12.0564 17.9173 11.2051 17.5 10.3333 17.5H4.5V19.5H10.3333C11.2051 19.5 12.0564 19.0827 12.7667 18.55C12.7889 18.5333 12.8108 18.5167 12.8325 18.5Z" fill="currentColor"/>
<path d="M3.75 8C3.75 6.48122 4.98122 5.25 6.5 5.25H13V3.75H6.5C4.15279 3.75 2.25 5.65279 2.25 8C2.25 10.3472 4.15279 12.25 6.5 12.25H17.5C19.0188 12.25 20.25 13.4812 20.25 15C20.25 16.5188 19.0188 17.75 17.5 17.75H17V19.25H17.5C19.8472 19.25 21.75 17.3472 21.75 15C21.75 12.6528 19.8472 10.75 17.5 10.75H6.5C4.98122 10.75 3.75 9.51878 3.75 8Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M18 7.5C19.6569 7.5 21 6.15685 21 4.5C21 2.84315 19.6569 1.5 18 1.5C16.3431 1.5 15 2.84315 15 4.5C15 6.15685 16.3431 7.5 18 7.5ZM18 6C18.8284 6 19.5 5.32843 19.5 4.5C19.5 3.67157 18.8284 3 18 3C17.1716 3 16.5 3.67157 16.5 4.5C16.5 5.32843 17.1716 6 18 6Z" style="fill: var(--element-active-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M10.3333 21C13 21 15 18.5 15 18.5C15 18.5 13 16 10.3333 16H3V21H10.3333ZM12.8325 18.5C12.8108 18.4833 12.7889 18.4667 12.7667 18.45C12.0564 17.9173 11.2051 17.5 10.3333 17.5H4.5V19.5H10.3333C11.2051 19.5 12.0564 19.0827 12.7667 18.55C12.7889 18.5333 12.8108 18.5167 12.8325 18.5Z" style="fill: var(--element-active-color)"/>
<path d="M3.75 8C3.75 6.48122 4.98122 5.25 6.5 5.25H13V3.75H6.5C4.15279 3.75 2.25 5.65279 2.25 8C2.25 10.3472 4.15279 12.25 6.5 12.25H17.5C19.0188 12.25 20.25 13.4812 20.25 15C20.25 16.5188 19.0188 17.75 17.5 17.75H17V19.25H17.5C19.8472 19.25 21.75 17.3472 21.75 15C21.75 12.6528 19.8472 10.75 17.5 10.75H6.5C4.98122 10.75 3.75 9.51878 3.75 8Z" style="fill: var(--element-active-color)"/>
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
    'obi-07-voyages': Obi07Voyages;
  }
}
