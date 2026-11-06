import {customElement} from '../decorator.js';
import {ObiTwowayActuatorPistonClosed} from './icon-twoway-actuator-piston-closed.js';

/**
 * `<obi-twoway-acuator-piston-closed>` is the name this icon had before it was renamed to
 * `<obi-twoway-actuator-piston-closed>`, kept so markup from an earlier release keeps working.
 * It draws what `<obi-twoway-actuator-piston-closed>` draws.
 *
 * @deprecated Use `obi-twoway-actuator-piston-closed`.
 */
@customElement('obi-twoway-acuator-piston-closed')
export class ObiTwowayAcuatorPistonClosed extends ObiTwowayActuatorPistonClosed {}

declare global {
  interface HTMLElementTagNameMap {
    'obi-twoway-acuator-piston-closed': ObiTwowayAcuatorPistonClosed;
  }
}
