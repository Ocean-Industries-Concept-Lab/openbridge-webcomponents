import {customElement} from '../decorator.js';
import {ObiThreewayActuatorGenericClosedRight} from './icon-threeway-actuator-generic-closed-right.js';

/**
 * `<obi-threeway-acuator-generic-closed-right>` is the name this icon had before it was renamed to
 * `<obi-threeway-actuator-generic-closed-right>`, kept so markup from an earlier release keeps working.
 * It draws what `<obi-threeway-actuator-generic-closed-right>` draws.
 *
 * @deprecated Use `obi-threeway-actuator-generic-closed-right`.
 */
@customElement('obi-threeway-acuator-generic-closed-right')
export class ObiThreewayAcuatorGenericClosedRight extends ObiThreewayActuatorGenericClosedRight {}

declare global {
  interface HTMLElementTagNameMap {
    'obi-threeway-acuator-generic-closed-right': ObiThreewayAcuatorGenericClosedRight;
  }
}
