import {LitElement, html, css, svg} from 'lit';
import {property} from 'lit/decorators.js';
import {customElement} from '../decorator.js';

@customElement('obi-transform-vertical')
export class ObiTransformVertical extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M12 21L8 17L9.4 15.6L11 17.175V6.825L9.4 8.4L8 7L12 3L16 7L14.6 8.425L13 6.825V17.175L14.6 15.6L16 17L12 21Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M12 21L8 17L9.4 15.6L11 17.175V6.825L9.4 8.4L8 7L12 3L16 7L14.6 8.425L13 6.825V17.175L14.6 15.6L16 17L12 21Z" style="fill: var(--element-active-color)"/>
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
    'obi-transform-vertical': ObiTransformVertical;
  }
}
