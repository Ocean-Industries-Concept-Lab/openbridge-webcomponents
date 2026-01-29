import {html, css, unsafeCSS} from 'lit';
import {property} from 'lit/decorators.js';
import {customElement} from '../../decorator.js';
import {ObcAbstractPoiObject} from '../poi-object/abstract-poi-object.js';
import {
  ObcPoiObjectType,
  ObcPoiObjectStyle,
  ObcPoiObjectState,
} from '../poi-object/poi-object.js';
import componentStyle from './poi-object-vessel.css?inline';

/**
 * Type variants for POI Object Vessel.
 * Extends the base types with vessel-specific `speedRot` type.
 */
export enum ObcPoiObjectVesselType {
  Indicator = 'indicator',
  Regular = 'regular',
  Large = 'large',
  SpeedRot = 'speed-rot',
  NUp = 'n-up',
  NUpLarge = 'n-up-large',
}

// Re-export for convenience
export {ObcPoiObjectStyle as ObcPoiObjectVesselStyle};
export {ObcPoiObjectState as ObcPoiObjectVesselState};

/**
 * `<obc-poi-object-vessel>` - An interactive vessel icon button for POI (Point of Interest) display.
 *
 * Renders a vessel type icon as a clickable button with configurable size, style, and selection state.
 * Commonly used in POI card headers, map overlays, and target lists to represent
 * tracked vessels with visual differentiation based on category and selection.
 *
 * ## Features
 *
 * - **Interactive button:** Full keyboard and mouse support with hover/active states.
 * - **Type variants:** Control size and layout (indicator, regular, large, speed-rot, n-up, n-up-large).
 * - **Style variants:** Regular (white/translucent) or Categorical (blue-tinted) backgrounds.
 * - **State variants:** Selection, activation, and overlap states for interactive contexts.
 * - **State container:** Indicator type uses overlay-style hover (darker), other types use regular-style hover (lighter).
 *
 * ## Slots
 *
 * | Slot Name        | Purpose                                           |
 * |------------------|---------------------------------------------------|
 * | (default)        | Vessel icon (use outlined icons for most types)   |
 * | turn-indicator   | Turn rate indicator (speed-rot type only)         |
 * | speed-indicator  | Speed indicator (speed-rot type only)             |
 *
 * ## Usage Notes
 *
 * - **Indicator type:** Use filled icon variants with `useCssColor` attribute for proper stroke outline rendering.
 *   Uses overlay-style state container (darker hover/active backgrounds).
 * - **Other types:** Use outlined icon variants. Uses regular-style state container (lighter hover/active backgrounds).
 *
 * ## Example
 *
 * ```html
 * <!-- Regular type with outlined icon -->
 * <obc-poi-object-vessel type="regular" objectStyle="regular" state="checked"
 *   @click=${handleVesselClick}>
 *   <obi-vessel-type-passenger-outlined></obi-vessel-type-passenger-outlined>
 * </obc-poi-object-vessel>
 *
 * <!-- Indicator type requires filled icon with useCssColor -->
 * <obc-poi-object-vessel type="indicator" state="unchecked"
 *   @click=${handleVesselClick}>
 *   <obi-vessel-type-passenger-filled useCssColor></obi-vessel-type-passenger-filled>
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

  // Map vessel-specific type to base type
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
        throw new Error(`Invalid vessel type: ${this.type}`);
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
