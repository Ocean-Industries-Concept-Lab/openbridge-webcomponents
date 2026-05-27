import {LitElement, html, unsafeCSS, type PropertyValues} from 'lit';
import {ifDefined} from 'lit/directives/if-defined.js';
import {property, state} from 'lit/decorators.js';
import {classMap, type ClassInfo} from 'lit/directives/class-map.js';
import componentStyle from './two-step-action.css?inline';
import '../../icons/icon-check-google.js';
import '../../icons/icon-close-google.js';
import '../../icons/icon-chevron-right-google.js';
import '../../icons/icon-chevron-double-right-google.js';
import {customElement} from '../../decorator.js';
import '../button/button.js';
import {
  SequenceLoadingSpinnerProgressionType,
  SequenceLoadingSpinnerType,
} from '../sequence-loading-spinner/sequence-loading-spinner.js';
import '../sequence-loading-spinner/sequence-loading-spinner.js';

export enum ObcTwoStepActionState {
  enabled = 'enabled',
  armed = 'armed',
  processing = 'processing',
  active = 'active',
}

export type ObcTwoStepActionConfirmClickEvent = CustomEvent<
  Record<string, never>
>;

export type ObcTwoStepActionCancelClickEvent = CustomEvent<
  Record<string, never>
>;

export enum ObcTwoStepActionVariant {
  standard = 'standard',
  cancellable = 'cancellable',
}

export enum ObcTwoStepActionWidth {
  fluid = 'fluid',
  hug = 'hug',
}

enum DragPhase {
  idle = 'idle',
  dragging = 'dragging',
  springing = 'springing',
  committing = 'committing',
}

enum SlideDirection {
  none = 'none',
  arming = 'arming',
  disarming = 'disarming',
}

enum TimerKey {
  labelBounce = 'labelBounce',
  armedReset = 'armedReset',
  armedHint = 'armedHint',
  armedSlide = 'armedSlide',
  disarmSlide = 'disarmSlide',
  activeReset = 'activeReset',
  thumbDragSettle = 'thumbDragSettle',
  cancelReturnSettle = 'cancelReturnSettle',
}

export type ObcTwoStepActionChangeEvent = CustomEvent<{
  state: ObcTwoStepActionState;
  previousState: ObcTwoStepActionState;
}>;

const ARMED_SLIDE_DURATION_MS = 880;
const CANCEL_RETURN_SETTLE_MS = ARMED_SLIDE_DURATION_MS + 40;
const ARMED_HINT_DURATION_MS = 1600;
const LABEL_BOUNCE_DURATION_MS = 220;
const DEFAULT_CONFIRM_TIMEOUT_MS = 7000;
const GROW_WIDTH_RATIO = 0.8;
const EDGE_COMMIT_RATIO = 0.98;
const THUMB_DRAG_SPRING_DURATION_MS = 520;
const THUMB_DRAG_SETTLE_MS = THUMB_DRAG_SPRING_DURATION_MS + 40;
const THUMB_DRAG_MOVE_THRESHOLD_PX = 10;
const SWIPE_ARMED_HYSTERESIS_PX = 12;
const DEFAULT_CANCEL_ARIA_LABEL = 'Cancel';
const ACTIVE_SUCCESS_DISPLAY_MS = 1000;

/**
 * `<obc-two-step-action>` – A guarded action control that progresses through `enabled` → `armed` → `processing` → `active`, then resets back to `enabled`.
 *
 * ## Features
 * - **Two-step confirmation**: Requires an intermediate `armed` state to reduce accidental triggers.
 * - **Controlled processing**: After confirmation, enters `processing` until the consumer clears the reflected `loading` property (`loading` true→false).
 * - **Swipe support**: Dragging the thumb can grow, reveal a preview, and confirm at the track edge.
 * - **Auto reset**: The `active` (success) phase shows briefly (~1 s), then returns to `enabled`; listen for `change` with `detail.state === 'active'` and again when it becomes `enabled`.
 * - **Accessible naming**: `ariaLabel` names the control when set; otherwise the resolved action label is used.
 * - **Read-only phase**: Read the current phase via the `state` getter; use `disabled` to block interaction. Phase transitions are driven internally by user interaction and the `loading` property — do not set the reactive `interactionState` field directly.
 *
 * ## Integrator contract
 *
 * | Step | Your action | Component phase |
 * |------|-------------|-----------------|
 * | User confirms (second click or swipe commit) | On `confirm-click`, set `loading` to `true` and start async work (e.g. `fetch`). | `processing` (`change` with `detail.state === 'processing'`) |
 * | Work succeeds | Set `loading` to `false` when the request completes. | `active` (success UI), then auto `enabled` after ~1 s |
 * | User cancels (`variant="cancellable"`) | On `cancel-click`, set `loading` to `false` and abort work. | Returns to `enabled` after cancel animation |
 * | Block interaction | Set `disabled` to `true`. | No state advances while disabled |
 *
 * `loading` is the external flag that ends the processing phase: keep it `true` while work runs; set it `false` only when work finished successfully. Do not toggle `loading` for success before the request completes.
 *
 * ## Usage Guidelines
 * Use this control for actions that should be deliberate but still quick to complete. Prefer a standard button for routine actions that do not need guarding.
 *
 * ## Slots
 *
 * | Slot | Purpose |
 * |------|---------|
 * | `action` | Primary label (enabled, armed, thumb); falls back to `label` |
 * | `processing-label` | Processing row text; falls back to `processingLabel`, then `label` |
 * | `success-label` | Success row text; falls back to `successLabel`, then `label` |
 *
 * @slot action - Primary action label for enabled and armed phases.
 * @slot processing-label - Label shown during the processing phase.
 * @slot success-label - Label shown during the active (success) phase.
 * @fires confirm-click {ObcTwoStepActionConfirmClickEvent} When the user completes the second step and the control enters `processing`.
 * @fires cancel-click {ObcTwoStepActionCancelClickEvent} When the user cancels during `processing` (`variant="cancellable"` only).
 * @fires change {ObcTwoStepActionChangeEvent} On every internal phase transition (`detail.state`, `detail.previousState`).
 */
@customElement('obc-two-step-action')
export class ObcTwoStepAction extends LitElement {
  @property({type: Boolean, reflect: true}) disabled = false;

  @property({type: String, reflect: false}) label = '';

  @property({type: String, reflect: false}) successLabel = '';

  @property({type: String, reflect: false}) processingLabel = '';

  /**
   * When `true`, keeps the control in `processing`. Set `true` on `confirm-click` while async work runs; set `false` when work succeeds to enter `active`.
   */
  @property({type: Boolean, reflect: true}) loading = false;

  @property({type: String, reflect: true})
  variant: ObcTwoStepActionVariant = ObcTwoStepActionVariant.standard;

  @property({type: String, reflect: true})
  width: ObcTwoStepActionWidth = ObcTwoStepActionWidth.fluid;

  @property({type: String, attribute: 'cancel-aria-label', reflect: false})
  cancelAriaLabel = '';

  @property({type: Number, attribute: 'confirm-timeout', reflect: true})
  confirmTimeout = DEFAULT_CONFIRM_TIMEOUT_MS;

  @property({type: String, attribute: 'aria-label'})
  override ariaLabel = '';

  @state() private interactionState: ObcTwoStepActionState =
    ObcTwoStepActionState.enabled;

  @state() private statusAnnouncement = '';

  @state() private labelBounce = false;
  @state() private armedHint = false;
  @state() private slideDirection: SlideDirection = SlideDirection.none;
  @state() private dragPhase: DragPhase = DragPhase.idle;
  private thumbDragEdgeReady = false;
  @state() private swipeArmed = false;
  @state() private cancelReturning = false;
  @state() private cancelHandoff = false;
  private timers = new Map<TimerKey, number>();
  private dragPointerId?: number;
  private dragStartX = 0;
  private dragMaxX = 0;
  private dragDetachX = 0;
  private dragCurrentX = 0;
  private dragMoved = false;
  private suppressNextClick = false;
  private trackResizeObserver?: ResizeObserver;
  private dragFrozenTrackWidthPx?: number;

  private readonly handleSlotChange = () => {
    this.requestUpdate();
  };

  /** Read-only interaction phase (`enabled`, `armed`, `processing`, `active`). */
  get state(): ObcTwoStepActionState {
    return this.interactionState;
  }

  private getButtonStrokeWidthPx() {
    const raw = getComputedStyle(this).getPropertyValue(
      '--ui-components-button-stroke-weight'
    );
    const parsed = Number.parseFloat(raw);
    return Number.isFinite(parsed) ? parsed : 0;
  }

  private getSlottedText(slotName: string) {
    const nodes = this.querySelectorAll(`:scope > [slot="${slotName}"]`);
    if (nodes.length === 0) return '';
    return Array.from(nodes)
      .map((node) => node.textContent?.trim() ?? '')
      .join(' ')
      .trim();
  }

  private resolveLabel(slotName: string, propertyValue: string) {
    const slotted = this.getSlottedText(slotName);
    if (slotted) return slotted;
    return propertyValue.trim();
  }

  private getActionLabelText() {
    return this.resolveLabel('action', this.label);
  }

  private getSuccessLabelText(actionLabel?: string) {
    const success = this.resolveLabel('success-label', this.successLabel);
    if (success) return success;
    return actionLabel ?? this.getActionLabelText();
  }

  private getProcessingLabelText(actionLabel?: string) {
    const processing = this.resolveLabel(
      'processing-label',
      this.processingLabel
    );
    if (processing) return processing;
    return actionLabel ?? this.getActionLabelText();
  }

  private resolveStatusAnnouncement(state: ObcTwoStepActionState) {
    switch (state) {
      case ObcTwoStepActionState.armed:
        return this.getActionLabelText();
      case ObcTwoStepActionState.processing:
        return this.getProcessingLabelText();
      case ObcTwoStepActionState.active:
        return this.getSuccessLabelText();
      default:
        return '';
    }
  }

  private updateStatusAnnouncement(state: ObcTwoStepActionState) {
    const message = this.resolveStatusAnnouncement(state);
    if (!message) return;
    this.statusAnnouncement = '';
    window.requestAnimationFrame(() => {
      this.statusAnnouncement = message;
    });
  }

  private resolveAriaLabel() {
    const explicit = this.ariaLabel.trim();
    if (explicit) return explicit;
    const visible = this.getActionLabelText();
    if (visible) return visible;
    return undefined;
  }

  private resolveCancelAriaLabel() {
    const explicit = this.cancelAriaLabel.trim();
    if (explicit) return explicit;
    return DEFAULT_CANCEL_ARIA_LABEL;
  }

  private get isCancellableVariant() {
    return this.variant === ObcTwoStepActionVariant.cancellable;
  }

  private get isHugWidth() {
    return this.width === ObcTwoStepActionWidth.hug;
  }

  private getConfirmTimeoutMs() {
    const value = this.confirmTimeout;
    return Number.isFinite(value)
      ? Math.max(0, value)
      : DEFAULT_CONFIRM_TIMEOUT_MS;
  }

  private queryVisibleWrapper(): HTMLElement | null {
    return this.renderRoot.querySelector('.visible-wrapper');
  }

  private queryControlRoot(): HTMLElement | null {
    const root = this.renderRoot.querySelector('.control-root');
    return root instanceof HTMLElement ? root : null;
  }

  private querySegmentsTrack(): HTMLElement | null {
    const track = this.renderRoot.querySelector('.segments-track');
    return track instanceof HTMLElement ? track : null;
  }

  private queryWidthGuarantorSegmentsLine(): HTMLElement | null {
    const line = this.renderRoot.querySelector(
      '.width-guarantor-line--segments'
    );
    return line instanceof HTMLElement ? line : null;
  }

  private shouldMeasureFluidTrackFromVisibleWrapper() {
    return (
      this.interactionState === ObcTwoStepActionState.enabled ||
      this.interactionState === ObcTwoStepActionState.armed
    );
  }

  private resolveHugTrackMeasureWidth(): number {
    const guarantorWidth =
      this.queryWidthGuarantorSegmentsLine()?.offsetWidth ?? 0;
    if (guarantorWidth > 0) {
      return guarantorWidth;
    }

    const visibleWidth = this.queryVisibleWrapper()?.offsetWidth ?? 0;
    if (visibleWidth > 0) {
      return visibleWidth;
    }

    return 0;
  }

  private resolveTrackMeasureWidth(): number {
    if (this.dragFrozenTrackWidthPx !== undefined) {
      return this.dragFrozenTrackWidthPx;
    }

    if (this.isHugWidth) {
      const hugWidth = this.resolveHugTrackMeasureWidth();
      if (hugWidth > 0) {
        return hugWidth;
      }
      return this.clientWidth;
    }

    if (this.shouldMeasureFluidTrackFromVisibleWrapper()) {
      const trackWidth = this.querySegmentsTrack()?.offsetWidth ?? 0;
      if (trackWidth > 0) {
        return trackWidth;
      }

      const visibleWidth = this.queryVisibleWrapper()?.offsetWidth ?? 0;
      if (visibleWidth > 0) {
        return visibleWidth;
      }
    }

    const controlRoot = this.queryControlRoot();
    if (controlRoot && controlRoot.clientWidth > 0) {
      return controlRoot.clientWidth;
    }

    return this.clientWidth;
  }

  private buildWrapperClassInfo(
    isEnabled: boolean,
    isArmed: boolean,
    isProcessing: boolean,
    isActive: boolean
  ): ClassInfo {
    return {
      wrapper: true,
      'is-disabled': this.disabled,
      'state-enabled': isEnabled,
      'state-armed': isArmed,
      'state-processing': isProcessing,
      'state-active': isActive,
      'variant-cancellable': this.isCancellableVariant,
      'label-bounce': this.labelBounce,
      'armed-hint': this.armedHint,
      'armed-slide': this.slideDirection === SlideDirection.arming,
      'disarm-slide': this.slideDirection === SlideDirection.disarming,
      'thumb-dragging': this.dragPhase === DragPhase.dragging,
      'thumb-drag-spring-back': this.dragPhase === DragPhase.springing,
      'thumb-drag-commit': this.dragPhase === DragPhase.committing,
      'swipe-armed-phase': this.swipeArmed,
      'cancel-returning': this.cancelReturning,
      'cancel-handoff': this.cancelHandoff,
    };
  }

  private setDragCssX(px: number) {
    this.style.setProperty('--thumb-drag-x', `${px}px`);
  }

  private setThumbDragEdgeReady(atEdge: boolean) {
    if (this.thumbDragEdgeReady === atEdge) {
      return;
    }

    this.thumbDragEdgeReady = atEdge;

    if (atEdge) {
      this.setAttribute('data-thumb-drag-edge-ready', '');
    } else {
      this.removeAttribute('data-thumb-drag-edge-ready');
    }
  }

  private applyFrozenTrackWidthPx(trackWidth: number) {
    this.dragFrozenTrackWidthPx = trackWidth;

    const currentRaw = getComputedStyle(this)
      .getPropertyValue('--obc-two-step-track-width')
      .trim();
    const current = Number.parseFloat(currentRaw);

    if (!Number.isFinite(current) || Math.abs(current - trackWidth) > 1) {
      this.setTrackWidthPx(trackWidth);
    }
  }

  private setTrackWidthPx(px: number) {
    this.style.setProperty('--obc-two-step-track-width', `${px}px`);
  }

  private measureAndApplyTrackWidth(options?: {ignoreCancelHandoff?: boolean}) {
    if (this.cancelHandoff && !options?.ignoreCancelHandoff) {
      return;
    }

    if (this.dragPhase === DragPhase.dragging) {
      return;
    }

    const width = this.resolveTrackMeasureWidth();
    if (width > 0) {
      this.setTrackWidthPx(width);
    }
  }

  private scheduleTrackWidthMeasure() {
    if (this.dragPhase === DragPhase.dragging || this.cancelHandoff) return;

    window.requestAnimationFrame(() => {
      if (this.dragPhase !== DragPhase.dragging && !this.cancelHandoff) {
        this.measureAndApplyTrackWidth();
      }
    });
  }

  private connectTrackResizeObserver() {
    const target = this.queryControlRoot();
    if (!target) return;

    this.trackResizeObserver?.disconnect();
    this.trackResizeObserver = new ResizeObserver(() => {
      if (this.dragPhase === DragPhase.dragging || this.cancelHandoff) return;
      this.measureAndApplyTrackWidth();
    });
    this.trackResizeObserver.observe(target);
  }

  private disconnectTrackResizeObserver() {
    this.trackResizeObserver?.disconnect();
    this.trackResizeObserver = undefined;
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
      this.setManagedTimer(
        TimerKey.labelBounce,
        () => {
          this.labelBounce = false;
        },
        LABEL_BOUNCE_DURATION_MS
      );
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

  private emitConfirmClick() {
    this.dispatchEvent(
      new CustomEvent('confirm-click', {
        detail: {},
        bubbles: true,
        composed: true,
      })
    );
  }

  private emitCancelClick() {
    this.dispatchEvent(
      new CustomEvent('cancel-click', {
        detail: {},
        bubbles: true,
        composed: true,
      })
    );
  }

  private transitionState(nextState: ObcTwoStepActionState) {
    if (nextState === this.interactionState) return;

    const previousState = this.interactionState;

    if (
      nextState === ObcTwoStepActionState.processing ||
      nextState === ObcTwoStepActionState.active
    ) {
      this.swipeArmed = false;
    }

    this.interactionState = nextState;
    this.updateStatusAnnouncement(nextState);

    if (nextState === ObcTwoStepActionState.processing) {
      this.emitConfirmClick();
    }

    this.emitChange(nextState, previousState);
  }

  private setManagedTimer(
    key: TimerKey,
    callback: () => void,
    delayMs: number
  ) {
    this.clearManagedTimer(key);
    const id = window['setTimeout'](() => {
      this.timers.delete(key);
      callback();
    }, delayMs);
    this.timers.set(key, id);
  }

  private clearManagedTimer(key: TimerKey) {
    const id = this.timers.get(key);
    if (id !== undefined) {
      window['clearTimeout'](id);
      this.timers.delete(key);
    }
  }

  private scheduleActiveReset() {
    this.clearManagedTimer(TimerKey.activeReset);

    if (
      this.disabled ||
      this.interactionState !== ObcTwoStepActionState.active
    ) {
      return;
    }

    this.setManagedTimer(
      TimerKey.activeReset,
      () => {
        if (
          this.disabled ||
          this.interactionState !== ObcTwoStepActionState.active
        ) {
          return;
        }
        this.transitionState(ObcTwoStepActionState.enabled);
      },
      ACTIVE_SUCCESS_DISPLAY_MS
    );
  }

  private scheduleArmedReset() {
    const confirmTimeoutMs = this.getConfirmTimeoutMs();

    this.clearManagedTimer(TimerKey.armedReset);

    if (
      this.disabled ||
      this.interactionState !== ObcTwoStepActionState.armed ||
      confirmTimeoutMs <= 0
    ) {
      return;
    }

    this.setManagedTimer(
      TimerKey.armedReset,
      () => {
        this.resetToEnabled();
      },
      confirmTimeoutMs
    );
  }

  private resetToEnabled() {
    if (
      this.disabled ||
      this.interactionState !== ObcTwoStepActionState.armed
    ) {
      return;
    }

    this.transitionState(ObcTwoStepActionState.enabled);
    this.labelBounce = false;
  }

  private triggerArmedHint() {
    this.armedHint = false;
    window.requestAnimationFrame(() => {
      this.armedHint = true;
      this.setManagedTimer(
        TimerKey.armedHint,
        () => {
          this.armedHint = false;
        },
        ARMED_HINT_DURATION_MS
      );
      this.scheduleArmedReset();
    });
  }

  private triggerArmedSlide() {
    this.slideDirection = SlideDirection.arming;
    this.setManagedTimer(
      TimerKey.armedSlide,
      () => {
        if (this.slideDirection === SlideDirection.arming) {
          this.slideDirection = SlideDirection.none;
        }
      },
      ARMED_SLIDE_DURATION_MS
    );
  }

  private triggerDisarmSlide() {
    this.slideDirection = SlideDirection.disarming;
    this.setManagedTimer(
      TimerKey.disarmSlide,
      () => {
        if (this.slideDirection === SlideDirection.disarming) {
          this.slideDirection = SlideDirection.none;
        }
      },
      ARMED_SLIDE_DURATION_MS
    );
  }

  private advanceState() {
    let nextState = this.interactionState;

    switch (this.interactionState) {
      case ObcTwoStepActionState.enabled:
        nextState = ObcTwoStepActionState.armed;
        break;
      case ObcTwoStepActionState.armed:
        nextState = ObcTwoStepActionState.processing;
        break;
    }

    if (nextState === this.interactionState) return;

    this.transitionState(nextState);
  }

  private handleCancelClick(event: MouseEvent) {
    event.stopPropagation();
    if (
      this.disabled ||
      this.cancelReturning ||
      this.interactionState !== ObcTwoStepActionState.processing ||
      !this.isCancellableVariant
    ) {
      return;
    }

    this.cancelReturning = true;
    this.emitCancelClick();
    this.measureAndApplyTrackWidth();
    window.requestAnimationFrame(() => {
      this.scheduleCancelReturnSettleFallback();
    });
  }

  private handleClick(event: MouseEvent) {
    if (this.disabled) return;
    if (this.interactionState === ObcTwoStepActionState.processing) {
      return;
    }
    if (this.suppressNextClick) {
      this.suppressNextClick = false;
      return;
    }
    if (
      this.interactionState === ObcTwoStepActionState.enabled &&
      this.isClickOnRole(event, 'state')
    ) {
      this.triggerLabelBounce();
      return;
    }

    if (
      this.interactionState === ObcTwoStepActionState.enabled &&
      this.isClickOnRole(event, 'thumb')
    ) {
      this.triggerArmedSlide();
      this.advanceState();
      return;
    }

    if (
      this.interactionState === ObcTwoStepActionState.armed &&
      this.isClickOnRole(event, 'preview')
    ) {
      this.transitionState(ObcTwoStepActionState.enabled);
      return;
    }

    if (
      this.interactionState === ObcTwoStepActionState.armed &&
      !this.isClickOnRole(event, 'state') &&
      !this.isClickOnRole(event, 'thumb')
    ) {
      this.triggerArmedHint();
      return;
    }

    this.advanceState();
  }

  private releaseDragCapture(target: HTMLElement) {
    if (this.dragPointerId === undefined) return;

    try {
      if (target.hasPointerCapture(this.dragPointerId)) {
        target.releasePointerCapture(this.dragPointerId);
      }
    } catch (error) {
      void error;
    }
  }

  private clearDragSettleTimer() {
    this.clearManagedTimer(TimerKey.thumbDragSettle);
  }

  private clearCancelReturnSettleTimer() {
    this.clearManagedTimer(TimerKey.cancelReturnSettle);
  }

  private scheduleCancelReturnSettleFallback() {
    this.clearCancelReturnSettleTimer();
    this.setManagedTimer(
      TimerKey.cancelReturnSettle,
      () => {
        if (this.cancelReturning) {
          this.finalizeCancelReturn();
        }
      },
      CANCEL_RETURN_SETTLE_MS
    );
  }

  private finalizeCancelReturn() {
    if (!this.cancelReturning) return;

    this.clearCancelReturnSettleTimer();
    this.cancelReturning = false;

    if (this.interactionState !== ObcTwoStepActionState.processing) return;

    this.measureAndApplyTrackWidth();
    this.cancelHandoff = true;
    this.transitionState(ObcTwoStepActionState.enabled);
  }

  private scheduleCancelHandoffClear() {
    window.requestAnimationFrame(() => {
      this.measureAndApplyTrackWidth({ignoreCancelHandoff: true});
      window.requestAnimationFrame(() => {
        if (
          this.interactionState === ObcTwoStepActionState.enabled &&
          this.cancelHandoff
        ) {
          this.cancelHandoff = false;
        }
      });
    });
  }

  private handleCancelReturnTransitionEnd(event: TransitionEvent) {
    if (!this.cancelReturning) return;
    if (event.currentTarget !== event.target) return;
    if (event.propertyName !== 'transform') return;

    this.finalizeCancelReturn();
  }

  private scheduleDragSettleFallback(mode: 'commit' | 'spring') {
    this.clearDragSettleTimer();
    this.setManagedTimer(
      TimerKey.thumbDragSettle,
      () => {
        if (mode === 'commit' && this.dragPhase === DragPhase.committing) {
          this.finishSwipeDragCommit();
          return;
        }
        if (mode === 'spring' && this.dragPhase === DragPhase.springing) {
          this.finishSpringBack();
        }
      },
      THUMB_DRAG_SETTLE_MS
    );
  }

  private resetDragMetrics() {
    this.clearDragSettleTimer();
    this.dragPointerId = undefined;
    this.dragMoved = false;
    this.dragStartX = 0;
    this.dragMaxX = 0;
    this.dragDetachX = 0;
    this.dragCurrentX = 0;
    this.dragFrozenTrackWidthPx = undefined;
    this.dragPhase = DragPhase.idle;
    this.setThumbDragEdgeReady(false);
    this.setDragCssX(0);
  }

  private getDragEdgeCommitX() {
    return this.dragMaxX * EDGE_COMMIT_RATIO;
  }

  private finishSwipeDragCommit() {
    if (
      this.interactionState === ObcTwoStepActionState.processing ||
      this.interactionState === ObcTwoStepActionState.active
    ) {
      return;
    }

    this.clearDragSettleTimer();
    this.dragPhase = DragPhase.idle;
    this.setThumbDragEdgeReady(false);
    this.swipeArmed = false;
    this.setDragCssX(0);
    this.resetDragMetrics();
    this.transitionState(ObcTwoStepActionState.processing);
  }

  private finishSpringBack() {
    if (this.dragPhase !== DragPhase.springing) {
      return;
    }

    this.clearDragSettleTimer();
    this.dragPhase = DragPhase.idle;
    this.resetDragMetrics();
  }

  private commitSwipeDragOnRelease() {
    this.suppressNextClick = true;

    if (this.dragCurrentX >= this.getDragEdgeCommitX()) {
      this.finishSwipeDragCommit();
      return;
    }

    this.dragPhase = DragPhase.committing;
    window.requestAnimationFrame(() => {
      this.setDragCssX(this.dragMaxX);
      this.scheduleDragSettleFallback('commit');
    });
  }

  private springBackSwipeDrag() {
    this.swipeArmed = false;
    this.setThumbDragEdgeReady(false);

    if (this.dragCurrentX <= 0) {
      this.dragPhase = DragPhase.idle;
      this.resetDragMetrics();
      return;
    }

    this.dragPhase = DragPhase.springing;
    window.requestAnimationFrame(() => {
      this.setDragCssX(0);
      this.scheduleDragSettleFallback('spring');
    });
  }

  private handleDragTransitionEnd(event: TransitionEvent) {
    if (event.currentTarget !== event.target) return;
    if (
      this.dragPhase !== DragPhase.springing &&
      this.dragPhase !== DragPhase.committing
    ) {
      return;
    }

    const isTrackTransform =
      (event.target as HTMLElement).matches('[part="segments-track"]') &&
      event.propertyName === 'transform';

    if (this.dragPhase === DragPhase.committing) {
      if (!isTrackTransform) return;
      this.finishSwipeDragCommit();
      return;
    }

    if (this.dragPhase === DragPhase.springing) {
      if (!isTrackTransform) return;
      this.finishSpringBack();
    }
  }

  private handleThumbPointerDown(event: PointerEvent) {
    if (
      this.disabled ||
      this.interactionState !== ObcTwoStepActionState.enabled ||
      event.button !== 0
    ) {
      return;
    }

    const thumb = event.currentTarget as HTMLElement;
    const visibleWidth = this.resolveTrackMeasureWidth();
    if (visibleWidth <= 0) return;

    if (visibleWidth > 0) {
      this.applyFrozenTrackWidthPx(visibleWidth);
    }

    this.dragPointerId = event.pointerId;
    this.dragStartX = event.clientX;
    const thumbWidth = thumb.offsetWidth;
    const buttonStrokeWidth = this.getButtonStrokeWidthPx();
    const dragSpace = Math.max(
      0,
      visibleWidth - thumbWidth - buttonStrokeWidth
    );
    this.dragMaxX = dragSpace;
    this.dragDetachX = Math.max(
      0,
      GROW_WIDTH_RATIO * visibleWidth - thumbWidth
    );
    this.dragCurrentX = 0;
    this.dragMoved = false;
    this.swipeArmed = false;
    this.dragPhase = DragPhase.idle;
    this.setThumbDragEdgeReady(false);

    try {
      thumb.setPointerCapture(event.pointerId);
    } catch (error) {
      void error;
    }
  }

  private handleThumbPointerMove(event: PointerEvent) {
    if (
      this.dragPointerId === undefined ||
      event.pointerId !== this.dragPointerId
    ) {
      return;
    }

    const pointerTravelPx = Math.round(
      Math.max(0, event.clientX - this.dragStartX)
    );

    if (
      this.dragPhase !== DragPhase.dragging &&
      pointerTravelPx > THUMB_DRAG_MOVE_THRESHOLD_PX
    ) {
      this.dragPhase = DragPhase.dragging;
      this.dragStartX = event.clientX;
      this.dragCurrentX = 0;
      this.setDragCssX(0);
      this.swipeArmed = false;
      this.setThumbDragEdgeReady(false);
      return;
    }

    if (this.dragPhase !== DragPhase.dragging) {
      return;
    }

    this.dragCurrentX = Math.round(
      Math.min(this.dragMaxX, Math.max(0, event.clientX - this.dragStartX))
    );
    this.setDragCssX(this.dragCurrentX);
    if (this.dragCurrentX > THUMB_DRAG_MOVE_THRESHOLD_PX) {
      this.dragMoved = true;
    }

    if (
      !this.swipeArmed &&
      this.dragCurrentX >= this.dragDetachX + SWIPE_ARMED_HYSTERESIS_PX
    ) {
      this.swipeArmed = true;
    } else if (
      this.swipeArmed &&
      this.dragCurrentX < this.dragDetachX - SWIPE_ARMED_HYSTERESIS_PX
    ) {
      this.swipeArmed = false;
    }

    this.setThumbDragEdgeReady(this.dragCurrentX >= this.getDragEdgeCommitX());
  }

  private handleThumbPointerUp(event: PointerEvent) {
    if (
      this.dragPointerId === undefined ||
      event.pointerId !== this.dragPointerId
    ) {
      return;
    }

    const thumb = event.currentTarget as HTMLElement;
    const didDrag = this.dragMoved;
    const dragX = this.dragCurrentX;
    this.releaseDragCapture(thumb);

    this.dragPointerId = undefined;

    if (this.dragPhase !== DragPhase.dragging) {
      this.resetDragMetrics();
      return;
    }

    if (dragX >= this.getDragEdgeCommitX()) {
      this.commitSwipeDragOnRelease();
    } else {
      this.springBackSwipeDrag();
    }

    if (didDrag) {
      this.suppressNextClick = true;
      event.preventDefault();
    }
  }

  private handleThumbPointerCancel(event: PointerEvent) {
    if (
      this.dragPointerId === undefined ||
      event.pointerId !== this.dragPointerId
    ) {
      return;
    }

    const thumb = event.currentTarget as HTMLElement;
    this.releaseDragCapture(thumb);
    this.dragPointerId = undefined;

    if (this.dragPhase !== DragPhase.dragging) {
      this.resetDragMetrics();
      return;
    }

    this.springBackSwipeDrag();
    this.suppressNextClick = true;
  }

  override willUpdate(changedProperties: PropertyValues<this>) {
    if (changedProperties.has('interactionState' as keyof ObcTwoStepAction)) {
      const previousState = changedProperties.get(
        'interactionState' as keyof ObcTwoStepAction
      ) as ObcTwoStepActionState | undefined;

      if (
        previousState === ObcTwoStepActionState.armed &&
        this.interactionState === ObcTwoStepActionState.enabled
      ) {
        this.triggerDisarmSlide();
      }
    }
  }

  private syncLoadingToActive(changedProperties: PropertyValues<this>) {
    if (
      changedProperties.has('loading') &&
      changedProperties.get('loading') === true &&
      !this.loading &&
      this.interactionState === ObcTwoStepActionState.processing &&
      !this.cancelReturning
    ) {
      this.transitionState(ObcTwoStepActionState.active);
    }
  }

  private syncArmedResetSchedule(changedProperties: PropertyValues<this>) {
    if (
      changedProperties.has('interactionState' as keyof ObcTwoStepAction) ||
      changedProperties.has('disabled') ||
      changedProperties.has('confirmTimeout')
    ) {
      this.scheduleArmedReset();
    }
  }

  private syncArmedTransientFlags() {
    if (this.interactionState !== ObcTwoStepActionState.armed) {
      if (
        this.dragPhase !== DragPhase.dragging &&
        this.dragPhase !== DragPhase.committing
      ) {
        this.swipeArmed = false;
      }
      this.armedHint = false;
      this.clearManagedTimer(TimerKey.armedHint);

      if (this.slideDirection === SlideDirection.arming) {
        this.slideDirection = SlideDirection.none;
      }
      this.clearManagedTimer(TimerKey.armedSlide);
    }
  }

  private syncDisarmFlag() {
    if (this.interactionState !== ObcTwoStepActionState.enabled) {
      if (this.slideDirection === SlideDirection.disarming) {
        this.slideDirection = SlideDirection.none;
      }
      this.clearManagedTimer(TimerKey.disarmSlide);
    }
  }

  private syncCancelReturningCleanup() {
    if (
      this.interactionState !== ObcTwoStepActionState.processing &&
      this.cancelReturning
    ) {
      this.clearCancelReturnSettleTimer();
      this.cancelReturning = false;
    }
  }

  private syncCancelHandoff(changedProperties: PropertyValues<this>) {
    if (
      changedProperties.has('interactionState' as keyof ObcTwoStepAction) &&
      this.cancelHandoff &&
      this.interactionState === ObcTwoStepActionState.enabled
    ) {
      this.scheduleCancelHandoffClear();
    }

    if (
      this.interactionState !== ObcTwoStepActionState.enabled &&
      this.cancelHandoff
    ) {
      this.cancelHandoff = false;
    }
  }

  private syncActiveResetSchedule(changedProperties: PropertyValues<this>) {
    if (
      changedProperties.has('interactionState' as keyof ObcTwoStepAction) ||
      changedProperties.has('disabled')
    ) {
      this.scheduleActiveReset();
    }
  }

  private syncResizeObserverOnWidthChange(
    changedProperties: PropertyValues<this>
  ) {
    if (changedProperties.has('width')) {
      this.disconnectTrackResizeObserver();
      this.connectTrackResizeObserver();
    }
  }

  private syncTrackWidthMeasure(changedProperties: PropertyValues<this>) {
    const interactionStateChanged = changedProperties.has(
      'interactionState' as keyof ObcTwoStepAction
    );
    const shouldRemeasureOnInteractionState =
      interactionStateChanged &&
      (this.isHugWidth ||
        this.interactionState === ObcTwoStepActionState.enabled ||
        this.interactionState === ObcTwoStepActionState.armed);

    if (
      this.dragPhase !== DragPhase.dragging &&
      (changedProperties.has('width') ||
        changedProperties.has('label') ||
        changedProperties.has('processingLabel') ||
        changedProperties.has('successLabel') ||
        changedProperties.has('variant') ||
        shouldRemeasureOnInteractionState ||
        changedProperties.has('disabled'))
    ) {
      this.scheduleTrackWidthMeasure();
    }
  }

  override updated(changedProperties: PropertyValues<this>) {
    this.syncLoadingToActive(changedProperties);
    this.syncArmedResetSchedule(changedProperties);
    this.syncArmedTransientFlags();
    this.syncDisarmFlag();
    this.syncCancelReturningCleanup();
    this.syncCancelHandoff(changedProperties);
    this.syncActiveResetSchedule(changedProperties);
    this.syncResizeObserverOnWidthChange(changedProperties);
    this.syncTrackWidthMeasure(changedProperties);
  }

  override firstUpdated(changedProperties: PropertyValues<this>) {
    super.firstUpdated(changedProperties);
    this.renderRoot
      .querySelectorAll('slot')
      .forEach((slot) =>
        slot.addEventListener('slotchange', this.handleSlotChange)
      );
    this.connectTrackResizeObserver();
    this.measureAndApplyTrackWidth();
  }

  private renderWidthGuarantor(
    actionLabel: string,
    processingLabel: string,
    successLabel: string
  ) {
    return html`
      <div class="width-guarantor" part="width-guarantor" aria-hidden="true">
        <div class="width-guarantor-surface">
          <div class="width-guarantor-line width-guarantor-line--segments">
            <span class="width-guarantor-thumb-preview"></span>
            <span class="width-guarantor-thumb"></span>
            <span class="width-guarantor-state-area">
              <span class="width-guarantor-label-stack">
                <span class="width-guarantor-label width-guarantor-label--body"
                  >${actionLabel}</span
                >
                <span
                  class="width-guarantor-label width-guarantor-label--button"
                  >${processingLabel}</span
                >
                <span
                  class="width-guarantor-label width-guarantor-label--button"
                  >${successLabel}</span
                >
              </span>
            </span>
          </div>
          <div class="width-guarantor-line width-guarantor-line--processing">
            <span class="width-guarantor-spinner"></span>
            <span class="width-guarantor-label width-guarantor-label--button"
              >${processingLabel}</span
            >
          </div>
          <div class="width-guarantor-line width-guarantor-line--success">
            <span
              class="width-guarantor-label width-guarantor-label--button width-guarantor-label--success"
              >${successLabel}</span
            >
            <span class="width-guarantor-check"></span>
          </div>
        </div>
      </div>
    `;
  }

  override render() {
    const isEnabled = this.interactionState === ObcTwoStepActionState.enabled;
    const isArmed = this.interactionState === ObcTwoStepActionState.armed;
    const isProcessing =
      this.interactionState === ObcTwoStepActionState.processing;
    const isActive = this.interactionState === ObcTwoStepActionState.active;
    const actionLabel = this.getActionLabelText();
    const processingLabel = this.getProcessingLabelText(actionLabel);
    const successLabel = this.getSuccessLabelText(actionLabel);
    const buttonAriaLabel = this.resolveAriaLabel();
    const cancelAriaLabel = this.resolveCancelAriaLabel();
    const showCancel = isProcessing && this.isCancellableVariant;

    return html`
      <div class="control-root" part="control-root">
        ${this.isHugWidth
          ? this.renderWidthGuarantor(
              actionLabel,
              processingLabel,
              successLabel
            )
          : null}
        <obc-button
          class=${classMap(
            this.buildWrapperClassInfo(
              isEnabled,
              isArmed,
              isProcessing,
              isActive
            )
          )}
          variant="flat"
          ?fullWidth=${!this.isHugWidth}
          ?disabled=${this.disabled}
          @click=${this.handleClick}
          part="wrapper"
          aria-label=${ifDefined(buttonAriaLabel)}
          aria-busy=${isProcessing ? 'true' : 'false'}
          aria-pressed=${isActive ? 'true' : 'false'}
        >
          <div class="visible-wrapper" part="visible-wrapper">
            <div class="active-layer" part="active-layer"></div>
            <div
              class="segments-track"
              part="segments-track"
              @transitionend=${this.handleDragTransitionEnd}
            >
              <div
                class="thumb-preview"
                part="thumb-preview"
                data-role="preview"
              >
                <div class="thumb-visible" part="thumb-preview-visible">
                  <obi-chevron-double-right-google
                    class="icon"
                  ></obi-chevron-double-right-google>
                </div>
              </div>

              <div
                class="thumb-container"
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
            </div>

            <span class="processing-label" part="processing-label">
              <obc-sequence-loading-spinner
                class="processing-spinner"
                part="processing-spinner"
                aria-hidden="true"
                .type=${SequenceLoadingSpinnerType.button}
                .progression=${SequenceLoadingSpinnerProgressionType.scanning}
              ></obc-sequence-loading-spinner>
              <span class="processing-label-text" part="processing-label-text"
                >${processingLabel}</span
              >
            </span>

            <span class="active-label" part="active-label">
              <obi-check-google
                class="icon"
                part="active-icon"
                aria-hidden="true"
              ></obi-check-google>
              <span class="active-label-text" part="active-label-text"
                >${successLabel}</span
              >
            </span>
          </div>
        </obc-button>
        ${showCancel
          ? html`
              <obc-button
                class=${classMap({
                  'cancel-button': true,
                  'cancel-returning': this.cancelReturning,
                })}
                variant="normal"
                ?disabled=${this.disabled || this.cancelReturning}
                data-role="cancel"
                part="cancel-button"
                aria-label=${cancelAriaLabel}
                @click=${this.handleCancelClick}
                @transitionend=${this.handleCancelReturnTransitionEnd}
              >
                <span
                  class="cancel-icon-layer cancel-icon-layer--close"
                  aria-hidden="true"
                >
                  <obi-close-google class="icon"></obi-close-google>
                </span>
                <span
                  class="cancel-icon-layer cancel-icon-layer--chevron"
                  aria-hidden="true"
                >
                  <obi-chevron-right-google
                    class="icon"
                  ></obi-chevron-right-google>
                </span>
              </obc-button>
            `
          : null}
        <span class="status-announcer" aria-live="polite" aria-atomic="true">
          ${this.statusAnnouncement}
        </span>
        <div class="slot-targets" hidden aria-hidden="true">
          <slot name="action"></slot>
          <slot name="processing-label"></slot>
          <slot name="success-label"></slot>
        </div>
      </div>
    `;
  }

  override disconnectedCallback() {
    this.renderRoot
      .querySelectorAll('slot')
      .forEach((slot) =>
        slot.removeEventListener('slotchange', this.handleSlotChange)
      );
    super.disconnectedCallback();
    this.dragPhase = DragPhase.idle;
    this.setThumbDragEdgeReady(false);
    this.cancelReturning = false;
    this.cancelHandoff = false;
    this.clearCancelReturnSettleTimer();
    this.resetDragMetrics();
    this.disconnectTrackResizeObserver();
    this.clearManagedTimer(TimerKey.labelBounce);
    this.clearManagedTimer(TimerKey.armedReset);
    this.clearManagedTimer(TimerKey.armedHint);
    this.clearManagedTimer(TimerKey.armedSlide);
    this.clearManagedTimer(TimerKey.disarmSlide);
    this.clearManagedTimer(TimerKey.activeReset);
    this.clearManagedTimer(TimerKey.thumbDragSettle);
    this.clearManagedTimer(TimerKey.cancelReturnSettle);
  }

  static override styles = unsafeCSS(componentStyle);
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-two-step-action': ObcTwoStepAction;
  }
}
