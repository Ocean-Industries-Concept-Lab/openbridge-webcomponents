import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-03-volume-high')
export class Obi03VolumeHigh extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M14 20.7251V18.6751C15.5 18.2418 16.7083 17.4084 17.625 16.1751C18.5417 14.9418 19 13.5418 19 11.9751C19 10.4084 18.5417 9.00843 17.625 7.7751C16.7083 6.54176 15.5 5.70843 14 5.2751V3.2251C16.0667 3.69176 17.75 4.73743 19.05 6.3621C20.35 7.98743 21 9.85843 21 11.9751C21 14.0918 20.35 15.9624 19.05 17.5871C17.75 19.2124 16.0667 20.2584 14 20.7251ZM3 15.0001V9.0001H7L12 4.0001V20.0001L7 15.0001H3ZM14 16.0001V7.9501C14.7833 8.31676 15.396 8.86677 15.838 9.6001C16.2793 10.3334 16.5 11.1334 16.5 12.0001C16.5 12.8501 16.2793 13.6374 15.838 14.3621C15.396 15.0874 14.7833 15.6334 14 16.0001Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M14 20.7251V18.6751C15.5 18.2418 16.7083 17.4084 17.625 16.1751C18.5417 14.9418 19 13.5418 19 11.9751C19 10.4084 18.5417 9.00843 17.625 7.7751C16.7083 6.54176 15.5 5.70843 14 5.2751V3.2251C16.0667 3.69176 17.75 4.73743 19.05 6.3621C20.35 7.98743 21 9.85843 21 11.9751C21 14.0918 20.35 15.9624 19.05 17.5871C17.75 19.2124 16.0667 20.2584 14 20.7251ZM3 15.0001V9.0001H7L12 4.0001V20.0001L7 15.0001H3ZM14 16.0001V7.9501C14.7833 8.31676 15.396 8.86677 15.838 9.6001C16.2793 10.3334 16.5 11.1334 16.5 12.0001C16.5 12.8501 16.2793 13.6374 15.838 14.3621C15.396 15.0874 14.7833 15.6334 14 16.0001Z" style="fill: var(--element-active-color)"/>
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
    'obi-03-volume-high': Obi03VolumeHigh;
  }
}
