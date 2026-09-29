import {LitElement, html, css, svg} from 'lit';
import {property} from 'lit/decorators.js';
import {customElement} from '../decorator.js';

@customElement('obi-wind-shaft-80')
export class ObiWindShaft80 extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M12.3672 1.0602L12.2373 1.03578C11.5913 0.95294 11.0001 1.45669 11 2.12758V23.9997H13V17H19C19.5523 17 20 16.5523 20 16C20 15.4477 19.5523 15 19 15H13V13.5H19C19.5523 13.5 20 13.0523 20 12.5C20 11.9477 19.5523 11.5 19 11.5H13V10H19C19.5523 10 20 9.55229 20 9C20 8.44773 19.5523 8 19 8H13V6.77992L19.8545 5.06703C20.9654 4.78929 20.9654 3.21 19.8545 2.93227L12.3672 1.0602Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M12.3672 1.0602L12.2373 1.03578C11.5913 0.95294 11.0001 1.45669 11 2.12758V23.9997H13V17H19C19.5523 17 20 16.5523 20 16C20 15.4477 19.5523 15 19 15H13V13.5H19C19.5523 13.5 20 13.0523 20 12.5C20 11.9477 19.5523 11.5 19 11.5H13V10H19C19.5523 10 20 9.55229 20 9C20 8.44773 19.5523 8 19 8H13V6.77992L19.8545 5.06703C20.9654 4.78929 20.9654 3.21 19.8545 2.93227L12.3672 1.0602Z" style="fill: var(--element-active-color)"/>
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
    'obi-wind-shaft-80': ObiWindShaft80;
  }
}
