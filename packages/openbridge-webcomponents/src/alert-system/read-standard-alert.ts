/**
 * `read-standard-alert` – Looks an alert up in its standard.
 *
 * The experimental alert components draw, sort and filter through this
 * module, so an alert means the same thing in each of them. An alert whose
 * standard is not registered, or whose criticality or state its standard
 * does not define, has no state definition: it draws no icon, sorts last,
 * offers no action and is in no filter.
 */
import {ownEntryOf, type AlertStateDefinition} from './alert-standard.js';
import {findAlertStandard} from './alert-standard-registry.js';
import type {AlertStandardCriticalityAndState} from './standard-alert.js';

export function findAlertStateDefinition({
  standard,
  criticality,
  state,
}: AlertStandardCriticalityAndState): AlertStateDefinition | undefined {
  const criticalityDefinition = ownEntryOf(
    findAlertStandard(standard)?.criticalities,
    criticality
  );
  return ownEntryOf(criticalityDefinition?.states, state);
}

function sortingRankOf(alert: AlertStandardCriticalityAndState): number {
  return (
    findAlertStateDefinition(alert)?.sortingRank ?? Number.POSITIVE_INFINITY
  );
}

/** Orders alerts lowest sorting rank first. */
export function compareAlertsBySortingRank(
  a: AlertStandardCriticalityAndState,
  b: AlertStandardCriticalityAndState
): number {
  const rankOfA = sortingRankOf(a);
  const rankOfB = sortingRankOf(b);
  return rankOfA === rankOfB ? 0 : rankOfA - rankOfB;
}

/** Every alert is included when no filter is named. */
export function isAlertIncludedInFilter(
  alert: AlertStandardCriticalityAndState,
  filterId: string | undefined
): boolean {
  if (filterId === undefined) {
    return true;
  }
  return (
    findAlertStateDefinition(alert)?.includedInFilters?.includes(filterId) ??
    false
  );
}

export function offeredAlertActionIds(
  alert: AlertStandardCriticalityAndState
): readonly string[] {
  return findAlertStateDefinition(alert)?.offeredActions ?? [];
}

export function isAlertActionOffered(
  alert: AlertStandardCriticalityAndState,
  actionId: string
): boolean {
  return offeredAlertActionIds(alert).includes(actionId);
}

export function alertActionLabel(standardId: string, actionId: string): string {
  return (
    ownEntryOf(findAlertStandard(standardId)?.actions, actionId)?.label() ??
    actionId
  );
}
