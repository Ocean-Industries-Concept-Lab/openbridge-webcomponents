import {LitElement, html, unsafeCSS} from 'lit';
import {property, state} from 'lit/decorators.js';
import {classMap} from 'lit/directives/class-map.js';
import componentStyle from './two-step-action.css?inline';
import '../../icons/icon-check-google.js';
import '../../icons/icon-chevron-right-google.js';
import '../../icons/icon-chevron-double-right-google.js';
import '../button/button.js';
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
const ARMED_SLIDE_DURATION_MS = 900;
const THUMB_DRAG_COMPLETE_TO_ARMED_MS = 320;

/** Two-step action control: `enabled` -> `armed` -> `active`, with auto-reset from `armed`. */
@customElement('obc-two-step-action')
export class ObcTwoStepAction extends LitElement {
  @property({type: String, reflect: true}) state: ObcTwoStepActionState =
    ObcTwoStepActionState.enabled;

  @property({type: Boolean, reflect: true}) disabled = false;

  @property({type: Number}) armedResetDelay = 1600;

  @state() private labelBounce = false;
  @state() private armedHint = false;
  @state() private armedSlide = false;
  @state() private disarmSlide = false;
  @state() private thumbDragX = 0;
  @state() private thumbDragging = false;
  @state() private thumbCompleting = false;
  private labelBounceTimeout?: number;
  private armedResetTimeout?: number;
  private armedHintTimeout?: number;
  private armedSlideTimeout?: number;
  private disarmSlideTimeout?: number;
  private thumbCompleteTimeout?: number;
  private thumbDragPointerId?: number;
  private thumbDragStartX = 0;
  private thumbDragMaxX = 0;
  private thumbDragThumbWidth = 0;
  private thumbDragVisibleWidth = 0;
  private thumbDragScaleX = 1;
  private thumbDragMoved = false;
  private suppressNextClick = false;

  private getNextState(current: ObcTwoStepActionState) {
    switch (current) {
      case ObcTwoStepActionState.enabled:
        return ObcTwoStepActionState.armed;
      case ObcTwoStepActionState.armed:
        return ObcTwoStepActionState.active;
      default:
        return current;
    }
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

  private isLabelClick(event: Event) {
    const path = event.composedPath();
    return path.some((node) => {
      if (!(node instanceof HTMLElement)) return false;
      return node.classList.contains('state-container');
    });
  }

  private isThumbClick(event: Event) {
    const path = event.composedPath();
    return path.some((node) => {
      if (!(node instanceof HTMLElement)) return false;
      return node.classList.contains('thumb-container');
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

  private clearThumbCompleteTimer() {
    window.clearTimeout(this.thumbCompleteTimeout);
    this.thumbCompleteTimeout = undefined;
  }

  private getArmedHintDurationMs() {
    return this.armedResetDelay > 0
      ? this.armedResetDelay
      : ARMED_HINT_DURATION_MS;
  }

  private scheduleArmedReset() {
    this.clearArmedResetTimer();

    if (
      this.disabled ||
      this.state !== ObcTwoStepActionState.armed ||
      this.armedResetDelay <= 0
    ) {
      return;
    }

    this.armedResetTimeout = window.setTimeout(() => {
      this.resetToEnabled();
    }, this.armedResetDelay);
  }

  private resetToEnabled() {
    if (this.disabled || this.state !== ObcTwoStepActionState.armed) return;

    this.state = ObcTwoStepActionState.enabled;
    this.labelBounce = false;
  }

  private triggerArmedHint() {
    const hintDurationMs = this.getArmedHintDurationMs();

    this.armedHint = false;
    window.requestAnimationFrame(() => {
      this.armedHint = true;
      window.clearTimeout(this.armedHintTimeout);
      this.armedHintTimeout = window.setTimeout(() => {
        this.armedHint = false;
      }, hintDurationMs);
      this.scheduleArmedReset();
    });
  }

  private triggerArmedSlide() {
    this.armedSlide = true;
    window.clearTimeout(this.armedSlideTimeout);
    this.armedSlideTimeout = window.setTimeout(() => {
      this.armedSlide = false;
    }, ARMED_SLIDE_DURATION_MS);
  }

  private triggerDisarmSlide() {
    this.disarmSlide = false;
    window.requestAnimationFrame(() => {
      this.disarmSlide = true;
      window.clearTimeout(this.disarmSlideTimeout);
      this.disarmSlideTimeout = window.setTimeout(() => {
        this.disarmSlide = false;
      }, ARMED_SLIDE_DURATION_MS);
    });
  }

  private advanceState() {
    const nextState = this.getNextState(this.state);
    if (nextState === this.state) return;

    const previousState = this.state;
    this.state = nextState;
    if (nextState === ObcTwoStepActionState.active) {
      this.dispatchChange(previousState);
    }
  }

  private handleClick(event: MouseEvent) {
    if (this.disabled) return;
    if (this.thumbCompleting) return;
    if (this.suppressNextClick) {
      this.suppressNextClick = false;
      return;
    }
    if (
      this.state === ObcTwoStepActionState.enabled &&
      this.isLabelClick(event)
    ) {
      this.triggerLabelBounce();
      return;
    }

    if (
      this.state === ObcTwoStepActionState.enabled &&
      this.isThumbClick(event)
    ) {
      this.triggerArmedSlide();
      this.advanceState();
      return;
    }
    if (
      this.state === ObcTwoStepActionState.armed &&
      !this.isLabelClick(event)
    ) {
      this.triggerArmedHint();
      return;
    }

    this.advanceState();
  }

  private stopThumbDrag(target?: HTMLElement, keepPosition = false) {
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
    if (!keepPosition) this.thumbDragX = 0;
    this.thumbDragPointerId = undefined;
    this.thumbDragMoved = false;
    this.thumbDragStartX = 0;
    this.thumbDragMaxX = 0;
    this.thumbDragThumbWidth = 0;
    this.thumbDragVisibleWidth = 0;
    this.thumbDragScaleX = 1;
  }

  private tryAdvanceToArmedByDrag() {
    if (this.state !== ObcTwoStepActionState.enabled || this.disabled) return;

    this.triggerArmedSlide();
    this.advanceState();
    this.suppressNextClick = false;
  }

  private completeThumbDragToArmed(target: HTMLElement) {
    const completionX = this.thumbDragMaxX;
    const startX = this.thumbDragX;
    this.stopThumbDrag(target, true);
    this.thumbDragX = startX;
    this.thumbCompleting = true;
    this.suppressNextClick = true;
    window.requestAnimationFrame(() => {
      this.thumbDragX = completionX;
    });
    this.clearThumbCompleteTimer();
    this.thumbCompleteTimeout = window.setTimeout(() => {
      this.thumbCompleting = false;
      this.thumbDragX = 0;
      this.tryAdvanceToArmedByDrag();
    }, THUMB_DRAG_COMPLETE_TO_ARMED_MS);
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
    const visibleWidth = visible.offsetWidth || 1;

    this.thumbDragPointerId = event.pointerId;
    this.thumbDragStartX = event.clientX;
    this.thumbDragThumbWidth = thumb.offsetWidth;
    this.thumbDragVisibleWidth = visible.offsetWidth;
    this.thumbDragMaxX = Math.max(
      0,
      this.thumbDragVisibleWidth - this.thumbDragThumbWidth
    );
    this.thumbDragScaleX = Math.max(0.01, visibleRect.width / visibleWidth);
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
    if (nextDragX > 3) this.thumbDragMoved = true;

    const thumbCenterX = nextDragX + this.thumbDragThumbWidth / 2;
    const parentMidX = this.thumbDragVisibleWidth / 2;

    if (thumbCenterX >= parentMidX) {
      const thumb = event.currentTarget as HTMLElement;
      this.completeThumbDragToArmed(thumb);
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

  override updated(changedProperties: Map<string, unknown>) {
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

    if (
      changedProperties.has('state') ||
      changedProperties.has('disabled') ||
      changedProperties.has('armedResetDelay')
    ) {
      this.scheduleArmedReset();
    }

    if (this.state !== ObcTwoStepActionState.armed) {
      this.armedHint = false;
      window.clearTimeout(this.armedHintTimeout);
      this.armedHintTimeout = undefined;

      this.armedSlide = false;
      window.clearTimeout(this.armedSlideTimeout);
      this.armedSlideTimeout = undefined;
    }

    if (this.state !== ObcTwoStepActionState.enabled) {
      this.disarmSlide = false;
      window.clearTimeout(this.disarmSlideTimeout);
      this.disarmSlideTimeout = undefined;
    }

    if (this.state !== ObcTwoStepActionState.enabled && this.thumbCompleting) {
      this.thumbCompleting = false;
      this.thumbDragX = 0;
      this.clearThumbCompleteTimer();
    }
  }

  override render() {
    const isEnabled = this.state === ObcTwoStepActionState.enabled;
    const isArmed = this.state === ObcTwoStepActionState.armed;
    const isActive = this.state === ObcTwoStepActionState.active;

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
        })}
        ?disabled=${this.disabled}
        @click=${this.handleClick}
        part="wrapper"
        style=${`--armed-hint-duration: ${this.getArmedHintDurationMs()}ms; --thumb-drag-x: ${this.thumbDragX}px;`}
        aria-label="Two step action"
        aria-pressed=${isActive ? 'true' : 'false'}
      >
        <div class="visible-wrapper" part="visible-wrapper">
          <div
            class=${classMap({
              'thumb-container': true,
              'thumb-dragging': this.thumbDragging,
              'thumb-completing': this.thumbCompleting,
            })}
            style=${`--thumb-drag-x: ${this.thumbDragX}px;`}
            part="thumb-container"
            @pointerdown=${this.handleThumbPointerDown}
            @pointermove=${this.handleThumbPointerMove}
            @pointerup=${this.handleThumbPointerUp}
            @pointercancel=${this.handleThumbPointerCancel}
          >
            <div class="thumb-visible" part="thumb-visible">
              ${isArmed
                ? html`<obi-chevron-double-right-google
                    class="icon"
                  ></obi-chevron-double-right-google>`
                : html`<obi-chevron-right-google
                    class="icon"
                  ></obi-chevron-right-google>`}
            </div>
          </div>

          <obc-button
            class="state-container"
            variant="normal"
            .disabled=${this.disabled}
            part="state-container"
          >
            <slot>Action</slot>
          </obc-button>

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
    window.clearTimeout(this.armedHintTimeout);
    window.clearTimeout(this.armedSlideTimeout);
    window.clearTimeout(this.disarmSlideTimeout);
    this.clearThumbCompleteTimer();
  }

  static override styles = unsafeCSS(componentStyle);
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-two-step-action': ObcTwoStepAction;
  }
}
