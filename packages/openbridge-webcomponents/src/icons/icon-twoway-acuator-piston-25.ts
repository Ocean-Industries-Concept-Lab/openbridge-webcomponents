import {customElement} from '../decorator.js';
import {ObiTwowayActuatorPiston25} from './icon-twoway-actuator-piston-25.js';

/**
 * `<obi-twoway-acuator-piston-25>` is the name this icon had before it was renamed to
 * `<obi-twoway-actuator-piston-25>`, kept so markup from an earlier release keeps working.
 * It draws what `<obi-twoway-actuator-piston-25>` draws.
 *
 * @deprecated Use `obi-twoway-actuator-piston-25`.
 */
@customElement('obi-twoway-acuator-piston-25')
export class ObiTwowayAcuatorPiston25 extends ObiTwowayActuatorPiston25 {}

declare global {
  interface HTMLElementTagNameMap {
    'obi-twoway-acuator-piston-25': ObiTwowayAcuatorPiston25;
  }
}
