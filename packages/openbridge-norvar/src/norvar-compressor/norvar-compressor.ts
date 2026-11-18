import {customElement} from '@oicl/openbridge-webcomponents/dist/decorator.js';
import {NorvarStationState} from '../norvar-station-shared/norvar-station-art.js';
import {COMPRESSOR_ART} from '../norvar-hvac-shared/norvar-hvac-art.js';
import {
  NorvarSymbolVariant,
  ObcNorvarSymbolBase,
} from '../norvar-hvac-shared/norvar-hvac-shared.js';

export {NorvarStationState, NorvarSymbolVariant};

/**
 * `<norvar-compressor>` – a compressor drawn with the symbols of NORVAR report 153/2007, for process diagrams.
 *
 * **Not part of the OpenBridge standard. Based on NORVAR report 153/2007 from
 * Norsk Vann BA.** That is why the tag has no `obc-` prefix.
 *
 * ## Features
 *
 * - **State:** `state` and `alert` colour the symbol, as on the NORVAR stations. An
 *   unmonitored symbol sits in a grey button.
 * - **Variant:** `flat` frames the symbol, `regular` puts it in a round button.
 * - Badges, alert frame, progress and readout placement come from the shared
 *   automation button base.
 *
 * ## Usage Guidelines
 *
 * Use where a diagram has to follow the symbols of the report.
 *
 * @property state - The operating state: `ready` (black), `running` (green) or `unmonitored` (grey). `alert` draws the alarm state in red.
 * @property variant - `flat` draws the framed symbol, `regular` adds the round button.
 * @ignition-base-height: 82px
 * @ignition-base-width: 66px
 * @ignition-center
 * @experimental
 */
@customElement('norvar-compressor')
export class ObcNorvarCompressor extends ObcNorvarSymbolBase {
  protected override get round(): boolean {
    return true;
  }

  protected override get equipmentName(): string {
    return 'NORVAR compressor';
  }

  protected override get stationArt() {
    return COMPRESSOR_ART;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'norvar-compressor': ObcNorvarCompressor;
  }
}
