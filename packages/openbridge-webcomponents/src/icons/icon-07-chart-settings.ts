import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-07-chart-settings')
export class Obi07ChartSettings extends LitElement {
  @property({type: Number}) size = 24;
  @property({type: Boolean, attribute: 'use-css-color'}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M22 4.3V10.9378C21.5285 10.4358 20.9637 10.0223 20.3333 9.72503V5.15L16.3889 6.5V9.43915C15.7823 9.62347 15.2201 9.90979 14.7222 10.2781V6.5L9.27778 4.85V17.475L11.2327 18.0674L10.0785 19.2216L8.36111 18.675L3.38889 20.45C3.07407 20.6 2.76389 20.5917 2.45833 20.425C2.15278 20.2583 2 20.0083 2 19.675V5.725C2 5.50833 2.06944 5.31667 2.20833 5.15C2.34722 4.98333 2.52778 4.85833 2.75 4.775L8.36111 3L15.6667 5.3L20.6111 3.525C20.9259 3.39167 21.2361 3.40417 21.5417 3.5625C21.8472 3.72083 22 3.96667 22 4.3ZM3.66667 18.825L7.61111 17.475V4.85L3.66667 6.025V18.825Z" fill="currentColor"/>
<path d="M14.7547 16.1192C14.1655 14.8695 14.2877 13.3325 15.2228 12.1849C16.2819 10.8851 18.0464 10.5011 19.5154 11.1135L17.2731 13.8653L18.9242 15.2106L21.1664 12.4588C22.0639 13.7844 22.0432 15.5795 20.9841 16.8792C20.049 18.0268 18.5683 18.4571 17.2255 18.1324L13.9718 22.1255C13.781 22.3597 13.4516 22.3933 13.2174 22.2025L11.578 20.8667C11.3439 20.6758 11.3103 20.3464 11.501 20.1123L14.7547 16.1192Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M22 4.3V10.9378C21.5285 10.4358 20.9637 10.0223 20.3333 9.72503V5.15L16.3889 6.5V9.43915C15.7823 9.62347 15.2201 9.90979 14.7222 10.2781V6.5L9.27778 4.85V17.475L11.2327 18.0674L10.0785 19.2216L8.36111 18.675L3.38889 20.45C3.07407 20.6 2.76389 20.5917 2.45833 20.425C2.15278 20.2583 2 20.0083 2 19.675V5.725C2 5.50833 2.06944 5.31667 2.20833 5.15C2.34722 4.98333 2.52778 4.85833 2.75 4.775L8.36111 3L15.6667 5.3L20.6111 3.525C20.9259 3.39167 21.2361 3.40417 21.5417 3.5625C21.8472 3.72083 22 3.96667 22 4.3ZM3.66667 18.825L7.61111 17.475V4.85L3.66667 6.025V18.825Z" style="fill: var(--element-active-color)"/>
<path d="M14.7547 16.1192C14.1655 14.8695 14.2877 13.3325 15.2228 12.1849C16.2819 10.8851 18.0464 10.5011 19.5154 11.1135L17.2731 13.8653L18.9242 15.2106L21.1664 12.4588C22.0639 13.7844 22.0432 15.5795 20.9841 16.8792C20.049 18.0268 18.5683 18.4571 17.2255 18.1324L13.9718 22.1255C13.781 22.3597 13.4516 22.3933 13.2174 22.2025L11.578 20.8667C11.3439 20.6758 11.3103 20.3464 11.501 20.1123L14.7547 16.1192Z" style="fill: var(--element-active-color)"/>
</svg>
`;

  override render() {
    return html`
      <div class="wrapper" style="--size:${this.size}px">
        ${this.useCssColor ? this.iconCss : this.icon}
      </div>
    `;
  }

  static override styles = css`
    .wrapper {
      height: var(--size);
      width: var(--size);
    }
    .wrapper > * {
      height: 100%;
      width: 100%;
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    'obi-07-chart-settings': Obi07ChartSettings;
  }
}
