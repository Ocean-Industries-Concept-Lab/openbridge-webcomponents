/**
 * `maritime-alert-system` – Alerts as IEC 62923 and IMO MSC.302 define them;
 * the standard `iec-62923`.
 *
 * Features:
 * - `MaritimeAlertCriticality`: emergency alarm, alarm, warning, caution.
 * - `MaritimeAlertState`: an alarm or a warning is active and
 *   unacknowledged, silenced, acknowledged or handed over (responsibility
 *   transferred), then rectified and unacknowledged until it is
 *   acknowledged, then normal. An emergency alarm and a caution are only
 *   active or normal, and take no acknowledgement.
 * - `maritimeAlertSystem`: draws the IEC 62923 icons. Alarms flash fast and
 *   warnings slow while they wait for an ACK, and very slow once rectified;
 *   acknowledged and handed-over alerts and cautions are steady, and an
 *   alert set aside keeps its flash. Alarms and warnings are acknowledged one
 *   at a time (MSC.302 9.9), so it allows no bulk acknowledgement.
 * - `ALARM_GLYPHS` and `WARNING_GLYPHS`, the IEC 62923 icons by state, which
 *   the automation standard borrows.
 */
import {html} from 'lit';
import {msg} from '@lit/localize';
import '../icons/icon-alarm-emergency-iec.js';
import '../icons/icon-alarm-unacknowledged-iec.js';
import '../icons/icon-alarm-acknowledged-outlined.js';
import '../icons/icon-alarm-silenced-iec.js';
import '../icons/icon-alarm-silenced-outlined.js';
import '../icons/icon-alarm-acknowledged-iec.js';
import '../icons/icon-alarm-transferred-iec.js';
import '../icons/icon-alarm-rectified-iec.js';
import '../icons/icon-alarm-rectified-outlined.js';
import '../icons/icon-warning-unacknowledged-iec.js';
import '../icons/icon-warning-unacknowledged-outlined.js';
import '../icons/icon-warning-silenced-iec.js';
import '../icons/icon-warning-silenced-outlined.js';
import '../icons/icon-warning-acknowledged-iec.js';
import '../icons/icon-warning-transferred-iec.js';
import '../icons/icon-warning-rectified-iec.js';
import '../icons/icon-warning-rectified-outlined.js';
import '../icons/icon-caution-color-iec.js';
import {FlashingSpeed, type ResolvedFlashingSpeed} from '../types.js';
import {
  AlertAcknowledgement,
  AlertCondition,
  NoAckGlyph,
  makePresentation,
  rankByUrgency,
  type AlertGlyph,
  type AlertPresentation,
  type AlertPresentOptions,
  type AlertSystem,
} from './alert-system.js';

export enum MaritimeAlertCriticality {
  EmergencyAlarm = 'emergency-alarm',
  Alarm = 'alarm',
  Warning = 'warning',
  Caution = 'caution',
}

export enum MaritimeAlertState {
  /** Emergency alarms and cautions: the situation is present. */
  Active = 'active',
  ActiveUnacknowledged = 'active-unacknowledged',
  /** The sound is silenced for a time; the alert still waits for acknowledgement. */
  ActiveSilenced = 'active-silenced',
  ActiveAcknowledged = 'active-acknowledged',
  /** Another station has taken the alert over. */
  ActiveResponsibilityTransferred = 'active-responsibility-transferred',
  RectifiedUnacknowledged = 'rectified-unacknowledged',
  Normal = 'normal',
}

/** The glyphs of one alert family, by the states that draw differently. */
export interface StateGlyphs {
  unacknowledged: AlertGlyph;
  silenced: AlertGlyph;
  acknowledged: AlertGlyph;
  transferred: AlertGlyph;
  rectified: AlertGlyph;
  normal: AlertGlyph;
}

export const ALARM_GLYPHS: StateGlyphs = {
  unacknowledged: {
    frame: html`<obi-alarm-unacknowledged-iec
      usecsscolor
    ></obi-alarm-unacknowledged-iec>`,
    flashFrame: html`<obi-alarm-acknowledged-outlined
      usecsscolor
    ></obi-alarm-acknowledged-outlined>`,
  },
  silenced: {
    frame: html`<obi-alarm-silenced-iec usecsscolor></obi-alarm-silenced-iec>`,
    flashFrame: html`<obi-alarm-silenced-outlined
      usecsscolor
    ></obi-alarm-silenced-outlined>`,
  },
  acknowledged: {
    frame: html`<obi-alarm-acknowledged-iec
      usecsscolor
    ></obi-alarm-acknowledged-iec>`,
  },
  transferred: {
    frame: html`<obi-alarm-transferred-iec
      usecsscolor
    ></obi-alarm-transferred-iec>`,
  },
  rectified: {
    frame: html`<obi-alarm-rectified-iec
      usecsscolor
    ></obi-alarm-rectified-iec>`,
    flashFrame: html`<obi-alarm-rectified-outlined
      usecsscolor
    ></obi-alarm-rectified-outlined>`,
  },
  normal: {
    frame: html`<obi-alarm-rectified-outlined
      usecsscolor
    ></obi-alarm-rectified-outlined>`,
  },
};

export const WARNING_GLYPHS: StateGlyphs = {
  unacknowledged: {
    frame: html`<obi-warning-unacknowledged-iec
      usecsscolor
    ></obi-warning-unacknowledged-iec>`,
    flashFrame: html`<obi-warning-unacknowledged-outlined
      usecsscolor
    ></obi-warning-unacknowledged-outlined>`,
  },
  silenced: {
    frame: html`<obi-warning-silenced-iec
      usecsscolor
    ></obi-warning-silenced-iec>`,
    flashFrame: html`<obi-warning-silenced-outlined
      usecsscolor
    ></obi-warning-silenced-outlined>`,
  },
  acknowledged: {
    frame: html`<obi-warning-acknowledged-iec
      usecsscolor
    ></obi-warning-acknowledged-iec>`,
  },
  transferred: {
    frame: html`<obi-warning-transferred-iec
      usecsscolor
    ></obi-warning-transferred-iec>`,
  },
  rectified: {
    frame: html`<obi-warning-rectified-iec
      usecsscolor
    ></obi-warning-rectified-iec>`,
    flashFrame: html`<obi-warning-rectified-outlined
      usecsscolor
    ></obi-warning-rectified-outlined>`,
  },
  normal: {
    frame: html`<obi-warning-rectified-outlined
      usecsscolor
    ></obi-warning-rectified-outlined>`,
  },
};

// TODO(designer): IEC 62923 draws an active emergency alarm as a flashing red
// square; the off frame is empty until the design draws one, and a normal
// one keeps the steady square, as a caution keeps its icon.
const EMERGENCY_GLYPH: AlertGlyph = {
  frame: html`<obi-alarm-emergency-iec usecsscolor></obi-alarm-emergency-iec>`,
  flashFrame: html``,
};

const CAUTION_GLYPH: AlertGlyph = {
  frame: html`<obi-caution-color-iec usecsscolor></obi-caution-color-iec>`,
};

const ACTIVE_FLASH: Record<MaritimeAlertCriticality, ResolvedFlashingSpeed> = {
  [MaritimeAlertCriticality.EmergencyAlarm]: FlashingSpeed.Fast,
  [MaritimeAlertCriticality.Alarm]: FlashingSpeed.Fast,
  [MaritimeAlertCriticality.Warning]: FlashingSpeed.Slow,
  [MaritimeAlertCriticality.Caution]: FlashingSpeed.Fixed,
};

const LABEL: Record<MaritimeAlertCriticality, () => string> = {
  [MaritimeAlertCriticality.EmergencyAlarm]: () => msg('Emergency alarm'),
  [MaritimeAlertCriticality.Alarm]: () => msg('Alarm'),
  [MaritimeAlertCriticality.Warning]: () => msg('Warning'),
  [MaritimeAlertCriticality.Caution]: () => msg('Caution'),
};

const CRITICALITIES = Object.values(MaritimeAlertCriticality);

const STATES = Object.values(MaritimeAlertState);

/** An emergency alarm and a caution take no ACK, so they are only active or normal. */
const ACTIVE_OR_NORMAL = [MaritimeAlertState.Active, MaritimeAlertState.Normal];

const ACKNOWLEDGEABLE_STATES = STATES.filter(
  (state) => state !== MaritimeAlertState.Active
);

const takesNoAck = (criticality: MaritimeAlertCriticality) =>
  criticality === MaritimeAlertCriticality.EmergencyAlarm ||
  criticality === MaritimeAlertCriticality.Caution;

function presentUnacknowledgeable(
  criticality: MaritimeAlertCriticality,
  state: MaritimeAlertState,
  options?: AlertPresentOptions
): AlertPresentation {
  const active =
    state !== MaritimeAlertState.Normal &&
    state !== MaritimeAlertState.RectifiedUnacknowledged;
  const emergency = criticality === MaritimeAlertCriticality.EmergencyAlarm;
  return makePresentation(
    emergency ? EMERGENCY_GLYPH : CAUTION_GLYPH,
    {
      condition: active ? AlertCondition.Active : AlertCondition.Normal,
      acknowledgement: AlertAcknowledgement.None,
      flash: active ? ACTIVE_FLASH[criticality] : FlashingSpeed.Fixed,
    },
    options
  );
}

function present(
  criticality: MaritimeAlertCriticality,
  state: MaritimeAlertState,
  options?: AlertPresentOptions
): AlertPresentation {
  if (takesNoAck(criticality)) {
    return presentUnacknowledgeable(criticality, state, options);
  }
  const glyphs =
    criticality === MaritimeAlertCriticality.Alarm
      ? ALARM_GLYPHS
      : WARNING_GLYPHS;
  switch (state) {
    case MaritimeAlertState.ActiveSilenced:
      return makePresentation(
        glyphs.silenced,
        {
          condition: AlertCondition.Active,
          acknowledgement: AlertAcknowledgement.Unacked,
          silenced: true,
          flash: ACTIVE_FLASH[criticality],
        },
        options
      );
    case MaritimeAlertState.ActiveAcknowledged:
      return makePresentation(
        glyphs.acknowledged,
        {
          condition: AlertCondition.Active,
          acknowledgement: AlertAcknowledgement.Acked,
          flash: FlashingSpeed.Fixed,
        },
        options
      );
    case MaritimeAlertState.ActiveResponsibilityTransferred:
      return makePresentation(
        glyphs.transferred,
        {
          condition: AlertCondition.Active,
          acknowledgement: AlertAcknowledgement.Unacked,
          transferred: true,
          flash: FlashingSpeed.Fixed,
        },
        options
      );
    case MaritimeAlertState.RectifiedUnacknowledged:
      return makePresentation(
        glyphs.rectified,
        {
          condition: AlertCondition.Cleared,
          acknowledgement: AlertAcknowledgement.Unacked,
          flash: FlashingSpeed.VerySlow,
        },
        options
      );
    case MaritimeAlertState.Normal:
      return makePresentation(
        glyphs.normal,
        {
          condition: AlertCondition.Normal,
          acknowledgement: AlertAcknowledgement.Acked,
          flash: FlashingSpeed.Fixed,
        },
        options
      );
    default:
      return makePresentation(
        glyphs.unacknowledged,
        {
          condition: AlertCondition.Active,
          acknowledgement: AlertAcknowledgement.Unacked,
          flash: ACTIVE_FLASH[criticality],
        },
        options
      );
  }
}

export const maritimeAlertSystem: AlertSystem<
  MaritimeAlertCriticality,
  MaritimeAlertState
> = {
  id: 'iec-62923',
  criticalities: CRITICALITIES,
  states: STATES,
  statesOf: (criticality) =>
    takesNoAck(criticality) ? ACTIVE_OR_NORMAL : ACKNOWLEDGEABLE_STATES,
  allowsBulkAcknowledge: false,
  label: (criticality) => LABEL[criticality](),
  present,
  noAckGlyph: (criticality) =>
    criticality === MaritimeAlertCriticality.Warning ||
    criticality === MaritimeAlertCriticality.Caution
      ? NoAckGlyph.Warning
      : NoAckGlyph.Alarm,
  displayRank: (criticality, state) =>
    rankByUrgency(
      present(criticality, state),
      CRITICALITIES.indexOf(criticality)
    ),
};
