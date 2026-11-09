import {customElement} from '../decorator.js';
import {ObiTwowayActuatorPiston10} from './icon-twoway-actuator-piston-10.js';

/**
 * `<obi-twoway-acuator-piston-10>` is the name this icon had before it was renamed to
 * `<obi-twoway-actuator-piston-10>`, kept so markup from an earlier release keeps working.
 * It draws what `<obi-twoway-actuator-piston-10>` draws.
 *
 * @deprecated Use `obi-twoway-actuator-piston-10`.
 */
@customElement('obi-twoway-acuator-piston-10')
export class ObiTwowayAcuatorPiston10 extends ObiTwowayActuatorPiston10 {}

declare global {
  interface HTMLElementTagNameMap {
    'obi-twoway-acuator-piston-10': ObiTwowayAcuatorPiston10;
  }
}
