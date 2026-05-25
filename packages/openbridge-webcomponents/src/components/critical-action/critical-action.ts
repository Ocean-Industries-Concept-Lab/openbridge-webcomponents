import {LitElement, html, unsafeCSS, type PropertyValues} from 'lit';
import {ifDefined} from 'lit/directives/if-defined.js';
import {property, query, state} from 'lit/decorators.js';
import componentStyle from './critical-action.css?inline';
import {customElement} from '../../decorator.js';
import '../button/button.js';

const CRITICAL_POPUP_CLOSE_FALLBACK_MS = 360;
const CRITICAL_COLLAPSE_MIN_INLINE_PX = 89;

export type ObcCriticalActionConfirmClickEvent = CustomEvent<void>;

/**
 * `<obc-critical-action>` – A guarded critical-action control that expands into a confirm popup and collapses back into a compact trigger.
 *
 * ## Features
 * - **Two-step confirmation**: The trigger expands into a popup that contains a confirm control plus an optional description.
 * - **Auto-collapse**: The popup collapses automatically after `criticalAutoCollapseDelay` milliseconds (set to `0` to disable).
 * - **Collapse animation**: When closing, the popup collapses into the trigger footprint to avoid layout jumps.
 * - **Copy via properties or slots**: `label`, `cancelLabel`, and `criticalDescription`, or matching named slots (slot text overrides the property).
 * - **Accessible naming**: `ariaLabel` names the trigger when set; otherwise the visible `label` is used.
 *
 * ## Slots
 *
 * | Slot Name | Purpose |
 * |-----------|---------|
 * | `cancel` | Cancel button label (plain text only). |
 *
 * ## Usage Guidelines
 * Use this control for actions that require deliberate confirmation and should provide a clear opportunity to cancel. If you only need a two-step guarded activation without a popup, use `<obc-two-step-action>`.
 *
 * @slot cancel - Cancel button label.
 * @fires confirm-click {ObcCriticalActionConfirmClickEvent} When the confirm control is activated.
 */
@customElement('obc-critical-action')
export class ObcCriticalAction extends LitElement {
  @property({type: Boolean, reflect: true}) disabled = false;

  @property({type: String, reflect: false}) label = '';

  @property({type: String, attribute: 'cancel-label'}) cancelLabel = '';

  @property({type: String, attribute: 'critical-description'})
  criticalDescription = '';

  @property({type: Number, attribute: 'critical-auto-collapse-delay'})
  criticalAutoCollapseDelay = 2700;

  @property({type: String, attribute: 'aria-label'})
  override ariaLabel = '';

  @state() private criticalExpanded = false;
  @state() private criticalPopupVisible = false;
  @state() private criticalClosing = false;
  private criticalTriggerWidthPx: number | undefined = undefined;
  @state()
  private criticalPopupAnimationState:
    | 'hidden'
    | 'opening'
    | 'open'
    | 'closing' = 'hidden';

  @query('.critical-popup') private criticalPopup?: HTMLElement;
  @query('obc-button.critical-trigger-button')
  private criticalTriggerButton?: HTMLElement;
  @query('obc-button.critical-popup-confirm')
  private criticalConfirmButton?: HTMLElement;

  private criticalAutoCollapseTimeout?: number;
  private criticalPopupAnimationTimeout?: number;
  private criticalPopupCloseDetach?: () => void;

  private readonly handleSlotChange = () => {
    this.requestUpdate();
  };

  private clearTimeoutId(id: number | undefined) {
    if (id !== undefined) {
      window.clearTimeout(id);
    }
    return undefined;
  }

  private clearCriticalAutoCollapseTimer() {
    this.criticalAutoCollapseTimeout = this.clearTimeoutId(
      this.criticalAutoCollapseTimeout
    );
  }

  private clearCriticalPopupAnimationHandles() {
    this.criticalPopupCloseDetach?.();
    this.criticalPopupCloseDetach = undefined;
    this.criticalPopupAnimationTimeout = this.clearTimeoutId(
      this.criticalPopupAnimationTimeout
    );
  }

  private clearCriticalCollapseInlineStyles() {
    const popup = this.criticalPopup;
    if (popup) {
      popup.style.removeProperty('width');
      popup.style.removeProperty('max-width');
      popup.style.removeProperty('box-sizing');
    }
  }

  private freezeCriticalCollapseWidths() {
    const popup = this.criticalPopup;
    if (!popup) {
      return;
    }
    const pr = popup.getBoundingClientRect();
    popup.style.width = `${pr.width}px`;
    popup.style.maxWidth = `${pr.width}px`;
  }

  private resetCriticalPopupState() {
    this.criticalPopupVisible = false;
    this.criticalPopupAnimationState = 'hidden';
    this.criticalClosing = false;
    this.clearCriticalCollapseInlineStyles();
  }

  private startCriticalPopupCloseTracking(popup: HTMLElement) {
    let finished = false;
    const closeTransitionDone = {transform: false, width: false};

    const tryCompleteFromTransitions = () => {
      if (closeTransitionDone.transform && closeTransitionDone.width) {
        complete();
      }
    };

    const onTransitionEnd = (event: TransitionEvent) => {
      if (event.target !== popup) {
        return;
      }
      const {propertyName} = event;
      if (
        propertyName === 'transform' ||
        propertyName === '-webkit-transform'
      ) {
        closeTransitionDone.transform = true;
      } else if (propertyName === 'width' || propertyName === 'max-width') {
        closeTransitionDone.width = true;
      } else {
        return;
      }
      tryCompleteFromTransitions();
    };

    const detach = () => {
      popup.removeEventListener('transitionend', onTransitionEnd);
      this.criticalPopupAnimationTimeout = this.clearTimeoutId(
        this.criticalPopupAnimationTimeout
      );
      this.criticalPopupCloseDetach = undefined;
    };

    const complete = () => {
      if (finished) {
        return;
      }
      finished = true;
      detach();
      window.requestAnimationFrame(() => this.finishCriticalPopupClose());
    };

    this.criticalPopupCloseDetach = detach;
    popup.addEventListener('transitionend', onTransitionEnd);
    this.criticalPopupAnimationTimeout = window.setTimeout(
      complete,
      CRITICAL_POPUP_CLOSE_FALLBACK_MS
    );
  }

  private startCriticalPopupOpenAnimation() {
    this.clearCriticalCollapseInlineStyles();
    this.clearCriticalPopupAnimationHandles();
    this.criticalPopupVisible = true;
    this.criticalPopupAnimationState = 'opening';
    this.criticalClosing = false;

    void this.updateComplete.then(() => {
      if (!this.criticalPopupVisible) return;
      window.requestAnimationFrame(() => {
        if (!this.criticalExpanded || !this.criticalPopupVisible) return;
        this.criticalPopupAnimationState = 'open';
        this.focusInnerButton(this.criticalConfirmButton);
      });
    });
  }

  private finishCriticalPopupClose() {
    if (this.criticalPopupAnimationState !== 'closing') {
      return;
    }
    this.resetCriticalPopupState();
    this.focusInnerButton(this.criticalTriggerButton);
  }

  private startCriticalPopupCloseAnimation() {
    this.clearCriticalPopupAnimationHandles();
    if (!this.criticalPopupVisible) {
      return;
    }

    this.criticalClosing = true;
    this.criticalPopupAnimationState = 'closing';

    void this.updateComplete.then(() => {
      if (this.criticalPopupAnimationState !== 'closing') {
        return;
      }
      const popup = this.criticalPopup;
      if (!popup) {
        window.requestAnimationFrame(() => this.finishCriticalPopupClose());
        return;
      }

      this.startCriticalPopupCloseTracking(popup);

      void popup.offsetHeight;

      window.requestAnimationFrame(() => {
        if (this.criticalPopupAnimationState !== 'closing') {
          return;
        }
        const triggerW = this.criticalTriggerWidthPx ?? 0;
        const endPopupW = Math.max(
          CRITICAL_COLLAPSE_MIN_INLINE_PX,
          Math.ceil(triggerW)
        );
        popup.style.width = `${endPopupW}px`;
        popup.style.maxWidth = `${endPopupW}px`;
      });
    });
  }

  private collapseCriticalAsCancel({animate = true}: {animate?: boolean} = {}) {
    if (this.disabled || !this.criticalExpanded) return;

    this.clearCriticalAutoCollapseTimer();
    if (!animate) {
      this.clearCriticalPopupAnimationHandles();
      this.resetCriticalPopupState();
      this.criticalExpanded = false;
    } else if (this.criticalPopupVisible) {
      window.requestAnimationFrame(() => {
        if (!this.criticalPopupVisible) {
          return;
        }
        this.freezeCriticalCollapseWidths();
        this.criticalExpanded = false;
        this.startCriticalPopupCloseAnimation();
      });
    }
  }

  private onCriticalTriggerClick = () => {
    if (this.disabled || this.criticalExpanded) return;
    const trigger = this.criticalTriggerButton;
    const triggerW = trigger?.getBoundingClientRect().width ?? 0;
    if (triggerW > 0) {
      this.criticalTriggerWidthPx = triggerW;
    }
    this.criticalExpanded = true;
  };

  private onCriticalConfirmClick = () => {
    if (this.disabled || !this.criticalExpanded) return;
    this.dispatchEvent(
      new CustomEvent<void>('confirm-click', {
        bubbles: true,
        composed: true,
      })
    );
  };

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

  private resolveCancelLabel() {
    return this.resolveLabel('cancel', this.cancelLabel);
  }

  private resolveTriggerAriaLabel() {
    const explicit = this.ariaLabel.trim();
    if (explicit) return explicit;
    const visible = this.label.trim();
    if (visible) return visible;
    return undefined;
  }

  private onCriticalCancelClick = () => {
    this.collapseCriticalAsCancel();
  };

  private onKeyDown = (event: KeyboardEvent) => {
    if (event.key !== 'Escape') {
      return;
    }
    if (!this.criticalExpanded) {
      return;
    }
    event.preventDefault();
    event.stopPropagation();
    this.collapseCriticalAsCancel();
  };

  private focusInnerButton(button?: Element) {
    if (!this.matches(':focus-within')) {
      return;
    }
    const sr = (button as {shadowRoot?: ShadowRoot} | undefined)?.shadowRoot;
    const el = sr?.querySelector('button, a') as HTMLElement | null;
    el?.focus();
  }

  private renderCriticalTriggerButton(label: string) {
    const showPopup = this.criticalExpanded || this.criticalPopupVisible;
    const triggerAriaLabel = this.resolveTriggerAriaLabel();
    return html`
      <obc-button
        class="critical-trigger-button critical-red-button"
        variant="raised"
        ?disabled=${this.disabled}
        aria-label=${ifDefined(triggerAriaLabel)}
        aria-expanded=${showPopup ? 'true' : 'false'}
        @click=${this.onCriticalTriggerClick}
        part="critical-button"
      >
        ${label}
      </obc-button>
    `;
  }

  private renderCriticalCancelButton() {
    const cancelText = this.resolveCancelLabel();
    const cancelAriaLabel = cancelText || undefined;
    return html`
      <obc-button
        class="critical-cancel-button"
        variant="normal"
        ?disabled=${this.disabled}
        aria-label=${ifDefined(cancelAriaLabel)}
        @click=${this.onCriticalCancelClick}
        part="critical-cancel-button"
      >
        ${cancelText}
      </obc-button>
    `;
  }

  private renderCriticalPopup(label: string) {
    const popupAnimationState =
      this.criticalExpanded && this.criticalPopupAnimationState === 'hidden'
        ? 'opening'
        : this.criticalPopupAnimationState;

    return html`
      <div
        class=${`critical-popup critical-popup-${popupAnimationState}`}
        part="critical-popup"
        role="dialog"
        aria-modal="false"
      >
        <obc-button
          class="critical-popup-confirm critical-red-button"
          variant="raised"
          ?disabled=${this.disabled}
          @click=${this.onCriticalConfirmClick}
          part="critical-popup-button"
        >
          ${label}
        </obc-button>

        <div class="critical-description" part="critical-description">
          ${this.criticalDescription}
        </div>

        <div class="critical-popup-bar-track" part="critical-popup-bar-track">
          <div
            class="critical-popup-bar-fill"
            part="critical-popup-bar-fill"
            style=${`animation-duration: ${this.criticalAutoCollapseDelay}ms;`}
          ></div>
        </div>
      </div>
    `;
  }

  private renderCritical() {
    const label = this.label.trim();
    const showPopup = this.criticalExpanded || this.criticalPopupVisible;
    const showCancel = this.criticalExpanded || this.criticalClosing;
    return html`
      <div
        class="critical-button-container"
        part="critical-button-container"
        @keydown=${this.onKeyDown}
      >
        ${showPopup ? this.renderCriticalPopup(label) : null}
        ${showCancel
          ? this.renderCriticalCancelButton()
          : this.renderCriticalTriggerButton(label)}
        <div hidden aria-hidden="true">
          <slot name="cancel"></slot>
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
  }

  override updated(changedProperties: PropertyValues<this>) {
    if (
      changedProperties.has('disabled') ||
      changedProperties.has('criticalDescription')
    ) {
      this.clearCriticalAutoCollapseTimer();
      this.clearCriticalPopupAnimationHandles();
      this.criticalExpanded = false;
      this.resetCriticalPopupState();
    }

    if (changedProperties.has('disabled') && this.disabled) {
      this.collapseCriticalAsCancel();
    }

    if (changedProperties.has('criticalExpanded' as keyof ObcCriticalAction)) {
      this.clearCriticalAutoCollapseTimer();
      if (this.criticalExpanded) {
        this.startCriticalPopupOpenAnimation();
      } else if (!this.criticalClosing && this.criticalPopupVisible) {
        window.requestAnimationFrame(() => {
          if (!this.criticalPopupVisible) {
            return;
          }
          this.startCriticalPopupCloseAnimation();
        });
      }
    }

    if (
      !this.disabled &&
      this.criticalExpanded &&
      this.criticalAutoCollapseDelay > 0
    ) {
      if (this.criticalAutoCollapseTimeout === undefined) {
        this.criticalAutoCollapseTimeout = window.setTimeout(() => {
          this.collapseCriticalAsCancel();
        }, this.criticalAutoCollapseDelay);
      }
    }
  }

  override render() {
    return this.renderCritical();
  }

  override disconnectedCallback() {
    this.renderRoot
      .querySelectorAll('slot')
      .forEach((slot) =>
        slot.removeEventListener('slotchange', this.handleSlotChange)
      );
    super.disconnectedCallback();
    this.clearCriticalAutoCollapseTimer();
    this.clearCriticalPopupAnimationHandles();
  }

  static override styles = unsafeCSS(componentStyle);
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-critical-action': ObcCriticalAction;
  }
}
