import {customElement} from '../decorator.js';
import {ObiThreewayActuatorGenericInleftLeft50} from './icon-threeway-actuator-generic-inleft-left-50.js';

/**
 * `<obi-threeway-acuator-generic-inleft-left-50>` is the name this icon had before it was renamed to
 * `<obi-threeway-actuator-generic-inleft-left-50>`, kept so markup from an earlier release keeps working.
 * It draws what `<obi-threeway-actuator-generic-inleft-left-50>` draws.
 *
 * @deprecated Use `obi-threeway-actuator-generic-inleft-left-50`.
 */
@customElement('obi-threeway-acuator-generic-inleft-left-50')
export class ObiThreewayAcuatorGenericInleftLeft50 extends ObiThreewayActuatorGenericInleftLeft50 {}

declare global {
  interface HTMLElementTagNameMap {
    'obi-threeway-acuator-generic-inleft-left-50': ObiThreewayAcuatorGenericInleftLeft50;
  }
}
