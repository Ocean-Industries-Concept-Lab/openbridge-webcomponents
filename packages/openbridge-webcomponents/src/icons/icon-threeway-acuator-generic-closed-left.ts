import {customElement} from '../decorator.js';
import {ObiThreewayActuatorGenericClosedLeft} from './icon-threeway-actuator-generic-closed-left.js';

/**
 * `<obi-threeway-acuator-generic-closed-left>` is the name this icon had before it was renamed to
 * `<obi-threeway-actuator-generic-closed-left>`, kept so markup from an earlier release keeps working.
 * It draws what `<obi-threeway-actuator-generic-closed-left>` draws.
 *
 * @deprecated Use `obi-threeway-actuator-generic-closed-left`.
 */
@customElement('obi-threeway-acuator-generic-closed-left')
export class ObiThreewayAcuatorGenericClosedLeft extends ObiThreewayActuatorGenericClosedLeft {}

declare global {
  interface HTMLElementTagNameMap {
    'obi-threeway-acuator-generic-closed-left': ObiThreewayAcuatorGenericClosedLeft;
  }
}
