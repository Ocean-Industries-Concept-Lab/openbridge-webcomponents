import {customElement} from '../decorator.js';
import {ObiTwowayActuatorPistonClosedLeft} from './icon-twoway-actuator-piston-closed-left.js';

/**
 * `<obi-twoway-acuator-piston-closed-left>` is the name this icon had before it was renamed to
 * `<obi-twoway-actuator-piston-closed-left>`, kept so markup from an earlier release keeps working.
 * It draws what `<obi-twoway-actuator-piston-closed-left>` draws.
 *
 * @deprecated Use `obi-twoway-actuator-piston-closed-left`.
 */
@customElement('obi-twoway-acuator-piston-closed-left')
export class ObiTwowayAcuatorPistonClosedLeft extends ObiTwowayActuatorPistonClosedLeft {}

declare global {
  interface HTMLElementTagNameMap {
    'obi-twoway-acuator-piston-closed-left': ObiTwowayAcuatorPistonClosedLeft;
  }
}
