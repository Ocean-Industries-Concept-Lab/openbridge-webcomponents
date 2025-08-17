import {LitElement, html, unsafeCSS} from 'lit';
import {customElement} from '../../decorator.js';
import compentStyle from './integration-bar.css?inline';
import '../integration-tabs/integration-tabs.js';
import '../clock/clock.js';
import '../icon-button/icon-button.js';
import '../../icons/icon-palette-day-night-iec.js';
import '../../icons/icon-user.js';
import {property} from 'lit/decorators.js';

/**
 *
 * @fires fleet-button-click - Fired when the fleet button is clicked
 * @fires dimming-button-clicked - Fired when the dimming button is clicked
 */
@customElement('obc-integration-bar')
export class ObcIntegrationBar extends LitElement {
  @property({type: Boolean}) showClock = false;
  @property({type: String}) date = '2021-01-01T11:11:11.111Z';
  @property({type: Number}) clockMinimizeBreakpointPx = 600;
  @property({type: Boolean}) showDate = false;
  @property({type: Boolean}) showUserButton = false;
  @property({type: Boolean}) userButtonActivated = false;
  @property({type: Boolean}) showDimmingButton = false;
  @property({type: Boolean}) dimmingButtonActivated = false;

  override render() {
    return html`
      <div class="wrapper">
        <div class="left-side">
          <obc-integration-tabs
            class="fleet-btn"
            @click=${() =>
              this.dispatchEvent(new CustomEvent('fleet-button-click'))}
            >Fleet</obc-integration-tabs
          >
          <slot name="vessel-selector"></slot>
        </div>
        <div class="right-side">
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
          ${this.showClock
            ? html`<obc-clock
                .date=${this.date}
                .blinkOnlyBreakpointPx=${this.clockMinimizeBreakpointPx}
                .showDate=${this.showDate}
              ></obc-clock>`
            : null}
        </div>
      </div>
    `;
  }

  static override styles = unsafeCSS(compentStyle);
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-integration-bar': ObcIntegrationBar;
  }
}
