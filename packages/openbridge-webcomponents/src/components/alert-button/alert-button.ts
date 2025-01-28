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
 *
 * @fires click - Fires when the button is clicked.
 */
@customElement('obc-alert-button')
export class ObcAlertButton extends LitElement {
  @property({type: Number}) nAlerts = 0;
  @property({type: String}) alertType = AlertType.None;
  @property({type: Boolean}) standalone = false;
  @property({type: Boolean}) counter = false;

  override render() {
    const isAlarm = this.alertType === AlertType.Alarm;
    const isWarning = this.alertType === AlertType.Warning;
    const isAlarmOrWarning = isAlarm || isWarning;

    return html`
      <button>
        <div class=${classMap({
          wrapper: true,
          [`type-${this.alertType}`]: true,
          counter: this.counter,
          standalone: this.standalone,
          'on': true
        })}>
          <div class="visible-wrapper">
            <obi-alerts-active class="icon"></obi-alerts-active>
            ${this.counter
              ? html`<div class="badge">${this.nAlerts}</div>`
              : null}
          </div>
        </div>
      
      ${isAlarmOrWarning ? html`<div class=${classMap({
          wrapper: true,
          "type-none": true,
          counter: this.counter,
          standalone: this.standalone,
          [`type-${this.alertType}-off`]: true,
          overlay: true
        })}>
          <div class="visible-wrapper">
        <obi-alerts-active class="icon"></obi-alerts-active>
        ${this.counter
          ? html`<div class="badge">${this.nAlerts}</div>`
          : null}
      </div>` : null}
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
