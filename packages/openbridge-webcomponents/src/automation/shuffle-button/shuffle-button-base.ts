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
 * Base class for "shuffle button" selectors: a control whose selected thumb
 * always occupies the fixed center slot of a (2·n−1)-slot row (or column when
 * `vertical`). Option thumbs keep their logical order and redistribute to
 * either side of the selected thumb; empty spacer slots absorb the remaining
 * length so the total size never changes.
 *
 * The control is controlled: clicking an option (or using arrow keys) only
 * fires `position-selected` — the host application decides when to update
 * `selectedPosition` (e.g. after the device confirms the change).
 *
 * Implements the WAI-ARIA radio-group pattern: one tab stop (the selected
 * thumb), arrow keys request the previous/next position with wrap-around.
 *
 * Subclasses define `positionCount` and `renderPositionIcon()`. The
 * `position-selected` event contract is documented (`@fires`) on each concrete
 * component, as required for the custom-elements manifest.
 *
 * Not declared `abstract`: the framework wrapper generators instantiate every
 * manifest class through a concrete `Constructor<T>` type, and an abstract
 * class breaks the generated React wrapper build (same reason as the
 * specialty-tank base).
 *
 * @ignore
 */
export class ObcShuffleButtonBase extends LitElement {
  /**
   * Zero-based index of the currently selected position.
   * Out-of-range values are clamped.
   *
   * @default 1
   */
  @property({type: Number}) selectedPosition = 1;

  /**
   * Lays the control out vertically: positions stack top to bottom and the
   * position symbols rotate 90° counter-clockwise to match a vertical flow
   * path.
   *
   * @default false
   */
  @property({type: Boolean}) vertical = false;

  /**
   * Accessible name for the radio group (the control is icon-only).
   * Concrete components override the default with a device-specific name.
   *
   * @default 'Position selector'
   */
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
