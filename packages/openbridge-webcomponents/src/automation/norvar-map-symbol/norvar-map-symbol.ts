import {property} from 'lit/decorators.js';
import {customElement} from '../../decorator.js';
import {AutomationButtonVariant} from '../automation-button/automation-button.js';
import {
  MAP_SYMBOL_ART,
  NORVAR_UNMONITORED_COLOR,
  NorvarMapSymbolType,
  NorvarStationState,
} from '../norvar-station-shared/norvar-station-art.js';
import {ObcNorvarStationBase} from '../norvar-station-shared/norvar-station-shared.js';

export {NorvarMapSymbolType, NorvarStationState};

export enum NorvarMapSymbolVariant {
  regular = 'regular',
  flat = 'flat',
}

/**
 * `<norvar-map-symbol>` – a culvert, precipitation station, watercourse metering station or
 * discharge point drawn with the symbols of NORVAR report 153/2007, for process diagrams.
 *
 * **Not part of the OpenBridge standard. Based on NORVAR report 153/2007 from
 * Norsk Vann BA.** That is why the tag has no `obc-` prefix.
 *
 * ## Features
 *
 * - **Symbol type:** `symbolType` picks the symbol. The discharge point is round, the
 *   others square.
 * - **State:** `state` and `alert` colour the symbol, as on the NORVAR stations. An
 *   unmonitored symbol sits in a grey button.
 * - **Variant:** `flat` frames the symbol, `regular` puts it in a button of its shape.
 * - Badges, alert frame, progress and readout placement come from the shared
 *   automation button base.
 *
 * ## Usage Guidelines
 *
 * Use for the symbols of the report that belong to neither network. Facilities of the
 * drinking water and wastewater networks are `norvar-water-station` and
 * `norvar-wastewater-station`.
 *
 * @property symbolType - What the symbol shows: `culvert-with-grate`, `culvert`, `precipitation-station`, `watercourse-metering-station` or `discharge`.
 * @property state - The operating state: `ready` (black), `running` (green) or `unmonitored` (grey). `alert` draws the alarm state in red.
 * @property variant - `flat` draws the framed symbol, `regular` adds a square or round button.
 * @ignition-base-height: 82px
 * @ignition-base-width: 66px
 * @ignition-center
 * @experimental
 */
@customElement('norvar-map-symbol')
export class ObcNorvarMapSymbol extends ObcNorvarStationBase {
  @property({type: String}) symbolType: NorvarMapSymbolType =
    NorvarMapSymbolType.culvertWithGrate;
  @property({type: String}) variant: NorvarMapSymbolVariant =
    NorvarMapSymbolVariant.flat;

  override get _variant(): AutomationButtonVariant {
    if (this.variant === NorvarMapSymbolVariant.flat) {
      return AutomationButtonVariant.flat;
    }
    return this.stationArt.round
      ? AutomationButtonVariant.regular
      : AutomationButtonVariant.square;
  }

  protected override get equipmentName(): string {
    return 'NORVAR map symbol';
  }

  /** The symbols carry no medium, so static draws them grey. */
  protected override get staticColor(): string {
    return NORVAR_UNMONITORED_COLOR;
  }

  protected override get stationArt() {
    return MAP_SYMBOL_ART[this.symbolType];
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'norvar-map-symbol': ObcNorvarMapSymbol;
  }
}
