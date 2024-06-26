import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-10-monotoring-route')
export class Obi10MonotoringRoute extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M9.95455 7C9.95455 5.89333 10.8682 5 12 5C13.1318 5 14.0455 5.89333 14.0455 7C14.0455 8.10667 13.1318 9 12 9C10.8682 9 9.95455 8.10667 9.95455 7Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M4.5 7C5.67955 4.07333 8.59091 2 12 2C15.4091 2 18.3205 4.07333 19.5 7C18.3205 9.92667 15.4091 12 12 12C8.59091 12 5.67955 9.92667 4.5 7ZM8.59091 7C8.59091 8.84 10.1182 10.3333 12 10.3333C13.8818 10.3333 15.4091 8.84 15.4091 7C15.4091 5.16 13.8818 3.66667 12 3.66667C10.1182 3.66667 8.59091 5.16 8.59091 7Z" fill="currentColor"/>
<path d="M8 14L12 19L16 14H8Z" fill="currentColor"/>
<path d="M2 22H4.22222V20H2V22Z" fill="currentColor"/>
<path d="M6.44444 22H10.8889V20H6.44444V22Z" fill="currentColor"/>
<path d="M13.1111 22H17.5556V20H13.1111V22Z" fill="currentColor"/>
<path d="M19.7778 22H22V20H19.7778V22Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M9.95455 7C9.95455 5.89333 10.8682 5 12 5C13.1318 5 14.0455 5.89333 14.0455 7C14.0455 8.10667 13.1318 9 12 9C10.8682 9 9.95455 8.10667 9.95455 7Z" style="fill: var(--element-active-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M4.5 7C5.67955 4.07333 8.59091 2 12 2C15.4091 2 18.3205 4.07333 19.5 7C18.3205 9.92667 15.4091 12 12 12C8.59091 12 5.67955 9.92667 4.5 7ZM8.59091 7C8.59091 8.84 10.1182 10.3333 12 10.3333C13.8818 10.3333 15.4091 8.84 15.4091 7C15.4091 5.16 13.8818 3.66667 12 3.66667C10.1182 3.66667 8.59091 5.16 8.59091 7Z" style="fill: var(--element-active-color)"/>
<path d="M8 14L12 19L16 14H8Z" style="fill: var(--element-active-color)"/>
<path d="M2 22H4.22222V20H2V22Z" style="fill: var(--element-active-color)"/>
<path d="M6.44444 22H10.8889V20H6.44444V22Z" style="fill: var(--element-active-color)"/>
<path d="M13.1111 22H17.5556V20H13.1111V22Z" style="fill: var(--element-active-color)"/>
<path d="M19.7778 22H22V20H19.7778V22Z" style="fill: var(--element-active-color)"/>
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
    'obi-10-monotoring-route': Obi10MonotoringRoute;
  }
}
