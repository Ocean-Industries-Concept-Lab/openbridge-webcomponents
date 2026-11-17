import {customElement} from '../decorator.js';
import {ObiThreewayActuatorGenericInleftBottom50} from './icon-threeway-actuator-generic-inleft-bottom-50.js';

/**
 * `<obi-threeway-acuator-generic-inleft-bottom-50>` is the name this icon had before it was renamed to
 * `<obi-threeway-actuator-generic-inleft-bottom-50>`, kept so markup from an earlier release keeps working.
 * It draws what `<obi-threeway-actuator-generic-inleft-bottom-50>` draws.
 *
 * @deprecated Use `obi-threeway-actuator-generic-inleft-bottom-50`.
 */
@customElement('obi-threeway-acuator-generic-inleft-bottom-50')
export class ObiThreewayAcuatorGenericInleftBottom50 extends ObiThreewayActuatorGenericInleftBottom50 {}

declare global {
  interface HTMLElementTagNameMap {
    'obi-threeway-acuator-generic-inleft-bottom-50': ObiThreewayAcuatorGenericInleftBottom50;
  }
}
