/**
 * `state-after-action` – What the stories' stand-in application does when
 * the user clicks an action.
 *
 * The components only report the click. Moving the alert to its next state
 * is the application's job, since the alert system behind it owns the alert.
 */
import {ownEntryOf} from '../alert-standard.js';
import type {Iec62923AlertFields} from '../iec-62923-alert-standard.js';
import {ISA_18_2_TIME_FIELD_EACH_STATE_SHOWS} from '../isa-18-2-alert-standard.js';
import type {StandardAlert} from '../standard-alert.js';

const IEC_62923_STATE_AFTER_ACTION: Record<string, Record<string, string>> = {
  acknowledge: {
    'active-unacknowledged': 'active-acknowledged',
    'active-silenced': 'active-acknowledged',
    'rectified-unacknowledged': 'normal',
  },
};

const ISA_18_2_STATE_AFTER_ACTION: Record<string, Record<string, string>> = {
  acknowledge: {
    unacknowledged: 'acknowledged',
    'returned-to-normal-unacknowledged': 'normal',
  },
  shelve: {
    unacknowledged: 'shelved-active',
    acknowledged: 'shelved-active',
    'returned-to-normal-unacknowledged': 'shelved-not-active',
  },
  unshelve: {
    'shelved-active': 'acknowledged',
    'shelved-not-active': 'normal',
  },
};

const ISA_18_2_SERVICE_VIEW_STATE_AFTER_ACTION: Record<
  string,
  Record<string, string>
> = {
  'remove-from-service': {
    unacknowledged: 'out-of-service-active',
    acknowledged: 'out-of-service-active',
    'returned-to-normal-unacknowledged': 'out-of-service-not-active',
    'shelved-active': 'out-of-service-active',
    'shelved-not-active': 'out-of-service-not-active',
    'suppressed-by-design-active': 'out-of-service-active',
    'suppressed-by-design-not-active': 'out-of-service-not-active',
  },
  'return-to-service': {
    'out-of-service-active': 'unacknowledged',
    'out-of-service-not-active': 'normal',
  },
};

export function iec62923StateAfterAction(
  state: string,
  actionId: string
): string {
  return IEC_62923_STATE_AFTER_ACTION[actionId]?.[state] ?? state;
}

export function isa182StateAfterAction(
  state: string,
  actionId: string
): string {
  return ISA_18_2_STATE_AFTER_ACTION[actionId]?.[state] ?? state;
}

export function isa182ServiceViewStateAfterAction(
  state: string,
  actionId: string
): string {
  return ISA_18_2_SERVICE_VIEW_STATE_AFTER_ACTION[actionId]?.[state] ?? state;
}

/** The alert in its next state, its time of last state change set to now. */
export function iec62923AlertAfterAction<
  Alert extends StandardAlert & Iec62923AlertFields,
>(alert: Alert, actionId: string): Alert {
  const state = iec62923StateAfterAction(alert.state, actionId);
  return state === alert.state
    ? alert
    : {...alert, state, timeOfLastStateChange: new Date()};
}

/**
 * The alarm in its next state, with the time that state shows. A time the
 * alarm already carries for becoming active is kept; setting it aside is
 * stamped now.
 */
export function isa182AlertAfterAction<Alert extends StandardAlert>(
  alarm: Alert,
  actionId: string,
  stateAfterAction: (
    state: string,
    actionId: string
  ) => string = isa182StateAfterAction
): Alert {
  const state = stateAfterAction(alarm.state, actionId);
  if (state === alarm.state) {
    return alarm;
  }
  const timeField = ownEntryOf<string>(
    ISA_18_2_TIME_FIELD_EACH_STATE_SHOWS,
    state
  );
  const keepsTheTimeItBecameActive =
    timeField === 'timeAlarmBecameActive' && timeField in alarm;
  return timeField === undefined || keepsTheTimeItBecameActive
    ? {...alarm, state}
    : {...alarm, state, [timeField]: new Date()};
}
