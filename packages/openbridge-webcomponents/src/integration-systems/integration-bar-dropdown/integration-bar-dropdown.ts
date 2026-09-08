import {LitElement, html, nothing, unsafeCSS, type TemplateResult} from 'lit';
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

  // The event name stays a literal at each call site so `cem analyze` can read it.
  private renderIconButton(
    name: string,
    activated: boolean,
    label: string,
    icon: TemplateResult,
    onClick: () => void
  ) {
    return html`<obc-icon-button
      class="${name}-button"
      part="${name}-button"
      variant="integration"
      aria-label=${label}
      @click=${onClick}
      ?activated=${activated}
    >
      ${icon}
    </obc-icon-button>`;
  }

  override render() {
    return html`
      <div class="wrapper">
        <div class="left-side">
          ${this.showHomeButton
            ? this.renderIconButton(
                'home',
                this.homeButtonActivated,
                msg('Home'),
                html`<obi-home></obi-home>`,
                () => this.dispatchEvent(new CustomEvent('home-button-clicked'))
              )
            : nothing}
          ${this.showLinkButton
            ? this.renderIconButton(
                'link',
                this.linkButtonActivated,
                msg('Link'),
                html`<obi-link></obi-link>`,
                () => this.dispatchEvent(new CustomEvent('link-button-clicked'))
              )
            : nothing}
          <slot name="vessel-selector"></slot>
          ${this.renderStatusFields()}
        </div>
        <div class="right-side">
          ${this.showAlertButton
            ? this.renderIconButton(
                'alert',
                this.alertButtonActivated,
                msg('Alerts'),
                html`<obi-alerts></obi-alerts>`,
                () =>
                  this.dispatchEvent(new CustomEvent('alert-button-clicked'))
              )
            : nothing}
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
            ? this.renderIconButton(
                'screen',
                this.screenButtonActivated,
                msg('Screen'),
                html`<obi-screen-desk></obi-screen-desk>`,
                () =>
                  this.dispatchEvent(new CustomEvent('screen-button-clicked'))
              )
            : nothing}
          ${this.showSystemButton
            ? this.renderIconButton(
                'system',
                this.systemButtonActivated,
                msg('System'),
                html`<obi-configure></obi-configure>`,
                () =>
                  this.dispatchEvent(new CustomEvent('system-button-clicked'))
              )
            : nothing}
          ${this.showDimmingButton
            ? this.renderIconButton(
                'dimming',
                this.dimmingButtonActivated,
                msg('Dimming'),
                html`<obi-palette-day-night-iec></obi-palette-day-night-iec>`,
                () =>
                  this.dispatchEvent(new CustomEvent('dimming-button-clicked'))
              )
            : nothing}
          ${this.showUserButton
            ? this.renderIconButton(
                'user',
                this.userButtonActivated,
                msg('User'),
                html`<obi-user></obi-user>`,
                () => this.dispatchEvent(new CustomEvent('user-button-clicked'))
              )
            : nothing}
          ${this.showClock ? html`<slot name="clock"></slot>` : nothing}
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
