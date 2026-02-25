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
  @property({type: Boolean}) showNotificationButton = false;
  @property({type: Boolean}) notificationButtonActivated = false;
  @property({type: Boolean}) showUserButton = false;
  @property({type: Boolean}) userButtonActivated = false;
  @property({type: Boolean}) showDimmingButton = false;
  @property({type: Boolean}) dimmingButtonActivated = false;
  @property({type: Boolean}) showSystemButton = false;
  @property({type: Boolean}) systemButtonActivated = false;
  @property({type: Boolean}) fleetButtonSelected = false;
  @property({type: String}) fleetButtonLabel = 'Fleet';
  @property({type: String}) selectedVesselValue = '';
  @property({type: Array}) vesselSelectorOptions: {
    value: string;
    label: string;
  }[] = [];

  override render() {
    return html`
      <div class="wrapper">
        <div class="content-container">
          <obc-icon-button class="home-button" variant="integration">
            <obi-home></obi-home>
          </obc-icon-button>
          <div class="fleet-vessel-container">
            ${this.renderFleetVesselContainerByType()}
          </div>
        </div>
        <div class="right-content-container">
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
        hasLeadingIcon
        .variant=${IntegrationButtonVariant.normal}
        ?selected=${this.fleetButtonSelected}
        @click=${() =>
          this.dispatchEvent(new CustomEvent('fleet-button-click'))}
      >
        <span slot="label">${this.fleetButtonLabel}</span>
      </obc-integration-button>

      <div class="fleet-vessel-container">
        ${vesselItems.map((vessel) => {
          const isSelected =
            this.selectedVesselValue === vessel.value ||
            (this.selectedVesselValue === '' && vessel === vesselItems[0]);
          return html`
            <div class="vessel-container">
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
            </div>
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
