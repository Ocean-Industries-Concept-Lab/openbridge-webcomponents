import {LitElement, html, css, svg} from 'lit';
import {property} from 'lit/decorators.js';
import {customElement} from '../decorator.js';

@customElement('obi-multiply')
export class ObiMultiply extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M12.0001 13.4142L16.2428 17.6568L17.657 16.2426L13.4143 12L17.657 7.75735L16.2428 6.34314L12.0001 10.5858L7.75748 6.34314L6.34326 7.75735L10.5859 12L6.34326 16.2426L7.75748 17.6568L12.0001 13.4142Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M12.0001 13.4142L16.2428 17.6568L17.657 16.2426L13.4143 12L17.657 7.75735L16.2428 6.34314L12.0001 10.5858L7.75748 6.34314L6.34326 7.75735L10.5859 12L6.34326 16.2426L7.75748 17.6568L12.0001 13.4142Z" style="fill: var(--element-active-color)"/>
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
    'obi-multiply': ObiMultiply;
  }
}
