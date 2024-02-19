import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-14-warning-rectified')
export class Obi14WarningRectified extends LitElement {
  @property({type: Boolean, attribute: 'use-css-color'}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12ZM10.2251 13.8336L16.1973 7.7998L17.4751 9.09996L10.2251 16.4248L6.6001 12.7624L7.87791 11.4714L10.2251 13.8336Z" fill="currentColor"/>
<path d="M16.1973 7.7998L10.2251 13.8336L7.87791 11.4714L6.6001 12.7624L10.2251 16.4248L17.4751 9.09996L16.1973 7.7998Z" fill="currentColor" />
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12ZM10.2251 13.8336L16.1973 7.7998L17.4751 9.09996L10.2251 16.4248L6.6001 12.7624L7.87791 11.4714L10.2251 13.8336Z" style="fill: var(--warning-enabled-background-color)"/>
<path d="M16.1973 7.7998L10.2251 13.8336L7.87791 11.4714L6.6001 12.7624L10.2251 16.4248L17.4751 9.09996L16.1973 7.7998Z" style="fill: var(--on-warning-active-color)" />
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
    'obi-14-warning-rectified': Obi14WarningRectified;
  }
}
