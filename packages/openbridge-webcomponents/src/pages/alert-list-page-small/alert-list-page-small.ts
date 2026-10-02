import {PropertyValues, html} from 'lit';
import {customElement} from '../../decorator.js';
import {msg} from '@lit/localize';
import {property, query, state} from 'lit/decorators.js';
import {
  ObcAlertListPageSmallBase,
  type AlertListPageMode,
} from './alert-list-page-small-base.js';
import '../../building-blocks/alert-list/alert-list.js';
import '../../icons/icon-alerts.js';
import '../../icons/icon-alerts-shelf.js';
import '../../icons/icon-unacknowledged.js';
import '../../icons/icon-alarm-noack-iec.js';
import '../../icons/icon-warning-noack-iec.js';
import {Alert} from '../../types.js';
import '../../components/alert-list-details/alert-list-details.js';
import {
  canAckFilter,
  getAlertListModeData,
  ObcAlertListDetails,
} from '../../components/alert-list-details/alert-list-details.js';

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
 * @fires {ObcAlertListPageAckAllClickEvent} ack-all-visible-click - Fired when the user clicks the "ACK visible" button.
 * @fires {ObcAckClickEvent} ack-click - Fired when the user clicks the "ACK" button.
 * @fires {ObcRowClickEvent} row-click - Fired when the user clicks a row.
 * @fires {CustomEvent<void>} silence-click - Fired when the user clicks the "Silence" button.
 * @beta
 */
@customElement('obc-alert-list-page-small')
export class ObcAlertListPageSmall extends ObcAlertListPageSmallBase {
  @property({type: String}) selectedMode: AlertListMode = AlertListMode.ALL;

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

  protected override get modes(): AlertListPageMode[] {
    const modes = [
      {value: AlertListMode.ALL, label: msg('All')},
      {value: AlertListMode.UNACKED, label: msg('Unacked')},
    ];
    if (this.hasShelved) {
      modes.push({value: AlertListMode.SHELVED, label: msg('Shelved')});
    }
    return modes;
  }

  protected override get mode(): AlertListMode {
    return this._mode;
  }

  protected override selectMode(mode: string) {
    this._mode = mode as AlertListMode;
  }

  protected override get canAckAll(): boolean {
    return this.alerts.some(
      canAckFilter(getAlertListModeData(this._mode).filter)
    );
  }

  protected override visibleAlerts(): Alert[] {
    return this.alertList.getVisibleAlerts();
  }

  private onAckClick(e: ObcAckClickEvent) {
    this.dispatchAckClick(e.detail.alert);
  }

  private onRowClick(e: ObcRowClickEvent) {
    this.dispatchRowClick(e.detail.alert);
  }

  protected override renderList() {
    return html`<obc-alert-list-details
      class="alert-list"
      .small=${true}
      .alerts=${this.alerts}
      .selectedMode=${this._mode}
      .showTime=${this.showTime}
      .timeFormatter=${this.timeFormatter}
      @ack-click=${this.onAckClick}
      @row-click=${this.onRowClick}
    ></obc-alert-list-details>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-alert-list-page-small': ObcAlertListPageSmall;
  }
}
