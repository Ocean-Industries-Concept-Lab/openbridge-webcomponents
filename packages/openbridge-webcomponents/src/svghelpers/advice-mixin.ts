/**
 * Advice mixin for Lit elements.
 *
 * A Lit mixin (https://lit.dev/docs/composition/mixins/) that adds the
 * advice list and its two modes to an instrument and resolves the list
 * against the instrument's readings, the way `setpoint-mixin.ts` adds the
 * setpoint properties. The renderer then only places what comes back.
 *
 * ## What the mixin provides
 *
 * | Property          | Type            | Default | Description                                        |
 * |-------------------|-----------------|---------|----------------------------------------------------|
 * | `advices`         | `AdviceInput[]` | `[]`    | Ranges and points, see `advice.ts`                 |
 * | `adviceTrigger`   | `AdviceTrigger` | `both`  | Which readings trigger an advice                   |
 * | `adviceEmphasis`  | `boolean`       | `false` | The design's go-to / no-go emphasis rules          |
 * | `resolveAdvices()`| method          | —       | The resolved list for the renderer                 |
 *
 * ## Usage
 *
 * ```ts
 * import {AdviceMixin} from '../../svghelpers/advice-mixin.js';
 *
 * class MyGauge extends AdviceMixin(LitElement) {
 *   @property({type: Number}) value = 0;
 *
 *   override render() {
 *     const advices = this.resolveAdvices(this.value, this.setpoint);
 *     // pass `advices` to obc-watch or the external scale config
 *   }
 * }
 * ```
 *
 * An angular instrument passes `{angularWraparound: true}` so a band across
 * north hits and a reversed pair is ordered. An instrument that keeps a
 * prefixed public name (`headingAdvices`) declares it as a plain optional
 * field and calls {@link syncAdviceAlias} first in `willUpdate()`. An
 * instrument with two advice axes uses one `AdviceBundle`
 * (`advice-bundle.ts`) per axis.
 */

import {LitElement} from 'lit';
import {property} from 'lit/decorators.js';
import {
  AdviceTrigger,
  adviceTriggerReadings,
  resolveAdvices,
  type AdviceInput,
  type AdviceReading,
  type ResolvedAdvice,
} from './advice.js';

// eslint-disable-next-line @typescript-eslint/no-explicit-any -- TypeScript requires any[] in a mixin constructor (TS2545)
type Constructor<T = object> = new (...args: any[]) => T;

/**
 * Keeps a deprecated alias of `advices` in charge while a consumer sets it;
 * call it first in `willUpdate()`. The alias is a plain field with no
 * default because the generated Vue wrapper reads every property at creation
 * and writes those values back on its second render: an accessor alias would
 * hand back `[]` and clear a list set through `advices`, and a copy made only
 * when the alias changes would let that write-back clear a list set through
 * the alias.
 */
export function syncAdviceAlias(
  host: {advices: AdviceInput[]},
  alias: AdviceInput[] | undefined
): void {
  if (alias !== undefined) host.advices = alias;
}

/** The properties and the method {@link AdviceMixin} adds. */
export declare class AdviceMixinInterface {
  /**
   * Advice ranges and points in the instrument's unit. Each entry names its
   * `category` and carries `min` and `max`, or `value` for a point; see
   * `svghelpers/advice.ts` for the full shape and the names earlier releases
   * used, which are still read.
   */
  advices: AdviceInput[];

  /**
   * Which readings trigger an advice: `both` (the default) when the value or
   * the setpoint is inside it, `value` or `setpoint` for that reading alone.
   * @availableWhen adviceTrigger advices!=[]
   */
  adviceTrigger: AdviceTrigger;

  /**
   * The design's emphasis rules: at rest the go-to bands are active and the
   * no-go bands enabled, a hit on one group turns the other hinted. Off,
   * every band keeps its configured state until its own range is hit.
   * @availableWhen adviceEmphasis advices!=[]
   */
  adviceEmphasis: boolean;

  /**
   * The advice list resolved against the readings the trigger mode selects.
   *
   * @param value - The instrument's current value
   * @param setpoint - The instrument's setpoint, if any
   */
  resolveAdvices(
    value: AdviceReading,
    setpoint?: AdviceReading
  ): ResolvedAdvice[];
}

/** Configuration of {@link AdviceMixin}. */
export interface AdviceMixinOptions {
  /**
   * Ranges are angles: a band runs clockwise from `min` to `max`, may cross
   * north, and a reversed pair is ordered.
   * @default false
   */
  angularWraparound?: boolean;
}

/**
 * Lit mixin that adds the advice list, its modes and the resolve step.
 *
 * @param superClass - The base LitElement class to extend
 * @param options - Angular wraparound
 * @returns A class with the advice properties and `resolveAdvices()`
 *
 * @see AdviceMixinInterface for the API surface
 * @see `advice-bundle.ts` for instruments with several advice axes
 */
export function AdviceMixin<T extends Constructor<LitElement>>(
  superClass: T,
  options?: AdviceMixinOptions
) {
  const angularWraparound = options?.angularWraparound ?? false;

  class AdviceMixinClass extends superClass {
    /** Advice ranges and points in the instrument's unit; see `svghelpers/advice.ts`. */
    @property({type: Array}) advices: AdviceInput[] = [];

    /**
     * Which readings trigger an advice: the value, the setpoint, or either.
     * @availableWhen adviceTrigger advices!=[]
     */
    @property({type: String}) adviceTrigger: AdviceTrigger = AdviceTrigger.both;

    /**
     * The design's go-to / no-go emphasis rules.
     * @availableWhen adviceEmphasis advices!=[]
     */
    @property({type: Boolean}) adviceEmphasis = false;

    /** @see AdviceMixinInterface.resolveAdvices */
    resolveAdvices(
      value: AdviceReading,
      setpoint?: AdviceReading
    ): ResolvedAdvice[] {
      return resolveAdvices(
        this.advices ?? [],
        adviceTriggerReadings(this.adviceTrigger, value, setpoint),
        {angularWraparound, emphasis: this.adviceEmphasis}
      );
    }
  }

  return AdviceMixinClass as Constructor<AdviceMixinInterface> & T;
}
