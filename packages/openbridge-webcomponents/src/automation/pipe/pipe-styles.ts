import type {PipeValue, PipeSize, MediumColor} from './pipe-types.js';

export const GRID = 24;
export const CORNER_RADIUS = 8;

export const STROKE_WEIGHTS: Record<PipeSize, {outline: number; fill: number}> =
  {
    small: {outline: 4, fill: 2},
    medium: {outline: 6, fill: 4},
    large: {outline: 10, fill: 8},
    xl: {outline: 14, fill: 12},
  };

export const OVERLAP_HALF_GAP: Record<PipeSize, number> = {
  small: 4,
  medium: 5,
  large: 7,
  xl: 9,
};

export interface PipeStroke {
  outlineVar: string;
  outlineWeight: number;
  fillVar: string | null;
  fillWeight: number | null;
  dashPattern: number[];
}

const MEDIUM_FAMILY: Record<Exclude<MediumColor, 'Enhanced'>, string> = {
  Neutral: 'gray',
  Blue: 'blue',
  Cyan: 'cyan',
  Teal: 'teal',
  Green: 'running',
  Yellow: 'yellow',
  Orange: 'orange',
  Red: 'red',
  Purple: 'purple',
  Indigo: 'indigo',
};

// Border returns the --pipe-medium-border-<family> INDIRECTION name (not the
// raw --base-<family>-600): the token is defined per theme at the document
// level in palettes/manual.css (dusk reads -500, every other theme -600) and
// inherits through the shadow boundary, so the swap needs no JS and works in
// every browser. Enhanced has no base family and no dusk adjustment, so it
// returns its automation token directly.
export function mediumBorderVar(color: MediumColor): string {
  if (color === 'Enhanced') return '--automation-medium-enhanced-border';
  return `--pipe-medium-border-${MEDIUM_FAMILY[color]}`;
}

export function mediumBackgroundVar(color: MediumColor): string {
  if (color === 'Enhanced') return '--automation-medium-enhanced-background';
  return `--base-${MEDIUM_FAMILY[color]}-200`;
}

export function resolvePipeStroke(
  value: PipeValue,
  size: PipeSize,
  mediumColor?: MediumColor
): PipeStroke {
  const w = STROKE_WEIGHTS[size];
  switch (value) {
    case 'closed':
      return {
        outlineVar: '--automation-pipe-tertiary-inverted-color',
        outlineWeight: w.fill,
        fillVar: null,
        fillWeight: null,
        dashPattern: [],
      };
    case 'closed-dash':
      return {
        outlineVar: '--automation-pipe-tertiary-inverted-color',
        outlineWeight: w.fill,
        fillVar: null,
        fillWeight: null,
        dashPattern: [w.fill, w.fill],
      };
    case 'empty':
      return {
        outlineVar: '--automation-pipe-tertiary-inverted-color',
        outlineWeight: w.outline,
        fillVar: '--automation-pipe-primary-inverted-color',
        fillWeight: w.fill,
        dashPattern: [],
      };
    case 'medium-flow': {
      const color = mediumColor ?? 'Teal';
      return {
        outlineVar: mediumBorderVar(color),
        outlineWeight: w.outline,
        fillVar: mediumBackgroundVar(color),
        fillWeight: w.fill,
        dashPattern: [],
      };
    }
    case 'enhanced':
      return {
        outlineVar: '--automation-medium-enhanced-border',
        outlineWeight: w.outline,
        fillVar: '--automation-medium-enhanced-background',
        fillWeight: w.fill,
        dashPattern: [],
      };
    case 'running':
      return {
        outlineVar: '--automation-medium-running-border',
        outlineWeight: w.outline,
        fillVar: '--automation-medium-running-background',
        fillWeight: w.fill,
        dashPattern: [],
      };
    case 'open-flow':
    case 'open-generic':
    default:
      return {
        outlineVar: '--automation-pipe-tertiary-color',
        outlineWeight: w.outline,
        fillVar: '--automation-pipe-primary-color',
        fillWeight: w.fill,
        dashPattern: [],
      };
  }
}
