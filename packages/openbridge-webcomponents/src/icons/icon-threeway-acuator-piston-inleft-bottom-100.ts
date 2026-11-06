import {customElement} from '../decorator.js';
import {ObiThreewayActuatorPistonInleftBottom100} from './icon-threeway-actuator-piston-inleft-bottom-100.js';

/**
 * `<obi-threeway-acuator-piston-inleft-bottom-100>` is the name this icon had before it was renamed to
 * `<obi-threeway-actuator-piston-inleft-bottom-100>`, kept so markup from an earlier release keeps working.
 * It draws what `<obi-threeway-actuator-piston-inleft-bottom-100>` draws.
 *
 * @deprecated Use `obi-threeway-actuator-piston-inleft-bottom-100`.
 */
@customElement('obi-threeway-acuator-piston-inleft-bottom-100')
export class ObiThreewayAcuatorPistonInleftBottom100 extends ObiThreewayActuatorPistonInleftBottom100 {}

declare global {
  interface HTMLElementTagNameMap {
    'obi-threeway-acuator-piston-inleft-bottom-100': ObiThreewayAcuatorPistonInleftBottom100;
  }
}
