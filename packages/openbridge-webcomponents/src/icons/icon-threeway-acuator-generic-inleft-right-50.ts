import {customElement} from '../decorator.js';
import {ObiThreewayActuatorGenericInleftRight50} from './icon-threeway-actuator-generic-inleft-right-50.js';

/**
 * `<obi-threeway-acuator-generic-inleft-right-50>` is the name this icon had before it was renamed to
 * `<obi-threeway-actuator-generic-inleft-right-50>`, kept so markup from an earlier release keeps working.
 * It draws what `<obi-threeway-actuator-generic-inleft-right-50>` draws.
 *
 * @deprecated Use `obi-threeway-actuator-generic-inleft-right-50`.
 */
@customElement('obi-threeway-acuator-generic-inleft-right-50')
export class ObiThreewayAcuatorGenericInleftRight50 extends ObiThreewayActuatorGenericInleftRight50 {}

declare global {
  interface HTMLElementTagNameMap {
    'obi-threeway-acuator-generic-inleft-right-50': ObiThreewayAcuatorGenericInleftRight50;
  }
}
