import {customElement} from '../decorator.js';
import {ObiThreewayActuatorPistonInleftBottom75} from './icon-threeway-actuator-piston-inleft-bottom-75.js';

/**
 * `<obi-threeway-acuator-piston-inleft-bottom-75>` is the name this icon had before it was renamed to
 * `<obi-threeway-actuator-piston-inleft-bottom-75>`, kept so markup from an earlier release keeps working.
 * It draws what `<obi-threeway-actuator-piston-inleft-bottom-75>` draws.
 *
 * @deprecated Use `obi-threeway-actuator-piston-inleft-bottom-75`.
 */
@customElement('obi-threeway-acuator-piston-inleft-bottom-75')
export class ObiThreewayAcuatorPistonInleftBottom75 extends ObiThreewayActuatorPistonInleftBottom75 {}

declare global {
  interface HTMLElementTagNameMap {
    'obi-threeway-acuator-piston-inleft-bottom-75': ObiThreewayAcuatorPistonInleftBottom75;
  }
}
