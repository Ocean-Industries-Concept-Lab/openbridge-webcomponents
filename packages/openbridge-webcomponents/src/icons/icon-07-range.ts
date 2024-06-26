import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-07-range')
export class Obi07Range extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M10.08 10H14V14.0384H13.9602L12.47 12.5031L11.233 13.7775L10.441 12.9616L11.678 11.6873L10.08 10.041V10Z" fill="currentColor"/>
<path d="M10.92 17H7V12.9616H7.03979L8.62788 14.5977L9.90192 13.2852L10.6939 14.101L9.41985 15.4136L10.92 16.959V17Z" fill="currentColor"/>
<path d="M6 20C6 21.1046 5.10457 22 4 22C2.89543 22 2 21.1046 2 20C2 18.8954 2.89543 18 4 18C5.10457 18 6 18.8954 6 20Z" fill="currentColor"/>
<path d="M22 20C22 17.6362 21.5344 15.2956 20.6298 13.1117C19.7252 10.9278 18.3994 8.94353 16.7279 7.27208C15.0565 5.60062 13.0722 4.27475 10.8883 3.37017C8.70444 2.46558 6.36379 2 4 2V3.8088C6.12626 3.8088 8.2317 4.2276 10.1961 5.04128C12.1605 5.85496 13.9454 7.0476 15.4489 8.55109C16.9524 10.0546 18.145 11.8395 18.9587 13.8039C19.7724 15.7683 20.1912 17.8737 20.1912 20H22Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M10.08 10H14V14.0384H13.9602L12.47 12.5031L11.233 13.7775L10.441 12.9616L11.678 11.6873L10.08 10.041V10Z" style="fill: var(--element-active-color)"/>
<path d="M10.92 17H7V12.9616H7.03979L8.62788 14.5977L9.90192 13.2852L10.6939 14.101L9.41985 15.4136L10.92 16.959V17Z" style="fill: var(--element-active-color)"/>
<path d="M6 20C6 21.1046 5.10457 22 4 22C2.89543 22 2 21.1046 2 20C2 18.8954 2.89543 18 4 18C5.10457 18 6 18.8954 6 20Z" style="fill: var(--element-active-color)"/>
<path d="M22 20C22 17.6362 21.5344 15.2956 20.6298 13.1117C19.7252 10.9278 18.3994 8.94353 16.7279 7.27208C15.0565 5.60062 13.0722 4.27475 10.8883 3.37017C8.70444 2.46558 6.36379 2 4 2V3.8088C6.12626 3.8088 8.2317 4.2276 10.1961 5.04128C12.1605 5.85496 13.9454 7.0476 15.4489 8.55109C16.9524 10.0546 18.145 11.8395 18.9587 13.8039C19.7724 15.7683 20.1912 17.8737 20.1912 20H22Z" style="fill: var(--element-active-color)"/>
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
    'obi-07-range': Obi07Range;
  }
}
