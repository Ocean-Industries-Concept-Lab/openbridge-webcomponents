import {customElement} from '../decorator.js';
import {ObiThreewayActuatorGenericInleftBottom25} from './icon-threeway-actuator-generic-inleft-bottom-25.js';

/**
 * `<obi-threeway-acuator-generic-inleft-bottom-25>` is the name this icon had before it was renamed to
 * `<obi-threeway-actuator-generic-inleft-bottom-25>`, kept so markup from an earlier release keeps working.
 * It draws what `<obi-threeway-actuator-generic-inleft-bottom-25>` draws.
 *
 * @deprecated Use `obi-threeway-actuator-generic-inleft-bottom-25`.
 */
@customElement('obi-threeway-acuator-generic-inleft-bottom-25')
export class ObiThreewayAcuatorGenericInleftBottom25 extends ObiThreewayActuatorGenericInleftBottom25 {}

declare global {
  interface HTMLElementTagNameMap {
    'obi-threeway-acuator-generic-inleft-bottom-25': ObiThreewayAcuatorGenericInleftBottom25;
  }
}
