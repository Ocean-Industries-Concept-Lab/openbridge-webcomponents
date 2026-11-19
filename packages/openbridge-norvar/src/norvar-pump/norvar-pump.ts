import {customElement} from '@oicl/openbridge-webcomponents/dist/decorator.js';
import {PUMP_ART} from '../norvar-motorized-shared/norvar-motorized-art.js';
import {
  MotorizedVariant,
  NorvarAvailability,
  ObcNorvarMotorizedBase,
} from '../norvar-motorized-shared/norvar-motorized-shared.js';

export {MotorizedVariant, NorvarAvailability};

/**
 * `<norvar-pump>` – a pump drawn with the symbols of NORVAR report 153/2007, for process diagrams.
 *
 * **Not part of the OpenBridge standard. Based on NORVAR report 153/2007 from
 * Norsk Vann BA.** That is why the tag has no `obc-` prefix.
 *
 * ## Features
 *
 * - **Running:** `turnedOn` draws the running symbol in green. The arrow points along the pipe while the pump runs and down while it stands still.
 * - **Availability:** `availability` draws a pump that is `disabled` or has its
 *   safety switch off (`safety-off`) in grey; the latter is crossed out.
 * - **Alarm:** `alert` draws the symbol in red and keeps its running or stopped shape.
 * - **Variant:** `flat` draws the symbol on a disc, `regular` puts it in a round button.
 * - Speed readout, badges, alert frame, progress and readout placement come
 *   from the core's motorized button.
 *
 * ## Usage Guidelines
 *
 * Use where a diagram has to follow the symbols of the report. Everywhere else
 * use the OpenBridge `obc-pump`.
 *
 * @property turnedOn - Whether the pump runs.
 * @property availability - `available`, `disabled` (avstilt) or `safety-off` (the safety switch is off, or the pump is not ready).
 * @property variant - `flat` draws the symbol on a disc, `regular` adds the round button.
 * @ignition-base-height: 82px
 * @ignition-base-width: 66px
 * @ignition-center
 * @experimental
 */
@customElement('norvar-pump')
export class ObcNorvarPump extends ObcNorvarMotorizedBase {
  protected override get equipmentName(): string {
    return 'NORVAR pump';
  }

  protected override get motorizedArt() {
    return PUMP_ART;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'norvar-pump': ObcNorvarPump;
  }
}
