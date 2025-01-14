import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-clear-night-colour')
export class ObiClearNightColour extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="32" height="32" viewBox="0 0 32 32" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M6.34426 20.701C12.4619 20.701 17.4212 15.6558 17.4212 9.43239C17.4212 8.02214 17.1665 6.67243 16.7014 5.4282C16.4167 4.66633 16.9837 3.7916 17.7182 4.04446C22.1404 5.56677 25.3333 9.92621 25.3333 15.0667C25.3333 21.4732 20.3739 26.6667 14.2563 26.6667C10.6978 26.6667 7.53111 24.9093 5.50454 22.1782C5.03864 21.5503 5.59128 20.701 6.34426 20.701Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M6.34426 20.701C12.4619 20.701 17.4212 15.6558 17.4212 9.43239C17.4212 8.02214 17.1665 6.67243 16.7014 5.4282C16.4167 4.66633 16.9837 3.7916 17.7182 4.04446C22.1404 5.56677 25.3333 9.92621 25.3333 15.0667C25.3333 21.4732 20.3739 26.6667 14.2563 26.6667C10.6978 26.6667 7.53111 24.9093 5.50454 22.1782C5.03864 21.5503 5.59128 20.701 6.34426 20.701Z" style="fill: var(--data-weather-moon-primary-color)"/>
</svg>
`;

  override render() {
    return html`
      <div class="wrapper" >
        ${this.useCssColor? this.iconCss : this.icon}
      </div>
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
    'obi-clear-night-colour': ObiClearNightColour;
  }
}