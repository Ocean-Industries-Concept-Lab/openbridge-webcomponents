import {html} from 'lit';
import {property} from 'lit/decorators.js';
import {ObcAbstractAutomationButton} from '../automation-button/abstract-automation-button.js';
import {AutomationButtonReadoutStack} from '../../components/automation-button-readout-stack/automation-button-readout-stack.js';
import {
  AutomationButtonHandlePosition,
  AutomationButtonOrientation,
  AutomationButtonReadoutPosition,
  AutomationButtonSelfActuationLine,
} from '../automation-button/automation-button.js';
import {
  digitalValveIcon,
  digitalValveReadouts,
} from '../digital-valve/digital-valve.js';
import {Direction} from '../../types.js';

export enum DirectionValveVariant {
  regular = 'regular',
  flat = 'flat',
}

/**
 * Shared base of the two-way valves laid on a pipe by flow direction:
 * `obc-pressure-reduction-valve`, `obc-pressure-sustain-valve` and
 * `obc-non-return-valve`.
 *
 * The symbol turns with `flowDirection`, and the readout defaults to the side
 * opposite the handle.
 *
 * ## Usage Guidelines
 *
 * Not registered as a custom element. `ObcPressureValveBase` adds the
 * actuator and the self-actuation line.
 *
 * @property flowDirection - The direction the medium flows through the valve; the symbol turns with it.
 * @property variant - `regular` draws the round button, `flat` only the symbol.
 */
export class ObcDirectionValveBase extends ObcAbstractAutomationButton {
  @property({type: String}) flowDirection: Direction = Direction.Right;
  @property({type: String}) variant: DirectionValveVariant =
    DirectionValveVariant.regular;

  override get _on(): boolean {
    return true;
  }

  override get _readoutPosition(): AutomationButtonReadoutPosition {
    if (this.readoutPosition !== undefined) {
      return this.readoutPosition;
    }
    switch (this._handlePosition) {
      case AutomationButtonHandlePosition.top:
        return AutomationButtonReadoutPosition.bottom;
      case AutomationButtonHandlePosition.right:
        return AutomationButtonReadoutPosition.left;
      case AutomationButtonHandlePosition.bottom:
        return AutomationButtonReadoutPosition.top;
      case AutomationButtonHandlePosition.left:
        return AutomationButtonReadoutPosition.right;
      default:
        return AutomationButtonReadoutPosition.bottom;
    }
  }

  override get _orientation(): AutomationButtonOrientation {
    switch (this.flowDirection) {
      case Direction.Up:
        return AutomationButtonOrientation.verticalLeft;
      case Direction.Down:
        return AutomationButtonOrientation.verticalRight;
      default:
        return AutomationButtonOrientation.horizontal;
    }
  }

  override get extraReadouts(): AutomationButtonReadoutStack[] {
    return digitalValveReadouts(true, false);
  }

  override get icon() {
    return digitalValveIcon(true);
  }
}

/**
 * Shared base of `obc-pressure-reduction-valve` and
 * `obc-pressure-sustain-valve`.
 *
 * Adds a diaphragm actuator and the self-actuation line that feeds it pipe
 * pressure. With flow to the right the actuator sits on top, and each quarter
 * turn of the flow turns the actuator and the line with it;
 * `invertHandlePosition` puts the actuator on the other side of the pipe.
 *
 * ## Usage Guidelines
 *
 * Not registered as a custom element. A subclass says which side of the valve
 * the line senses through `sensesDownstream`.
 *
 * @property invertHandlePosition - Puts the actuator on the opposite side of the pipe.
 */
export class ObcPressureValveBase extends ObcDirectionValveBase {
  @property({type: Boolean}) invertHandlePosition: boolean = false;

  /** True when the line senses the outlet, false when it senses the inlet. */
  protected get sensesDownstream(): boolean {
    return true;
  }

  override get _handlePosition(): AutomationButtonHandlePosition {
    if (this.invertHandlePosition) {
      switch (this.flowDirection) {
        case Direction.Up:
          return AutomationButtonHandlePosition.right;
        case Direction.Down:
          return AutomationButtonHandlePosition.left;
        case Direction.Left:
          return AutomationButtonHandlePosition.top;
        default:
          return AutomationButtonHandlePosition.bottom;
      }
    }
    switch (this.flowDirection) {
      case Direction.Up:
        return AutomationButtonHandlePosition.left;
      case Direction.Down:
        return AutomationButtonHandlePosition.right;
      case Direction.Left:
        return AutomationButtonHandlePosition.bottom;
      default:
        return AutomationButtonHandlePosition.top;
    }
  }

  override get _selfActuationLine(): AutomationButtonSelfActuationLine {
    const downstream = {
      [Direction.Up]: AutomationButtonSelfActuationLine.top,
      [Direction.Down]: AutomationButtonSelfActuationLine.bottom,
      [Direction.Left]: AutomationButtonSelfActuationLine.left,
      [Direction.Right]: AutomationButtonSelfActuationLine.right,
    };
    const upstream = {
      [Direction.Up]: AutomationButtonSelfActuationLine.bottom,
      [Direction.Down]: AutomationButtonSelfActuationLine.top,
      [Direction.Left]: AutomationButtonSelfActuationLine.right,
      [Direction.Right]: AutomationButtonSelfActuationLine.left,
    };
    return (this.sensesDownstream ? downstream : upstream)[this.flowDirection];
  }

  override get _handle() {
    return html`<svg
      slot="handle"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <path
          id="actuator"
          d="M21 12C21.5523 12 22.0052 11.5512 21.95 11.0017C21.8526 10.0309 21.6135 9.07783 21.2388 8.17317C20.7362 6.95991 19.9997 5.85752 19.0711 4.92893C18.1425 4.00035 17.0401 3.26375 15.8268 2.7612C14.6136 2.25866 13.3132 2 12 2C10.6868 2 9.38642 2.25866 8.17317 2.7612C6.95991 3.26375 5.85752 4.00035 4.92893 4.92893C4.00035 5.85752 3.26375 6.95991 2.7612 8.17317C2.38648 9.07783 2.14736 10.0309 2.04996 11.0017C1.99482 11.5512 2.44772 12 3 12L12 12H21Z"
        />
        <mask id="actuator-inside" fill="white">
          <use href="#actuator" />
        </mask>
      </defs>
      <path
        d="M12 24L12 12"
        stroke="var(--element-neutral-color)"
        vector-effect="non-scaling-stroke"
      />
      <use
        href="#actuator"
        fill="var(--automation-symbol-on-background-color)"
      />
      <use
        href="#actuator"
        stroke-width="2"
        stroke="var(--element-active-color)"
        mask="url(#actuator-inside)"
        vector-effect="non-scaling-stroke"
      />
    </svg>`;
  }
}
