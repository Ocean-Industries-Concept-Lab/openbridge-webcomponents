import {LitElement, html, unsafeCSS, nothing} from 'lit';
import {property} from 'lit/decorators.js';
import {classMap} from 'lit/directives/class-map.js';
import componentStyle from './poi-object.css?inline';
import {customElement} from '../../decorator.js';

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
 * `<obc-poi-object>` – Base component for POI (Point of Interest) icon buttons.
 *
 * Provides the shared structure, styling, and behavior for interactive POI markers
 * used in map overlays and target lists. Extend via `ObcAbstractPoiObject` to create
 * domain-specific variants (vessel, person, waypoint, etc.).
 *
 * ## Features
 *
 * - **Type variants:** `indicator` (icon only), `regular`, `large`, `n-up`, `n-up-large`.
 * - **Style variants:** `regular` (white/translucent) or `categorical` (blue-tinted).
 * - **State variants:** `unchecked`, `checked`, `static-unchecked`, `static-checked`, `activated`, `overlapped`.
 * - **Interactive mode:** Enables keyboard/mouse support with hover/active states.
 *
 * ## Usage
 *
 * Typically consumed indirectly via concrete POI object components like
 * `<obc-poi-object-vessel>`. Direct usage is for building new POI object types.
 *
 * @slot - Icon to display inside the POI button
 */
@customElement('obc-poi-object')
export class ObcPoiObject extends LitElement {
  @property({type: String}) type: ObcPoiObjectType = ObcPoiObjectType.Regular;

  @property({type: String}) objectStyle: ObcPoiObjectStyle =
    ObcPoiObjectStyle.Regular;

  @property({type: String}) state: ObcPoiObjectState =
    ObcPoiObjectState.Unchecked;

  @property({type: Boolean}) interactive = false;

  /** Used by subclasses for type-specific styling. */
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
