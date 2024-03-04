import {LitElement, html, unsafeCSS} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import compentStyle from './rich-button.css?inline';
import {classMap} from 'lit/directives/class-map.js';

export enum ObcRichButtonPosition {
  Regular = 'regular',
  Top = 'top',
  Bottom = 'bottom',
  Center = 'center',
}
export type ObcRichButtonPositionType = 'regular' | 'top' | 'bottom' | 'center';

@customElement('obc-rich-button')
export class ObcRichButton extends LitElement {
  @property({type: String}) position: ObcRichButtonPositionType =
    ObcRichButtonPosition.Regular;

  override render() {
    return html`
      <div
        class=${classMap({
          wrapper: true,
          [this.position]: true,
        })}
      >
        <button>
          <div class="container-content">
            <div class="leading-icon">
              <slot name="leading-icon"></slot>
            </div>
            <div class="content">
              <slot name="label"></slot>
              <slot name="description"></slot>
            </div>
          </div>
          <div class="trailing-icon">
            <slot name="trailing-icon"></slot>
          </div>
        </button>
      </div>
    `;
  }

  static override styles = unsafeCSS(compentStyle);
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-rich-button': ObcRichButton;
  }
}
