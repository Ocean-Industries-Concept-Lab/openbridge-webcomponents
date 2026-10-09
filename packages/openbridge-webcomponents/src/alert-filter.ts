/**
 * `alert-filter` – Which alerts each list filter shows.
 *
 * The experimental alert lists and menu filter through this module, so a
 * filter mode means the same thing in each of them, whatever standard an
 * alert follows. A filter reads an alert's presentation
 * (`alert-system/present-alert.ts`): the condition, the acknowledgement, and
 * whether it is set aside.
 *
 * Features:
 * - `AlertFilterState`: what a filter reads, from a `StandardAlert`
 *   (`alertFilterState`) or from an alert menu item (`alertMenuItemState`).
 * - Filters: `AlertFilterMode` names the filters, `matchesAlertFilter` decides
 *   one state, and `alertFilter` builds the predicate for a list of alerts,
 *   running the consumer's own predicate for `custom`.
 * - ACK: `canAcknowledge` reports whether an alert can still be acknowledged
 *   from here, which is what an "ACK visible" button counts.
 * - Labels: `alertFilterModeData` gives each mode its label and empty state.
 *
 * Usage:
 * ```ts
 * import {AlertFilterMode, alertFilter} from './alert-filter.js';
 *
 * const unacked = alerts.filter(alertFilter(AlertFilterMode.Unacked));
 * ```
 */
import {msg} from '@lit/localize';
import {html, type TemplateResult} from 'lit';
import './icons/icon-alerts.js';
import './icons/icon-alerts-active.js';
import './icons/icon-alerts-shelf.js';
import './icons/icon-unacknowledged.js';
import {
  AlertAcknowledgement,
  AlertCondition,
  AlertSetAside,
} from './alert-system/alert-system.js';
import {presentAlert} from './alert-system/present-alert.js';
import type {StandardAlert} from './alert-system/standard-alert.js';

export interface AlertFilterState {
  condition: AlertCondition;
  acknowledgement: AlertAcknowledgement;
  /** Set aside by an operator: shelved, paused or switched off. */
  shelved: boolean;
  /** Set aside by the system: blocked, suppressed or out of service. */
  blocked: boolean;
}

/**
 * Which alerts a list shows. `active` and `unacked` leave alerts set aside
 * out; `shelved` lists every alert an operator set aside, `blocked` every one
 * the system set aside; `custom` runs the consumer's own predicate.
 */
export enum AlertFilterMode {
  All = 'all',
  Active = 'active',
  Unacked = 'unacked',
  Shelved = 'shelved',
  Blocked = 'blocked',
  Custom = 'custom',
}

const BY_OPERATOR: ReadonlySet<AlertSetAside> = new Set([
  AlertSetAside.Shelved,
  AlertSetAside.Paused,
  AlertSetAside.Off,
]);

/** What a filter reads from an alert. */
export function alertFilterState(alert: StandardAlert): AlertFilterState {
  const {condition, acknowledgement, setAside} = presentAlert(alert);
  return {
    condition,
    acknowledgement,
    shelved: setAside !== undefined && BY_OPERATOR.has(setAside),
    blocked: setAside !== undefined && !BY_OPERATOR.has(setAside),
  };
}

/**
 * Whether a list in `mode` shows an alert in `state`. Every state passes
 * `custom` here, because the consumer's predicate decides that mode.
 */
export function matchesAlertFilter(
  state: AlertFilterState,
  mode: AlertFilterMode
): boolean {
  const setAside = state.shelved || state.blocked;
  switch (mode) {
    case AlertFilterMode.Active:
      return state.condition === AlertCondition.Active && !setAside;
    case AlertFilterMode.Unacked:
      return (
        state.acknowledgement === AlertAcknowledgement.Unacked && !setAside
      );
    case AlertFilterMode.Shelved:
      return state.shelved;
    case AlertFilterMode.Blocked:
      return state.blocked;
    default:
      return true;
  }
}

/**
 * The predicate a list in `mode` filters its alerts with. `custom` runs
 * `customFilter`, and lets every alert through without one.
 */
export function alertFilter(
  mode: AlertFilterMode,
  customFilter?: (alert: StandardAlert) => boolean
): (alert: StandardAlert) => boolean {
  if (mode === AlertFilterMode.Custom) {
    return customFilter ?? (() => true);
  }
  return (alert) => matchesAlertFilter(alertFilterState(alert), mode);
}

/**
 * An unacknowledged alert, unless it is acknowledged somewhere else: `noAck`
 * says so, and so does a handover to another station.
 */
export function canAcknowledge(alert: StandardAlert): boolean {
  const {acknowledgement, transferred} = presentAlert(alert);
  return (
    acknowledgement === AlertAcknowledgement.Unacked &&
    !transferred &&
    !alert.noAck
  );
}

export interface AlertFilterModeData {
  mode: AlertFilterMode;
  /** Label of the tab or option that selects the mode. */
  title: string;
  /** Shown when the mode lists no alerts. */
  emptyTitle: string;
  emptyIcon: TemplateResult;
}

/** Label and empty state of a filter mode, read at render time so a locale switch applies. */
export function alertFilterModeData(
  mode: AlertFilterMode
): AlertFilterModeData {
  switch (mode) {
    case AlertFilterMode.Active:
      return {
        mode,
        title: msg('Active'),
        emptyTitle: msg('No active alerts'),
        emptyIcon: html`<obi-alerts></obi-alerts>`,
      };
    case AlertFilterMode.Unacked:
      return {
        mode,
        title: msg('Unacked'),
        emptyTitle: msg('No unacknowledged alerts'),
        emptyIcon: html`<obi-unacknowledged></obi-unacknowledged>`,
      };
    case AlertFilterMode.Shelved:
      return {
        mode,
        title: msg('Shelved'),
        emptyTitle: msg('No shelved alerts'),
        emptyIcon: html`<obi-alerts-shelf></obi-alerts-shelf>`,
      };
    case AlertFilterMode.Blocked:
      return {
        mode,
        title: msg('Blocked'),
        emptyTitle: msg('No blocked alerts'),
        emptyIcon: html`<obi-alerts-active></obi-alerts-active>`,
      };
    case AlertFilterMode.Custom:
      return {
        mode,
        title: msg('Custom'),
        emptyTitle: msg('No alerts'),
        emptyIcon: html`<obi-alerts></obi-alerts>`,
      };
    case AlertFilterMode.All:
    default:
      return {
        mode: AlertFilterMode.All,
        title: msg('All'),
        emptyTitle: msg('No alerts'),
        emptyIcon: html`<obi-alerts></obi-alerts>`,
      };
  }
}
