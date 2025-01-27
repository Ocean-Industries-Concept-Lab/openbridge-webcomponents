import {LitElement, html, unsafeCSS} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import compentStyle from './alert-button.css?inline';
import '../../icons/icon-alerts-active';
import {AlertType} from '../../types';
import {classMap} from 'lit/directives/class-map.js';

/**
 * Button used for alerts and notification
 *
 * @prop {number} nAlerts - Number of alerts.
 * @prop {AlertType} alertType - Type of alert.
 * @prop {boolean} standalone - If the button is standalone and not used together with an notification-message.
 * @prop {boolean} counter - If the button should display a counter.
 * @prop {boolean} blinkAlarmValue - This value should alternate between true and false to make the icon blink.
 *                        It should be synchronized with the blinkValue of other alarms.
 * @prop {boolean} blinkWarningValue - This value should alternate between true and false to make the icon blink.
 *
 * @fires click - Fires when the button is clicked.
 */
@customElement('obc-alert-button')
export class ObcAlertButton extends LitElement {
  @property({type: Number}) nAlerts = 0;
  @property({type: String}) alertType = AlertType.None;
  @property({type: Boolean}) standalone = false;
  @property({type: Boolean}) counter = false;
  @property({type: Boolean}) blinkAlarmValue = false;
  @property({type: Boolean}) blinkWarningValue = false;

  override render() {
    let alertType = this.alertType;
    if (this.alertType === AlertType.Alarm && !this.blinkAlarmValue) {
      alertType = AlertType.None;
    } else if (
      this.alertType === AlertType.Warning &&
      !this.blinkWarningValue
    ) {
      alertType = AlertType.None;
    }
    return html`
      <button
        class=${classMap({
          wrapper: true,
          [`type-${alertType}`]: true,
          counter: this.counter,
          standalone: this.standalone,
        })}
      >
        <div class="visible-wrapper">
          <obi-alerts-active class="icon"></obi-alerts-active>
          ${this.counter
            ? html`<div class="badge">${this.nAlerts}</div>`
            : null}
        </div>
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
