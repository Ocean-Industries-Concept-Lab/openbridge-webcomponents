import {customElement} from '../decorator.js';
import {ObiThreewayActuatorPistonInleftLeft75} from './icon-threeway-actuator-piston-inleft-left-75.js';

/**
 * `<obi-threeway-acuator-piston-inleft-left-75>` is the name this icon had before it was renamed to
 * `<obi-threeway-actuator-piston-inleft-left-75>`, kept so markup from an earlier release keeps working.
 * It draws what `<obi-threeway-actuator-piston-inleft-left-75>` draws.
 *
 * @deprecated Use `obi-threeway-actuator-piston-inleft-left-75`.
 */
@customElement('obi-threeway-acuator-piston-inleft-left-75')
export class ObiThreewayAcuatorPistonInleftLeft75 extends ObiThreewayActuatorPistonInleftLeft75 {}

declare global {
  interface HTMLElementTagNameMap {
    'obi-threeway-acuator-piston-inleft-left-75': ObiThreewayAcuatorPistonInleftLeft75;
  }
}
