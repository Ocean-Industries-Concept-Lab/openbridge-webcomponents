import {LitElement, html, css, svg} from 'lit';
import {property} from 'lit/decorators.js';
import {customElement} from '../decorator.js';

@customElement('obi-threeway-analog-open')
export class ObiThreewayAnalogOpen extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M20.4268 6.04479C21.0895 5.58085 22 6.05511 22 6.86413V17.0223C22 17.8313 21.0895 18.3054 20.4268 17.8417L14.2687 13.5315C14.1866 13.4741 14.0886 13.4432 13.9884 13.4432C13.719 13.4432 13.5 13.6617 13.5 13.9311C13.5 14.0312 13.5308 14.1288 13.5882 14.2108L17.8984 20.37C18.3622 21.0328 17.8881 21.9432 17.0791 21.9432H6.9209C6.11194 21.9432 5.63781 21.0328 6.10156 20.37L10.4118 14.2108C10.4692 14.1288 10.5 14.0312 10.5 13.9311C10.5 13.6617 10.281 13.4432 10.0116 13.4432C9.91136 13.4432 9.81338 13.4741 9.73126 13.5315L3.57324 17.8417C2.91048 18.3054 2 17.8313 2 17.0223V6.86413C2 6.05511 2.91046 5.58085 3.57324 6.04479L9.72831 10.3529C9.81235 10.4117 9.91244 10.4432 10.015 10.4432H13.985C14.0876 10.4432 14.1877 10.4117 14.2717 10.3529L20.4268 6.04479Z" fill="currentColor" stroke="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M20.4268 6.04479C21.0895 5.58085 22 6.05511 22 6.86413V17.0223C22 17.8313 21.0895 18.3054 20.4268 17.8417L14.2687 13.5315C14.1866 13.4741 14.0886 13.4432 13.9884 13.4432C13.719 13.4432 13.5 13.6617 13.5 13.9311C13.5 14.0312 13.5308 14.1288 13.5882 14.2108L17.8984 20.37C18.3622 21.0328 17.8881 21.9432 17.0791 21.9432H6.9209C6.11194 21.9432 5.63781 21.0328 6.10156 20.37L10.4118 14.2108C10.4692 14.1288 10.5 14.0312 10.5 13.9311C10.5 13.6617 10.281 13.4432 10.0116 13.4432C9.91136 13.4432 9.81338 13.4741 9.73126 13.5315L3.57324 17.8417C2.91048 18.3054 2 17.8313 2 17.0223V6.86413C2 6.05511 2.91046 5.58085 3.57324 6.04479L9.72831 10.3529C9.81235 10.4117 9.91244 10.4432 10.015 10.4432H13.985C14.0876 10.4432 14.1877 10.4117 14.2717 10.3529L20.4268 6.04479Z" style="fill: var(--automation-symbol-on-background-color); stroke: var(--automation-symbol-on-border-color)"/>
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
    'obi-threeway-analog-open': ObiThreewayAnalogOpen;
  }
}
