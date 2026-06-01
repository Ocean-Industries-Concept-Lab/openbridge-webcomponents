import {LitElement, html, css, svg} from 'lit';
import {property} from 'lit/decorators.js';
import {customElement} from '../decorator.js';

@customElement('obi-electric-motor')
export class ObiElectricMotor extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M10.272 20.136L5.976 6.528H5.88C5.896 6.848 5.92 7.32 5.952 7.944C5.984 8.552 6.016 9.216 6.048 9.936C6.08 10.64 6.096 11.296 6.096 11.904V20.136H3V3H7.752L11.928 16.2H12L16.44 3H21.168V20.136H17.928V11.76C17.928 11.2 17.936 10.584 17.952 9.912C17.984 9.224 18.008 8.576 18.024 7.968C18.056 7.344 18.08 6.872 18.096 6.552H18L13.44 20.136H10.272Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M10.272 20.136L5.976 6.528H5.88C5.896 6.848 5.92 7.32 5.952 7.944C5.984 8.552 6.016 9.216 6.048 9.936C6.08 10.64 6.096 11.296 6.096 11.904V20.136H3V3H7.752L11.928 16.2H12L16.44 3H21.168V20.136H17.928V11.76C17.928 11.2 17.936 10.584 17.952 9.912C17.984 9.224 18.008 8.576 18.024 7.968C18.056 7.344 18.08 6.872 18.096 6.552H18L13.44 20.136H10.272Z" style="fill: var(--element-active-color)"/>
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
    'obi-electric-motor': ObiElectricMotor;
  }
}
