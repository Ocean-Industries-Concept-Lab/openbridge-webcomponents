/**
 * Advice design layer.
 *
 * One vocabulary and one rule set for the advice bands, points and areas that
 * the linear and radial instruments draw: the categories and their colours,
 * the four appearances a band can take, how a band's state follows the
 * instrument's readings, how its ends are capped and how two bands chain.
 * The renderers (`navigation-instruments/watch/advice.ts`,
 * `svghelpers/advice-linear.ts` and the Chart.js area plugin) only place what
 * this module decides; the instruments carry the API through
 * `advice-mixin.ts` and `advice-bundle.ts`, the way the setpoint system is
 * split in `setpoint.ts`, `setpoint-mixin.ts` and `setpoint-bundle.ts`.
 *
 * Every public type keeps the names the instruments accepted before the
 * layer existed: `normalizeAdvice()` reads the old field pairs
 * (`minAngle` / `maxAngle`, `minSpeed` / `maxSpeed`, `minValue` / `maxValue`),
 * the old `type` and `hinted` flags, and the legacy `advice` and `safe`
 * category names, so a consumer written against any earlier shape renders
 * unchanged.
 *
 * @module
 */

import {normalizeAngle} from './math.js';

/**
 * What an advice is for. Go-to categories mark a range or point to steer
 * towards; no-go categories mark one to stay out of. The design file names
 * the mint category "Safe" in one set and "Eco" in another; `eco` is the
 * name, and `safe` on input means `running`.
 */
export enum AdviceCategory {
  optimal = 'optimal',
  running = 'running',
  eco = 'eco',
  caution = 'caution',
  warning = 'warning',
  alarm = 'alarm',
  exclusion = 'exclusion',
}

/**
 * The four appearances a band can take: the hinted and the solid grey, the
 * hinted and the solid colour. `regular` is the name the instruments used for
 * the solid grey before; it is read as `enabled`.
 */
export enum AdviceState {
  hinted = 'hinted',
  enabled = 'enabled',
  active = 'active',
  triggered = 'triggered',
  /** @deprecated Use `enabled`. */
  regular = 'regular',
}

/** Which readings an advice is checked against. */
export enum AdviceTrigger {
  both = 'both',
  value = 'value',
  setpoint = 'setpoint',
}

/**
 * The shape every instrument accepts in its advice list. A range carries
 * `min` and `max`, a point carries `value`; `category` names what it is for.
 * The remaining fields are the names earlier releases used and are mapped by
 * {@link normalizeAdvice}.
 */
export interface AdviceInput {
  /** What the advice is for; `advice` is read as `optimal`, `safe` as `running`. */
  category?: AdviceCategory | `${AdviceCategory}` | 'advice' | 'safe' | string;
  /** @deprecated Use `category`. */
  type?: string;
  /** The appearance at rest; `regular` is read as `enabled`. Defaults to `enabled`, or `hinted` when `hinted` is set. */
  state?: AdviceState | `${AdviceState}`;
  /** @deprecated Use `state: 'hinted'`. */
  hinted?: boolean;
  /** Range start, in the instrument's unit. */
  min?: number;
  /** Range end, in the instrument's unit. */
  max?: number;
  /** A point advice: one value instead of a range. */
  value?: number;
  /** @deprecated Use `min`. */
  minAngle?: number;
  /** @deprecated Use `max`. */
  maxAngle?: number;
  /** @deprecated Use `min`. */
  minSpeed?: number;
  /** @deprecated Use `max`. */
  maxSpeed?: number;
  /** @deprecated Use `min`. */
  minValue?: number;
  /** @deprecated Use `max`. */
  maxValue?: number;
  /** Leaves out the boundary tick at the range start; the cap is rounded there. */
  hideMinTickmark?: boolean;
  /** Leaves out the boundary tick at the range end; the cap is rounded there. */
  hideMaxTickmark?: boolean;
  /** Draws the area layer (tint, limit lines, pattern) over the face, bar or chart as well as the band. */
  showArea?: boolean;
  /** Icon tag drawn at the band centre, such as `obi-advice-optimal`. */
  icon?: string;
  /** Label drawn at the band centre. */
  label?: string;
}

/** An advice after {@link normalizeAdvice} and {@link resolveAdvices}: what a renderer draws. */
export interface ResolvedAdvice {
  min: number;
  max: number;
  /** `min === max`: drawn as a dot or a thick tick, not a band. */
  point: boolean;
  category: AdviceCategory;
  state: AdviceState;
  hideMinTickmark: boolean;
  hideMaxTickmark: boolean;
  showArea: boolean;
  icon?: string;
  label?: string;
  /** The start meets another band: the cap is a flat cut. */
  flatStart: boolean;
  /** The end meets another band: the cap is a flat cut. */
  flatEnd: boolean;
}

const CATEGORY_ALIASES: Record<string, AdviceCategory> = {
  advice: AdviceCategory.optimal,
  safe: AdviceCategory.running,
};

const CATEGORY_VALUES = new Set<string>(Object.values(AdviceCategory));

const GO_TO_CATEGORIES = new Set<AdviceCategory>([
  AdviceCategory.optimal,
  AdviceCategory.running,
  AdviceCategory.eco,
]);

/** Whether a category marks a range to steer towards rather than away from. */
export function isGoToCategory(category: AdviceCategory): boolean {
  return GO_TO_CATEGORIES.has(category);
}

function normalizeCategory(input: AdviceInput): AdviceCategory {
  const raw = input.category ?? input.type;
  if (raw === undefined) {
    throw new TypeError('advice needs a category');
  }
  const aliased = CATEGORY_ALIASES[raw] ?? raw;
  if (!CATEGORY_VALUES.has(aliased)) {
    throw new TypeError(
      `advice category "${raw}" is not one of ${[...CATEGORY_VALUES].join(', ')}`
    );
  }
  return aliased as AdviceCategory;
}

function normalizeState(input: AdviceInput): AdviceState {
  const raw = input.state;
  if (raw === undefined) {
    return input.hinted ? AdviceState.hinted : AdviceState.enabled;
  }
  return raw === AdviceState.regular
    ? AdviceState.enabled
    : (raw as AdviceState);
}

/**
 * The shared shape of an advice list entry, whatever release it was written
 * for. A configuration mistake (no category, an unknown category, a range
 * without both ends) throws, since it can only be fixed in code.
 */
export function normalizeAdvice(input: AdviceInput): ResolvedAdvice {
  const category = normalizeCategory(input);
  let min: number | undefined;
  let max: number | undefined;
  let point = false;
  if (input.value !== undefined) {
    min = max = input.value;
    point = true;
  } else {
    min = input.min ?? input.minAngle ?? input.minSpeed ?? input.minValue;
    max = input.max ?? input.maxAngle ?? input.maxSpeed ?? input.maxValue;
  }
  if (min === undefined || max === undefined) {
    throw new TypeError('advice needs min and max, or value');
  }
  return {
    min,
    max,
    point,
    category,
    state: normalizeState(input),
    hideMinTickmark: input.hideMinTickmark ?? false,
    hideMaxTickmark: input.hideMaxTickmark ?? false,
    showArea: input.showArea ?? false,
    icon: input.icon,
    label: input.label,
    flatStart: false,
    flatEnd: false,
  };
}

/**
 * The ordered pair of an angular range.
 *
 * A band runs clockwise from `min` to `max`, so `{350, 10}` is the 20° band
 * across north. A pair written the other way round that would run more than
 * half the circle is what a reversed pair means, and is swapped; a deliberate
 * long band is written with the smaller angle first, `{20, 340}`.
 */
export function normalizeAngularRange(
  min: number,
  max: number
): {min: number; max: number} {
  if (min > max && normalizeAngle(max - min) > 180) {
    return {min: max, max: min};
  }
  return {min, max};
}
