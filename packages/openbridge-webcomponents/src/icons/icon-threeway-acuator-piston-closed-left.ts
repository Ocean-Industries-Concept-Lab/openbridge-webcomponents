import {customElement} from '../decorator.js';
import {ObiThreewayActuatorPistonClosedLeft} from './icon-threeway-actuator-piston-closed-left.js';

/**
 * `<obi-threeway-acuator-piston-closed-left>` is the name this icon had before it was renamed to
 * `<obi-threeway-actuator-piston-closed-left>`, kept so markup from an earlier release keeps working.
 * It draws what `<obi-threeway-actuator-piston-closed-left>` draws.
 *
 * @deprecated Use `obi-threeway-actuator-piston-closed-left`.
 */
@customElement('obi-threeway-acuator-piston-closed-left')
export class ObiThreewayAcuatorPistonClosedLeft extends ObiThreewayActuatorPistonClosedLeft {}

declare global {
  interface HTMLElementTagNameMap {
    'obi-threeway-acuator-piston-closed-left': ObiThreewayAcuatorPistonClosedLeft;
  }
}
