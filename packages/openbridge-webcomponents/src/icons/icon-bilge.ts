import {LitElement, html, css, svg} from 'lit';
import {property} from 'lit/decorators.js';
import {customElement} from '../decorator.js';

@customElement('obi-bilge')
export class ObiBilge extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M2 3H14V5H4V16.5L12 21L20 16.5V11H22V17.5L12 23L2 17.5V3Z" fill="currentColor"/>
<path d="M21.4677 5.25577C20.9457 5.57354 20.2624 5.40912 19.9441 4.88456C19.6264 4.36091 19.7939 3.67616 20.3164 3.35811C20.8375 3.04089 21.521 3.20768 21.8387 3.73132C22.1569 4.25588 21.9893 4.93827 21.4677 5.25577Z" fill="currentColor"/>
<path d="M15.9508 6.409C16.269 6.93356 16.9523 7.09798 17.4743 6.78021C17.9959 6.46271 18.1635 5.78032 17.8453 5.25577C17.5276 4.73212 16.8441 4.56533 16.323 4.88255C15.8005 5.2006 15.6331 5.88535 15.9508 6.409Z" fill="currentColor"/>
<path d="M20.6223 9.39766C20.1003 9.71543 19.417 9.55101 19.0988 9.02645C18.7811 8.50281 18.9485 7.81805 19.471 7.5C19.9921 7.18278 20.6756 7.34957 20.9933 7.87322C21.3116 8.39777 21.1439 9.08016 20.6223 9.39766Z" fill="currentColor"/>
<path d="M18 16V11H6V16L12 19L18 16Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M2 3H14V5H4V16.5L12 21L20 16.5V11H22V17.5L12 23L2 17.5V3Z" style="fill: var(--element-active-color)"/>
<path d="M21.4677 5.25577C20.9457 5.57354 20.2624 5.40912 19.9441 4.88456C19.6264 4.36091 19.7939 3.67616 20.3164 3.35811C20.8375 3.04089 21.521 3.20768 21.8387 3.73132C22.1569 4.25588 21.9893 4.93827 21.4677 5.25577Z" style="fill: var(--element-active-color)"/>
<path d="M15.9508 6.409C16.269 6.93356 16.9523 7.09798 17.4743 6.78021C17.9959 6.46271 18.1635 5.78032 17.8453 5.25577C17.5276 4.73212 16.8441 4.56533 16.323 4.88255C15.8005 5.2006 15.6331 5.88535 15.9508 6.409Z" style="fill: var(--element-active-color)"/>
<path d="M20.6223 9.39766C20.1003 9.71543 19.417 9.55101 19.0988 9.02645C18.7811 8.50281 18.9485 7.81805 19.471 7.5C19.9921 7.18278 20.6756 7.34957 20.9933 7.87322C21.3116 8.39777 21.1439 9.08016 20.6223 9.39766Z" style="fill: var(--element-active-color)"/>
<path d="M18 16V11H6V16L12 19L18 16Z" style="fill: var(--element-active-color)"/>
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
    'obi-bilge': ObiBilge;
  }
}
