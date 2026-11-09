import {customElement} from '../decorator.js';
import {ObiThreewayActuatorPistonInleftLeft100} from './icon-threeway-actuator-piston-inleft-left-100.js';

/**
 * `<obi-threeway-acuator-piston-inleft-left-100>` is the name this icon had before it was renamed to
 * `<obi-threeway-actuator-piston-inleft-left-100>`, kept so markup from an earlier release keeps working.
 * It draws what `<obi-threeway-actuator-piston-inleft-left-100>` draws.
 *
 * @deprecated Use `obi-threeway-actuator-piston-inleft-left-100`.
 */
@customElement('obi-threeway-acuator-piston-inleft-left-100')
export class ObiThreewayAcuatorPistonInleftLeft100 extends ObiThreewayActuatorPistonInleftLeft100 {}

declare global {
  interface HTMLElementTagNameMap {
    'obi-threeway-acuator-piston-inleft-left-100': ObiThreewayAcuatorPistonInleftLeft100;
  }
}
