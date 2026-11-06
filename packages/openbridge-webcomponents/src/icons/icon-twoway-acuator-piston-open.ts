import {customElement} from '../decorator.js';
import {ObiTwowayActuatorPistonOpen} from './icon-twoway-actuator-piston-open.js';

/**
 * `<obi-twoway-acuator-piston-open>` is the name this icon had before it was renamed to
 * `<obi-twoway-actuator-piston-open>`, kept so markup from an earlier release keeps working.
 * It draws what `<obi-twoway-actuator-piston-open>` draws.
 *
 * @deprecated Use `obi-twoway-actuator-piston-open`.
 */
@customElement('obi-twoway-acuator-piston-open')
export class ObiTwowayAcuatorPistonOpen extends ObiTwowayActuatorPistonOpen {}

declare global {
  interface HTMLElementTagNameMap {
    'obi-twoway-acuator-piston-open': ObiTwowayAcuatorPistonOpen;
  }
}
