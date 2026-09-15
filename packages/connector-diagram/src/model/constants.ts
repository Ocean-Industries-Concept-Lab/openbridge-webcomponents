import type {PipeSize} from './types.js'

export const GRID = 24

export const STROKE_WEIGHTS: Record<PipeSize, { outline: number; fill: number }> = {
  small:  { outline: 4,  fill: 2  },
  medium: { outline: 6,  fill: 4  },
  large:  { outline: 10, fill: 8  },
  xl:     { outline: 14, fill: 12 },
}

/**
 * Half-gap sizes for overlap segments per size.
 **/
export const OVERLAP_HALF_GAP: Record<PipeSize, number> = {
  small:  4,
  medium: 5,
  large:  7,
  xl:     9,
}

export const CORNER_RADIUS = 8
