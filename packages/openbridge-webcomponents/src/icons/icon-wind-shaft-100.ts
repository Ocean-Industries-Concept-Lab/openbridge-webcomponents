import {LitElement, html, css, svg} from 'lit';
import {property} from 'lit/decorators.js';
import {customElement} from '../decorator.js';

@customElement('obi-wind-shaft-100')
export class ObiWindShaft100 extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M12.3672 1.0602L12.2373 1.03578C11.5913 0.95294 11.0001 1.45669 11 2.12758V23.9997H13V13.5615L19.8545 11.8486C20.9654 11.5709 20.9654 9.99158 19.8545 9.71385L13 8V6.77992L19.8545 5.06703C20.9654 4.78929 20.9654 3.21 19.8545 2.93227L12.3672 1.0602Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M12.3672 1.0602L12.2373 1.03578C11.5913 0.95294 11.0001 1.45669 11 2.12758V23.9997H13V13.5615L19.8545 11.8486C20.9654 11.5709 20.9654 9.99158 19.8545 9.71385L13 8V6.77992L19.8545 5.06703C20.9654 4.78929 20.9654 3.21 19.8545 2.93227L12.3672 1.0602Z" style="fill: var(--element-active-color)"/>
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
    'obi-wind-shaft-100': ObiWindShaft100;
  }
}
