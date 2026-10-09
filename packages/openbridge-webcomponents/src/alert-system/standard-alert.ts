/**
 * `standard-alert` – One alert in the terms of the standard it follows: the
 * experimental counterpart of `Alert`.
 *
 * The standard is part of the alert, and the criticality and state are that
 * standard's own. So `high` cannot mean two things, and the state is the one
 * source of truth for whether an alert is active or acknowledged.
 *
 * Features:
 * - `AlertStandards`: the criticality and state of each standard, keyed by
 *   its id. A standard from outside the library adds its entry by
 *   declaration merging.
 * - `StandardAlert`: one alert, a union keyed by `standard`.
 *
 * Usage:
 * ```ts
 * const alert: StandardAlert = {
 *   standard: 'isa-18.2',
 *   criticality: AutomationAlertCriticality.High,
 *   state: AutomationAlertState.Unacknowledged,
 *   id: 'p1',
 *   tagId: 'P1',
 *   source: 'Pump 1',
 *   text: 'Discharge pressure low',
 *   time: new Date(),
 * };
 * ```
 */
import type {AlertCategory} from '../types.js';
import type {AlertSetAside} from './alert-system.js';
import type {
  MaritimeAlertCriticality,
  MaritimeAlertState,
} from './maritime-alert-system.js';
import type {
  AutomationAlertCriticality,
  AutomationAlertState,
} from './automation-alert-system.js';

/**
 * The criticality and state of every standard an alert can follow, keyed by
 * the standard's id. A registered standard adds itself:
 * `declare module '<path>/standard-alert.js' { interface AlertStandards { 'my-standard': {criticality: MyCriticality; state: MyState} } }`.
 */
export interface AlertStandards {
  'iec-62923': {
    criticality: MaritimeAlertCriticality;
    state: MaritimeAlertState;
  };
  'isa-18.2': {
    criticality: AutomationAlertCriticality;
    state: AutomationAlertState;
  };
}

/** What every alert carries, whatever its standard. */
export interface StandardAlertFields {
  id: string;
  tagId: string;
  source: string;
  text: string;
  note?: string;
  time: Date;
  lastModified?: Date;
  /** Who acknowledged the alert, and when; the state says whether it is. */
  acknowledgedBy?: string;
  acknowledgedAt?: Date;
  /** Why the alert is set aside, so the lists of active and unacked alerts leave it out. */
  setAside?: AlertSetAside;
  /** The alert is acknowledged somewhere else, never from here. */
  noAck?: boolean;
  category?: AlertCategory;
  /** Ids of the alerts this one is grouped under. */
  memberOf?: string[];
}

export type StandardAlert = {
  [S in keyof AlertStandards]: StandardAlertFields & {
    standard: S;
    criticality: AlertStandards[S]['criticality'];
    state: AlertStandards[S]['state'];
  };
}[keyof AlertStandards];
