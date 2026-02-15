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
 * `<obc-ruler-pointer>` renders a compact AR ruler pointer (dot/circle marker) used to indicate ruler targets.
 *
 * ## Description
 *
 * Use `<obc-ruler-pointer>` when a lightweight ruler marker is needed in AR overlays.
 * The component exposes a single `type` attribute to switch between default, regular,
 * and selected visual states without additional child content.
 *
 * ## Usage Examples
 *
 * ```html
 * <obc-ruler-pointer type="default"></obc-ruler-pointer>
 * <obc-ruler-pointer type="regular"></obc-ruler-pointer>
 * <obc-ruler-pointer type="selected"></obc-ruler-pointer>
 * ```
 *
 * ## Public API/Attributes
 *
 * - `type` (attribute): Visual variant for `<obc-ruler-pointer>`.
 *   - `default`: 4px active dot.
 *   - `regular`: 10px outer active circle with a 6px inner dot.
 *   - `selected`: 10px outer active circle (selected emphasis state).
 *
 * ## Slots
 *
 * None.
 *
 * ## Events
 *
 * None.
 *
 * ## Keywords/Synonyms
 *
 * ruler, pointer, AR dot, target marker, measurement marker, indicator dot.
 *
 * ## Related Components/Contrast
 *
 * - `obc-poi-pointer`: richer POI pointer component with additional visual states and box handling.
 * - `obc-poi-line` / `obc-poi-graphic-line`: line/connector components, whereas `<obc-ruler-pointer>` is only the endpoint marker.
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
