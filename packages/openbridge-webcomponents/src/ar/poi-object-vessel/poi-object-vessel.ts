import {html, css, unsafeCSS} from 'lit';
import {property} from 'lit/decorators.js';
import {customElement} from '../../decorator.js';
import {ObcAbstractPoiObject} from '../building-blocks/poi-object/abstract-poi-object.js';
import {
  ObcPoiObjectType,
  ObcPoiObjectStyle,
  ObcPoiObjectState,
} from '../building-blocks/poi-object/poi-object.js';
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

export {ObcPoiObjectStyle as ObcPoiObjectVesselStyle};
export {ObcPoiObjectState as ObcPoiObjectVesselState};

/**
 * `<obc-poi-object-vessel>` – Vessel icon button for POI display.
 *
 * Renders a vessel icon as a clickable button with configurable size, style, and
 * selection state. Used in POI card headers, map overlays, and target lists.
 *
 * ## Features
 *
 * - **Type variants:** `indicator`, `regular`, `large`, `speed-rot`, `n-up`, `n-up-large`.
 * - **Style variants:** `regular` (white/translucent) or `categorical` (blue-tinted).
 * - **State variants:** Selection, activation, and overlap states.
 * - **Speed-rot type:** Composite layout with turn indicator, vessel icon, and speed indicator slots.
 *
 * ## Usage
 *
 * - **Indicator type:** Use filled icon variants with `useCssColor` attribute.
 * - **Other types:** Use outlined icon variants.
 *
 * ## Example
 *
 * ```html
 * <obc-poi-object-vessel type="regular" objectStyle="regular" state="checked">
 *   <obi-vessel-type-passenger-outlined></obi-vessel-type-passenger-outlined>
 * </obc-poi-object-vessel>
 * ```
 *
 * @slot - Vessel icon to display
 * @slot turn-indicator - Turn rate indicator (speed-rot type only)
 * @slot speed-indicator - Speed indicator (speed-rot type only)
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

  override get extraClasses(): Record<string, boolean> {
    return {
      'type-speed-rot': this.isSpeedRot,
    };
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
    css`
      :host {
        display: contents;
      }
    `,
    unsafeCSS(componentStyle),
  ];
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-poi-object-vessel': ObcPoiObjectVessel;
  }
}
