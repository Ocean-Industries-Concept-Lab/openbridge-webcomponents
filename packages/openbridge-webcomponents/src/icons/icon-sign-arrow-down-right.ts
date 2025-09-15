import {LitElement, html, css, svg} from 'lit';
import {property} from 'lit/decorators.js';
import {customElement} from '../decorator.js';

@customElement('obi-sign-arrow-down-right')
export class ObiSignArrowDownRight extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M15.0717 3.75781L19.0717 7.75781V19.0714L7.75781 19.0714L3.75781 15.0714L12.2432 15.0714L4.22241 7.05057L7.05084 4.22215L15.0717 12.243V3.75781Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M15.0717 3.75781L19.0717 7.75781V19.0714L7.75781 19.0714L3.75781 15.0714L12.2432 15.0714L4.22241 7.05057L7.05084 4.22215L15.0717 12.243V3.75781Z" style="fill: var(--element-active-color)"/>
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
    'obi-sign-arrow-down-right': ObiSignArrowDownRight;
  }
}
