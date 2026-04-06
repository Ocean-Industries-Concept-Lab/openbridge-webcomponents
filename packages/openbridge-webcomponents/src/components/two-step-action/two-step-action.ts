import {LitElement, html, nothing, unsafeCSS, type PropertyValues} from 'lit';
import {property, state} from 'lit/decorators.js';
import {classMap, type ClassInfo} from 'lit/directives/class-map.js';
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

export enum ObcTwoStepActionVariant {
  twoStepAction = 'two-step-action',
  twoStepSwitch = 'two-step-switch',
}

export type ObcTwoStepActionChangeEvent = CustomEvent<{
  state: ObcTwoStepActionState;
  previousState: ObcTwoStepActionState;
}>;

const LABEL_BOUNCE_DURATION_MS = 220;
const ARMED_SLIDE_DURATION_MS = 880;
const SWIPE_COMPLETE_TO_ACTIVE_MS = 1200;
const ACTIVE_RESET_DELAY_MS = 1000;
const ARMED_RESET_DELAY_MS = 1600;
const THUMB_DRAG_GROWTH_FACTOR = 0.4146;
const THUMB_DRAG_MOVE_THRESHOLD_PX = 3;
const THUMB_DRAG_MIN_SCALE_X = 0.01;
const SWITCH_ACTIVE_TO_SECONDARY_PHASE_MS = 700;

/**
 * `<obc-two-step-action>` – A guarded control that moves through `enabled` → `armed` → `active`, then resets to `enabled`.
 *
 * ## Features
 * - **Variants:** `two-step-action` (default, 130px track); `two-step-switch` uses a 256px-wide track with 128px columns; `enabled` and `armed` use `switchThumbLabel`, `switchIdleStateLabel`, and `switchArmedPreviewLabel` (plus double chevron); `active` uses `switchActivePrimaryLabel` and `switchActiveSecondaryLabel` (no default-slot label or check icon); 128px preview and thumb widths in `armed`. **Switch only:** after the full-width `active` surface appears, a follow-up `active` layout slides the primary segment left while a secondary control segment slides in from the right; activating the secondary segment returns to `enabled` and emits `change` with `previousState` `active`. All visible copy is supplied by the host (default slot and `switch*` properties).
 *
 * ## Slots
 *
 * | Slot Name | Renders When... | Purpose |
 * | — (default) | `two-step-action` always; `two-step-switch` only in `active` | Primary label / final state copy from slot text. Switch uses `switchIdleStateLabel` in the state column for `enabled` and `armed`. |
 *
 * @slot - Default label in the track.
 * @fires change {ObcTwoStepActionChangeEvent} When entering `active` from `armed`, or when leaving `active` for `enabled` via the switch secondary control.
 */
@customElement('obc-two-step-action')
export class ObcTwoStepAction extends LitElement {
  @property({type: String, reflect: true})
  variant: ObcTwoStepActionVariant = ObcTwoStepActionVariant.twoStepAction;

  @property({type: Boolean, reflect: true}) disabled = false;

  @property({type: String, reflect: false}) label = '';

  /** @internal */
  @state() private state: ObcTwoStepActionState = ObcTwoStepActionState.enabled;

  @property({
    type: String,
    attribute: 'switch-thumb-label',
    reflect: false,
  })
  switchThumbLabel = '';

  @property({
    type: String,
    attribute: 'switch-idle-label',
    reflect: false,
  })
  switchIdleLabel = '';

  @property({
    type: String,
    attribute: 'switch-armed-label',
    reflect: false,
  })
  switchArmedLabel = '';

  @property({
    type: String,
    attribute: 'switch-secondary-label',
    reflect: false,
  })
  switchSecondaryLabel = '';

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
  @state() private switchSecondaryPhase = false;
  /** @internal */
  @state() private switchSecondarySlide = false;
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
  private switchSecondaryTimeout?: number;
  /** @internal */
  private switchSecondarySlideTimeout?: number;
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
    return this.label.trim();
  }

  private resolveSwitchLabels() {
    return {
      thumb: this.switchThumbLabel.trim(),
      idle: this.switchIdleLabel.trim(),
      armed: this.switchArmedLabel.trim(),
      secondary: this.switchSecondaryLabel.trim(),
    };
  }

  private queryVisibleWrapper(): HTMLElement | null {
    return this.renderRoot.querySelector('.visible-wrapper');
  }

  private buildWrapperClassInfo(
    isEnabled: boolean,
    isArmed: boolean,
    isActive: boolean,
    isSwitch: boolean
  ): ClassInfo {
    const switchActive = isSwitch && isActive;
    return {
      wrapper: true,
      'variant-two-step-action':
        this.variant === ObcTwoStepActionVariant.twoStepAction,
      'variant-two-step-switch': isSwitch,
      'state-enabled': isEnabled,
      'state-armed': isArmed,
      'state-active': isActive,
      'label-bounce': this.labelBounce,
      'armed-hint': this.armedHint,
      'armed-slide': this.armedSlide,
      'disarm-slide': this.disarmSlide,
      'thumb-dragging': this.thumbDragging,
      'swipe-armed-phase': this.swipeArmedPhase,
      'switch-secondary-phase': switchActive && this.switchSecondaryPhase,
      'switch-secondary-slide': switchActive && this.switchSecondarySlide,
    };
  }

  private buildWrapperInlineStyle(armedHintDurationMs: number): string {
    return [
      `--armed-hint-duration: ${armedHintDurationMs}ms`,
      `--thumb-drag-x: ${this.thumbDragX}px`,
      `--obc-two-step-thumb-drag-growth-factor: ${THUMB_DRAG_GROWTH_FACTOR}`,
      `--obc-two-step-duration-slide: ${ARMED_SLIDE_DURATION_MS}ms`,
    ].join('; ');
  }

  private isClickOnRole(event: Event, role: string) {
    const path = event.composedPath();
    return path.some(
      (node) => node instanceof HTMLElement && node.dataset.role === role
    );
  }

  private handleSwitchSecondaryClick(event: MouseEvent) {
    if (this.disabled) return;
    if (
      this.variant !== ObcTwoStepActionVariant.twoStepSwitch ||
      this.state !== ObcTwoStepActionState.active ||
      !this.switchSecondaryPhase
    ) {
      return;
    }
    if (this.suppressNextClick) {
      this.suppressNextClick = false;
      event.stopPropagation();
      return;
    }
    event.stopPropagation();
    this.completeSwitchSecondaryInteraction();
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

  private clearSwitchSecondaryTimer() {
    window.clearTimeout(this.switchSecondaryTimeout);
    this.switchSecondaryTimeout = undefined;
  }

  private clearSwitchSecondarySlideTimer() {
    window.clearTimeout(this.switchSecondarySlideTimeout);
    this.switchSecondarySlideTimeout = undefined;
  }

  private clearSwitchSecondaryTimers() {
    this.clearSwitchSecondaryTimer();
    this.clearSwitchSecondarySlideTimer();
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

    if (this.variant === ObcTwoStepActionVariant.twoStepSwitch) {
      return;
    }

    this.activeResetTimeout = window.setTimeout(() => {
      if (this.disabled || this.state !== ObcTwoStepActionState.active) return;
      this.state = ObcTwoStepActionState.enabled;
    }, ACTIVE_RESET_DELAY_MS);
  }

  private scheduleSwitchSecondaryPhase() {
    this.clearSwitchSecondaryTimers();
    this.switchSecondaryPhase = false;
    this.switchSecondarySlide = false;

    if (
      this.disabled ||
      this.state !== ObcTwoStepActionState.active ||
      this.variant !== ObcTwoStepActionVariant.twoStepSwitch
    ) {
      return;
    }

    this.switchSecondaryTimeout = window.setTimeout(() => {
      if (this.disabled || this.state !== ObcTwoStepActionState.active) return;
      this.switchSecondaryPhase = true;
      this.switchSecondarySlide = true;
      this.clearSwitchSecondarySlideTimer();
      this.switchSecondarySlideTimeout = window.setTimeout(() => {
        this.switchSecondarySlide = false;
        this.switchSecondarySlideTimeout = undefined;
      }, ARMED_SLIDE_DURATION_MS);
    }, SWITCH_ACTIVE_TO_SECONDARY_PHASE_MS);
  }

  private completeSwitchSecondaryInteraction() {
    this.clearSwitchSecondaryTimers();
    this.switchSecondaryPhase = false;
    this.switchSecondarySlide = false;
    this.state = ObcTwoStepActionState.enabled;
    this.emitChange(
      ObcTwoStepActionState.enabled,
      ObcTwoStepActionState.active
    );
  }

  private scheduleArmedReset() {
    const armedHintDurationMs = ARMED_RESET_DELAY_MS;

    this.clearArmedResetTimer();

    if (
      this.disabled ||
      this.state !== ObcTwoStepActionState.armed ||
      this.swipeArmedToActiveTimeout !== undefined ||
      armedHintDurationMs <= 0
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
    const armedHintDurationMs = ARMED_RESET_DELAY_MS;

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
      this.emitChange(this.state, previousState);
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
    const visible = this.queryVisibleWrapper();
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

    if (
      changedProperties.has('state' as keyof LitElement) ||
      changedProperties.has('disabled')
    ) {
      this.scheduleActiveReset();
    }

    if (
      this.state !== ObcTwoStepActionState.active ||
      this.variant !== ObcTwoStepActionVariant.twoStepSwitch ||
      this.disabled
    ) {
      this.clearSwitchSecondaryTimers();
      if (this.switchSecondaryPhase || this.switchSecondarySlide) {
        this.switchSecondaryPhase = false;
        this.switchSecondarySlide = false;
      }
    }

    if (
      (changedProperties.has('state' as keyof LitElement) ||
        changedProperties.has('variant') ||
        (changedProperties.has('disabled') && !this.disabled)) &&
      this.state === ObcTwoStepActionState.active &&
      this.variant === ObcTwoStepActionVariant.twoStepSwitch &&
      !this.disabled
    ) {
      this.scheduleSwitchSecondaryPhase();
    }
  }

  override render() {
    const isEnabled = this.state === ObcTwoStepActionState.enabled;
    const isArmed = this.state === ObcTwoStepActionState.armed;
    const isActive = this.state === ObcTwoStepActionState.active;
    const actionLabel = this.getActionLabelText();
    const armedHintDurationMs = ARMED_RESET_DELAY_MS;
    const isSwitch = this.variant === ObcTwoStepActionVariant.twoStepSwitch;
    const switchEnabledPrimary = isSwitch && isEnabled;
    const switchStateColumnFixedCopy = isSwitch && !isActive;
    const switchShowsDefaultThumbLabel = isSwitch && (isEnabled || isArmed);
    const showActionLabelOnThumb = isArmed && !isSwitch;
    const sc = isSwitch ? this.resolveSwitchLabels() : null;
    const switchSwipeThumbDisplayText =
      isSwitch && isArmed && this.swipeArmedPhase && sc
        ? sc.thumb
        : actionLabel;
    const switchArmedPreview = isSwitch && isArmed;
    const switchPendingLabel = switchArmedPreview && sc ? sc.armed : '';
    const switchSecondaryLabel = isSwitch && isActive && sc ? sc.secondary : '';
    const ariaLabel =
      sc && isActive && this.switchSecondaryPhase
        ? `${actionLabel}, ${switchSecondaryLabel}`
        : sc && isActive
          ? actionLabel
          : sc && !isActive
            ? isArmed
              ? `${sc.thumb}, ${sc.armed}, ${sc.idle}`
              : `${sc.thumb}, ${sc.idle}`
            : actionLabel;

    return html`
      <button
        type="button"
        class=${classMap(
          this.buildWrapperClassInfo(isEnabled, isArmed, isActive, isSwitch)
        )}
        ?disabled=${this.disabled}
        @click=${this.handleClick}
        part="wrapper"
        style=${this.buildWrapperInlineStyle(armedHintDurationMs)}
        aria-label=${ariaLabel}
        aria-pressed=${isActive ? 'true' : 'false'}
      >
        <div class="visible-wrapper" part="visible-wrapper">
          <div class="active-layer" part="active-layer"></div>
          <div class="segments-track" part="segments-track">
            <div class="thumb-preview" part="thumb-preview">
              <div class="thumb-visible" part="thumb-preview-visible">
                ${switchArmedPreview
                  ? html`<span class="thumb-preview-switch-pending">
                      <span class="thumb-preview-pending-label"
                        >${switchPendingLabel}</span
                      >
                      <obi-chevron-double-right-google
                        class="icon"
                      ></obi-chevron-double-right-google>
                    </span>`
                  : switchEnabledPrimary
                    ? nothing
                    : html`<obi-chevron-double-right-google
                        class="icon"
                      ></obi-chevron-double-right-google>`}
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
                  'show-label': showActionLabelOnThumb,
                })}
                part="thumb-visible"
              >
                <span class="thumb-icon-layer" aria-hidden="true">
                  ${switchShowsDefaultThumbLabel && sc
                    ? html`<span class="thumb-label">${sc.thumb}</span>`
                    : html`<obi-chevron-right-google
                        class="icon"
                      ></obi-chevron-right-google>`}
                </span>
                <span class="thumb-label-layer" aria-hidden="true">
                  <span class="thumb-label"
                    >${switchSwipeThumbDisplayText}</span
                  >
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
                        ${switchStateColumnFixedCopy && sc
                          ? sc.idle
                          : actionLabel}
                      </span>
                    </div>
                  </div>
                `}
          </div>

          <span class="active-label" part="active-label">${actionLabel}</span>

          <div class="state-segment" part="state-segment">
            ${isSwitch && isActive
              ? nothing
              : html`<obi-check-google class="icon"></obi-check-google>`}
          </div>

          ${isSwitch && isActive
            ? html`<span
                class="switch-secondary-control"
                part="switch-secondary"
                data-role="switch-secondary"
                @click=${this.handleSwitchSecondaryClick}
                >${switchSecondaryLabel}</span
              >`
            : nothing}
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
    this.clearSwitchSecondaryTimers();
  }

  static override styles = unsafeCSS(componentStyle);
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-two-step-action': ObcTwoStepAction;
  }
}
