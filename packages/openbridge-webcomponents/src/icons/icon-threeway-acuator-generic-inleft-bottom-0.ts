import {customElement} from '../decorator.js';
import {ObiThreewayActuatorGenericInleftBottom0} from './icon-threeway-actuator-generic-inleft-bottom-0.js';

/**
 * `<obi-threeway-acuator-generic-inleft-bottom-0>` is the name this icon had before it was renamed to
 * `<obi-threeway-actuator-generic-inleft-bottom-0>`, kept so markup from an earlier release keeps working.
 * It draws what `<obi-threeway-actuator-generic-inleft-bottom-0>` draws.
 *
 * @deprecated Use `obi-threeway-actuator-generic-inleft-bottom-0`.
 */
@customElement('obi-threeway-acuator-generic-inleft-bottom-0')
export class ObiThreewayAcuatorGenericInleftBottom0 extends ObiThreewayActuatorGenericInleftBottom0 {}

declare global {
  interface HTMLElementTagNameMap {
    'obi-threeway-acuator-generic-inleft-bottom-0': ObiThreewayAcuatorGenericInleftBottom0;
  }
}
