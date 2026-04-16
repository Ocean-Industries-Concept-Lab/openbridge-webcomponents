import {LitElement, html, unsafeCSS} from 'lit';
import {property, state} from 'lit/decorators.js';
import {classMap, type ClassInfo} from 'lit/directives/class-map.js';
import componentStyle from './two-step-switch.css?inline';
import {customElement} from '../../decorator.js';
import '../button/button.js';
import '../../icons/icon-chevron-double-right-google.js';

enum CommittedState {
  Idle = 'idle',
  Active = 'active',
}

enum Step {
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

const CONFIRM_SLIDE_MS = 880;
const CONFIRM_BOUNCE_MS = 1760;
const CONFIRM_TIMEOUT_MS = 1600;
const CONFIRM_HINT_MS = 900;
const SWIPE_AUTOPASS_MS = 700;
const NUDGE_MS = 220;

const DRAG_START_THRESHOLD_PX = 3;
const DRAG_COMPLETE_THRESHOLD_PX = 56;

/**
 * `<obc-two-step-switch>` – A two-step confirm switch for guarded activation (confirm switch).
 *
 * Uses a two-stage interaction (arm/confirm, then commit) to reduce accidental toggles. Supports
 * both click and drag input, and provides an explicit follow-up action in the active state.
 *
 * ## Features
 * - **Two-step activation**: Arms first, then commits to the active state.
 * - **Active follow-up**: In active, a secondary action can be invoked via a release/confirm flow.
 * - **Copy via properties**: Labels are provided via `idleActionLabel`, `idleStateLabel`,
 *   `activeActionLabel`, and `activeStateLabel`.
 *
 * ## Usage Guidelines
 * Use this control when a state change needs deliberate confirmation and the active state should
 * offer an explicit follow-up action (for example, a release/return flow). If you only need a
 * guarded activation without a follow-up action, use `<obc-two-step-action>`.
 *
 * ## Events
 * - `state-change`: Fired when the committed state changes (idle ↔ active).
 *
 * @fires state-change {CustomEvent<{state:'idle'|'active', previousState:'idle'|'active', stateLabel:string, actionLabel:string, flowDirection:'forward'|'backward'}>}
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

  @property({type: String, attribute: 'flow-direction'})
  flowDirection: FlowDirection = FlowDirection.Forward;

  @state() private committed: CommittedState = CommittedState.Idle;
  @state() private step: Step = Step.Idle;
  @state() private phase: Phase = Phase.None;

  @state() private transitionPending = false;
  @state() private isTimeoutReturn = false;
  @state() private isBackwardReleaseCommit = false;

  private confirmTimeoutId?: number;
  private swipeAutopassTimeoutId?: number;
  private phaseTimeoutId?: number;
  private confirmHintTimeoutId?: number;
  private phaseGeneration = 0;

  private dragPointerId?: number;
  private dragRole?: 'primary' | 'secondary-action';
  private dragStartX = 0;
  private dragMoved = false;
  private suppressNextPrimaryClick = false;
  private suppressNextConfirmClick = false;
  private confirmHintQueued = false;

  private pendingCommitted?: CommittedState;
  private pendingFlowDirection?: FlowDirection;
  private pendingStep?: Step;

  @state() private confirmHintActive = false;
  @state() private confirmHintPulse: 0 | 1 = 0;

  private clearTimer(id: number | undefined) {
    if (id !== undefined) {
      window.clearTimeout(id);
    }
    return undefined;
  }

  private clearAllTimers() {
    this.confirmTimeoutId = this.clearTimer(this.confirmTimeoutId);
    this.swipeAutopassTimeoutId = this.clearTimer(this.swipeAutopassTimeoutId);
    this.phaseTimeoutId = this.clearTimer(this.phaseTimeoutId);
    this.confirmHintTimeoutId = this.clearTimer(this.confirmHintTimeoutId);
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
    if (this.disabled || this.step !== Step.Confirm || this.transitionPending)
      return;
    this.confirmHintQueued = false;
    this.activateConfirmHint();
  }

  private startConfirmTimeout() {
    this.confirmTimeoutId = this.clearTimer(this.confirmTimeoutId);
    if (this.disabled || this.step !== Step.Confirm) return;
    this.confirmTimeoutId = window.setTimeout(() => {
      this.confirmTimeoutId = undefined;
      this.handleConfirmTimeout();
    }, CONFIRM_TIMEOUT_MS);
  }

  private enterConfirm() {
    if (this.disabled) return;
    if (this.step === Step.Confirm) {
      this.startConfirmTimeout();
      return;
    }
    this.step = Step.Confirm;
    this.startConfirmTimeout();
    this.setPhase(Phase.ConfirmEnter, CONFIRM_SLIDE_MS, () => {
      this.setPhase(Phase.ConfirmBounce, CONFIRM_BOUNCE_MS, () => {
        this.setPhase(Phase.None);
      });
      this.applyQueuedConfirmHint();
    });
  }

  private exitConfirmTo(stepTarget: Step) {
    if (this.step !== Step.Confirm) return;
    this.confirmTimeoutId = this.clearTimer(this.confirmTimeoutId);
    this.setPhase(Phase.ConfirmEnter, CONFIRM_SLIDE_MS, () => {
      this.step = stepTarget;
      this.setPhase(Phase.None);
    });
  }

  private beginEndpointTransition(
    nextCommitted: CommittedState,
    nextStep: Step,
    nextFlowDirection: FlowDirection,
    stepDuringTransition: Step
  ) {
    this.transitionPending = true;
    this.confirmHintQueued = false;
    this.pendingCommitted = nextCommitted;
    this.pendingStep = nextStep;
    this.pendingFlowDirection = nextFlowDirection;
    this.step = stepDuringTransition;

    this.setPhase(Phase.ActiveExpand, CONFIRM_SLIDE_MS, () => {
      this.setPhase(Phase.ActiveShrinkPull, CONFIRM_SLIDE_MS, () => {
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
            new CustomEvent('state-change', {
              detail,
              bubbles: true,
              composed: true,
            })
          );
        }
        this.transitionPending = false;
        this.isTimeoutReturn = false;
        this.isBackwardReleaseCommit = false;
        this.pendingCommitted = undefined;
        this.pendingStep = undefined;
        this.pendingFlowDirection = undefined;
        this.setPhase(Phase.None);
      });
    });
  }

  private commitActiveFromConfirm() {
    this.confirmTimeoutId = this.clearTimer(this.confirmTimeoutId);
    this.swipeAutopassTimeoutId = this.clearTimer(this.swipeAutopassTimeoutId);
    this.confirmHintQueued = false;
    this.beginEndpointTransition(
      CommittedState.Active,
      Step.Active,
      FlowDirection.Backward,
      Step.Active
    );
  }

  private commitIdleFromConfirmBackward() {
    this.confirmTimeoutId = this.clearTimer(this.confirmTimeoutId);
    this.swipeAutopassTimeoutId = this.clearTimer(this.swipeAutopassTimeoutId);
    this.confirmHintQueued = false;
    this.isBackwardReleaseCommit = true;
    this.beginEndpointTransition(
      CommittedState.Idle,
      Step.Idle,
      FlowDirection.Forward,
      Step.Active
    );
  }

  private handleConfirmTimeout() {
    if (this.disabled || this.step !== Step.Confirm) return;
    this.confirmHintQueued = false;

    if (
      this.committed === CommittedState.Active &&
      this.flowDirection === FlowDirection.Backward
    ) {
      this.flowDirection = FlowDirection.Forward;
      this.isTimeoutReturn = true;
      this.beginEndpointTransition(
        CommittedState.Active,
        Step.Active,
        FlowDirection.Backward,
        Step.Active
      );
      return;
    }

    const target: Step =
      this.committed === CommittedState.Idle ? Step.Idle : Step.Active;
    this.exitConfirmTo(target);
  }

  private triggerConfirmHint() {
    if (this.disabled || this.step !== Step.Confirm) return;
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
    this.setPhase(Phase.Nudge, NUDGE_MS, () => this.setPhase(Phase.None));
  }

  onSecondaryLabelClick() {
    if (this.disabled) return;
    if (this.transitionPending) return;
    if (
      this.committed !== CommittedState.Idle ||
      this.step !== Step.Idle ||
      this.flowDirection !== FlowDirection.Forward
    ) {
      return;
    }
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
      this.committed === CommittedState.Idle &&
      this.step === Step.Idle &&
      this.flowDirection === FlowDirection.Forward
    ) {
      this.enterConfirm();
      return;
    }

    if (
      this.committed === CommittedState.Idle &&
      this.step === Step.Confirm &&
      this.flowDirection === FlowDirection.Forward
    ) {
      this.commitActiveFromConfirm();
      return;
    }

    if (
      this.committed === CommittedState.Active &&
      this.step === Step.Confirm &&
      this.flowDirection === FlowDirection.Backward
    ) {
      this.commitIdleFromConfirmBackward();
    }
  }

  onSecondaryActionClick() {
    if (this.disabled) return;
    if (this.transitionPending) return;
    if (
      this.committed === CommittedState.Active &&
      this.step === Step.Active &&
      this.flowDirection === FlowDirection.Backward
    ) {
      this.enterConfirm();
    }
  }

  private activateConfirmHint() {
    if (this.disabled) return;
    if (this.step !== Step.Confirm) return;
    if (this.transitionPending) return;
    this.startConfirmTimeout();
    this.triggerConfirmHint();
  }

  onConfirmPointerDown(event: PointerEvent) {
    if (this.disabled) return;
    if (this.step !== Step.Confirm) return;
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
    if (this.disabled || this.step !== Step.Confirm || this.transitionPending)
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
    if (this.step !== Step.Confirm) return;
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
    if (this.disabled || this.step !== Step.Confirm) return;
    this.swipeAutopassTimeoutId = window.setTimeout(() => {
      this.swipeAutopassTimeoutId = undefined;
      if (this.disabled || this.step !== Step.Confirm) return;
      if (
        this.committed === CommittedState.Idle &&
        this.flowDirection === FlowDirection.Forward
      ) {
        this.commitActiveFromConfirm();
        return;
      }
      if (
        this.committed === CommittedState.Active &&
        this.flowDirection === FlowDirection.Backward
      ) {
        this.commitIdleFromConfirmBackward();
      }
    }, SWIPE_AUTOPASS_MS);
  }

  private setDragCssX(px: number) {
    this.style.setProperty('--obc-two-step-switch-drag-x', `${px}px`);
  }

  private resetDrag() {
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
    if (this.step !== Step.Idle && this.step !== Step.Active) return false;

    if (role === 'primary') {
      return (
        this.committed === CommittedState.Idle &&
        this.step === Step.Idle &&
        this.flowDirection === FlowDirection.Forward
      );
    }

    return (
      this.committed === CommittedState.Active &&
      this.step === Step.Active &&
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
    this.setDragCssX(clamped);

    if (clamped >= DRAG_COMPLETE_THRESHOLD_PX) {
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
    this.setDragCssX(clamped);

    if (clamped >= DRAG_COMPLETE_THRESHOLD_PX) {
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

  private resolvePrimaryText() {
    const isBackwardConfirm =
      this.step === 'confirm' && this.flowDirection === 'backward';
    if (isBackwardConfirm) {
      return this.activeActionLabel.trim();
    }
    return this.idleActionLabel.trim();
  }

  private resolveConfirmText() {
    return 'Confirm';
  }

  private resolveFillText() {
    const isBackwardTransitionPhase =
      this.phase === Phase.ActiveExpand ||
      this.phase === Phase.ActiveShrinkPull;
    const isBackwardTransitionFill =
      this.committed === CommittedState.Active &&
      this.flowDirection === FlowDirection.Backward &&
      (this.step === Step.Confirm ||
        (this.step === Step.Active && isBackwardTransitionPhase));

    return isBackwardTransitionFill
      ? this.idleStateLabel.trim()
      : this.activeStateLabel.trim();
  }

  private resolveSecondaryLabelText() {
    return this.committed === 'active'
      ? this.activeStateLabel.trim()
      : this.idleStateLabel.trim();
  }

  private resolveSecondaryActionText() {
    return this.activeActionLabel.trim();
  }

  private resolveStateLabelFor(state: CommittedState) {
    return state === CommittedState.Active
      ? this.activeStateLabel.trim()
      : this.idleStateLabel.trim();
  }

  private resolveActionLabelFor(state: CommittedState) {
    return state === CommittedState.Active
      ? this.activeActionLabel.trim()
      : this.idleActionLabel.trim();
  }

  override render() {
    const rootClasses = classMap(this.buildRootClasses());
    const primaryText = this.resolvePrimaryText();
    const confirmText = this.resolveConfirmText();
    const fillText = this.resolveFillText();
    const secondaryLabelText = this.resolveSecondaryLabelText();
    const secondaryActionText = this.resolveSecondaryActionText();

    const secondaryActionShouldLookEnabled =
      (this.committed === 'active' && this.step === 'active') ||
      (this.step === 'active' &&
        this.flowDirection === 'forward' &&
        this.phase === 'active-shrink-pull');

    const secondaryActionDisabled =
      this.disabled || !secondaryActionShouldLookEnabled;

    return html`
      <div
        class=${rootClasses}
        part="root"
        role="group"
        aria-disabled=${this.disabled ? 'true' : 'false'}
      >
        <div class="track" part="track">
          <div class="fill" part="fill" aria-hidden="true">
            <span class="fill-label" part="fill-label">${fillText}</span>
          </div>

          <div
            class="confirm"
            part="confirm"
            role="button"
            tabindex=${this.step === 'confirm' && !this.disabled ? '0' : '-1'}
            aria-disabled=${this.disabled ? 'true' : 'false'}
            @pointerdown=${this.onConfirmPointerDown}
            @click=${this.onConfirmClick}
            @keydown=${this.handleConfirmKeyDown}
          >
            <span class="confirm-content" part="confirm-content">
              <span class="confirm-label" part="confirm-label"
                >${confirmText}</span
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
            >${primaryText}</obc-button
          >

          <div class="secondary" part="secondary">
            <span
              class="secondary-label"
              part="secondary-label"
              aria-hidden="true"
              @click=${this.onSecondaryLabelClick}
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
              >${secondaryActionText}</obc-button
            >
          </div>
        </div>
      </div>
    `;
  }

  override disconnectedCallback() {
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
