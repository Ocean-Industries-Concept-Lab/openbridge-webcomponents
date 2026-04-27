/**
 * Tickmark Interval Mixin for Lit Elements
 *
 * A Lit mixin (https://lit.dev/docs/composition/mixins/) that adds the
 * three `*TickmarkInterval` reactive properties (`primary`, `secondary`,
 * `tertiary`) shared by all instruments and bars that render scaled
 * tickmarks. Eliminates the copy-paste of three identical `@property()`
 * declarations across 9+ components.
 *
 * ## What the mixin provides
 *
 * | Property                     | Type                  | Default           | Description                                            |
 * |------------------------------|-----------------------|-------------------|--------------------------------------------------------|
 * | `primaryTickmarkInterval`    | `number \| undefined` | from options      | Interval (in value units) between primary tickmarks   |
 * | `secondaryTickmarkInterval`  | `number \| undefined` | from options      | Interval between secondary tickmarks                  |
 * | `tertiaryTickmarkInterval`   | `number \| undefined` | from options      | Interval between tertiary tickmarks                   |
 *
 * In all cases, `undefined` or a non-positive value (`<= 0`) means "do
 * not render that tier of tickmarks".
 *
 * ## Per-component defaults
 *
 * Different instruments use different default cadences (e.g. `50/10` for
 * a 0–100 gauge, `90/undefined` for a compass-style 360° dial). Pass the
 * defaults via the options object:
 *
 * ```ts
 * class ObcGaugeRadial extends TickmarkIntervalMixin(LitElement, {
 *   defaultPrimary: 50,
 *   defaultSecondary: 10,
 * }) { … }
 *
 * class ObcAzimuthThruster extends TickmarkIntervalMixin(LitElement, {
 *   defaultPrimary: 90,
 * }) { … }
 * ```
 *
 * Omit a `default*` to leave the corresponding interval `undefined` (no
 * tickmarks rendered for that tier by default).
 *
 * ## Composition
 *
 * Composes cleanly with {@link SetpointMixin} and {@link VisualConfigMixin}:
 *
 * ```ts
 * class ObcGaugeRadial extends TickmarkIntervalMixin(
 *   VisualConfigMixin(SetpointMixin(LitElement)),
 *   {defaultPrimary: 50, defaultSecondary: 10}
 * ) { … }
 * ```
 */

import {LitElement} from 'lit';
import {property} from 'lit/decorators.js';

/** Constructor type helper for mixins. */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Constructor<T = object> = new (...args: any[]) => T;

/** Options for {@link TickmarkIntervalMixin}. */
export interface TickmarkIntervalMixinOptions {
  /** Default value for `primaryTickmarkInterval`. Omit for `undefined`. */
  defaultPrimary?: number;
  /** Default value for `secondaryTickmarkInterval`. Omit for `undefined`. */
  defaultSecondary?: number;
  /** Default value for `tertiaryTickmarkInterval`. Omit for `undefined`. */
  defaultTertiary?: number;
}

/** Interface describing the properties added by {@link TickmarkIntervalMixin}. */
export declare class TickmarkIntervalMixinInterface {
  /**
   * Interval (in value units) between primary tickmarks. When `undefined`
   * or `<= 0`, no primary tickmarks are rendered.
   */
  primaryTickmarkInterval: number | undefined;
  /**
   * Interval (in value units) between secondary tickmarks. When `undefined`
   * or `<= 0`, no secondary tickmarks are rendered.
   */
  secondaryTickmarkInterval: number | undefined;
  /**
   * Interval (in value units) between tertiary tickmarks. When `undefined`
   * or `<= 0`, no tertiary tickmarks are rendered.
   */
  tertiaryTickmarkInterval: number | undefined;
}

/**
 * Lit mixin that adds the tickmark-interval triplet to a `LitElement`.
 *
 * @param superClass The class to extend.
 * @param options    Per-component defaults for the three intervals.
 */
export function TickmarkIntervalMixin<T extends Constructor<LitElement>>(
  superClass: T,
  options?: TickmarkIntervalMixinOptions
) {
  const {defaultPrimary, defaultSecondary, defaultTertiary} = options ?? {};

  class TickmarkIntervalMixinClass extends superClass {
    @property({type: Number}) primaryTickmarkInterval: number | undefined =
      defaultPrimary;
    @property({type: Number}) secondaryTickmarkInterval: number | undefined =
      defaultSecondary;
    @property({type: Number}) tertiaryTickmarkInterval: number | undefined =
      defaultTertiary;
  }

  return TickmarkIntervalMixinClass as Constructor<TickmarkIntervalMixinInterface> &
    T;
}
