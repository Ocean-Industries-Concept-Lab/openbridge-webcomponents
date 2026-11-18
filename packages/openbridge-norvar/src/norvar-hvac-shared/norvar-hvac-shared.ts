import {property} from 'lit/decorators.js';
import {AutomationButtonVariant} from '@oicl/openbridge-webcomponents/dist/automation/automation-button/automation-button.js';
import {NORVAR_UNMONITORED_COLOR} from '../norvar-station-shared/norvar-station-art.js';
import {ObcNorvarStationBase} from '../norvar-station-shared/norvar-station-shared.js';

export enum NorvarSymbolVariant {
  regular = 'regular',
  flat = 'flat',
}

/**
 * Shared base of the HVAC and boiler symbols: `norvar-damper`,
 * `norvar-fire-damper`, `norvar-compressor`, `norvar-air-filter`,
 * `norvar-strainer`, `norvar-heating-coil`, `norvar-cooling-coil`,
 * `norvar-heat-exchanger` and `norvar-boiler`.
 *
 * Not part of the OpenBridge standard. Based on NORVAR report 153/2007 from
 * Norsk Vann BA.
 *
 * `state` and `alert` colour the symbol as on the NORVAR stations. The
 * symbols carry no medium, so `static` draws them grey.
 *
 * ## Usage Guidelines
 *
 * Not registered as a custom element. A subclass names its drawing through
 * `stationArt` and its accessible name through `equipmentName`, and overrides
 * `round` when its button is round instead of square.
 *
 * @property variant - `flat` draws the framed symbol, `regular` adds a square or round button.
 */
export class ObcNorvarSymbolBase extends ObcNorvarStationBase {
  @property({type: String}) variant: NorvarSymbolVariant =
    NorvarSymbolVariant.flat;

  /** Whether the button is round; the HVAC symbols are square apart from the compressor. */
  protected get round(): boolean {
    return false;
  }

  override get _variant(): AutomationButtonVariant {
    if (this.variant === NorvarSymbolVariant.flat) {
      return AutomationButtonVariant.flat;
    }
    return this.round
      ? AutomationButtonVariant.regular
      : AutomationButtonVariant.square;
  }

  protected override get staticColor(): string {
    return NORVAR_UNMONITORED_COLOR;
  }
}
