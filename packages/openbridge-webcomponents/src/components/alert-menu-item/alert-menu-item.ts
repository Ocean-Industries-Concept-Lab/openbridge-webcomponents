import {LitElement, html, nothing, unsafeCSS} from 'lit';
import {property} from 'lit/decorators.js';
import {choose} from 'lit/directives/choose.js';

import compentStyle from './alert-menu-item.css?inline';
import '../message-menu-item/message-menu-item.js';
import '../alert-icon/alert-icon.js';
import '../../icons/icon-alerts-shelf.js';
import '../../icons/icon-alarm-noack-iec.js';
import '../../icons/icon-warning-noack-iec.js';
import {ObcMessageMenuItemSize} from '../message-menu-item/message-menu-item.js';
import {customElement} from '../../decorator.js';

export enum ObcAlertMenuItemStatus {
  Unacknowledged = 'unacknowledged',
  Caution = 'caution',
  Acknowledged = 'acknowledged',
  NoAckAlarm = 'no-ack-alarm',
  NoAckWarning = 'no-ack-warning',
  Rectified = 'rectified',
}

/**
 * @slot alert-icon - The alert icon
 * @slot icon - An icon to indicate the source of the alert
 * @slot title - The title
 * @slot description - The description
 * @slot day - The day
 * @slot time - The time
 *
 * @fires ack-click - Fired when the ack button is clicked
 * @fires item-click - Fired when the item is clicked
 */
@customElement('obc-alert-menu-item')
export class ObcAlertMenuItem extends LitElement {
  @property({type: Boolean}) hasIcon = false;
  @property({type: Boolean, reflect: true}) shelved = false;
  @property({type: Boolean}) hasDay = false;
  @property({type: Boolean}) hasTime = false;
  @property({type: String, reflect: true}) status =
    ObcAlertMenuItemStatus.Unacknowledged;
  @property({type: Boolean}) open = false;
  @property({type: String}) size: ObcMessageMenuItemSize =
    ObcMessageMenuItemSize.SingleLine;
  @property({type: Boolean}) animateIntro = false;
  private handleMessageClick() {
    this.dispatchEvent(new CustomEvent('item-click'));
    this.open = !this.open;
  }

  private handleActionClick() {
    this.dispatchEvent(new CustomEvent('ack-click'));
  }

  override render() {
    return html`
      <obc-message-menu-item
        .hasActionButton=${this.status ===
        ObcAlertMenuItemStatus.Unacknowledged}
        .size=${this.size}
        .open=${this.open}
        .hasSecondaryIcon=${this.hasIcon}
        .hasTertiaryIcon=${this.shelved}
        enhancedIcon
        @message-click=${this.handleMessageClick}
        @action-click=${this.handleActionClick}
        .animateIntro=${this.animateIntro}
        .hasDateOrTime=${this.hasDay || this.hasTime}
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
            () =>
              html`<div
                slot="action-label"
                data-testid="ack-all-visible-button"
              >
                ACK
              </div>`,
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
