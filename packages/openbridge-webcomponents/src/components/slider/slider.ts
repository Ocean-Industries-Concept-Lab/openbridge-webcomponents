import {LitElement, html, unsafeCSS} from 'lit';
import {property} from 'lit/decorators.js';
import {ifDefined} from 'lit/directives/if-defined.js';
import {styleMap} from 'lit/directives/style-map.js';
import componentStyle from './slider.css?inline';
import '../icon-button/icon-button.js';
import {classMap} from 'lit/directives/class-map.js';
import {customElement} from '../../decorator.js';

/**
 * Enum of slider visual and interaction variants.
 *
 * - `normal`: Standard slider appearance and interaction.
 * - `enhanced`: Visually prominent slider with increased track and thumb size for easier manipulation.
 * - `no-input`: Read-only display; disables user input and interaction.
 */
export enum ObcSliderVariant {
  Normal = 'normal',
  Enhanced = 'enhanced',
  NoInput = 'no-input',
}

/**
 * Custom event type for slider value changes.
 * The event detail contains the new numeric value.
 */
export type ObcSliderValueEvent = CustomEvent<number>;

/**
 * `<obc-slider>` – A horizontal slider component for selecting a numeric value within a defined range.
 *
 * Provides a visual and interactive way for users to adjust values such as volume, brightness, or other continuous settings. The slider supports optional step increments, left/right icon buttons for quick adjustments, and can be configured for read-only display or enhanced visual prominence.
 *
 * Appears as a horizontal track with a draggable thumb, and may include optional icon buttons on either side for increment/decrement actions. The component can be used for both direct manipulation (dragging the thumb) and discrete changes (via buttons).
 *
 * ---
 *
 * ### Features
 * - **Variants:**
 *   - **Normal:** Standard slider with a slim track and thumb.
 *   - **Enhanced:** Larger track and thumb for improved accessibility and visual emphasis.
 *   - **No Input:** Read-only mode; disables all user interaction and presents the current value visually.
 * - **Value Range:** Supports configurable `min`, `max`, and `step` properties for precise control over allowed values.
 * - **Step Buttons:** Optional left and right icon buttons allow users to increment or decrement the value by a defined step (`stepClick`).
 * - **Icons:** Custom icons can be slotted into the left and right button positions for contextual meaning (e.g., `<obi-arrow></obi-arrow>, <obi-placeholder></obi-placeholder>`).
 * - **Seeking:** When `allowSeeking` is enabled, users can click or drag along the track to set the value, with smooth animated transitions based on `seekingSpeed`.
 * - **Hug Container:** The `hugcontainer` attribute removes spacing between the slider and its icon buttons, allowing for a compact layout.
 * - **Accessibility:** Underlying input is a native `<input type="range">` for keyboard and screen reader support.
 *
 * ---
 *
 * ### Usage Guidelines
 * Use `obc-slider` when you need users to select or adjust a value within a continuous or stepped range, such as for volume, brightness, or similar controls. The enhanced variant is suitable for scenarios where the slider is a primary control or needs to be more visually prominent. The no-input variant is ideal for displaying a value without allowing user changes.
 *
 * - For discrete, step-based changes, provide `step` and/or `stepClick` values.
 * - Use left/right icons to clarify the meaning of the adjustment (e.g., low/high, decrease/increase).
 * - Enable `allowSeeking` for scenarios where users should be able to jump to a specific value by clicking the track.
 * - Use `hugcontainer` when the slider should visually connect tightly with its icon buttons.
 *
 * **TODO(designer):** Clarify recommended use cases for each variant and when to use `allowSeeking` vs. standard interaction.
 *
 * ---
 *
 * ### Slots
 *
 * | Slot Name   | Renders When...            | Purpose                                    |
 * |-------------|---------------------------|--------------------------------------------|
 * | icon-left   | `hasLeftIcon` is true     | Icon/button for decrement action            |
 * | icon-right  | `hasRightIcon` is true    | Icon/button for increment action            |
 *
 * ---
 *
 * ### Properties and Attributes
 * - `value` (number): Current slider value. Updates as the user interacts.
 * - `min` (number): Minimum allowed value (default: 0).
 * - `max` (number): Maximum allowed value (default: 100).
 * - `step` (number): Step granularity for value changes (optional).
 * - `stepClick` (number): Amount to increment/decrement when clicking icon buttons (default: 10).
 * - `variant` (ObcSliderVariant): Visual/interaction style (`normal`, `enhanced`, `no-input`). Default: `normal`.
 * - `hasLeftIcon`/`hasRightIcon` (boolean): Show icon button on left/right.
 * - `allowSeeking` (boolean): Enables animated seeking to clicked value on the track.
 * - `seekingSpeed` (number): Animation speed for seeking (default: 1/3; higher is faster).
 * - `hugcontainer` (attribute): Removes spacing between slider and icon buttons for a compact layout.
 *
 * ---
 *
 * ### Events
 * - `value` – Fired when the slider value changes, either by user interaction or programmatically. The event detail contains the new value as a number.
 *
 * ---
 *
 * ### Best Practices & Constraints
 * - Only use `no-input` variant for read-only display; interactive controls should use `normal` or `enhanced`.
 * - For accessibility, ensure the slider has a visible label or context.
 * - Use step values that make sense for the range (e.g., avoid step=0.01 for a 0–10 range unless fine granularity is needed).
 * - When using icon buttons, provide icons that clearly indicate their function.
 * - The slider is horizontal only; for vertical sliders, use a different component.
 *
 * ---
 *
 * ### Example
 *
 * ```html
 * <obc-slider
 *   value="40"
 *   min="0"
 *   max="100"
 *   step="10"
 *   haslefticon
 *   hasrighticon
 *   variant="enhanced"
 * >
 *   <obi-arrow slot="icon-left"></obi-arrow>
 *   <obi-arrow slot="icon-right"></obi-arrow>
 * </obc-slider>
 * ```
 *
 * In this example, the slider allows selection from 0 to 100 in steps of 10, with left/right arrow icons for quick adjustments.
 *
 * @slot icon-left - Slot for the left icon button (shown when `hasLeftIcon` is true)
 * @slot icon-right - Slot for the right icon button (shown when `hasRightIcon` is true)
 * @attr hugcontainer - If set, the slider will not have any spacing between the slider icons and the container
 * @fires value {ObcSliderValueEvent} - Fired when the value is changed
 */
@customElement('obc-slider')
export class ObcSlider extends LitElement {
  /**
   * The current value of the slider.
   *
   * Updates as the user drags the thumb, clicks the track (if `allowSeeking`), or uses the increment/decrement buttons.
   */
  @property({type: Number}) value = 50;

  /**
   * The minimum allowed value for the slider.
   *
   * Default is 0.
   */
  @property({type: Number}) min = 0;

  /**
   * The maximum allowed value for the slider.
   *
   * Default is 100.
   */
  @property({type: Number}) max = 100;

  /**
   * The step granularity for slider value changes.
   *
   * If set, the slider will snap to multiples of this value between min and max.
   * Optional; if not set, the slider is continuous.
   */
  @property({type: Number}) step: number | undefined;

  /**
   * The amount to increment or decrement the value when clicking the left/right icon buttons.
   *
   * Default is 10.
   */
  @property({type: Number}) stepClick = 10;

  /**
   * The visual and interaction style of the slider.
   *
   * - `normal`: Standard appearance.
   * - `enhanced`: Larger track and thumb for emphasis.
   * - `no-input`: Read-only; disables all user input.
   *
   * Default is `normal`.
   */
  @property({type: String}) variant: ObcSliderVariant = ObcSliderVariant.Normal;

  /**
   * Whether to display a left icon button for decrementing the value.
   *
   * When true, the `icon-left` slot is rendered as a button.
   */
  @property({type: Boolean}) hasLeftIcon = false;

  /**
   * Whether to display a right icon button for incrementing the value.
   *
   * When true, the `icon-right` slot is rendered as a button.
   */
  @property({type: Boolean}) hasRightIcon = false;

  /**
   * Enables animated seeking: clicking or dragging along the track will set the value to the clicked position, animating smoothly.
   *
   * Default is false.
   */
  @property({type: Boolean}) allowSeeking = false;

  /**
   * The speed of animated seeking (when `allowSeeking` is true).
   *
   * Expressed as the inverse of seconds to go from min to max (e.g., 1/3 means 3 seconds for full range).
   * Default is 1/3.
   */
  @property({type: Number}) seekingSpeed = 1 / 3;

  @property({type: Boolean}) disabled = false;

  private get ratio(): number {
    const range = this.max - this.min;
    if (!Number.isFinite(range) || range <= 0) return 0;
    const ratio = (this.value - this.min) / range;
    if (!Number.isFinite(ratio)) return 0;
    return Math.max(0, Math.min(1, ratio));
  }

  private animationFrame: number | null = null;
  private isMouseDown = false;
  private isTouchActive = false;
  private targetValue = 0;
  private isDragging = false;
  private animationStartTime: number | null = null;
  private animationStartValue: number = 0;

  /**
   * Handles input changes from the slider or buttons.
   * Fires the `value` event with the new value.
   *
   * @param value - The new value to set.
   * @fires value
   */
  onInput(value: number) {
    this.value = value;
    this.dispatchEvent(new CustomEvent('value', {detail: this.value}));
  }

  /**
   * Decrements the value by `stepClick` when the left icon button is clicked.
   */
  onReduceClick() {
    if (this.disabled) return;
    this.onInput(Math.max(this.value - this.stepClick, this.min));
  }

  /**
   * Increments the value by `stepClick` when the right icon button is clicked.
   */
  onIncreaseClick() {
    if (this.disabled) return;
    this.onInput(Math.min(this.value + this.stepClick, this.max));
  }

  private get slider(): HTMLInputElement {
    return this.renderRoot.querySelector('input[type="range"]')!;
  }

  private isClickingThumb(e: MouseEvent | TouchEvent) {
    const rect = this.slider.getBoundingClientRect();
    const left = rect.left + 24;
    const width = rect.width - 48;
    const thumbWidth = 48;
    const ratioValue = this.ratio;
    const thumbCenter = left + width * ratioValue;

    let clientX: number;
    if ('touches' in e) {
      clientX = e.touches[0].clientX;
    } else {
      clientX = e.clientX;
    }

    const isNearThumb = Math.abs(clientX - thumbCenter) <= thumbWidth / 2;
    return isNearThumb;
  }

  private onMouseDown(e: MouseEvent) {
    if (this.variant === ObcSliderVariant.NoInput || this.disabled) return;
    if (this.isClickingThumb(e)) return;
    this.isMouseDown = true;
    this.updateTargetValue(e);
    e.preventDefault();
    window.addEventListener('mousemove', this.onWindowMouseMove);
    window.addEventListener('mouseup', this.onWindowMouseUp);
    this.startAnimation();
  }

  private onTouchStart(e: TouchEvent) {
    if (this.variant === ObcSliderVariant.NoInput || this.disabled) return;
    if (this.isClickingThumb(e)) return;
    this.isTouchActive = true;
    this.updateTargetValue(e);
    e.preventDefault();
    window.addEventListener('touchmove', this.onWindowTouchMove, {
      passive: false,
    });
    window.addEventListener('touchend', this.onWindowTouchEnd);
    this.startAnimation();
  }

  private onWindowMouseMove = (e: MouseEvent) => {
    this.onMouseMove(e);
  };

  private onWindowMouseUp = () => {
    this.onMouseUp();
  };

  private onWindowTouchMove = (e: TouchEvent) => {
    this.onTouchMove(e);
  };

  private onWindowTouchEnd = () => {
    this.onTouchEnd();
  };

  private onMouseMove(e: MouseEvent) {
    if (this.isMouseDown) {
      this.updateTargetValue(e);
    }
  }

  private onTouchMove(e: TouchEvent) {
    if (this.isTouchActive) {
      this.updateTargetValue(e);
    }
  }

  private onMouseUp() {
    this.isMouseDown = false;
    window.removeEventListener('mousemove', this.onWindowMouseMove);
    window.removeEventListener('mouseup', this.onWindowMouseUp);
    this.stopAnimation();
  }

  private onTouchEnd() {
    this.isTouchActive = false;
    window.removeEventListener('touchmove', this.onWindowTouchMove);
    window.removeEventListener('touchend', this.onWindowTouchEnd);
    this.stopAnimation();
  }

  private updateTargetValue(e: MouseEvent | TouchEvent) {
    const rect = this.slider.getBoundingClientRect();
    const left = rect.left + 24;
    const width = rect.width - 48;
    const x = e instanceof MouseEvent ? e.clientX : e.touches[0].clientX;
    const percent = (x - left) / width;
    const min = parseFloat(this.slider.min);
    const max = parseFloat(this.slider.max);
    const unroundedValue = min + (max - min) * percent;
    if (this.step) {
      this.targetValue = Math.round(unroundedValue / this.step) * this.step;
    } else {
      this.targetValue = unroundedValue;
    }
  }

  private startAnimation() {
    this.isDragging = this.allowSeeking;
    this.animationStartTime = performance.now();
    this.animationStartValue = parseFloat(this.slider.value);
    const min = parseFloat(this.slider.min);
    const max = parseFloat(this.slider.max);
    const step = this.step;
    const duration = (1 / this.seekingSpeed) * 1000; // ms
    const direction = this.targetValue > this.animationStartValue ? 1 : -1;

    const animate = () => {
      let nextValue = this.targetValue;
      if (!this.isDragging) {
        const now = performance.now();
        const elapsed = now - (this.animationStartTime ?? now);
        const range = Math.abs(max - min);
        // How much of the range should be covered by now
        const expectedProgress = Math.min(elapsed / duration, 1);
        const expectedValue =
          this.animationStartValue + direction * range * expectedProgress;
        // Snap to step
        if (direction > 0) {
          nextValue =
            step === undefined
              ? expectedValue
              : Math.ceil((expectedValue - min) / step) * step + min;
          nextValue = Math.min(this.targetValue, nextValue);
        } else {
          nextValue =
            step === undefined
              ? expectedValue
              : Math.floor((expectedValue - min) / step) * step + min;
          nextValue = Math.max(this.targetValue, nextValue);
        }
      }
      // Only update if value actually changes
      if (parseFloat(this.slider.value) !== nextValue) {
        this.slider.value = String(nextValue);
        this.slider.dispatchEvent(new Event('input'));
      }
      // Continue animating if not at target
      if (
        (direction > 0 && nextValue < this.targetValue) ||
        (direction < 0 && nextValue > this.targetValue)
      ) {
        this.animationFrame = requestAnimationFrame(animate);
      } else if (this.isMouseDown || this.isTouchActive) {
        // If mouse or touch is still active, wait for new target
        this.animationStartTime = performance.now();
        this.animationStartValue = parseFloat(this.slider.value);
        this.animationFrame = requestAnimationFrame(animate);
        this.isDragging = true;
      }
    };

    this.animationFrame = requestAnimationFrame(animate);
  }

  private stopAnimation() {
    if (this.animationFrame !== null) {
      cancelAnimationFrame(this.animationFrame);
      this.animationFrame = null;
    }
  }

  override render() {
    return html`
      ${this.hasLeftIcon
        ? html` <obc-icon-button
            ?disabled=${this.disabled}
            @click=${this.onReduceClick}
            variant="normal"
          >
            <slot name="icon-left"></slot>
          </obc-icon-button>`
        : null}
      <div
        class=${classMap({
          wrapper: true,
          [this.variant]: true,
          disabled: this.disabled,
        })}
        style=${styleMap({
          '--_ratio': String(this.ratio),
        })}
      >
        <div class="track"></div>
        <input
          type="range"
          min=${this.min}
          max=${this.max}
          step=${ifDefined(this.step)}
          .value=${this.value.toString()}
          ?disabled=${this.variant === ObcSliderVariant.NoInput ||
          this.disabled}
          class="slider"
          @input=${(event: Event) => {
            this.value = Number((event.target as HTMLInputElement).value);
            this.dispatchEvent(new CustomEvent('value', {detail: this.value}));
          }}
          @mousedown=${this.onMouseDown}
          @touchstart=${this.onTouchStart}
          @mousemove=${this.onMouseMove}
          @touchmove=${this.onTouchMove}
          @mouseup=${this.onMouseUp}
          @touchend=${this.onTouchEnd}
        />
        <div
          class="interactive-track-hover"
          @mousedown=${this.onMouseDown}
          @touchstart=${this.onTouchStart}
          @mousemove=${this.onMouseMove}
          @touchmove=${this.onTouchMove}
          @mouseup=${this.onMouseUp}
          @touchend=${this.onTouchEnd}
        ></div>
        <div
          class="container-hover"
          @mousedown=${this.onMouseDown}
          @touchstart=${this.onTouchStart}
          @mousemove=${this.onMouseMove}
          @touchmove=${this.onTouchMove}
          @mouseup=${this.onMouseUp}
          @touchend=${this.onTouchEnd}
        ></div>
        <div class="interactive-track"></div>
        <div class="thumb"></div>
      </div>
      ${this.hasRightIcon
        ? html`<obc-icon-button
            ?disabled=${this.disabled}
            @click=${this.onIncreaseClick}
            variant="normal"
          >
            <slot name="icon-right"></slot>
          </obc-icon-button>`
        : null}
    `;
  }

  static override styles = unsafeCSS(componentStyle);
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-slider': ObcSlider;
  }
}
