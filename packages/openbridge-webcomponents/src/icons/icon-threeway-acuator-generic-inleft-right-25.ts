import {customElement} from '../decorator.js';
import {ObiThreewayActuatorGenericInleftRight25} from './icon-threeway-actuator-generic-inleft-right-25.js';

/**
 * `<obi-threeway-acuator-generic-inleft-right-25>` is the name this icon had before it was renamed to
 * `<obi-threeway-actuator-generic-inleft-right-25>`, kept so markup from an earlier release keeps working.
 * It draws what `<obi-threeway-actuator-generic-inleft-right-25>` draws.
 *
 * @deprecated Use `obi-threeway-actuator-generic-inleft-right-25`.
 */
@customElement('obi-threeway-acuator-generic-inleft-right-25')
export class ObiThreewayAcuatorGenericInleftRight25 extends ObiThreewayActuatorGenericInleftRight25 {}

declare global {
  interface HTMLElementTagNameMap {
    'obi-threeway-acuator-generic-inleft-right-25': ObiThreewayAcuatorGenericInleftRight25;
  }
}
