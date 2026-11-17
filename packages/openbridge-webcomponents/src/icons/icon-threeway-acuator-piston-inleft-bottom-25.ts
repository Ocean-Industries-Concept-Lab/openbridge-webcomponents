import {customElement} from '../decorator.js';
import {ObiThreewayActuatorPistonInleftBottom25} from './icon-threeway-actuator-piston-inleft-bottom-25.js';

/**
 * `<obi-threeway-acuator-piston-inleft-bottom-25>` is the name this icon had before it was renamed to
 * `<obi-threeway-actuator-piston-inleft-bottom-25>`, kept so markup from an earlier release keeps working.
 * It draws what `<obi-threeway-actuator-piston-inleft-bottom-25>` draws.
 *
 * @deprecated Use `obi-threeway-actuator-piston-inleft-bottom-25`.
 */
@customElement('obi-threeway-acuator-piston-inleft-bottom-25')
export class ObiThreewayAcuatorPistonInleftBottom25 extends ObiThreewayActuatorPistonInleftBottom25 {}

declare global {
  interface HTMLElementTagNameMap {
    'obi-threeway-acuator-piston-inleft-bottom-25': ObiThreewayAcuatorPistonInleftBottom25;
  }
}
