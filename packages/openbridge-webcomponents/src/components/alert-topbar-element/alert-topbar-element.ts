import { LitElement, html, unsafeCSS } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import compentStyle from './alert-topbar-element.css?inline';
import '../alert-button/alert-button';
import '../notification-button/notification-button';
import '../notification-message/notification-message';

import '../../icons/icon-sound-off-fill';
import { AlertType } from '../../types';
import { classMap } from 'lit/directives/class-map.js';

import { localized, msg } from '@lit/localize';

/**
 * Element that displays the alert in topbar
 * Use the element in the alerts slot in topbar
 *
 * @prop {number} nAlerts - Number of alerts.
 * @prop {AlertType} alertType - Type of alert.
 * @prop {boolean} blinkAlarmValue - This value should alternate between true and false to make the icon blink.
 *                       It should be synchronized with the blinkValue of other alarms.
 * @prop {boolean} blinkWarningValue - This value should alternate between true and false to make the icon blink.
 * @prop {boolean} showAck - If the ack button should be shown.
 * @prop {boolean} alertMuted - If the alert is muted.
 * @prop {boolean} minimized - If the alert is minimized.
 * @prop {number} maxWidth - The maximum width of the alert.
 *
 * @fires muteclick - Fired when the mute button is clicked
 * @fires ackclick - Fired when the ack button is clicked
 * @fires alertclick - Fired when the alert button is clicked
 * @fires messageclick - Fired when the message is clicked
 *
 * @slot  - The message to display in the alert element of type `obc-notification-message-item`
 * @slot empty - The message to display when there are no alerts
 */
@localized()
@customElement('obc-alert-topbar-element')
export class ObcAlertTopbarElement extends LitElement {
  @property({ type: Number }) nAlerts = 0;
  @property({ type: String }) alertType: AlertType = AlertType.None;
  @property({ type: Boolean }) blinkAlarmValue = false;
  @property({ type: Boolean }) blinkWarningValue = false;
  @property({ type: Boolean }) showAck = false;
  @property({ type: Boolean }) alertMuted = false;
  @property({ type: Boolean }) minimized = false;
  @property({ type: Number }) maxWidth = 480;

  override render() {
    const empty = this.nAlerts === 0;
    const disabledMute =
      this.alertMuted ||
      empty ||
      this.alertType === AlertType.None ||
      this.alertType === AlertType.Running ||
      this.alertType === AlertType.Caution;
    let firstPart;
    if (this.minimized) {
      firstPart = html`<obc-notification-button
        icon
        openright
        cornerleft
        @click=${() => this.dispatchEvent(new CustomEvent('muteclick'))}
      >
        <obi-sound-off-fill></obi-sound-off-fill>
      </obc-notification-button>`;
    } else {
      firstPart = html`<obc-notification-message
          class="notification-message"
          .empty=${empty}
          @click=${() => this.dispatchEvent(new CustomEvent('messageclick'))}
        >
          <slot></slot>
          <div slot="empty">${msg('No active alerts')}</div>
        </obc-notification-message>
        ${this.showAck
          ? html`<obc-notification-button
              openright
              @click=${() => this.dispatchEvent(new CustomEvent('ackclick'))}
              >ACK</obc-notification-button
            >`
          : html``}
        <obc-notification-button
          icon
          openright
          .indent=${empty}
          .disabled=${disabledMute}
          @click=${() => this.dispatchEvent(new CustomEvent('muteclick'))}
        >
          <obi-sound-off-fill></obi-sound-off-fill>
        </obc-notification-button>`;
    }
    return html`
      <style>
        :host {
          max-width: ${this.maxWidth}px;
        }
      </style>
      <div
        class=${classMap({
      wrapper: true,
      minimized: this.minimized,
    })}
        style=${`max-width: ${this.maxWidth - 8}px;`}
      >
        ${firstPart}
        <obc-alert-button
          .alertType=${this.alertType}
          .nAlerts=${this.nAlerts}
          .counter=${!empty}
          .blinkAlarmValue=${this.blinkAlarmValue}
          .blinkWarningValue=${this.blinkWarningValue}
          @click=${() => this.dispatchEvent(new CustomEvent('alertclick'))}
        ></obc-alert-button>
      </div>
    `;
  }

  static override styles = unsafeCSS(compentStyle);
}

declare global {
  interface HTMLElementTagNameMap {
    'ob-alert-topbar-element': ObcAlertTopbarElement;
  }
}
