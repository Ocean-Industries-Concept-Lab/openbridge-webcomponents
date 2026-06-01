import {LitElement, html, unsafeCSS, type PropertyValues} from 'lit';
import {ifDefined} from 'lit/directives/if-defined.js';
import {property, state} from 'lit/decorators.js';
import {classMap, type ClassInfo} from 'lit/directives/class-map.js';
import componentStyle from './two-step-switch.css?inline';
import {
  CONFIRM_HINT_MS,
  CONFIRM_TIMEOUT_MS,
  DEFAULT_CANCEL_ARIA_LABEL,
  DRAG_SPRING_BACK_MS,
  DRAG_START_THRESHOLD_PX,
  EDGE_COMMIT_RATIO,
  SWITCH_DUR_BOUNCE_CSS_VAR,
  SWITCH_DUR_BOUNCE_MS_DEFAULT,
  SWITCH_DUR_NUDGE_CSS_VAR,
  SWITCH_DUR_NUDGE_MS_DEFAULT,
  SWITCH_DUR_SLIDE_CSS_VAR,
  SWITCH_DUR_SLIDE_MS_DEFAULT,
  parseSwitchDurationMs,
} from './two-step-switch.constants.js';
import {customElement} from '../../decorator.js';
import '../button/button.js';
import '../../icons/icon-chevron-double-right-google.js';
import '../../icons/icon-check-google.js';
import '../../icons/icon-close-google.js';
import {
  SequenceLoadingSpinnerProgressionType,
  SequenceLoadingSpinnerType,
} from '../sequence-loading-spinner/sequence-loading-spinner.js';
import '../sequence-loading-spinner/sequence-loading-spinner.js';

export enum ObcTwoStepSwitchCommittedState {
  Idle = 'idle',
  Active = 'active',
}

export enum ObcTwoStepSwitchInteractionStep {
  Idle = 'idle',
  Confirm = 'confirm',
  Processing = 'processing',
  Active = 'active',
}

enum Phase {
  None = 'none',
  Nudge = 'nudge',
  ConfirmEnter = 'confirm-enter',
  ConfirmExitBackward = 'confirm-exit-backward',
  ConfirmBounce = 'confirm-bounce',
  Processing = 'processing',
  ActiveExpand = 'active-expand',
  ActiveShrinkPull = 'active-shrink-pull',
  Drag = 'drag',
  DragSpringBack = 'drag-spring-back',
}

export enum FlowDirection {
  Forward = 'forward',
  Backward = 'backward',
}

export enum ObcTwoStepSwitchVariant {
  standard = 'standard',
  cancellable = 'cancellable',
}

export enum ObcTwoStepSwitchWidth {
  fluid = 'fluid',
  hug = 'hug',
}

export type ObcTwoStepSwitchStateChangeEventDetail = {
  state: ObcTwoStepSwitchCommittedState;
  previousState: ObcTwoStepSwitchCommittedState;
  stateLabel: string;
  actionLabel: string;
  flowDirection: FlowDirection;
};

export type ObcTwoStepSwitchStateChangeEvent =
  CustomEvent<ObcTwoStepSwitchStateChangeEventDetail>;

export type ObcTwoStepSwitchConfirmEventDetail = {
  committed: ObcTwoStepSwitchCommittedState;
  flowDirection: FlowDirection;
};

export type ObcTwoStepSwitchConfirmOpenEvent =
  CustomEvent<ObcTwoStepSwitchConfirmEventDetail>;

export type ObcTwoStepSwitchConfirmCloseEvent =
  CustomEvent<ObcTwoStepSwitchConfirmEventDetail>;

export type ObcTwoStepSwitchConfirmTimeoutEvent =
  CustomEvent<ObcTwoStepSwitchConfirmEventDetail>;

export type ObcTwoStepSwitchConfirmClickEvent =
  CustomEvent<ObcTwoStepSwitchConfirmEventDetail>;

export type ObcTwoStepSwitchCancelClickEvent =
  CustomEvent<ObcTwoStepSwitchConfirmEventDetail>;

type PendingTransition = {
  committed: ObcTwoStepSwitchCommittedState;
  step: ObcTwoStepSwitchInteractionStep;
  flowDirection: FlowDirection;
  stepDuringTransition: ObcTwoStepSwitchInteractionStep;
  showEndpointSuccess: boolean;
  isTimeoutReturn: boolean;
  isBackwardReleaseCommit: boolean;
};

type ConfirmHint = {
  pulse: 0 | 1;
};

enum TimerName {
  Confirm = 'confirm',
  ProcessingStep = 'processingStep',
  Phase = 'phase',
  ConfirmHint = 'confirmHint',
  Fallback = 'fallback',
}

class TimerSet {
  private ids = new Map<TimerName, number>();

  set(name: TimerName, callback: () => void, durationMs: number): void {
    this.clear(name);
    const id = window.setTimeout(() => {
      this.ids.delete(name);
      callback();
    }, durationMs);
    this.ids.set(name, id);
  }

  clear(name: TimerName): void {
    const id = this.ids.get(name);
    if (id !== undefined) {
      window.clearTimeout(id);
      this.ids.delete(name);
    }
  }

  clearAll(): void {
    for (const id of this.ids.values()) {
      window.clearTimeout(id);
    }
    this.ids.clear();
  }
}

/**
 * `<obc-two-step-switch>` – A two-step confirm switch for guarded activation (confirm switch).
 *
 * Uses a two-stage interaction (arm/confirm, then commit) to reduce accidental toggles. Supports
 * both click and drag input, and provides an explicit follow-up action in the active state.
 *
 * ## Features
 * - **Two-step activation**: Arms first, then commits to the active state.
 * - **Active follow-up**: In active, a secondary action can be invoked via a release/confirm flow.
 * - **Cancellable processing**: With `variant="cancellable"`, an X button is shown during the
 *   processing step. Clicking it dispatches `cancel-click` and reverts to the previous state.
 * - **Copy via properties or slots**: Plain text via label properties or equivalent named slots.
 *   Slot content overrides the matching property. Slots supply **plain text only** (assigned nodes
 *   are read via `textContent`); markup is not projected into the visible control.
 * - **Read-only state**: Use getters `committedState`, `interactionStep`, `isInConfirmStep`, and
 *   `isTransitionPending` to observe internal state. The component does not support a controlled
 *   committed value from outside.
 * - **Flow direction**: `flowDirection` is updated by the component and reflected on the host for
 *   styling hooks; do not set it manually to drive behavior.
 * - **Accessible naming**: `ariaLabel` names the group when set; otherwise derived from labels.
 *   The confirm control uses the confirm label, or the current primary action label as fallback.
 *
 * ## Slots
 *
 * | Slot Name | Purpose |
 * |-----------|---------|
 * | `idle-action` | Primary action label in forward idle/confirm. |
 * | `active-action` | Primary action in backward confirm; secondary action in active. |
 * | `idle-state` | State label when idle; fill text in backward transitions. |
 * | `active-state` | State label when active; fill text in forward transitions. |
 * | `confirm` | Confirm step label. |
 * | `processing` | Processing row text. |
 *
 * Assign slot content as direct children of `<obc-two-step-switch>`. Only text is shown in the UI.
 *
 * ## CSS customization (`:host`)
 *
 * | Token | Role |
 * |-------|------|
 * | `--switch-dur-slide` | Slide transition duration (read by JS for motion sync). |
 * | `--switch-dur-bounce` | Confirm bounce duration (read by JS). |
 * | `--switch-dur-nudge` | Nudge animation duration (read by JS). |
 * | `--switch-dur-quick` | Short opacity/transform transitions. |
 * | `--switch-dur-fade` | Fade transitions. |
 * | `--switch-ease-emphasized` | Primary easing curve. |
 * | `--switch-ease-snap` | Snap easing curve. |
 * | `--obc-two-step-switch-drag-x` | Internal drag offset (set by the component while dragging). |
 * | `--obc-two-step-switch-track-width` | Internal track width used by fixed switch geometry. |
 *
 * ## Usage Guidelines
 * Use this control when a state change needs deliberate confirmation and the active state should
 * offer an explicit follow-up action (for example, a release/return flow). If you only need a
 * guarded activation without a follow-up action, use `<obc-two-step-action>`.
 *
 * For `variant="cancellable"`, the processing step behaves identically to the standard variant but
 * additionally shows an X button. Clicking it dispatches `cancel-click` and reverts to the previous state.
 *
 * ## Events
 * - `state-change`: Committed state changed (idle ↔ active).
 * - `confirm-open`: Entered the confirm step (after the confirm slide-in).
 * - `confirm-close`: Confirm step ended (cancel, timeout, or proceed to commit).
 * - `confirm-timeout`: Confirm step timed out.
 * - `confirm-click`: User confirmed and the switch entered `processing`.
 * - `cancel-click`: User cancelled during `processing` (`variant="cancellable"` only).
 *
 * @slot idle-action - Primary action label in forward idle and confirm steps.
 * @slot active-action - Primary action in backward confirm; secondary action button in active.
 * @slot idle-state - State label when committed idle; fill label in backward transition phases.
 * @slot active-state - State label when committed active; fill label in forward transition phases.
 * @slot confirm - Label on the confirm control during the confirm step.
 * @slot processing - Label shown during the processing phase.
 * @fires state-change {ObcTwoStepSwitchStateChangeEvent} When the committed state changes (idle ↔ active).
 * @fires confirm-open {ObcTwoStepSwitchConfirmOpenEvent} When the confirm step opens.
 * @fires confirm-close {ObcTwoStepSwitchConfirmCloseEvent} When the confirm step closes.
 * @fires confirm-timeout {ObcTwoStepSwitchConfirmTimeoutEvent} When the confirm step times out.
 * @fires confirm-click {ObcTwoStepSwitchConfirmClickEvent} When the user confirms and the switch enters `processing`.
 * @fires cancel-click {ObcTwoStepSwitchCancelClickEvent} When the user cancels during `processing` (`variant="cancellable"` only).
 */
@customElement('obc-two-step-switch')
export class ObcTwoStepSwitch extends LitElement {
  @property({type: Boolean, reflect: true}) disabled = false;

  @property({type: String, attribute: 'idle-action-label'}) idleActionLabel =
    '';
  @property({type: String, attribute: 'idle-state-label'}) idleStateLabel = '';
  @property({type: String, attribute: 'active-action-label'})
  activeActionLabel = '';
  @property({type: String, attribute: 'active-state-label'}) activeStateLabel =
    '';

  @property({type: String, attribute: 'confirm-label'}) confirmLabel = '';
  @property({type: String, attribute: 'processing-label'})
  processingLabel = '';

  @property({type: String, reflect: true})
  variant: ObcTwoStepSwitchVariant = ObcTwoStepSwitchVariant.standard;

  @property({type: String, reflect: true})
  width: ObcTwoStepSwitchWidth = ObcTwoStepSwitchWidth.fluid;

  @property({type: String, attribute: 'cancel-aria-label', reflect: false})
  cancelAriaLabel = '';

  @property({type: String, attribute: 'aria-label'})
  override ariaLabel = '';

  @property({type: Number, attribute: 'processing-duration'})
  processingDuration = 3000;

  @state() private committed: ObcTwoStepSwitchCommittedState =
    ObcTwoStepSwitchCommittedState.Idle;
  @state() private step: ObcTwoStepSwitchInteractionStep =
    ObcTwoStepSwitchInteractionStep.Idle;
  @state() private _flowDirection: FlowDirection = FlowDirection.Forward;
  @state() private phase: Phase = Phase.None;
  @state() private pendingTransition: PendingTransition | null = null;
  @state() private confirmHint: ConfirmHint | null = null;
  @state() private dragAtEdge = false;

  get flowDirection(): FlowDirection {
    return this._flowDirection;
  }
  get committedState(): ObcTwoStepSwitchCommittedState {
    return this.committed;
  }
  get interactionStep(): ObcTwoStepSwitchInteractionStep {
    return this.step;
  }
  get isInConfirmStep(): boolean {
    return this.step === ObcTwoStepSwitchInteractionStep.Confirm;
  }
  get isTransitionPending(): boolean {
    return this.transitionPending;
  }
  private get transitionPending(): boolean {
    return this.pendingTransition !== null;
  }

  private readonly timers = new TimerSet();
  private phaseGeneration = 0;

  private dragPointerId?: number;
  private dragRole?: 'primary' | 'secondary-action';
  private dragStartX = 0;
  private dragMoved = false;
  private dragReachedEnd = false;
  private dragMaxX = 0;
  private dragPendingX?: number;
  private dragRafId?: number;
  private dragFrozenTrackWidthPx?: number;

  private suppressNextPrimaryClick = false;
  private suppressNextSecondaryActionClick = false;

  private confirmHintQueued = false;

  private trackResizeObserver?: ResizeObserver;
  private motionDurationsMs = {
    slide: SWITCH_DUR_SLIDE_MS_DEFAULT,
    bounce: SWITCH_DUR_BOUNCE_MS_DEFAULT,
    nudge: SWITCH_DUR_NUDGE_MS_DEFAULT,
  };
  private cancelMotionAwait?: () => void;

  private readonly handleSlotChange = () => {
    this.requestUpdate();
    this.scheduleTrackWidthMeasure();
  };

  private dispatchConfirmPhaseEvent(
    eventName: 'confirm-open' | 'confirm-close' | 'confirm-timeout'
  ) {
    const detail: ObcTwoStepSwitchConfirmEventDetail = {
      committed: this.committed,
      flowDirection: this.flowDirection,
    };
    this.dispatchEvent(
      new CustomEvent<ObcTwoStepSwitchConfirmEventDetail>(eventName, {
        detail,
        bubbles: true,
        composed: true,
      })
    );
  }

  private dispatchProcessingActionEvent(
    eventName: 'confirm-click' | 'cancel-click'
  ) {
    const detail: ObcTwoStepSwitchConfirmEventDetail = {
      committed: this.committed,
      flowDirection: this.flowDirection,
    };
    this.dispatchEvent(
      new CustomEvent<ObcTwoStepSwitchConfirmEventDetail>(eventName, {
        detail,
        bubbles: true,
        composed: true,
      })
    );
  }

  private get isCancellableVariant() {
    return this.variant === ObcTwoStepSwitchVariant.cancellable;
  }

  private get isHugWidth() {
    return this.width === ObcTwoStepSwitchWidth.hug;
  }

  private queryWidthGuarantorSurface(): HTMLElement | null {
    const surface = this.renderRoot.querySelector('.width-guarantor-surface');
    return surface instanceof HTMLElement ? surface : null;
  }

  private queryTrack(): HTMLElement | null {
    const track = this.renderRoot.querySelector('.track');
    return track instanceof HTMLElement ? track : null;
  }

  private queryControlRoot(): HTMLElement | null {
    const root = this.renderRoot.querySelector('.obc-two-step-switch');
    return root instanceof HTMLElement ? root : null;
  }

  private resolveHugTrackMeasureWidth(): number {
    const guarantorWidth = this.queryWidthGuarantorSurface()?.offsetWidth ?? 0;
    if (guarantorWidth > 0) {
      return guarantorWidth;
    }

    const trackWidth = this.queryTrack()?.offsetWidth ?? 0;
    if (trackWidth > 0) {
      return trackWidth;
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

    const controlRoot = this.queryControlRoot();
    if (controlRoot && controlRoot.clientWidth > 0) {
      return controlRoot.clientWidth;
    }

    if (this.clientWidth > 0) {
      return this.clientWidth;
    }

    const track = this.queryTrack();
    if (track && track.clientWidth > 0) {
      return track.clientWidth;
    }

    return 0;
  }

  private setTrackWidthPx(px: number) {
    this.style.setProperty('--obc-two-step-switch-track-width', `${px}px`);
  }

  private applyFrozenTrackWidthPx(trackWidth: number) {
    this.dragFrozenTrackWidthPx = trackWidth;

    const currentRaw = getComputedStyle(this)
      .getPropertyValue('--obc-two-step-switch-track-width')
      .trim();
    const current = Number.parseFloat(currentRaw);

    if (!Number.isFinite(current) || Math.abs(current - trackWidth) > 1) {
      this.setTrackWidthPx(trackWidth);
    }
  }

  private measureAndApplyTrackWidth() {
    if (this.phase === Phase.Drag) {
      return;
    }

    const width = this.resolveTrackMeasureWidth();
    if (width > 0) {
      this.setTrackWidthPx(width);
    }
  }

  private scheduleTrackWidthMeasure() {
    if (this.phase === Phase.Drag) return;

    window.requestAnimationFrame(() => {
      if (this.phase !== Phase.Drag) {
        this.measureAndApplyTrackWidth();
      }
    });
  }

  private connectTrackResizeObserver() {
    const target = this.queryControlRoot();
    if (!target) return;

    this.trackResizeObserver?.disconnect();
    this.trackResizeObserver = new ResizeObserver(() => {
      if (this.phase === Phase.Drag) return;
      this.measureAndApplyTrackWidth();
    });
    this.trackResizeObserver.observe(target);
  }

  private disconnectTrackResizeObserver() {
    this.trackResizeObserver?.disconnect();
    this.trackResizeObserver = undefined;
  }

  private resolveCancelAriaLabel() {
    const explicit = this.cancelAriaLabel.trim();
    if (explicit) return explicit;
    return DEFAULT_CANCEL_ARIA_LABEL;
  }

  private clearAllTimers() {
    this.timers.clearAll();
    this.cancelMotionAwait?.();
    this.cancelMotionAwait = undefined;
    this.cancelDragRaf();
  }

  private awaitMotion(expectedDurationMs: number): Promise<void> {
    this.cancelMotionAwait?.();
    return new Promise<void>((resolve) => {
      const track = this.renderRoot.querySelector('.track');
      let done = false;
      const settle = () => {
        if (done) return;
        done = true;
        track?.removeEventListener('transitionend', onEnd);
        this.timers.clear(TimerName.Fallback);
        this.cancelMotionAwait = undefined;
        resolve();
      };
      const onEnd = (e: Event) => {
        const p = (e as TransitionEvent).propertyName;
        if (p === 'transform' || p === 'clip-path') settle();
      };
      track?.addEventListener('transitionend', onEnd);
      const FALLBACK_SLACK_MS = 80;
      this.timers.set(
        TimerName.Fallback,
        settle,
        expectedDurationMs + FALLBACK_SLACK_MS
      );
      this.cancelMotionAwait = settle;
    });
  }

  private awaitProcessingStep(): Promise<void> {
    this.timers.clear(TimerName.ProcessingStep);
    return new Promise<void>((resolve) => {
      this.timers.set(
        TimerName.ProcessingStep,
        () => resolve(),
        this.processingDuration
      );
    });
  }

  private setPhase(next: Phase, durationMs?: number, onDone?: () => void) {
    const generation = ++this.phaseGeneration;
    this.phase = next;
    this.timers.clear(TimerName.Phase);
    if (durationMs && durationMs > 0) {
      this.timers.set(
        TimerName.Phase,
        () => {
          if (generation !== this.phaseGeneration) {
            return;
          }
          onDone?.();
        },
        durationMs
      );
    }
  }

  private applyQueuedConfirmHint() {
    if (!this.confirmHintQueued) return;
    if (
      this.disabled ||
      this.step !== ObcTwoStepSwitchInteractionStep.Confirm ||
      this.transitionPending
    )
      return;
    this.confirmHintQueued = false;
    this.activateConfirmHint();
  }

  private startConfirmTimeout() {
    this.timers.clear(TimerName.Confirm);
    if (this.disabled || this.step !== ObcTwoStepSwitchInteractionStep.Confirm)
      return;
    this.timers.set(
      TimerName.Confirm,
      () => this.handleConfirmTimeout(),
      CONFIRM_TIMEOUT_MS
    );
  }

  private async enterConfirm() {
    if (this.disabled) return;
    if (this.step === ObcTwoStepSwitchInteractionStep.Confirm) {
      this.startConfirmTimeout();
      return;
    }
    const gen = ++this.phaseGeneration;
    this.step = ObcTwoStepSwitchInteractionStep.Confirm;

    this.phase = Phase.ConfirmEnter;
    await this.awaitMotion(this.motionDurationsMs.slide);
    if (gen !== this.phaseGeneration) return;

    this.dispatchConfirmPhaseEvent('confirm-open');
    this.startConfirmTimeout();
    this.applyQueuedConfirmHint();

    this.setPhase(Phase.ConfirmBounce, this.motionDurationsMs.bounce, () => {
      this.setPhase(Phase.None);
    });
  }

  private async exitConfirmTo(stepTarget: ObcTwoStepSwitchInteractionStep) {
    if (this.step !== ObcTwoStepSwitchInteractionStep.Confirm) return;
    this.timers.clear(TimerName.Confirm);
    const gen = ++this.phaseGeneration;
    if (
      this.committed === ObcTwoStepSwitchCommittedState.Active &&
      this.flowDirection === FlowDirection.Backward &&
      stepTarget === ObcTwoStepSwitchInteractionStep.Active
    ) {
      this.phase = Phase.ConfirmExitBackward;
    } else {
      this.phase = Phase.None;
    }
    this.step = stepTarget;
    await this.awaitMotion(this.motionDurationsMs.slide);
    if (gen !== this.phaseGeneration) return;
    this.dispatchConfirmPhaseEvent('confirm-close');
    this.phase = Phase.None;
  }

  private async completeEndpointTransition(gen: number) {
    const stepDuringTransition = this.pendingTransition?.stepDuringTransition;
    if (!stepDuringTransition) return;

    this.step = stepDuringTransition;
    this.phase = Phase.ActiveExpand;
    await this.awaitMotion(this.motionDurationsMs.slide);
    if (gen !== this.phaseGeneration) return;

    this.phase = Phase.ActiveShrinkPull;
    await this.awaitMotion(this.motionDurationsMs.slide);
    if (gen !== this.phaseGeneration) return;

    const previousCommitted = this.committed;
    if (this.pendingTransition) {
      this.committed = this.pendingTransition.committed;
      this.step = this.pendingTransition.step;
      this._flowDirection = this.pendingTransition.flowDirection;
    }
    const nextCommittedState = this.committed;
    if (nextCommittedState !== previousCommitted) {
      const state = nextCommittedState;
      const previousState = previousCommitted;
      const detail = {
        state,
        previousState,
        stateLabel: this.resolveStateLabelFor(state),
        actionLabel: this.resolveActionLabelFor(state),
        flowDirection: this.flowDirection,
      };

      this.dispatchEvent(
        new CustomEvent<ObcTwoStepSwitchStateChangeEventDetail>(
          'state-change',
          {
            detail,
            bubbles: true,
            composed: true,
          }
        )
      );
    }
    this.pendingTransition = null;
    this.phase = Phase.None;
  }

  private async beginEndpointTransition(
    nextCommitted: ObcTwoStepSwitchCommittedState,
    nextStep: ObcTwoStepSwitchInteractionStep,
    nextFlowDirection: FlowDirection,
    stepDuringTransition: ObcTwoStepSwitchInteractionStep,
    options: {
      showProcessing?: boolean;
      showSuccess?: boolean;
      isTimeoutReturn?: boolean;
      isBackwardReleaseCommit?: boolean;
    } = {}
  ) {
    const {
      showProcessing = true,
      showSuccess = true,
      isTimeoutReturn = false,
      isBackwardReleaseCommit = false,
    } = options;
    const gen = ++this.phaseGeneration;
    this.pendingTransition = {
      committed: nextCommitted,
      step: nextStep,
      flowDirection: nextFlowDirection,
      stepDuringTransition,
      showEndpointSuccess: showSuccess,
      isTimeoutReturn,
      isBackwardReleaseCommit,
    };
    this.confirmHintQueued = false;

    if (showProcessing) {
      this.step = ObcTwoStepSwitchInteractionStep.Processing;
      this.phase = Phase.Processing;
      this.dispatchProcessingActionEvent('confirm-click');

      await this.awaitProcessingStep();
      if (gen !== this.phaseGeneration) return;
    }

    await this.completeEndpointTransition(gen);
  }

  private commitActiveFromConfirm() {
    this.timers.clear(TimerName.Confirm);
    this.confirmHintQueued = false;
    this.dispatchConfirmPhaseEvent('confirm-close');
    this.beginEndpointTransition(
      ObcTwoStepSwitchCommittedState.Active,
      ObcTwoStepSwitchInteractionStep.Active,
      FlowDirection.Backward,
      ObcTwoStepSwitchInteractionStep.Active
    );
  }

  private commitIdleFromConfirmBackward() {
    this.timers.clear(TimerName.Confirm);
    this.confirmHintQueued = false;
    this.dispatchConfirmPhaseEvent('confirm-close');
    this.beginEndpointTransition(
      ObcTwoStepSwitchCommittedState.Idle,
      ObcTwoStepSwitchInteractionStep.Idle,
      FlowDirection.Forward,
      ObcTwoStepSwitchInteractionStep.Active,
      {isBackwardReleaseCommit: true}
    );
  }

  private getRestingStepForCommitted() {
    return this.committed === ObcTwoStepSwitchCommittedState.Active
      ? ObcTwoStepSwitchInteractionStep.Active
      : ObcTwoStepSwitchInteractionStep.Idle;
  }

  private getRestingFlowDirectionForCommitted() {
    return this.committed === ObcTwoStepSwitchCommittedState.Active
      ? FlowDirection.Backward
      : FlowDirection.Forward;
  }

  private cancelEndpointTransition() {
    ++this.phaseGeneration;
    this.timers.clear(TimerName.Confirm);
    this.timers.clear(TimerName.ProcessingStep);
    this.timers.clear(TimerName.Phase);
    this.timers.clear(TimerName.Fallback);
    this.cancelMotionAwait?.();
    this.cancelMotionAwait = undefined;

    this.pendingTransition = null;
    this.confirmHintQueued = false;
    this.confirmHint = null;
    this.step = this.getRestingStepForCommitted();
    this._flowDirection = this.getRestingFlowDirectionForCommitted();
    this.phase = Phase.None;
  }

  private suppressFillTransitionForCancelSnap() {
    const fill = this.renderRoot?.querySelector('.fill') as HTMLElement | null;
    if (!fill) return;
    fill.style.transition = 'none';
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        fill.style.transition = '';
      });
    });
  }

  private handleCancelClick(event: MouseEvent) {
    event.preventDefault();
    event.stopPropagation();
    if (
      this.disabled ||
      !this.isCancellableVariant ||
      this.step !== ObcTwoStepSwitchInteractionStep.Processing ||
      !this.transitionPending
    ) {
      return;
    }
    this.dispatchProcessingActionEvent('cancel-click');
    if (
      this.committed === ObcTwoStepSwitchCommittedState.Active &&
      this.flowDirection === FlowDirection.Backward
    ) {
      this.suppressNextSecondaryActionClick = true;
      this.suppressFillTransitionForCancelSnap();
    }
    this.cancelEndpointTransition();
  }

  private handleConfirmTimeout() {
    if (this.disabled || this.step !== ObcTwoStepSwitchInteractionStep.Confirm)
      return;
    this.confirmHintQueued = false;
    this.dispatchConfirmPhaseEvent('confirm-timeout');

    if (
      this.committed === ObcTwoStepSwitchCommittedState.Active &&
      this.flowDirection === FlowDirection.Backward
    ) {
      this._flowDirection = FlowDirection.Forward;
      this.dispatchConfirmPhaseEvent('confirm-close');
      this.beginEndpointTransition(
        ObcTwoStepSwitchCommittedState.Active,
        ObcTwoStepSwitchInteractionStep.Active,
        FlowDirection.Backward,
        ObcTwoStepSwitchInteractionStep.Active,
        {showProcessing: false, showSuccess: false, isTimeoutReturn: true}
      );
      return;
    }

    const target: ObcTwoStepSwitchInteractionStep =
      this.committed === ObcTwoStepSwitchCommittedState.Idle
        ? ObcTwoStepSwitchInteractionStep.Idle
        : ObcTwoStepSwitchInteractionStep.Active;
    this.exitConfirmTo(target);
  }

  private triggerConfirmHint() {
    if (this.disabled || this.step !== ObcTwoStepSwitchInteractionStep.Confirm)
      return;
    const nextPulse: 0 | 1 = this.confirmHint?.pulse === 0 ? 1 : 0;
    this.confirmHint = {pulse: nextPulse};
    this.timers.clear(TimerName.ConfirmHint);
    this.timers.set(
      TimerName.ConfirmHint,
      () => {
        this.confirmHint = null;
      },
      CONFIRM_HINT_MS
    );
  }

  private triggerNudge() {
    if (this.disabled) return;
    this.setPhase(Phase.Nudge, this.motionDurationsMs.nudge, () =>
      this.setPhase(Phase.None)
    );
  }

  private isSecondaryLabelNudgeInteractive() {
    if (this.disabled) return false;
    if (this.transitionPending) return false;
    return (
      this.committed === ObcTwoStepSwitchCommittedState.Idle &&
      this.step === ObcTwoStepSwitchInteractionStep.Idle &&
      this.flowDirection === FlowDirection.Forward
    );
  }

  onSecondaryLabelClick() {
    if (!this.isSecondaryLabelNudgeInteractive()) return;
    this.triggerNudge();
  }

  private handleSecondaryLabelKeyDown(event: KeyboardEvent) {
    if (!this.isSecondaryLabelNudgeInteractive()) return;
    if (event.key !== 'Enter' && event.key !== ' ') return;
    event.preventDefault();
    this.triggerNudge();
  }

  onPrimaryClick() {
    if (this.disabled) return;
    if (this.transitionPending) return;
    if (this.suppressNextPrimaryClick) {
      this.suppressNextPrimaryClick = false;
      return;
    }
    if (this.phase === Phase.Drag) return;

    if (
      this.committed === ObcTwoStepSwitchCommittedState.Idle &&
      this.step === ObcTwoStepSwitchInteractionStep.Idle &&
      this.flowDirection === FlowDirection.Forward
    ) {
      this.enterConfirm();
      return;
    }

    if (
      this.committed === ObcTwoStepSwitchCommittedState.Idle &&
      this.step === ObcTwoStepSwitchInteractionStep.Confirm &&
      this.flowDirection === FlowDirection.Forward
    ) {
      this.commitActiveFromConfirm();
      return;
    }

    if (
      this.committed === ObcTwoStepSwitchCommittedState.Active &&
      this.step === ObcTwoStepSwitchInteractionStep.Confirm &&
      this.flowDirection === FlowDirection.Backward
    ) {
      this.commitIdleFromConfirmBackward();
    }
  }

  onSecondaryActionClick() {
    if (this.disabled) return;
    if (this.transitionPending) return;
    if (this.suppressNextSecondaryActionClick) {
      this.suppressNextSecondaryActionClick = false;
      return;
    }
    if (
      this.committed === ObcTwoStepSwitchCommittedState.Active &&
      this.step === ObcTwoStepSwitchInteractionStep.Active &&
      this.flowDirection === FlowDirection.Backward
    ) {
      this.enterConfirm();
    }
  }

  private activateConfirmHint() {
    if (this.disabled) return;
    if (this.step !== ObcTwoStepSwitchInteractionStep.Confirm) return;
    if (this.transitionPending) return;
    this.startConfirmTimeout();
    this.triggerConfirmHint();
  }

  private exitConfirmToCommittedRestingStep() {
    this.confirmHintQueued = false;
    const target =
      this.committed === ObcTwoStepSwitchCommittedState.Idle
        ? ObcTwoStepSwitchInteractionStep.Idle
        : ObcTwoStepSwitchInteractionStep.Active;
    void this.exitConfirmTo(target);
  }

  onConfirmPointerDown(event: PointerEvent) {
    if (this.disabled) return;
    if (this.step !== ObcTwoStepSwitchInteractionStep.Confirm) return;
    if (event.button !== 0) return;
    event.preventDefault();
    event.stopPropagation();
  }

  onConfirmClick(event: MouseEvent) {
    event.preventDefault();
    event.stopPropagation();
    if (
      this.disabled ||
      this.step !== ObcTwoStepSwitchInteractionStep.Confirm ||
      this.transitionPending
    )
      return;
    this.exitConfirmToCommittedRestingStep();
  }

  private handleConfirmKeyDown(event: KeyboardEvent) {
    if (this.disabled) return;
    if (this.step !== ObcTwoStepSwitchInteractionStep.Confirm) return;
    if (event.key !== 'Enter' && event.key !== ' ') return;
    event.preventDefault();
    if (this.transitionPending) return;
    this.exitConfirmToCommittedRestingStep();
  }

  private setDragCssX(px: number) {
    this.style.setProperty('--obc-two-step-switch-drag-x', `${px}px`);
  }

  private cancelDragRaf() {
    if (this.dragRafId !== undefined) {
      cancelAnimationFrame(this.dragRafId);
      this.dragRafId = undefined;
    }
    this.dragPendingX = undefined;
  }

  private scheduleDragCssX(px: number) {
    this.dragPendingX = px;
    if (this.dragRafId !== undefined) {
      return;
    }
    this.dragRafId = requestAnimationFrame(() => {
      this.dragRafId = undefined;
      if (this.dragPendingX === undefined) {
        return;
      }
      this.setDragCssX(this.dragPendingX);
      this.dragPendingX = undefined;
    });
  }

  private resetDrag() {
    this.cancelDragRaf();
    this.dragPointerId = undefined;
    this.dragRole = undefined;
    this.dragStartX = 0;
    this.dragMoved = false;
    this.dragReachedEnd = false;
    this.dragAtEdge = false;
    this.dragMaxX = 0;
    this.dragFrozenTrackWidthPx = undefined;
    this.setDragCssX(0);
  }

  private setPointerCaptureSafe(target: HTMLElement, pointerId: number) {
    try {
      target.setPointerCapture(pointerId);
    } catch {
      // setPointerCapture can throw on detached elements; safe to ignore
    }
  }

  private releasePointerCaptureSafe(target: HTMLElement, pointerId: number) {
    try {
      if (target.hasPointerCapture(pointerId)) {
        target.releasePointerCapture(pointerId);
      }
    } catch {
      // releasePointerCapture can throw on detached elements; safe to ignore
    }
  }

  private completeSwipeDrag() {
    this.setPhase(Phase.None);
    this.resetDrag();
    if (
      this.committed === ObcTwoStepSwitchCommittedState.Idle &&
      this.flowDirection === FlowDirection.Forward
    ) {
      this.commitActiveFromConfirm();
    } else if (
      this.committed === ObcTwoStepSwitchCommittedState.Active &&
      this.flowDirection === FlowDirection.Backward
    ) {
      this.commitIdleFromConfirmBackward();
    }
  }

  private springBackDrag() {
    this.dragPointerId = undefined;
    this.dragRole = undefined;
    this.cancelDragRaf();
    this.setPhase(Phase.DragSpringBack, DRAG_SPRING_BACK_MS, () => {
      this.setPhase(Phase.None);
      this.resetDrag();
    });
    window.requestAnimationFrame(() => {
      this.setDragCssX(0);
    });
  }

  private shouldAllowDragForRole(role: 'primary' | 'secondary-action') {
    if (this.disabled) return false;
    if (this.transitionPending) return false;
    if (
      this.step !== ObcTwoStepSwitchInteractionStep.Idle &&
      this.step !== ObcTwoStepSwitchInteractionStep.Active
    )
      return false;

    if (role === 'primary') {
      return (
        this.committed === ObcTwoStepSwitchCommittedState.Idle &&
        this.step === ObcTwoStepSwitchInteractionStep.Idle &&
        this.flowDirection === FlowDirection.Forward
      );
    }

    return (
      this.committed === ObcTwoStepSwitchCommittedState.Active &&
      this.step === ObcTwoStepSwitchInteractionStep.Active &&
      this.flowDirection === FlowDirection.Backward
    );
  }

  private isDragEventForRole(
    event: PointerEvent,
    role: 'primary' | 'secondary-action'
  ): boolean {
    return (
      this.dragPointerId !== undefined &&
      event.pointerId === this.dragPointerId &&
      this.dragRole === role
    );
  }

  private computeDragDelta(
    role: 'primary' | 'secondary-action',
    clientX: number
  ): number {
    return role === 'primary'
      ? clientX - this.dragStartX
      : this.dragStartX - clientX;
  }

  private updateDragEdgeState(clamped: number) {
    const edgeX = this.dragMaxX * EDGE_COMMIT_RATIO;
    const reached = this.dragMaxX > 0 && clamped >= edgeX;
    this.dragReachedEnd = reached;
    this.dragAtEdge = reached;
  }

  private setSuppressNextClickForRole(role: 'primary' | 'secondary-action') {
    if (role === 'primary') {
      this.suppressNextPrimaryClick = true;
    } else {
      this.suppressNextSecondaryActionClick = true;
    }
  }

  private beginDragForRole(
    event: PointerEvent,
    role: 'primary' | 'secondary-action'
  ) {
    if (!this.shouldAllowDragForRole(role)) return;
    if (event.button !== 0) return;
    if (this.dragPointerId !== undefined) return;

    const target = event.currentTarget as HTMLElement;
    this.dragPointerId = event.pointerId;
    this.dragRole = role;
    this.dragStartX = event.clientX;
    this.dragMoved = false;
    this.setDragCssX(0);
    this.setPointerCaptureSafe(target, event.pointerId);

    const visibleWidth = this.resolveTrackMeasureWidth();
    if (visibleWidth > 0) {
      this.applyFrozenTrackWidthPx(visibleWidth);
    }
    this.dragMaxX = Math.max(0, visibleWidth - target.offsetWidth);

    event.preventDefault();
  }

  private handlePrimaryPointerDown(event: PointerEvent) {
    this.beginDragForRole(event, 'primary');
  }

  private handlePrimaryPointerMove(event: PointerEvent) {
    if (!this.isDragEventForRole(event, 'primary')) return;
    const deltaX = this.computeDragDelta('primary', event.clientX);

    if (!this.dragMoved) {
      if (Math.abs(deltaX) < DRAG_START_THRESHOLD_PX) return;
      this.dragMoved = true;
      this.setPhase(Phase.Drag);
    }

    const upperBound = this.dragMaxX > 0 ? this.dragMaxX : deltaX;
    const clamped = Math.min(upperBound, Math.max(0, deltaX));
    this.scheduleDragCssX(clamped);
    this.updateDragEdgeState(clamped);
  }

  private handlePrimaryPointerUp(event: PointerEvent) {
    if (!this.isDragEventForRole(event, 'primary')) return;
    const target = event.currentTarget as HTMLElement;
    this.releasePointerCaptureSafe(target, event.pointerId);
    const didMove = this.dragMoved;
    const reachedEnd = this.dragReachedEnd;
    if (reachedEnd) {
      this.completeSwipeDrag();
    } else if (didMove) {
      this.springBackDrag();
    } else {
      this.setPhase(Phase.None);
      this.resetDrag();
    }
    if (didMove) {
      this.setSuppressNextClickForRole('primary');
      event.preventDefault();
    }
  }

  private handlePrimaryPointerCancel(event: PointerEvent) {
    if (!this.isDragEventForRole(event, 'primary')) return;
    const target = event.currentTarget as HTMLElement;
    this.releasePointerCaptureSafe(target, event.pointerId);
    this.setPhase(Phase.None);
    this.resetDrag();
    this.setSuppressNextClickForRole('primary');
  }

  private handleSecondaryActionPointerDown(event: PointerEvent) {
    this.beginDragForRole(event, 'secondary-action');
  }

  private handleSecondaryActionPointerMove(event: PointerEvent) {
    if (!this.isDragEventForRole(event, 'secondary-action')) return;
    const deltaX = this.computeDragDelta('secondary-action', event.clientX);

    if (!this.dragMoved) {
      if (Math.abs(deltaX) < DRAG_START_THRESHOLD_PX) return;
      this.dragMoved = true;
      this.setPhase(Phase.Drag);
    }

    const upperBound = this.dragMaxX > 0 ? this.dragMaxX : deltaX;
    const clamped = Math.min(upperBound, Math.max(0, deltaX));
    this.scheduleDragCssX(clamped);
    this.updateDragEdgeState(clamped);
  }

  private handleSecondaryActionPointerUp(event: PointerEvent) {
    if (!this.isDragEventForRole(event, 'secondary-action')) return;
    const target = event.currentTarget as HTMLElement;
    this.releasePointerCaptureSafe(target, event.pointerId);
    const didMove = this.dragMoved;
    const reachedEnd = this.dragReachedEnd;
    if (reachedEnd) {
      this.completeSwipeDrag();
    } else if (didMove) {
      this.springBackDrag();
    } else {
      this.setPhase(Phase.None);
      this.resetDrag();
    }
    if (didMove) {
      this.setSuppressNextClickForRole('secondary-action');
      event.preventDefault();
    }
  }

  private handleSecondaryActionPointerCancel(event: PointerEvent) {
    if (!this.isDragEventForRole(event, 'secondary-action')) return;
    const target = event.currentTarget as HTMLElement;
    this.releasePointerCaptureSafe(target, event.pointerId);
    this.setPhase(Phase.None);
    this.resetDrag();
    this.setSuppressNextClickForRole('secondary-action');
  }

  private handlePrimaryLostPointerCapture(event: PointerEvent) {
    if (!this.isDragEventForRole(event, 'primary')) return;
    if (this.dragMoved) {
      this.springBackDrag();
    } else {
      this.setPhase(Phase.None);
      this.resetDrag();
    }
    this.setSuppressNextClickForRole('primary');
  }

  private handleSecondaryActionLostPointerCapture(event: PointerEvent) {
    if (!this.isDragEventForRole(event, 'secondary-action')) return;
    if (this.dragMoved) {
      this.springBackDrag();
    } else {
      this.setPhase(Phase.None);
      this.resetDrag();
    }
    this.setSuppressNextClickForRole('secondary-action');
  }

  private buildRootClasses(): ClassInfo {
    const showConfirmHint = this.confirmHint !== null;
    return {
      'obc-two-step-switch': true,
      'is-disabled': this.disabled,
      [`width-${this.width}`]: true,
      'flow-forward': this.flowDirection === FlowDirection.Forward,
      'flow-backward': this.flowDirection === FlowDirection.Backward,
      [`variant-${this.variant}`]: true,
      [`committed-${this.committed}`]: true,
      [`step-${this.step}`]: true,
      ...(this.phase === Phase.None ? {} : {[`phase-${this.phase}`]: true}),
      'confirm-hint-primary': showConfirmHint,
      ...(showConfirmHint && this.confirmHint
        ? {[`confirm-hint-pulse-${this.confirmHint.pulse}`]: true}
        : {}),
      ...(this.pendingTransition
        ? {[`pending-${this.pendingTransition.committed}`]: true}
        : {}),
      'show-endpoint-success':
        this.pendingTransition?.showEndpointSuccess ?? false,
      'transition-pending': this.transitionPending,
      'timeout-return-transition':
        this.pendingTransition?.isTimeoutReturn ?? false,
      'backward-release-commit-transition':
        this.pendingTransition?.isBackwardReleaseCommit ?? false,
      'is-drag-at-edge': this.dragAtEdge,
    };
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

  private resolveIdleActionLabel() {
    return this.resolveLabel('idle-action', this.idleActionLabel);
  }

  private resolveActiveActionLabel() {
    return this.resolveLabel('active-action', this.activeActionLabel);
  }

  private resolveIdleStateLabel() {
    return this.resolveLabel('idle-state', this.idleStateLabel);
  }

  private resolveActiveStateLabel() {
    return this.resolveLabel('active-state', this.activeStateLabel);
  }

  private resolveConfirmLabel() {
    return this.resolveLabel('confirm', this.confirmLabel);
  }

  private resolveProcessingLabel() {
    return this.resolveLabel('processing', this.processingLabel);
  }

  private resolveConfirmAriaLabel() {
    const confirm = this.resolveConfirmLabel();
    if (confirm) return confirm;
    if (this.step !== ObcTwoStepSwitchInteractionStep.Confirm) return undefined;
    return this.resolvePrimaryUsesActiveAction()
      ? this.resolveActiveActionLabel()
      : this.resolveIdleActionLabel();
  }

  private resolvePrimaryUsesActiveAction() {
    const isBackwardConfirmExit =
      this.phase === Phase.ConfirmExitBackward &&
      this.committed === ObcTwoStepSwitchCommittedState.Active &&
      this.flowDirection === FlowDirection.Backward;

    return (
      (this.step === ObcTwoStepSwitchInteractionStep.Confirm &&
        this.flowDirection === FlowDirection.Backward) ||
      isBackwardConfirmExit
    );
  }

  private resolveFillUsesIdleState() {
    const isBackwardTransitionPhase =
      this.phase === Phase.Processing ||
      this.phase === Phase.ActiveExpand ||
      this.phase === Phase.ActiveShrinkPull;
    return (
      (this.committed === ObcTwoStepSwitchCommittedState.Active &&
        this.flowDirection === FlowDirection.Backward &&
        (this.step === ObcTwoStepSwitchInteractionStep.Confirm ||
          (this.step === ObcTwoStepSwitchInteractionStep.Active &&
            isBackwardTransitionPhase))) ||
      (this.pendingTransition?.committed ===
        ObcTwoStepSwitchCommittedState.Idle &&
        isBackwardTransitionPhase)
    );
  }

  private resolveSecondaryLabelUsesActiveState() {
    return this.committed === ObcTwoStepSwitchCommittedState.Active;
  }

  private resolveGroupAriaLabel() {
    const explicit = this.ariaLabel.trim();
    if (explicit) return explicit;
    const state = this.resolveStateLabelFor(this.committed);
    const action = this.resolveActionLabelFor(this.committed);
    if (state && action) return `${state}, ${action}`;
    if (state) return state;
    if (action) return action;
    return undefined;
  }

  private resolveStateLabelFor(state: ObcTwoStepSwitchCommittedState) {
    return state === ObcTwoStepSwitchCommittedState.Active
      ? this.resolveActiveStateLabel()
      : this.resolveIdleStateLabel();
  }

  private resolveActionLabelFor(state: ObcTwoStepSwitchCommittedState) {
    return state === ObcTwoStepSwitchCommittedState.Active
      ? this.resolveActiveActionLabel()
      : this.resolveIdleActionLabel();
  }

  override render() {
    const rootClasses = classMap(this.buildRootClasses());
    const primaryLabel = this.resolvePrimaryUsesActiveAction()
      ? this.resolveActiveActionLabel()
      : this.resolveIdleActionLabel();
    const fillLabel = this.resolveFillUsesIdleState()
      ? this.resolveIdleStateLabel()
      : this.resolveActiveStateLabel();
    const secondaryLabel = this.resolveSecondaryLabelUsesActiveState()
      ? this.resolveActiveStateLabel()
      : this.resolveIdleStateLabel();
    const shouldShowIdleSecondaryLabel =
      this.committed === ObcTwoStepSwitchCommittedState.Idle &&
      this.step === ObcTwoStepSwitchInteractionStep.Idle &&
      this.flowDirection === FlowDirection.Forward;
    const secondaryLabelText = this.resolveSecondaryLabelUsesActiveState()
      ? secondaryLabel
      : shouldShowIdleSecondaryLabel
        ? secondaryLabel
        : '';
    const confirmLabel = this.resolveConfirmLabel();
    const processingLabel = this.resolveProcessingLabel();
    const confirmAriaLabel = this.resolveConfirmAriaLabel();
    const cancelAriaLabel = this.resolveCancelAriaLabel();
    const secondaryActionLabel = this.resolveActiveActionLabel();
    const groupAriaLabel = this.resolveGroupAriaLabel();
    const showCancel =
      this.isCancellableVariant &&
      this.step === ObcTwoStepSwitchInteractionStep.Processing &&
      this.transitionPending;

    const secondaryActionShouldLookEnabled =
      (this.committed === ObcTwoStepSwitchCommittedState.Active &&
        this.step === ObcTwoStepSwitchInteractionStep.Active) ||
      (this.step === ObcTwoStepSwitchInteractionStep.Active &&
        this.flowDirection === FlowDirection.Forward &&
        this.phase === Phase.ActiveShrinkPull);

    const secondaryActionDisabled =
      this.disabled || !secondaryActionShouldLookEnabled;

    const nudgeInteractive = this.isSecondaryLabelNudgeInteractive();

    return html`
      <div
        class=${rootClasses}
        part="root"
        role="group"
        aria-label=${ifDefined(groupAriaLabel)}
        aria-disabled=${this.disabled ? 'true' : 'false'}
      >
        ${this.width === ObcTwoStepSwitchWidth.hug
          ? html`
              <div class="width-guarantor" aria-hidden="true">
                <div class="width-guarantor-surface">
                  <div
                    class="width-guarantor-line width-guarantor-line--segments"
                  >
                    <div class="width-guarantor-primary"></div>
                    <div class="width-guarantor-secondary"></div>
                  </div>
                  <div
                    class="width-guarantor-line width-guarantor-line--processing"
                  >
                    <div class="width-guarantor-spinner"></div>
                    <div class="width-guarantor-label-stack">
                      <div
                        class="width-guarantor-label width-guarantor-label--button"
                      >
                        ${processingLabel}
                      </div>
                    </div>
                  </div>
                  <div
                    class="width-guarantor-line width-guarantor-line--success"
                  >
                    <div class="width-guarantor-check"></div>
                    <div class="width-guarantor-label-stack">
                      <div
                        class="width-guarantor-label width-guarantor-label--button"
                      >
                        ${fillLabel}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            `
          : null}
        <div class="track" part="track">
          <div class="fill" part="fill" aria-hidden="true">
            <span class="fill-label" part="fill-label">${fillLabel}</span>
          </div>
          <div
            class="processing-status"
            part="processing-status"
            aria-hidden="true"
          >
            <obc-sequence-loading-spinner
              class="processing-spinner"
              part="processing-spinner"
              .type=${SequenceLoadingSpinnerType.button}
              .progression=${SequenceLoadingSpinnerProgressionType.scanning}
            ></obc-sequence-loading-spinner>
            ${processingLabel
              ? html`
                  <span class="processing-status-label">
                    ${processingLabel}
                  </span>
                `
              : null}
          </div>
          <div class="success-status" part="success-status" aria-hidden="true">
            <obi-check-google class="success-icon"></obi-check-google>
            <span class="success-status-label">${fillLabel}</span>
          </div>

          <div
            class="confirm"
            part="confirm"
            role="button"
            tabindex=${this.step === ObcTwoStepSwitchInteractionStep.Confirm &&
            !this.disabled
              ? '0'
              : '-1'}
            aria-disabled=${this.disabled ? 'true' : 'false'}
            aria-label=${ifDefined(
              this.step === ObcTwoStepSwitchInteractionStep.Confirm
                ? confirmAriaLabel
                : undefined
            )}
            @pointerdown=${this.onConfirmPointerDown}
            @click=${this.onConfirmClick}
            @keydown=${this.handleConfirmKeyDown}
          >
            <span class="confirm-content" part="confirm-content">
              <span class="confirm-label" part="confirm-label"
                >${confirmLabel}</span
              >
              <obi-chevron-double-right-google
                class=${classMap({
                  'confirm-chevron': true,
                  'is-mirrored': this.flowDirection === FlowDirection.Backward,
                })}
              ></obi-chevron-double-right-google>
            </span>
          </div>

          <obc-button
            class="primary"
            part="primary"
            variant="normal"
            .disabled=${this.disabled}
            @click=${this.onPrimaryClick}
            @pointerdown=${this.handlePrimaryPointerDown}
            @pointermove=${this.handlePrimaryPointerMove}
            @pointerup=${this.handlePrimaryPointerUp}
            @pointercancel=${this.handlePrimaryPointerCancel}
            @lostpointercapture=${this.handlePrimaryLostPointerCapture}
            >${primaryLabel}</obc-button
          >

          <div class="secondary" part="secondary">
            <span
              class="secondary-label"
              part="secondary-label"
              role=${ifDefined(nudgeInteractive ? 'button' : undefined)}
              tabindex=${nudgeInteractive ? '0' : '-1'}
              aria-hidden=${ifDefined(!nudgeInteractive ? 'true' : undefined)}
              @click=${this.onSecondaryLabelClick}
              @keydown=${this.handleSecondaryLabelKeyDown}
              >${secondaryLabelText}</span
            >
            <obc-button
              class="secondary-action"
              part="secondary-action"
              variant="normal"
              .disabled=${secondaryActionDisabled}
              @click=${this.onSecondaryActionClick}
              @pointerdown=${this.handleSecondaryActionPointerDown}
              @pointermove=${this.handleSecondaryActionPointerMove}
              @pointerup=${this.handleSecondaryActionPointerUp}
              @pointercancel=${this.handleSecondaryActionPointerCancel}
              @lostpointercapture=${this
                .handleSecondaryActionLostPointerCapture}
              >${secondaryActionLabel}</obc-button
            >
          </div>
          ${showCancel
            ? html`
                <obc-button
                  class="cancel-button"
                  variant="normal"
                  ?disabled=${this.disabled}
                  part="cancel-button"
                  aria-label=${cancelAriaLabel}
                  @click=${this.handleCancelClick}
                >
                  <obi-close-google class="cancel-icon"></obi-close-google>
                </obc-button>
              `
            : null}
        </div>
        <div class="slot-targets" hidden aria-hidden="true">
          <slot name="idle-action"></slot>
          <slot name="active-action"></slot>
          <slot name="idle-state"></slot>
          <slot name="active-state"></slot>
          <slot name="confirm"></slot>
          <slot name="processing"></slot>
        </div>
      </div>
    `;
  }

  override updated(changedProperties: PropertyValues<this>) {
    if (changedProperties.has('width')) {
      this.disconnectTrackResizeObserver();
      this.connectTrackResizeObserver();
      this.scheduleTrackWidthMeasure();
    }

    if (
      (changedProperties as Map<PropertyKey, unknown>).has('_flowDirection')
    ) {
      this.setAttribute('flow-direction', this._flowDirection);
    }
  }

  override firstUpdated(changedProperties: PropertyValues) {
    super.firstUpdated(changedProperties);
    this.setAttribute('flow-direction', this._flowDirection);
    this.renderRoot
      .querySelectorAll('slot')
      .forEach((slot) =>
        slot.addEventListener('slotchange', this.handleSlotChange)
      );
    const style = getComputedStyle(this);
    this.motionDurationsMs = {
      slide: parseSwitchDurationMs(
        style,
        SWITCH_DUR_SLIDE_CSS_VAR,
        SWITCH_DUR_SLIDE_MS_DEFAULT
      ),
      bounce: parseSwitchDurationMs(
        style,
        SWITCH_DUR_BOUNCE_CSS_VAR,
        SWITCH_DUR_BOUNCE_MS_DEFAULT
      ),
      nudge: parseSwitchDurationMs(
        style,
        SWITCH_DUR_NUDGE_CSS_VAR,
        SWITCH_DUR_NUDGE_MS_DEFAULT
      ),
    };
    this.connectTrackResizeObserver();
    this.scheduleTrackWidthMeasure();
  }

  override disconnectedCallback() {
    this.renderRoot
      .querySelectorAll('slot')
      .forEach((slot) =>
        slot.removeEventListener('slotchange', this.handleSlotChange)
      );
    this.disconnectTrackResizeObserver();
    super.disconnectedCallback();
    this.clearAllTimers();
  }

  static override styles = unsafeCSS(componentStyle);
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-two-step-switch': ObcTwoStepSwitch;
  }
}
