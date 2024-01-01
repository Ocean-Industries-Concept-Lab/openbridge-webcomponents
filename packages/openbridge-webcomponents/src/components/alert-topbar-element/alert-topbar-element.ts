import {LitElement, html} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import compentStyle from './alert-topbar-element.style';
import '../alert-button/alert-button';
import '../notification-button/notification-button';
import '../notification-message/notification-message';

import '../../icons/icon-14-mute';
import {AlertType} from '../../types';
import {classMap} from 'lit/directives/class-map.js';

@customElement('obc-alert-topbar-element')
export class ObcAlertTopbarElement extends LitElement {
  @property({type: Number, attribute: 'n-alerts'}) nAlerts = 0;
  @property({type: String, attribute: 'alert-type'}) alertType: AlertType =
    AlertType.None;
  @property({type: Boolean, attribute: 'show-ack'}) showAck = false;
  @property({type: Boolean}) minimized = false;
  @property({type: Number, attribute: 'max-width'}) maxWidth = 480;

  override render() {
    const empty = this.nAlerts === 0;
    const disabledMuteAndAck =
      empty ||
      this.alertType === AlertType.None ||
      this.alertType === AlertType.Running ||
      this.alertType === AlertType.Caution;
    let firstPart;
    if (this.minimized) {
      firstPart = html`<obc-notification-button icon open-right corner-left>
        <obi-14-mute></obi-14-mute>
      </obc-notification-button>`;
    } else {
      firstPart = html`<obc-notification-message
          class="notification-message"
          ?empty=${empty}
        >
          <slot name="alert-message"></slot>
          <div slot="empty">No active alerts</div>
        </obc-notification-message>
        ${this.showAck && !disabledMuteAndAck
          ? html`<obc-notification-button open-right
              >ACK</obc-notification-button
            >`
          : html``}
        <obc-notification-button
          icon
          open-right
          ?indent=${empty}
          ?disabled=${disabledMuteAndAck}
        >
          <obi-14-mute></obi-14-mute>
        </obc-notification-button>`;
    }
    return html`
      <div
        class=${classMap({
          wrapper: true,
          minimized: this.minimized,
        })}
        style=${`max-width: ${this.maxWidth}px;`}
      >
        ${firstPart}
        <obc-alert-button
          alert-type=${this.alertType}
          n-alerts=${this.nAlerts}
          ?counter=${!empty}
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
