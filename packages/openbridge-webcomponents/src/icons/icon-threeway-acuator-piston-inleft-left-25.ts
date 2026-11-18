import {customElement} from '../decorator.js';
import {ObiThreewayActuatorPistonInleftLeft25} from './icon-threeway-actuator-piston-inleft-left-25.js';

/**
 * `<obi-threeway-acuator-piston-inleft-left-25>` is the name this icon had before it was renamed to
 * `<obi-threeway-actuator-piston-inleft-left-25>`, kept so markup from an earlier release keeps working.
 * It draws what `<obi-threeway-actuator-piston-inleft-left-25>` draws.
 *
 * @deprecated Use `obi-threeway-actuator-piston-inleft-left-25`.
 */
@customElement('obi-threeway-acuator-piston-inleft-left-25')
export class ObiThreewayAcuatorPistonInleftLeft25 extends ObiThreewayActuatorPistonInleftLeft25 {}

declare global {
  interface HTMLElementTagNameMap {
    'obi-threeway-acuator-piston-inleft-left-25': ObiThreewayAcuatorPistonInleftLeft25;
  }
}
