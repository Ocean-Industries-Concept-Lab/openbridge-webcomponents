/**
 * Setpoint Mixin for Lit Elements
 *
 * A Lit mixin (https://lit.dev/docs/composition/mixins/) that adds a complete
 * setpoint property bundle to any LitElement. Eliminates the copy-paste of
 * 8 `@property()` declarations + the `atSetpointCalc()` method that was
 * previously duplicated across 15+ instrument components.
 *
 * ## What the mixin provides
 *
 * | Property                 | Type                           | Default              | Description                                  |
 * |--------------------------|--------------------------------|----------------------|----------------------------------------------|
 * | `setpoint`               | `number \| undefined`          | `undefined`          | Target setpoint value                        |
 * | `newSetpoint`            | `number \| undefined`          | `undefined`          | Adjustment preview (2-step interface)        |
 * | `atSetpoint`             | `boolean`                      | `false`              | Manual at-setpoint override                  |
 * | `touching`               | `boolean`                      | `false`              | User is physically interacting               |
 * | `disableAutoAtSetpoint`  | `boolean`                      | `false`              | Disable auto at-setpoint calculation         |
 * | `autoAtSetpointDeadband` | `number`                       | configurable (def 2) | Tolerance for auto at-setpoint detection     |
 * | `setpointAtZeroDeadband` | `number`                       | configurable (def 0.5)| Zero-snap tolerance                         |
 * | `setpointColorMode`      | `SetpointColorMode \| undefined` | `undefined`        | Color palette override                       |
 * | `computeAtSetpoint()`    | `(value) => boolean`           | —                    | Unified at-setpoint calculation              |
 *
 * ## `touching` vs `newSetpoint`
 *
 * These serve two different interaction patterns:
 *
 * - **`touching`**: Immediate-feedback interaction (e.g. lever/slider).
 *   The setpoint updates in real-time. While touching, `computeAtSetpoint()`
 *   returns false (suppressed) and the single setpoint marker shows in
 *   **focus** visual state.
 *
 * - **`newSetpoint`**: Two-step adjustment interface.
 *   The user moves a preview marker to a new position, then confirms.
 *   Two setpoint markers are visible: the original (dimmed) and the new
 *   one (focus state). See `SetpointAdjustmentFlow` story for the full flow.
 *
 * ## Usage
 *
 * ### Single setpoint (most instruments)
 *
 * ```ts
 * import {SetpointMixin} from '../../svghelpers/setpoint-mixin.js';
 *
 * class MyGauge extends SetpointMixin(LitElement) {
 *   @property({type: Number}) value = 0;
 *
 *   override render() {
 *     const isAtSetpoint = this.computeAtSetpoint(this.value);
 *     // ... render with isAtSetpoint
 *   }
 * }
 * ```
 *
 * ### With angular wraparound (compass/heading)
 *
 * ```ts
 * class MyCompass extends SetpointMixin(LitElement, {angularWraparound: true}) {
 *   @property({type: Number}) heading = 0;
 *
 *   override render() {
 *     const isAtSetpoint = this.computeAtSetpoint(this.heading);
 *     // 359° and 1° are correctly detected as 2° apart
 *   }
 * }
 * ```
 *
 * ### With custom defaults (thrust instruments)
 *
 * ```ts
 * class MyThruster extends SetpointMixin(LitElement, {
 *   defaultDeadband: 1,
 *   defaultZeroDeadband: 0.1,
 * }) {
 *   // autoAtSetpointDeadband defaults to 1 instead of 2
 *   // setpointAtZeroDeadband defaults to 0.1 instead of 0.5
 * }
 * ```
 *
 * ### Multiple setpoints (azimuth-thruster)
 *
 * For components with multiple independent setpoints (e.g. angle + thrust),
 * the mixin cannot be applied twice. Use {@link SetpointBundle} from
 * `setpoint-bundle.ts` instead — one bundle per setpoint axis.
 *
 * ### Prefixed API (compass/heading backward compat)
 *
 * For instruments that expose prefixed property names (e.g. `headingSetpoint`),
 * use the mixin internally and map the public API in `willUpdate()`:
 *
 * ```ts
 * class ObcHeading extends SetpointMixin(LitElement, {angularWraparound: true}) {
 *   // Public API (backward compat)
 *   @property({type: Number}) headingSetpoint: number | undefined;
 *
 *   override willUpdate(changed: PropertyValues) {
 *     super.willUpdate(changed);
 *     if (changed.has('headingSetpoint')) {
 *       this.setpoint = this.headingSetpoint;
 *     }
 *   }
 * }
 * ```
 */

import {LitElement, PropertyValues} from 'lit';
import {property} from 'lit/decorators.js';
import {computeAtSetpoint} from './setpoint.js';
import type {SetpointColorMode} from './setpoint.js';

// ============================================================================
// Types
// ============================================================================

/**
 * Constructor type helper for mixins.
 * @see https://lit.dev/docs/composition/mixins/#typing-the-subclass
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Constructor<T = object> = new (...args: any[]) => T;

/**
 * Interface describing the properties and methods added by {@link SetpointMixin}.
 *
 * Use this for type-checking when you need to reference the mixin's API
 * without extending it:
 *
 * ```ts
 * function doSomething(host: SetpointMixinInterface) {
 *   const isAt = host.computeAtSetpoint(someValue);
 * }
 * ```
 */
export declare class SetpointMixinInterface {
  /** Target setpoint value. `undefined` = no setpoint marker shown. */
  setpoint: number | undefined;

  /**
   * Adjustment preview for 2-step interface.
   * When defined, two markers are shown: original (dimmed) + new (focus).
   * @see SetpointAdjustmentFlow story for the full interaction flow.
   */
  newSetpoint: number | undefined;

  /**
   * Manual at-setpoint override.
   * Used when `disableAutoAtSetpoint` is true. Ignored when auto mode is active.
   */
  atSetpoint: boolean;

  /**
   * User is physically interacting with the control.
   *
   * When true:
   * - `computeAtSetpoint()` returns false (suppressed)
   * - Single setpoint marker renders in focus visual state
   *
   * Use for immediate-feedback interactions (e.g. lever/slider touch).
   */
  touching: boolean;

  /** When true, `computeAtSetpoint()` uses manual `atSetpoint` boolean. */
  disableAutoAtSetpoint: boolean;

  /** Tolerance for auto at-setpoint detection. */
  autoAtSetpointDeadband: number;

  /** Tolerance for zero-snap visual state (equalZero). */
  setpointAtZeroDeadband: number;

  /** Explicit color palette override. When undefined, derived from instrument state. */
  setpointColorMode: SetpointColorMode | undefined;

  /**
   * Compute whether the current value is at the setpoint.
   *
   * This is the unified replacement for all the per-instrument
   * `atSetpointCalc()` / `atHeadingSetpointCalc()` / `atAngleSetpointCalc` methods.
   *
   * @param currentValue - The instrument's current value (speed, angle, thrust, etc.)
   * @returns Whether `currentValue` is within deadband of the setpoint
   */
  computeAtSetpoint(currentValue: number | undefined): boolean;
}

// ============================================================================
// Mixin Options
// ============================================================================

/**
 * Configuration options for {@link SetpointMixin}.
 */
export interface SetpointMixinOptions {
  /**
   * Default value for `autoAtSetpointDeadband`.
   * - Radial instruments: 2 (degrees)
   * - Thrust instruments: 1 (percent)
   * @default 2
   */
  defaultDeadband?: number;

  /**
   * Default value for `setpointAtZeroDeadband`.
   * - Most instruments: 0.5
   * - Thrust instruments: 0.1
   * @default 0.5
   */
  defaultZeroDeadband?: number;

  /**
   * Enable 360° angular wraparound for at-setpoint calculation.
   * When true, 359° and 1° are correctly detected as 2° apart.
   * Use for compass, heading, and other full-rotation instruments.
   * @default false
   */
  angularWraparound?: boolean;
}

// ============================================================================
// Mixin Implementation
// ============================================================================

/**
 * Lit mixin that adds a complete setpoint property bundle to a LitElement.
 *
 * @param superClass - The base LitElement class to extend
 * @param options - Configuration options (defaults, angular wraparound)
 * @returns A new class with all setpoint properties and computation method
 *
 * @see SetpointMixinInterface for the full API surface
 * @see SetpointMixinOptions for configuration
 * @see SetpointBundle for multi-setpoint components (e.g. azimuth-thruster)
 */
export function SetpointMixin<T extends Constructor<LitElement>>(
  superClass: T,
  options?: SetpointMixinOptions
) {
  const {
    defaultDeadband = 2,
    defaultZeroDeadband = 0.5,
    angularWraparound = false,
  } = options ?? {};

  class SetpointMixinClass extends superClass {
    // ------------------------------------------------------------------
    // Setpoint properties (replaces 8 copy-pasted @property declarations)
    // ------------------------------------------------------------------

    /** Target setpoint value. `undefined` = no setpoint marker shown. */
    @property({type: Number}) setpoint: number | undefined;

    /**
     * Adjustment preview for 2-step interface.
     * When defined, two markers are shown: original (dimmed) + new (focus).
     */
    @property({type: Number}) newSetpoint: number | undefined;

    /** Manual at-setpoint override (used when `disableAutoAtSetpoint` is true). */
    @property({type: Boolean}) atSetpoint: boolean = false;

    /**
     * User is physically interacting with the control.
     * Suppresses at-setpoint calculation and triggers focus visual.
     */
    @property({type: Boolean}) touching: boolean = false;

    /** When true, uses manual `atSetpoint` boolean instead of auto-calculation. */
    @property({type: Boolean}) disableAutoAtSetpoint: boolean = false;

    /** Tolerance for auto at-setpoint detection. */
    @property({type: Number}) autoAtSetpointDeadband: number = defaultDeadband;

    /** Tolerance for zero-snap visual state. */
    @property({type: Number}) setpointAtZeroDeadband: number =
      defaultZeroDeadband;

    /** Explicit color palette override. */
    @property({type: String}) setpointColorMode: SetpointColorMode | undefined;

    // ------------------------------------------------------------------
    // Computation (replaces per-instrument atSetpointCalc methods)
    // ------------------------------------------------------------------

    /**
     * Compute whether the current value is at the setpoint.
     *
     * Delegates to the unified `computeAtSetpoint()` from `setpoint.ts`,
     * which standardizes the behavior across all instrument types:
     * - Inclusive deadband comparison (`<=`)
     * - `touching` guard (returns false while touching)
     * - `Number.isFinite()` deadband validation
     * - Optional 360° angular wraparound
     *
     * @param currentValue - The instrument's current value
     * @returns Whether `currentValue` is within deadband of the setpoint
     */
    computeAtSetpoint(currentValue: number | undefined): boolean {
      return computeAtSetpoint({
        value: currentValue,
        setpoint: this.setpoint,
        touching: this.touching,
        disableAuto: this.disableAutoAtSetpoint,
        deadband: this.autoAtSetpointDeadband,
        atSetpointManual: this.atSetpoint,
        angularWraparound,
      });
    }

    /**
     * Override point for subclasses that need to run logic in `willUpdate`.
     * Always call `super.willUpdate(changed)` to preserve mixin behavior.
     */
    override willUpdate(changed: PropertyValues): void {
      super.willUpdate(changed);
    }
  }

  // Cast to include both the superclass type and the mixin interface
  return SetpointMixinClass as Constructor<SetpointMixinInterface> & T;
}
