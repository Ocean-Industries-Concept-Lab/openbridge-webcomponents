import {customElement} from '../decorator.js';
import {ObiThreewayActuatorGenericInleftLeft25} from './icon-threeway-actuator-generic-inleft-left-25.js';

/**
 * `<obi-threeway-acuator-generic-inleft-left-25>` is the name this icon had before it was renamed to
 * `<obi-threeway-actuator-generic-inleft-left-25>`, kept so markup from an earlier release keeps working.
 * It draws what `<obi-threeway-actuator-generic-inleft-left-25>` draws.
 *
 * @deprecated Use `obi-threeway-actuator-generic-inleft-left-25`.
 */
@customElement('obi-threeway-acuator-generic-inleft-left-25')
export class ObiThreewayAcuatorGenericInleftLeft25 extends ObiThreewayActuatorGenericInleftLeft25 {}

declare global {
  interface HTMLElementTagNameMap {
    'obi-threeway-acuator-generic-inleft-left-25': ObiThreewayAcuatorGenericInleftLeft25;
  }
}
