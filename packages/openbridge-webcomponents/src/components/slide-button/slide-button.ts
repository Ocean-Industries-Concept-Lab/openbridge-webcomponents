import {LitElement, html, nothing, unsafeCSS} from 'lit';
import {property, query, state} from 'lit/decorators.js';
import componentStyle from './slide-button.css?inline';
import {classMap} from 'lit/directives/class-map.js';
import '../../icons/icon-chevron-double-right-google.js';
import {customElement} from '../../decorator.js';

export type ObcSlideButtonSlideEvent = CustomEvent<{completed: boolean}>;

/**
 * `<obc-slide-button>` – A slide-to-confirm button that requires users to drag the button to the end of a track to trigger an action.
 *
 * Appears as a horizontal button with a draggable handle. The user must slide the handle to the right to complete the action, helping prevent accidental activations. Commonly used for critical or irreversible actions where explicit user intent is required (e.g., "Delete", "Confirm", "Unlock").
 *
 * ---
 *
 * ### Features
 * - **Slide-to-activate interaction:** Requires a deliberate sliding gesture to trigger the action, reducing accidental clicks.
 * - **Disabled state:** Can be disabled to prevent interaction (`disabled` property).
 * - **Leading icon (optional):** Supports a leading icon via the `leading-icon` slot, controlled by the `hasLeadingIcon` property.
 * - **Custom label:** Label text is provided via the `label` slot.
 * - **Auto-disable option:** When `autoDisable` is true, the button disables itself after a successful slide, preventing repeated actions.
 * - **Hug content:** The `hugContent` property allows the button to shrink to fit its content, rather than stretching to full width.
 * - **Visual feedback:** Provides animated feedback when sliding and snapping back if not completed.
 * - **Trailing icon:** Always displays a trailing double-chevron icon to indicate sliding direction.
 *
 * ---
 *
 * ### Usage Guidelines
 * Use `obc-slide-button` for actions that require extra confirmation or where accidental activation could have significant consequences. Typical scenarios include confirming deletions, submitting irreversible forms, or unlocking sensitive features. Avoid using for routine or low-risk actions where a standard button suffices.
 *
 * - The sliding gesture provides a clear affordance for intentional actions.
 * - If you want the button to automatically disable after use (e.g., to prevent double submissions), set `autoDisable` to true.
 * - For best usability, keep the label concise and action-oriented (e.g., "Slide to confirm", "Slide to delete").
 * - The leading icon is optional and can be omitted for a simpler appearance.
 * - The button will snap back if the slide is not completed past the threshold.
 * - Only one slide button should be used for a given action to avoid confusion.
 *
 * **TODO(designer):** Confirm if there are recommended minimum/maximum label lengths or if there are accessibility guidelines for color contrast and drag affordance.
 *
 * ---
 *
 * ### Slots
 *
 * | Slot Name      | Renders When...        | Purpose                                      |
 * | -------------- | --------------------- | --------------------------------------------- |
 * | leading-icon   | `hasLeadingIcon` true | Icon at the start of the button (optional)    |
 * | label          | Always                 | Main label text for the button                |
 *
 * ---
 *
 * ### Properties and Attributes
 * - `disabled` (boolean): Disables the button and prevents interaction. When true, the button is visually muted and cannot be slid.
 * - `hasLeadingIcon` (boolean): Controls whether the leading icon slot is shown. Set to false to hide the icon area.
 * - `hugContent` (boolean): If true, the button shrinks to fit its content instead of stretching to full width.
 * - `autoDisable` (boolean): When true, the button automatically disables itself after a successful slide action.
 *
 * ---
 *
 * ### Events
 * - `slide` – Fired when the slide action is completed (i.e., the handle is dragged past the threshold). The event detail contains `{completed: true}`.
 *
 * ---
 *
 * ### Example
 *
 * ```html
 * <obc-slide-button autoDisable>
 *   <obi-placeholder slot="leading-icon"></obi-placeholder>
 *   <span slot="label">Slide to confirm</span>
 * </obc-slide-button>
 * ```
 * In this example, the button displays a leading icon and a label. After sliding to the end, it disables itself automatically.
 *
 * @slot leading-icon - The icon to display at the start of the button content (shown when `hasLeadingIcon` is true).
 * @slot label - The label text to display in the button.
 * @fires slide {ObcSlideButtonSlideEvent} - Emitted when the slide action is completed.
 */
@customElement('obc-slide-button')
export class ObcSlideButton extends LitElement {
  /**
   * Whether the slide button is disabled. When true, the button cannot be interacted with and appears visually muted.
   */
  @property({type: Boolean}) disabled = false;

  /**
   * Whether to show the leading icon slot. Set to true to show the icon area at the start of the button.
   */
  @property({type: Boolean}) hasLeadingIcon = false;

  /**
   * Whether the button should hug its content. When true, the button width shrinks to fit its content instead of stretching to fill the container.
   */
  @property({type: Boolean}) hugContent = false;

  /**
   * Whether to automatically disable the button after a successful slide. When true, the button disables itself after the slide action completes.
   */
  @property({type: Boolean}) autoDisable = false;

  @state() private dragging = false;
  @state() private animatingBack = false;

  private dragStartX = 0;
  private dragCurrentX = 0;
  private dragOffset = 0;
  private trackWidth = 0;
  private buttonWidth = 0;
  private slideThreshold = 0.8;

  @query('.slide-button')
  private buttonRef?: HTMLElement;

  @query('.visual-container')
  private visualContainerRef?: HTMLElement;

  private onDragStart = (e: MouseEvent | TouchEvent) => {
    if (this.disabled) return;

    this.dragging = true;
    if (e instanceof MouseEvent) {
      this.dragStartX = e.clientX;
    } else {
      this.dragStartX = e.touches[0].clientX;
    }
    this.dragCurrentX = this.dragStartX;
    this.trackWidth = this.visualContainerRef?.offsetWidth || 0;
    this.buttonWidth = this.buttonRef?.offsetWidth || 0;

    window.addEventListener('mousemove', this.onDragMove);
    window.addEventListener('touchmove', this.onDragMove, {passive: false});
    window.addEventListener('mouseup', this.onDragEnd);
    window.addEventListener('touchend', this.onDragEnd);
  };

  private onDragMove = (e: MouseEvent | TouchEvent) => {
    if (!this.dragging) return;

    let clientX;
    if (e instanceof MouseEvent) {
      clientX = e.clientX;
    } else {
      clientX = e.touches[0].clientX;
      e.preventDefault();
    }

    this.dragCurrentX = clientX;
    this.dragOffset = this.dragCurrentX - this.dragStartX;
    this.requestUpdate();
  };

  private onDragEnd = () => {
    if (!this.dragging) return;

    this.dragging = false;
    this.animatingBack = true;

    const maxOffset = this.trackWidth - this.buttonWidth;
    const dragProgress = Math.max(0, this.dragOffset) / maxOffset;

    if (dragProgress >= this.slideThreshold) {
      /**
       * Emitted when the slide action is completed (handle dragged past the threshold).
       * @fires slide {ObcSlideButtonSlideEvent}
       */
      this.dispatchEvent(new CustomEvent('slide', {detail: {completed: true}}));

      if (this.autoDisable) {
        const resetDuration = getComputedStyle(this).getPropertyValue(
          '--slide-button-reset-duration'
        );
        const durationMs = parseFloat(resetDuration) * 1000;

        setTimeout(() => {
          this.disabled = true;
          this.requestUpdate();
        }, durationMs);
      }
    }

    this.dragOffset = 0;
    this.requestUpdate();

    const resetDuration = getComputedStyle(this).getPropertyValue(
      '--slide-button-reset-duration'
    );
    const durationMs = parseFloat(resetDuration) * 1000;

    setTimeout(() => {
      this.animatingBack = false;
      this.requestUpdate();
    }, durationMs);

    window.removeEventListener('mousemove', this.onDragMove);
    window.removeEventListener('touchmove', this.onDragMove);
    window.removeEventListener('mouseup', this.onDragEnd);
    window.removeEventListener('touchend', this.onDragEnd);
  };

  private getButtonStyle() {
    if (!this.dragging && !this.animatingBack) return '';

    const maxOffset = this.trackWidth - this.buttonWidth + 1;
    let left = Math.max(-1, this.dragOffset - 1);
    left = Math.min(left, maxOffset - 1);

    return `left: ${left}px;`;
  }

  override firstUpdated() {
    const resizeObserver = new ResizeObserver(() => {
      this.trackWidth = this.visualContainerRef?.offsetWidth || 0;
      this.buttonWidth = this.buttonRef?.offsetWidth || 0;
    });
    if (this.visualContainerRef)
      resizeObserver.observe(this.visualContainerRef);
    if (this.buttonRef) resizeObserver.observe(this.buttonRef);
  }

  override render() {
    const containerClasses = {
      'slide-button-container': true,
      dragging: this.dragging,
      'animating-back': this.animatingBack,
      disabled: this.disabled,
      'hug-content': this.hugContent,
    };

    const visualClasses = {
      'visual-container': true,
    };

    const buttonClasses = {
      'slide-button': true,
      'has-leading-icon': this.hasLeadingIcon,
    };

    return html`
      <div
        class=${classMap(containerClasses)}
        role="button"
        aria-disabled=${this.disabled}
      >
        <div class=${classMap(visualClasses)}>
          <div
            class="button-touch-target"
            style=${this.getButtonStyle()}
            @mousedown=${this.onDragStart}
            @touchstart=${this.onDragStart}
          >
            <div class=${classMap(buttonClasses)}>
              <div class="button-content">
                ${this.hasLeadingIcon
                  ? html`
                      <div class="leading-icon">
                        <slot name="leading-icon"></slot>
                      </div>
                    `
                  : nothing}
                <div class="button-label">
                  <slot name="label"></slot>
                </div>
              </div>
            </div>
          </div>
          <div class="trailing-icon-area">
            <obi-chevron-double-right-google
              class="trailing-icon"
            ></obi-chevron-double-right-google>
          </div>
        </div>
      </div>
    `;
  }

  static override styles = unsafeCSS(componentStyle);
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-slide-button': ObcSlideButton;
  }
}
