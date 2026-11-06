import {customElement} from '../decorator.js';
import {ObiThreewayActuatorGenericInleftBottom75} from './icon-threeway-actuator-generic-inleft-bottom-75.js';

/**
 * `<obi-threeway-acuator-generic-inleft-bottom-75>` is the name this icon had before it was renamed to
 * `<obi-threeway-actuator-generic-inleft-bottom-75>`, kept so markup from an earlier release keeps working.
 * It draws what `<obi-threeway-actuator-generic-inleft-bottom-75>` draws.
 *
 * @deprecated Use `obi-threeway-actuator-generic-inleft-bottom-75`.
 */
@customElement('obi-threeway-acuator-generic-inleft-bottom-75')
export class ObiThreewayAcuatorGenericInleftBottom75 extends ObiThreewayActuatorGenericInleftBottom75 {}

declare global {
  interface HTMLElementTagNameMap {
    'obi-threeway-acuator-generic-inleft-bottom-75': ObiThreewayAcuatorGenericInleftBottom75;
  }
}
