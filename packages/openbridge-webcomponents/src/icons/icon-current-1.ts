import {LitElement, html, css, svg} from 'lit';
import {property} from 'lit/decorators.js';
import {customElement} from '../decorator.js';

@customElement('obi-current-1')
export class ObiCurrent1 extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M11 17.0001L11 2.00012C11 1.44784 11.4477 1.00012 12 1.00012C12.5523 1.00012 13 1.44784 13 2.00012L13 17.0001C13 17.5524 12.5523 18.0001 12 18.0001C11.4477 18.0001 11 17.5524 11 17.0001Z" fill="currentColor"/>
<path d="M15.293 17.2931C15.6835 16.9026 16.3165 16.9026 16.707 17.2931C17.0976 17.6836 17.0976 18.3166 16.707 18.7072L12.7774 22.6368C12.3479 23.0659 11.6522 23.0659 11.2227 22.6368L7.29298 18.7072C6.90246 18.3166 6.90246 17.6836 7.29298 17.2931C7.68351 16.9026 8.31652 16.9026 8.70705 17.2931L12 20.5861L15.293 17.2931Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M11 17.0001L11 2.00012C11 1.44784 11.4477 1.00012 12 1.00012C12.5523 1.00012 13 1.44784 13 2.00012L13 17.0001C13 17.5524 12.5523 18.0001 12 18.0001C11.4477 18.0001 11 17.5524 11 17.0001Z" style="fill: var(--element-active-color)"/>
<path d="M15.293 17.2931C15.6835 16.9026 16.3165 16.9026 16.707 17.2931C17.0976 17.6836 17.0976 18.3166 16.707 18.7072L12.7774 22.6368C12.3479 23.0659 11.6522 23.0659 11.2227 22.6368L7.29298 18.7072C6.90246 18.3166 6.90246 17.6836 7.29298 17.2931C7.68351 16.9026 8.31652 16.9026 8.70705 17.2931L12 20.5861L15.293 17.2931Z" style="fill: var(--element-active-color)"/>
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
    'obi-current-1': ObiCurrent1;
  }
}
