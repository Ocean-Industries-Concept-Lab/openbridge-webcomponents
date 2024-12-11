import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-whale')
export class ObiWhale extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M21 18.0004C19.97 18.0004 18.94 17.7504 18 17.2504C16.11 18.2504 13.89 18.2504 12 17.2504C10.11 18.2504 7.89 18.2504 6 17.2504C5.05 17.7504 4.03 18.0004 3 18.0004H2V16.0004H3C3.68364 16.0004 4.36195 15.8491 5.01151 15.5609C5.31146 15.4317 6 15.0004 6 15.0004C6 15.0004 6.6857 15.4284 6.98565 15.5576C8.27272 16.1128 9.70171 16.115 10.9905 15.5666C11.2905 15.4374 12 15.0004 12 15.0004C12 15.0004 12.7096 15.4374 13.0095 15.5666C14.2964 16.1142 15.7231 16.1116 17.0086 15.5588C17.3086 15.4296 17.9994 15.0077 17.9994 15.0077C17.9994 15.0077 18.6879 15.4357 18.9878 15.5649C19.6348 15.8505 20.3196 16.0004 21 16.0004H22V18.0004H21Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M16.4977 10.7457C18.5466 10.2657 20.7742 9.74384 20.9839 4.78706C20.9942 4.54407 20.668 4.42379 20.4935 4.59326C19.3929 5.66254 18.0162 5.75739 16.6552 5.85116C14.8474 5.97571 13.0676 6.09834 12 8.50036C10.9324 6.09834 9.15256 5.97571 7.34476 5.85116C5.98382 5.75739 4.60705 5.66254 3.50647 4.59326C3.33203 4.42379 3.00631 4.54233 3.01766 4.78527C3.23433 9.42262 5.40645 10.0092 7.43004 10.5556C8.88191 10.9476 10.7573 11.8191 10.7792 14.1511C10.8571 14.1219 10.9346 14.0907 11.0115 14.0576C11.3115 13.9284 12 13.5004 12 13.5004C12 13.5004 12.6885 13.9284 12.9885 14.0576C13.0666 14.0912 13.1452 14.1228 13.2243 14.1524C13.2401 11.8917 15.0759 11.0788 16.4977 10.7457Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M21 18.0004C19.97 18.0004 18.94 17.7504 18 17.2504C16.11 18.2504 13.89 18.2504 12 17.2504C10.11 18.2504 7.89 18.2504 6 17.2504C5.05 17.7504 4.03 18.0004 3 18.0004H2V16.0004H3C3.68364 16.0004 4.36195 15.8491 5.01151 15.5609C5.31146 15.4317 6 15.0004 6 15.0004C6 15.0004 6.6857 15.4284 6.98565 15.5576C8.27272 16.1128 9.70171 16.115 10.9905 15.5666C11.2905 15.4374 12 15.0004 12 15.0004C12 15.0004 12.7096 15.4374 13.0095 15.5666C14.2964 16.1142 15.7231 16.1116 17.0086 15.5588C17.3086 15.4296 17.9994 15.0077 17.9994 15.0077C17.9994 15.0077 18.6879 15.4357 18.9878 15.5649C19.6348 15.8505 20.3196 16.0004 21 16.0004H22V18.0004H21Z" style="fill: var(--element-active-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M16.4977 10.7457C18.5466 10.2657 20.7742 9.74384 20.9839 4.78706C20.9942 4.54407 20.668 4.42379 20.4935 4.59326C19.3929 5.66254 18.0162 5.75739 16.6552 5.85116C14.8474 5.97571 13.0676 6.09834 12 8.50036C10.9324 6.09834 9.15256 5.97571 7.34476 5.85116C5.98382 5.75739 4.60705 5.66254 3.50647 4.59326C3.33203 4.42379 3.00631 4.54233 3.01766 4.78527C3.23433 9.42262 5.40645 10.0092 7.43004 10.5556C8.88191 10.9476 10.7573 11.8191 10.7792 14.1511C10.8571 14.1219 10.9346 14.0907 11.0115 14.0576C11.3115 13.9284 12 13.5004 12 13.5004C12 13.5004 12.6885 13.9284 12.9885 14.0576C13.0666 14.0912 13.1452 14.1228 13.2243 14.1524C13.2401 11.8917 15.0759 11.0788 16.4977 10.7457Z" style="fill: var(--element-active-color)"/>
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
    'obi-whale': ObiWhale;
  }
}
