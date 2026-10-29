import {customElement} from '../../decorator.js';
import {ObcPressureValveBase} from '../direction-valve-shared/direction-valve-shared.js';

/**
 * `<obc-pressure-reduction-valve>` – self-actuated on/off valve that holds the
 * pressure after it, for process diagrams.
 *
 * ## Features
 *
 * - **Flow direction:** `flowDirection` (`up`, `down`, `left`, `right`) lays
 *   the valve on the pipe. The actuator sits on top with flow to the right
 *   and turns with the flow.
 * - **Self-actuation line:** runs from the actuator to the outlet side, the
 *   pressure the valve controls.
 * - **Variant:** `regular` draws the round button, `flat` only the symbol.
 * - Badges, alert frame, progress and readout placement come from the shared
 *   automation button base.
 *
 * ## Usage Guidelines
 *
 * Use for a valve that throttles to keep the downstream pressure at its
 * setting. For one that keeps the upstream pressure use
 * `obc-pressure-sustain-valve`; for a valve without a self-actuation line use
 * `obc-digital-valve`.
 *
 * @property flowDirection - The direction the medium flows through the valve; the actuator and the self-actuation line turn with it.
 * @property variant - `regular` draws the round button, `flat` only the symbol.
 * @ignition-base-height: 82px
 * @ignition-base-width: 66px
 * @ignition-center
 * @experimental
 */
@customElement('obc-pressure-reduction-valve')
export class ObcPressureReductionValve extends ObcPressureValveBase {
  protected override get sensesDownstream(): boolean {
    return true;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-pressure-reduction-valve': ObcPressureReductionValve;
  }
}
