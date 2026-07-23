import {LitElement, html, unsafeCSS} from 'lit';
import type {PropertyValues, TemplateResult} from 'lit';
import {property} from 'lit/decorators.js';
import {classMap} from 'lit/directives/class-map.js';
import componentStyle from './shuffle-button.css?inline';
import {
  clampPosition,
  shuffleSlotCount,
  shuffleWindowOffset,
} from './shuffle-layout.js';

/**
 * Payload for the `position-selected` event dispatched by shuffle-button
 * components. `position` is the zero-based position the user requested.
 */
export type PositionSelectedEvent = CustomEvent<{position: number}>;

/**
 * Base class for "shuffle button" selectors: a horizontal control whose
 * selected thumb always occupies the fixed center slot of a (2·n−1)-slot row.
 * Option thumbs keep their logical order and redistribute to either side of
 * the selected thumb; empty spacer slots absorb the remaining width so the
 * total width never changes.
 *
 * The control is controlled: clicking an option (or using arrow keys) only
 * fires `position-selected` — the host application decides when to update
 * `selectedPosition` (e.g. after the device confirms the change).
 *
 * Implements the WAI-ARIA radio-group pattern: one tab stop (the selected
 * thumb), arrow keys request the previous/next position with wrap-around.
 *
 * Subclasses define `positionCount` and `renderPositionIcon()`.
 *
 * @fires position-selected {PositionSelectedEvent} Position requested by the user.
 * @ignore
 */
export abstract class ObcShuffleButtonBase extends LitElement {
  /**
   * Zero-based index of the currently selected position.
   * Out-of-range values are clamped.
   *
   * @default 1
   */
  @property({type: Number}) selectedPosition = 1;

  /**
   * Accessible name for the radio group (the control is icon-only).
   */
  @property({type: String}) override ariaLabel = '';

  protected abstract get positionCount(): number;

  protected abstract renderPositionIcon(position: number): TemplateResult;

  override render() {
    const count = this.positionCount;
    const selected = clampPosition(count, this.selectedPosition);
    return html`
      <div
        class="shuffle"
        role="radiogroup"
        aria-label=${this.ariaLabel}
        style="--_shuffle-slot-count: ${shuffleSlotCount(
          count
        )}; --_shuffle-window-offset: ${shuffleWindowOffset(count, selected)};"
        @keydown=${this.handleKeydown}
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
    const event: PositionSelectedEvent = new CustomEvent('position-selected', {
      detail: {position},
      bubbles: true,
      composed: true,
    });
    this.dispatchEvent(event);
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
