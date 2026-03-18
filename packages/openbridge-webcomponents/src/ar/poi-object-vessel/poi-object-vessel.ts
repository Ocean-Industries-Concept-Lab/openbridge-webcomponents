import {html, unsafeCSS} from 'lit';
import {property} from 'lit/decorators.js';
import {customElement} from '../../decorator.js';
import {ObcAbstractPoiObject} from '../building-blocks/poi-object/abstract-poi-object.js';
import {ObcPoiObjectType} from '../building-blocks/poi-object/poi-object.js';
import componentStyle from './poi-object-vessel.css?inline';

/**
 * Type variants for vessel POI objects.
 * - `indicator`: Icon only with drop shadow, no background frame.
 * - `regular`: Standard size (48px touch target, 36px background, 24px icon).
 * - `large`: Larger size (64px touch target, 52px background, 36px icon).
 * - `speed-rot`: Composite layout with turn indicator, vessel icon, and speed indicator.
 * - `n-up`: Square background (48px touch target, 32px background, 24px icon).
 * - `n-up-large`: Large square background (64px touch target, 48px background, 36px icon).
 */
export enum ObcPoiObjectVesselType {
  Indicator = 'indicator',
  Regular = 'regular',
  Large = 'large',
  SpeedRot = 'speed-rot',
  NUp = 'n-up',
  NUpLarge = 'n-up-large',
}

export enum ObcPoiObjectVesselStyle {
  Regular = 'regular',
  Categorical = 'categorical',
  Enhanced = 'enhanced',
}

export enum ObcPoiObjectVesselState {
  Unchecked = 'unchecked',
  Checked = 'checked',
  StaticUnchecked = 'static-unchecked',
  StaticChecked = 'static-checked',
  Activated = 'activated',
  Overlapped = 'overlapped',
  Caution = 'caution',
  Warning = 'warning',
  Alarm = 'alarm',
}

/**
 * `<obc-poi-object-vessel>` - Specialized `obc-poi-object` wrapper for vessel-style icon markers.
 *
 * ## Overview
 * Use this component when you need vessel marker visuals with the same base behavior as `obc-poi-object`.
 * It maps vessel-specific types onto the base POI object type system.
 *
 * ## Features/Variants
 * - `type` (default `regular`): `indicator`, `regular`, `large`, `speed-rot`, `n-up`, `n-up-large`.
 * - Inherits `objectStyle`, `state`, and `interactive` behavior from `ObcAbstractPoiObject`.
 * - `speed-rot` layout renders a three-part composition:
 *   - `turn-indicator` slot
 *   - default slot (main vessel icon)
 *   - `speed-indicator` slot
 * - Non-`speed-rot` layouts render only the default slot.
 *
 * ## Usage Guidelines
 * - Use `speed-rot` only when turn and speed indicators are available.
 * - Use `indicator` for icon-only visuals without a background frame.
 * - Keep slot content lightweight to preserve compact marker layout.
 *
 * ## Slots/Content
 * - Default slot: Main vessel icon/content.
 * - `turn-indicator`: Optional turn indicator content used by `speed-rot`.
 * - `speed-indicator`: Optional speed indicator content used by `speed-rot`.
 *
 * ## Events
 * This component does not emit custom events.
 *
 * ## Best Practices
 * - Match icon style and type scale (`regular`, `large`, `n-up`) across related markers.
 * - TODO(designer): Confirm icon style guidance for `indicator` vs non-`indicator` variants.
 *
 * ## Example
 * ```html
 * <obc-poi-object-vessel type="speed-rot" objectStyle="regular" state="checked">
 *   <obi-placeholder slot="turn-indicator"></obi-placeholder>
 *   <obi-placeholder></obi-placeholder>
 *   <obi-placeholder slot="speed-indicator"></obi-placeholder>
 * </obc-poi-object-vessel>
 * ```
 *
 * @slot - Main vessel icon/content.
 * @slot turn-indicator - Optional turn indicator content used by `speed-rot`.
 * @slot speed-indicator - Optional speed indicator content used by `speed-rot`.
 */
@customElement('obc-poi-object-vessel')
export class ObcPoiObjectVessel extends ObcAbstractPoiObject {
  @property({type: String}) type: ObcPoiObjectVesselType =
    ObcPoiObjectVesselType.Regular;

  private get isSpeedRot() {
    return this.type === ObcPoiObjectVesselType.SpeedRot;
  }

  override get baseType(): ObcPoiObjectType {
    switch (this.type) {
      case ObcPoiObjectVesselType.Indicator:
        return ObcPoiObjectType.Indicator;
      case ObcPoiObjectVesselType.Regular:
        return ObcPoiObjectType.Regular;
      case ObcPoiObjectVesselType.Large:
      case ObcPoiObjectVesselType.SpeedRot:
        return ObcPoiObjectType.Large;
      case ObcPoiObjectVesselType.NUp:
        return ObcPoiObjectType.NUp;
      case ObcPoiObjectVesselType.NUpLarge:
        return ObcPoiObjectType.NUpLarge;
      default:
        return ObcPoiObjectType.Regular;
    }
  }

  override get icon() {
    if (this.isSpeedRot) {
      return html`
        <div class="speed-rot-wrapper">
          <div class="turn-indicator">
            <slot name="turn-indicator"></slot>
          </div>
          <div class="vessel-icon">
            <slot></slot>
          </div>
          <div class="speed-indicator">
            <slot name="speed-indicator"></slot>
          </div>
        </div>
      `;
    }
    return html`<slot></slot>`;
  }

  static override styles = [
    ...ObcAbstractPoiObject.styles,
    unsafeCSS(componentStyle),
  ];
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-poi-object-vessel': ObcPoiObjectVessel;
  }
}
