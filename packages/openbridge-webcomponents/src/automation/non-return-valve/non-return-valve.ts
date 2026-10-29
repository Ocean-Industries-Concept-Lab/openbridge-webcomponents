import {html} from 'lit';
import {customElement} from '../../decorator.js';
import {ObcDirectionValveBase} from '../direction-valve-shared/direction-valve-shared.js';
import {AutomationButtonHandlePosition, AutomationButtonOrientation, AutomationButtonReadoutPosition} from '../automation-button/automation-button.js';
import {Direction} from '../../types.js';

const ROTATION: Record<Direction, number> = {
  [Direction.Right]: 0,
  [Direction.Down]: 90,
  [Direction.Left]: 180,
  [Direction.Up]: -90,
};

const SEAT =
  'M20.375 5.29956C21.0298 4.77575 22 5.2423 22 6.08081V17.9197C21.9998 18.758 21.0297 19.2237 20.375 18.7L12 11.9998L20.375 5.29956Z';
const DISC =
  'M2 6.08105C2 5.24255 2.97024 4.77599 3.625 5.2998L9.92387 10.3385C10.1027 10.4815 10.3251 10.5589 10.5541 10.5576L19.9912 10.5055C20.5435 10.5025 20.9937 10.9477 20.9967 11.5L21.0023 12.5C21.0053 13.0523 20.5601 13.5025 20.0078 13.5055L10.3956 13.5586C10.1704 13.5599 9.95218 13.6371 9.77633 13.7778L3.625 18.7002C2.97024 19.224 2 18.7575 2 17.9189V6.08105Z';

/**
 * `<obc-non-return-valve>` – valve that lets the medium through in one
 * direction only, for process diagrams.
 *
 * ## Features
 *
 * - **Flow direction:** `flowDirection` (`up`, `down`, `left`, `right`) is the
 *   direction the valve lets through; the symbol turns with it.
 * - **Variant:** `regular` draws the round button, `flat` only the symbol.
 * - Badges, alert frame, progress and readout placement come from the shared
 *   automation button base.
 *
 * ## Usage Guidelines
 *
 * Use where a pipe must not flow backwards. The valve has no actuator and no
 * self-actuation line; for a valve that holds a pressure use
 * `obc-pressure-reduction-valve` or `obc-pressure-sustain-valve`.
 *
 * @property flowDirection - The direction the valve lets the medium through; the symbol turns with it.
 * @property variant - `regular` draws the round button, `flat` only the symbol.
 * @ignition-base-height: 82px
 * @ignition-base-width: 66px
 * @ignition-center
 * @experimental
 */
@customElement('obc-non-return-valve')
export class ObcNonReturnValve extends ObcDirectionValveBase {
  /** The icon is not symmetric, so it turns through all four directions itself. */
  override get _orientation(): AutomationButtonOrientation {
    return AutomationButtonOrientation.horizontal;
  }

    override get _readoutPosition(): AutomationButtonReadoutPosition {
      if (this.readoutPosition !== undefined) {
        return this.readoutPosition;
      }
      switch (this.flowDirection) {
        case Direction.Left:
          return AutomationButtonReadoutPosition.top;
        case Direction.Up:
          return AutomationButtonReadoutPosition.right;
        case Direction.Right:
          return AutomationButtonReadoutPosition.bottom;
        case Direction.Down:
          return AutomationButtonReadoutPosition.left;
        default:
          return AutomationButtonReadoutPosition.bottom;
      }
    }

  override get icon() {
    const style = `display: block; width: 100%; height: 100%; line-height: 0; transform: rotate(${ROTATION[this.flowDirection]}deg);`;
    return html`<div slot="icon" style=${style}>
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d=${SEAT}
            fill="var(--automation-symbol-on-border-color)"
            stroke="var(--automation-symbol-off-background-color)"
            vector-effect="non-scaling-stroke"
          />
          <path
            d=${DISC}
            fill="var(--automation-symbol-on-background-color)"
            stroke="var(--automation-symbol-on-border-color)"
            vector-effect="non-scaling-stroke"
          />
        </svg>
      </div>
      <div slot="icon-silhouette" style=${style}>
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d=${SEAT} fill="var(--automation-symbol-on-border-color)" />
          <path d=${DISC} fill="var(--automation-symbol-on-background-color)" />
        </svg>
      </div>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-non-return-valve': ObcNonReturnValve;
  }
}
