import {LitElement, html, unsafeCSS} from 'lit';
import {property} from 'lit/decorators.js';
import {classMap} from 'lit/directives/class-map.js';
import componentStyle from './ruler-pointer.css?inline';
import {customElement} from '../../../decorator.js';

export enum ObcRulerPointerType {
  Default = 'default',
  Regular = 'regular',
  Selected = 'selected',
}

/**
 * `<obc-ruler-pointer>` renders the AR ruler dot pointer.
 *
 * Variants:
 * - `default`: 4px active dot.
 * - `regular`: 10px outer active circle with 6px inner dot.
 * - `selected`: 10px outer active circle.
 */
@customElement('obc-ruler-pointer')
export class ObcRulerPointer extends LitElement {
  @property({type: String, reflect: true})
  type: ObcRulerPointerType = ObcRulerPointerType.Default;

  override render() {
    const isDefault = this.type === ObcRulerPointerType.Default;
    const isRegular = this.type === ObcRulerPointerType.Regular;
    const isSelected = this.type === ObcRulerPointerType.Selected;

    return html`
      <div
        class=${classMap({
          wrapper: true,
          regular: isRegular,
          selected: isSelected,
        })}
      >
        ${isDefault
          ? html`<div class="dot default"></div>`
          : html`
              <div class="dot outer"></div>
              ${isRegular ? html`<div class="dot inner regular"></div>` : null}
            `}
      </div>
    `;
  }

  static override styles = unsafeCSS(componentStyle);
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-ruler-pointer': ObcRulerPointer;
  }
}
