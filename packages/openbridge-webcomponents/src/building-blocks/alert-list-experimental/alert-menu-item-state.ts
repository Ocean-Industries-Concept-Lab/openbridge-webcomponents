/**
 * `alert-menu-item-state` – Maps `obc-alert-menu-item` elements to and from
 * the state the experimental alert lists filter by.
 *
 * Features:
 * - `alertMenuItemState(item)`: the filter state of an item, read from its
 *   `status`, `shelved` and `blocked`.
 * - `alertMenuItemStatus(alert)`: the item `status` that shows a
 *   `StandardAlert`. A spec pins that an item and its alert pass the same
 *   filters.
 */
import {ObcAlertMenuItemStatus} from '../../components/alert-menu-item/alert-menu-item.js';
import type {ObcAlertMenuItem} from '../../components/alert-menu-item/alert-menu-item.js';
import {alertFilterState, type AlertFilterState} from '../../alert-filter.js';
import {
  AlertAcknowledgement,
  AlertCondition,
  NoAckGlyph,
} from '../../alert-system/alert-system.js';
import {resolveAlert} from '../../alert-system/present-alert.js';
import type {StandardAlert} from '../../alert-system/standard-alert.js';

export {alertFilterState};

const STATUS_STATE: Record<
  ObcAlertMenuItemStatus,
  Pick<AlertFilterState, 'condition' | 'acknowledgement'>
> = {
  [ObcAlertMenuItemStatus.Unacknowledged]: {
    condition: AlertCondition.Active,
    acknowledgement: AlertAcknowledgement.Unacked,
  },
  [ObcAlertMenuItemStatus.NoAckAlarm]: {
    condition: AlertCondition.Active,
    acknowledgement: AlertAcknowledgement.Unacked,
  },
  [ObcAlertMenuItemStatus.NoAckWarning]: {
    condition: AlertCondition.Active,
    acknowledgement: AlertAcknowledgement.Unacked,
  },
  [ObcAlertMenuItemStatus.Acknowledged]: {
    condition: AlertCondition.Active,
    acknowledgement: AlertAcknowledgement.Acked,
  },
  [ObcAlertMenuItemStatus.Caution]: {
    condition: AlertCondition.Active,
    acknowledgement: AlertAcknowledgement.None,
  },
  [ObcAlertMenuItemStatus.RectifiedUnacknowledged]: {
    condition: AlertCondition.Cleared,
    acknowledgement: AlertAcknowledgement.Unacked,
  },
  [ObcAlertMenuItemStatus.Rectified]: {
    condition: AlertCondition.Normal,
    acknowledgement: AlertAcknowledgement.Acked,
  },
};

/**
 * Where an alert item stands, read from its `status`, `shelved` and
 * `blocked`. An element without a known `status` counts as an unacked,
 * active alert.
 */
export function alertMenuItemState(item: HTMLElement): AlertFilterState {
  const menuItem = item as Partial<ObcAlertMenuItem>;
  const status = menuItem.status ?? item.getAttribute('status');
  return {
    ...(STATUS_STATE[status as ObcAlertMenuItemStatus] ??
      STATUS_STATE[ObcAlertMenuItemStatus.Unacknowledged]),
    shelved: menuItem.shelved ?? item.hasAttribute('shelved'),
    blocked: menuItem.blocked ?? item.hasAttribute('blocked'),
  };
}

/**
 * The item `status` that shows an alert's state. Set the item's `shelved` and
 * `blocked` from `alertFilterState(alert)` as well; the status carries
 * neither. An alert handed over to another station shows as one that cannot
 * be acknowledged here, and a cleared one that owes no ACK as rectified.
 */
export function alertMenuItemStatus(
  alert: StandardAlert
): ObcAlertMenuItemStatus {
  const {system, presentation} = resolveAlert(alert);
  const {condition, acknowledgement, transferred} = presentation;
  if (condition !== AlertCondition.Active) {
    return acknowledgement === AlertAcknowledgement.Unacked
      ? ObcAlertMenuItemStatus.RectifiedUnacknowledged
      : ObcAlertMenuItemStatus.Rectified;
  }
  if (acknowledgement === AlertAcknowledgement.None) {
    return ObcAlertMenuItemStatus.Caution;
  }
  if (acknowledgement === AlertAcknowledgement.Acked) {
    return ObcAlertMenuItemStatus.Acknowledged;
  }
  if (alert.noAck || transferred) {
    return system.noAckGlyph(alert.criticality) === NoAckGlyph.Alarm
      ? ObcAlertMenuItemStatus.NoAckAlarm
      : ObcAlertMenuItemStatus.NoAckWarning;
  }
  return ObcAlertMenuItemStatus.Unacknowledged;
}
