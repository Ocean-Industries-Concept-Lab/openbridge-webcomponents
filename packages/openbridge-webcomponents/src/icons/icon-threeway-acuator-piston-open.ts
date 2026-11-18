import {customElement} from '../decorator.js';
import {ObiThreewayActuatorPistonOpen} from './icon-threeway-actuator-piston-open.js';

/**
 * `<obi-threeway-acuator-piston-open>` is the name this icon had before it was renamed to
 * `<obi-threeway-actuator-piston-open>`, kept so markup from an earlier release keeps working.
 * It draws what `<obi-threeway-actuator-piston-open>` draws.
 *
 * @deprecated Use `obi-threeway-actuator-piston-open`.
 */
@customElement('obi-threeway-acuator-piston-open')
export class ObiThreewayAcuatorPistonOpen extends ObiThreewayActuatorPistonOpen {}

declare global {
  interface HTMLElementTagNameMap {
    'obi-threeway-acuator-piston-open': ObiThreewayAcuatorPistonOpen;
  }
}
