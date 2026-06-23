import {LitElement, html, unsafeCSS, nothing} from 'lit';
import {customElement} from '../../decorator.js';
import compentStyle from './integration-bar.css?inline';
import '../integration-tabs/integration-tabs.js';
import '../integration-button/integration-button.js';
import {
  IntegrationButtonType,
  IntegrationButtonVariant,
} from '../integration-button/integration-button.js';
import '../../components/clock/clock.js';
import '../../components/icon-button/icon-button.js';
import '../../icons/icon-palette-day-night-iec.js';
import '../../icons/icon-user.js';
import '../../icons/icon-configure.js';
import '../../icons/icon-notification.js';
import '../../icons/icon-home.js';
import '../../icons/icon-ship.js';
import '../../icons/icon-screen-desk.js';
import '../../icons/icon-alerts.js';
import '../../icons/icon-link.js';
import {property, state} from 'lit/decorators.js';
import {classMap} from 'lit/directives/class-map.js';

/**
 * `<obc-integration-bar>` – A compact top-level integration header for vessel and system navigation controls.
 *
 * Provides a configurable integration bar with home/navigation controls, optional fleet and vessel selection,
 * and optional utility actions such as alerts, notifications, screen, system, dimming, user, and clock.
 *
 * @slot clock - Custom clock content, rendered when `showClock` is true
 * @slot integration-buttons - Regular vessel integration buttons
 * @slot hug-buttons - Compact vessel integration buttons; slotted integration buttons are forced to hug type
 * @slot vessel-integration-menu - Modal that will appear achored below the fleet/vessel button. Typically an obc-integration-vessel-menu
 * @property {IntegrationBarType} type - Integration bar mode for fleet/vessel presentation
 * @property {boolean} hideHomeButton - Hides the home button when true
 * @property {boolean} showClock - Toggles rendering of the clock slot
 * @property {boolean} showLinkButton - Toggles visibility of link button
 * @property {boolean} linkButtonActivated - Activated state of link button
 * @property {boolean} showUserButton - Toggles visibility of user button
 * @property {boolean} userButtonActivated - Activated state of user button
 * @property {boolean} showDimmingButton - Toggles visibility of dimming button
 * @property {boolean} dimmingButtonActivated - Activated state of dimming button
 * @property {boolean} showSystemButton - Toggles visibility of system button
 * @property {boolean} systemButtonActivated - Activated state of system button
 * @property {boolean} showScreenButton - Toggles visibility of screen button
 * @property {boolean} screenButtonActivated - Activated state of screen button
 * @property {boolean} showNotificationButton - Toggles visibility of notification button
 * @property {boolean} notificationButtonActivated - Activated state of notification button
 * @property {boolean} showAlertButton - Toggles visibility of alert button
 * @property {boolean} alertButtonActivated - Activated state of alert button
 * @property {boolean} showFleetButton - Toggles visibility of fleet button
 * @property {boolean} fleetButtonSelected - Selected state of fleet button
 * @property {boolean} fleetButtonActivated - Active state of fleet button while selection is pending
 * @property {string} fleetButtonLabel - Label for the fleet button
 * @property {string} selectedVesselValue - Selected vessel value
 * @property {string} activeVesselValue - Active vessel value while selection is pending
 * @property {{value: string; label: string}[]} vesselSelectorOptions - Available vessel options
 * @fires fleet-button-click - Fired when the fleet button is clicked
 * @fires link-button-clicked - Fired when the link button is clicked
 * @fires alert-button-clicked - Fired when the alert button is clicked
 * @fires notification-button-clicked - Fired when the notification button is clicked
 * @fires screen-button-clicked - Fired when the screen button is clicked
 * @fires system-button-clicked - Fired when the system button is clicked
 * @fires dimming-button-clicked - Fired when the dimming button is clicked
 * @fires user-button-clicked - Fired when the user button is clicked
 */
@customElement('obc-integration-bar')
export class ObcIntegrationBar extends LitElement {
  @property({type: Boolean}) hideHomeButton = false;
  @property({type: Boolean}) showClock = false;
  @property({type: Boolean}) showLinkButton = false;
  @property({type: Boolean}) linkButtonActivated = false;
  @property({type: Boolean}) showUserButton = false;
  @property({type: Boolean}) userButtonActivated = false;
  @property({type: Boolean}) showDimmingButton = false;
  @property({type: Boolean}) dimmingButtonActivated = false;
  @property({type: Boolean}) showSystemButton = false;
  @property({type: Boolean}) systemButtonActivated = false;
  @property({type: Boolean}) showScreenButton = false;
  @property({type: Boolean}) screenButtonActivated = false;
  @property({type: Boolean}) showNotificationButton = false;
  @property({type: Boolean}) notificationButtonActivated = false;
  @property({type: Boolean}) showAlertButton = false;
  @property({type: Boolean}) alertButtonActivated = false;
  @property({type: Boolean}) showFleetButton = false;
  @property({type: Boolean}) fleetButtonSelected = false;
  @property({type: Boolean}) fleetButtonActivated = false;
  @property({type: String}) fleetButtonLabel = 'Fleet';

  @state() private buttonsOnBar = false;

  private onFleetButtonClick() {
    this.dispatchEvent(new CustomEvent('fleet-button-click'));
  }

  private onHugButtonsSlotChange(event: Event) {
    const slot = event.currentTarget as HTMLSlotElement;
    const assignedElements = slot.assignedElements({flatten: true});

    assignedElements.forEach((element) => {
      if (element.tagName === 'OBC-INTEGRATION-BUTTON') {
        const integrationButton = element as unknown as HTMLElement & {
          type: IntegrationButtonType;
        };
        integrationButton.type = IntegrationButtonType.hug;
      }
    });
    this.buttonsOnBar = true;
  }

  private onButtonsSlotChange() {
    this.buttonsOnBar = true;
  }

  override render() {
    const isFleetButtonAnchored = this.fleetButtonActivated;
    return html`
      <nav class="wrapper">
        <div class="content-container">
          ${!this.hideHomeButton
            ? html`<obc-icon-button class="home-button" variant="integration">
                <obi-home></obi-home>
              </obc-icon-button>`
            : null}
          ${this.showLinkButton
            ? html`<obc-icon-button
                class=${classMap({
                  'link-button': true,
                  activated: this.linkButtonActivated,
                })}
                part="link-button"
                variant="integration"
                @click=${() =>
                  this.dispatchEvent(new CustomEvent('link-button-clicked'))}
                ?activated=${this.linkButtonActivated}
              >
                <obi-link></obi-link>
              </obc-icon-button>`
            : null}
          <div class=${classMap({'fleet-vessel-container': true})}>
            ${this.showFleetButton
              ? html`<obc-integration-button
                  class="fleet-button"
                  .variant=${IntegrationButtonVariant.normal}
                  ?selected=${this.fleetButtonSelected}
                  ?activated=${this.fleetButtonActivated}
                  style=${isFleetButtonAnchored
                    ? 'anchor-name: --integration-menu-anchor;'
                    : ''}
                  @click=${() => this.onFleetButtonClick()}
                >
                  <span slot="label">${this.fleetButtonLabel}</span>
                </obc-integration-button>`
              : nothing}
            <div class="vessel-container">
              ${this.buttonsOnBar
                ? nothing
                : html`<div class="vessel-button-placeholder"></div>`}
              <slot
                class="hug-buttons-slot"
                name="hug-buttons"
                @slotchange=${this.onHugButtonsSlotChange}
              ></slot>
              <slot
                class="integration-buttons-slot"
                name="integration-buttons"
                @slotchange=${this.onButtonsSlotChange}
              ></slot>
            </div>
          </div>
        </div>
        <div
          class=${classMap({
            'buttons-on-bar': this.buttonsOnBar,
            'right-content-container': true,
          })}
        >
          ${this.showAlertButton
            ? html`<obc-icon-button
                class=${classMap({
                  'alert-button': true,
                  activated: this.alertButtonActivated,
                })}
                part="alert-button"
                variant="integration"
                style=${this.alertButtonActivated
                  ? 'anchor-name: --settings-menu-anchor;'
                  : ''}
                @click=${() =>
                  this.dispatchEvent(new CustomEvent('alert-button-clicked'))}
                ?activated=${this.alertButtonActivated}
              >
                <obi-alerts></obi-alerts>
              </obc-icon-button>`
            : null}
          ${this.showNotificationButton
            ? html`<obc-icon-button
                class=${classMap({
                  'notification-button': true,
                  activated: this.notificationButtonActivated,
                })}
                part="notification-button"
                variant="integration"
                style=${this.notificationButtonActivated
                  ? 'anchor-name: --settings-menu-anchor;'
                  : ''}
                @click=${() =>
                  this.dispatchEvent(
                    new CustomEvent('notification-button-clicked')
                  )}
                ?activated=${this.notificationButtonActivated}
              >
                <obi-notification></obi-notification>
              </obc-icon-button>`
            : null}
          ${this.showScreenButton
            ? html`<obc-icon-button
                class=${classMap({
                  'screen-button': true,
                  activated: this.screenButtonActivated,
                })}
                part="screen-button"
                variant="integration"
                style=${this.screenButtonActivated
                  ? 'anchor-name: --settings-menu-anchor;'
                  : ''}
                @click=${() =>
                  this.dispatchEvent(new CustomEvent('screen-button-clicked'))}
                ?activated=${this.screenButtonActivated}
              >
                <obi-screen-desk></obi-screen-desk>
              </obc-icon-button>`
            : null}
          ${this.showSystemButton
            ? html`<obc-icon-button
                class=${classMap({
                  'system-button': true,
                  activated: this.systemButtonActivated,
                })}
                part="system-button"
                variant="integration"
                style=${this.systemButtonActivated
                  ? 'anchor-name: --settings-menu-anchor;'
                  : ''}
                @click=${() =>
                  this.dispatchEvent(new CustomEvent('system-button-clicked'))}
                ?activated=${this.systemButtonActivated}
              >
                <obi-configure></obi-configure>
              </obc-icon-button>`
            : null}
          ${this.showDimmingButton
            ? html`<obc-icon-button
                class=${classMap({
                  'dimming-button': true,
                  activated: this.dimmingButtonActivated,
                })}
                part="dimming-button"
                variant="integration"
                style=${this.dimmingButtonActivated
                  ? 'anchor-name: --settings-menu-anchor;'
                  : ''}
                @click=${() =>
                  this.dispatchEvent(new CustomEvent('dimming-button-clicked'))}
                ?activated=${this.dimmingButtonActivated}
              >
                <obi-palette-day-night-iec></obi-palette-day-night-iec>
              </obc-icon-button>`
            : null}
          ${this.showUserButton
            ? html`<obc-icon-button
                class=${classMap({
                  'user-button': true,
                  activated: this.userButtonActivated,
                })}
                part="user-button"
                variant="integration"
                style=${this.userButtonActivated
                  ? 'anchor-name: --settings-menu-anchor;'
                  : ''}
                @click=${() =>
                  this.dispatchEvent(new CustomEvent('user-button-clicked'))}
                ?activated=${this.userButtonActivated}
              >
                <obi-user></obi-user>
              </obc-icon-button>`
            : null}
          ${this.showClock ? html`<slot name="clock"></slot>` : null}
        </div>
      </nav>
    `;
  }

  static override styles = unsafeCSS(compentStyle);
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-integration-bar': ObcIntegrationBar;
  }
}
