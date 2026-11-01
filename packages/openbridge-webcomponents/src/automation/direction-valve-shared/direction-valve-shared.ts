import {property} from 'lit/decorators.js';
import {ObcAbstractAutomationButton} from '../automation-button/abstract-automation-button.js';
import {AutomationButtonReadoutStack} from '../../components/automation-button-readout-stack/automation-button-readout-stack.js';
import {
  AutomationButtonHandlePosition,
  AutomationButtonHandleSize,
  AutomationButtonOrientation,
  AutomationButtonSelfActuationLine,
} from '../automation-button/automation-button.js';
import {
  digitalValveIcon,
  digitalValveReadouts,
} from '../digital-valve/digital-valve.js';
import {Direction} from '../../types.js';
import {ObcValveHandle} from '../automation-button/valve-handle.js';

export enum DirectionValveVariant {
  regular = 'regular',
  flat = 'flat',
}

/**
 * Shared base of the two-way valves laid on a pipe by flow direction:
 * `obc-pressure-reduction-valve`, `obc-pressure-sustain-valve` and
 * `obc-non-return-valve`.
 *
 * The symbol turns with `flowDirection`. The readout defaults to below the
 * valve on a horizontal pipe and to its left on a vertical one.
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

  protected override get _isVertical(): boolean {
    return (
      this.flowDirection === Direction.Up ||
      this.flowDirection === Direction.Down
    );
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
    return digitalValveReadouts(true, false, false);
  }

  override get icon() {
    return digitalValveIcon(true, this.static);
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
 * @property handleSize - Size of the handle: `small` draws it from the symbol's centre, for symbols without a button around them.
 */
export class ObcPressureValveBase extends ObcDirectionValveBase {
  @property({type: Boolean}) invertHandlePosition: boolean = false;
  @property({type: String}) handleSize: AutomationButtonHandleSize =
    AutomationButtonHandleSize.regular;

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

  override get _handleSize(): AutomationButtonHandleSize {
    return this.handleSize;
  }

  override get _handle() {
    return this.renderValveHandle(ObcValveHandle.pneumatic);
  }
}
