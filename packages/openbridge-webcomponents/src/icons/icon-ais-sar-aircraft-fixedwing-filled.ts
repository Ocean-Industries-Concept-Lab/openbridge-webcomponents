import {LitElement, html, css, svg} from 'lit';
import {property} from 'lit/decorators.js';
import {customElement} from '../decorator.js';

@customElement('obi-ais-sar-aircraft-fixedwing-filled')
export class ObiAisSarAircraftFixedwingFilled extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M14 7.99998V4.15137C14 4.05265 13.9708 3.95615 13.916 3.87402L12.416 1.62402C12.2181 1.32715 11.7819 1.32715 11.584 1.62402L10.084 3.87402C10.0292 3.95615 9.99999 4.05265 9.99999 4.15137V7.99998L3.19999 13.1C2.81559 13.3883 3.01949 14 3.49999 14H9.99999V18L7.85355 20.1464C7.53856 20.4614 7.76165 21 8.2071 21H15.7929C16.2383 21 16.4614 20.4614 16.1464 20.1464L14 18V14H20.5C20.9805 14 21.1844 13.3883 20.8 13.1L14 7.99998Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M14 7.99998V4.15137C14 4.05265 13.9708 3.95615 13.916 3.87402L12.416 1.62402C12.2181 1.32715 11.7819 1.32715 11.584 1.62402L10.084 3.87402C10.0292 3.95615 9.99999 4.05265 9.99999 4.15137V7.99998L3.19999 13.1C2.81559 13.3883 3.01949 14 3.49999 14H9.99999V18L7.85355 20.1464C7.53856 20.4614 7.76165 21 8.2071 21H15.7929C16.2383 21 16.4614 20.4614 16.1464 20.1464L14 18V14H20.5C20.9805 14 21.1844 13.3883 20.8 13.1L14 7.99998ZM19 13L13 8.49998V4.30276L12 2.80276L11 4.30276V8.49998L4.99999 13H11V18.4142L9.41421 20H14.5858L13 18.4142V13H19Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M14 7.99998V4.15137C14 4.05265 13.9708 3.95615 13.916 3.87402L12.416 1.62402C12.2181 1.32715 11.7819 1.32715 11.584 1.62402L10.084 3.87402C10.0292 3.95615 9.99999 4.05265 9.99999 4.15137V7.99998L3.19999 13.1C2.81559 13.3883 3.01949 14 3.49999 14H9.99999V18L7.85355 20.1464C7.53856 20.4614 7.76165 21 8.2071 21H15.7929C16.2383 21 16.4614 20.4614 16.1464 20.1464L14 18V14H20.5C20.9805 14 21.1844 13.3883 20.8 13.1L14 7.99998Z" style="fill: var(--element-active-inverted-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M14 7.99998V4.15137C14 4.05265 13.9708 3.95615 13.916 3.87402L12.416 1.62402C12.2181 1.32715 11.7819 1.32715 11.584 1.62402L10.084 3.87402C10.0292 3.95615 9.99999 4.05265 9.99999 4.15137V7.99998L3.19999 13.1C2.81559 13.3883 3.01949 14 3.49999 14H9.99999V18L7.85355 20.1464C7.53856 20.4614 7.76165 21 8.2071 21H15.7929C16.2383 21 16.4614 20.4614 16.1464 20.1464L14 18V14H20.5C20.9805 14 21.1844 13.3883 20.8 13.1L14 7.99998ZM19 13L13 8.49998V4.30276L12 2.80276L11 4.30276V8.49998L4.99999 13H11V18.4142L9.41421 20H14.5858L13 18.4142V13H19Z" style="fill: var(--element-neutral-color)"/>
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
    'obi-ais-sar-aircraft-fixedwing-filled': ObiAisSarAircraftFixedwingFilled;
  }
}
