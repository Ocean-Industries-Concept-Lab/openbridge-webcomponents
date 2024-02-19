import {LitElement, html, css, svg, unsafeCSS} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-07-up-head')
export class Obi07UpHead extends LitElement {
  @property({type: Boolean, attribute: 'use-css-color'}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M15.5039 17H13.6934V13.3027H10.3008V17H8.48438V8.43359H10.3008V11.791H13.6934V8.43359H15.5039V17Z" fill="currentColor"/>
<path d="M12 2L14 6H10L12 2Z" fill="currentColor"/>
<path d="M11 19H13V22H11V19Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M15.5039 17H13.6934V13.3027H10.3008V17H8.48438V8.43359H10.3008V11.791H13.6934V8.43359H15.5039V17Z" style="fill: var(--element-active-color)"/>
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
    'obi-07-up-head': Obi07UpHead;
  }
}
