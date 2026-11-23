/**
 * `configured-alert-standard` – The one alert standard the experimental
 * alert components draw by.
 *
 * Nothing is configured until the application calls `setAlertStandard()`,
 * with `iec62923AlertStandard`, `isa182AlertStandard` or a standard of its
 * own. Until then the components draw no alert, the lists and the menu say
 * that no standard is set, and the console says how to set one.
 *
 * The standard is a `GlobalSetting`: a component that holds the controller
 * `observeAlertStandard()` gives it re-renders when the standard changes,
 * and one detached while it changed comes back current on reconnect.
 * Nothing sets the standard from inside an update, which would loop.
 *
 * Usage:
 * ```ts
 * import {setAlertStandard} from '.../alert-system/configured-alert-standard.js';
 * import {iec62923AlertStandard} from '.../alert-system/iec-62923-alert-standard.js';
 *
 * setAlertStandard(iec62923AlertStandard);
 * ```
 */
import type {ReactiveControllerHost} from 'lit';
import {
  GlobalSetting,
  type GlobalSettingController,
} from '../internal/global-setting.js';
import type {AlertStandard} from './alert-standard.js';

const configuredAlertStandard = new GlobalSetting<AlertStandard | undefined>(
  undefined
);

let missingAlertStandardWasReported = false;

export function setAlertStandard(standard: AlertStandard | undefined): void {
  configuredAlertStandard.set(standard);
}

/** Re-renders `host` when the standard changes; create it once, as a field of the component. */
export function observeAlertStandard(
  host: ReactiveControllerHost
): GlobalSettingController<AlertStandard | undefined> {
  return configuredAlertStandard.controller(host);
}

/** The configured standard; a read while none is set says once in the console how to set one. */
export function getAlertStandard(): AlertStandard | undefined {
  const standard = configuredAlertStandard.get();
  if (standard === undefined) {
    reportMissingAlertStandardOnce();
  }
  return standard;
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
