import {customElement} from '../decorator.js';
import {ObiThreewayActuatorPistonInleftRight75} from './icon-threeway-actuator-piston-inleft-right-75.js';

/**
 * `<obi-threeway-acuator-piston-inleft-right-75>` is the name this icon had before it was renamed to
 * `<obi-threeway-actuator-piston-inleft-right-75>`, kept so markup from an earlier release keeps working.
 * It draws what `<obi-threeway-actuator-piston-inleft-right-75>` draws.
 *
 * @deprecated Use `obi-threeway-actuator-piston-inleft-right-75`.
 */
@customElement('obi-threeway-acuator-piston-inleft-right-75')
export class ObiThreewayAcuatorPistonInleftRight75 extends ObiThreewayActuatorPistonInleftRight75 {}

declare global {
  interface HTMLElementTagNameMap {
    'obi-threeway-acuator-piston-inleft-right-75': ObiThreewayAcuatorPistonInleftRight75;
  }
}
