import {LitElement, html, unsafeCSS, type PropertyValues} from 'lit';
import {ifDefined} from 'lit/directives/if-defined.js';
import {property, state} from 'lit/decorators.js';
import {classMap, type ClassInfo} from 'lit/directives/class-map.js';
import componentStyle from './two-step-switch.css?inline';
import {customElement} from '../../decorator.js';
import '../button/button.js';
import '../../icons/icon-chevron-double-right-google.js';

export enum ObcTwoStepSwitchCommittedState {
  Idle = 'idle',
  Active = 'active',
}

export enum ObcTwoStepSwitchInteractionStep {
  Idle = 'idle',
  Confirm = 'confirm',
  Active = 'active',
}

enum Phase {
  None = 'none',
  Nudge = 'nudge',
  ConfirmEnter = 'confirm-enter',
  ConfirmBounce = 'confirm-bounce',
  ActiveExpand = 'active-expand',
  ActiveShrinkPull = 'active-shrink-pull',
  Drag = 'drag',
}

export enum FlowDirection {
  Forward = 'forward',
  Backward = 'backward',
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

/** CSS: --switch-dur-slide on :host (two-step-switch.css) */
const SWITCH_DUR_SLIDE_CSS_VAR = '--switch-dur-slide';
/** CSS: --switch-dur-bounce on :host */
const SWITCH_DUR_BOUNCE_CSS_VAR = '--switch-dur-bounce';
/** CSS: --switch-dur-nudge on :host */
const SWITCH_DUR_NUDGE_CSS_VAR = '--switch-dur-nudge';

const SWITCH_DUR_SLIDE_MS_DEFAULT = 880;
const SWITCH_DUR_BOUNCE_MS_DEFAULT = 1760;
const SWITCH_DUR_NUDGE_MS_DEFAULT = 220;

const CONFIRM_TIMEOUT_MS = 1600;
const CONFIRM_HINT_MS = 900;
const SWIPE_AUTOPASS_MS = 700;

const DRAG_START_THRESHOLD_PX = 3;
const DRAG_COMPLETE_THRESHOLD_PX = 56;

function parseSwitchDurationMs(
  style: CSSStyleDeclaration,
  cssVar: string,
  fallbackMs: number
): number {
  const raw = style.getPropertyValue(cssVar).trim();
  if (!raw) return fallbackMs;
  const parsed = parseFloat(raw);
  if (Number.isNaN(parsed)) return fallbackMs;
  if (raw.endsWith('s') && !raw.endsWith('ms')) return parsed * 1000;
  return parsed;
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
 *
 * ## Usage Guidelines
 * Use this control when a state change needs deliberate confirmation and the active state should
 * offer an explicit follow-up action (for example, a release/return flow). If you only need a
 * guarded activation without a follow-up action, use `<obc-two-step-action>`.
 *
 * ## Events
 * - `state-change`: Committed state changed (idle ↔ active).
 * - `confirm-open`: Entered the confirm step (after the confirm slide-in).
 * - `confirm-close`: Confirm step ended (cancel, timeout, or proceed to commit).
 * - `confirm-timeout`: Confirm step timed out.
 *
 * @slot idle-action - Primary action label in forward idle and confirm steps.
 * @slot active-action - Primary action in backward confirm; secondary action button in active.
 * @slot idle-state - State label when committed idle; fill label in backward transition phases.
 * @slot active-state - State label when committed active; fill label in forward transition phases.
 * @slot confirm - Label on the confirm control during the confirm step.
 * @fires state-change {ObcTwoStepSwitchStateChangeEvent} When the committed state changes (idle ↔ active).
 * @fires confirm-open {ObcTwoStepSwitchConfirmOpenEvent} When the confirm step opens.
 * @fires confirm-close {ObcTwoStepSwitchConfirmCloseEvent} When the confirm step closes.
 * @fires confirm-timeout {ObcTwoStepSwitchConfirmTimeoutEvent} When the confirm step times out.
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

  @property({type: String, attribute: 'aria-label'})
  override ariaLabel = '';

  @property({type: String, attribute: 'flow-direction', reflect: true})
  flowDirection: FlowDirection = FlowDirection.Forward;

  @state() private committed: ObcTwoStepSwitchCommittedState =
    ObcTwoStepSwitchCommittedState.Idle;
  @state() private step: ObcTwoStepSwitchInteractionStep =
    ObcTwoStepSwitchInteractionStep.Idle;
  @state() private phase: Phase = Phase.None;

  @state() private transitionPending = false;
  @state() private isTimeoutReturn = false;
  @state() private isBackwardReleaseCommit = false;

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

  private confirmTimeoutId?: number;
  private swipeAutopassTimeoutId?: number;
  private phaseTimeoutId?: number;
  private confirmHintTimeoutId?: number;
  private fallbackTimerId?: number;
  private cancelMotionAwait?: () => void;
  private phaseGeneration = 0;

  private dragPointerId?: number;
  private dragRole?: 'primary' | 'secondary-action';
  private dragStartX = 0;
  private dragMoved = false;
  private dragPendingX?: number;
  private dragRafId?: number;
  private suppressNextPrimaryClick = false;
  private suppressNextConfirmClick = false;
  private confirmHintQueued = false;

  private readonly handleSlotChange = () => {
    this.requestUpdate();
  };

  private pendingCommitted?: ObcTwoStepSwitchCommittedState;
  private pendingFlowDirection?: FlowDirection;
  private pendingStep?: ObcTwoStepSwitchInteractionStep;

  @state() private confirmHintActive = false;
  @state() private confirmHintPulse: 0 | 1 = 0;

  private motionDurationsMs = {
    slide: SWITCH_DUR_SLIDE_MS_DEFAULT,
    bounce: SWITCH_DUR_BOUNCE_MS_DEFAULT,
    nudge: SWITCH_DUR_NUDGE_MS_DEFAULT,
  };

  private clearTimer(id: number | undefined) {
    if (id !== undefined) {
      window.clearTimeout(id);
    }
    return undefined;
  }

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

  private clearAllTimers() {
    this.confirmTimeoutId = this.clearTimer(this.confirmTimeoutId);
    this.swipeAutopassTimeoutId = this.clearTimer(this.swipeAutopassTimeoutId);
    this.phaseTimeoutId = this.clearTimer(this.phaseTimeoutId);
    this.confirmHintTimeoutId = this.clearTimer(this.confirmHintTimeoutId);
    this.fallbackTimerId = this.clearTimer(this.fallbackTimerId);
    this.cancelMotionAwait?.();
    this.cancelMotionAwait = undefined;
    this.cancelDragRaf();
  }

  /**
   * Resolves when the phase's leading motion (transform/clip-path, ~leadMs) has actually finished.
   * A fallback timer guards against a missing transitionend. Never shorter than the CSS duration —
   * the buffer absorbs jitter.
   */
  private awaitMotion(leadMs: number): Promise<void> {
    this.cancelMotionAwait?.();
    return new Promise<void>((resolve) => {
      const track = this.renderRoot.querySelector('.track');
      let done = false;
      const settle = () => {
        if (done) return;
        done = true;
        track?.removeEventListener('transitionend', onEnd);
        this.fallbackTimerId = this.clearTimer(this.fallbackTimerId);
        this.cancelMotionAwait = undefined;
        resolve();
      };
      const onEnd = (e: Event) => {
        const p = (e as TransitionEvent).propertyName;
        if (p === 'transform' || p === 'clip-path') settle();
      };
      track?.addEventListener('transitionend', onEnd);
      this.fallbackTimerId = window.setTimeout(settle, leadMs + 80);
      this.cancelMotionAwait = settle;
    });
  }

  private setPhase(next: Phase, durationMs?: number, onDone?: () => void) {
    const generation = ++this.phaseGeneration;
    this.phase = next;
    this.phaseTimeoutId = this.clearTimer(this.phaseTimeoutId);
    if (durationMs && durationMs > 0) {
      this.phaseTimeoutId = window.setTimeout(() => {
        this.phaseTimeoutId = undefined;
        if (generation !== this.phaseGeneration) {
          return;
        }
        onDone?.();
      }, durationMs);
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
    this.confirmTimeoutId = this.clearTimer(this.confirmTimeoutId);
    if (this.disabled || this.step !== ObcTwoStepSwitchInteractionStep.Confirm)
      return;
    this.confirmTimeoutId = window.setTimeout(() => {
      this.confirmTimeoutId = undefined;
      this.handleConfirmTimeout();
    }, CONFIRM_TIMEOUT_MS);
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
    this.confirmTimeoutId = this.clearTimer(this.confirmTimeoutId);
    const gen = ++this.phaseGeneration;
    this.phase = Phase.ConfirmEnter;
    await this.awaitMotion(this.motionDurationsMs.slide);
    if (gen !== this.phaseGeneration) return;

    this.step = stepTarget;
    this.phase = Phase.None;
    this.dispatchConfirmPhaseEvent('confirm-close');
  }

  private async beginEndpointTransition(
    nextCommitted: ObcTwoStepSwitchCommittedState,
    nextStep: ObcTwoStepSwitchInteractionStep,
    nextFlowDirection: FlowDirection,
    stepDuringTransition: ObcTwoStepSwitchInteractionStep
  ) {
    const gen = ++this.phaseGeneration;
    this.transitionPending = true;
    this.confirmHintQueued = false;
    this.pendingCommitted = nextCommitted;
    this.pendingStep = nextStep;
    this.pendingFlowDirection = nextFlowDirection;
    this.step = stepDuringTransition;

    this.phase = Phase.ActiveExpand;
    await this.awaitMotion(this.motionDurationsMs.slide);
    if (gen !== this.phaseGeneration) return;

    this.phase = Phase.ActiveShrinkPull;
    await this.awaitMotion(this.motionDurationsMs.slide);
    if (gen !== this.phaseGeneration) return;

    const previousCommitted = this.committed;
    if (this.pendingCommitted) this.committed = this.pendingCommitted;
    if (this.pendingStep) this.step = this.pendingStep;
    if (this.pendingFlowDirection)
      this.flowDirection = this.pendingFlowDirection;
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
    this.transitionPending = false;
    this.isTimeoutReturn = false;
    this.isBackwardReleaseCommit = false;
    this.pendingCommitted = undefined;
    this.pendingStep = undefined;
    this.pendingFlowDirection = undefined;
    this.phase = Phase.None;
  }

  private commitActiveFromConfirm() {
    this.confirmTimeoutId = this.clearTimer(this.confirmTimeoutId);
    this.swipeAutopassTimeoutId = this.clearTimer(this.swipeAutopassTimeoutId);
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
    this.confirmTimeoutId = this.clearTimer(this.confirmTimeoutId);
    this.swipeAutopassTimeoutId = this.clearTimer(this.swipeAutopassTimeoutId);
    this.confirmHintQueued = false;
    this.dispatchConfirmPhaseEvent('confirm-close');
    this.isBackwardReleaseCommit = true;
    this.beginEndpointTransition(
      ObcTwoStepSwitchCommittedState.Idle,
      ObcTwoStepSwitchInteractionStep.Idle,
      FlowDirection.Forward,
      ObcTwoStepSwitchInteractionStep.Active
    );
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
      this.flowDirection = FlowDirection.Forward;
      this.isTimeoutReturn = true;
      this.dispatchConfirmPhaseEvent('confirm-close');
      this.beginEndpointTransition(
        ObcTwoStepSwitchCommittedState.Active,
        ObcTwoStepSwitchInteractionStep.Active,
        FlowDirection.Backward,
        ObcTwoStepSwitchInteractionStep.Active
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
    this.confirmHintActive = true;
    this.confirmHintPulse = this.confirmHintPulse === 0 ? 1 : 0;
    this.confirmHintTimeoutId = this.clearTimer(this.confirmHintTimeoutId);
    this.confirmHintTimeoutId = window.setTimeout(() => {
      this.confirmHintTimeoutId = undefined;
      this.confirmHintActive = false;
    }, CONFIRM_HINT_MS);
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

  onConfirmPointerDown(event: PointerEvent) {
    if (this.disabled) return;
    if (this.step !== ObcTwoStepSwitchInteractionStep.Confirm) return;
    if (event.button !== 0) return;
    this.suppressNextConfirmClick = true;
    if (
      this.phase === Phase.ConfirmEnter &&
      this.flowDirection === FlowDirection.Forward
    ) {
      this.confirmHintQueued = true;
      return;
    }
    this.activateConfirmHint();
  }

  onConfirmClick() {
    if (this.suppressNextConfirmClick) {
      this.suppressNextConfirmClick = false;
      return;
    }
    if (
      this.disabled ||
      this.step !== ObcTwoStepSwitchInteractionStep.Confirm ||
      this.transitionPending
    )
      return;
    if (
      this.phase === Phase.ConfirmEnter &&
      this.flowDirection === FlowDirection.Forward
    ) {
      this.confirmHintQueued = true;
      return;
    }
    this.activateConfirmHint();
  }

  private handleConfirmKeyDown(event: KeyboardEvent) {
    if (this.disabled) return;
    if (this.step !== ObcTwoStepSwitchInteractionStep.Confirm) return;
    if (event.key !== 'Enter' && event.key !== ' ') return;
    event.preventDefault();
    if (this.transitionPending) return;
    if (
      this.phase === Phase.ConfirmEnter &&
      this.flowDirection === FlowDirection.Forward
    ) {
      this.confirmHintQueued = true;
      return;
    }
    this.activateConfirmHint();
  }

  private scheduleSwipeAutopass() {
    this.swipeAutopassTimeoutId = this.clearTimer(this.swipeAutopassTimeoutId);
    if (this.disabled || this.step !== ObcTwoStepSwitchInteractionStep.Confirm)
      return;
    this.swipeAutopassTimeoutId = window.setTimeout(() => {
      this.swipeAutopassTimeoutId = undefined;
      if (
        this.disabled ||
        this.step !== ObcTwoStepSwitchInteractionStep.Confirm
      )
        return;
      if (
        this.committed === ObcTwoStepSwitchCommittedState.Idle &&
        this.flowDirection === FlowDirection.Forward
      ) {
        this.commitActiveFromConfirm();
        return;
      }
      if (
        this.committed === ObcTwoStepSwitchCommittedState.Active &&
        this.flowDirection === FlowDirection.Backward
      ) {
        this.commitIdleFromConfirmBackward();
      }
    }, SWIPE_AUTOPASS_MS);
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
    this.setDragCssX(0);
  }

  private setPointerCaptureSafe(target: HTMLElement, pointerId: number) {
    try {
      target.setPointerCapture(pointerId);
    } catch (error) {
      void error;
    }
  }

  private releasePointerCaptureSafe(target: HTMLElement, pointerId: number) {
    try {
      if (target.hasPointerCapture(pointerId)) {
        target.releasePointerCapture(pointerId);
      }
    } catch (error) {
      void error;
    }
  }

  private completeSwipeDrag() {
    this.setPhase(Phase.None);
    this.resetDrag();
    this.suppressNextPrimaryClick = true;
    this.enterConfirm();
    this.scheduleSwipeAutopass();
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

  private handlePrimaryPointerDown(event: PointerEvent) {
    if (!this.shouldAllowDragForRole('primary')) return;
    if (event.button !== 0) return;
    if (this.dragPointerId !== undefined) return;

    const target = event.currentTarget as HTMLElement;
    this.dragPointerId = event.pointerId;
    this.dragRole = 'primary';
    this.dragStartX = event.clientX;
    this.dragMoved = false;
    this.setPhase(Phase.Drag);
    this.setDragCssX(0);
    this.setPointerCaptureSafe(target, event.pointerId);
    event.preventDefault();
  }

  private handlePrimaryPointerMove(event: PointerEvent) {
    if (
      this.dragPointerId === undefined ||
      event.pointerId !== this.dragPointerId
    )
      return;
    if (this.dragRole !== 'primary') return;
    const deltaX = event.clientX - this.dragStartX;

    if (!this.dragMoved && Math.abs(deltaX) < DRAG_START_THRESHOLD_PX) {
      return;
    }
    this.dragMoved = true;

    const clamped = Math.max(0, deltaX);
    this.scheduleDragCssX(clamped);

    if (clamped >= DRAG_COMPLETE_THRESHOLD_PX) {
      this.cancelDragRaf();
      this.setDragCssX(clamped);
      const target = event.currentTarget as HTMLElement;
      this.releasePointerCaptureSafe(target, event.pointerId);
      this.completeSwipeDrag();
      event.preventDefault();
    }
  }

  private handlePrimaryPointerUp(event: PointerEvent) {
    if (
      this.dragPointerId === undefined ||
      event.pointerId !== this.dragPointerId
    )
      return;
    if (this.dragRole !== 'primary') return;
    const target = event.currentTarget as HTMLElement;
    this.releasePointerCaptureSafe(target, event.pointerId);
    const didMove = this.dragMoved;
    this.setPhase(Phase.None);
    this.resetDrag();
    if (didMove) {
      this.suppressNextPrimaryClick = true;
      event.preventDefault();
    }
  }

  private handlePrimaryPointerCancel(event: PointerEvent) {
    if (
      this.dragPointerId === undefined ||
      event.pointerId !== this.dragPointerId
    )
      return;
    if (this.dragRole !== 'primary') return;
    const target = event.currentTarget as HTMLElement;
    this.releasePointerCaptureSafe(target, event.pointerId);
    this.setPhase(Phase.None);
    this.resetDrag();
    this.suppressNextPrimaryClick = true;
  }

  private handleSecondaryActionPointerDown(event: PointerEvent) {
    if (!this.shouldAllowDragForRole('secondary-action')) return;
    if (event.button !== 0) return;
    if (this.dragPointerId !== undefined) return;

    const target = event.currentTarget as HTMLElement;
    this.dragPointerId = event.pointerId;
    this.dragRole = 'secondary-action';
    this.dragStartX = event.clientX;
    this.dragMoved = false;
    this.setPhase(Phase.Drag);
    this.setDragCssX(0);
    this.setPointerCaptureSafe(target, event.pointerId);
    event.preventDefault();
  }

  private handleSecondaryActionPointerMove(event: PointerEvent) {
    if (
      this.dragPointerId === undefined ||
      event.pointerId !== this.dragPointerId
    )
      return;
    if (this.dragRole !== 'secondary-action') return;
    const deltaX = this.dragStartX - event.clientX;

    if (!this.dragMoved && Math.abs(deltaX) < DRAG_START_THRESHOLD_PX) {
      return;
    }
    this.dragMoved = true;

    const clamped = Math.max(0, deltaX);
    this.scheduleDragCssX(clamped);

    if (clamped >= DRAG_COMPLETE_THRESHOLD_PX) {
      this.cancelDragRaf();
      this.setDragCssX(clamped);
      const target = event.currentTarget as HTMLElement;
      this.releasePointerCaptureSafe(target, event.pointerId);
      this.completeSwipeDrag();
      event.preventDefault();
    }
  }

  private handleSecondaryActionPointerUp(event: PointerEvent) {
    if (
      this.dragPointerId === undefined ||
      event.pointerId !== this.dragPointerId
    )
      return;
    if (this.dragRole !== 'secondary-action') return;
    const target = event.currentTarget as HTMLElement;
    this.releasePointerCaptureSafe(target, event.pointerId);
    const didMove = this.dragMoved;
    this.setPhase(Phase.None);
    this.resetDrag();
    if (didMove) {
      this.suppressNextPrimaryClick = true;
      event.preventDefault();
    }
  }

  private handleSecondaryActionPointerCancel(event: PointerEvent) {
    if (
      this.dragPointerId === undefined ||
      event.pointerId !== this.dragPointerId
    )
      return;
    if (this.dragRole !== 'secondary-action') return;
    const target = event.currentTarget as HTMLElement;
    this.releasePointerCaptureSafe(target, event.pointerId);
    this.setPhase(Phase.None);
    this.resetDrag();
    this.suppressNextPrimaryClick = true;
  }

  private buildRootClasses(): ClassInfo {
    const hintTarget = this.confirmHintActive ? 'primary' : undefined;
    return {
      'obc-two-step-switch': true,
      'is-disabled': this.disabled,
      'flow-forward': this.flowDirection === FlowDirection.Forward,
      'flow-backward': this.flowDirection === FlowDirection.Backward,
      [`committed-${this.committed}`]: true,
      [`step-${this.step}`]: true,
      ...(this.phase === Phase.None ? {} : {[`phase-${this.phase}`]: true}),
      ...(hintTarget ? {[`confirm-hint-${hintTarget}`]: true} : {}),
      ...(hintTarget
        ? {[`confirm-hint-pulse-${this.confirmHintPulse}`]: true}
        : {}),
      'transition-pending': this.transitionPending,
      'timeout-return-transition': this.isTimeoutReturn,
      'backward-release-commit-transition': this.isBackwardReleaseCommit,
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

  private resolveConfirmAriaLabel() {
    const confirm = this.resolveConfirmLabel();
    if (confirm) return confirm;
    if (this.step !== ObcTwoStepSwitchInteractionStep.Confirm) return undefined;
    return this.resolvePrimaryUsesActiveAction()
      ? this.resolveActiveActionLabel()
      : this.resolveIdleActionLabel();
  }

  private resolvePrimaryUsesActiveAction() {
    return (
      this.step === ObcTwoStepSwitchInteractionStep.Confirm &&
      this.flowDirection === FlowDirection.Backward
    );
  }

  private resolveFillUsesIdleState() {
    const isBackwardTransitionPhase =
      this.phase === Phase.ActiveExpand ||
      this.phase === Phase.ActiveShrinkPull;
    return (
      this.committed === ObcTwoStepSwitchCommittedState.Active &&
      this.flowDirection === FlowDirection.Backward &&
      (this.step === ObcTwoStepSwitchInteractionStep.Confirm ||
        (this.step === ObcTwoStepSwitchInteractionStep.Active &&
          isBackwardTransitionPhase))
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
    const confirmLabel = this.resolveConfirmLabel();
    const confirmAriaLabel = this.resolveConfirmAriaLabel();
    const secondaryActionLabel = this.resolveActiveActionLabel();
    const groupAriaLabel = this.resolveGroupAriaLabel();

    const secondaryActionShouldLookEnabled =
      (this.committed === 'active' && this.step === 'active') ||
      (this.step === 'active' &&
        this.flowDirection === 'forward' &&
        this.phase === 'active-shrink-pull');

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
        <div class="track" part="track">
          <div class="fill" part="fill" aria-hidden="true">
            <span class="fill-label" part="fill-label">${fillLabel}</span>
          </div>

          <div
            class="confirm"
            part="confirm"
            role="button"
            tabindex=${this.step === 'confirm' && !this.disabled ? '0' : '-1'}
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
                  'is-mirrored': this.flowDirection === 'backward',
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
              >${secondaryLabel}</span
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
              >${secondaryActionLabel}</obc-button
            >
          </div>
        </div>
        <div class="slot-targets" hidden aria-hidden="true">
          <slot name="idle-action"></slot>
          <slot name="active-action"></slot>
          <slot name="idle-state"></slot>
          <slot name="active-state"></slot>
          <slot name="confirm"></slot>
        </div>
      </div>
    `;
  }

  override firstUpdated(changedProperties: PropertyValues) {
    super.firstUpdated(changedProperties);
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
  }

  override disconnectedCallback() {
    this.renderRoot
      .querySelectorAll('slot')
      .forEach((slot) =>
        slot.removeEventListener('slotchange', this.handleSlotChange)
      );
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
