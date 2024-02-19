import {LitElement, html, css, svg, unsafeCSS} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-19-weather')
export class Obi19Weather extends LitElement {
  @property({type: Boolean, attribute: 'use-css-color'}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M14.3635 2H15.6362V3.88584H14.3635V2Z" fill="currentColor"/>
<path d="M20.3771 4.49955L19.4798 3.59818L18.3407 4.74247L19.238 5.64384L20.3771 4.49955Z" fill="currentColor"/>
<path d="M20.0907 8.36073V9.63927H21.9998V8.36073H20.0907Z" fill="currentColor"/>
<path d="M18.3344 13.2575L19.4735 14.4082L20.3707 13.5068L19.2253 12.3625L18.3344 13.2575Z" fill="currentColor"/>
<path d="M10.5198 3.59818L11.6653 4.74247L10.7616 5.64384L9.62256 4.49955L10.5198 3.59818Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M14.9998 5.25C13.7735 5.25 12.6847 5.83862 12.0005 6.74873C11.4013 6.41801 10.731 6.25 10 6.25C9.14998 6.25 8.36257 6.49139 7.65605 6.96721C6.96929 7.42972 6.45816 8.05397 6.12778 8.82143H6.03447L6.02189 8.82185C4.97269 8.85708 4.06626 9.2668 3.34147 10.0299C2.61645 10.7933 2.25 11.7257 2.25 12.7857C2.25 13.8617 2.62453 14.806 3.36505 15.5768C4.10651 16.3485 5.02761 16.75 6.08824 16.75H14.7353C15.5756 16.75 16.3071 16.4309 16.886 15.819C17.461 15.2111 17.75 14.4643 17.75 13.6214C17.75 13.0147 17.595 12.4591 17.2888 11.9706C18.1774 11.2849 18.7498 10.2093 18.7498 9C18.7498 6.92893 17.0709 5.25 14.9998 5.25ZM14.2489 10.5357C14.2266 9.45152 13.8652 8.49393 13.1652 7.69718C13.573 7.12393 14.2427 6.75 14.9998 6.75C16.2425 6.75 17.2498 7.75736 17.2498 9C17.2498 9.80527 16.8268 10.5117 16.1908 10.9093C15.7561 10.6621 15.2672 10.5357 14.7353 10.5357H14.2489ZM10 7.75C9.45002 7.75 8.9541 7.90147 8.49395 8.21136C8.03789 8.5185 7.70261 8.93106 7.48246 9.46954L7.47807 9.48028L7.11878 10.3214H6.06038C5.41299 10.3458 4.88196 10.5861 4.42911 11.0629C3.97375 11.5424 3.75 12.1029 3.75 12.7857C3.75 13.4812 3.9794 14.0511 4.44671 14.5375C4.91309 15.0229 5.4469 15.25 6.08824 15.25H14.7353C15.1577 15.25 15.4968 15.1048 15.7963 14.7882C16.0997 14.4674 16.25 14.0929 16.25 13.6214C16.25 13.1693 16.1033 12.8063 15.8003 12.491C15.5019 12.1804 15.1616 12.0357 14.7353 12.0357H12.75V10.6429C12.75 9.81491 12.4802 9.14255 11.9401 8.58033C11.4011 8.01933 10.7689 7.75 10 7.75Z" fill="currentColor"/>
<path d="M4.67146 21.686L6.68595 18.3285L5.82846 17.814L3.81396 21.1715L4.67146 21.686Z" fill="currentColor"/>
<path d="M8.67146 21.686L10.686 18.3285L9.82846 17.814L7.81396 21.1715L8.67146 21.686Z" fill="currentColor"/>
<path d="M12.6715 21.686L14.686 18.3285L13.8285 17.814L11.814 21.1715L12.6715 21.686Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M14.3635 2H15.6362V3.88584H14.3635V2Z" style="fill: var(--element-active-color)"/>
<path d="M20.3771 4.49955L19.4798 3.59818L18.3407 4.74247L19.238 5.64384L20.3771 4.49955Z" style="fill: var(--element-active-color)"/>
<path d="M20.0907 8.36073V9.63927H21.9998V8.36073H20.0907Z" style="fill: var(--element-active-color)"/>
<path d="M18.3344 13.2575L19.4735 14.4082L20.3707 13.5068L19.2253 12.3625L18.3344 13.2575Z" style="fill: var(--element-active-color)"/>
<path d="M10.5198 3.59818L11.6653 4.74247L10.7616 5.64384L9.62256 4.49955L10.5198 3.59818Z" style="fill: var(--element-active-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M14.9998 5.25C13.7735 5.25 12.6847 5.83862 12.0005 6.74873C11.4013 6.41801 10.731 6.25 10 6.25C9.14998 6.25 8.36257 6.49139 7.65605 6.96721C6.96929 7.42972 6.45816 8.05397 6.12778 8.82143H6.03447L6.02189 8.82185C4.97269 8.85708 4.06626 9.2668 3.34147 10.0299C2.61645 10.7933 2.25 11.7257 2.25 12.7857C2.25 13.8617 2.62453 14.806 3.36505 15.5768C4.10651 16.3485 5.02761 16.75 6.08824 16.75H14.7353C15.5756 16.75 16.3071 16.4309 16.886 15.819C17.461 15.2111 17.75 14.4643 17.75 13.6214C17.75 13.0147 17.595 12.4591 17.2888 11.9706C18.1774 11.2849 18.7498 10.2093 18.7498 9C18.7498 6.92893 17.0709 5.25 14.9998 5.25ZM14.2489 10.5357C14.2266 9.45152 13.8652 8.49393 13.1652 7.69718C13.573 7.12393 14.2427 6.75 14.9998 6.75C16.2425 6.75 17.2498 7.75736 17.2498 9C17.2498 9.80527 16.8268 10.5117 16.1908 10.9093C15.7561 10.6621 15.2672 10.5357 14.7353 10.5357H14.2489ZM10 7.75C9.45002 7.75 8.9541 7.90147 8.49395 8.21136C8.03789 8.5185 7.70261 8.93106 7.48246 9.46954L7.47807 9.48028L7.11878 10.3214H6.06038C5.41299 10.3458 4.88196 10.5861 4.42911 11.0629C3.97375 11.5424 3.75 12.1029 3.75 12.7857C3.75 13.4812 3.9794 14.0511 4.44671 14.5375C4.91309 15.0229 5.4469 15.25 6.08824 15.25H14.7353C15.1577 15.25 15.4968 15.1048 15.7963 14.7882C16.0997 14.4674 16.25 14.0929 16.25 13.6214C16.25 13.1693 16.1033 12.8063 15.8003 12.491C15.5019 12.1804 15.1616 12.0357 14.7353 12.0357H12.75V10.6429C12.75 9.81491 12.4802 9.14255 11.9401 8.58033C11.4011 8.01933 10.7689 7.75 10 7.75Z" style="fill: var(--element-active-color)"/>
<path d="M4.67146 21.686L6.68595 18.3285L5.82846 17.814L3.81396 21.1715L4.67146 21.686Z" style="fill: var(--element-active-color)"/>
<path d="M8.67146 21.686L10.686 18.3285L9.82846 17.814L7.81396 21.1715L8.67146 21.686Z" style="fill: var(--element-active-color)"/>
<path d="M12.6715 21.686L14.686 18.3285L13.8285 17.814L11.814 21.1715L12.6715 21.686Z" style="fill: var(--element-active-color)"/>
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
    }
    .wrapper > * {
      height: 100%;
      width: 100%;
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    'obi-19-weather': Obi19Weather;
  }
}
