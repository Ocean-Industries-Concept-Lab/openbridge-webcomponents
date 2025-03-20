import {LitElement, html, unsafeCSS} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import compentStyle from './alert-button.css?inline';
import '../../icons/icon-alerts.js';
import '../../icons/icon-alerts-active.js';
import '../../icons/icon-notification.js';
import '../../icons/icon-notification-filled.js';
import '../../icons/icon-notification-advice.js';
import '../../icons/icon-notification-advice-active.js';
import '../../icons/icon-silence-iec.js';
import {AlertType} from '../../types.js';
import {classMap} from 'lit/directives/class-map.js';

export enum ObcAlertButtonType {
  Flat = 'flat',
  Normal = 'normal',
  Enhanced = 'enhanced',
}

/**
 * Button used for alerts and notification
 *
 * @prop {number} nAlerts - Number of alerts.
 * @prop {AlertType} alertType - Type of alert.
 * @prop {boolean} standalone - If the button is standalone and not used together with an notification-message.
 * @prop {boolean} counter - If the button should display a counter.
 *
 * @fires click-alert - Fires when the button is clicked.
 * @fires click-silence - Fires when the silence button is clicked.
 */
@customElement('obc-alert-button')
export class ObcAlertButton extends LitElement {
  @property({type: Number}) nAlerts = 0;
  @property({type: String}) alertType?: AlertType;
  @property({type: String}) type = ObcAlertButtonType.Normal;
  @property({type: Boolean}) showSilenceButton = false;
  @property({type: Boolean}) silenceButtonDisabled = false;
  @property({type: Boolean}) counter = false;

  private alertIcon() {
    const isIdle = this.nAlerts === 0;
    if (isIdle) {
      return html`<obi-alerts class="icon"></obi-alerts>`;
    } else {
      if (this.type === ObcAlertButtonType.Enhanced) {
        return html`<obi-alerts-active class="icon"></obi-alerts-active>`;
      }
      return html`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M7 18V17V10C7 8.8344 7.3454 7.82165 8.04034 6.92517C8.73476 6.02937 9.62425 5.44971 10.7425 5.17014L11.5 4.98078V4.2V3.5C11.5 3.34552 11.5426 3.24661 11.6446 3.14461C11.7466 3.04261 11.8455 3 12 3C12.1545 3 12.2534 3.04261 12.3554 3.14461C12.4574 3.24661 12.5 3.34552 12.5 3.5V4.2V4.98078L13.2575 5.17014C14.3758 5.44971 15.2652 6.02937 15.9597 6.92517C16.6546 7.82165 17 8.8344 17 10V17V18H7Z" fill="var(--icon-fill)" stroke="var(--icon-stroke)" stroke-width="2"/>
      </svg>
      `; 
    }
  }

  override render() {
    const isAlarm = this.alertType === AlertType.Alarm;
    const isWarning = this.alertType === AlertType.Warning;
    const hasAlerts = this.nAlerts > 0;
    const isAlarmOrWarning = (isAlarm || isWarning) && hasAlerts;

    return html`
    <div class=${classMap({
            wrapper: true,
            [`alert-type-${this.alertType ?? 'none'}`]: true,
            counter: this.counter,
            'has-silence': this.showSilenceButton,
            [`type-${this.type}`]: true,
            on: true,
          })}>
      <button class="alert-button" @click=${() => this.dispatchEvent(new CustomEvent('click-alert'))}>
         <div class="visible-wrapper">
            ${this.alertIcon()}
            ${this.counter && hasAlerts
              ? html`<div class="badge">${this.nAlerts}</div>`
              : null}
        </div>
      </button>
      ${this.showSilenceButton
        ? html`
            <button
              class="silence-button"
              @click=${() => this.dispatchEvent(new CustomEvent('click-silence'))}
              ?disabled=${this.silenceButtonDisabled}
            >
              <div class="visible-wrapper">
                <obi-silence-iec class="icon"></obi-silence-iec>
              </div>
            </button>
          `
        : null}
    </div>
    `;
  }

  static override styles = unsafeCSS(compentStyle);
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-alert-button': ObcAlertButton;
  }
}
