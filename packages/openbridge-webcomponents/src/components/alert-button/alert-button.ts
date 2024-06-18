import {LitElement, html, unsafeCSS} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import compentStyle from './alert-button.css?inline';
import '../../icons/icon-14-alerts';
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
    console.log(
      'alertType',
      this.alertType,
      this.blinkAlarmValue,
      this.blinkWarningValue
    );
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
          <obi-14-alerts class="icon"></obi-14-alerts>
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
