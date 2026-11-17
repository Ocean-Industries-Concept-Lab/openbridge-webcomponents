import {customElement} from '../decorator.js';
import {ObiThreewayActuatorPistonInleftRight25} from './icon-threeway-actuator-piston-inleft-right-25.js';

/**
 * `<obi-threeway-acuator-piston-inleft-right-25>` is the name this icon had before it was renamed to
 * `<obi-threeway-actuator-piston-inleft-right-25>`, kept so markup from an earlier release keeps working.
 * It draws what `<obi-threeway-actuator-piston-inleft-right-25>` draws.
 *
 * @deprecated Use `obi-threeway-actuator-piston-inleft-right-25`.
 */
@customElement('obi-threeway-acuator-piston-inleft-right-25')
export class ObiThreewayAcuatorPistonInleftRight25 extends ObiThreewayActuatorPistonInleftRight25 {}

declare global {
  interface HTMLElementTagNameMap {
    'obi-threeway-acuator-piston-inleft-right-25': ObiThreewayAcuatorPistonInleftRight25;
  }
}
