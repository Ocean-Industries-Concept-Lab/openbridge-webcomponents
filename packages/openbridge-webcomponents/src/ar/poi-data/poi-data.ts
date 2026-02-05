import {customElement} from '../../decorator.js';
import {ObcPoiDataBase} from '../../building-blocks/poi-data/poi-data-base.js';

export {
  PoiDataValue,
  Pointer,
  TargetState,
} from '../../building-blocks/poi-data/poi-data-base.js';

/**
 * `<obc-poi-data>` renders a point-of-interest marker with a selectable target
 * button and optional pointer line.
 *
 * Use this component inside `obc-poi-layer` or `obc-poi-group` to
 * position targets in AR layers and present status or selection state for a
 * detection or tracked object.
 *
 * ### Features
 * - Positions via `x` and a configurable pointer line.
 * - Visual emphasis controlled by `value` (see `PoiDataValue`).
 * - Alarm state controlled by `state` (enabled, caution, warning, alarm).
 * - Multi-value button rendering via the `data` array.
 * - Horizontal nudging via `buttonOffsetX` for overlap or crossing layouts.
 * - Supports alert, selection, and pointer variants.
 *
 * ### Usage Guidelines
 * - Set `x` in pixels to place the target relative to its container.
 * - Use `height` to set the target/button position:
 *   - When `fixed-target=true`: height is where the line bottom should be (target position)
 *   - When `fixed-target=false`: height is where the button should be (button position)
 * - Use `y` for the pointer line length (distance from button to target).
 * - Set `fixed-target` to `false` for layer mode (button position fixed, line extends) - default.
 * - Set `fixed-target` to `true` for standalone/CV mode (target position fixed, button moves).
 * - Use `value` to align with layer or group overlap logic (unchecked, overlapped, etc.).
 * - Use `state` to set alarm level (enabled, caution, warning, alarm).
 * - Provide `data` to display secondary statuses on the button.
 * - Adjust `buttonOffsetX` only when resolving collisions in a layer.
 *
 * ### Slots
 * - None.
 *
 * ### Events
 * - None. This component does not emit custom events.
 *
 * ### Best Practices
 * - Use within `obc-poi-layer` for automatic grouping and overlap behaviors.
 * - Keep pointer lines short to reduce visual clutter.
 * - Prefer `PoiDataValue` enum values over manual styling.
 *
 * ### Example
 * ```html
 * <obc-poi-data x="120" height="200" y="192"></obc-poi-data>
 * ```
 *
 * @slot none
 * @fires none - This component does not emit custom events.
 */

@customElement('obc-poi-data')
export class ObcPoiData extends ObcPoiDataBase {}

declare global {
  interface HTMLElementTagNameMap {
    'obc-poi-data': ObcPoiData;
  }
}
