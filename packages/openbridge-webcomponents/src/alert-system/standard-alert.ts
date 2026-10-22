/**
 * `standard-alert` – One alert as the experimental alert components need it:
 * an id, and the criticality and state that the configured alert standard
 * turns into everything else.
 *
 * The components read nothing more, so an application passes its own alert
 * objects as they are, with whatever other fields they carry. The columns of
 * `obc-alert-list-details-experimental` each name the extra fields they read.
 *
 * `StandardAlertOf<typeof myStandard>` narrows `criticality` and `state` to
 * the pairs a standard defines:
 * ```ts
 * const alerts: StandardAlertOf<typeof iec62923AlertStandard>[] = [
 *   {id: 'radar', criticality: 'alarm', state: 'active-unacknowledged'},
 * ];
 * ```
 */
import type {AlertStandard} from './alert-standard.js';

export interface AlertCriticalityAndState {
  criticality: string;
  state: string;
}

export interface StandardAlert extends AlertCriticalityAndState {
  id: string;
  /** Ids of the alerts this one is grouped under. */
  memberOf?: string[];
}

/** Every criticality of a standard paired with a state that criticality defines. */
export type AlertCriticalityAndStateOf<Standard extends AlertStandard> = {
  [Criticality in keyof Standard['criticalities'] & string]: {
    criticality: Criticality;
    state: keyof Standard['criticalities'][Criticality]['states'] & string;
  };
}[keyof Standard['criticalities'] & string];

export type StandardAlertOf<Standard extends AlertStandard> = Omit<
  StandardAlert,
  keyof AlertCriticalityAndState
> &
  AlertCriticalityAndStateOf<Standard>;
