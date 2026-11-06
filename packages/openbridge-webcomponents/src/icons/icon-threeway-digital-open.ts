import {LitElement, html, css, svg} from 'lit';
import {property} from 'lit/decorators.js';
import {customElement} from '../decorator.js';

@customElement('obi-threeway-digital-open')
export class ObiThreewayDigitalOpen extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M20.4268 6.04455C21.0895 5.58061 22 6.05486 22 6.86389V17.0221C22 17.831 21.0895 18.3052 20.4268 17.8414L14.2687 13.5313C14.1866 13.4738 14.0886 13.443 13.9884 13.443C13.719 13.443 13.5 13.6614 13.5 13.9308C13.5 14.0309 13.5308 14.1286 13.5882 14.2106L17.8984 20.3697C18.3622 21.0325 17.8881 21.943 17.0791 21.943H6.9209C6.11194 21.943 5.63781 21.0325 6.10156 20.3697L10.4118 14.2106C10.4692 14.1286 10.5 14.0309 10.5 13.9308C10.5 13.6614 10.281 13.443 10.0116 13.443C9.91136 13.443 9.81338 13.4738 9.73126 13.5313L3.57324 17.8414C2.91048 18.3052 2 17.831 2 17.0221V6.86389C2 6.05486 2.91046 5.58061 3.57324 6.04455L9.72831 10.3526C9.81235 10.4114 9.91244 10.443 10.015 10.443H13.985C14.0876 10.443 14.1877 10.4114 14.2717 10.3526L20.4268 6.04455Z" fill="currentColor" stroke="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M20.4268 6.04455C21.0895 5.58061 22 6.05486 22 6.86389V17.0221C22 17.831 21.0895 18.3052 20.4268 17.8414L14.2687 13.5313C14.1866 13.4738 14.0886 13.443 13.9884 13.443C13.719 13.443 13.5 13.6614 13.5 13.9308C13.5 14.0309 13.5308 14.1286 13.5882 14.2106L17.8984 20.3697C18.3622 21.0325 17.8881 21.943 17.0791 21.943H6.9209C6.11194 21.943 5.63781 21.0325 6.10156 20.3697L10.4118 14.2106C10.4692 14.1286 10.5 14.0309 10.5 13.9308C10.5 13.6614 10.281 13.443 10.0116 13.443C9.91136 13.443 9.81338 13.4738 9.73126 13.5313L3.57324 17.8414C2.91048 18.3052 2 17.831 2 17.0221V6.86389C2 6.05486 2.91046 5.58061 3.57324 6.04455L9.72831 10.3526C9.81235 10.4114 9.91244 10.443 10.015 10.443H13.985C14.0876 10.443 14.1877 10.4114 14.2717 10.3526L20.4268 6.04455Z" style="fill: var(--automation-symbol-on-background-color); stroke: var(--automation-symbol-on-border-color)"/>
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
    'obi-threeway-digital-open': ObiThreewayDigitalOpen;
  }
}
