import {customElement} from '../decorator.js';
import {ObiThreewayActuatorGenericInleftBottom100} from './icon-threeway-actuator-generic-inleft-bottom-100.js';

/**
 * `<obi-threeway-acuator-generic-inleft-bottom-100>` is the name this icon had before it was renamed to
 * `<obi-threeway-actuator-generic-inleft-bottom-100>`, kept so markup from an earlier release keeps working.
 * It draws what `<obi-threeway-actuator-generic-inleft-bottom-100>` draws.
 *
 * @deprecated Use `obi-threeway-actuator-generic-inleft-bottom-100`.
 */
@customElement('obi-threeway-acuator-generic-inleft-bottom-100')
export class ObiThreewayAcuatorGenericInleftBottom100 extends ObiThreewayActuatorGenericInleftBottom100 {}

declare global {
  interface HTMLElementTagNameMap {
    'obi-threeway-acuator-generic-inleft-bottom-100': ObiThreewayAcuatorGenericInleftBottom100;
  }
}
