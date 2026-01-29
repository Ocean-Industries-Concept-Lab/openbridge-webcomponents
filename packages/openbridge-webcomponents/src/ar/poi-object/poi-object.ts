import {LitElement, html, unsafeCSS, nothing} from 'lit';
import {property} from 'lit/decorators.js';
import {classMap} from 'lit/directives/class-map.js';
import componentStyle from './poi-object.css?inline';
import {customElement} from '../../decorator.js';

/**
 * Common type variants shared across all POI objects.
 * - `indicator`: Icon only with drop shadow, no background circle.
 * - `regular`: Standard size (48px touch, 36px round background, 24px icon)
 * - `large`: Larger size (64px touch, 52px round background, 36px icon)
 * - `nUp`: Square background (48px touch, 32px square background, 24px icon)
 * - `nUpLarge`: Large square background (64px touch, 48px square background, 36px icon)
 */
export enum ObcPoiObjectType {
  Indicator = 'indicator',
  Regular = 'regular',
  Large = 'large',
  NUp = 'n-up',
  NUpLarge = 'n-up-large',
}

/**
 * Common style variants shared across most POI objects.
 * - `regular`: Default white/translucent background
 * - `categorical`: Blue tinted background for categorized items
 */
export enum ObcPoiObjectStyle {
  Regular = 'regular',
  Categorical = 'categorical',
}

/**
 * State variants for POI objects.
 * - `unchecked`: Default state
 * - `checked`
 * - `staticUnchecked`: Flat/normal style background
 * - `staticChecked`: Flat style with selection frame
 * - `activated`: Has white outer ring around background
 * - `overlapped`: Smaller circle, icon hidden (for overlapping markers)
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
 * `<obc-poi-object>` - Base component for POI (Point of Interest) object buttons.
 *
 * This is the foundational component used by all POI object variants (vessel, people,
 * location, etc.). It provides the shared structure, styling, and behavior for
 * interactive POI markers.
 *
 * ## Features
 *
 * - **Interactive button:** Full keyboard and mouse support with hover/active states.
 * - **Type variants:** Control size and layout (indicator, regular, large, n-up, n-up-large).
 * - **Style variants:** Regular (white/translucent) or Categorical (blue-tinted) backgrounds.
 * - **State variants:** Selection, activation, and overlap states for interactive contexts.
 *
 * ## Slots
 *
 * | Slot Name | Purpose |
 * |-----------|---------|
 * | (default) | Icon content |
 *
 * @slot - Icon to display
 */
@customElement('obc-poi-object')
export class ObcPoiObject extends LitElement {
  @property({type: String}) type: ObcPoiObjectType = ObcPoiObjectType.Regular;

  @property({type: String}) objectStyle: ObcPoiObjectStyle =
    ObcPoiObjectStyle.Regular;

  @property({type: String}) state: ObcPoiObjectState =
    ObcPoiObjectState.Unchecked;

  /** Enables button behavior with hover/active states and keyboard support. */
  @property({type: Boolean}) interactive = false;

  /** Extra CSS classes to add to the wrapper - used by subclasses for type-specific styling */
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
    if (e.key === 'Enter' || e.key === ' ') {
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
      >
        ${this.isActivated
          ? html`<div class="activated-frame"></div>`
          : nothing}
        ${!this.isIndicator || this.isOverlapped || this.isInteractive
          ? html`<div class="background-frame"></div>`
          : nothing}

        <div class="icon-container">
          <slot></slot>
        </div>
      </div>
    `;
  }

  static override styles = unsafeCSS(componentStyle);
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-poi-object': ObcPoiObject;
  }
}
