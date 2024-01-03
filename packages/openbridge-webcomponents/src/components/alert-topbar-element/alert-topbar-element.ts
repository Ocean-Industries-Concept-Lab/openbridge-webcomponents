import {LitElement, html} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import compentStyle from './alert-topbar-element.style';
import '../alert-button/alert-button';
import '../notification-button/notification-button';
import '../notification-message/notification-message';

import '../../icons/icon-14-mute';
import {AlertType} from '../../types';
import {classMap} from 'lit/directives/class-map.js';

/**
 * Element that displays the alert in topbar
 * Use the element in the alerts slot in topbar
 *
 * @fires muteclick - Fired when the mute button is clicked
 * @fires ackclick - Fired when the ack button is clicked
 * @fires alertclick - Fired when the alert button is clicked
 * @fires messageclick - Fired when the message is clicked
 *
 * @slot  - The message to display in the alert element of type `obc-notification-message-item`
 */
@customElement('obc-alert-topbar-element')
export class ObcAlertTopbarElement extends LitElement {
  @property({type: Number, attribute: 'n-alerts'}) nAlerts = 0;
  @property({type: String, attribute: 'alert-type'}) alertType: AlertType =
    AlertType.None;
  @property({type: Boolean, attribute: 'show-ack'}) showAck = false;
  @property({type: Boolean, attribute: 'alert-muted'}) alertMuted = false;
  @property({type: Boolean}) minimized = false;
  @property({type: Number, attribute: 'max-width'}) maxWidth = 480;

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
        open-right
        corner-left
        @click=${() => this.dispatchEvent(new CustomEvent('muteclick'))}
      >
        <obi-14-mute></obi-14-mute>
      </obc-notification-button>`;
    } else {
      firstPart = html`<obc-notification-message
          class="notification-message"
          ?empty=${empty}
          @click=${() => this.dispatchEvent(new CustomEvent('messageclick'))}
        >
          <slot></slot>
          <div slot="empty">No active alerts</div>
        </obc-notification-message>
        ${this.showAck
          ? html`<obc-notification-button
              open-right
              @click=${() => this.dispatchEvent(new CustomEvent('ackclick'))}
              >ACK</obc-notification-button
            >`
          : html``}
        <obc-notification-button
          icon
          open-right
          ?indent=${empty}
          ?disabled=${disabledMute}
          @click=${() => this.dispatchEvent(new CustomEvent('muteclick'))}
        >
          <obi-14-mute></obi-14-mute>
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
        style=${`max-width: ${this.maxWidth - 16}px;`}
      >
        ${firstPart}
        <obc-alert-button
          alert-type=${this.alertType}
          n-alerts=${this.nAlerts}
          ?counter=${!empty}
          @click=${() => this.dispatchEvent(new CustomEvent('alertclick'))}
        ></obc-alert-button>
      </div>
    `;
  }

  static override styles = compentStyle;
}

declare global {
  interface HTMLElementTagNameMap {
    'ob-alert-topbar-element': ObcAlertTopbarElement;
  }
}
