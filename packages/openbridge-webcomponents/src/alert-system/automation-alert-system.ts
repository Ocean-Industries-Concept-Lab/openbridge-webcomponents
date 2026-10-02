/**
 * `automation-alert-system` – Alarms as ISA-18.2 and IEC 62682 define them
 * (process alarm management); the standard `isa-18.2`.
 *
 * Features:
 * - `AutomationAlertCriticality`: critical, high, medium, low, and diagnostic,
 *   which takes no acknowledgement.
 * - `AutomationAlertState`: normal, unacknowledged, acknowledged, returned to
 *   normal while still unacknowledged, and latched, unacknowledged or
 *   acknowledged, where the alarm stays after its condition clears until an
 *   operator resets it. A diagnostic alert is active or normal.
 * - `automationAlertSystem`: an unacknowledged alarm flashes fast when
 *   critical or high, slow when medium and very slow when low; one that has
 *   returned to normal or latched flashes very slow until acknowledged. An
 *   alarm set aside does not flash. Several alarms may be acknowledged at
 *   once.
 */
import {html} from 'lit';
import {msg} from '@lit/localize';
import '../components/alert-frame/diagnostic-badge.js';
import {FlashingSpeed, type ResolvedFlashingSpeed} from '../types.js';
import {
  AlertAcknowledgement,
  AlertCondition,
  NoAckGlyph,
  makePresentation,
  rankByUrgency,
  type AlertGlyph,
  type AlertPresentation,
  type AlertSystem,
} from './alert-system.js';
import {ALARM_GLYPHS, WARNING_GLYPHS} from './maritime-alert-system.js';
import {
  criticalUnacknowledgedA,
  criticalUnacknowledgedB,
} from '../components/alert-icon/icons/icon-critical-unacknowledged.js';
import {criticalAcknowledged} from '../components/alert-icon/icons/icon-critical-acknowledged.js';
import {
  criticalRectifiedA,
  criticalRectifiedB,
} from '../components/alert-icon/icons/icon-critical-rectified.js';
import {
  lowUnacknowledgedA,
  lowUnacknowledgedB,
} from '../components/alert-icon/icons/icon-low-unacknowledged.js';
import {lowAcknowledged} from '../components/alert-icon/icons/icon-low-acknowledged.js';
import {
  lowRectifiedA,
  lowRectifiedB,
} from '../components/alert-icon/icons/icon-low-rectified.js';

export enum AutomationAlertCriticality {
  Critical = 'critical',
  High = 'high',
  Medium = 'medium',
  Low = 'low',
  Diagnostic = 'diagnostic',
}

export enum AutomationAlertState {
  /** Diagnostic alerts: the condition is present. */
  Active = 'active',
  Normal = 'normal',
  Unacknowledged = 'unacknowledged',
  Acknowledged = 'acknowledged',
  ReturnedToNormalUnacknowledged = 'returned-to-normal-unacknowledged',
  LatchedUnacknowledged = 'latched-unacknowledged',
  LatchedAcknowledged = 'latched-acknowledged',
}

/** The glyphs of one priority, by the states that draw differently. */
interface PriorityGlyphs {
  unacknowledged: AlertGlyph;
  acknowledged: AlertGlyph;
  /** Returned to normal or latched, still owed an ACK. */
  rectified: AlertGlyph;
  normal: AlertGlyph;
}

// TODO(designer): ISA-18.2 prescribes no symbols. Critical and low have glyphs
// of their own; high and medium borrow the IEC 62923 alarm and warning icons,
// and no priority has a glyph for a latched alarm that owes a reset.
const GLYPHS: Record<
  Exclude<AutomationAlertCriticality, AutomationAlertCriticality.Diagnostic>,
  PriorityGlyphs
> = {
  [AutomationAlertCriticality.Critical]: {
    unacknowledged: {
      frame: criticalUnacknowledgedA,
      flashFrame: criticalUnacknowledgedB,
    },
    acknowledged: {frame: criticalAcknowledged},
    rectified: {frame: criticalRectifiedA, flashFrame: criticalRectifiedB},
    normal: {frame: criticalRectifiedB},
  },
  [AutomationAlertCriticality.High]: ALARM_GLYPHS,
  [AutomationAlertCriticality.Medium]: WARNING_GLYPHS,
  [AutomationAlertCriticality.Low]: {
    unacknowledged: {frame: lowUnacknowledgedA, flashFrame: lowUnacknowledgedB},
    acknowledged: {frame: lowAcknowledged},
    rectified: {frame: lowRectifiedA, flashFrame: lowRectifiedB},
    normal: {frame: lowRectifiedB},
  },
};

const DIAGNOSTIC_GLYPH: AlertGlyph = {
  frame: html`<obi-diagnostic-badge
    style="color: var(--alert-diagnostic-color)"
  ></obi-diagnostic-badge>`,
};

const ACTIVE_FLASH: Record<AutomationAlertCriticality, ResolvedFlashingSpeed> =
  {
    [AutomationAlertCriticality.Critical]: FlashingSpeed.Fast,
    [AutomationAlertCriticality.High]: FlashingSpeed.Fast,
    [AutomationAlertCriticality.Medium]: FlashingSpeed.Slow,
    [AutomationAlertCriticality.Low]: FlashingSpeed.VerySlow,
    [AutomationAlertCriticality.Diagnostic]: FlashingSpeed.Fixed,
  };

const LABEL: Record<AutomationAlertCriticality, () => string> = {
  [AutomationAlertCriticality.Critical]: () => msg('Critical'),
  [AutomationAlertCriticality.High]: () => msg('High'),
  [AutomationAlertCriticality.Medium]: () => msg('Medium'),
  [AutomationAlertCriticality.Low]: () => msg('Low'),
  [AutomationAlertCriticality.Diagnostic]: () => msg('Diagnostic'),
};

const CRITICALITIES = Object.values(AutomationAlertCriticality);

const STATES = Object.values(AutomationAlertState);

/** A diagnostic alert takes no ACK, so it is only active or normal. */
const ACTIVE_OR_NORMAL = [
  AutomationAlertState.Active,
  AutomationAlertState.Normal,
];

const ALARM_STATES = STATES.filter(
  (state) => state !== AutomationAlertState.Active
);

function presentDiagnostic(state: AutomationAlertState): AlertPresentation {
  const active =
    state === AutomationAlertState.Active ||
    state === AutomationAlertState.Unacknowledged ||
    state === AutomationAlertState.Acknowledged;
  return makePresentation(DIAGNOSTIC_GLYPH, {
    condition: active ? AlertCondition.Active : AlertCondition.Normal,
    acknowledgement: AlertAcknowledgement.None,
    flash: FlashingSpeed.Fixed,
  });
}

/** The presentation before an alarm set aside stops flashing. */
function presentAlarm(
  criticality: AutomationAlertCriticality,
  state: AutomationAlertState
): AlertPresentation {
  if (criticality === AutomationAlertCriticality.Diagnostic) {
    return presentDiagnostic(state);
  }
  const glyphs = GLYPHS[criticality];
  switch (state) {
    case AutomationAlertState.Acknowledged:
      return makePresentation(glyphs.acknowledged, {
        condition: AlertCondition.Active,
        acknowledgement: AlertAcknowledgement.Acked,
        flash: FlashingSpeed.Fixed,
      });
    case AutomationAlertState.ReturnedToNormalUnacknowledged:
    case AutomationAlertState.LatchedUnacknowledged:
      return makePresentation(glyphs.rectified, {
        condition: AlertCondition.Cleared,
        acknowledgement: AlertAcknowledgement.Unacked,
        flash: FlashingSpeed.VerySlow,
        resetOwed: state === AutomationAlertState.LatchedUnacknowledged,
      });
    case AutomationAlertState.LatchedAcknowledged:
      return makePresentation(
        {frame: glyphs.rectified.frame},
        {
          condition: AlertCondition.Cleared,
          acknowledgement: AlertAcknowledgement.Acked,
          flash: FlashingSpeed.Fixed,
          resetOwed: true,
        }
      );
    case AutomationAlertState.Normal:
      return makePresentation(glyphs.normal, {
        condition: AlertCondition.Normal,
        acknowledgement: AlertAcknowledgement.Acked,
        flash: FlashingSpeed.Fixed,
      });
    default:
      return makePresentation(glyphs.unacknowledged, {
        condition: AlertCondition.Active,
        acknowledgement: AlertAcknowledgement.Unacked,
        flash: ACTIVE_FLASH[criticality],
      });
  }
}

export const automationAlertSystem: AlertSystem<
  AutomationAlertCriticality,
  AutomationAlertState
> = {
  id: 'isa-18.2',
  criticalities: CRITICALITIES,
  states: STATES,
  statesOf: (criticality) =>
    criticality === AutomationAlertCriticality.Diagnostic
      ? ACTIVE_OR_NORMAL
      : ALARM_STATES,
  allowsBulkAcknowledge: true,
  label: (criticality) => LABEL[criticality](),
  present(criticality, state, options) {
    const presentation = presentAlarm(criticality, state);
    return {
      ...presentation,
      setAside: options?.setAside,
      flash: options?.setAside ? FlashingSpeed.Fixed : presentation.flash,
    };
  },
  noAckGlyph: (criticality) =>
    criticality === AutomationAlertCriticality.Critical ||
    criticality === AutomationAlertCriticality.High
      ? NoAckGlyph.Alarm
      : NoAckGlyph.Warning,
  displayRank: (criticality, state) =>
    rankByUrgency(
      presentAlarm(criticality, state),
      CRITICALITIES.indexOf(criticality)
    ),
};
