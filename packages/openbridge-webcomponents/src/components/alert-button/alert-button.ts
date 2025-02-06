import {LitElement, html, unsafeCSS} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import compentStyle from './alert-button.css?inline';
import '../../icons/icon-alerts';
import '../../icons/icon-alerts-active';
import '../../icons/icon-notification';
import '../../icons/icon-notification-filled';
import '../../icons/icon-notification-advice';
import '../../icons/icon-notification-advice-active';
import {AlertType} from '../../types';
import {classMap} from 'lit/directives/class-map.js';

/**
 * Button used for alerts and notification
 *
 * @prop {number} nAlerts - Number of alerts.
 * @prop {AlertType} alertType - Type of alert.
 * @prop {boolean} standalone - If the button is standalone and not used together with an notification-message.
 * @prop {boolean} counter - If the button should display a counter.
 *
 * @fires click - Fires when the button is clicked.
 */
@customElement('obc-alert-button')
export class ObcAlertButton extends LitElement {
  @property({type: Number}) nAlerts = 0;
  @property({type: String}) alertType = AlertType.Alarm;
  @property({type: Boolean}) flatWhenIdle = false;
  @property({type: Boolean}) standalone = false;
  @property({type: Boolean}) counter = false;

  private alertIcon() {
    const isIdle = this.nAlerts === 0;
    switch (this.alertType) {
      /*
      case AlertType.Advice:
        if (isIdle) {
          return html`<obi-notification-advice
            class="icon"
          ></obi-notification-advice>`;
        } else {
          return html`<obi-notification-advice-active
            class="icon"
          ></obi-notification-advice-active>`;
        }
          */
      case AlertType.Notification:
        if (isIdle) {
          return html`<obi-notification class="icon"></obi-notification>`;
        } else {
          return html`<obi-notification-filled
            class="icon"
          ></obi-notification-filled>`;
        }
      default:
        if (isIdle) {
          return html`<obi-alerts class="icon"></obi-alerts>`;
        } else {
          return html`<obi-alerts-active class="icon"></obi-alerts-active>`;
        }
    }
  }

  override render() {
    const isAlarm = this.alertType === AlertType.Alarm;
    const isWarning = this.alertType === AlertType.Warning;
    const hasAlerts = this.nAlerts > 0;
    const isAlarmOrWarning = (isAlarm || isWarning) && hasAlerts;

    let activeAlertType: string = this.alertType;
    if (!hasAlerts) {
      if (this.flatWhenIdle) {
        activeAlertType = 'flat';
      } else {
        activeAlertType = 'none';
      }
    }
    return html`
      <button>
        <div
          class=${classMap({
            wrapper: true,
            [`type-${activeAlertType}`]: true,
            counter: this.counter,
            standalone: this.standalone,
            on: true,
          })}
        >
          <div class="visible-wrapper">
            ${this.alertIcon()}
            ${this.counter && hasAlerts
              ? html`<div class="badge">${this.nAlerts}</div>`
              : null}
          </div>
        </div>

        ${isAlarmOrWarning
          ? html`<div
              class=${classMap({
                wrapper: true,
                'type-none': true,
                counter: this.counter,
                standalone: this.standalone,
                [`type-${this.alertType}-off`]: true,
                overlay: true,
              })}
            >
              <div class="visible-wrapper">
                ${this.nAlerts > 0
                  ? html`<obi-alerts-active class="icon"></obi-alerts-active>`
                  : html`<obi-alerts class="icon"></obi-alerts>`}
                ${this.counter
                  ? html`<div class="badge">${this.nAlerts}</div>`
                  : null}
              </div>
            </div>`
          : null}
      </button>
    `;
  }

  static override styles = unsafeCSS(compentStyle);
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-alert-button': ObcAlertButton;
  }
}
