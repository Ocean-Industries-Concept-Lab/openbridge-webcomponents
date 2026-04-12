import {LitElement, html, unsafeCSS, nothing} from 'lit';
import {property, state} from 'lit/decorators.js';
import {classMap} from 'lit/directives/class-map.js';
import componentStyle from './poi-object.css?inline';
import {customElement} from '../../../decorator.js';

/**
 * Type variants for POI objects controlling size and shape.
 * - `indicator`: Icon only with drop shadow, no background frame.
 * - `regular`: Standard size (`--maneuvering-components-poi-button-touch-target` touch target, 36px background, 24px icon).
 * - `large`: Larger size (`--maneuvering-components-poi-button-large-touch-target` touch target, 52px background, 36px icon).
 * - `n-up`: Square background (`--maneuvering-components-poi-button-touch-target` touch target, 32px background, 24px icon).
 * - `n-up-large`: Large square background (`--maneuvering-components-poi-button-large-touch-target` touch target, 48px background, 36px icon).
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
 * - `enhanced`: Elevated/prominent background style.
 */
export enum ObcPoiObjectStyle {
  Regular = 'regular',
  Categorical = 'categorical',
  Enhanced = 'enhanced',
}

/**
 * State variants for POI objects controlling selection and display modes.
 * - `unchecked`: Default state.
 * - `checked`: Selected state with visual indicator.
 * - `static-unchecked`: Flat background style, not selected.
 * - `static-checked`: Flat background style, selected.
 * - `activated`: White outer ring around background.
 * - `overlapped`: Smaller circle with hidden icon (for overlapping markers).
 * - `caution`: Caution alert state.
 * - `warning`: Warning alert state.
 * - `alarm`: Alarm alert state.
 */
export enum ObcPoiObjectState {
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
 * `<obc-poi-object>` - Base icon marker button used as the visual core of POI-style targets.
 *
 * ## Overview
 * This component renders slotted icon content inside a configurable frame that handles size, style, and state variants.
 * Keywords/synonyms: marker button, icon target, target chip, point marker.
 *
 * ## Features/Variants
 * - `type` (default `regular`): `indicator`, `regular`, `large`, `n-up`, `n-up-large`.
 * - `objectStyle` (default `regular`): `regular` or `categorical`.
 * - `state` (default `unchecked`): `unchecked`, `checked`, `static-unchecked`, `static-checked`, `activated`, `overlapped`.
 * - `interactive` (default `false`): enables keyboard activation (`Enter`/`Space`) and focus/active semantics.
 * - Placeholder icon handling: adds a CSS state when the default slot contains `obi-placeholder`.
 *
 * ## Usage Guidelines
 * - Use `indicator` for icon-only visuals without a background frame.
 * - Use `regular` or `large` for circular framed targets.
 * - Use `n-up` or `n-up-large` for square framed targets.
 * - Use `overlapped` when icon content should collapse to reduce visual density.
 *
 * ## Slots/Content
 * - Default slot: Icon/content displayed inside the marker frame.
 *
 * ## Events
 * This component does not emit custom events.
 * Native `click` is available when `interactive` is enabled.
 *
 * ## Best Practices
 * - Keep `interactive` disabled for decorative markers.
 * - Map `state` directly from application state to avoid mixed visual semantics.
 *
 * ## Example
 * ```html
 * <obc-poi-object type="regular" objectStyle="regular" state="checked" interactive>
 *   <obi-placeholder></obi-placeholder>
 * </obc-poi-object>
 * ```
 *
 * @slot - Icon/content displayed inside the marker frame.
 */
@customElement('obc-poi-object')
export class ObcPoiObject extends LitElement {
  @property({type: String})
  type: ObcPoiObjectType = ObcPoiObjectType.Regular;

  @property({type: String}) objectStyle: ObcPoiObjectStyle =
    ObcPoiObjectStyle.Regular;

  @property({type: String}) state: ObcPoiObjectState =
    ObcPoiObjectState.Unchecked;

  @property({type: Boolean}) interactive = false;

  @state() private hasPlaceholderIcon = false;

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

  private handleSlotChange(e: Event) {
    const slot = e.target as HTMLSlotElement;
    const hasPlaceholderIcon = slot
      .assignedElements({flatten: true})
      .some((element) => element.tagName.toLowerCase() === 'obi-placeholder');

    if (hasPlaceholderIcon !== this.hasPlaceholderIcon) {
      this.hasPlaceholderIcon = hasPlaceholderIcon;
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
      'has-placeholder-icon': this.hasPlaceholderIcon,
      interactive: this.isInteractive,
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
          ${this.isIndicator && this.hasPlaceholderIcon
            ? html`<svg
                class="indicator-placeholder-fill"
                viewBox="0 0 24 24"
                aria-hidden="true"
                focusable="false"
              >
                <path d="M12 3L3 12L12 21L21 12L12 3Z"></path>
              </svg>`
            : nothing}
          <slot @slotchange=${this.handleSlotChange}></slot>
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
