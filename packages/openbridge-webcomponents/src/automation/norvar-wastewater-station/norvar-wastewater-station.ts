import {property} from 'lit/decorators.js';
import {customElement} from '../../decorator.js';
import {
  NORVAR_UNMONITORED_COLOR,
  NorvarStationState,
  NorvarWastewaterStationType,
  WASTEWATER_STATION_ART,
} from '../norvar-station-shared/norvar-station-art.js';
import {ObcNorvarStationBase} from '../norvar-station-shared/norvar-station-shared.js';

export {NorvarStationState, NorvarWastewaterStationType};

export enum NorvarWastewaterStationVariant {
  regular = 'regular',
  flat = 'flat',
}

/** What a static symbol carries: combined or foul sewage in brown, surface water in grey. */
export enum NorvarWastewaterMedium {
  sewage = 'sewage',
  surfaceWater = 'surface-water',
}

/**
 * `<norvar-wastewater-station>` – a wastewater facility drawn with the symbols of NORVAR report 153/2007,
 * for process diagrams.
 *
 * **Not part of the OpenBridge standard. Based on NORVAR report 153/2007 from
 * Norsk Vann BA.** That is why the tag has no `obc-` prefix.
 *
 * ## Features
 *
 * - **Station type:** `stationType` picks the symbol.
 * - **State:** `state` and `alert` colour the symbol. `static` draws it in the
 *   colour of `medium`.
 * - **Variant:** `flat` frames the symbol, `regular` puts it in a round button.
 * - Badges, alert frame, progress and readout placement come from the shared
 *   automation button base.
 *
 * ## Usage Guidelines
 *
 * Use where a diagram has to follow the symbols of the report. For the drinking water
 * side of the network use `norvar-water-station`.
 *
 * @property stationType - What the facility is: `detention-basin`, `pump-station`, `treatment-plant`, `metering-station`, `discharge`, `overflow` or `manhole`.
 * @property state - The operating state: `ready` (black), `running` (green) or `unmonitored` (grey). `alert` draws the alarm state in red.
 * @property medium - What a static symbol carries: `sewage` (brown) or `surface-water` (grey).
 * @availableWhen medium static==true
 * @property variant - `flat` draws the framed symbol, `regular` adds the round button.
 * @ignition-base-height: 82px
 * @ignition-base-width: 66px
 * @ignition-center
 * @experimental
 */
@customElement('norvar-wastewater-station')
export class ObcNorvarWastewaterStation extends ObcNorvarStationBase {
  @property({type: String}) stationType: NorvarWastewaterStationType =
    NorvarWastewaterStationType.detentionBasin;
  @property({type: String}) variant: NorvarWastewaterStationVariant =
    NorvarWastewaterStationVariant.flat;

  @property({type: String}) medium: NorvarWastewaterMedium =
    NorvarWastewaterMedium.sewage;

  protected override get equipmentName(): string {
    return 'NORVAR wastewater station';
  }

  /** The palette's only brown is the pale masses colour. */
  protected override get staticColor(): string {
    return this.medium === NorvarWastewaterMedium.surfaceWater
      ? NORVAR_UNMONITORED_COLOR
      : 'var(--automation-medium-masses)';
  }

  protected override get stationArt() {
    return WASTEWATER_STATION_ART[this.stationType];
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'norvar-wastewater-station': ObcNorvarWastewaterStation;
  }
}
