import {InstrumentFieldSize} from '../navigation-instruments/instrument-field/instrument-field.js';

export enum SpeedType {
  SOG = 'SOG',
  STW = 'STW',
}

export enum SensorPosition {
  bow = 'bow',
  middle = 'middle',
  aft = 'aft',
}

export enum MeasurementPosition {
  Sensor = 'Sensor',
  CCRP = 'CCRP',
  Bow = 'Bow',
}

export interface InstrumentField {
  size: InstrumentFieldSize;
  neutralColor: boolean;
  value: number | undefined;
  fractionDigits: number;
  unit: string;
  tag: string;
  horizontal: boolean;
}

export enum AlertTypes {
  caution = 'caution',
  warning = 'warning',
  alarm = 'alarm',
  none = 'none',
}

export enum AlertColor {
  cautionColor = 'var(--caution-enabled-background-color)',
  warningColor = 'var(--warning-enabled-background-color)',
  alarmColor = 'var(--alarm-enabled-background-color)',
}

export enum Colors {
  instrumentEnhancedPrimary = 'var(--instrument-enhanced-primary-color)',
  instrumentEnhancedSecondary = 'var(--instrument-enhanced-secondary-color)',
  instrumentEnhancedSecondaryDif = 'var(--instrument-enhanced-secondary-dif-color)',
  instrumentEnhancedTertiary = 'var(--instrument-enhanced-tertiary-color)',
  instrumentFramePrimary = 'var(--instrument-frame-primary-color)',
  instrumentFrameSecondary = 'var(--instrument-frame-secondary-color)',
  instrumentFrameTertiary = 'var(--instrument-frame-tertiary-color)',
  instrumentTickMarkSecondary = 'var(--instrument-tick-mark-secondary-color)',
  instrumentTickMarkLabelSecondary = 'var(--instrument-tick-mark-label-secondary-color)',
  instrumentTickmarkTertiary = 'var(--instrument-tick-mark-tertiary-color)',
  instrumentRegularTertiary = 'var(--instrument-regular-tertiary-color)',
  instrumentRegularSecondary = 'var(--instrument-regular-secondary-color)',
  instrumentRegularSecondaryDif = 'var(--instrument-regular-secondary-dif-color)',
  colorBorderDivider = 'var(--border-divider-color)',
  containerSection = 'var(--container-section-color)',
  containerBackdrop = 'var(--container-backdrop-color)',
  containerBackground = 'var(--container-background-color)',
  overlayContainerBackground = 'var(--overlay-container-background-color)',
  overlayBorderOutlineColor = 'var(--overlay-border-outline-color)',
  elementNeutralColor = 'var(--element-neutral-color)',
  elementDisabledColor = 'var(--element-disabled-color)',
  elementSymbolColor = 'var(--element-symbol-color)',
  alertAlarmColor = 'var(--alert-alarm-color)',
  alertCautionColor = 'var(--alert-caution-color)',
  alertAlarmOutlineColor = 'var(--alert-alarm-outline-color)',
  alertCautionOutlineColor = 'var(--alert-caution-outline-color)',
  alertLowIntegrity = 'var(--alert-low-integrity-background-color)',
  elementActiveColor = 'var(--element-active-color)',
  elementActiveInvertedColor = 'var(--element-active-inverted-color)',
  borderSilhouetteColor = 'var(--border-silhouette-color)',
  baseBlue100 = 'var(--base-blue-100)',
  baseBlue200 = 'var(--base-blue-200)',
  baseBlue400 = 'var(--base-blue-400)',
  dataScalesMonochrome020 = 'var(--data-scales-monochrome-020)',
  dataScalesMonochrome060 = 'var(--data-scales-monochrome-060)',
}

export interface WatchBarArea {
  startAngle: number;
  endAngle: number;
  fillColor: string;
}
