export enum SpeedDirectionsType {
  alongAthwartArrows = 'alongAthwartArrows',
  alongAthwartBars = 'alongAthwartBars',
  longLatArrows = 'longLatArrows',
}

export enum SpeedDirectionsFrameStyle {
  standalone = 'standalone',
  framed = 'framed',
  compass = 'compass',
}

// eslint-disable-next-line openbridge/prefer-enum-over-string-literal-union
export type SpeedAxis = 'along' | 'athwartBow' | 'athwartStern' | 'athwartMid';

export interface CellSpec {
  cx: number;
  cy: number;
  size: number;
  rotationDeg: number;
}

export const BAR_MAX_LENGTH = 160;
export const BAR_WIDTH = 28;
export const ATHWART_AXIS_OFFSET = 48;
export const VESSEL_CENTER_Y = 2;
export const FRAME_HALF = 168;
export const AXIS_LINE_HALF = 168;
export const FLAT_VIEWBOX = '-192 -192 384 384';

export function speedSteps(
  speedKnots: number,
  stepKnots: number
): 0 | 1 | 2 | 3 {
  if (
    !Number.isFinite(speedKnots) ||
    !Number.isFinite(stepKnots) ||
    stepKnots <= 0
  ) {
    return 0;
  }
  return Math.min(Math.ceil(Math.abs(speedKnots) / stepKnots), 3) as
    | 0
    | 1
    | 2
    | 3;
}

/** Half-length of a circle chord drawn at the given offset from center. */
export function chordHalfLength(radius: number, offset: number): number {
  return Math.sqrt(Math.max(radius * radius - offset * offset, 0));
}

export function barLengthUnits(speedKnots: number, maxKnots: number): number {
  if (
    !Number.isFinite(speedKnots) ||
    !Number.isFinite(maxKnots) ||
    maxKnots <= 0
  ) {
    return 0;
  }
  return Math.min(Math.abs(speedKnots) / maxKnots, 1) * BAR_MAX_LENGTH;
}

// Cell centers/sizes extracted from Figma (see plan Appendix A).
// "distance" entries are measured from the vessel center along the axis.
interface CellTableEntry {
  size: number;
  alongCenter: number; // |cy| of the along cells
  athwartCenter: number; // |cx| of the athwart cells
  athwartRowY: number; // |cy| of the bow/stern athwart rows (0 for athwartMid)
}

const CELL_TABLE: Record<
  SpeedDirectionsType,
  Record<'standalone' | 'inFrame', CellTableEntry>
> = {
  [SpeedDirectionsType.alongAthwartArrows]: {
    standalone: {
      size: 64,
      alongCenter: 32,
      athwartCenter: 76,
      athwartRowY: 108,
    },
    inFrame: {size: 48, alongCenter: 96, athwartCenter: 48, athwartRowY: 48},
  },
  [SpeedDirectionsType.alongAthwartBars]: {
    // bars use the same tip cells as arrows in-frame; standalone bars have no chevron cells
    standalone: {size: 48, alongCenter: 96, athwartCenter: 48, athwartRowY: 48},
    inFrame: {size: 48, alongCenter: 96, athwartCenter: 48, athwartRowY: 48},
  },
  [SpeedDirectionsType.longLatArrows]: {
    standalone: {size: 64, alongCenter: 80, athwartCenter: 76, athwartRowY: 3},
    inFrame: {size: 96, alongCenter: 112, athwartCenter: 72, athwartRowY: 0},
  },
};

export function chevronCell(
  type: SpeedDirectionsType,
  frameStyle: SpeedDirectionsFrameStyle,
  axis: SpeedAxis,
  positive: boolean
): CellSpec {
  const variant =
    frameStyle === SpeedDirectionsFrameStyle.standalone
      ? 'standalone'
      : 'inFrame';
  const t = CELL_TABLE[type][variant];
  if (axis === 'along') {
    return {
      cx: 0,
      cy: positive ? -t.alongCenter : t.alongCenter,
      size: t.size,
      rotationDeg: positive ? 0 : 180,
    };
  }
  const rowSign = axis === 'athwartStern' ? 1 : axis === 'athwartBow' ? -1 : 0;
  return {
    cx: positive ? t.athwartCenter : -t.athwartCenter,
    cy:
      rowSign === 0
        ? t.athwartRowY === 0
          ? 0
          : -t.athwartRowY
        : rowSign * t.athwartRowY,
    size: t.size,
    rotationDeg: positive ? 90 : 270,
  };
}
