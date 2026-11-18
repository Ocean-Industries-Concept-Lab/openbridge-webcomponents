import {customElement} from '../decorator.js';
import {ObiThreewayActuatorGenericInleftRight75} from './icon-threeway-actuator-generic-inleft-right-75.js';

/**
 * `<obi-threeway-acuator-generic-inleft-right-75>` is the name this icon had before it was renamed to
 * `<obi-threeway-actuator-generic-inleft-right-75>`, kept so markup from an earlier release keeps working.
 * It draws what `<obi-threeway-actuator-generic-inleft-right-75>` draws.
 *
 * @deprecated Use `obi-threeway-actuator-generic-inleft-right-75`.
 */
@customElement('obi-threeway-acuator-generic-inleft-right-75')
export class ObiThreewayAcuatorGenericInleftRight75 extends ObiThreewayActuatorGenericInleftRight75 {}

declare global {
  interface HTMLElementTagNameMap {
    'obi-threeway-acuator-generic-inleft-right-75': ObiThreewayAcuatorGenericInleftRight75;
  }
}
