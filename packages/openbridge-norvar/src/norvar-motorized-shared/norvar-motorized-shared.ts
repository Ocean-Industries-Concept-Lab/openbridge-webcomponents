import {property} from 'lit/decorators.js';
import {
  MotorizedVariant,
  ObcAbstractAutomationButtonMotorized,
} from '@oicl/openbridge-webcomponents/dist/automation/automation-button/abstract-automation-button-motorized.js';
import {AutomationButtonVariant} from '@oicl/openbridge-webcomponents/dist/automation/automation-button/automation-button.js';
import {AutomationButtonReadoutStack} from '@oicl/openbridge-webcomponents/dist/components/automation-button-readout-stack/automation-button-readout-stack.js';
import {
  NorvarAvailability,
  NorvarMotorizedArt,
  norvarMotorizedIcon,
} from './norvar-motorized-art.js';

export {MotorizedVariant, NorvarAvailability};

/**
 * Shared base of `norvar-pump`, `norvar-motor` and `norvar-fan`.
 *
 * Not part of the OpenBridge standard. Based on NORVAR report 153/2007 from
 * Norsk Vann BA.
 *
 * `turnedOn`, the speed readout and the `Off` row come from the core's
 * motorized button. Colours, in order of precedence: `static` greys the
 * symbol, `alert` draws it red in the shape of its running state, an
 * unavailable device is grey and stands still, and otherwise a running
 * device is green and a stopped one sits on a dark disc. Only an available,
 * running device, or one in alarm while running, gets the white button.
 *
 * ## Usage Guidelines
 *
 * Not registered as a custom element. A subclass names its drawing through
 * `motorizedArt` and its accessible name through `equipmentName`.
 *
 * @property availability - `available`, `disabled` (avstilt) or `safety-off` (the safety switch is off, or the device is not ready).
 * @property variant - `flat` draws the symbol on a disc, `regular` puts it in a round button.
 */
export class ObcNorvarMotorizedBase extends ObcAbstractAutomationButtonMotorized {
  @property({type: String}) override variant: MotorizedVariant =
    MotorizedVariant.flat;
  @property({type: String}) availability: NorvarAvailability =
    NorvarAvailability.available;

  private get available(): boolean {
    return this.availability === NorvarAvailability.available;
  }

  override get _on(): boolean {
    return this.turnedOn && (this.alert || this.available);
  }

  override get _variant(): AutomationButtonVariant {
    return this.variant === MotorizedVariant.flat
      ? AutomationButtonVariant.flat
      : AutomationButtonVariant.regular;
  }

  override get extraReadouts(): AutomationButtonReadoutStack[] {
    if (!this.showStatus || this.available || this.alert) {
      return super.extraReadouts;
    }
    return [
      {
        type: 'state-off',
        value:
          this.availability === NorvarAvailability.safetyOff
            ? 'Not ready'
            : 'Disabled',
        hasIcon: this.showStatusIcon,
      },
    ];
  }

  /** Name of the device for assistive technology while no tag is visible. */
  protected get equipmentName(): string {
    throw new Error('"equipmentName" must be implemented in the subclass');
  }

  protected get motorizedArt(): NorvarMotorizedArt {
    throw new Error('"motorizedArt" must be implemented in the subclass');
  }

  override get _accessibleName(): string | null {
    return this.showReadoutStack && this.tag ? null : this.equipmentName;
  }

  override get icon() {
    return norvarMotorizedIcon(
      this.motorizedArt,
      this._variant === AutomationButtonVariant.flat,
      {
        running: this.turnedOn,
        availability: this.availability,
        alarm: this.alert,
        isStatic: this.static,
      }
    );
  }
}
