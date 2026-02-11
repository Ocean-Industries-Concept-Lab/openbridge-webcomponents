/**
 * Setpoint Bundle — plain-class state container for multi-setpoint components.
 *
 * For components that have **multiple independent setpoints** (e.g. azimuth-thruster
 * with both angle and thrust setpoints), the {@link SetpointMixin} cannot be applied
 * twice. Instead, use one `SetpointBundle` per setpoint axis and sync properties
 * in `willUpdate()`.
 *
 * ## Architecture
 *
 * ```text
 *   ┌─────────────────────────────────────────────┐
 *   │  obc-azimuth-thruster (LitElement)          │
 *   │                                             │
 *   │  @property angleSetpoint                    │
 *   │  @property thrustSetpoint                   │
 *   │  @property touching          ─────────┐     │
 *   │                                       │     │
 *   │  ┌──────────────────┐  ┌──────────────┴──┐  │
 *   │  │ _angleSp         │  │ _thrustSp       │  │
 *   │  │ (SetpointBundle) │  │ (SetpointBundle)│  │
 *   │  │ wraparound=true  │  │ deadband=1      │  │
 *   │  └──────────────────┘  └─────────────────┘  │
 *   └─────────────────────────────────────────────┘
 * ```
 *
 * ## Usage
 *
 * ```ts
 * class ObcAzimuthThruster extends LitElement {
 *   // Public API: prefixed names
 *   @property({type: Number}) angleSetpoint: number | undefined;
 *   @property({type: Number}) thrustSetpoint: number | undefined;
 *   @property({type: Boolean}) touching: boolean = false;
 *   // ... more prefixed props
 *
 *   // Internal computation bundles
 *   private _angleSp = new SetpointBundle({angularWraparound: true});
 *   private _thrustSp = new SetpointBundle({defaultDeadband: 1, defaultZeroDeadband: 0.1});
 *
 *   override willUpdate(changed: PropertyValues) {
 *     // Sync public props → bundles
 *     this._angleSp.sync({
 *       setpoint: this.angleSetpoint,
 *       newSetpoint: this.newAngleSetpoint,
 *       atSetpoint: this.atAngleSetpoint,
 *       touching: this.touching,  // shared
 *       disableAutoAtSetpoint: this.disableAutoAtAngleSetpoint,
 *       autoAtSetpointDeadband: this.autoAtAngleSetpointDeadband,
 *       setpointAtZeroDeadband: this.angleSetpointAtZeroDeadband,
 *       setpointColorMode: this.angleSetpointColorMode,
 *     });
 *     this._thrustSp.sync({
 *       setpoint: this.thrustSetpoint,
 *       touching: this.touching,  // shared
 *       atSetpoint: this.atThrustSetpoint,
 *       disableAutoAtSetpoint: this.disableAutoAtThrustSetpoint,
 *       autoAtSetpointDeadband: this.autoAtThrustSetpointDeadband,
 *       setpointAtZeroDeadband: this.thrustSetpointAtZeroDeadband,
 *     });
 *   }
 *
 *   override render() {
 *     const isAtAngle = this._angleSp.computeAtSetpoint(this.angle);
 *     const isAtThrust = this._thrustSp.computeAtSetpoint(this.thrust);
 *     // ...
 *   }
 * }
 * ```
 */

import {computeAtSetpoint, SetpointColorMode} from './setpoint.js';

// Re-export for consumer convenience
export {SetpointColorMode};

// ============================================================================
// Bundle Options
// ============================================================================

/**
 * Configuration options for {@link SetpointBundle}.
 */
export interface SetpointBundleOptions {
  /**
   * Default value for `autoAtSetpointDeadband` when not synced.
   * @default 2
   */
  defaultDeadband?: number;

  /**
   * Default value for `setpointAtZeroDeadband` when not synced.
   * @default 0.5
   */
  defaultZeroDeadband?: number;

  /**
   * Enable 360° angular wraparound for at-setpoint calculation.
   * @default false
   */
  angularWraparound?: boolean;
}

// ============================================================================
// Sync Input
// ============================================================================

/**
 * Input for {@link SetpointBundle.sync} — maps the component's prefixed
 * public properties to the bundle's canonical state.
 *
 * All properties are optional; unset properties retain their previous value.
 */
export interface SetpointBundleSyncInput {
  setpoint?: number | undefined;
  newSetpoint?: number | undefined;
  atSetpoint?: boolean;
  touching?: boolean;
  disableAutoAtSetpoint?: boolean;
  autoAtSetpointDeadband?: number;
  setpointAtZeroDeadband?: number;
  setpointColorMode?: SetpointColorMode | undefined;
}

// ============================================================================
// Bundle Implementation
// ============================================================================

/**
 * Plain-class state container for a single setpoint axis.
 *
 * Holds the same 8 properties as {@link SetpointMixin} but without
 * `@property()` decorators, so it can be instantiated multiple times
 * in one component for multi-setpoint scenarios.
 */
export class SetpointBundle {
  /** Target setpoint value */
  setpoint: number | undefined;

  /** Adjustment preview (2-step interface) */
  newSetpoint: number | undefined;

  /** Manual at-setpoint override */
  atSetpoint: boolean = false;

  /** User is interacting */
  touching: boolean = false;

  /** Disable auto-calculation */
  disableAutoAtSetpoint: boolean = false;

  /** Auto at-setpoint tolerance */
  autoAtSetpointDeadband: number;

  /** Zero-snap tolerance */
  setpointAtZeroDeadband: number;

  /** Color palette override */
  setpointColorMode: SetpointColorMode | undefined;

  /** Whether to use angular wraparound */
  private readonly _angularWraparound: boolean;

  constructor(options?: SetpointBundleOptions) {
    this.autoAtSetpointDeadband = options?.defaultDeadband ?? 2;
    this.setpointAtZeroDeadband = options?.defaultZeroDeadband ?? 0.5;
    this._angularWraparound = options?.angularWraparound ?? false;
  }

  /**
   * Bulk-update bundle state from component properties.
   * Only provided properties are updated; others keep their current value.
   *
   * Call this in `willUpdate()` to sync prefixed public props → bundle.
   */
  sync(input: SetpointBundleSyncInput): void {
    if (input.setpoint !== undefined || 'setpoint' in input)
      this.setpoint = input.setpoint;
    if (input.newSetpoint !== undefined || 'newSetpoint' in input)
      this.newSetpoint = input.newSetpoint;
    if (input.atSetpoint !== undefined) this.atSetpoint = input.atSetpoint;
    if (input.touching !== undefined) this.touching = input.touching;
    if (input.disableAutoAtSetpoint !== undefined)
      this.disableAutoAtSetpoint = input.disableAutoAtSetpoint;
    if (input.autoAtSetpointDeadband !== undefined)
      this.autoAtSetpointDeadband = input.autoAtSetpointDeadband;
    if (input.setpointAtZeroDeadband !== undefined)
      this.setpointAtZeroDeadband = input.setpointAtZeroDeadband;
    if (input.setpointColorMode !== undefined || 'setpointColorMode' in input)
      this.setpointColorMode = input.setpointColorMode;
  }

  /**
   * Compute whether the current value is at the setpoint.
   * Delegates to the unified `computeAtSetpoint()` from `setpoint.ts`.
   *
   * @param currentValue - The instrument's current value for this axis
   * @returns Whether the value is within deadband of the setpoint
   */
  computeAtSetpoint(currentValue: number | undefined): boolean {
    return computeAtSetpoint({
      value: currentValue,
      setpoint: this.setpoint,
      touching: this.touching,
      disableAuto: this.disableAutoAtSetpoint,
      deadband: this.autoAtSetpointDeadband,
      atSetpointManual: this.atSetpoint,
      angularWraparound: this._angularWraparound,
    });
  }
}
