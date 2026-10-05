/**
 * Shared vocabulary of the three-way valves: `obc-digital-threeway-valve`,
 * `obc-analog-threeway-valve` and `obc-valve-analog-three-way-icon`.
 *
 * ## Ports
 *
 * A three-way valve has three ports and one side without a port. The ports
 * are numbered from the side without a port, in the order left, stem, right
 * as seen with the stem pointing down: with `orientation` `bottom`, port 1 is
 * the left port, port 2 the bottom port (the stem) and port 3 the right port.
 * The numbering turns with the symbol, so port 2 is always the stem.
 *
 * ## Flow readouts
 *
 * Flow through a three-way valve can go several ways at once, so the readout
 * is a list: one row per flow, each with an optional arrow direction and
 * either a value with a unit (`%` when left out) or a state (`Open` /
 * `Closed`).
 *
 * @module
 */
import {AutomationButtonLabelDirection} from '../automation-button/automation-button.js';
import {AutomationButtonReadoutStack} from '../../components/automation-button-readout-stack/automation-button-readout-stack.js';

/**
 * The side the stem (port 2) points to. `bottom` and `top` lay the valve on a
 * horizontal pipe, `left` and `right` on a vertical one.
 */
export enum ThreewayValveOrientation {
  bottom = 'bottom',
  left = 'left',
  top = 'top',
  right = 'right',
}

/** Clockwise rotation from the `bottom` drawing, in degrees. */
export function threewayValveRotation(
  orientation: ThreewayValveOrientation
): number {
  switch (orientation) {
    case ThreewayValveOrientation.left:
      return 90;
    case ThreewayValveOrientation.top:
      return 180;
    case ThreewayValveOrientation.right:
      return 270;
    default:
      return 0;
  }
}

/** A flow readout row with a value: `→ 060 %`. */
export interface ThreewayValveValueFlow {
  /** Arrow direction on screen; left out or `none` hides the arrow. */
  direction?: AutomationButtonLabelDirection;
  value: number;
  /** Defaults to `%`. */
  unit?: string;
}

/** A flow readout row with a state: `→ Open`, `→ Closed`, or the on/off icon without a direction. */
export interface ThreewayValveStateFlow {
  /**
   * Arrow direction on screen; left out or `none` shows the on or off icon
   * instead.
   */
  direction?: AutomationButtonLabelDirection;
  open: boolean;
}

/** One row of the flow readout. */
export type ThreewayValveFlow = ThreewayValveValueFlow | ThreewayValveStateFlow;

/**
 * The readout rows of a three-way valve: `Closed` while no flow can pass,
 * the flow rows while it can, and `Open` when the application gives no flows.
 */
export function threewayValveReadouts(
  passing: boolean,
  flows: ThreewayValveFlow[]
): AutomationButtonReadoutStack[] {
  if (!passing) {
    return [{type: 'state-off', value: 'Closed', hasIcon: true}];
  }
  if (flows.length === 0) {
    return [{type: 'state-on', value: 'Open', hasIcon: true}];
  }
  return flows.map((flow): AutomationButtonReadoutStack => {
    if ('open' in flow) {
      return {
        type: flow.open ? 'state-on' : 'state-off',
        value: flow.open ? 'Open' : 'Closed',
        hasIcon:
          flow.direction === undefined ||
          flow.direction === AutomationButtonLabelDirection.none,
        direction: flow.direction,
      };
    }
    const direction = flow.direction ?? AutomationButtonLabelDirection.none;
    return {
      type: 'value',
      value: flow.value,
      nDigits: 3,
      unit: flow.unit ?? '%',
      direction,
      icon:
        direction === AutomationButtonLabelDirection.none ? 'none' : 'arrow',
    };
  });
}
