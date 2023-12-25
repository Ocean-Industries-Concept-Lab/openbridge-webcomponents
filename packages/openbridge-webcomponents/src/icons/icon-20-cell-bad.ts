import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-20-cell-bad')
export class Obi20CellBad extends LitElement {
  @property({type: Number}) size = 24;
  @property({type: Boolean, attribute: 'use-css-color'}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M14.9998 10C14.9998 11.3062 14.1648 12.4175 12.9998 12.8291V22H10.9998V12.8291C9.83473 12.4175 8.99977 11.3062 8.99977 10C8.99977 8.34326 10.3425 7 11.9998 7C13.657 7 14.9998 8.34326 14.9998 10Z" fill="currentColor"/>
<path d="M2.12109 16.0354L3.53531 14.6212L5.65663 16.7425L7.77795 14.6212L9.19216 16.0354L7.07084 18.1567L9.19216 20.2781L7.77795 21.6923L5.65663 19.571L3.53531 21.6923L2.12109 20.2781L4.24241 18.1567L2.12109 16.0354Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M14.9998 10C14.9998 11.3062 14.1648 12.4175 12.9998 12.8291V22H10.9998V12.8291C9.83473 12.4175 8.99977 11.3062 8.99977 10C8.99977 8.34326 10.3425 7 11.9998 7C13.657 7 14.9998 8.34326 14.9998 10Z" style="fill: var(--element-active-color)"/>
<path d="M2.12109 16.0354L3.53531 14.6212L5.65663 16.7425L7.77795 14.6212L9.19216 16.0354L7.07084 18.1567L9.19216 20.2781L7.77795 21.6923L5.65663 19.571L3.53531 21.6923L2.12109 20.2781L4.24241 18.1567L2.12109 16.0354Z" style="fill: var(--element-active-color)"/>
</svg>
`;

  override render() {
    return html`
      <div class="wrapper" style="--size:${this.size}px">
        ${this.useCssColor ? this.iconCss : this.icon}
      </div>
    `;
  }

  static override styles = css`
    .wrapper {
      height: var(--size);
      width: var(--size);
    }
    .wrapper > * {
      height: 100%;
      width: 100%;
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    'obi-20-cell-bad': Obi20CellBad;
  }
}
