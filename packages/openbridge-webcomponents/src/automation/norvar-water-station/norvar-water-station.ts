import {property} from 'lit/decorators.js';
import {customElement} from '../../decorator.js';
import {
  NorvarStationState,
  NorvarWaterStationType,
  WATER_STATION_ART,
} from '../norvar-station-shared/norvar-station-art.js';
import {ObcNorvarStationBase} from '../norvar-station-shared/norvar-station-shared.js';

export {NorvarStationState, NorvarWaterStationType};

export enum NorvarWaterStationVariant {
  square = 'square',
  flat = 'flat',
}

/**
 * `<norvar-water-station>` – a drinking water facility drawn with the symbols of NORVAR report 153/2007,
 * for process diagrams.
 *
 * **Not part of the OpenBridge standard. Based on NORVAR report 153/2007 from
 * Norsk Vann BA.** That is why the tag has no `obc-` prefix.
 *
 * ## Features
 *
 * - **Station type:** `stationType` picks the symbol.
 * - **State:** `state` and `alert` colour the symbol. `static` draws it in the
 *   light blue of clean water.
 * - **Variant:** `flat` frames the symbol, `square` puts it in a rounded square button.
 * - Badges, alert frame, progress and readout placement come from the shared
 *   automation button base.
 *
 * ## Usage Guidelines
 *
 * Use where a diagram has to follow the symbols of the report. For the wastewater
 * side of the network use `norvar-wastewater-station`.
 *
 * @property stationType - What the facility is: `reservoir`, `pump-station`, `treatment-plant`, `metering-station`, `reduction-chamber`, `dam`, `overflow` or `manhole`.
 * @property state - The operating state: `ready` (black), `running` (green) or `unmonitored` (grey, in a grey button). `alert` draws the alarm state in red.
 * @property variant - `flat` draws the framed symbol, `square` adds the rounded square button.
 * @ignition-base-height: 82px
 * @ignition-base-width: 66px
 * @ignition-center
 * @experimental
 */
@customElement('norvar-water-station')
export class ObcNorvarWaterStation extends ObcNorvarStationBase {
  @property({type: String}) stationType: NorvarWaterStationType =
    NorvarWaterStationType.reservoir;
  @property({type: String}) variant: NorvarWaterStationVariant =
    NorvarWaterStationVariant.flat;

  protected override get equipmentName(): string {
    return 'NORVAR water station';
  }

  protected override get staticColor(): string {
    return 'var(--automation-medium-fresh-water)';
  }

  protected override get stationArt() {
    return WATER_STATION_ART[this.stationType];
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'norvar-water-station': ObcNorvarWaterStation;
  }
}
