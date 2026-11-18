import {customElement} from '../decorator.js';
import {ObiThreewayActuatorGenericInleftLeft100} from './icon-threeway-actuator-generic-inleft-left-100.js';

/**
 * `<obi-threeway-acuator-generic-inleft-left-100>` is the name this icon had before it was renamed to
 * `<obi-threeway-actuator-generic-inleft-left-100>`, kept so markup from an earlier release keeps working.
 * It draws what `<obi-threeway-actuator-generic-inleft-left-100>` draws.
 *
 * @deprecated Use `obi-threeway-actuator-generic-inleft-left-100`.
 */
@customElement('obi-threeway-acuator-generic-inleft-left-100')
export class ObiThreewayAcuatorGenericInleftLeft100 extends ObiThreewayActuatorGenericInleftLeft100 {}

declare global {
  interface HTMLElementTagNameMap {
    'obi-threeway-acuator-generic-inleft-left-100': ObiThreewayAcuatorGenericInleftLeft100;
  }
}
