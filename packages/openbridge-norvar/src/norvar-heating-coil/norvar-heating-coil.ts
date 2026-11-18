import {customElement} from '@oicl/openbridge-webcomponents/dist/decorator.js';
import {NorvarStationState} from '../norvar-station-shared/norvar-station-art.js';
import {HEATING_COIL_ART} from '../norvar-hvac-shared/norvar-hvac-art.js';
import {
  NorvarSymbolVariant,
  ObcNorvarSymbolBase,
} from '../norvar-hvac-shared/norvar-hvac-shared.js';

export {NorvarStationState, NorvarSymbolVariant};

/**
 * `<norvar-heating-coil>` – a heating coil (varmebatteri) drawn with the symbols of NORVAR report 153/2007, for process diagrams.
 *
 * **Not part of the OpenBridge standard. Based on NORVAR report 153/2007 from
 * Norsk Vann BA.** That is why the tag has no `obc-` prefix.
 *
 * ## Features
 *
 * - **State:** `state` and `alert` colour the symbol, as on the NORVAR stations. An
 *   unmonitored symbol sits in a grey button.
 * - **Variant:** `flat` frames the symbol, `regular` puts it in a square button.
 * - Badges, alert frame, progress and readout placement come from the shared
 *   automation button base.
 *
 * ## Usage Guidelines
 *
 * Use where a diagram has to follow the symbols of the report.
 *
 * @property state - The operating state: `ready` (black), `running` (green) or `unmonitored` (grey). `alert` draws the alarm state in red.
 * @property variant - `flat` draws the framed symbol, `regular` adds the square button.
 * @ignition-base-height: 82px
 * @ignition-base-width: 66px
 * @ignition-center
 * @experimental
 */
@customElement('norvar-heating-coil')
export class ObcNorvarHeatingCoil extends ObcNorvarSymbolBase {
  protected override get equipmentName(): string {
    return 'NORVAR heating coil';
  }

  protected override get stationArt() {
    return HEATING_COIL_ART;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'norvar-heating-coil': ObcNorvarHeatingCoil;
  }
}
