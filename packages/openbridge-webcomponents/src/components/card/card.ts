import {LitElement, unsafeCSS} from 'lit';
import {property, query, state} from 'lit/decorators.js';
import compentStyle from './card.css?inline';
import {literal, html} from 'lit-html/static.js';
import '../icon-button/icon-button.js';
import '../../icons/icon-close-google.js';
import '../../icons/icon-chevron-right-google.js';
import {classMap} from 'lit/directives/class-map.js';
import {customElement} from '../../decorator.js';

/**
 * `<obc-card>` – A flexible container component for grouping related content and actions.
 *
 * The card component visually separates content from the surrounding UI, providing a distinct surface for information, controls, or interactive elements. It can be used as a static section or as an interactive element that opens a dialog for additional details or actions.
 *
 * ---
 *
 * ### Features
 * - **Standard Card:** Renders as a simple section with a header (title slot) and content area. Use for grouping information or controls.
 * - **Dialog Mode:** When `hasDialog` is set, the card becomes clickable and opens a modal dialog anchored to the card. The dialog displays additional content and a title, with an optional auto-dismiss countdown.
 * - **Dialog Auto-Dismiss:** The dialog can automatically close after a configurable timeout (`dialogTimeOutSeconds`). A visible countdown indicator appears for the last portion of the dialog's visibility (`dialogVisibleTimerSeconds`).
 * - **User Activity Reset:** Dialog timeout resets on user activity (mouse, keyboard, or touch), ensuring dialogs don't close while the user is interacting.
 * - **Header Actions:** In dialog mode, a close button is provided in the dialog header, with a progress indicator during countdown.
 *
 * ---
 *
 * ### Usage Guidelines
 * - Use `<obc-card>` to visually group related content, such as summaries, settings, or preview information.
 * - Enable `hasDialog` when you want to provide additional details or actions in a modal overlay, without navigating away from the main context.
 * - The dialog is ideal for secondary information, quick edits, or contextual actions that should not disrupt the main workflow.
 * - Avoid placing critical or persistent information only in the dialog, as it may be dismissed automatically.
 * - **TODO(designer):** Confirm recommended use cases for dialog mode vs. regular card, and any specific design constraints for dialog content.
 *
 * ---
 *
 * ### Slots
 * | Slot Name        | Renders When...          | Purpose                                            |
 * |------------------|-------------------------|----------------------------------------------------|
 * | `title`          | Always                   | Main card header/title.                            |
 * | (default)        | Always                   | Main card content area.                            |
 * | `dialog-title`   | `hasDialog` is true      | Title/header for the dialog overlay.               |
 * | `dialog-content` | `hasDialog` is true      | Content area for the dialog overlay.               |
 *
 * ---
 *
 * ### Properties
 * - `hasDialog` (boolean): Enables dialog mode. When true, the card acts as a button and opens a modal dialog on click. (Default: false)
 * - `dialogTimeOutSeconds` (number): Total time in milliseconds before the dialog auto-closes. (Default: 20000)
 * - `dialogVisibleTimerSeconds` (number): Duration in milliseconds for which the countdown indicator is shown before auto-dismiss. (Default: 10000)
 *   - The countdown indicator appears for the last `dialogVisibleTimerSeconds` milliseconds of the dialog's lifetime.
 *   - User activity resets the dialog timer, preventing premature dismissal.
 *
 * ---
 *
 * ### Best Practices & Constraints
 * - The dialog overlay is anchored to the card and overlays the main content.
 * - Only use dialog mode for supplemental or transient information.
 * - Ensure dialog content is concise and actionable, as dialogs may auto-dismiss.
 * - The close button in the dialog header allows manual dismissal at any time.
 * - **TODO(designer):** Specify if there are recommended minimum/maximum content lengths or layout constraints for dialog content.
 *
 * ---
 *
 * ### Example:
 * ```html
 * <obc-card hasDialog>
 *   <div slot="title">Settings</div>
 *   <div>Summary content here</div>
 *   <div slot="dialog-title">Edit Settings</div>
 *   <div slot="dialog-content">Dialog details and actions</div>
 * </obc-card>
 * ```
 *
 * @slot title - Card header/title slot.
 * @slot - Default slot for main card content.
 * @slot dialog-title - Dialog overlay header/title (shown when `hasDialog` is true).
 * @slot dialog-content - Dialog overlay content (shown when `hasDialog` is true).
 */
@customElement('obc-card')
export class ObcCard extends LitElement {
  /**
   * Enables dialog mode. When true, the card acts as a button and opens a modal dialog on click.
   *
   * When `hasDialog` is false, the card is a static container. When true, clicking the card opens a modal dialog overlay, displaying content from the `dialog-title` and `dialog-content` slots.
   *
   * @default false
   */
  @property({type: Boolean}) hasDialog = false;

  /**
   * Total time in milliseconds before the dialog auto-closes.
   *
   * When the dialog is open, it will automatically close after this duration unless reset by user activity. The countdown indicator appears for the last `dialogVisibleTimerSeconds` milliseconds.
   *
   * @default 20000
   */
  @property({type: Number}) dialogTimeOutSeconds = 20_000;

  /**
   * Duration in milliseconds for which the countdown indicator is shown before auto-dismiss.
   *
   * The countdown indicator is visible for the last `dialogVisibleTimerSeconds` milliseconds of the dialog's lifetime. User activity resets the timer.
   *
   * @default 10000
   */
  @property({type: Number}) dialogVisibleTimerSeconds = 10_000;

  @query('dialog') dialog!: HTMLDialogElement;

  @state() private countdownSeconds = 0;
  @state() private showCountdown = false;

  private dialogTimer?: number;
  private countdownTimer?: number;
  private countdownStartTimer?: number;
  private userActivityHandler?: () => void;

  override render() {
    const wrapperTag = this.hasDialog ? literal`button` : literal`section`;
    return html`
      <${wrapperTag} class=${classMap({wrapper: true, 'has-dialog': this.hasDialog})} @click=${this.openDialog}>
      <div class="header">
        <div></div>
        <div class="title">
          <slot name="title"></slot>
        </div>
        ${
          this.hasDialog
            ? html`
                <obi-chevron-right-google
                  class="icon"
                ></obi-chevron-right-google>
              `
            : html`<div></div>`
        }
        </div>
        <div class="content">
          <slot></slot>
        </div>
      </${wrapperTag}>
      ${
        this.hasDialog
          ? html`
              <dialog class="dialog-wrapper" closedby="any" popover>
                <div class="header">
                  <div></div>
                  <div class="title">
                    <slot name="dialog-title"></slot>
                  </div>
                  <div class="actions">
                    <obc-icon-button
                      @click=${this.closeDialog}
                      variant="flat"
                      .progress=${this.showCountdown
                        ? this.getProgressPercentage()
                        : undefined}
                    >
                      <obi-close-google></obi-close-google>
                    </obc-icon-button>
                  </div>
                </div>

                <div class="content">
                  <slot name="dialog-content"></slot>
                </div>
              </dialog>
            `
          : ''
      }
    `;
  }

  closeDialog(e: Event) {
    e.stopPropagation();
    this.clearAllTimers();
    this.removeUserActivityListeners();
    this.dialog.close();
  }

  openDialog() {
    this.dialog.showModal();
    this.startDialogTimer();
    this.addUserActivityListeners();
  }

  private startDialogTimer() {
    this.clearAllTimers();

    // Start countdown when dialogVisibleTimerSeconds is reached
    const countdownStartTime =
      this.dialogTimeOutSeconds - this.dialogVisibleTimerSeconds;

    // Timer for when to start countdown
    this.countdownStartTimer = window.setTimeout(() => {
      this.startCountdown();
    }, countdownStartTime);

    // Main timer for closing dialog
    this.dialogTimer = window.setTimeout(() => {
      this.dialog.close();
      this.clearAllTimers();
    }, this.dialogTimeOutSeconds);
  }

  private startCountdown() {
    this.showCountdown = true;
    const startTime = performance.now();
    const totalDuration = this.dialogVisibleTimerSeconds;

    const updateCountdown = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const remaining = Math.max(0, totalDuration - elapsed);

      this.countdownSeconds = remaining / 1000;

      if (remaining <= 0) {
        this.clearAllTimers();
        return;
      }

      this.countdownTimer = requestAnimationFrame(updateCountdown);
    };

    this.countdownTimer = requestAnimationFrame(updateCountdown);
  }

  private clearAllTimers() {
    if (this.dialogTimer) {
      clearTimeout(this.dialogTimer);
      this.dialogTimer = undefined;
    }

    if (this.countdownTimer) {
      cancelAnimationFrame(this.countdownTimer);
      this.countdownTimer = undefined;
    }

    if (this.countdownStartTimer) {
      clearTimeout(this.countdownStartTimer);
      this.countdownStartTimer = undefined;
    }

    this.showCountdown = false;
    this.countdownSeconds = 0;
  }

  private getProgressPercentage(): number {
    const totalSeconds = this.dialogVisibleTimerSeconds / 1000;
    const progress = (this.countdownSeconds / totalSeconds) * 100;
    return Math.max(0, progress);
  }

  private addUserActivityListeners() {
    this.userActivityHandler = () => {
      this.resetDialogTimer();
    };

    window.addEventListener('mousemove', this.userActivityHandler);
    window.addEventListener('touchstart', this.userActivityHandler);
    window.addEventListener('touchmove', this.userActivityHandler);
    window.addEventListener('keydown', this.userActivityHandler);
  }

  private removeUserActivityListeners() {
    if (this.userActivityHandler) {
      window.removeEventListener('mousemove', this.userActivityHandler);
      window.removeEventListener('touchstart', this.userActivityHandler);
      window.removeEventListener('touchmove', this.userActivityHandler);
      window.removeEventListener('keydown', this.userActivityHandler);
      this.userActivityHandler = undefined;
    }
  }

  private resetDialogTimer() {
    this.clearAllTimers();
    this.startDialogTimer();
  }

  override disconnectedCallback() {
    super.disconnectedCallback();
    this.clearAllTimers();
    this.removeUserActivityListeners();
  }

  static override styles = unsafeCSS(compentStyle);
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-card': ObcCard;
  }
}
