import {LitElement, html, nothing, unsafeCSS} from 'lit';
import {customElement} from '../../decorator.js';
import compentStyle from './integration-bar-dropdown.css?inline';
import '../integration-tabs/integration-tabs.js';
import '../../components/clock/clock.js';
import '../../components/icon-button/icon-button.js';
import '../../icons/icon-palette-day-night-iec.js';
import '../../icons/icon-user.js';
import '../../icons/icon-configure.js';
import '../../icons/icon-notification.js';
import '../../icons/icon-home.js';
import '../../icons/icon-screen-desk.js';
import '../../icons/icon-alerts.js';
import '../../icons/icon-link.js';
import {NotificationButtonStyle} from '../../components/notification-button/notification-button.js';
import {property} from 'lit/decorators.js';
import {msg} from '@lit/localize';

/**
 * `<obc-integration-bar-dropdown>` – A compact top-level integration header with a dropdown selector, status fields and system action buttons.
 *
 * @property showHomeButton - Home button at the left end of the bar.
 * @property homeButtonActivated - Pressed styling for the home button.
 * @availableWhen homeButtonActivated showHomeButton==true
 * @property showLinkButton - Link button, between home and the selector.
 * @property linkButtonActivated - Pressed styling for the link button.
 * @availableWhen linkButtonActivated showLinkButton==true
 * @property showClock - Renders the `clock` slot at the right end.
 * @property showAlertButton - Alert button, first in the right-hand group.
 * @property alertButtonActivated - Pressed styling for the alert button.
 * @availableWhen alertButtonActivated showAlertButton==true
 * @property showNotificationButton - Notification button, after the alert button.
 * @property notificationButtonActivated - Pressed styling; the count badge only appears in this state.
 * @availableWhen notificationButtonActivated showNotificationButton==true
 * @property notificationCount - Number drawn in the count badge.
 * @availableWhen notificationCount showNotificationButton==true && showNotificationCount==true && notificationButtonActivated==true
 * @property showNotificationCount - Draws the count badge on the notification button.
 * @availableWhen showNotificationCount showNotificationButton==true && notificationButtonActivated==true
 * @property showScreenButton - Screen button, after the notification button.
 * @property screenButtonActivated - Pressed styling for the screen button.
 * @availableWhen screenButtonActivated showScreenButton==true
 * @property showUserButton - User button, last before the clock.
 * @property userButtonActivated - Pressed styling for the user button.
 * @availableWhen userButtonActivated showUserButton==true
 * @property showDimmingButton - Dimming button, between system and user.
 * @property dimmingButtonActivated - Pressed styling for the dimming button.
 * @availableWhen dimmingButtonActivated showDimmingButton==true
 * @property showSystemButton - System button, after the screen button.
 * @property systemButtonActivated - Pressed styling for the system button.
 * @availableWhen systemButtonActivated showSystemButton==true
 * @property nStatusFields - How many `status-icon-N`/`status-label-N` slot pairs are rendered.
 *
 * @slot vessel-selector - Vessel selector content
 * @slot status-label-1 - Label for the first status field
 * @slot status-icon-1 - Icon for the first status field
 * @slot status-label-2 - Label for the second status field
 * @slot status-icon-2 - Icon for the second status field
 * @slot status-label-3 - Label for the third status field
 * @slot status-icon-3 - Icon for the third status field
 * @slot clock - Custom clock content, rendered when `showClock` is true
 *
 * @fires {CustomEvent} home-button-clicked - Fired when the home button is clicked
 * @fires {CustomEvent} link-button-clicked - Fired when the link button is clicked
 * @fires {CustomEvent} alert-button-clicked - Fired when the alert button is clicked
 * @fires {CustomEvent} dimming-button-clicked - Fired when the dimming button is clicked
 * @fires {CustomEvent} notification-button-clicked - Fired when the notification button is clicked
 * @fires {CustomEvent} screen-button-clicked - Fired when the screen button is clicked
 * @fires {CustomEvent} user-button-clicked - Fired when the user button is clicked
 * @fires {CustomEvent} system-button-clicked - Fired when the system button is clicked
 * @experimental
 */
@customElement('obc-integration-bar-dropdown')
export class ObcIntegrationBarDropdown extends LitElement {
  @property({type: Boolean}) showHomeButton = false;
  @property({type: Boolean}) homeButtonActivated = false;
  @property({type: Boolean}) showLinkButton = false;
  @property({type: Boolean}) linkButtonActivated = false;
  @property({type: Boolean}) showClock = false;
  @property({type: Boolean}) showAlertButton = false;
  @property({type: Boolean}) alertButtonActivated = false;
  @property({type: Boolean}) showNotificationButton = false;
  @property({type: Boolean}) notificationButtonActivated = false;
  @property({type: Number}) notificationCount = 0;
  @property({type: Boolean}) showNotificationCount = false;
  @property({type: Boolean}) showScreenButton = false;
  @property({type: Boolean}) screenButtonActivated = false;
  @property({type: Boolean}) showUserButton = false;
  @property({type: Boolean}) userButtonActivated = false;
  @property({type: Boolean}) showDimmingButton = false;
  @property({type: Boolean}) dimmingButtonActivated = false;
  @property({type: Boolean}) showSystemButton = false;
  @property({type: Boolean}) systemButtonActivated = false;
  @property({type: Number}) nStatusFields = 0;

  private renderStatusFields() {
    if (this.nStatusFields <= 0) {
      return nothing;
    }
    const result = [];
    for (let i = 0; i < this.nStatusFields; i++) {
      if (i > 0) {
        result.push(html`<div class="divider"></div>`);
      }
      result.push(html`
        <div class="status-item">
          <slot class="status-icon" name="status-icon-${i + 1}"></slot>
          <slot class="status-label" name="status-label-${i + 1}"></slot>
        </div>
      `);
    }
    return html`<div class="status">${result}</div>`;
  }

  override render() {
    return html`
      <div class="wrapper">
        <div class="left-side">
          ${this.showHomeButton
            ? html`<obc-icon-button
                class="home-button"
                part="home-button"
                variant="integration"
                aria-label=${msg('Home')}
                @click=${() =>
                  this.dispatchEvent(new CustomEvent('home-button-clicked'))}
                ?activated=${this.homeButtonActivated}
              >
                <obi-home></obi-home>
              </obc-icon-button>`
            : null}
          ${this.showLinkButton
            ? html`<obc-icon-button
                class="link-button"
                part="link-button"
                variant="integration"
                aria-label=${msg('Link')}
                @click=${() =>
                  this.dispatchEvent(new CustomEvent('link-button-clicked'))}
                ?activated=${this.linkButtonActivated}
              >
                <obi-link></obi-link>
              </obc-icon-button>`
            : null}
          <slot name="vessel-selector"></slot>
          ${this.renderStatusFields()}
        </div>
        <div class="right-side">
          ${this.showAlertButton
            ? html`<obc-icon-button
                class="alert-button"
                part="alert-button"
                variant="integration"
                aria-label=${msg('Alerts')}
                @click=${() =>
                  this.dispatchEvent(new CustomEvent('alert-button-clicked'))}
                ?activated=${this.alertButtonActivated}
              >
                <obi-alerts></obi-alerts>
              </obc-icon-button>`
            : null}
          ${this.showNotificationButton
            ? html`<obc-notification-button
                @click=${() =>
                  this.dispatchEvent(
                    new CustomEvent('notification-button-clicked')
                  )}
                .buttonStyle=${NotificationButtonStyle.Enhanced}
                .showCount=${this.showNotificationCount}
                .count=${this.notificationCount}
                ?isActive=${this.notificationButtonActivated}
              ></obc-notification-button>`
            : nothing}
          ${this.showScreenButton
            ? html`<obc-icon-button
                class="screen-button"
                part="screen-button"
                variant="integration"
                aria-label=${msg('Screen')}
                @click=${() =>
                  this.dispatchEvent(new CustomEvent('screen-button-clicked'))}
                ?activated=${this.screenButtonActivated}
              >
                <obi-screen-desk></obi-screen-desk>
              </obc-icon-button>`
            : null}
          ${this.showSystemButton
            ? html`<obc-icon-button
                class="system-button"
                part="system-button"
                variant="integration"
                aria-label=${msg('System')}
                @click=${() =>
                  this.dispatchEvent(new CustomEvent('system-button-clicked'))}
                ?activated=${this.systemButtonActivated}
              >
                <obi-configure></obi-configure>
              </obc-icon-button>`
            : null}
          ${this.showDimmingButton
            ? html`<obc-icon-button
                class="dimming-button"
                part="dimming-button"
                variant="integration"
                aria-label=${msg('Dimming')}
                @click=${() =>
                  this.dispatchEvent(new CustomEvent('dimming-button-clicked'))}
                ?activated=${this.dimmingButtonActivated}
              >
                <obi-palette-day-night-iec></obi-palette-day-night-iec>
              </obc-icon-button>`
            : null}
          ${this.showUserButton
            ? html`<obc-icon-button
                class="user-button"
                part="user-button"
                variant="integration"
                aria-label=${msg('User')}
                @click=${() =>
                  this.dispatchEvent(new CustomEvent('user-button-clicked'))}
                ?activated=${this.userButtonActivated}
              >
                <obi-user></obi-user>
              </obc-icon-button>`
            : null}
          ${this.showClock ? html`<slot name="clock"></slot>` : null}
        </div>
      </div>
    `;
  }

  static override styles = unsafeCSS(compentStyle);
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-integration-bar-dropdown': ObcIntegrationBarDropdown;
  }
}
