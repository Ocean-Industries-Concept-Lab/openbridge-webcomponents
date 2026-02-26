import {LitElement, html, unsafeCSS} from 'lit';
import {customElement} from '../../decorator.js';
import compentStyle from './integration-bar.css?inline';
import '../integration-tabs/integration-tabs.js';
import '../integration-button/integration-button.js';
import {IntegrationButtonVariant} from '../integration-button/integration-button.js';
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
import {property} from 'lit/decorators.js';

export enum IntegrationBarType {
  vesselname = 'vessel-name',
  rich = 'rich',
  dropdown = 'dropdown',
  inactive = 'inactive',
  monitoring = 'monitoring',
  novesselselection = 'no-vessel-selection',
}

/**
 *
 * @fires fleet-button-click - Fired when the fleet button is clicked
 * @fires vessel-selected - Fired when a vessel is selected, detail contains {value, label}
 * @fires dimming-button-clicked - Fired when the dimming button is clicked
 * @fires notification-button-clicked - Firaed when the notification button is clicked
 * @fires user-button-clicked - Fired when the user button is clicked
 * @fires system-button-clicked - Fired when the system button is clicked
 */
@customElement('obc-integration-bar')
export class ObcIntegrationBar extends LitElement {
  @property({type: String}) type: IntegrationBarType =
    IntegrationBarType.vesselname;
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
  @property({type: Boolean}) fleetButtonSelected = false;
  @property({type: String}) fleetButtonLabel = 'Fleet';
  @property({type: String}) selectedVesselValue = '';
  @property({type: Array}) vesselSelectorOptions: {
    value: string;
    label: string;
  }[] = [];

  override render() {
    return html`
      <nav class="wrapper">
        <div class="content-container">
          <obc-icon-button class="home-button" variant="integration">
            <obi-home></obi-home>
          </obc-icon-button>
          ${this.showLinkButton
            ? html`<obc-icon-button
                class="link-button"
                part="link-button"
                variant="integration"
                @click=${() =>
                  this.dispatchEvent(new CustomEvent('link-button-clicked'))}
                ?activated=${this.notificationButtonActivated}
              >
                <obi-link></obi-link>
              </obc-icon-button>`
            : null}
          <div class="fleet-vessel-container">
            ${this.renderFleetVesselContainerByType()}
          </div>
        </div>
        <div class="right-content-container">
          ${this.showAlertButton
            ? html`<obc-icon-button
                class="alert-button"
                part="alert-button"
                variant="integration"
                @click=${() =>
                  this.dispatchEvent(new CustomEvent('alert-button-clicked'))}
                ?activated=${this.alertButtonActivated}
              >
                <obi-alerts></obi-alerts>
              </obc-icon-button>`
            : null}
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
          ${this.showScreenButton
            ? html`<obc-icon-button
                class="screen-button"
                part="screen-button"
                variant="integration"
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
      </nav>
    `;
  }

  private renderFleetVesselContainerByType() {
    switch (this.type) {
      case IntegrationBarType.vesselname:
        return this.renderVesselNameContent();
      case IntegrationBarType.rich:
        return this.renderRichContent();
      case IntegrationBarType.dropdown:
      case IntegrationBarType.inactive:
      case IntegrationBarType.monitoring:
      case IntegrationBarType.novesselselection:
        return this.renderSelectorContent();
      default:
        return null;
    }
  }

  private renderVesselNameContent() {
    const fallbackVessels = [{value: 'default-vessel', label: 'Vessel name'}];
    const vesselItems =
      this.vesselSelectorOptions.length > 0
        ? this.vesselSelectorOptions
        : fallbackVessels;

    return html`
      <obc-integration-button
        class="fleet-button"
        .variant=${IntegrationButtonVariant.normal}
        ?selected=${this.fleetButtonSelected}
        @click=${() =>
          this.dispatchEvent(new CustomEvent('fleet-button-click'))}
      >
        <span slot="label">${this.fleetButtonLabel}</span>
      </obc-integration-button>

      <div class="vessel-container">
        ${vesselItems.map((vessel, index) => {
          const isSelected =
            this.selectedVesselValue === vessel.value ||
            (this.selectedVesselValue === '' && vessel === vesselItems[0]);
          const shouldRenderSeparator = index < vesselItems.length - 1;
          return html`
            <obc-integration-button
              hasLeadingIcon
              .variant=${isSelected
                ? IntegrationButtonVariant.normal
                : IntegrationButtonVariant.flat}
              ?selected=${isSelected}
              @click=${() =>
                this.dispatchEvent(
                  new CustomEvent('vessel-selected', {
                    detail: {value: vessel.value, label: vessel.label},
                  })
                )}
            >
              <obi-ship slot="leading-icon"></obi-ship>
              <span slot="label">${vessel.label}</span>
            </obc-integration-button>
            ${shouldRenderSeparator
              ? html`<div class="separator"></div>`
              : null}
          `;
        })}
      </div>
    `;
  }

  private renderRichContent() {
    return html``;
  }

  private renderSelectorContent() {
    return html``;
  }

  static override styles = unsafeCSS(compentStyle);
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-integration-bar': ObcIntegrationBar;
  }
}
