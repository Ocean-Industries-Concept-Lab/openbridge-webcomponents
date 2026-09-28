/**
 * `alert-severity` – Pure helper module mapping alert severities to their
 * visual, behavioral, and acknowledgement semantics.
 *
 * Centralizes the per-`AlertType` decisions shared across alert-rendering
 * components (badges, twotone icons, frames, lists) so that severity behavior
 * stays consistent everywhere. Supports both the legacy severities
 * (`alarm`, `warning`, `caution`) and the level severities
 * (`level-critical`, `level-high`, `level-medium`, `level-low`, `level-diagnostic`),
 * collapsing the level set onto the legacy visual/blink treatments where they
 * share styling.
 *
 * Features:
 * - Color tokens: `getAlertColorTokens` returns background/border/on-active
 *   CSS custom properties per severity.
 * - Component selectors: `getAlertBadgeComponent` and
 *   `getAlertTwotoneComponent` resolve the badge/icon element tag for a
 *   severity.
 * - Flashing: `resolveFlashingSpeed` maps a severity and phase onto the
 *   design tempo table, and `getBamAlertTypeForBlinking` maps level
 *   severities onto the legacy type that selects the icon glyphs.
 * - Acknowledgement & filtering: `requiresAcknowledgement` reports whether a
 *   severity needs an ACK action, `excludedFromUnackedFilter` reports whether
 *   it is hidden from the "unacked" view, and `usesAlarmNoAckIcon` selects the
 *   alarm-style no-ack icon.
 * - Priority: re-exports `ALERT_SEVERITY_PRIORITY`, the ordered severity list
 *   (most → least severe) used to sort alerts.
 * - Counts: `rankAlertCounts` orders per-severity counts and can combine
 *   them; `alertTypeLabel` and `alertCountsLabel` build accessible names.
 *
 * Usage:
 * ```ts
 * import {
 *   getAlertColorTokens,
 *   requiresAcknowledgement,
 *   ALERT_SEVERITY_PRIORITY,
 * } from './alert-severity.js';
 * import {AlertType} from './types.js';
 *
 * const tokens = getAlertColorTokens(AlertType.LevelHigh);
 * const needsAck = requiresAcknowledgement(AlertType.LevelLow); // true
 * alerts.sort(
 *   (a, b) =>
 *     ALERT_SEVERITY_PRIORITY.indexOf(a.type) -
 *     ALERT_SEVERITY_PRIORITY.indexOf(b.type)
 * );
 * ```
 */
import {msg} from '@lit/localize';
import {
  AlertType,
  ALERT_SEVERITY_PRIORITY,
  FlashingSpeed,
  type AlertCounts,
  type ResolvedFlashingSpeed,
} from './types.js';

export {ALERT_SEVERITY_PRIORITY};

export enum AlertBadgeComponent {
  Alarm = 'obi-alarm-badge',
  Warning = 'obi-warning-badge',
  Caution = 'obi-caution-badge',
  Critical = 'obi-critical-badge',
  Diagnostic = 'obi-diagnostic-badge',
}

export type AlertColorTokens = {
  bg: string;
  border: string;
  onActive: string;
};

export function requiresAcknowledgement(type: AlertType): boolean {
  return [
    AlertType.Alarm,
    AlertType.Warning,
    AlertType.LevelCritical,
    AlertType.LevelHigh,
    AlertType.LevelMedium,
    AlertType.LevelLow,
  ].includes(type);
}

export enum AlertFlashPhase {
  Active = 'active',
  Rectified = 'rectified',
}

/**
 * Resolves the `default` flashing speed from the design tempo table (#1224):
 * active critical/alarm/high flash fast, warning/medium slow, low very slow;
 * every rectified alert flashes very slow; caution and diagnostic never
 * flash. Callers map acknowledged alerts to `fixed` before asking.
 */
export function resolveFlashingSpeed(
  speed: FlashingSpeed,
  type: AlertType,
  phase: AlertFlashPhase = AlertFlashPhase.Active
): ResolvedFlashingSpeed {
  if (speed !== FlashingSpeed.Default) {
    return speed;
  }
  if (type === AlertType.Caution || type === AlertType.LevelDiagnostic) {
    return FlashingSpeed.Fixed;
  }
  if (phase === AlertFlashPhase.Rectified) {
    return FlashingSpeed.VerySlow;
  }
  switch (type) {
    case AlertType.LevelCritical:
    case AlertType.Alarm:
    case AlertType.LevelHigh:
      return FlashingSpeed.Fast;
    case AlertType.Warning:
    case AlertType.LevelMedium:
      return FlashingSpeed.Slow;
    case AlertType.LevelLow:
      return FlashingSpeed.VerySlow;
    default:
      return FlashingSpeed.Fixed;
  }
}

export function getAlertSeverityCssClass(type: AlertType): string {
  return type;
}

export function getAlertColorTokens(type: AlertType): AlertColorTokens {
  switch (type) {
    case AlertType.LevelCritical:
      return {
        bg: 'var(--critical-enabled-background-color)',
        border: 'var(--critical-enabled-border-color)',
        onActive: 'var(--on-critical-active-color)',
      };
    case AlertType.Warning:
    case AlertType.LevelMedium:
      return {
        bg: 'var(--alert-warning-color)',
        border: 'var(--alert-warning-outline-color)',
        onActive: 'var(--on-warning-active-color)',
      };
    case AlertType.Caution:
    case AlertType.LevelLow:
      return {
        bg: 'var(--alert-caution-color)',
        border: 'var(--alert-caution-outline-color)',
        onActive: 'var(--on-caution-active-color)',
      };
    case AlertType.LevelDiagnostic:
      return {
        bg: 'var(--notification-enabled-background-color)',
        border: 'var(--notification-enabled-border-color)',
        onActive: 'var(--on-notification-active-color)',
      };
    case AlertType.Alarm:
    case AlertType.LevelHigh:
    default:
      return {
        bg: 'var(--alert-alarm-color)',
        border: 'var(--alert-alarm-outline-color)',
        onActive: 'var(--on-alarm-active-color)',
      };
  }
}

export function getAlertBadgeComponent(type: AlertType): AlertBadgeComponent {
  switch (type) {
    case AlertType.LevelCritical:
      return AlertBadgeComponent.Critical;
    case AlertType.Warning:
    case AlertType.LevelMedium:
      return AlertBadgeComponent.Warning;
    case AlertType.Caution:
    case AlertType.LevelLow:
      return AlertBadgeComponent.Caution;
    case AlertType.LevelDiagnostic:
      return AlertBadgeComponent.Diagnostic;
    case AlertType.Alarm:
    case AlertType.LevelHigh:
    default:
      return AlertBadgeComponent.Alarm;
  }
}

export enum AlertTwotoneComponent {
  Alarm = 'obi-alerts-alarm-twotone',
  Warning = 'obi-alerts-warning-twotone',
  Caution = 'obi-alerts-caution-twotone',
  Critical = 'obi-alerts-critical-twotone',
  Diagnostic = 'obi-alerts-diagnostic-twotone',
}

export function getAlertTwotoneComponent(
  type: AlertType
): AlertTwotoneComponent {
  switch (type) {
    case AlertType.LevelCritical:
      return AlertTwotoneComponent.Critical;
    case AlertType.LevelDiagnostic:
      return AlertTwotoneComponent.Diagnostic;
    case AlertType.Warning:
    case AlertType.LevelMedium:
      return AlertTwotoneComponent.Warning;
    case AlertType.Caution:
    case AlertType.LevelLow:
      return AlertTwotoneComponent.Caution;
    case AlertType.Alarm:
    case AlertType.LevelHigh:
    default:
      return AlertTwotoneComponent.Alarm;
  }
}

export function getBamAlertTypeForBlinking(type: AlertType): AlertType {
  switch (type) {
    case AlertType.LevelCritical:
    case AlertType.LevelHigh:
      return AlertType.Alarm;
    case AlertType.LevelMedium:
      return AlertType.Warning;
    case AlertType.LevelLow:
      return AlertType.Caution;
    default:
      return type;
  }
}

export function excludedFromUnackedFilter(type: AlertType): boolean {
  return [AlertType.Caution, AlertType.LevelDiagnostic].includes(type);
}

export function usesAlarmNoAckIcon(type: AlertType): boolean {
  return [
    AlertType.Alarm,
    AlertType.LevelCritical,
    AlertType.LevelHigh,
  ].includes(type);
}

/** One severity and its alert count, as `rankAlertCounts` returns them. */
export interface RankedAlertCount {
  type: AlertType;
  count: number;
}

const ALERT_COUNT_FIELD: Record<AlertType, keyof AlertCounts> = {
  [AlertType.Alarm]: 'countAlarm',
  [AlertType.Warning]: 'countWarning',
  [AlertType.Caution]: 'countCaution',
  [AlertType.LevelCritical]: 'countLevelCritical',
  [AlertType.LevelHigh]: 'countLevelHigh',
  [AlertType.LevelMedium]: 'countLevelMedium',
  [AlertType.LevelLow]: 'countLevelLow',
  [AlertType.LevelDiagnostic]: 'countLevelDiagnostic',
};

/**
 * The positive counts, most severe first by `ALERT_SEVERITY_PRIORITY`.
 * `combine` folds them into one entry: the total, typed as the most severe
 * category present.
 */
export function rankAlertCounts(
  counts: AlertCounts,
  combine = false
): RankedAlertCount[] {
  const ranked = ALERT_SEVERITY_PRIORITY.map((type) => ({
    type,
    count: counts[ALERT_COUNT_FIELD[type]] ?? 0,
  })).filter((entry) => entry.count > 0);
  if (!combine || ranked.length === 0) {
    return ranked;
  }
  const total = ranked.reduce((sum, entry) => sum + entry.count, 0);
  return [{type: ranked[0].type, count: total}];
}

const ALERT_TYPE_LABEL: Record<AlertType, () => string> = {
  [AlertType.Alarm]: () => msg('Alarm'),
  [AlertType.Warning]: () => msg('Warning'),
  [AlertType.Caution]: () => msg('Caution'),
  [AlertType.LevelCritical]: () => msg('Critical'),
  [AlertType.LevelHigh]: () => msg('High'),
  [AlertType.LevelMedium]: () => msg('Medium'),
  [AlertType.LevelLow]: () => msg('Low'),
  [AlertType.LevelDiagnostic]: () => msg('Diagnostic'),
};

/** Localized severity name, read at render time so a locale switch applies. */
export function alertTypeLabel(type: AlertType): string {
  return ALERT_TYPE_LABEL[type]();
}

/**
 * Accessible summary of the counts, e.g. "2 Alarm, 4 Warning, 9 Shelved";
 * empty when nothing is counted.
 */
export function alertCountsLabel(
  counts: AlertCounts,
  shelvedCount = 0
): string {
  const parts = rankAlertCounts(counts).map(
    ({type, count}) => `${count} ${alertTypeLabel(type)}`
  );
  if (shelvedCount > 0) {
    parts.push(`${shelvedCount} ${msg('Shelved')}`);
  }
  return parts.join(', ');
}
