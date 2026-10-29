/**
 * `read-standard-alert` – Looks an alert up in the configured alert standard.
 *
 * The experimental alert components draw, sort and filter through this
 * module, so an alert means the same thing in each of them. While no
 * standard is set, or when the standard does not define the alert's
 * criticality or state, the alert has no state definition: it draws no
 * icon, sorts last, offers no action and is in no filter. While no standard
 * is set it is not listed at all.
 */
import {ownEntryOf, type AlertStateDefinition} from './alert-standard.js';
import {getAlertStandard} from './configured-alert-standard.js';
import type {AlertCriticalityAndState} from './standard-alert.js';

export function findAlertStateDefinition({
  criticality,
  state,
}: AlertCriticalityAndState): AlertStateDefinition | undefined {
  const criticalityDefinition = ownEntryOf(
    getAlertStandard()?.criticalities,
    criticality
  );
  return ownEntryOf(criticalityDefinition?.states, state);
}

function sortingRankOf(alert: AlertCriticalityAndState): number {
  return (
    findAlertStateDefinition(alert)?.sortingRank ?? Number.POSITIVE_INFINITY
  );
}

/** Orders alerts lowest sorting rank first. */
export function compareAlertsBySortingRank(
  a: AlertCriticalityAndState,
  b: AlertCriticalityAndState
): number {
  const rankOfA = sortingRankOf(a);
  const rankOfB = sortingRankOf(b);
  return rankOfA === rankOfB ? 0 : rankOfA - rankOfB;
}

/** Every alert is included when no filter is named, as long as a standard is set. */
export function isAlertIncludedInFilter(
  alert: AlertCriticalityAndState,
  filterId: string | undefined
): boolean {
  if (getAlertStandard() === undefined) {
    return false;
  }
  if (filterId === undefined) {
    return true;
  }
  return (
    findAlertStateDefinition(alert)?.includedInFilters?.includes(filterId) ??
    false
  );
}

export function offeredAlertActionIds(
  alert: AlertCriticalityAndState
): readonly string[] {
  return findAlertStateDefinition(alert)?.offeredActions ?? [];
}

export function isAlertActionOffered(
  alert: AlertCriticalityAndState,
  actionId: string
): boolean {
  return offeredAlertActionIds(alert).includes(actionId);
}

export function alertActionLabel(actionId: string): string {
  return ownEntryOf(getAlertStandard()?.actions, actionId)?.label() ?? actionId;
}
