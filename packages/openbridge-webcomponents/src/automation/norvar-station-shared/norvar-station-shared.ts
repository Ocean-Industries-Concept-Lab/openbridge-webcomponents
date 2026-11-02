import {property} from 'lit/decorators.js';
import {ObcAbstractAutomationButton} from '../automation-button/abstract-automation-button.js';
import {AutomationButtonVariant} from '../automation-button/automation-button.js';
import {ON_PAINT, Paint} from '../norvar-valve/norvar-valve-art.js';
import {
  NORVAR_ALARM_COLOR,
  NORVAR_RUNNING_COLOR,
  NORVAR_UNMONITORED_COLOR,
  NorvarStationArt,
  NorvarStationState,
  norvarStationIcon,
  norvarStationPaint,
} from './norvar-station-art.js';

/**
 * Shared base of `norvar-water-station` and `norvar-wastewater-station`.
 *
 * Not part of the OpenBridge standard. Based on NORVAR report 153/2007 from
 * Norsk Vann BA.
 *
 * The state colours the whole symbol. `static` wins over `alert`, which wins
 * over `state`. The button keeps its on colours and adds no state row.
 *
 * ## Usage Guidelines
 *
 * Not registered as a custom element. A subclass names its drawing through
 * `stationArt`, its static colour through `staticColor` and its button shape
 * through `variant`.
 *
 * @property state - The operating state: `ready`, `running` or `unmonitored`.
 */
export class ObcNorvarStationBase extends ObcAbstractAutomationButton {
  @property({type: String}) state: NorvarStationState =
    NorvarStationState.ready;

  override get _on(): boolean {
    return true;
  }

  /** Name of the station for assistive technology while no tag is visible. */
  protected get equipmentName(): string {
    throw new Error('"equipmentName" must be implemented in the subclass');
  }

  protected get stationArt(): NorvarStationArt {
    throw new Error('"stationArt" must be implemented in the subclass');
  }

  /** The colour of the medium a static symbol shows. */
  protected get staticColor(): string {
    throw new Error('"staticColor" must be implemented in the subclass');
  }

  private get paint(): Paint {
    if (this.static) {
      return norvarStationPaint(this.staticColor);
    }
    if (this.alert) {
      return norvarStationPaint(NORVAR_ALARM_COLOR);
    }
    switch (this.state) {
      case NorvarStationState.running:
        return norvarStationPaint(NORVAR_RUNNING_COLOR);
      case NorvarStationState.unmonitored:
        return norvarStationPaint(NORVAR_UNMONITORED_COLOR);
      default:
        return ON_PAINT;
    }
  }

  override get _accessibleName(): string | null {
    return this.showReadoutStack && this.tag ? null : this.equipmentName;
  }

  override get icon() {
    return norvarStationIcon(
      this.stationArt,
      this._variant === AutomationButtonVariant.flat,
      this.paint
    );
  }
}
