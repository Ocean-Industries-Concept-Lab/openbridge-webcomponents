/**
 * `configured-alert-standard` – The one alert standard the experimental
 * alert components draw by.
 *
 * Nothing is configured until the application calls `setAlertStandard()`,
 * with `iec62923AlertStandard`, `isa182AlertStandard` or a standard of its
 * own. Until then the components draw no alert, the lists and the menu say
 * that no standard is set, and the console says how to set one.
 *
 * Usage:
 * ```ts
 * import {setAlertStandard} from '.../alert-system/configured-alert-standard.js';
 * import {iec62923AlertStandard} from '.../alert-system/iec-62923-alert-standard.js';
 *
 * setAlertStandard(iec62923AlertStandard);
 * ```
 */
import type {ReactiveController, ReactiveElement} from 'lit';
import type {AlertStandard} from './alert-standard.js';

let configuredAlertStandard: AlertStandard | undefined;

const listenersToAlertStandardChanges = new Set<
  (previousAlertStandard: AlertStandard | undefined) => void
>();

let missingAlertStandardWasReported = false;

export function setAlertStandard(standard: AlertStandard | undefined): void {
  if (standard === configuredAlertStandard) {
    return;
  }
  const previousAlertStandard = configuredAlertStandard;
  configuredAlertStandard = standard;
  for (const listener of [...listenersToAlertStandardChanges]) {
    listener(previousAlertStandard);
  }
}

export function getAlertStandard(): AlertStandard | undefined {
  return configuredAlertStandard;
}

function reportMissingAlertStandardOnce() {
  if (missingAlertStandardWasReported) {
    return;
  }
  missingAlertStandardWasReported = true;
  console.error(
    'No alert standard is set, so the experimental alert components draw no alerts. ' +
      'Call setAlertStandard() from alert-system/configured-alert-standard.js with ' +
      'iec62923AlertStandard, isa182AlertStandard or a standard defined with defineAlertStandard().'
  );
}

/** The key under which a host's `changedProperties` reports a new alert standard. */
export const ALERT_STANDARD_CHANGE_KEY = 'alertStandard';

/**
 * Re-renders its host when the configured alert standard changes, and
 * reports a missing one in the console.
 */
export class AlertStandardController implements ReactiveController {
  private readonly requestHostUpdateWithPreviousAlertStandard = (
    previousAlertStandard: AlertStandard | undefined
  ) =>
    this.host.requestUpdate(ALERT_STANDARD_CHANGE_KEY, previousAlertStandard);

  constructor(private readonly host: ReactiveElement) {
    host.addController(this);
  }

  get standard(): AlertStandard | undefined {
    return configuredAlertStandard;
  }

  hostConnected() {
    listenersToAlertStandardChanges.add(
      this.requestHostUpdateWithPreviousAlertStandard
    );
  }

  hostDisconnected() {
    listenersToAlertStandardChanges.delete(
      this.requestHostUpdateWithPreviousAlertStandard
    );
  }

  hostUpdate() {
    if (configuredAlertStandard === undefined) {
      reportMissingAlertStandardOnce();
    }
  }
}
