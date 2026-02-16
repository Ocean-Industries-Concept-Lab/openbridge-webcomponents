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
 * `<obc-ruler-pointer>` renders a compact AR ruler endpoint marker for ruler targets and measurement anchors.
 *
 * ## Overview
 *
 * Use `<obc-ruler-pointer>` when a minimal endpoint indicator is needed in AR overlays.
 * The component exposes one visual attribute (`type`) and does not render slotted content.
 * Keywords/synonyms: ruler, pointer, AR dot, target marker, measurement marker, indicator dot.
 *
 * ## Features/Variants
 *
 * - `type="default"`: 4px active dot.
 * - `type="regular"`: 10px outer active circle with a 6px inner dot.
 * - `type="selected"`: 10px outer active circle for selected emphasis.
 *
 * ## Usage Guidelines
 *
 * - Use `default` for subtle, always-visible ruler anchors.
 * - Use `regular` for the baseline interactive endpoint style.
 * - Use `selected` when the ruler endpoint is actively focused or selected.
 * - Pair with ruler line/measurement components for complete ruler visuals.
 *
 * ## Slots/Content
 *
 * - None.
 *
 * ## Events
 *
 * - None.
 *
 * ## Best Practices
 *
 * - Prefer `regular` as the default interactive state for consistency.
 * - Reserve `selected` for active focus only to keep state changes legible.
 * - Keep pointer state controlled by parent ruler interaction logic.
 *
 * ## Example
 *
 * ```html
 * <obc-ruler-pointer type="regular"></obc-ruler-pointer>
 * ```
 *
 * @slot - None.
 */
@customElement('obc-ruler-pointer')
export class ObcRulerPointer extends LitElement {
  @property({type: String, reflect: true})
  type: ObcRulerPointerType = ObcRulerPointerType.Default;

  override render() {
    const type =
      this.type === ObcRulerPointerType.Regular ||
      this.type === ObcRulerPointerType.Selected
        ? this.type
        : ObcRulerPointerType.Default;
    const isDefault = type === ObcRulerPointerType.Default;
    const isRegular = type === ObcRulerPointerType.Regular;
    const isSelected = type === ObcRulerPointerType.Selected;

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
