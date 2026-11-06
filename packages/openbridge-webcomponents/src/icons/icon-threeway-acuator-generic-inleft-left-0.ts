import {customElement} from '../decorator.js';
import {ObiThreewayActuatorGenericInleftLeft0} from './icon-threeway-actuator-generic-inleft-left-0.js';

/**
 * `<obi-threeway-acuator-generic-inleft-left-0>` is the name this icon had before it was renamed to
 * `<obi-threeway-actuator-generic-inleft-left-0>`, kept so markup from an earlier release keeps working.
 * It draws what `<obi-threeway-actuator-generic-inleft-left-0>` draws.
 *
 * @deprecated Use `obi-threeway-actuator-generic-inleft-left-0`.
 */
@customElement('obi-threeway-acuator-generic-inleft-left-0')
export class ObiThreewayAcuatorGenericInleftLeft0 extends ObiThreewayActuatorGenericInleftLeft0 {}

declare global {
  interface HTMLElementTagNameMap {
    'obi-threeway-acuator-generic-inleft-left-0': ObiThreewayAcuatorGenericInleftLeft0;
  }
}
