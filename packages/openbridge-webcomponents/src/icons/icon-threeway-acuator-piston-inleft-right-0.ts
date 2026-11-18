import {customElement} from '../decorator.js';
import {ObiThreewayActuatorPistonInleftRight0} from './icon-threeway-actuator-piston-inleft-right-0.js';

/**
 * `<obi-threeway-acuator-piston-inleft-right-0>` is the name this icon had before it was renamed to
 * `<obi-threeway-actuator-piston-inleft-right-0>`, kept so markup from an earlier release keeps working.
 * It draws what `<obi-threeway-actuator-piston-inleft-right-0>` draws.
 *
 * @deprecated Use `obi-threeway-actuator-piston-inleft-right-0`.
 */
@customElement('obi-threeway-acuator-piston-inleft-right-0')
export class ObiThreewayAcuatorPistonInleftRight0 extends ObiThreewayActuatorPistonInleftRight0 {}

declare global {
  interface HTMLElementTagNameMap {
    'obi-threeway-acuator-piston-inleft-right-0': ObiThreewayAcuatorPistonInleftRight0;
  }
}
