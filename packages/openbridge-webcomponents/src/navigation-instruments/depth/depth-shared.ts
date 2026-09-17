/**
 * @module Depth Shared
 *
 * The range ladder shared by `obc-depth` and `obc-depth-actual`: three rungs
 * from the design (Shallow 25 m, Regular 100 m, Deep 1000 m), an explicit
 * maximum that maps onto the nearest rung's layout, and an auto-range that
 * climbs and descends the ladder with hysteresis, the way an echo sounder
 * steps its range.
 */
import {linearTickInterval} from '../../building-blocks/instrument-linear/instrument-linear.js';

/** One rung of the range ladder: the scale maximum and the layout it implies. */
export interface DepthRange {
  /** Scale maximum in the depth unit; 0 is always at the top. */
  maxDepth: number;
  primaryTickmarkInterval: number;
  secondaryTickmarkInterval: number;
  /** Air band above the waterline as a fraction of the frame (depth-actual). */
  airFraction: number;
  /** Factor on the 160-unit vessel art (depth-actual). */
  vesselScale: number;
}

/** The design's Shallow, Regular and Deep rungs. */
export const DEPTH_RANGES: readonly DepthRange[] = [
  {
    maxDepth: 25,
    primaryTickmarkInterval: 25,
    secondaryTickmarkInterval: 5,
    airFraction: 0.5,
    vesselScale: 6.75,
  },
  {
    maxDepth: 100,
    primaryTickmarkInterval: 25,
    secondaryTickmarkInterval: 5,
    airFraction: 1 / 6,
    vesselScale: 2.175,
  },
  {
    maxDepth: 1000,
    primaryTickmarkInterval: 250,
    secondaryTickmarkInterval: 50,
    airFraction: 0,
    vesselScale: 2.175,
  },
];

/** Index of the design's Regular rung, the default range. */
export const DEFAULT_DEPTH_RANGE_INDEX = 1;

/**
 * Auto-range steps down only once the data sits well inside the next smaller
 * rung, so a bottom hovering around a rung boundary does not flap the scale.
 */
export const DEPTH_RANGE_STEP_DOWN_FRACTION = 0.7;

export interface ResolveDepthRangeOptions {
  ranges: readonly DepthRange[];
  /** Explicit maximum; wins over `autoRange`. */
  maxDepth?: number;
  autoRange: boolean;
  /** Deepest value in view, for `autoRange`. */
  dataMax: number;
  /** The rung in use, for hysteresis. */
  current?: DepthRange;
  /** Unit-per-pixel context for a synthetic rung's ladder. */
  frameLength?: number;
}

const byMax = (ranges: readonly DepthRange[]) =>
  [...ranges].sort((a, b) => a.maxDepth - b.maxDepth);

/** The rung `current` stands for in `sorted`, matched by value: a consumer may hand in equal objects. */
const indexOfCurrent = (
  sorted: readonly DepthRange[],
  current: DepthRange | undefined
): number =>
  current ? sorted.findIndex((r) => r.maxDepth === current.maxDepth) : -1;

/**
 * Layout traits for a maximum that is not on the ladder: the nearest rung at
 * or above it, with a 1-2-5 tick ladder sized for `frameLength`.
 */
function syntheticRange(
  ranges: readonly DepthRange[],
  maxDepth: number,
  frameLength: number
): DepthRange {
  const sorted = byMax(ranges);
  const traits =
    sorted.find((r) => r.maxDepth >= maxDepth) ?? sorted[sorted.length - 1];
  // The gauge spans 0..max, so a ±max/2 range at the frame length has the
  // same units per pixel.
  const primary = linearTickInterval(frameLength, maxDepth / 2, 48);
  const secondary = linearTickInterval(frameLength, maxDepth / 2, 12);
  return {
    ...traits,
    maxDepth,
    primaryTickmarkInterval: primary || traits.primaryTickmarkInterval,
    secondaryTickmarkInterval: secondary || traits.secondaryTickmarkInterval,
  };
}

/**
 * Picks the rung to display.
 *
 * `maxDepth` set: that rung, or a synthetic one for a maximum off the ladder.
 * `autoRange`: the smallest rung containing `dataMax`; from a larger rung it
 * steps down only when `dataMax` is under `DEPTH_RANGE_STEP_DOWN_FRACTION` of
 * the smaller rung's maximum. Neither: the Regular rung.
 */
export function resolveDepthRange({
  ranges,
  maxDepth,
  autoRange,
  dataMax,
  current,
  frameLength = 336,
}: ResolveDepthRangeOptions): DepthRange {
  const sorted = byMax(ranges.length ? ranges : DEPTH_RANGES);
  if (maxDepth !== undefined && Number.isFinite(maxDepth) && maxDepth > 0) {
    return (
      sorted.find((r) => r.maxDepth === maxDepth) ??
      syntheticRange(sorted, maxDepth, frameLength)
    );
  }
  const fallback =
    sorted[Math.min(DEFAULT_DEPTH_RANGE_INDEX, sorted.length - 1)];
  const currentIndex = indexOfCurrent(sorted, current);
  const active = currentIndex < 0 ? undefined : sorted[currentIndex];
  if (!autoRange || !Number.isFinite(dataMax)) {
    return active ?? fallback;
  }
  const fitting =
    sorted.find((r) => r.maxDepth >= dataMax) ?? sorted[sorted.length - 1];
  if (!active) return fitting;
  if (fitting.maxDepth > active.maxDepth) return fitting;
  if (fitting.maxDepth === active.maxDepth) return active;
  // Descend one rung at a time, and only once the data is well inside it.
  const below = sorted[currentIndex - 1];
  return dataMax < below.maxDepth * DEPTH_RANGE_STEP_DOWN_FRACTION
    ? below
    : active;
}
