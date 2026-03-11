import {LitElement, html, css, svg} from 'lit';
import {property} from 'lit/decorators.js';
import {customElement} from '../decorator.js';

@customElement('obi-current-2')
export class ObiCurrent2 extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M15.293 17.2931C15.6835 16.9026 16.3166 16.9026 16.7071 17.2931C17.0976 17.6836 17.0976 18.3166 16.7071 18.7072L12.7774 22.6368C12.3479 23.0659 11.6522 23.0659 11.2227 22.6368L7.29302 18.7072C6.90249 18.3166 6.90249 17.6836 7.29302 17.2931C7.68354 16.9026 8.31655 16.9026 8.70708 17.2931L12 20.5861L15.293 17.2931Z" fill="currentColor"/>
<path d="M15.293 12.2931C15.6835 11.9026 16.3166 11.9026 16.7071 12.2931C17.0976 12.6836 17.0976 13.3166 16.7071 13.7072L12.7774 17.6368C12.3479 18.0659 11.6522 18.0659 11.2227 17.6368L7.29302 13.7072C6.90249 13.3166 6.90249 12.6836 7.29302 12.2931C7.68354 11.9026 8.31655 11.9026 8.70708 12.2931L12 15.5861L15.293 12.2931Z" fill="currentColor"/>
<path d="M11 12.0001L11 2.00012C11 1.44784 11.4478 1.00012 12 1.00012C12.5523 1.00012 13 1.44784 13 2.00012L13 12.0001C13 12.5524 12.5523 13.0001 12 13.0001C11.4478 13.0001 11 12.5524 11 12.0001Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M15.293 17.2931C15.6835 16.9026 16.3166 16.9026 16.7071 17.2931C17.0976 17.6836 17.0976 18.3166 16.7071 18.7072L12.7774 22.6368C12.3479 23.0659 11.6522 23.0659 11.2227 22.6368L7.29302 18.7072C6.90249 18.3166 6.90249 17.6836 7.29302 17.2931C7.68354 16.9026 8.31655 16.9026 8.70708 17.2931L12 20.5861L15.293 17.2931Z" style="fill: var(--element-active-color)"/>
<path d="M15.293 12.2931C15.6835 11.9026 16.3166 11.9026 16.7071 12.2931C17.0976 12.6836 17.0976 13.3166 16.7071 13.7072L12.7774 17.6368C12.3479 18.0659 11.6522 18.0659 11.2227 17.6368L7.29302 13.7072C6.90249 13.3166 6.90249 12.6836 7.29302 12.2931C7.68354 11.9026 8.31655 11.9026 8.70708 12.2931L12 15.5861L15.293 12.2931Z" style="fill: var(--element-active-color)"/>
<path d="M11 12.0001L11 2.00012C11 1.44784 11.4478 1.00012 12 1.00012C12.5523 1.00012 13 1.44784 13 2.00012L13 12.0001C13 12.5524 12.5523 13.0001 12 13.0001C11.4478 13.0001 11 12.5524 11 12.0001Z" style="fill: var(--element-active-color)"/>
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
    'obi-current-2': ObiCurrent2;
  }
}
