import {customElement} from '../decorator.js';
import {ObiTwowayActuatorPiston75} from './icon-twoway-actuator-piston-75.js';

/**
 * `<obi-twoway-acuator-piston-75>` is the name this icon had before it was renamed to
 * `<obi-twoway-actuator-piston-75>`, kept so markup from an earlier release keeps working.
 * It draws what `<obi-twoway-actuator-piston-75>` draws.
 *
 * @deprecated Use `obi-twoway-actuator-piston-75`.
 */
@customElement('obi-twoway-acuator-piston-75')
export class ObiTwowayAcuatorPiston75 extends ObiTwowayActuatorPiston75 {}

declare global {
  interface HTMLElementTagNameMap {
    'obi-twoway-acuator-piston-75': ObiTwowayAcuatorPiston75;
  }
}
