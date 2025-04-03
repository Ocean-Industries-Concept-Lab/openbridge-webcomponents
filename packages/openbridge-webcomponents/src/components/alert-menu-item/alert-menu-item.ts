import {LitElement, html, nothing, unsafeCSS} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import {choose} from 'lit/directives/choose.js';

import compentStyle from './alert-menu-item.css?inline';
import '../message-menu-item/message-menu-item.js';
import '../alert-icon/alert-icon.js';
import '../../icons/icon-alerts-shelf.js';
import '../../icons/icon-alarm-noack-iec.js';
import '../../icons/icon-warning-noack-iec.js';
import {ObcMessageMenuItemSize} from '../message-menu-item/message-menu-item.js';

export enum ObcAlertMenuItemStatus {
  Unacknowledged = 'unacknowledged',
  Caution = 'caution',
  Acknowledged = 'acknowledged',
  NoAckAlarm = 'no-ack-alarm',
  NoAckWarning = 'no-ack-warning',
}

/**
 *
 * @fires ack-click - Fired when the ack button is clicked
 */
@customElement('obc-alert-menu-item')
export class ObcAlertMenuItem extends LitElement {
  @property({type: Boolean}) hasIcon = false;
  @property({type: Boolean}) shelved = false;
  @property({type: Boolean}) hasDay = false;
  @property({type: Boolean}) hasTime = false;
  @property({type: String}) status = ObcAlertMenuItemStatus.Unacknowledged;
  @property({type: Boolean}) open = false;
  @property({type: String}) size: ObcMessageMenuItemSize =
    ObcMessageMenuItemSize.SingleLine;

  override render() {
    return html`
      <obc-message-menu-item
        .hasActionButton=${this.status ===
        ObcAlertMenuItemStatus.Unacknowledged}
        .size=${this.size}
        .open=${this.open}
        enhancedIcon
      >
        ${this.shelved
          ? html`<obi-alerts-shelf slot="tertiary-icon"></obi-alerts-shelf>`
          : nothing}
        <slot name="alert-icon" slot="primary-icon"></slot>
        ${this.hasIcon
          ? html`<slot name="icon" slot="secondary-icon"></slot>`
          : nothing}
        <slot name="title" slot="title"></slot>
        <slot name="description" slot="description"></slot>
        ${this.hasDay ? html`<slot name="day" slot="day"></slot>` : nothing}
        ${this.hasTime ? html`<slot name="time" slot="time"></slot>` : nothing}
        ${choose(this.status, [
          [
            ObcAlertMenuItemStatus.Unacknowledged,
            () => html`<div slot="action-label">ACK</div>`,
          ],
          [
            ObcAlertMenuItemStatus.NoAckAlarm,
            () =>
              html`<div slot="action-icon">
                <obi-alarm-noack-iec useCssColor></obi-alarm-noack-iec>
              </div>`,
          ],
          [
            ObcAlertMenuItemStatus.NoAckWarning,
            () =>
              html`<div slot="action-icon">
                <obi-warning-noack-iec useCssColor></obi-warning-noack-iec>
              </div>`,
          ],
        ])}
      </obc-message-menu-item>
    `;
  }

  static override styles = unsafeCSS(compentStyle);
}

declare global {
  interface HTMLElementTagNameMap {
    'ob-alert-menu-item': ObcAlertMenuItem;
  }
}
