import {LitElement, html, unsafeCSS, type PropertyValues} from 'lit';
import {property, state} from 'lit/decorators.js';
import {classMap, type ClassInfo} from 'lit/directives/class-map.js';
import componentStyle from './two-step-action.css?inline';
import '../../icons/icon-check-google.js';
import '../../icons/icon-chevron-right-google.js';
import '../../icons/icon-chevron-double-right-google.js';
import {customElement} from '../../decorator.js';
import '../button/button.js';

export enum ObcTwoStepActionState {
  enabled = 'enabled',
  armed = 'armed',
  active = 'active',
}

export type ObcTwoStepActionChangeEvent = CustomEvent<{
  state: ObcTwoStepActionState;
  previousState: ObcTwoStepActionState;
}>;

const ARMED_SLIDE_DURATION_MS = 880;
const SWIPE_COMPLETE_TO_ACTIVE_MS = 1200;
const ARMED_RESET_DELAY_MS = 1600;
const THUMB_DRAG_GROWTH_FACTOR = 0.4146;
const THUMB_DRAG_MOVE_THRESHOLD_PX = 3;
const THUMB_DRAG_MIN_SCALE_X = 0.01;

/**
 * `<obc-two-step-action>` – A guarded action control that progresses through `enabled` → `armed` → `active`, then resets back to `enabled`.
 *
 * ## Features
 * - **Two-step confirmation**: Requires an intermediate `armed` state to reduce accidental triggers.
 * - **Swipe support**: Dragging the thumb can arm and then activate the action after a short hold.
 * - **Auto reset**: The `active` state returns to `enabled` after a short delay.
 *
 * ## Usage Guidelines
 * Use this control for actions that should be deliberate but still quick to complete. Prefer a standard button for routine actions that do not need guarding.
 *
 * @fires change {ObcTwoStepActionChangeEvent} When entering `active` from `armed`.
 */
@customElement('obc-two-step-action')
export class ObcTwoStepAction extends LitElement {
  @property({type: Boolean, reflect: true}) disabled = false;

  @property({type: String, reflect: false}) label = '';

  @state() private state: ObcTwoStepActionState = ObcTwoStepActionState.enabled;

  @state() private labelBounce = false;
  @state() private armedHint = false;
  @state() private armedSlide = false;
  @state() private disarmSlide = false;
  @state() private thumbDragging = false;
  @state() private swipeArmed = false;
  private labelBounceTimeoutId?: number;
  private armedResetTimeoutId?: number;
  private armedHintTimeoutId?: number;
  private armedSlideTimeoutId?: number;
  private disarmSlideTimeoutId?: number;
  private swipeArmedToActiveTimeoutId?: number;
  private activeResetTimeoutId?: number;
  private dragPointerId?: number;
  private dragStartX = 0;
  private dragMaxX = 0;
  private dragCompleteX = 0;
  private dragScaleX = 1;
  private dragMoved = false;
  private suppressNextClick = false;

  private getButtonStrokeWidthPx() {
    const raw = getComputedStyle(this).getPropertyValue(
      '--ui-components-button-stroke-weight'
    );
    const parsed = Number.parseFloat(raw);
    return Number.isFinite(parsed) ? parsed : 0;
  }

  private getActionLabelText() {
    return this.label.trim();
  }

  private queryVisibleWrapper(): HTMLElement | null {
    return this.renderRoot.querySelector('.visible-wrapper');
  }

  private buildWrapperClassInfo(
    isEnabled: boolean,
    isArmed: boolean,
    isActive: boolean
  ): ClassInfo {
    return {
      wrapper: true,
      'is-disabled': this.disabled,
      'state-enabled': isEnabled,
      'state-armed': isArmed,
      'state-active': isActive,
      'label-bounce': this.labelBounce,
      'armed-hint': this.armedHint,
      'armed-slide': this.armedSlide,
      'disarm-slide': this.disarmSlide,
      'thumb-dragging': this.thumbDragging,
      'swipe-armed-phase': this.swipeArmed,
    };
  }

  private setDragCssX(px: number) {
    this.style.setProperty('--thumb-drag-x', `${px}px`);
  }

  private isClickOnRole(event: Event, role: string) {
    const path = event.composedPath();
    return path.some(
      (node) => node instanceof HTMLElement && node.dataset.role === role
    );
  }

  private triggerLabelBounce() {
    this.labelBounce = false;
    window.requestAnimationFrame(() => {
      this.labelBounce = true;
      window.clearTimeout(this.labelBounceTimeoutId);
      this.labelBounceTimeoutId = window.setTimeout(() => {
        this.labelBounce = false;
      }, 220);
    });
  }

  private emitChange(
    state: ObcTwoStepActionState,
    previousState: ObcTwoStepActionState
  ) {
    this.dispatchEvent(
      new CustomEvent('change', {
        detail: {state, previousState},
        bubbles: true,
        composed: true,
      })
    );
  }

  private clearTimer(id: number | undefined) {
    if (id !== undefined) {
      window.clearTimeout(id);
    }
    return undefined;
  }

  private scheduleActiveReset() {
    this.activeResetTimeoutId = this.clearTimer(this.activeResetTimeoutId);

    if (this.disabled || this.state !== ObcTwoStepActionState.active) {
      return;
    }

    this.activeResetTimeoutId = window.setTimeout(() => {
      if (this.disabled || this.state !== ObcTwoStepActionState.active) return;
      this.state = ObcTwoStepActionState.enabled;
    }, 1000);
  }

  private scheduleArmedReset() {
    const armedHintDurationMs = ARMED_RESET_DELAY_MS;

    this.armedResetTimeoutId = this.clearTimer(this.armedResetTimeoutId);

    if (
      this.disabled ||
      this.state !== ObcTwoStepActionState.armed ||
      this.swipeArmedToActiveTimeoutId !== undefined ||
      armedHintDurationMs <= 0
    ) {
      return;
    }

    this.armedResetTimeoutId = window.setTimeout(() => {
      this.resetToEnabled();
    }, armedHintDurationMs);
  }

  private resetToEnabled() {
    if (this.disabled || this.state !== ObcTwoStepActionState.armed) return;

    this.state = ObcTwoStepActionState.enabled;
    this.labelBounce = false;
  }

  private triggerArmedHint() {
    const armedHintDurationMs = ARMED_RESET_DELAY_MS;

    this.armedHint = false;
    window.requestAnimationFrame(() => {
      this.armedHint = true;
      this.armedHintTimeoutId = this.clearTimer(this.armedHintTimeoutId);
      this.armedHintTimeoutId = window.setTimeout(() => {
        this.armedHint = false;
      }, armedHintDurationMs);
      this.scheduleArmedReset();
    });
  }

  private triggerArmedSlide() {
    this.armedSlide = true;
    this.armedSlideTimeoutId = this.clearTimer(this.armedSlideTimeoutId);
    this.armedSlideTimeoutId = window.setTimeout(() => {
      this.armedSlide = false;
    }, ARMED_SLIDE_DURATION_MS);
  }

  private triggerDisarmSlide() {
    this.disarmSlide = true;
    this.disarmSlideTimeoutId = this.clearTimer(this.disarmSlideTimeoutId);
    this.disarmSlideTimeoutId = window.setTimeout(() => {
      this.disarmSlide = false;
    }, ARMED_SLIDE_DURATION_MS);
  }

  private advanceState() {
    let nextState = this.state;

    switch (this.state) {
      case ObcTwoStepActionState.enabled:
        nextState = ObcTwoStepActionState.armed;
        break;
      case ObcTwoStepActionState.armed:
        nextState = ObcTwoStepActionState.active;
        break;
    }

    if (nextState === this.state) return;

    const previousState = this.state;
    if (nextState === ObcTwoStepActionState.active) {
      this.swipeArmed = false;
    }
    this.state = nextState;
    if (nextState === ObcTwoStepActionState.active) {
      this.emitChange(nextState, previousState);
    }
  }

  private handleClick(event: MouseEvent) {
    if (this.disabled) return;
    if (this.suppressNextClick) {
      this.suppressNextClick = false;
      return;
    }
    if (
      this.state === ObcTwoStepActionState.enabled &&
      this.isClickOnRole(event, 'state')
    ) {
      this.triggerLabelBounce();
      return;
    }

    if (
      this.state === ObcTwoStepActionState.enabled &&
      this.isClickOnRole(event, 'thumb')
    ) {
      this.triggerArmedSlide();
      this.advanceState();
      return;
    }
    if (
      this.state === ObcTwoStepActionState.armed &&
      !this.isClickOnRole(event, 'state') &&
      !this.isClickOnRole(event, 'thumb')
    ) {
      this.triggerArmedHint();
      return;
    }

    this.advanceState();
  }

  private stopDrag(target?: HTMLElement) {
    if (target && this.dragPointerId !== undefined) {
      try {
        if (target.hasPointerCapture(this.dragPointerId)) {
          target.releasePointerCapture(this.dragPointerId);
        }
      } catch (error) {
        void error;
      }
    }

    this.thumbDragging = false;
    this.setDragCssX(0);
    this.dragPointerId = undefined;
    this.dragMoved = false;
    this.dragStartX = 0;
    this.dragMaxX = 0;
    this.dragCompleteX = 0;
    this.dragScaleX = 1;
  }

  private armThenAutoActivateBySwipe() {
    if (this.state !== ObcTwoStepActionState.enabled || this.disabled) return;

    this.swipeArmed = true;
    this.state = ObcTwoStepActionState.armed;
    this.swipeArmedToActiveTimeoutId = this.clearTimer(
      this.swipeArmedToActiveTimeoutId
    );
    this.swipeArmedToActiveTimeoutId = window.setTimeout(() => {
      if (this.disabled || this.state !== ObcTwoStepActionState.armed) return;
      const previousState = this.state;
      this.swipeArmed = false;
      this.setDragCssX(0);
      this.state = ObcTwoStepActionState.active;
      this.emitChange(this.state, previousState);
      this.swipeArmedToActiveTimeoutId = this.clearTimer(
        this.swipeArmedToActiveTimeoutId
      );
      this.suppressNextClick = false;
    }, SWIPE_COMPLETE_TO_ACTIVE_MS);
  }

  private completeSwipeDragToActive(target: HTMLElement) {
    const completionX = this.dragMaxX;
    this.stopDrag(target);
    this.setDragCssX(completionX);
    this.suppressNextClick = true;
    this.armThenAutoActivateBySwipe();
  }

  private handleThumbPointerDown(event: PointerEvent) {
    if (
      this.disabled ||
      this.state !== ObcTwoStepActionState.enabled ||
      event.button !== 0
    ) {
      return;
    }

    const thumb = event.currentTarget as HTMLElement;
    const visible = this.queryVisibleWrapper();
    if (!visible) return;

    const visibleRect = visible.getBoundingClientRect();
    const visibleWidth = visible.offsetWidth;
    const safeVisibleWidth = visibleWidth || 1;

    this.dragPointerId = event.pointerId;
    this.dragStartX = event.clientX;
    const thumbWidth = thumb.offsetWidth;
    const buttonStrokeWidth = this.getButtonStrokeWidthPx();
    const dragSpace = Math.max(
      0,
      visibleWidth - thumbWidth - buttonStrokeWidth
    );
    this.dragMaxX = dragSpace;
    this.dragCompleteX = Math.min(
      this.dragMaxX,
      dragSpace / (1 + THUMB_DRAG_GROWTH_FACTOR)
    );
    this.dragScaleX = Math.max(
      THUMB_DRAG_MIN_SCALE_X,
      visibleRect.width / safeVisibleWidth
    );
    this.dragMoved = false;
    this.setDragCssX(0);
    this.thumbDragging = true;

    try {
      thumb.setPointerCapture(event.pointerId);
    } catch (error) {
      void error;
    }

    event.preventDefault();
  }

  private handleThumbPointerMove(event: PointerEvent) {
    if (
      !this.thumbDragging ||
      this.dragPointerId === undefined ||
      event.pointerId !== this.dragPointerId
    ) {
      return;
    }

    const delta = (event.clientX - this.dragStartX) / this.dragScaleX;
    const nextDragX = Math.min(this.dragMaxX, Math.max(0, delta));
    this.setDragCssX(nextDragX);
    if (nextDragX > THUMB_DRAG_MOVE_THRESHOLD_PX) {
      this.dragMoved = true;
    }

    if (nextDragX >= this.dragCompleteX) {
      const thumb = event.currentTarget as HTMLElement;
      this.completeSwipeDragToActive(thumb);
    }
  }

  private handleThumbPointerUp(event: PointerEvent) {
    if (
      !this.thumbDragging ||
      this.dragPointerId === undefined ||
      event.pointerId !== this.dragPointerId
    ) {
      return;
    }

    const thumb = event.currentTarget as HTMLElement;
    const didDrag = this.dragMoved;
    this.stopDrag(thumb);
    if (didDrag) {
      this.suppressNextClick = true;
      event.preventDefault();
    }
  }

  private handleThumbPointerCancel(event: PointerEvent) {
    if (
      !this.thumbDragging ||
      this.dragPointerId === undefined ||
      event.pointerId !== this.dragPointerId
    ) {
      return;
    }

    const thumb = event.currentTarget as HTMLElement;
    this.stopDrag(thumb);
    this.suppressNextClick = true;
  }

  override willUpdate(changedProperties: PropertyValues<this>) {
    if (changedProperties.has('state' as keyof LitElement)) {
      const previousState = changedProperties.get(
        'state' as keyof LitElement
      ) as ObcTwoStepActionState | undefined;

      if (
        previousState === ObcTwoStepActionState.armed &&
        this.state === ObcTwoStepActionState.enabled
      ) {
        this.triggerDisarmSlide();
      }
    }
  }

  override updated(changedProperties: PropertyValues<this>) {
    if (
      changedProperties.has('state' as keyof LitElement) ||
      changedProperties.has('disabled')
    ) {
      this.scheduleArmedReset();
    }

    if (this.state !== ObcTwoStepActionState.armed) {
      this.swipeArmed = false;
      this.armedHint = false;
      this.armedHintTimeoutId = this.clearTimer(this.armedHintTimeoutId);

      this.armedSlide = false;
      this.armedSlideTimeoutId = this.clearTimer(this.armedSlideTimeoutId);
      this.swipeArmedToActiveTimeoutId = this.clearTimer(
        this.swipeArmedToActiveTimeoutId
      );
    }

    if (this.state !== ObcTwoStepActionState.enabled) {
      this.disarmSlide = false;
      this.disarmSlideTimeoutId = this.clearTimer(this.disarmSlideTimeoutId);
    }

    if (
      changedProperties.has('state' as keyof LitElement) ||
      changedProperties.has('disabled')
    ) {
      this.scheduleActiveReset();
    }
  }

  override render() {
    const isEnabled = this.state === ObcTwoStepActionState.enabled;
    const isArmed = this.state === ObcTwoStepActionState.armed;
    const isActive = this.state === ObcTwoStepActionState.active;
    const actionLabel = this.getActionLabelText();
    const ariaLabel = actionLabel || 'Action';

    return html`
      <obc-button
        class=${classMap(
          this.buildWrapperClassInfo(isEnabled, isArmed, isActive)
        )}
        variant="flat"
        ?disabled=${this.disabled}
        @click=${this.handleClick}
        part="wrapper"
        aria-label=${ariaLabel}
        aria-pressed=${isActive ? 'true' : 'false'}
      >
        <div class="visible-wrapper" part="visible-wrapper">
          <div class="active-layer" part="active-layer"></div>
          <div class="segments-track" part="segments-track">
            <div class="thumb-preview" part="thumb-preview">
              <div class="thumb-visible" part="thumb-preview-visible">
                <obi-chevron-double-right-google
                  class="icon"
                ></obi-chevron-double-right-google>
              </div>
            </div>

            <div
              class=${classMap({
                'thumb-container': true,
                'thumb-dragging': this.thumbDragging,
              })}
              data-role="thumb"
              part="thumb-container"
              @pointerdown=${this.handleThumbPointerDown}
              @pointermove=${this.handleThumbPointerMove}
              @pointerup=${this.handleThumbPointerUp}
              @pointercancel=${this.handleThumbPointerCancel}
            >
              <div
                class=${classMap({
                  'thumb-visible': true,
                  'show-label': isArmed,
                })}
                part="thumb-visible"
              >
                <span class="thumb-icon-layer" aria-hidden="true">
                  <obi-chevron-right-google
                    class="icon"
                  ></obi-chevron-right-google>
                </span>
                <span class="thumb-label-layer" aria-hidden="true">
                  <span class="thumb-label">${actionLabel}</span>
                </span>
              </div>
            </div>

            ${this.swipeArmed
              ? null
              : html`
                  <div
                    class="state-container"
                    data-role="state"
                    part="state-container"
                    aria-hidden="true"
                  >
                    <div
                      class="state-container-visible"
                      part="state-container-visible"
                    >
                      <span
                        class="state-container-label"
                        part="state-container-label"
                      >
                        ${actionLabel}
                      </span>
                    </div>
                  </div>
                `}
          </div>

          <span class="active-label" part="active-label">${actionLabel}</span>

          <div class="state-segment" part="state-segment">
            <obi-check-google class="icon"></obi-check-google>
          </div>
        </div>
      </obc-button>
    `;
  }

  override disconnectedCallback() {
    super.disconnectedCallback();
    window.clearTimeout(this.labelBounceTimeoutId);
    this.armedResetTimeoutId = this.clearTimer(this.armedResetTimeoutId);
    this.armedHintTimeoutId = this.clearTimer(this.armedHintTimeoutId);
    this.armedSlideTimeoutId = this.clearTimer(this.armedSlideTimeoutId);
    this.disarmSlideTimeoutId = this.clearTimer(this.disarmSlideTimeoutId);
    this.swipeArmedToActiveTimeoutId = this.clearTimer(
      this.swipeArmedToActiveTimeoutId
    );
    this.activeResetTimeoutId = this.clearTimer(this.activeResetTimeoutId);
  }

  static override styles = unsafeCSS(componentStyle);
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-two-step-action': ObcTwoStepAction;
  }
}
