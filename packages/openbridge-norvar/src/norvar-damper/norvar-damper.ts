import {property} from 'lit/decorators.js';
import {customElement} from '@oicl/openbridge-webcomponents/dist/decorator.js';
import {AutomationButtonReadoutStack} from '@oicl/openbridge-webcomponents/dist/components/automation-button-readout-stack/automation-button-readout-stack.js';
import {NorvarStationState} from '../norvar-station-shared/norvar-station-art.js';
import {
  DAMPER_ART,
  NorvarDamperPosition,
} from '../norvar-hvac-shared/norvar-hvac-art.js';
import {
  NorvarSymbolVariant,
  ObcNorvarSymbolBase,
} from '../norvar-hvac-shared/norvar-hvac-shared.js';

export {NorvarDamperPosition, NorvarStationState, NorvarSymbolVariant};

/**
 * `<norvar-damper>` – an air damper (spjeld) drawn with the symbols of NORVAR report 153/2007,
 * for process diagrams.
 *
 * **Not part of the OpenBridge standard. Based on NORVAR report 153/2007 from
 * Norsk Vann BA.** That is why the tag has no `obc-` prefix.
 *
 * ## Features
 *
 * - **Position:** `open` stands the blade along the duct, closed lays it across.
 *   While `progress` is set the blade stands at an angle, as on the regulating damper.
 * - **Regulating:** `regulating` draws the regulating damper, whose blade always
 *   stands at an angle. It has no open or closed readout.
 * - **State:** `state` and `alert` colour the symbol, as on the NORVAR stations.
 * - **Variant:** `flat` frames the symbol, `regular` puts it in a square button.
 * - Badges, alert frame, progress and readout placement come from the shared
 *   automation button base.
 *
 * ## Usage Guidelines
 *
 * Use where a diagram has to follow the symbols of the report. A fire damper is
 * `norvar-fire-damper`. Everywhere else use the OpenBridge `obc-damper`.
 *
 * @property open - Whether the damper is open.
 * @property regulating - Draws the regulating damper instead of an on/off damper.
 * @property state - The operating state: `ready` (black), `running` (green) or `unmonitored` (grey). `alert` draws the alarm state in red.
 * @property variant - `flat` draws the framed symbol, `regular` adds the square button.
 * @availableWhen open regulating==false
 * @ignition-base-height: 82px
 * @ignition-base-width: 66px
 * @ignition-center
 * @experimental
 */
@customElement('norvar-damper')
export class ObcNorvarDamper extends ObcNorvarSymbolBase {
  @property({type: Boolean}) open: boolean = false;
  @property({type: Boolean}) regulating: boolean = false;

  private get position(): NorvarDamperPosition {
    if (this.regulating || this.progress) {
      return NorvarDamperPosition.regulating;
    }
    return this.open ? NorvarDamperPosition.open : NorvarDamperPosition.closed;
  }

  override get extraReadouts(): AutomationButtonReadoutStack[] {
    if (!this.showStatus || this.regulating) {
      return [];
    }
    return this.open
      ? [{type: 'state-on', value: 'Open', hasIcon: this.showStatusIcon}]
      : [{type: 'state-off', value: 'Closed', hasIcon: this.showStatusIcon}];
  }

  protected override get equipmentName(): string {
    return 'NORVAR damper';
  }

  protected override get stationArt() {
    return DAMPER_ART[this.position];
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'norvar-damper': ObcNorvarDamper;
  }
}
