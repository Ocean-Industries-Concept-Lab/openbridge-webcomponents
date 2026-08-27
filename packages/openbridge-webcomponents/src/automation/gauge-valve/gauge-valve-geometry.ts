/**
 * Geometry for `obc-gauge-valve` in the watch coordinate space (center
 * origin, outer ring r 184). Ports and scale are one rigid layout rotated by
 * `scalePosition`; all drawing is done by `obc-watch` inputs built from
 * these angles.
 */
import type {WatchArea} from '../../navigation-instruments/watch/watch.js';

export enum GaugeValveScalePosition {
  top = 'top',
  right = 'right',
  bottom = 'bottom',
  left = 'left',
}

export const SCALE_ROTATION_DEG: Record<GaugeValveScalePosition, number> = {
  [GaugeValveScalePosition.top]: 0,
  [GaugeValveScalePosition.right]: 90,
  [GaugeValveScalePosition.bottom]: 180,
  [GaugeValveScalePosition.left]: 270,
};

export const TRACK_CORNER_RADIUS = 5;

/** Half-span (deg) of each port track sector. */
export const TRACK_HALF_SPANS = {twoWay: 45, threeWay: 30} as const;

export interface ValvePort {
  /** Sector center angle in degrees (0° = 12 o'clock). */
  centerAngle: number;
  /** Which flow value fills this port's track. */
  role: 'through' | 'inlet' | 'bottom';
}

export function clampPercent(value: number): number {
  if (Number.isNaN(value)) return 0;
  return Math.min(100, Math.max(0, value));
}

export function inletPercent(value: number, bottomValue: number): number {
  return clampPercent(clampPercent(value) + clampPercent(bottomValue));
}

/** Scale angle for a percent on the 60° top arc, rotated with the layout. */
export function scaleAngle(percent: number, rotationDeg = 0): number {
  return -30 + 0.6 * clampPercent(percent) + rotationDeg;
}

/** Port sectors for a valve type, rotated with the layout. */
export function valvePorts(
  isThreeWay: boolean,
  rotationDeg: number
): ValvePort[] {
  const ports: ValvePort[] = [
    {centerAngle: 90 + rotationDeg, role: 'through'},
    {centerAngle: 270 + rotationDeg, role: 'inlet'},
  ];
  if (isThreeWay) {
    ports.splice(1, 0, {centerAngle: 180 + rotationDeg, role: 'bottom'});
  }
  return ports;
}

export function valveAreas(
  isThreeWay: boolean,
  rotationDeg: number
): WatchArea[] {
  const halfSpan = isThreeWay
    ? TRACK_HALF_SPANS.threeWay
    : TRACK_HALF_SPANS.twoWay;
  return valvePorts(isThreeWay, rotationDeg).map((port) => ({
    startAngle: port.centerAngle - halfSpan,
    endAngle: port.centerAngle + halfSpan,
    roundOutsideCut: true,
    roundInsideCut: true,
    roundRadius: TRACK_CORNER_RADIUS,
    outlined: true,
  }));
}
