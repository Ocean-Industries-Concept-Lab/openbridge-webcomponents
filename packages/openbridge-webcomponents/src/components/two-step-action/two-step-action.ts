import {LitElement, html, unsafeCSS} from 'lit';
import {property, state} from 'lit/decorators.js';
import {classMap} from 'lit/directives/class-map.js';
import componentStyle from './two-step-action.css?inline';
import '../../icons/icon-check-google.js';
import '../../icons/icon-chevron-right-google.js';
import '../../icons/icon-chevron-double-right-google.js';
import {customElement} from '../../decorator.js';

export enum ObcTwoStepActionState {
  enabled = 'enabled',
  armed = 'armed',
  active = 'active',
}

export type ObcTwoStepActionChangeEvent = CustomEvent<{
  state: ObcTwoStepActionState;
  previousState: ObcTwoStepActionState;
}>;

const LABEL_BOUNCE_DURATION_MS = 220;
const ARMED_HINT_DURATION_MS = 1600;
const ARMED_SLIDE_DURATION_MS = 700;
const SWIPE_COMPLETE_TO_ACTIVE_MS = 1200;
const ACTIVE_RESET_DELAY_MS = 1000;
const THUMB_DRAG_GROWTH_FACTOR = 0.4146;
const THUMB_DRAG_MOVE_THRESHOLD_PX = 3;
const THUMB_DRAG_MIN_SCALE_X = 0.01;

/** Two-step action control: `enabled` -> `armed` -> `active`, with auto-reset back to `enabled`. */
@customElement('obc-two-step-action')
export class ObcTwoStepAction extends LitElement {
  @property({type: String, reflect: true}) state: ObcTwoStepActionState =
    ObcTwoStepActionState.enabled;

  @property({type: Boolean, reflect: true}) disabled = false;

  @property({type: Number}) armedResetDelay = 1600;

  /** @internal */
  @state() private labelBounce = false;
  /** @internal */
  @state() private armedHint = false;
  /** @internal */
  @state() private armedSlide = false;
  /** @internal */
  @state() private disarmSlide = false;
  /** @internal */
  @state() private thumbDragX = 0;
  /** @internal */
  @state() private thumbDragging = false;
  /** @internal */
  @state() private swipeArmedPhase = false;
  /** @internal */
  private labelBounceTimeout?: number;
  /** @internal */
  private armedResetTimeout?: number;
  /** @internal */
  private armedHintTimeout?: number;
  /** @internal */
  private armedSlideTimeout?: number;
  /** @internal */
  private disarmSlideTimeout?: number;
  /** @internal */
  private swipeArmedToActiveTimeout?: number;
  /** @internal */
  private activeResetTimeout?: number;
  /** @internal */
  private thumbDragPointerId?: number;
  /** @internal */
  private thumbDragStartX = 0;
  /** @internal */
  private thumbDragMaxX = 0;
  /** @internal */
  private thumbDragCompleteX = 0;
  /** @internal */
  private thumbDragScaleX = 1;
  /** @internal */
  private thumbDragMoved = false;
  /** @internal */
  private suppressNextClick = false;

  private getButtonStrokeWidthPx() {
    const raw = getComputedStyle(this).getPropertyValue(
      '--ui-components-button-stroke-weight'
    );
    const parsed = Number.parseFloat(raw);
    return Number.isFinite(parsed) ? parsed : 0;
  }

  private getActionLabelText() {
    const label = this.textContent?.replace(/\s+/g, ' ').trim();
    return label && label.length > 0 ? label : 'Action';
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
      window.clearTimeout(this.labelBounceTimeout);
      this.labelBounceTimeout = window.setTimeout(() => {
        this.labelBounce = false;
      }, LABEL_BOUNCE_DURATION_MS);
    });
  }

  private dispatchChange(previousState: ObcTwoStepActionState) {
    this.dispatchEvent(
      new CustomEvent('change', {
        detail: {state: this.state, previousState},
        bubbles: true,
        composed: true,
      })
    );
  }

  private clearArmedResetTimer() {
    window.clearTimeout(this.armedResetTimeout);
    this.armedResetTimeout = undefined;
  }

  private clearArmedHintTimer() {
    window.clearTimeout(this.armedHintTimeout);
    this.armedHintTimeout = undefined;
  }

  private clearArmedSlideTimer() {
    window.clearTimeout(this.armedSlideTimeout);
    this.armedSlideTimeout = undefined;
  }

  private clearSwipeArmedToActiveTimer() {
    window.clearTimeout(this.swipeArmedToActiveTimeout);
    this.swipeArmedToActiveTimeout = undefined;
  }

  private clearActiveResetTimer() {
    window.clearTimeout(this.activeResetTimeout);
    this.activeResetTimeout = undefined;
  }

  private clearDisarmSlideTimer() {
    window.clearTimeout(this.disarmSlideTimeout);
    this.disarmSlideTimeout = undefined;
  }

  private scheduleActiveReset() {
    this.clearActiveResetTimer();

    if (this.disabled || this.state !== ObcTwoStepActionState.active) {
      return;
    }

    this.activeResetTimeout = window.setTimeout(() => {
      if (this.disabled || this.state !== ObcTwoStepActionState.active) return;
      this.state = ObcTwoStepActionState.enabled;
    }, ACTIVE_RESET_DELAY_MS);
  }

  private scheduleArmedReset() {
    const armedHintDurationMs =
      this.armedResetDelay > 0 ? this.armedResetDelay : ARMED_HINT_DURATION_MS;

    this.clearArmedResetTimer();

    if (
      this.disabled ||
      this.state !== ObcTwoStepActionState.armed ||
      this.swipeArmedToActiveTimeout !== undefined ||
      this.armedResetDelay <= 0
    ) {
      return;
    }

    this.armedResetTimeout = window.setTimeout(() => {
      this.resetToEnabled();
    }, armedHintDurationMs);
  }

  private resetToEnabled() {
    if (this.disabled || this.state !== ObcTwoStepActionState.armed) return;

    this.state = ObcTwoStepActionState.enabled;
    this.labelBounce = false;
  }

  private triggerArmedHint() {
    const armedHintDurationMs =
      this.armedResetDelay > 0 ? this.armedResetDelay : ARMED_HINT_DURATION_MS;

    this.armedHint = false;
    window.requestAnimationFrame(() => {
      this.armedHint = true;
      this.clearArmedHintTimer();
      this.armedHintTimeout = window.setTimeout(() => {
        this.armedHint = false;
      }, armedHintDurationMs);
      this.scheduleArmedReset();
    });
  }

  private triggerArmedSlide() {
    this.armedSlide = true;
    this.clearArmedSlideTimer();
    this.armedSlideTimeout = window.setTimeout(() => {
      this.armedSlide = false;
    }, ARMED_SLIDE_DURATION_MS);
  }

  private triggerDisarmSlide() {
    this.disarmSlide = true;
    this.clearDisarmSlideTimer();
    this.disarmSlideTimeout = window.setTimeout(() => {
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
      this.swipeArmedPhase = false;
    }
    this.state = nextState;
    if (nextState === ObcTwoStepActionState.active) {
      this.dispatchChange(previousState);
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

  private stopThumbDrag(target?: HTMLElement) {
    if (target && this.thumbDragPointerId !== undefined) {
      try {
        if (target.hasPointerCapture(this.thumbDragPointerId)) {
          target.releasePointerCapture(this.thumbDragPointerId);
        }
      } catch (error) {
        void error;
      }
    }

    this.thumbDragging = false;
    this.thumbDragX = 0;
    this.thumbDragPointerId = undefined;
    this.thumbDragMoved = false;
    this.thumbDragStartX = 0;
    this.thumbDragMaxX = 0;
    this.thumbDragCompleteX = 0;
    this.thumbDragScaleX = 1;
  }

  private armThenAutoAdvanceToActiveByDrag() {
    if (this.state !== ObcTwoStepActionState.enabled || this.disabled) return;

    this.swipeArmedPhase = true;
    this.state = ObcTwoStepActionState.armed;
    this.clearSwipeArmedToActiveTimer();
    this.swipeArmedToActiveTimeout = window.setTimeout(() => {
      if (this.disabled || this.state !== ObcTwoStepActionState.armed) return;
      const previousState = this.state;
      this.swipeArmedPhase = false;
      this.thumbDragX = 0;
      this.state = ObcTwoStepActionState.active;
      this.dispatchChange(previousState);
      this.clearSwipeArmedToActiveTimer();
      this.suppressNextClick = false;
    }, SWIPE_COMPLETE_TO_ACTIVE_MS);
  }

  private completeThumbDragToActive(target: HTMLElement) {
    const completionX = this.thumbDragMaxX;
    this.stopThumbDrag(target);
    this.thumbDragX = completionX;
    this.suppressNextClick = true;
    this.armThenAutoAdvanceToActiveByDrag();
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
    const visible = this.renderRoot.querySelector(
      '.visible-wrapper'
    ) as HTMLElement | null;
    if (!visible) return;

    const visibleRect = visible.getBoundingClientRect();
    const visibleWidth = visible.offsetWidth;
    const safeVisibleWidth = visibleWidth || 1;

    this.thumbDragPointerId = event.pointerId;
    this.thumbDragStartX = event.clientX;
    const thumbWidth = thumb.offsetWidth;
    const buttonStrokeWidth = this.getButtonStrokeWidthPx();
    const dragSpace = Math.max(
      0,
      visibleWidth - thumbWidth - buttonStrokeWidth
    );
    this.thumbDragMaxX = dragSpace;
    this.thumbDragCompleteX = Math.min(
      this.thumbDragMaxX,
      dragSpace / (1 + THUMB_DRAG_GROWTH_FACTOR)
    );
    this.thumbDragScaleX = Math.max(
      THUMB_DRAG_MIN_SCALE_X,
      visibleRect.width / safeVisibleWidth
    );
    this.thumbDragMoved = false;
    this.thumbDragX = 0;
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
      this.thumbDragPointerId === undefined ||
      event.pointerId !== this.thumbDragPointerId
    ) {
      return;
    }

    const delta = (event.clientX - this.thumbDragStartX) / this.thumbDragScaleX;
    const nextDragX = Math.min(this.thumbDragMaxX, Math.max(0, delta));
    this.thumbDragX = nextDragX;
    if (nextDragX > THUMB_DRAG_MOVE_THRESHOLD_PX) {
      this.thumbDragMoved = true;
    }

    if (nextDragX >= this.thumbDragCompleteX) {
      const thumb = event.currentTarget as HTMLElement;
      this.completeThumbDragToActive(thumb);
    }
  }

  private handleThumbPointerUp(event: PointerEvent) {
    if (
      !this.thumbDragging ||
      this.thumbDragPointerId === undefined ||
      event.pointerId !== this.thumbDragPointerId
    ) {
      return;
    }

    const thumb = event.currentTarget as HTMLElement;
    const didDrag = this.thumbDragMoved;
    this.stopThumbDrag(thumb);
    if (didDrag) {
      this.suppressNextClick = true;
      event.preventDefault();
    }
  }

  private handleThumbPointerCancel(event: PointerEvent) {
    if (
      !this.thumbDragging ||
      this.thumbDragPointerId === undefined ||
      event.pointerId !== this.thumbDragPointerId
    ) {
      return;
    }

    const thumb = event.currentTarget as HTMLElement;
    this.stopThumbDrag(thumb);
    this.suppressNextClick = true;
  }

  override willUpdate(changedProperties: Map<string, unknown>) {
    if (changedProperties.has('state')) {
      const previousState = changedProperties.get('state') as
        | ObcTwoStepActionState
        | undefined;

      if (
        previousState === ObcTwoStepActionState.armed &&
        this.state === ObcTwoStepActionState.enabled
      ) {
        this.triggerDisarmSlide();
      }
    }
  }

  override updated(changedProperties: Map<string, unknown>) {
    if (
      changedProperties.has('state') ||
      changedProperties.has('disabled') ||
      changedProperties.has('armedResetDelay')
    ) {
      this.scheduleArmedReset();
    }

    if (this.state !== ObcTwoStepActionState.armed) {
      this.swipeArmedPhase = false;
      this.armedHint = false;
      this.clearArmedHintTimer();

      this.armedSlide = false;
      this.clearArmedSlideTimer();
      this.clearSwipeArmedToActiveTimer();
    }

    if (this.state !== ObcTwoStepActionState.enabled) {
      this.disarmSlide = false;
      this.clearDisarmSlideTimer();
    }

    if (changedProperties.has('state') || changedProperties.has('disabled')) {
      this.scheduleActiveReset();
    }
  }

  override render() {
    const isEnabled = this.state === ObcTwoStepActionState.enabled;
    const isArmed = this.state === ObcTwoStepActionState.armed;
    const isActive = this.state === ObcTwoStepActionState.active;
    const showThumbLabel = isArmed;
    const actionLabel = this.getActionLabelText();
    const armedHintDurationMs =
      this.armedResetDelay > 0 ? this.armedResetDelay : ARMED_HINT_DURATION_MS;

    return html`
      <button
        class=${classMap({
          wrapper: true,
          'state-enabled': isEnabled,
          'state-armed': isArmed,
          'state-active': isActive,
          'label-bounce': this.labelBounce,
          'armed-hint': this.armedHint,
          'armed-slide': this.armedSlide,
          'disarm-slide': this.disarmSlide,
          'thumb-dragging': this.thumbDragging,
          'swipe-armed-phase': this.swipeArmedPhase,
        })}
        ?disabled=${this.disabled}
        @click=${this.handleClick}
        part="wrapper"
        style=${`--armed-hint-duration: ${armedHintDurationMs}ms; --thumb-drag-x: ${this.thumbDragX}px; --obc-two-step-thumb-drag-growth-factor: ${THUMB_DRAG_GROWTH_FACTOR}; --obc-two-step-duration-slide: ${ARMED_SLIDE_DURATION_MS}ms;`}
        aria-label=${actionLabel}
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
                  'show-label': showThumbLabel,
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

            ${this.swipeArmedPhase
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
                        <slot>Action</slot>
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
      </button>
    `;
  }

  override disconnectedCallback() {
    super.disconnectedCallback();
    window.clearTimeout(this.labelBounceTimeout);
    this.clearArmedResetTimer();
    this.clearArmedHintTimer();
    this.clearArmedSlideTimer();
    this.clearDisarmSlideTimer();
    this.clearSwipeArmedToActiveTimer();
    this.clearActiveResetTimer();
  }

  static override styles = unsafeCSS(componentStyle);
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-two-step-action': ObcTwoStepAction;
  }
}
