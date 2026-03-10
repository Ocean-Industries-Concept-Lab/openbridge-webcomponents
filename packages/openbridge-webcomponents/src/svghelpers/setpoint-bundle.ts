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
 *       autoAtSetpoint: this.autoAtAngleSetpoint,
 *       autoAtSetpointDeadband: this.autoAtAngleSetpointDeadband,
 *       setpointAtZeroDeadband: this.angleSetpointAtZeroDeadband,
 *       setpointOverride: this.angleSetpointOverride,
 *     });
 *     this._thrustSp.sync({
 *       setpoint: this.thrustSetpoint,
 *       touching: this.touching,  // shared
 *       atSetpoint: this.atThrustSetpoint,
 *       autoAtSetpoint: this.autoAtThrustSetpoint,
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

import {computeAtSetpoint, SETPOINT_ANIMATION_DURATION_MS} from './setpoint.js';

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

  /**
   * Callback invoked when the confirm animation completes.
   * Use this to trigger a re-render of the host component when
   * `departingNewSetpoint` is cleared.
   *
   * Typically: `onAnimationEnd: () => this.requestUpdate()`
   */
  onAnimationEnd?: () => void;
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
  autoAtSetpoint?: boolean;
  autoAtSetpointDeadband?: number;
  setpointAtZeroDeadband?: number;
  setpointOverride?: boolean;
  animateSetpoint?: boolean;
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

  /** Enable auto-calculation */
  autoAtSetpoint: boolean = true;

  /** Auto at-setpoint tolerance */
  autoAtSetpointDeadband: number;

  /** Zero-snap tolerance */
  setpointAtZeroDeadband: number;

  /** Override to derive color from priority regardless of instrument state */
  setpointOverride: boolean = false;

  /** Enable CSS-animated confirm transition. */
  animateSetpoint: boolean = false;

  /**
   * Value of the departing new-setpoint during confirm animation.
   * Set when `newSetpoint` goes from defined → undefined while animateSetpoint is true.
   * Cleared after the animation duration.
   */
  departingNewSetpoint: number | undefined;

  /** Whether to use angular wraparound */
  private readonly _angularWraparound: boolean;

  /** Callback to trigger host re-render when animation ends */
  private readonly _onAnimationEnd?: () => void;

  /** Timer for clearing departing state */
  private _animationTimer?: ReturnType<typeof setTimeout>;

  constructor(options?: SetpointBundleOptions) {
    this.autoAtSetpointDeadband = options?.defaultDeadband ?? 2;
    this.setpointAtZeroDeadband = options?.defaultZeroDeadband ?? 0.5;
    this._angularWraparound = options?.angularWraparound ?? false;
    this._onAnimationEnd = options?.onAnimationEnd;
  }

  /**
   * Bulk-update bundle state from component properties.
   * Only provided properties are updated; others keep their current value.
   *
   * Call this in `willUpdate()` to sync prefixed public props → bundle.
   *
   * Automatically detects confirm transitions (newSetpoint defined → undefined)
   * and manages `departingNewSetpoint` state for animation.
   */
  sync(input: SetpointBundleSyncInput): void {
    // Capture previous newSetpoint for confirm detection
    const prevNewSetpoint = this.newSetpoint;

    if (input.setpoint !== undefined || 'setpoint' in input)
      this.setpoint = input.setpoint;
    if (input.newSetpoint !== undefined || 'newSetpoint' in input)
      this.newSetpoint = input.newSetpoint;
    if (input.atSetpoint !== undefined) this.atSetpoint = input.atSetpoint;
    if (input.touching !== undefined) this.touching = input.touching;
    if (input.autoAtSetpoint !== undefined)
      this.autoAtSetpoint = input.autoAtSetpoint;
    if (input.autoAtSetpointDeadband !== undefined)
      this.autoAtSetpointDeadband = input.autoAtSetpointDeadband;
    if (input.setpointAtZeroDeadband !== undefined)
      this.setpointAtZeroDeadband = input.setpointAtZeroDeadband;
    if (input.setpointOverride !== undefined)
      this.setpointOverride = input.setpointOverride;
    if (input.animateSetpoint !== undefined)
      this.animateSetpoint = input.animateSetpoint;

    // Detect confirm: newSetpoint was defined, now undefined
    if (
      prevNewSetpoint !== undefined &&
      this.newSetpoint === undefined &&
      this.animateSetpoint
    ) {
      this.departingNewSetpoint = prevNewSetpoint;
      clearTimeout(this._animationTimer);
      this._animationTimer = setTimeout(() => {
        this.departingNewSetpoint = undefined;
        this._onAnimationEnd?.();
      }, SETPOINT_ANIMATION_DURATION_MS);
    }
  }

  /**
   * Clean up pending animation timer.
   * Call from the host component's `disconnectedCallback()`.
   */
  dispose(): void {
    clearTimeout(this._animationTimer);
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
      auto: this.autoAtSetpoint,
      deadband: this.autoAtSetpointDeadband,
      atSetpointManual: this.atSetpoint,
      angularWraparound: this._angularWraparound,
    });
  }
}
