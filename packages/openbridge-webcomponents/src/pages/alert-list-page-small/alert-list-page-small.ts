import {LitElement, PropertyValues, html, unsafeCSS} from 'lit';
import {customElement} from '../../decorator.js';
import compentStyle from './alert-list-page-small.css?inline';
import {msg} from '@lit/localize';
import {property, query, state} from 'lit/decorators.js';
import '../../building-blocks/alert-list/alert-list.js';
import '../../components/icon-button/icon-button.js';
import '../../components/button/button.js';
import '../../icons/icon-silence-iec.js';
import '../../icons/icon-alerts.js';
import '../../icons/icon-alerts-shelf.js';
import '../../icons/icon-unacknowledged.js';
import '../../components/dropdown-button/dropdown-button.js';
import {ObcDropdownButtonChangeEvent} from '../../components/dropdown-button/dropdown-button.js';
import '../../icons/icon-alarm-noack-iec.js';
import '../../icons/icon-warning-noack-iec.js';
import {Alert} from '../../types.js';
import '../../components/alert-list-details/alert-list-details.js';
import {
  canAckFilter,
  getAlertListModeData,
  ObcAlertListDetails,
} from '../../components/alert-list-details/alert-list-details.js';
import {ButtonVariant} from '../../components/button/button.js';

export enum AlertListMode {
  UNACKED = 'unacked',
  ALL = 'all',
  SHELVED = 'shelved',
}

export type ObcAlertListPageAckAllClickEvent = CustomEvent<{
  mode: AlertListMode;
  alerts: Alert[];
}>;

export type ObcAckClickEvent = CustomEvent<{
  alert: Alert;
}>;

export type ObcRowClickEvent = CustomEvent<{
  alert: Alert;
}>;

/**
 * @fires ack-all-visible-click {ObcAlertListPageAckAllClickEvent} - Fired when the user clicks the "ACK visible" button.
 * @fires ack-click {ObcAckClickEvent} - Fired when the user clicks the "ACK" button.
 * @fires row-click {ObcRowClickEvent} - Fired when the user clicks a row.
 * @fires silence-click {void} - Fired when the user clicks the "Silence" button.
 */
@customElement('obc-alert-list-page-small')
export class ObcAlertListPageSmall extends LitElement {
  @property({type: Boolean}) hasShelved: boolean = false;
  @property({type: String}) selectedMode: AlertListMode = AlertListMode.ALL;
  @property({type: Array}) alerts: Alert[] = [];
  @property({type: Boolean}) showTime: boolean = false;
  @property({attribute: false}) timeFormatter: (time: Date) => string = (
    time: Date
  ) => time.toLocaleTimeString(undefined, {hour12: false});

  @state() private _mode: AlertListMode = AlertListMode.ALL;

  @query('obc-alert-list-details')
  private alertList!: ObcAlertListDetails;

  override willUpdate(changedProperties: PropertyValues): void {
    if (
      changedProperties.has('selectedMode') &&
      this._mode !== this.selectedMode
    ) {
      this._mode = this.selectedMode;
    }
  }

  private handleAckAllVisibleClick() {
    const tabName = this.selectedMode;
    const visibleElements = this.alertList.getVisibleAlerts();
    this.dispatchEvent(
      new CustomEvent('ack-all-visible-click', {
        detail: {
          alerts: visibleElements,
          mode: tabName,
        },
      }) as ObcAlertListPageAckAllClickEvent
    );
  }

  private onModeSelect(e: ObcDropdownButtonChangeEvent) {
    this._mode = e.detail.value as AlertListMode;
  }

  private get metadata() {
    return getAlertListModeData(this.selectedMode);
  }

  private onAckClick(e: ObcAckClickEvent) {
    this.dispatchEvent(
      new CustomEvent('ack-click', {
        detail: {
          alert: e.detail.alert,
        },
      }) as ObcAckClickEvent
    );
  }

  private onRowClick(e: ObcRowClickEvent) {
    this.dispatchEvent(
      new CustomEvent('row-click', {
        detail: {alert: e.detail.alert},
      }) as ObcRowClickEvent
    );
  }

  override render() {
    const lists = [
      {
        name: AlertListMode.ALL,
        title: msg('All'),
      },
      {
        name: AlertListMode.UNACKED,
        title: msg('Unacked'),
      },
    ];
    if (this.hasShelved) {
      lists.push({
        name: AlertListMode.SHELVED,
        title: msg('Shelved'),
      });
    }

    const metadata = this.metadata;
    const canAckAll = this.alerts.some(canAckFilter(metadata.filter));

    return html`
      <div class="wrapper">
        <obc-alert-list-details
          class="alert-list"
          .small=${true}
          .alerts=${this.alerts}
          .selectedMode=${this._mode}
          .showTime=${this.showTime}
          .timeFormatter=${this.timeFormatter}
          @ack-click=${this.onAckClick}
          @row-click=${this.onRowClick}
        ></obc-alert-list-details>
        <div class="action">
          <div class="btn-group">
            <obc-dropdown-button
              .value=${this._mode}
              @change=${this.onModeSelect}
              .options=${lists.map((v) => ({
                value: v.name,
                label: v.title,
              }))}
            >
            </obc-dropdown-button>
          </div>

          <div class="btn-group">
            <obc-icon-button
              variant="normal"
              @click=${() =>
                this.dispatchEvent(new CustomEvent('silence-click'))}
            >
              <obi-silence-iec></obi-silence-iec>
            </obc-icon-button>
            <obc-button
              .variant=${ButtonVariant.raised}
              .disabled=${!canAckAll}
              fullWidth
              class="btn"
              data-testid="ack-all-visible-button"
              @click=${() => this.handleAckAllVisibleClick()}
            >
              ${msg('ACK visible')}
            </obc-button>
          </div>
        </div>
      </div>
    `;
  }

  static override styles = unsafeCSS(compentStyle);
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-alert-list-page-small': ObcAlertListPageSmall;
  }
}
