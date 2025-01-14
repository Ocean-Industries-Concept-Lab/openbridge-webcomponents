import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-volume-off')
export class ObiVolumeOff extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M11 6.41406L7.41421 9.99985H4V13.9998H7.41421L11 17.5856V6.41406Z" fill="currentColor"/>
<path d="M14 20.7246V18.6746C15.5 18.2413 16.7083 17.4079 17.625 16.1746C18.5417 14.9413 19 13.5413 19 11.9746C19 10.4079 18.5417 9.00794 17.625 7.77461C16.7083 6.54128 15.5 5.70794 14 5.27461V3.22461C16.0667 3.69128 17.75 4.73694 19.05 6.36161C20.35 7.98694 21 9.85794 21 11.9746C21 14.0913 20.35 15.9619 19.05 17.5866C17.75 19.2119 16.0667 20.2579 14 20.7246Z" fill="currentColor"/>
<path d="M14 15.9996V7.94961C14.7833 8.31628 15.396 8.86628 15.838 9.59961C16.2793 10.3329 16.5 11.1329 16.5 11.9996C16.5 12.8496 16.2793 13.6369 15.838 14.3616C15.396 15.0869 14.7833 15.6329 14 15.9996Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M3 9H7L12 4V20L7 15H3V9ZM7.41421 10L11 6.41421V17.5858L7.41421 14H4V10H7.41421Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M11 6.41406L7.41421 9.99985H4V13.9998H7.41421L11 17.5856V6.41406Z" style="fill: var(--automation-device-primary-inverted-color)"/>
<path d="M14 20.7246V18.6746C15.5 18.2413 16.7083 17.4079 17.625 16.1746C18.5417 14.9413 19 13.5413 19 11.9746C19 10.4079 18.5417 9.00794 17.625 7.77461C16.7083 6.54128 15.5 5.70794 14 5.27461V3.22461C16.0667 3.69128 17.75 4.73694 19.05 6.36161C20.35 7.98694 21 9.85794 21 11.9746C21 14.0913 20.35 15.9619 19.05 17.5866C17.75 19.2119 16.0667 20.2579 14 20.7246Z" style="fill: var(--undefined)"/>
<path d="M14 15.9996V7.94961C14.7833 8.31628 15.396 8.86628 15.838 9.59961C16.2793 10.3329 16.5 11.1329 16.5 11.9996C16.5 12.8496 16.2793 13.6369 15.838 14.3616C15.396 15.0869 14.7833 15.6329 14 15.9996Z" style="fill: var(--undefined)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M3 9H7L12 4V20L7 15H3V9ZM7.41421 10L11 6.41421V17.5858L7.41421 14H4V10H7.41421Z" style="fill: var(--undefined)"/>
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
    'obi-volume-off': ObiVolumeOff;
  }
}