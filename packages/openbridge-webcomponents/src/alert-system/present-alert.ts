/**
 * `present-alert` – Reads a `StandardAlert` through the standard it names.
 *
 * The experimental lists, menus and filters read alerts through this module,
 * so an alert means the same thing in each of them.
 *
 * Features:
 * - `resolveAlert(alert)`: the standard of an alert and its presentation.
 * - `presentAlert(alert)`: only the presentation.
 * - `compareAlerts(a, b)`: the order the status column sorts by, least
 *   important first, from the rank each standard gives its alerts.
 *
 * Usage:
 * ```ts
 * import {compareAlerts, presentAlert} from './alert-system/present-alert.js';
 *
 * const {condition, acknowledgement, flash} = presentAlert(alert);
 * alerts.sort(compareAlerts).reverse(); // most important first
 * ```
 */
import type {AlertPresentation, AlertSystem} from './alert-system.js';
import {alertSystem} from './alert-systems.js';
import type {StandardAlert} from './standard-alert.js';

export interface ResolvedAlert {
  system: AlertSystem;
  presentation: AlertPresentation;
}

export function resolveAlert(alert: StandardAlert): ResolvedAlert {
  const system = alertSystem(alert.standard);
  return {
    system,
    presentation: system.present(alert.criticality, alert.state, {
      setAside: alert.setAside,
    }),
  };
}

export function presentAlert(alert: StandardAlert): AlertPresentation {
  return resolveAlert(alert).presentation;
}

const rankOf = (alert: StandardAlert) =>
  alertSystem(alert.standard).displayRank(alert.criticality, alert.state);

/**
 * Orders alerts least important first, the way the status column's
 * descending sort expects: by the rank their standards give, then the older
 * before the newer.
 */
export function compareAlerts(a: StandardAlert, b: StandardAlert): number {
  const ranked = rankOf(b) - rankOf(a);
  if (ranked !== 0) {
    return ranked;
  }
  return new Date(a.time).getTime() - new Date(b.time).getTime();
}
