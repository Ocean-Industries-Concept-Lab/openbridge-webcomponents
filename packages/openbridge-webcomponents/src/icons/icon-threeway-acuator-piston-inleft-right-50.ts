import {customElement} from '../decorator.js';
import {ObiThreewayActuatorPistonInleftRight50} from './icon-threeway-actuator-piston-inleft-right-50.js';

/**
 * `<obi-threeway-acuator-piston-inleft-right-50>` is the name this icon had before it was renamed to
 * `<obi-threeway-actuator-piston-inleft-right-50>`, kept so markup from an earlier release keeps working.
 * It draws what `<obi-threeway-actuator-piston-inleft-right-50>` draws.
 *
 * @deprecated Use `obi-threeway-actuator-piston-inleft-right-50`.
 */
@customElement('obi-threeway-acuator-piston-inleft-right-50')
export class ObiThreewayAcuatorPistonInleftRight50 extends ObiThreewayActuatorPistonInleftRight50 {}

declare global {
  interface HTMLElementTagNameMap {
    'obi-threeway-acuator-piston-inleft-right-50': ObiThreewayAcuatorPistonInleftRight50;
  }
}
