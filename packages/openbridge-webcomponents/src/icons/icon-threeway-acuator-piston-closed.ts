import {customElement} from '../decorator.js';
import {ObiThreewayActuatorPistonClosed} from './icon-threeway-actuator-piston-closed.js';

/**
 * `<obi-threeway-acuator-piston-closed>` is the name this icon had before it was renamed to
 * `<obi-threeway-actuator-piston-closed>`, kept so markup from an earlier release keeps working.
 * It draws what `<obi-threeway-actuator-piston-closed>` draws.
 *
 * @deprecated Use `obi-threeway-actuator-piston-closed`.
 */
@customElement('obi-threeway-acuator-piston-closed')
export class ObiThreewayAcuatorPistonClosed extends ObiThreewayActuatorPistonClosed {}

declare global {
  interface HTMLElementTagNameMap {
    'obi-threeway-acuator-piston-closed': ObiThreewayAcuatorPistonClosed;
  }
}
