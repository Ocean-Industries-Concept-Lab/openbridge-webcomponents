import {AlertType, ALERT_SEVERITY_PRIORITY} from './types.js';

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
    AlertType.IsaCritical,
    AlertType.IsaHigh,
    AlertType.IsaMedium,
  ].includes(type);
}

export function supportsBlinking(type: AlertType): boolean {
  return [
    AlertType.Alarm,
    AlertType.Warning,
    AlertType.IsaCritical,
    AlertType.IsaHigh,
    AlertType.IsaMedium,
    AlertType.IsaLow,
  ].includes(type);
}

export function getAlertSeverityCssClass(type: AlertType): string {
  return type;
}

export function getAlertColorTokens(type: AlertType): AlertColorTokens {
  switch (type) {
    case AlertType.IsaCritical:
      return {
        bg: 'var(--critical-enabled-background-color)',
        border: 'var(--critical-enabled-border-color)',
        onActive: 'var(--on-critical-active-color)',
      };
    case AlertType.Warning:
    case AlertType.IsaMedium:
      return {
        bg: 'var(--alert-warning-color)',
        border: 'var(--alert-warning-outline-color)',
        onActive: 'var(--on-warning-active-color)',
      };
    case AlertType.Caution:
    case AlertType.IsaLow:
      return {
        bg: 'var(--alert-caution-color)',
        border: 'var(--alert-caution-outline-color)',
        onActive: 'var(--on-caution-active-color)',
      };
    case AlertType.IsaDiagnostic:
      return {
        bg: 'var(--notification-enabled-background-color)',
        border: 'var(--notification-enabled-border-color)',
        onActive: 'var(--on-notification-active-color)',
      };
    case AlertType.Alarm:
    case AlertType.IsaHigh:
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
    case AlertType.IsaCritical:
      return AlertBadgeComponent.Critical;
    case AlertType.Warning:
    case AlertType.IsaMedium:
      return AlertBadgeComponent.Warning;
    case AlertType.Caution:
    case AlertType.IsaLow:
      return AlertBadgeComponent.Caution;
    case AlertType.IsaDiagnostic:
      return AlertBadgeComponent.Diagnostic;
    case AlertType.Alarm:
    case AlertType.IsaHigh:
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
    case AlertType.IsaCritical:
      return AlertTwotoneComponent.Critical;
    case AlertType.IsaDiagnostic:
      return AlertTwotoneComponent.Diagnostic;
    case AlertType.Warning:
    case AlertType.IsaMedium:
      return AlertTwotoneComponent.Warning;
    case AlertType.Caution:
    case AlertType.IsaLow:
      return AlertTwotoneComponent.Caution;
    case AlertType.Alarm:
    case AlertType.IsaHigh:
    default:
      return AlertTwotoneComponent.Alarm;
  }
}

export enum AlertBlinkMode {
  Critical = 'critical',
  Alarm = 'alarm',
  Warning = 'warning',
  Low = 'low',
}

export function getAlertBlinkMode(type: AlertType): AlertBlinkMode {
  switch (type) {
    case AlertType.IsaCritical:
      return AlertBlinkMode.Critical;
    case AlertType.Warning:
    case AlertType.IsaMedium:
      return AlertBlinkMode.Warning;
    case AlertType.Caution:
    case AlertType.IsaLow:
      return AlertBlinkMode.Low;
    case AlertType.Alarm:
    case AlertType.IsaHigh:
    default:
      return AlertBlinkMode.Alarm;
  }
}

export function getBamAlertTypeForBlinking(type: AlertType): AlertType {
  switch (type) {
    case AlertType.IsaCritical:
    case AlertType.IsaHigh:
      return AlertType.Alarm;
    case AlertType.IsaMedium:
      return AlertType.Warning;
    case AlertType.IsaLow:
      return AlertType.Caution;
    default:
      return type;
  }
}

export function excludedFromUnackedFilter(type: AlertType): boolean {
  return [AlertType.Caution, AlertType.IsaDiagnostic].includes(type);
}

export function usesAlarmNoAckIcon(type: AlertType): boolean {
  return [AlertType.Alarm, AlertType.IsaCritical, AlertType.IsaHigh].includes(
    type
  );
}
