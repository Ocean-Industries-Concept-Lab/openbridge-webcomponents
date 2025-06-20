import {LitElement, unsafeCSS} from 'lit';
import {property, query, state} from 'lit/decorators.js';
import compentStyle from './card.css?inline';
import {literal, html} from 'lit-html/static.js';
import '../icon-button/icon-button.js';
import '../../icons/icon-close-google.js';
import '../../icons/icon-chevron-right-google.js';
import {classMap} from 'lit/directives/class-map.js';
import {customElement} from '../../decorator.js';

@customElement('obc-card')
export class ObcCard extends LitElement {
  @property({type: Boolean}) hasDialog = false;
  @property({type: Number}) dialogTimeOutSeconds = 20_000;
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
