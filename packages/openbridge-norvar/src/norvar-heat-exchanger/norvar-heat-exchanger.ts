import {property} from 'lit/decorators.js';
import {customElement} from '@oicl/openbridge-webcomponents/dist/decorator.js';
import {NorvarStationState} from '../norvar-station-shared/norvar-station-art.js';
import {
  HEAT_EXCHANGER_ART,
  NorvarHeatExchangerType,
} from '../norvar-hvac-shared/norvar-hvac-art.js';
import {
  NorvarSymbolVariant,
  ObcNorvarSymbolBase,
} from '../norvar-hvac-shared/norvar-hvac-shared.js';

export {NorvarStationState, NorvarSymbolVariant, NorvarHeatExchangerType};

/**
 * `<norvar-heat-exchanger>` – a heat exchanger (varmeveksler) drawn with the symbols of NORVAR report 153/2007, for process diagrams.
 *
 * **Not part of the OpenBridge standard. Based on NORVAR report 153/2007 from
 * Norsk Vann BA.** That is why the tag has no `obc-` prefix.
 *
 * ## Features
 *
 * - **Type:** `heatExchangerType` picks the drawing.
 * - **State:** `state` and `alert` colour the symbol, as on the NORVAR stations. An
 *   unmonitored symbol sits in a grey button.
 * - **Variant:** `flat` frames the symbol, `regular` puts it in a square button.
 * - Badges, alert frame, progress and readout placement come from the shared
 *   automation button base.
 *
 * ## Usage Guidelines
 *
 * Use where a diagram has to follow the symbols of the report. Everywhere else
 * use the OpenBridge `obc-heat-exchanger`.
 *
 * @property heatExchangerType - Which of the two drawings of the design file: `a` or `b`.
 * @property state - The operating state: `ready` (black), `running` (green) or `unmonitored` (grey). `alert` draws the alarm state in red.
 * @property variant - `flat` draws the framed symbol, `regular` adds the square button.
 * @ignition-base-height: 82px
 * @ignition-base-width: 66px
 * @ignition-center
 * @experimental
 */
@customElement('norvar-heat-exchanger')
export class ObcNorvarHeatExchanger extends ObcNorvarSymbolBase {
  @property({type: String}) heatExchangerType: NorvarHeatExchangerType =
    NorvarHeatExchangerType.a;

  protected override get equipmentName(): string {
    return 'NORVAR heat exchanger';
  }

  protected override get stationArt() {
    return HEAT_EXCHANGER_ART[this.heatExchangerType];
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'norvar-heat-exchanger': ObcNorvarHeatExchanger;
  }
}
