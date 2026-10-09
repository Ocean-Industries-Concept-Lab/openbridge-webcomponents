import {
  CSSResultGroup,
  LitElement,
  TemplateResult,
  html,
  nothing,
  unsafeCSS,
} from 'lit';
import {property} from 'lit/decorators.js';
import {msg} from '@lit/localize';
import compentStyle from './alert-list-page-small.css?inline';
import '../../components/icon-button/icon-button.js';
import '../../components/button/button.js';
import {ButtonVariant} from '../../components/button/button.js';
import '../../components/dropdown-button/dropdown-button.js';
import {ObcDropdownButtonChangeEvent} from '../../components/dropdown-button/dropdown-button.js';
import '../../icons/icon-silence-iec.js';

/** One entry of the mode dropdown. */
export interface AlertListPageMode {
  value: string;
  label: string;
}

/**
 * `ObcAlertListPageSmallBase` – Compact alert list page: a list of alerts over a
 * bar with a mode dropdown, a silence button and "ACK visible".
 *
 * Not registered as an element: the subclasses supply the list and the
 * modes. `obc-alert-list-page-small` renders `obc-alert-list-details`.
 *
 * ### Features
 * - **Modes:** the dropdown offers `modes` and shows `mode`; picking one calls
 *   `selectMode()`.
 * - **ACK visible:** enabled while `canAckAll` holds; a click reports the
 *   alerts `visibleAlerts()` returns, and the mode, in `ack-all-visible-click`.
 * - **Silence:** the icon button fires `silence-click`.
 *
 * The base holds no alerts: each page declares `alerts` in the alert type it
 * lists.
 *
 * @property hasShelved - Whether the dropdown offers the shelved alerts.
 * @property showTime - Whether the list shows when each alert was raised.
 * @property timeFormatter - Formats the time the list shows.
 * @availableWhen timeFormatter showTime==true
 */
export class ObcAlertListPageSmallBase extends LitElement {
  @property({type: Boolean}) hasShelved: boolean = false;
  @property({type: Boolean}) showTime: boolean = false;
  @property({attribute: false}) timeFormatter: (time: Date) => string = (
    time: Date
  ) => time.toLocaleTimeString(undefined, {hour12: false});

  /** The dropdown's options, in order. */
  protected get modes(): AlertListPageMode[] {
    return [];
  }

  /** The mode the list filters by and the dropdown shows. */
  protected get mode(): string {
    return '';
  }

  protected selectMode(_mode: string) {}

  /** Whether an alert the list shows in `mode` can still be acknowledged. */
  protected get canAckAll(): boolean {
    return false;
  }

  /** Whether the page offers "ACK visible" at all; `canAckAll` enables it. */
  protected get offersAckAll(): boolean {
    return true;
  }

  /** The alerts in view, which "ACK visible" reports. */
  protected visibleAlerts(): unknown[] {
    return [];
  }

  protected renderList(): TemplateResult | typeof nothing {
    return nothing;
  }

  protected dispatchAckClick(alert: unknown) {
    this.dispatchEvent(new CustomEvent('ack-click', {detail: {alert}}));
  }

  protected dispatchRowClick(alert: unknown) {
    this.dispatchEvent(new CustomEvent('row-click', {detail: {alert}}));
  }

  private handleAckAllVisibleClick() {
    this.dispatchEvent(
      new CustomEvent('ack-all-visible-click', {
        detail: {
          alerts: this.visibleAlerts(),
          mode: this.mode,
        },
      })
    );
  }

  private onModeSelect(e: ObcDropdownButtonChangeEvent) {
    this.selectMode(e.detail.value as string);
  }

  override render() {
    return html`
      <div class="wrapper">
        ${this.renderList()}
        <div class="action">
          <div class="btn-group">
            <obc-dropdown-button
              .value=${this.mode}
              @change=${this.onModeSelect}
              .options=${this.modes}
            >
            </obc-dropdown-button>
          </div>

          <div class="btn-group">
            <obc-icon-button
              variant="normal"
              @click=${() =>
                this.dispatchEvent(new CustomEvent('silence-click'))}
              aria-label=${msg('Silence')}
            >
              <obi-silence-iec></obi-silence-iec>
            </obc-icon-button>
            ${
              this.offersAckAll
                ? html`<obc-button
                    .variant=${ButtonVariant.raised}
                    .disabled=${!this.canAckAll}
                    fullWidth
                    class="btn"
                    data-testid="ack-all-visible-button"
                    @click=${() => this.handleAckAllVisibleClick()}
                  >
                    ${msg('ACK visible')}
                  </obc-button>`
                : nothing
            }
          </div>
        </div>
      </div>
    `;
  }

  static override styles: CSSResultGroup = unsafeCSS(compentStyle);
}
