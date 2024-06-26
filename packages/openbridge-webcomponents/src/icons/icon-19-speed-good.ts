import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-19-speed-good')
export class Obi19SpeedGood extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M14 14C14 15.1046 13.1046 16 12 16C10.8954 16 10 15.1046 10 14C10 12.8954 12 4 12 4C12 4 14 12.8954 14 14Z" fill="currentColor"/>
<path d="M10.4358 4.12158C5.65598 4.87241 2 9.00924 2 14C2 16.2516 2.74418 18.3295 4 20.0009H20C21.2558 18.3295 22 16.2516 22 14C22 9.00924 18.344 4.87241 13.5642 4.12158C13.6181 4.36357 13.6911 4.69291 13.7774 5.08445C13.8206 5.28062 13.8671 5.49247 13.9162 5.71684C17.6878 6.58583 20.5 9.96448 20.5 14C20.5 15.6547 20.0285 17.1961 19.2121 18.5009H4.78791C3.97151 17.1961 3.5 15.6547 3.5 14C3.5 9.96448 6.31221 6.58583 10.0838 5.71684C10.1329 5.49247 10.1794 5.28062 10.2226 5.08445C10.3089 4.69291 10.3819 4.36357 10.4358 4.12158Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M14 14C14 15.1046 13.1046 16 12 16C10.8954 16 10 15.1046 10 14C10 12.8954 12 4 12 4C12 4 14 12.8954 14 14Z" style="fill: var(--element-active-color)"/>
<path d="M10.4358 4.12158C5.65598 4.87241 2 9.00924 2 14C2 16.2516 2.74418 18.3295 4 20.0009H20C21.2558 18.3295 22 16.2516 22 14C22 9.00924 18.344 4.87241 13.5642 4.12158C13.6181 4.36357 13.6911 4.69291 13.7774 5.08445C13.8206 5.28062 13.8671 5.49247 13.9162 5.71684C17.6878 6.58583 20.5 9.96448 20.5 14C20.5 15.6547 20.0285 17.1961 19.2121 18.5009H4.78791C3.97151 17.1961 3.5 15.6547 3.5 14C3.5 9.96448 6.31221 6.58583 10.0838 5.71684C10.1329 5.49247 10.1794 5.28062 10.2226 5.08445C10.3089 4.69291 10.3819 4.36357 10.4358 4.12158Z" style="fill: var(--element-active-color)"/>
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
    'obi-19-speed-good': Obi19SpeedGood;
  }
}
