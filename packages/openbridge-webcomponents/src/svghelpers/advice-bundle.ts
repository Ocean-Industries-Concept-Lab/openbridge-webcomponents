/**
 * Advice bundle: the advice list of one axis as a plain object, for an
 * instrument with several axes, where the mixin cannot be applied twice.
 * `obc-azimuth-thruster` holds one for its angle and one for its thrust, the
 * way it holds two `SetpointBundle`s.
 *
 * ```ts
 * class ObcAzimuthThruster extends LitElement {
 *   @property({type: Array}) angleAdvices: AdviceInput[] = [];
 *   @property({type: Array}) thrustAdvices: AdviceInput[] = [];
 *   @property({type: String}) adviceTrigger = AdviceTrigger.both;
 *
 *   private _angleAdvice = new AdviceBundle({angularWraparound: true});
 *   private _thrustAdvice = new AdviceBundle();
 *
 *   override willUpdate() {
 *     this._angleAdvice.sync({advices: this.angleAdvices, adviceTrigger: this.adviceTrigger});
 *     this._thrustAdvice.sync({advices: this.thrustAdvices, adviceTrigger: this.adviceTrigger});
 *   }
 *
 *   override render() {
 *     const angleAdvices = this._angleAdvice.resolve(this.angle, this.angleSetpoint);
 *     const thrustAdvices = this._thrustAdvice.resolve(this.thrust, this.thrustSetpoint);
 *   }
 * }
 * ```
 *
 * @module
 */

import {
  AdviceTrigger,
  adviceTriggerReadings,
  resolveAdvices,
  type AdviceInput,
  type AdviceReading,
  type ResolvedAdvice,
} from './advice.js';

/** Configuration of {@link AdviceBundle}. */
export interface AdviceBundleOptions {
  /** Ranges are angles: a band may cross north and a reversed pair is ordered. */
  angularWraparound?: boolean;
}

/** What {@link AdviceBundle.sync} takes; a field left out keeps its value. */
export interface AdviceBundleSyncInput {
  advices?: AdviceInput[];
  adviceTrigger?: AdviceTrigger;
  adviceEmphasis?: boolean;
}

/** The advice list, trigger mode and emphasis of one axis. */
export class AdviceBundle {
  advices: AdviceInput[] = [];
  adviceTrigger: AdviceTrigger = AdviceTrigger.both;
  adviceEmphasis = false;

  private readonly _angularWraparound: boolean;

  constructor(options?: AdviceBundleOptions) {
    this._angularWraparound = options?.angularWraparound ?? false;
  }

  /** Copies the host's public properties in; call it from `willUpdate()`. */
  sync(input: AdviceBundleSyncInput): void {
    if (input.advices !== undefined) this.advices = input.advices;
    if (input.adviceTrigger !== undefined)
      this.adviceTrigger = input.adviceTrigger;
    if (input.adviceEmphasis !== undefined)
      this.adviceEmphasis = input.adviceEmphasis;
  }

  /** The advice list resolved against the readings the trigger mode selects. */
  resolve(value: AdviceReading, setpoint?: AdviceReading): ResolvedAdvice[] {
    return resolveAdvices(
      this.advices ?? [],
      adviceTriggerReadings(this.adviceTrigger, value, setpoint),
      {
        angularWraparound: this._angularWraparound,
        emphasis: this.adviceEmphasis,
      }
    );
  }
}
