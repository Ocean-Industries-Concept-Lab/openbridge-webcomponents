import {customElement} from '../decorator.js';
import {ObiThreewayActuatorPistonInleftBottom50} from './icon-threeway-actuator-piston-inleft-bottom-50.js';

/**
 * `<obi-threeway-acuator-piston-inleft-bottom-50>` is the name this icon had before it was renamed to
 * `<obi-threeway-actuator-piston-inleft-bottom-50>`, kept so markup from an earlier release keeps working.
 * It draws what `<obi-threeway-actuator-piston-inleft-bottom-50>` draws.
 *
 * @deprecated Use `obi-threeway-actuator-piston-inleft-bottom-50`.
 */
@customElement('obi-threeway-acuator-piston-inleft-bottom-50')
export class ObiThreewayAcuatorPistonInleftBottom50 extends ObiThreewayActuatorPistonInleftBottom50 {}

declare global {
  interface HTMLElementTagNameMap {
    'obi-threeway-acuator-piston-inleft-bottom-50': ObiThreewayAcuatorPistonInleftBottom50;
  }
}
