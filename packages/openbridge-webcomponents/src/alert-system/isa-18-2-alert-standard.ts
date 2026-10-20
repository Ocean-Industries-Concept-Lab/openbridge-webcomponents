/**
 * `isa-18-2-alert-standard` – Process alarms as ISA-18.2 and IEC 62682
 * define them.
 *
 * Features:
 * - Priorities: critical, high, medium and low.
 * - An alarm follows the states of ISA-18.2 Figure 3: unacknowledged,
 *   acknowledged, returned to normal unacknowledged, shelved, suppressed by
 *   design, out of service and normal. A shelved, suppressed or out-of-service
 *   alarm is still active or not active, and is a state of its own for each,
 *   since their lists show which (ISA-18.2 11.7.4, 11.8.3, 11.9.4).
 * - Shelved, suppressed-by-design and out-of-service alarms each have a
 *   filter of their own (ISA-18.2 11.2.4), and do not flash.
 * - Several alarms may be acknowledged at once.
 *
 * Usage Guidelines:
 * - The application moves alarms between states. An alarm the operator
 *   unshelves goes to acknowledged while active and to normal otherwise; one
 *   unshelved by its time limit goes to unacknowledged while active
 *   (ISA-18.2 11.7.3).
 * - Taking an alarm out of service and returning it is maintenance's work, so
 *   the operator is offered neither. An application that gives maintenance a
 *   view of its own extends this standard with those actions.
 *
 * ISA-18.2 is published by the International Society of Automation, which
 * is not affiliated with this project and has not endorsed it; supporting
 * the standard's states implies no certification.
 */
import {html} from 'lit';
import {msg} from '@lit/localize';
import '../icons/icon-alerts.js';
import '../icons/icon-alerts-active.js';
import '../icons/icon-alerts-shelf.js';
import '../icons/icon-unacknowledged.js';
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

const Unacknowledged = 'unacked';
const Active = 'active';
const Acknowledge = ALERT_ACTION_ID_APPLIED_BY_ACK_VISIBLE_BUTTON;
const Shelved = 'shelved';
const SuppressedByDesign = 'suppressed-by-design';
const OutOfService = 'out-of-service';
const Shelve = 'shelve';
const Unshelve = 'unshelve';

// TODO(designer): ISA-18.2 prescribes no symbols. Critical and low have glyphs
// of their own; high and medium borrow the IEC 62923 alarm and warning icons,
// and a shelved, suppressed or out-of-service alarm draws the acknowledged
// glyph until the design gives each its own.
const CRITICAL_GLYPHS = {
  unacknowledged: {
    frame: criticalUnacknowledgedA,
    flashFrame: criticalUnacknowledgedB,
  },
  acknowledged: {frame: criticalAcknowledged},
  returnedToNormal: {
    frame: criticalRectifiedA,
    flashFrame: criticalRectifiedB,
  },
  normal: {frame: criticalRectifiedB},
} satisfies Record<string, AlertGlyph>;

const HIGH_GLYPHS = {
  unacknowledged: IEC_62923_ALARM_GLYPHS.unacknowledged,
  acknowledged: IEC_62923_ALARM_GLYPHS.acknowledged,
  returnedToNormal: IEC_62923_ALARM_GLYPHS.rectified,
  normal: IEC_62923_ALARM_GLYPHS.normal,
} satisfies Record<string, AlertGlyph>;

const MEDIUM_GLYPHS = {
  unacknowledged: IEC_62923_WARNING_GLYPHS.unacknowledged,
  acknowledged: IEC_62923_WARNING_GLYPHS.acknowledged,
  returnedToNormal: IEC_62923_WARNING_GLYPHS.rectified,
  normal: IEC_62923_WARNING_GLYPHS.normal,
} satisfies Record<string, AlertGlyph>;

const LOW_GLYPHS = {
  unacknowledged: {frame: lowUnacknowledgedA, flashFrame: lowUnacknowledgedB},
  acknowledged: {frame: lowAcknowledged},
  returnedToNormal: {frame: lowRectifiedA, flashFrame: lowRectifiedB},
  normal: {frame: lowRectifiedB},
} satisfies Record<string, AlertGlyph>;

export const isa182AlertStandard = defineAlertStandard({
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
    [Shelved]: {
      label: () => msg('Shelved'),
      titleWhenNoAlertIsIncluded: () => msg('No shelved alerts'),
      iconWhenNoAlertIsIncluded: html`<obi-alerts-shelf></obi-alerts-shelf>`,
    },
    [SuppressedByDesign]: {
      label: () => msg('Suppressed by design'),
      titleWhenNoAlertIsIncluded: () => msg('No alerts suppressed by design'),
      iconWhenNoAlertIsIncluded: html`<obi-alerts-active></obi-alerts-active>`,
    },
    [OutOfService]: {
      label: () => msg('Out of service'),
      titleWhenNoAlertIsIncluded: () => msg('No alerts out of service'),
      iconWhenNoAlertIsIncluded: html`<obi-alerts-active></obi-alerts-active>`,
    },
  },
  actions: {
    [Acknowledge]: {
      label: () => msg('ACK'),
      canBeAppliedToSeveralAlertsAtOnce: true,
    },
    [Shelve]: {label: () => msg('Shelve')},
    [Unshelve]: {label: () => msg('Unshelve')},
  },
  criticalities: {
    critical: {
      states: {
        unacknowledged: {
          glyph: CRITICAL_GLYPHS.unacknowledged,
          sortingRank: 20,
          flashingSpeed: FlashingSpeed.Fast,
          includedInFilters: [Unacknowledged, Active],
          offeredActions: [Acknowledge, Shelve],
        },
        'returned-to-normal-unacknowledged': {
          glyph: CRITICAL_GLYPHS.returnedToNormal,
          sortingRank: 40,
          flashingSpeed: FlashingSpeed.VerySlow,
          includedInFilters: [Unacknowledged],
          offeredActions: [Acknowledge, Shelve],
        },
        acknowledged: {
          glyph: CRITICAL_GLYPHS.acknowledged,
          sortingRank: 60,
          includedInFilters: [Active],
          offeredActions: [Shelve],
        },
        'shelved-active': {
          glyph: CRITICAL_GLYPHS.acknowledged,
          sortingRank: 200,
          includedInFilters: [Shelved],
          offeredActions: [Unshelve],
        },
        'shelved-not-active': {
          glyph: CRITICAL_GLYPHS.acknowledged,
          sortingRank: 204,
          includedInFilters: [Shelved],
          offeredActions: [Unshelve],
        },
        'suppressed-by-design-active': {
          glyph: CRITICAL_GLYPHS.acknowledged,
          sortingRank: 210,
          includedInFilters: [SuppressedByDesign],
        },
        'suppressed-by-design-not-active': {
          glyph: CRITICAL_GLYPHS.acknowledged,
          sortingRank: 214,
          includedInFilters: [SuppressedByDesign],
        },
        'out-of-service-active': {
          glyph: CRITICAL_GLYPHS.acknowledged,
          sortingRank: 220,
          includedInFilters: [OutOfService],
        },
        'out-of-service-not-active': {
          glyph: CRITICAL_GLYPHS.acknowledged,
          sortingRank: 224,
          includedInFilters: [OutOfService],
        },
        normal: {
          glyph: CRITICAL_GLYPHS.normal,
          sortingRank: 340,
        },
      },
    },
    high: {
      states: {
        unacknowledged: {
          glyph: HIGH_GLYPHS.unacknowledged,
          sortingRank: 21,
          flashingSpeed: FlashingSpeed.Fast,
          includedInFilters: [Unacknowledged, Active],
          offeredActions: [Acknowledge, Shelve],
        },
        'returned-to-normal-unacknowledged': {
          glyph: HIGH_GLYPHS.returnedToNormal,
          sortingRank: 41,
          flashingSpeed: FlashingSpeed.VerySlow,
          includedInFilters: [Unacknowledged],
          offeredActions: [Acknowledge, Shelve],
        },
        acknowledged: {
          glyph: HIGH_GLYPHS.acknowledged,
          sortingRank: 61,
          includedInFilters: [Active],
          offeredActions: [Shelve],
        },
        'shelved-active': {
          glyph: HIGH_GLYPHS.acknowledged,
          sortingRank: 201,
          includedInFilters: [Shelved],
          offeredActions: [Unshelve],
        },
        'shelved-not-active': {
          glyph: HIGH_GLYPHS.acknowledged,
          sortingRank: 205,
          includedInFilters: [Shelved],
          offeredActions: [Unshelve],
        },
        'suppressed-by-design-active': {
          glyph: HIGH_GLYPHS.acknowledged,
          sortingRank: 211,
          includedInFilters: [SuppressedByDesign],
        },
        'suppressed-by-design-not-active': {
          glyph: HIGH_GLYPHS.acknowledged,
          sortingRank: 215,
          includedInFilters: [SuppressedByDesign],
        },
        'out-of-service-active': {
          glyph: HIGH_GLYPHS.acknowledged,
          sortingRank: 221,
          includedInFilters: [OutOfService],
        },
        'out-of-service-not-active': {
          glyph: HIGH_GLYPHS.acknowledged,
          sortingRank: 225,
          includedInFilters: [OutOfService],
        },
        normal: {
          glyph: HIGH_GLYPHS.normal,
          sortingRank: 341,
        },
      },
    },
    medium: {
      states: {
        unacknowledged: {
          glyph: MEDIUM_GLYPHS.unacknowledged,
          sortingRank: 31,
          flashingSpeed: FlashingSpeed.Slow,
          includedInFilters: [Unacknowledged, Active],
          offeredActions: [Acknowledge, Shelve],
        },
        'returned-to-normal-unacknowledged': {
          glyph: MEDIUM_GLYPHS.returnedToNormal,
          sortingRank: 51,
          flashingSpeed: FlashingSpeed.VerySlow,
          includedInFilters: [Unacknowledged],
          offeredActions: [Acknowledge, Shelve],
        },
        acknowledged: {
          glyph: MEDIUM_GLYPHS.acknowledged,
          sortingRank: 81,
          includedInFilters: [Active],
          offeredActions: [Shelve],
        },
        'shelved-active': {
          glyph: MEDIUM_GLYPHS.acknowledged,
          sortingRank: 202,
          includedInFilters: [Shelved],
          offeredActions: [Unshelve],
        },
        'shelved-not-active': {
          glyph: MEDIUM_GLYPHS.acknowledged,
          sortingRank: 206,
          includedInFilters: [Shelved],
          offeredActions: [Unshelve],
        },
        'suppressed-by-design-active': {
          glyph: MEDIUM_GLYPHS.acknowledged,
          sortingRank: 212,
          includedInFilters: [SuppressedByDesign],
        },
        'suppressed-by-design-not-active': {
          glyph: MEDIUM_GLYPHS.acknowledged,
          sortingRank: 216,
          includedInFilters: [SuppressedByDesign],
        },
        'out-of-service-active': {
          glyph: MEDIUM_GLYPHS.acknowledged,
          sortingRank: 222,
          includedInFilters: [OutOfService],
        },
        'out-of-service-not-active': {
          glyph: MEDIUM_GLYPHS.acknowledged,
          sortingRank: 226,
          includedInFilters: [OutOfService],
        },
        normal: {
          glyph: MEDIUM_GLYPHS.normal,
          sortingRank: 342,
        },
      },
    },
    low: {
      states: {
        unacknowledged: {
          glyph: LOW_GLYPHS.unacknowledged,
          sortingRank: 32,
          flashingSpeed: FlashingSpeed.VerySlow,
          includedInFilters: [Unacknowledged, Active],
          offeredActions: [Acknowledge, Shelve],
        },
        'returned-to-normal-unacknowledged': {
          glyph: LOW_GLYPHS.returnedToNormal,
          sortingRank: 52,
          flashingSpeed: FlashingSpeed.VerySlow,
          includedInFilters: [Unacknowledged],
          offeredActions: [Acknowledge, Shelve],
        },
        acknowledged: {
          glyph: LOW_GLYPHS.acknowledged,
          sortingRank: 82,
          includedInFilters: [Active],
          offeredActions: [Shelve],
        },
        'shelved-active': {
          glyph: LOW_GLYPHS.acknowledged,
          sortingRank: 203,
          includedInFilters: [Shelved],
          offeredActions: [Unshelve],
        },
        'shelved-not-active': {
          glyph: LOW_GLYPHS.acknowledged,
          sortingRank: 207,
          includedInFilters: [Shelved],
          offeredActions: [Unshelve],
        },
        'suppressed-by-design-active': {
          glyph: LOW_GLYPHS.acknowledged,
          sortingRank: 213,
          includedInFilters: [SuppressedByDesign],
        },
        'suppressed-by-design-not-active': {
          glyph: LOW_GLYPHS.acknowledged,
          sortingRank: 217,
          includedInFilters: [SuppressedByDesign],
        },
        'out-of-service-active': {
          glyph: LOW_GLYPHS.acknowledged,
          sortingRank: 223,
          includedInFilters: [OutOfService],
        },
        'out-of-service-not-active': {
          glyph: LOW_GLYPHS.acknowledged,
          sortingRank: 227,
          includedInFilters: [OutOfService],
        },
        normal: {
          glyph: LOW_GLYPHS.normal,
          sortingRank: 343,
        },
      },
    },
  },
});
