import {LitElement, html, css, svg} from 'lit';
import {property} from 'lit/decorators.js';
import {customElement} from '../decorator.js';

@customElement('obi-threeway-digital-static')
export class ObiThreewayDigitalStatic extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M20.4268 6.10241C21.0895 5.63847 22 6.11272 22 6.92175V17.08C22 17.8889 21.0895 18.363 20.4268 17.8993L14.2687 13.5892C14.1866 13.5317 14.0886 13.5008 13.9884 13.5008C13.719 13.5008 13.5 13.7193 13.5 13.9887C13.5 14.0888 13.5308 14.1864 13.5882 14.2684L17.8984 20.4276C18.3622 21.0904 17.8881 22.0008 17.0791 22.0008H6.9209C6.11194 22.0008 5.63781 21.0904 6.10156 20.4276L10.4118 14.2684C10.4692 14.1864 10.5 14.0888 10.5 13.9887C10.5 13.7193 10.281 13.5008 10.0116 13.5008C9.91136 13.5008 9.81338 13.5317 9.73126 13.5892L3.57324 17.8993C2.91048 18.363 2 17.8889 2 17.08V6.92175C2 6.11272 2.91046 5.63847 3.57324 6.10241L9.72831 10.4105C9.81235 10.4693 9.91244 10.5008 10.015 10.5008H13.985C14.0876 10.5008 14.1877 10.4693 14.2717 10.4105L20.4268 6.10241Z" fill="currentColor" stroke="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M20.4268 6.10241C21.0895 5.63847 22 6.11272 22 6.92175V17.08C22 17.8889 21.0895 18.363 20.4268 17.8993L14.2687 13.5892C14.1866 13.5317 14.0886 13.5008 13.9884 13.5008C13.719 13.5008 13.5 13.7193 13.5 13.9887C13.5 14.0888 13.5308 14.1864 13.5882 14.2684L17.8984 20.4276C18.3622 21.0904 17.8881 22.0008 17.0791 22.0008H6.9209C6.11194 22.0008 5.63781 21.0904 6.10156 20.4276L10.4118 14.2684C10.4692 14.1864 10.5 14.0888 10.5 13.9887C10.5 13.7193 10.281 13.5008 10.0116 13.5008C9.91136 13.5008 9.81338 13.5317 9.73126 13.5892L3.57324 17.8993C2.91048 18.363 2 17.8889 2 17.08V6.92175C2 6.11272 2.91046 5.63847 3.57324 6.10241L9.72831 10.4105C9.81235 10.4693 9.91244 10.5008 10.015 10.5008H13.985C14.0876 10.5008 14.1877 10.4693 14.2717 10.4105L20.4268 6.10241Z" style="fill: var(--automation-symbol-static-background-color); stroke: var(--automation-symbol-static-border-color)"/>
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
    'obi-threeway-digital-static': ObiThreewayDigitalStatic;
  }
}
