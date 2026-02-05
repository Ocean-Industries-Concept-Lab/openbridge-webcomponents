import {LitElement, html, unsafeCSS, nothing} from 'lit';
import {property} from 'lit/decorators.js';
import {classMap} from 'lit/directives/class-map.js';
import componentStyle from './poi-object.css?inline';
import {customElement} from '../../../decorator.js';

/**
 * Type variants for POI objects controlling size and shape.
 * - `indicator`: Icon only with drop shadow, no background frame.
 * - `regular`: Standard size (48px touch target, 36px background, 24px icon).
 * - `large`: Larger size (64px touch target, 52px background, 36px icon).
 * - `n-up`: Square background (48px touch target, 32px background, 24px icon).
 * - `n-up-large`: Large square background (64px touch target, 48px background, 36px icon).
 */
export enum ObcPoiObjectType {
  Indicator = 'indicator',
  Regular = 'regular',
  Large = 'large',
  NUp = 'n-up',
  NUpLarge = 'n-up-large',
}

/**
 * Style variants for POI objects.
 * - `regular`: White/translucent background.
 * - `categorical`: Blue-tinted background for categorized items.
 */
export enum ObcPoiObjectStyle {
  Regular = 'regular',
  Categorical = 'categorical',
}

/**
 * State variants for POI objects controlling selection and display modes.
 * - `unchecked`: Default state.
 * - `checked`: Selected state with visual indicator.
 * - `static-unchecked`: Flat background style, not selected.
 * - `static-checked`: Flat background style, selected.
 * - `activated`: White outer ring around background.
 * - `overlapped`: Smaller circle with hidden icon (for overlapping markers).
 */
export enum ObcPoiObjectState {
  Unchecked = 'unchecked',
  Checked = 'checked',
  StaticUnchecked = 'static-unchecked',
  StaticChecked = 'static-checked',
  Activated = 'activated',
  Overlapped = 'overlapped',
}

/**
 * `<obc-poi-object>` – Base icon button component for interactive markers.
 *
 * Renders an icon within a styled frame with configurable size, visual style, and
 * selection state. Used as the foundation for domain-specific marker components.
 *
 * ## Features/Variants
 *
 * ### Type (`type`)
 * Controls size and shape. Defaults to `regular`.
 * - `indicator`: Icon only with drop shadow, no background frame.
 * - `regular`: Standard size (48px touch target, 36px background, 24px icon).
 * - `large`: Larger size (64px touch target, 52px background, 36px icon).
 * - `n-up`: Square background (48px touch target, 32px background, 24px icon).
 * - `n-up-large`: Large square background (64px touch target, 48px background, 36px icon).
 *
 * ### Style (`objectStyle`)
 * Controls background color scheme. Defaults to `regular`.
 * - `regular`: White/translucent background.
 * - `categorical`: Blue-tinted background for categorized items.
 *
 * ### State (`state`)
 * Controls selection and display mode. Defaults to `unchecked`.
 * - `unchecked`: Default unselected state.
 * - `checked`: Selected state with visual indicator.
 * - `static-unchecked`: Flat background style, not selected.
 * - `static-checked`: Flat background style, selected.
 * - `activated`: White outer ring around background.
 * - `overlapped`: Smaller circle with hidden icon (for clustered markers).
 *
 * ### Interactive (`interactive`)
 * When `true`, enables keyboard navigation (Enter/Space activation), focus states,
 * and hover/active visual feedback. Defaults to `false`.
 *
 * ### Extra Classes (`extraClasses`)
 * Internal property for subclasses to inject additional CSS classes. Not reflected
 * as an attribute. TODO(designer): Clarify if this should be exposed or remain internal.
 *
 * ## Usage Guidelines
 *
 * Typically consumed indirectly via concrete subclass components that extend
 * `ObcAbstractPoiObject`. Direct usage is for building new marker types.
 *
 * ## Slots/Content
 *
 * @slot - Icon element to display inside the button frame.
 *
 * ## Events
 *
 * This component does not emit custom events. Click handling is delegated to the
 * native `click` event when `interactive` is enabled.
 *
 * ## Best Practices
 *
 * - Use `indicator` type for decorative markers that don't need a background.
 * - Set `interactive` to `true` only when the marker should be clickable/focusable.
 * - Use `overlapped` state for markers in dense clusters to reduce visual noise.
 *
 * ## Example
 *
 * ```html
 * <obc-poi-object type="regular" objectStyle="regular" state="checked" interactive>
 *   <my-custom-icon></my-custom-icon>
 * </obc-poi-object>
 * ```
 */
export abstract class ObcPoiObjectBase extends LitElement {
  @property({type: String, reflect: true})
  type: ObcPoiObjectType = ObcPoiObjectType.Regular;

  @property({type: String}) objectStyle: ObcPoiObjectStyle =
    ObcPoiObjectStyle.Regular;

  @property({type: String}) state: ObcPoiObjectState =
    ObcPoiObjectState.Unchecked;

  @property({type: Boolean}) interactive = false;

  @property({attribute: false}) extraClasses: Record<string, boolean> = {};

  private get isChecked() {
    return (
      this.state === ObcPoiObjectState.Checked ||
      this.state === ObcPoiObjectState.StaticChecked
    );
  }

  private get isStatic() {
    return (
      this.state === ObcPoiObjectState.StaticUnchecked ||
      this.state === ObcPoiObjectState.StaticChecked
    );
  }

  private get isActivated() {
    return this.state === ObcPoiObjectState.Activated;
  }

  private get isOverlapped() {
    return this.state === ObcPoiObjectState.Overlapped;
  }

  private get isInteractive() {
    return this.interactive && !this.isOverlapped;
  }

  private get isSquare() {
    return (
      this.type === ObcPoiObjectType.NUp ||
      this.type === ObcPoiObjectType.NUpLarge
    );
  }

  private get isLargeSize() {
    return (
      this.type === ObcPoiObjectType.Large ||
      this.type === ObcPoiObjectType.NUpLarge
    );
  }

  private get isIndicator() {
    return this.type === ObcPoiObjectType.Indicator;
  }

  private handleKeyDown(e: KeyboardEvent) {
    if (!this.isInteractive) return;
    if (e.target !== e.currentTarget) return;
    if (e.key === ' ') {
      e.preventDefault();
    } else if (e.key === 'Enter' && !e.repeat) {
      e.preventDefault();
      this.click();
    }
  }

  private handleKeyUp(e: KeyboardEvent) {
    if (!this.isInteractive) return;
    if (e.target !== e.currentTarget) return;
    if (e.key === ' ') {
      e.preventDefault();
      this.click();
    }
  }

  override render() {
    const classes = {
      wrapper: true,
      [`type-${this.type}`]: true,
      [`style-${this.objectStyle}`]: true,
      [`state-${this.state}`]: true,
      'is-static': this.isStatic,
      'is-checked': this.isChecked,
      'is-activated': this.isActivated,
      'is-overlapped': this.isOverlapped,
      'is-square': this.isSquare,
      'is-large': this.isLargeSize,
      'is-indicator': this.isIndicator,
      interactive: this.isInteractive,
      ...this.extraClasses,
    };

    return html`
      <div
        class=${classMap(classes)}
        role=${this.isInteractive ? 'button' : nothing}
        tabindex=${this.isInteractive ? '0' : nothing}
        @keydown=${this.handleKeyDown}
        @keyup=${this.handleKeyUp}
      >
        ${this.isActivated
          ? html`<div class="activated-frame" part="activated-frame"></div>`
          : nothing}
        ${!this.isIndicator || this.isOverlapped || this.isInteractive
          ? html`<div class="background-frame" part="background-frame"></div>`
          : nothing}

        <div class="icon-container" part="icon-container">
          <slot></slot>
        </div>
      </div>
    `;
  }

  static override styles = unsafeCSS(componentStyle);
}

@customElement('obc-poi-object')
export class ObcPoiObject extends ObcPoiObjectBase {}

declare global {
  interface HTMLElementTagNameMap {
    'obc-poi-object': ObcPoiObject;
  }
}
