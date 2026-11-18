import {customElement} from '../decorator.js';
import {ObiTwowayActuatorPistonClosedRight} from './icon-twoway-actuator-piston-closed-right.js';

/**
 * `<obi-twoway-acuator-piston-closed-right>` is the name this icon had before it was renamed to
 * `<obi-twoway-actuator-piston-closed-right>`, kept so markup from an earlier release keeps working.
 * It draws what `<obi-twoway-actuator-piston-closed-right>` draws.
 *
 * @deprecated Use `obi-twoway-actuator-piston-closed-right`.
 */
@customElement('obi-twoway-acuator-piston-closed-right')
export class ObiTwowayAcuatorPistonClosedRight extends ObiTwowayActuatorPistonClosedRight {}

declare global {
  interface HTMLElementTagNameMap {
    'obi-twoway-acuator-piston-closed-right': ObiTwowayAcuatorPistonClosedRight;
  }
}
