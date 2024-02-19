import {LitElement, html, css, svg, unsafeCSS} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-07-up-north')
export class Obi07UpNorth extends LitElement {
  @property({type: Boolean, attribute: 'use-css-color'}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M15.7969 17H13.4883L9.76172 10.5195H9.70898C9.7832 11.6641 9.82031 12.4805 9.82031 12.9688V17H8.19727V8.43359H10.4883L14.209 14.8496H14.25C14.1914 13.7363 14.1621 12.9492 14.1621 12.4883V8.43359H15.7969V17Z" fill="currentColor"/>
<path d="M12 2L14 6H10L12 2Z" fill="currentColor"/>
<path d="M11 19H13V22H11V19Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M15.7969 17H13.4883L9.76172 10.5195H9.70898C9.7832 11.6641 9.82031 12.4805 9.82031 12.9688V17H8.19727V8.43359H10.4883L14.209 14.8496H14.25C14.1914 13.7363 14.1621 12.9492 14.1621 12.4883V8.43359H15.7969V17Z" style="fill: var(--element-active-color)"/>
<path d="M12 2L14 6H10L12 2Z" style="fill: var(--element-active-color)"/>
<path d="M11 19H13V22H11V19Z" style="fill: var(--element-active-color)"/>
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
    'obi-07-up-north': Obi07UpNorth;
  }
}
