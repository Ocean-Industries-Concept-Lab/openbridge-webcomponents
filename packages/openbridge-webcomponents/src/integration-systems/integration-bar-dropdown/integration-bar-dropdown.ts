import {LitElement, html, nothing, unsafeCSS} from 'lit';
import {customElement} from '../../decorator.js';
import compentStyle from './integration-bar-dropdown.css?inline';
import '../integration-tabs/integration-tabs.js';
import '../integration-button/integration-button.js';
import {IntegrationButtonVariant} from '../integration-button/integration-button.js';
import '../../components/clock/clock.js';
import '../../components/icon-button/icon-button.js';
import '../../icons/icon-palette-day-night-iec.js';
import '../../icons/icon-user.js';
import '../../icons/icon-configure.js';
import '../../icons/icon-notification.js';
import {property} from 'lit/decorators.js';
import {classMap} from 'lit/directives/class-map.js';

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
 * @fires dimming-button-clicked - Fired when the dimming button is clicked
 * @fires user-button-clicked - Fired when the user button is clicked
 * @fires system-button-clicked - Fired when the system button is clicked
 */
@customElement('obc-integration-bar')
export class ObcIntegrationBar extends LitElement {
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

  override render() {
    return html`
      <div class="wrapper">
        <div class="left-side">
          <obc-integration-tabs
            class="fleet-btn"
            .selected=${this.fleetButtonSelected}
            @click=${() =>
              this.dispatchEvent(new CustomEvent('fleet-button-click'))}
            >Fleet</obc-integration-tabs
          >
          <slot name="vessel-selector"></slot>
        </div>
        <div class="right-content-container">
          ${
            this.showAlertButton
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
              : null
          }
          ${
            this.showNotificationButton
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
              : null
          }
          ${
            this.showSystemButton
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
                    this.dispatchEvent(
                      new CustomEvent('system-button-clicked')
                    )}
                  ?activated=${this.systemButtonActivated}
                >
                  <obi-configure></obi-configure>
                </obc-icon-button>`
              : null
          }
          ${
            this.showDimmingButton
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
                    this.dispatchEvent(
                      new CustomEvent('dimming-button-clicked')
                    )}
                  ?activated=${this.dimmingButtonActivated}
                >
                  <obi-palette-day-night-iec></obi-palette-day-night-iec>
                </obc-icon-button>`
              : null
          }
          ${
            this.showUserButton
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
              : null
          }
          ${this.showClock ? html`<slot name="clock"></slot>` : null}
        </div>
      </nav>
      <div class="vessel-integration-menu-container">
        <slot name="vessel-integration-menu"></slot>
      </div>
      <div class="right-side-system-menu-container">
        <slot name="vessel-integration-menu"></slot>
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
    const isFleetButtonAnchored = this.fleetButtonActivated;

    return html`
      <obc-integration-button
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
      </obc-integration-button>

      <div class="vessel-container">
        ${vesselItems.map((vessel, index) => {
          const isSelected =
            this.selectedVesselValue !== '' &&
            this.selectedVesselValue === vessel.value;
          const isActivated =
            this.activeVesselValue !== '' &&
            this.activeVesselValue === vessel.value;
          const shouldRenderSeparator = index < vesselItems.length - 1;
          return html`
            <obc-integration-button
              hasLeadingIcon
              .variant=${isSelected
                ? IntegrationButtonVariant.normal
                : IntegrationButtonVariant.flat}
              ?selected=${isSelected}
              ?activated=${isActivated}
              style=${isActivated
                ? 'anchor-name: --integration-menu-anchor;'
                : ''}
              @click=${() => this.onVesselButtonClick(vessel)}
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
    'obc-integration-bar-dropdown': ObcIntegrationBarDropdown;
  }
}
