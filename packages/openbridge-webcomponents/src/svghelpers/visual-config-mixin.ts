/**
 * Visual Config Mixin for Lit Elements
 *
 * A Lit mixin (https://lit.dev/docs/composition/mixins/) that adds the
 * radial-instrument **visual configuration** property cluster to any
 * `LitElement`. Eliminates the copy-paste of 5 `@property()` declarations
 * across the radial navigation instruments.
 *
 * ## What the mixin provides
 *
 * | Property            | Type              | Default                  | Description                                           |
 * |---------------------|-------------------|--------------------------|-------------------------------------------------------|
 * | `state`             | `InstrumentState` | `InstrumentState.active` | Instrument lifecycle state (active / loading / off)   |
 * | `priority`          | `Priority`        | `Priority.regular`       | Color priority palette (regular / enhanced)           |
 * | `tickmarkStyle`     | `TickmarkStyle`   | `TickmarkStyle.regular`  | Tickmark color style                                  |
 * | `showLabels`        | `boolean`         | `false`                  | Whether to render numeric / cardinal labels           |
 * | `tickmarksInside`   | `boolean`         | `false`                  | Whether tickmarks render inside the outer ring        |
 *
 * All five are always declared. The defaults are no-ops for instruments
 * that don't render a corresponding visual element, so consumers that
 * previously omitted (for example) `state` continue to behave unchanged.
 * Adding the properties is a purely additive, non-breaking change at the
 * public API level.
 *
 * ## Usage
 *
 * ```ts
 * import {VisualConfigMixin} from '../../svghelpers/visual-config-mixin.js';
 *
 * class MyGauge extends VisualConfigMixin(LitElement) { … }
 *
 * // Compose with SetpointMixin
 * class MyGauge2 extends VisualConfigMixin(SetpointMixin(LitElement)) { … }
 * ```
 *
 * @see SetpointMixin for the parallel setpoint property bundle
 */

import {LitElement} from 'lit';
import {property} from 'lit/decorators.js';
import {InstrumentState, Priority} from '../navigation-instruments/types.js';
import {TickmarkStyle} from '../navigation-instruments/watch/tickmark.js';

/** Constructor type helper for mixins. */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Constructor<T = object> = new (...args: any[]) => T;

/**
 * Interface describing the properties added by {@link VisualConfigMixin}.
 *
 * Use this for type-checking when you need to reference the mixin's API
 * without extending it.
 */
export declare class VisualConfigMixinInterface {
  /** Instrument lifecycle state (active / loading / off). */
  state: InstrumentState;
  /** Color priority palette (regular / enhanced). */
  priority: Priority;
  /** Tickmark color style (regular / enhanced). */
  tickmarkStyle: TickmarkStyle;
  /** Whether to render labels (e.g. NSEW, numeric tickmarks). */
  showLabels: boolean;
  /** Whether to render tickmarks inside the outer ring. */
  tickmarksInside: boolean;
}

/**
 * Lit mixin that adds the visual-config property bundle to a `LitElement`.
 */
export function VisualConfigMixin<T extends Constructor<LitElement>>(
  superClass: T
) {
  class VisualConfigMixinClass extends superClass {
    @property({type: String}) state: InstrumentState = InstrumentState.active;
    @property({type: String}) priority: Priority = Priority.regular;
    @property({type: String}) tickmarkStyle: TickmarkStyle =
      TickmarkStyle.regular;
    @property({type: Boolean}) showLabels: boolean = false;
    @property({type: Boolean}) tickmarksInside: boolean = false;
  }

  return VisualConfigMixinClass as Constructor<VisualConfigMixinInterface> & T;
}
