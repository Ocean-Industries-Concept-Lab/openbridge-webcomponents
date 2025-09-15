import {LitElement, html, css, svg} from 'lit';
import {property} from 'lit/decorators.js';
import {customElement} from '../decorator.js';

@customElement('obi-sign-fire-extinguisher')
export class ObiSignFireExtinguisher extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M8 3C8 2.44772 8.44772 2 9 2C9.55228 2 10 2.44772 10 3V4H14.0001C14.5524 4 15.0001 4.44772 15.0001 5C15.0001 5.55228 14.5524 6 14.0001 6H10V7.60002C12.2822 8.06329 14 10.081 14 12.5V22H4V12.5C4 10.081 5.71776 8.06329 8 7.60002V6H6.11478L3.58219 7.81311C3.13312 8.1346 2.50846 8.03118 2.18697 7.58211C1.86548 7.13304 1.9689 6.50838 2.41796 6.18689L5.47267 4H8V3ZM12 12V16H6V12H12Z" fill="currentColor"/>
<path d="M22 9.5C20.2857 9.5 20 7 20 7L19.6832 7.69296C18.8381 9.54163 19.9917 11.6862 22 12V9.5Z" fill="currentColor"/>
<path d="M22 13.5C20.2857 13.5 18 11 18 11V11.3265C18 13.657 19.6974 15.6402 22 16V13.5Z" fill="currentColor"/>
<path d="M18 17C18 17 18.6083 17.4907 19.39 18.0705C20.3954 18.8162 21.7545 18.2275 22 17L20.0311 16.2684C19.2662 15.9842 18.408 16.2934 18 17Z" fill="currentColor"/>
<path d="M22 18.8C19.5 20.5 18 19 18 19C18 20.6568 19.3431 22 21 22H22V18.8Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M8 3C8 2.44772 8.44772 2 9 2C9.55228 2 10 2.44772 10 3V4H14.0001C14.5524 4 15.0001 4.44772 15.0001 5C15.0001 5.55228 14.5524 6 14.0001 6H10V7.60002C12.2822 8.06329 14 10.081 14 12.5V22H4V12.5C4 10.081 5.71776 8.06329 8 7.60002V6H6.11478L3.58219 7.81311C3.13312 8.1346 2.50846 8.03118 2.18697 7.58211C1.86548 7.13304 1.9689 6.50838 2.41796 6.18689L5.47267 4H8V3ZM12 12V16H6V12H12Z" style="fill: var(--element-active-color)"/>
<path d="M22 9.5C20.2857 9.5 20 7 20 7L19.6832 7.69296C18.8381 9.54163 19.9917 11.6862 22 12V9.5Z" style="fill: var(--element-active-color)"/>
<path d="M22 13.5C20.2857 13.5 18 11 18 11V11.3265C18 13.657 19.6974 15.6402 22 16V13.5Z" style="fill: var(--element-active-color)"/>
<path d="M18 17C18 17 18.6083 17.4907 19.39 18.0705C20.3954 18.8162 21.7545 18.2275 22 17L20.0311 16.2684C19.2662 15.9842 18.408 16.2934 18 17Z" style="fill: var(--element-active-color)"/>
<path d="M22 18.8C19.5 20.5 18 19 18 19C18 20.6568 19.3431 22 21 22H22V18.8Z" style="fill: var(--element-active-color)"/>
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
    'obi-sign-fire-extinguisher': ObiSignFireExtinguisher;
  }
}
