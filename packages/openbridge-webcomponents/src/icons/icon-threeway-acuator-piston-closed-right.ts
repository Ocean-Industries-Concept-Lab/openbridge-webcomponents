import {customElement} from '../decorator.js';
import {ObiThreewayActuatorPistonClosedRight} from './icon-threeway-actuator-piston-closed-right.js';

/**
 * `<obi-threeway-acuator-piston-closed-right>` is the name this icon had before it was renamed to
 * `<obi-threeway-actuator-piston-closed-right>`, kept so markup from an earlier release keeps working.
 * It draws what `<obi-threeway-actuator-piston-closed-right>` draws.
 *
 * @deprecated Use `obi-threeway-actuator-piston-closed-right`.
 */
@customElement('obi-threeway-acuator-piston-closed-right')
export class ObiThreewayAcuatorPistonClosedRight extends ObiThreewayActuatorPistonClosedRight {}

declare global {
  interface HTMLElementTagNameMap {
    'obi-threeway-acuator-piston-closed-right': ObiThreewayAcuatorPistonClosedRight;
  }
}
