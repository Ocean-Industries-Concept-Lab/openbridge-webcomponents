import {LitElement, html, css, svg} from 'lit';
import {property} from 'lit/decorators.js';
import {customElement} from '../decorator.js';

@customElement('obi-vessel-type-fishing-filled')
export class ObiVesselTypeFishingFilled extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M12 1.53027C15.2914 2.70147 17.4999 5.81861 17.5 9.32422V21.5H6.5V9.32422C6.50014 5.81861 8.7086 2.70147 12 1.53027Z" fill="currentColor" stroke="black"/>
<path d="M10.0417 13.875C9.68056 13.1139 9.5 12.3222 9.5 11.5C9.5 10.6222 9.69097 9.77778 10.0729 8.96667C10.4549 8.15556 11.0972 7.5 12 7C12.9028 7.5 13.5451 8.15556 13.9271 8.96667C14.309 9.77778 14.5 10.6222 14.5 11.5C14.5 12.3222 14.3056 13.1083 13.9167 13.8583C13.5278 14.6083 12.9722 15.2778 12.25 15.8667C12.8472 15.9333 13.3021 16.1778 13.6146 16.6C13.9271 17.0222 14.0833 17.4889 14.0833 18H9.91667C9.91667 17.4889 10.0694 17.0222 10.375 16.6C10.6806 16.1778 11.125 15.9333 11.7083 15.8667C10.9583 15.3 10.4028 14.6361 10.0417 13.875Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M6 9.32455V22H18V9.32455C18 5.54759 15.5831 2.19438 12 1C8.41686 2.19438 6 5.54759 6 9.32455ZM16.5 9.32455V20.5H7.5V9.32455C7.5 6.36296 9.2924 3.71562 12 2.59958C14.7076 3.71562 16.5 6.36296 16.5 9.32455Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M12 1.53027C15.2914 2.70147 17.4999 5.81861 17.5 9.32422V21.5H6.5V9.32422C6.50014 5.81861 8.7086 2.70147 12 1.53027Z" style="fill: var(--element-active-inverted-color)" stroke="currentColor"/>
<path d="M10.0417 13.875C9.68056 13.1139 9.5 12.3222 9.5 11.5C9.5 10.6222 9.69097 9.77778 10.0729 8.96667C10.4549 8.15556 11.0972 7.5 12 7C12.9028 7.5 13.5451 8.15556 13.9271 8.96667C14.309 9.77778 14.5 10.6222 14.5 11.5C14.5 12.3222 14.3056 13.1083 13.9167 13.8583C13.5278 14.6083 12.9722 15.2778 12.25 15.8667C12.8472 15.9333 13.3021 16.1778 13.6146 16.6C13.9271 17.0222 14.0833 17.4889 14.0833 18H9.91667C9.91667 17.4889 10.0694 17.0222 10.375 16.6C10.6806 16.1778 11.125 15.9333 11.7083 15.8667C10.9583 15.3 10.4028 14.6361 10.0417 13.875Z" style="fill: var(--element-active-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M6 9.32455V22H18V9.32455C18 5.54759 15.5831 2.19438 12 1C8.41686 2.19438 6 5.54759 6 9.32455ZM16.5 9.32455V20.5H7.5V9.32455C7.5 6.36296 9.2924 3.71562 12 2.59958C14.7076 3.71562 16.5 6.36296 16.5 9.32455Z" style="fill: var(--element-active-color)"/>
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
    'obi-vessel-type-fishing-filled': ObiVesselTypeFishingFilled;
  }
}
