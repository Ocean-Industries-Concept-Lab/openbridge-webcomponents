import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-depth')
export class ObiDepth extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M7.58291 1.81348C7.85211 2.09867 8.10922 2.39366 8.40666 2.64972C9.39829 3.50337 10.6731 4.12535 12 4.12535C13.3269 4.12535 14.6017 3.50337 15.5933 2.64972C15.8908 2.39366 16.1479 2.09867 16.4171 1.81348C16.7489 2.07895 17.0696 2.3493 17.4229 2.5848C18.7658 3.4801 20.3708 4.12535 22 4.12535V5.87535C20.0688 5.87535 18.1743 5.15916 16.5672 4.11655C15.2832 5.16303 13.6748 5.87535 12 5.87535C10.3252 5.87535 8.7168 5.16303 7.4328 4.11656C5.82574 5.15916 3.93116 5.87535 2 5.87535V4.12535C3.6292 4.12535 5.23419 3.4801 6.57714 2.5848C6.93011 2.34949 7.25151 2.07859 7.58291 1.81348Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M5 22H3V20H5V22Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M9 22H7V20H9V22Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M13 22H11V20H13V22Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M17 22H15V20H17V22Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M21 22H19V20H21V22Z" fill="currentColor"/>
<path d="M15 10H13V15.5H15L12 18.5L9 15.5H11V10H9L12 7L15 10Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M7.58291 1.81348C7.85211 2.09867 8.10922 2.39366 8.40666 2.64972C9.39829 3.50337 10.6731 4.12535 12 4.12535C13.3269 4.12535 14.6017 3.50337 15.5933 2.64972C15.8908 2.39366 16.1479 2.09867 16.4171 1.81348C16.7489 2.07895 17.0696 2.3493 17.4229 2.5848C18.7658 3.4801 20.3708 4.12535 22 4.12535V5.87535C20.0688 5.87535 18.1743 5.15916 16.5672 4.11655C15.2832 5.16303 13.6748 5.87535 12 5.87535C10.3252 5.87535 8.7168 5.16303 7.4328 4.11656C5.82574 5.15916 3.93116 5.87535 2 5.87535V4.12535C3.6292 4.12535 5.23419 3.4801 6.57714 2.5848C6.93011 2.34949 7.25151 2.07859 7.58291 1.81348Z" style="fill: var(--element-active-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M5 22H3V20H5V22Z" style="fill: var(--element-active-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M9 22H7V20H9V22Z" style="fill: var(--element-active-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M13 22H11V20H13V22Z" style="fill: var(--element-active-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M17 22H15V20H17V22Z" style="fill: var(--element-active-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M21 22H19V20H21V22Z" style="fill: var(--element-active-color)"/>
<path d="M15 10H13V15.5H15L12 18.5L9 15.5H11V10H9L12 7L15 10Z" style="fill: var(--element-active-color)"/>
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
    'obi-depth': ObiDepth;
  }
}