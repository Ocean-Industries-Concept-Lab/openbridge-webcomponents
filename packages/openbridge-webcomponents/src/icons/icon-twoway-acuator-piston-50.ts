import {customElement} from '../decorator.js';
import {ObiTwowayActuatorPiston50} from './icon-twoway-actuator-piston-50.js';

/**
 * `<obi-twoway-acuator-piston-50>` is the name this icon had before it was renamed to
 * `<obi-twoway-actuator-piston-50>`, kept so markup from an earlier release keeps working.
 * It draws what `<obi-twoway-actuator-piston-50>` draws.
 *
 * @deprecated Use `obi-twoway-actuator-piston-50`.
 */
@customElement('obi-twoway-acuator-piston-50')
export class ObiTwowayAcuatorPiston50 extends ObiTwowayActuatorPiston50 {}

declare global {
  interface HTMLElementTagNameMap {
    'obi-twoway-acuator-piston-50': ObiTwowayAcuatorPiston50;
  }
}
