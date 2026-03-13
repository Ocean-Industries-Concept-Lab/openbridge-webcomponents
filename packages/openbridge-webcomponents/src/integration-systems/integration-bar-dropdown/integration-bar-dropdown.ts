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
import {property} from 'lit/decorators.js';

/**
 *
 * @fires home-button-click - Fired when the home button is clicked
 * @fires dimming-button-clicked - Fired when the dimming button is clicked
 * @fires notification-button-clicked - Firaed when the notification button is clicked
 * @fires user-button-clicked - Fired when the user button is clicked
 * @fires system-button-clicked - Fired when the system button is clicked
 *
 * @slot status-label-1
 * @slot status-icon-1
 * @slot status-label-2
 * @slot status-icon-2
 * @slot status-label-3
 * @slot status-icon-3
 */
@customElement('obc-integration-bar-dropdown')
export class ObcIntegrationBarDropdown extends LitElement {
  @property({type: Boolean}) showHomeButton = false;
  @property({type: Boolean}) homeButtonActivated = false;
  @property({type: Boolean}) showClock = false;
  @property({type: Boolean}) showNotificationButton = false;
  @property({type: Boolean}) notificationButtonActivated = false;
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
    let result = [];
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
                @click=${() =>
                  this.dispatchEvent(new CustomEvent('home-button-clicked'))}
                ?activated=${this.showHomeButton}
              >
                <obi-home></obi-home>
              </obc-icon-button>`
            : null}
          <slot name="vessel-selector"></slot>
          ${this.renderStatusFields()}
        </div>
        <div class="right-side">
          ${this.showNotificationButton
            ? html`<obc-icon-button
                class="notification-button"
                part="notification-button"
                variant="integration"
                @click=${() =>
                  this.dispatchEvent(
                    new CustomEvent('notification-button-clicked')
                  )}
                ?activated=${this.notificationButtonActivated}
              >
                <obi-notification></obi-notification>
              </obc-icon-button>`
            : null}
          ${this.showSystemButton
            ? html`<obc-icon-button
                class="system-button"
                part="system-button"
                variant="integration"
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
