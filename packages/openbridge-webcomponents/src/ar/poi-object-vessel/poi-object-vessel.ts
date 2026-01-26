import {LitElement, html, unsafeCSS, nothing} from 'lit';
import {property} from 'lit/decorators.js';
import {classMap} from 'lit/directives/class-map.js';
import componentStyle from './poi-object-vessel.css?inline';
import {customElement} from '../../decorator.js';

/**
 * Type variants for POI Object Vessel.
 * - `indicator`: Icon only with drop shadow, no background circle.
 *   **Important:** Use filled icon variants with `useCssColor` for proper rendering.
 * - `regular`: Standard size (48px touch, 36px round background, 24px icon)
 * - `large`: Larger size (64px touch, 52px round background, 36px icon)
 * - `speedRot`: Large with turn indicator and speed indicator (64px touch, 52px round)
 * - `nUp`: Square background (48px touch, 32px square background, 24px icon)
 * - `nUpLarge`: Large square background (64px touch, 48px square background, 36px icon)
 */
export enum ObcPoiObjectVesselType {
  Indicator = 'indicator',
  Regular = 'regular',
  Large = 'large',
  SpeedRot = 'speed-rot',
  NUp = 'n-up',
  NUpLarge = 'n-up-large',
}

/**
 * Style variants for POI Object Vessel.
 * - `regular`: Default white/translucent background
 * - `categorical`: Blue tinted background for categorized vessels
 */
export enum ObcPoiObjectVesselStyle {
  Regular = 'regular',
  Categorical = 'categorical',
}

/**
 * State variants for POI Object Vessel.
 * - `unchecked`: Default state
 * - `checked`
 * - `staticUnchecked`: Flat/normal style background
 * - `staticChecked`: Flat style with selection frame
 * - `activated`: Has white outer ring around background
 * - `overlapped`: Smaller circle, icon hidden (for overlapping markers)
 */
export enum ObcPoiObjectVesselState {
  Unchecked = 'unchecked',
  Checked = 'checked',
  StaticUnchecked = 'static-unchecked',
  StaticChecked = 'static-checked',
  Activated = 'activated',
  Overlapped = 'overlapped',
}

/**
 * `<obc-poi-object-vessel>` – A vessel icon component for POI display.
 *
 * Displays a vessel icon with configurable type, style, and state variants.
 * Designed for use in card headers and other inline contexts.
 *
 * ## Features
 *
 * - **Types:** Indicator, Regular, Large, Speed+ROT, N-up, N-up Large
 * - **Styles:** Regular (white) and Categorical (blue) backgrounds
 * - **States:** Various selection and display states
 *
 * ## Slots
 *
 * | Slot Name | Purpose |
 * |-----------|---------|
 * | (default) | Vessel icon |
 * | turn-indicator | Turn rate indicator (Speed+ROT type only) |
 * | speed-indicator | Speed indicator (Speed+ROT type only) |
 *
 * ## Example
 *
 * ```html
 * <!-- Regular type with outlined icon -->
 * <obc-poi-object-vessel type="regular" vesselStyle="regular" state="checked">
 *   <obi-vessel-type-passenger-outlined></obi-vessel-type-passenger-outlined>
 * </obc-poi-object-vessel>
 *
 * <!-- Indicator type requires filled icon with useCssColor for white outline -->
 * <obc-poi-object-vessel type="indicator" state="unchecked">
 *   <obi-vessel-type-passenger-filled useCssColor></obi-vessel-type-passenger-filled>
 * </obc-poi-object-vessel>
 * ```
 *
 * @slot - Vessel icon to display
 * @slot turn-indicator - Turn rate indicator (Speed+ROT type only)
 * @slot speed-indicator - Speed indicator (Speed+ROT type only)
 */
@customElement('obc-poi-object-vessel')
export class ObcPoiObjectVessel extends LitElement {
  /** Size/type variant: indicator, regular, large, speed-rot, n-up, n-up-large. */
  @property({type: String}) type: ObcPoiObjectVesselType =
    ObcPoiObjectVesselType.Regular;

  /** Visual style variant: regular or categorical. */
  @property({type: String}) vesselStyle: ObcPoiObjectVesselStyle =
    ObcPoiObjectVesselStyle.Regular;

  /** State variant controlling selection and display mode. */
  @property({type: String}) state: ObcPoiObjectVesselState =
    ObcPoiObjectVesselState.Unchecked;

  private get isChecked() {
    return (
      this.state === ObcPoiObjectVesselState.Checked ||
      this.state === ObcPoiObjectVesselState.StaticChecked
    );
  }

  private get isStatic() {
    return (
      this.state === ObcPoiObjectVesselState.StaticUnchecked ||
      this.state === ObcPoiObjectVesselState.StaticChecked
    );
  }

  private get isActivated() {
    return this.state === ObcPoiObjectVesselState.Activated;
  }

  private get isOverlapped() {
    return this.state === ObcPoiObjectVesselState.Overlapped;
  }

  private get isSquare() {
    return (
      this.type === ObcPoiObjectVesselType.NUp ||
      this.type === ObcPoiObjectVesselType.NUpLarge
    );
  }

  private get isLargeSize() {
    return (
      this.type === ObcPoiObjectVesselType.Large ||
      this.type === ObcPoiObjectVesselType.SpeedRot ||
      this.type === ObcPoiObjectVesselType.NUpLarge
    );
  }

  override render() {
    const isIndicator = this.type === ObcPoiObjectVesselType.Indicator;
    const isSpeedRot = this.type === ObcPoiObjectVesselType.SpeedRot;

    const classes = {
      wrapper: true,
      [`type-${this.type}`]: true,
      [`style-${this.vesselStyle}`]: true,
      [`state-${this.state}`]: true,
      'is-static': this.isStatic,
      'is-checked': this.isChecked,
      'is-activated': this.isActivated,
      'is-overlapped': this.isOverlapped,
      'is-square': this.isSquare,
      'is-large': this.isLargeSize,
    };

    return html`
      <div class=${classMap(classes)}>
        ${this.isActivated
          ? html`<div class="activated-frame"></div>`
          : nothing}

        ${!isIndicator || this.isOverlapped
          ? html`<div class="background-frame"></div>`
          : nothing}

        
        <div class="icon-container">
          ${isSpeedRot
            ? html`
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
              `
            : html`<slot></slot>`}
        </div>

        ${!isIndicator ? html`<div class="state-layer"></div>` : nothing}
      </div>
    `;
  }

  static override styles = unsafeCSS(componentStyle);
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-poi-object-vessel': ObcPoiObjectVessel;
  }
}
