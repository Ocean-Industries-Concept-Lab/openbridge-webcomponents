import {LitElement, html, unsafeCSS} from 'lit';
import {property, query, state} from 'lit/decorators.js';
import componentStyle from './start-stop-switch.css?inline';
import {classMap} from 'lit/directives/class-map.js';
import '../../icons/icon-arrow-right-google.js';
import {customElement} from '../../decorator.js';

/**
 * The visual variant for the start-stop switch when checked.
 * - `normal`: Standard blue appearance (default)
 * - `running`: Green appearance indicating motor/process is running
 * - `loading`: Light blue appearance indicating a pending/loading state
 */
export enum StartStopSwitchVariant {
  normal = 'normal',
  running = 'running',
  loading = 'loading',
}

/**
 * The possible sizes for the start-stop switch.
 * - `regular`: Standard size with 32px track height
 * - `large`: Larger size with 48px track height
 */
export enum StartStopSwitchSize {
  regular = 'regular',
  large = 'large',
}

export type ObcStartStopSwitchChangeEvent = CustomEvent<{
  checked: boolean;
}>;

/**
 * Threshold for completing a drag gesture (90% of track width).
 * User must drag past this threshold to toggle the switch state.
 */
const DRAG_COMPLETE_THRESHOLD = 0.9;

/**
 * `<obc-start-stop-switch>` – A two-state draggable toggle switch for significant binary actions like start/stop or enable/disable.
 *
 * This switch provides a visually distinct, draggable toggle for binary actions where both states need to be explicitly labeled and reinforced. Unlike a simple on/off toggle, it displays both the current state label and an action label on the draggable thumb, making it ideal for consequential actions where user awareness is critical.
 *
 * ### Features
 * - **Drag-to-toggle interaction:** Users must drag the thumb across the track to change state (90% threshold required). This deliberate interaction prevents accidental toggles.
 * - **Dual state labels:** Displays both a state label (e.g., "Running", "Stopped") and an action label on the thumb (e.g., "Start", "Stop").
 * - **Visual variants:**
 *   - `normal`: Standard blue appearance when checked (default)
 *   - `running`: Green appearance indicating an active process (e.g., motor running)
 *   - `loading`: Light blue appearance indicating a pending/transitional state
 * - **Size options:** `regular` (32px track height) or `large` (48px track height, matching touch target).
 * - **Alert frame:** Optional red border to indicate alarm or critical state.
 * - **Description text:** Optional text below the switch for additional context.
 * - **Animated transitions:** Smooth CSS transitions for thumb movement and state changes.
 *
 * ### Usage Guidelines
 * Use `<obc-start-stop-switch>` when you need a prominent control for toggling between two mutually exclusive states where:
 * - Both states should be explicitly labeled (not just "on/off")
 * - The action has significant consequences (starting a motor, enabling a system)
 * - Accidental activation should be prevented through deliberate drag interaction
 *
 * Avoid using this component for simple preferences or settings where a standard `<obc-switch>` or checkbox would suffice. This component is best suited for operational controls where the user must be aware of both the current state and the action they're about to take.
 *
 * **Related components:** For simple binary toggles without labels, use `<obc-switch>`. For grouped selections, use `<obc-radio>` or `<obc-checkbox>`.
 *
 * ### Slots
 * | Slot Name                 | Renders When...      | Purpose                                                    |
 * |---------------------------|----------------------|------------------------------------------------------------|
 * | checked-state-icon        | Always (if provided) | Icon displayed in the checked state area.                  |
 * | unchecked-state-icon      | Always (if provided) | Icon displayed in the unchecked state area.                |
 * | checked-state-label       | Always               | Label shown when switch is in checked position.            |
 * | unchecked-state-label     | Always               | Label shown when switch is in unchecked position.          |
 * | to-checked-action-label   | When unchecked       | Action label on thumb prompting user to activate.          |
 * | to-unchecked-action-label | When checked         | Action label on thumb prompting user to deactivate.        |
 *
 * ### Events
 * - `change` – Fired when the switch state changes after a successful drag. The event detail contains `{checked: boolean}` indicating the new state.
 *
 * ### Best Practices
 * - Keep labels concise (1-2 words) to fit within the track width.
 * - Use meaningful action verbs: "Start/Stop", "Enable/Disable", "Request/Release".
 * - Use the `running` variant to indicate an actively running process.
 * - Use the `loading` variant during async operations before transitioning to `running` or `normal`.
 * - Consider using `hasAlert` when the switch controls a critical system in alarm state.
 *
 * ### Example
 * ```html
 * <obc-start-stop-switch checked variant="running">
 *   <div slot="checked-state-icon"><obi-placeholder></obi-placeholder></div>
 *   <div slot="checked-state-label">Running</div>
 *   <div slot="unchecked-state-label">Stopped</div>
 *   <div slot="to-checked-action-label">Start</div>
 *   <div slot="to-unchecked-action-label">Stop</div>
 * </obc-start-stop-switch>
 * ```
 *
 * @slot checked-state-icon - Icon displayed in the checked (active) state area.
 * @slot unchecked-state-icon - Icon displayed in the unchecked (inactive) state area.
 * @slot checked-state-label - Label for the checked state (e.g., "Running", "Enabled").
 * @slot unchecked-state-label - Label for the unchecked state (e.g., "Stopped", "Disabled").
 * @slot to-checked-action-label - Action label on thumb when unchecked (e.g., "Start", "Enable").
 * @slot to-unchecked-action-label - Action label on thumb when checked (e.g., "Stop", "Disable").
 * @fires change {ObcStartStopSwitchChangeEvent} - Emitted when the switch is toggled via drag interaction.
 */
@customElement('obc-start-stop-switch')
export class ObcStartStopSwitch extends LitElement {
  /**
   * Whether the switch is in the checked (active) state.
   * When checked, the thumb is on the right side.
   * When unchecked, the thumb is on the left side.
   *
   * Defaults to `false`.
   */
  @property({type: Boolean, reflect: true}) checked = false;

  /**
   * The visual variant for the switch when checked.
   * - `normal`: Standard blue appearance (default)
   * - `running`: Green appearance indicating motor/process is running
   * - `loading`: Light blue appearance indicating a pending/loading state
   *
   * If `true`, the content of the `checked-state-icon` slot will be displayed when checked.
   */
  @property({type: Boolean}) showUncheckedStateIcon = false;
  /**
   * This only affects the visual style, not the switch position.
   *
   * Defaults to `'normal'`.
   */
  @property({type: String, reflect: true}) variant: StartStopSwitchVariant =
    StartStopSwitchVariant.normal;

  /**
   * The size of the switch.
   *
   * If `true`, the content of the `unchecked-state-icon` slot will be displayed when unchecked.
   */
  @property({type: Boolean}) showCheckedStateIcon = false;
  /**
   * - `regular`: Standard size with 32px track height
   * - `large`: Larger size with 48px track height
   *
   * Defaults to `'regular'`.
   */
  @property({type: String, reflect: true}) size: StartStopSwitchSize =
    StartStopSwitchSize.regular;

  /**
   * Whether the switch is disabled.
   *
   * When disabled, the switch cannot be interacted with and displays a muted appearance.
   * In the disabled state, the thumb is hidden and only the state label is shown.
   *
   * Defaults to `false`.
   */
  @property({type: Boolean, reflect: true}) disabled = false;

  /**
   * Whether to show an alert frame around the switch.
   *
   * When true, displays a red alert border around the switch to indicate
   * an alarm or critical state.
   *
   * Defaults to `false`.
   */
  @property({type: Boolean}) hasAlert = false;

  /**
   * Whether to show the description below the switch.
   *
   * When true, displays the description text below the switch track.
   * The component's minimum height is maintained at the touch target size.
   *
   * Defaults to `false`.
   */
  @property({type: Boolean}) hasDescription = false;

  /**
   * Description text displayed below the switch when `hasDescription` is true.
   *
   * Use this to provide additional context about the switch's purpose or current state.
   *
   * Defaults to `'Action description'`.
   */
  @property({type: String}) description = 'Action description';

  @state() private dragging = false;
  @state() private tmpChecked = false;

  private dragStartX = 0;
  private dragCurrentX = 0;
  private dragOffset = 0;
  private trackWidth = 0;
  private buttonWidth = 0;
  private resizeObserver?: ResizeObserver;

  @query('.button')
  private buttonRef?: HTMLElement;

  @query('.button-track')
  private trackRef?: HTMLElement;

  private onDragStart = (e: MouseEvent | TouchEvent) => {
    this.dragging = true;
    if (e instanceof MouseEvent) {
      this.dragStartX = e.clientX;
    } else {
      this.dragStartX = e.touches[0].clientX;
    }
    this.dragCurrentX = this.dragStartX;

    const trackRect = this.trackRef?.getBoundingClientRect();
    const buttonRect = this.buttonRef?.getBoundingClientRect();

    if (trackRect && buttonRect) {
      this.trackWidth = trackRect.width;
      this.buttonWidth = buttonRect.width;
    } else {
      this.trackWidth = this.trackRef?.offsetWidth || 0;
      this.buttonWidth = this.buttonRef?.offsetWidth || 0;
    }

    window.addEventListener('mousemove', this.onDragMove);
    window.addEventListener('touchmove', this.onDragMove, {passive: false});
    window.addEventListener('mouseup', this.onDragEnd);
    window.addEventListener('touchend', this.onDragEnd);
  };

  private onDragMove = (e: MouseEvent | TouchEvent) => {
    if (!this.dragging) return;
    let clientX = 0;
    if (e instanceof MouseEvent) {
      clientX = e.clientX;
    } else {
      clientX = e.touches[0].clientX;
      e.preventDefault();
    }
    this.dragCurrentX = clientX;
    this.dragOffset = this.dragCurrentX - this.dragStartX;
    const percent = Math.abs(
      this.dragOffset / (this.trackWidth - this.buttonWidth)
    );
    this.tmpChecked = this.checked ? percent < 0.5 : percent > 0.5;
    this.requestUpdate();
  };

  private onDragEnd = () => {
    if (!this.dragging) return;
    this.dragging = false;

    const maxOffset = this.trackWidth - this.buttonWidth;
    const startPosition = this.checked ? maxOffset : 0;
    const newPosition = startPosition + this.dragOffset;
    const percent = newPosition / maxOffset;

    if (!this.checked && percent > DRAG_COMPLETE_THRESHOLD) {
      this.checked = true;
      this.dispatchChangeEvent();
    } else if (this.checked && percent < 1 - DRAG_COMPLETE_THRESHOLD) {
      this.checked = false;
      this.dispatchChangeEvent();
    }

    this.tmpChecked = this.checked;
    this.dragOffset = 0;
    window.removeEventListener('mousemove', this.onDragMove);
    window.removeEventListener('touchmove', this.onDragMove);
    window.removeEventListener('mouseup', this.onDragEnd);
    window.removeEventListener('touchend', this.onDragEnd);
    this.requestUpdate();
  };

  private dispatchChangeEvent() {
    this.dispatchEvent(
      new CustomEvent('change', {
        detail: {checked: this.checked},
        bubbles: true,
        composed: true,
      })
    );
  }

  private getButtonStyle() {
    if (!this.dragging) return '';

    // Keep same positioning mode as CSS to avoid subpixel issues when switching modes
    if (this.checked) {
      let right = -1 - this.dragOffset;
      const maxRight = this.trackWidth - this.buttonWidth + 1;
      right = Math.max(-1, Math.min(right, maxRight));
      return `right: ${right}px; left: auto; transition: none;`;
    } else {
      let left = -1 + this.dragOffset;
      const maxLeft = this.trackWidth - this.buttonWidth + 1;
      left = Math.max(-1, Math.min(left, maxLeft));
      return `left: ${left}px; right: auto; transition: none;`;
    }
  }

  override firstUpdated() {
    this.resizeObserver = new ResizeObserver(() => {
      this.trackWidth = this.trackRef?.offsetWidth || 0;
      this.buttonWidth = this.buttonRef?.offsetWidth || 0;
    });
    if (this.trackRef) this.resizeObserver.observe(this.trackRef);
    if (this.buttonRef) this.resizeObserver.observe(this.buttonRef);
  }

  override updated(changedProperties: Map<string, unknown>) {
    super.updated(changedProperties);
    // CSS Anchor Positioning (`right: anchor(center)`) on .button-track-checked
    // may not repaint when the thumb moves via a CSS transition (checked property change).
    // Force the browser to recalculate anchor positions after the transition completes.
    if (changedProperties.has('checked') && !this.dragging) {
      const trackChecked = this.renderRoot.querySelector(
        '.button-track-checked'
      ) as HTMLElement | null;
      const button = this.buttonRef;
      if (trackChecked && button) {
        const nudgeRepaint = () => {
          trackChecked.style.display = 'none';
          // Force a synchronous layout recalculation
          void trackChecked.offsetHeight;
          trackChecked.style.display = '';
        };
        // Wait one frame for the browser to start any CSS transitions,
        // then wait for all animations on the thumb to finish before nudging.
        requestAnimationFrame(() => {
          const animations = button.getAnimations();
          if (animations.length > 0) {
            Promise.allSettled(animations.map((a) => a.finished)).then(
              nudgeRepaint
            );
          } else {
            nudgeRepaint();
          }
        });
      }
    }
  }

  override disconnectedCallback() {
    super.disconnectedCallback();
    this.resizeObserver?.disconnect();
    window.removeEventListener('mousemove', this.onDragMove);
    window.removeEventListener('touchmove', this.onDragMove);
    window.removeEventListener('mouseup', this.onDragEnd);
    window.removeEventListener('touchend', this.onDragEnd);
  }

  override render() {
    const isChecked = this.checked;

    return html`
              <div class="outer-container">
                <div
                  class=${classMap({
                    wrapper: true,
                    checked: isChecked,
                    unchecked: !isChecked,
                    dragging: this.dragging,
                    'tmp-checked': this.tmpChecked && this.dragging,
                    'tmp-unchecked': !this.tmpChecked && this.dragging,
                    disabled: this.disabled,
                    'has-alert': this.hasAlert,
                    'size-regular': this.size === 'regular',
                    'size-large': this.size === 'large',
                    'variant-normal': this.variant === 'normal',
                    'variant-running': this.variant === 'running',
                    'variant-loading': this.variant === 'loading',
                  })}
                  tabindex=${this.disabled ? -1 : 0}
                >
                  <div class="button-track">
                    <button
                      class="button"
                      style=${this.getButtonStyle()}
                      @mousedown=${this.disabled ? undefined : this.onDragStart}
                      @touchstart=${
                        this.disabled ? undefined : this.onDragStart
                      }
                      ?disabled=${this.disabled}
                      tabindex="-1"
                      role="switch"
                      aria-checked=${isChecked ? 'true' : 'false'}
                      aria-disabled=${this.disabled ? 'true' : 'false'}
                    >
                      ${
                        !this.disabled
                          ? html`
                              <div class="button-visible">
                                <obi-arrow-right-google
                                  class="button-icon"
                                ></obi-arrow-right-google>
                                <div class="button-label">
                                  <slot
                                    name=${isChecked
                                      ? 'to-unchecked-action-label'
                                      : 'to-checked-action-label'}
                                  ></slot>
                                </div>
                              </div>
                            `
                          : ''
                      }
                    </button>
                    ${
                      !this.disabled
                        ? html`<div class="button-track-checked"></div>`
                        : ''
                    }
                    <div class="checked state">
                      <slot name="checked-state-icon"></slot>
                      <div class="state-label">
                        <slot name="checked-state-label"></slot>
                      </div>
                    </div>
                    <div class="unchecked state">
                      <slot name="unchecked-state-icon"></slot>
                      <div class="state-label">
                        <slot name="unchecked-state-label"></slot>
                      </div>
                    </div>
                  </div>
                  ${this.hasAlert ? html`<div class="alert-frame"></div>` : ''}
                </div>
                ${
                  this.hasDescription
                    ? html`<div class="description">${this.description}</div>`
                    : ''
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  static override styles = unsafeCSS(componentStyle);
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-start-stop-switch': ObcStartStopSwitch;
  }
}
