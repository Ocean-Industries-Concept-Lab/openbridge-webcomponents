/**
 * `standard-alert` – One alert as the experimental alert components need it:
 * an id, and the standard, criticality and state that decide everything else.
 *
 * The components read nothing more, so an application passes its own alert
 * objects as they are, with whatever other fields they carry. The columns of
 * `obc-alert-list-details-experimental` each name the extra fields they read.
 *
 * A standard registered from outside the library adds itself to
 * `RegisteredAlertStandards`, so its alerts type-check:
 * ```ts
 * declare module '<path to>/alert-system/standard-alert.js' {
 *   interface RegisteredAlertStandards {
 *     'my-standard': typeof myStandard;
 *   }
 * }
 * ```
 */
import type {AlertStandard} from './alert-standard.js';
import type {iec62923AlertStandard} from './iec-62923-alert-standard.js';
import type {isa182AlertStandard} from './isa-18-2-alert-standard.js';

export interface RegisteredAlertStandards {
  'iec-62923': typeof iec62923AlertStandard;
  'isa-18.2': typeof isa182AlertStandard;
}

/** Every criticality of a standard paired with a state that criticality defines. */
export type AlertCriticalityAndStateOf<Standard extends AlertStandard> = {
  [Criticality in keyof Standard['criticalities'] & string]: {
    criticality: Criticality;
    state: keyof Standard['criticalities'][Criticality]['states'] & string;
  };
}[keyof Standard['criticalities'] & string];

export interface StandardAlertCoreFields {
  id: string;
  /** Ids of the alerts this one is grouped under. */
  memberOf?: string[];
}

export type StandardAlertOf<StandardId extends keyof RegisteredAlertStandards> =
  StandardAlertCoreFields & {standard: StandardId} & AlertCriticalityAndStateOf<
      RegisteredAlertStandards[StandardId]
    >;

export type StandardAlert = {
  [StandardId in keyof RegisteredAlertStandards]: StandardAlertOf<StandardId>;
}[keyof RegisteredAlertStandards];

/** What names a state definition; an alert, or the properties of an icon. */
export interface AlertStandardCriticalityAndState {
  standard: string;
  criticality: string;
  state: string;
}
