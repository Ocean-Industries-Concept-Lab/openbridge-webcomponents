/**
 * `iec-62923-alert-standard` – Bridge alerts as IEC 62923 and IMO MSC.302
 * define them.
 *
 * Features:
 * - Criticalities: emergency alarm, alarm, warning, caution.
 * - An alarm or a warning is unacknowledged, silenced, acknowledged or handed
 *   over while active, then rectified until it is acknowledged, then normal.
 *   The `-acknowledge-not-allowed` states are for an alert that is
 *   acknowledged somewhere else, such as a category C alert. An emergency
 *   alarm and a caution are only active or normal.
 * - The sorting ranks follow the display order of IEC 62923-1 6.4.2.1.
 * - Alerts are acknowledged one at a time (MSC.302 9.9).
 */
import {html} from 'lit';
import {msg} from '@lit/localize';
import '../icons/icon-alerts.js';
import '../icons/icon-unacknowledged.js';
import '../icons/icon-alarm-emergency-iec.js';
import '../icons/icon-alarm-noack-iec.js';
import '../icons/icon-warning-noack-iec.js';
import '../icons/icon-caution-color-iec.js';
import {FlashingSpeed} from '../types.js';
import {
  ALERT_ACTION_ID_APPLIED_BY_ACK_VISIBLE_BUTTON,
  defineAlertStandard,
  type AlertGlyph,
} from './alert-standard.js';
import {
  IEC_62923_ALARM_GLYPHS,
  IEC_62923_WARNING_GLYPHS,
} from './iec-62923-alert-glyphs.js';

const Unacknowledged = 'unacked';
const Active = 'active';
const Acknowledge = ALERT_ACTION_ID_APPLIED_BY_ACK_VISIBLE_BUTTON;

// TODO(designer): IEC 62923 draws an active emergency alarm as a flashing red
// square; the off frame is empty until the design draws one.
const EMERGENCY_ALARM_GLYPH: AlertGlyph = {
  frame: html`<obi-alarm-emergency-iec usecsscolor></obi-alarm-emergency-iec>`,
  flashFrame: html``,
};

const STEADY_EMERGENCY_ALARM_GLYPH: AlertGlyph = {
  frame: EMERGENCY_ALARM_GLYPH.frame,
};

const CAUTION_GLYPH: AlertGlyph = {
  frame: html`<obi-caution-color-iec usecsscolor></obi-caution-color-iec>`,
};

const ALARM_ACKNOWLEDGE_NOT_ALLOWED_GLYPH = html`<obi-alarm-noack-iec
  usecsscolor
></obi-alarm-noack-iec>`;

const WARNING_ACKNOWLEDGE_NOT_ALLOWED_GLYPH = html`<obi-warning-noack-iec
  usecsscolor
></obi-warning-noack-iec>`;

export const iec62923AlertStandard = defineAlertStandard({
  filters: {
    [Unacknowledged]: {
      label: () => msg('Unacked'),
      titleWhenNoAlertIsIncluded: () => msg('No unacknowledged alerts'),
      iconWhenNoAlertIsIncluded: html`<obi-unacknowledged></obi-unacknowledged>`,
    },
    [Active]: {
      label: () => msg('Active'),
      titleWhenNoAlertIsIncluded: () => msg('No active alerts'),
      iconWhenNoAlertIsIncluded: html`<obi-alerts></obi-alerts>`,
    },
  },
  actions: {
    [Acknowledge]: {label: () => msg('ACK')},
  },
  criticalities: {
    'emergency-alarm': {
      states: {
        active: {
          glyph: EMERGENCY_ALARM_GLYPH,
          sortingRank: 10,
          flashingSpeed: FlashingSpeed.Fast,
          includedInFilters: [Active],
        },
        normal: {
          glyph: STEADY_EMERGENCY_ALARM_GLYPH,
          sortingRank: 300,
        },
      },
    },
    alarm: {
      states: {
        'active-unacknowledged': {
          glyph: IEC_62923_ALARM_GLYPHS.unacknowledged,
          sortingRank: 20,
          flashingSpeed: FlashingSpeed.Fast,
          includedInFilters: [Unacknowledged, Active],
          offeredActions: [Acknowledge],
        },
        'active-unacknowledged-acknowledge-not-allowed': {
          glyph: IEC_62923_ALARM_GLYPHS.unacknowledged,
          sortingRank: 20,
          flashingSpeed: FlashingSpeed.Fast,
          includedInFilters: [Unacknowledged, Active],
          glyphShownInsteadOfActions: ALARM_ACKNOWLEDGE_NOT_ALLOWED_GLYPH,
        },
        'active-silenced': {
          glyph: IEC_62923_ALARM_GLYPHS.silenced,
          sortingRank: 20,
          flashingSpeed: FlashingSpeed.Fast,
          includedInFilters: [Unacknowledged, Active],
          offeredActions: [Acknowledge],
        },
        'active-silenced-acknowledge-not-allowed': {
          glyph: IEC_62923_ALARM_GLYPHS.silenced,
          sortingRank: 20,
          flashingSpeed: FlashingSpeed.Fast,
          includedInFilters: [Unacknowledged, Active],
          glyphShownInsteadOfActions: ALARM_ACKNOWLEDGE_NOT_ALLOWED_GLYPH,
        },
        'rectified-unacknowledged': {
          glyph: IEC_62923_ALARM_GLYPHS.rectified,
          sortingRank: 40,
          flashingSpeed: FlashingSpeed.VerySlow,
          includedInFilters: [Unacknowledged],
          offeredActions: [Acknowledge],
        },
        'rectified-unacknowledged-acknowledge-not-allowed': {
          glyph: IEC_62923_ALARM_GLYPHS.rectified,
          sortingRank: 40,
          flashingSpeed: FlashingSpeed.VerySlow,
          includedInFilters: [Unacknowledged],
          glyphShownInsteadOfActions: ALARM_ACKNOWLEDGE_NOT_ALLOWED_GLYPH,
        },
        'active-acknowledged': {
          glyph: IEC_62923_ALARM_GLYPHS.acknowledged,
          sortingRank: 60,
          includedInFilters: [Active],
        },
        'active-responsibility-transferred': {
          glyph: IEC_62923_ALARM_GLYPHS.responsibilityTransferred,
          sortingRank: 70,
          includedInFilters: [Active],
        },
        normal: {
          glyph: IEC_62923_ALARM_GLYPHS.normal,
          sortingRank: 310,
        },
      },
    },
    warning: {
      states: {
        'active-unacknowledged': {
          glyph: IEC_62923_WARNING_GLYPHS.unacknowledged,
          sortingRank: 30,
          flashingSpeed: FlashingSpeed.Slow,
          includedInFilters: [Unacknowledged, Active],
          offeredActions: [Acknowledge],
        },
        'active-unacknowledged-acknowledge-not-allowed': {
          glyph: IEC_62923_WARNING_GLYPHS.unacknowledged,
          sortingRank: 30,
          flashingSpeed: FlashingSpeed.Slow,
          includedInFilters: [Unacknowledged, Active],
          glyphShownInsteadOfActions: WARNING_ACKNOWLEDGE_NOT_ALLOWED_GLYPH,
        },
        'active-silenced': {
          glyph: IEC_62923_WARNING_GLYPHS.silenced,
          sortingRank: 30,
          flashingSpeed: FlashingSpeed.Slow,
          includedInFilters: [Unacknowledged, Active],
          offeredActions: [Acknowledge],
        },
        'active-silenced-acknowledge-not-allowed': {
          glyph: IEC_62923_WARNING_GLYPHS.silenced,
          sortingRank: 30,
          flashingSpeed: FlashingSpeed.Slow,
          includedInFilters: [Unacknowledged, Active],
          glyphShownInsteadOfActions: WARNING_ACKNOWLEDGE_NOT_ALLOWED_GLYPH,
        },
        'rectified-unacknowledged': {
          glyph: IEC_62923_WARNING_GLYPHS.rectified,
          sortingRank: 50,
          flashingSpeed: FlashingSpeed.VerySlow,
          includedInFilters: [Unacknowledged],
          offeredActions: [Acknowledge],
        },
        'rectified-unacknowledged-acknowledge-not-allowed': {
          glyph: IEC_62923_WARNING_GLYPHS.rectified,
          sortingRank: 50,
          flashingSpeed: FlashingSpeed.VerySlow,
          includedInFilters: [Unacknowledged],
          glyphShownInsteadOfActions: WARNING_ACKNOWLEDGE_NOT_ALLOWED_GLYPH,
        },
        'active-acknowledged': {
          glyph: IEC_62923_WARNING_GLYPHS.acknowledged,
          sortingRank: 80,
          includedInFilters: [Active],
        },
        'active-responsibility-transferred': {
          glyph: IEC_62923_WARNING_GLYPHS.responsibilityTransferred,
          sortingRank: 90,
          includedInFilters: [Active],
        },
        normal: {
          glyph: IEC_62923_WARNING_GLYPHS.normal,
          sortingRank: 320,
        },
      },
    },
    caution: {
      states: {
        active: {
          glyph: CAUTION_GLYPH,
          sortingRank: 100,
          includedInFilters: [Active],
        },
        normal: {
          glyph: CAUTION_GLYPH,
          sortingRank: 330,
        },
      },
    },
  },
});
