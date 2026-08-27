import {LitElement, html, unsafeCSS} from 'lit';
import type {PropertyValues, TemplateResult} from 'lit';
import {property, state} from 'lit/decorators.js';
import {classMap} from 'lit/directives/class-map.js';
import componentStyle from './shuffle-button.css?inline';
import {
  clampPosition,
  shuffleSlotCount,
  shuffleWindowOffset,
} from './shuffle-layout.js';

/**
 * Detail payload for the `position-selected` event dispatched by
 * shuffle-button components. `position` is the zero-based position the user
 * requested.
 */
export interface PositionSelectedDetail {
  position: number;
}

/**
 * The `position-selected` event dispatched by shuffle-button components.
 */
export type PositionSelectedEvent = CustomEvent<PositionSelectedDetail>;

/**
 * Base class for shuffle-button selectors: a control whose selected thumb
 * always occupies the fixed center slot of a (2·n−1)-slot row (or column when
 * `vertical`). Option thumbs keep their logical order and redistribute to
 * either side of the selected thumb; empty spacer slots absorb the remaining
 * length so the total size never changes.
 *
 * ## Controlled selection
 * Clicking an option or pressing an arrow key only fires `position-selected`.
 * The host application sets `selectedPosition` once the device confirms the
 * change, so the control never shows a position the device has not reached.
 *
 * ## Keyboard
 * Follows the WAI-ARIA radio group pattern
 * (https://www.w3.org/WAI/ARIA/apg/patterns/radio/): `role="radiogroup"` with
 * one `role="radio"` thumb per position, a single tab stop on the selected
 * thumb, and Left/Up and Right/Down moving to the previous/next position with
 * wrap-around. Departures: arrow keys request the position rather than moving
 * the checked state (controlled selection above), and focus follows the thumb
 * only once the host confirms it. Space/Enter on a focused thumb request it
 * through the native button click. Home/End are out of scope.
 *
 * Subclasses define `positionCount` and `renderPositionIcon()` and carry the
 * `@fires position-selected` tag: the manifest and the framework wrappers read
 * events from the registered element, not from this base.
 *
 * Not declared `abstract`: the wrapper generators wrap every `LitElement`
 * subclass and pass its constructor as a concrete `Constructor<T>`, so the
 * default implementations below stand in for abstract members (same as
 * `ObcAbstractAutomationButton`).
 *
 * @property selectedPosition - Zero-based index of the currently selected position. Out-of-range values are clamped.
 * @property vertical - Lays the control out vertically: positions stack top to bottom and the position symbols rotate 90° counter-clockwise to match a vertical flow path.
 * @property ariaLabel - Accessible name for the radio group (the control is icon-only). Concrete components override the default with a device-specific name.
 */
export class ObcShuffleButtonBase extends LitElement {
  @property({type: Number}) selectedPosition = 1;

  @property({type: Boolean}) vertical = false;

  @property({type: String}) override ariaLabel = 'Position selector';

  @state() private suppressHover = false;

  protected get positionCount(): number {
    return 1;
  }

  protected renderPositionIcon(_position: number): TemplateResult {
    return html``;
  }

  override render() {
    const count = this.positionCount;
    const selected = clampPosition(count, this.selectedPosition);
    return html`
      <div
        class=${classMap({shuffle: true, vertical: this.vertical})}
        role="radiogroup"
        aria-label=${this.ariaLabel}
        aria-orientation=${this.vertical ? 'vertical' : 'horizontal'}
        style="--_shuffle-slot-count: ${shuffleSlotCount(
          count
        )}; --_shuffle-window-offset: ${shuffleWindowOffset(
          count,
          selected
        )};${this.suppressHover ? ' --obc-can-hover: 0;' : ''}"
        @keydown=${this.handleKeydown}
        @pointermove=${this.restoreHover}
      >
        <div class="window">
          <div class="track"></div>
          ${Array.from({length: count}, (_, position) =>
            this.renderThumb(position, selected)
          )}
        </div>
      </div>
    `;
  }

  private renderThumb(position: number, selected: number) {
    const isSelected = position === selected;
    return html`
      <button
        class=${classMap({thumb: true, selected: isSelected})}
        type="button"
        role="radio"
        aria-checked=${isSelected}
        tabindex=${isSelected ? 0 : -1}
        @click=${() => this.requestPosition(position)}
      >
        <div class="visible-wrapper">
          <div class="icon-container">${this.renderPositionIcon(position)}</div>
        </div>
      </button>
    `;
  }

  private requestPosition(position: number) {
    if (position === clampPosition(this.positionCount, this.selectedPosition)) {
      return;
    }
    // Browsers keep :hover on the thumb that shuffles away from under a
    // stationary pointer; mute hover feedback until the pointer really moves.
    this.suppressHover = true;
    const event: PositionSelectedEvent = new CustomEvent('position-selected', {
      detail: {position},
      bubbles: true,
      composed: true,
    });
    this.dispatchEvent(event);
  }

  private restoreHover() {
    this.suppressHover = false;
  }

  private handleKeydown(event: KeyboardEvent) {
    let delta: number;
    if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
      delta = 1;
    } else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
      delta = -1;
    } else {
      return;
    }
    event.preventDefault();
    const count = this.positionCount;
    const selected = clampPosition(count, this.selectedPosition);
    this.requestPosition((selected + delta + count) % count);
  }

  protected override updated(changed: PropertyValues) {
    if (
      changed.has('selectedPosition') &&
      this.shadowRoot?.activeElement instanceof HTMLElement
    ) {
      this.shadowRoot
        .querySelector<HTMLButtonElement>('button.thumb.selected')
        ?.focus();
    }
  }

  static override styles = unsafeCSS(componentStyle);
}
