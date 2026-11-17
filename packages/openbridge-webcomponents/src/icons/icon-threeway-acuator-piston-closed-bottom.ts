import {customElement} from '../decorator.js';
import {ObiThreewayActuatorPistonClosedBottom} from './icon-threeway-actuator-piston-closed-bottom.js';

/**
 * `<obi-threeway-acuator-piston-closed-bottom>` is the name this icon had before it was renamed to
 * `<obi-threeway-actuator-piston-closed-bottom>`, kept so markup from an earlier release keeps working.
 * It draws what `<obi-threeway-actuator-piston-closed-bottom>` draws.
 *
 * @deprecated Use `obi-threeway-actuator-piston-closed-bottom`.
 */
@customElement('obi-threeway-acuator-piston-closed-bottom')
export class ObiThreewayAcuatorPistonClosedBottom extends ObiThreewayActuatorPistonClosedBottom {}

declare global {
  interface HTMLElementTagNameMap {
    'obi-threeway-acuator-piston-closed-bottom': ObiThreewayAcuatorPistonClosedBottom;
  }
}
