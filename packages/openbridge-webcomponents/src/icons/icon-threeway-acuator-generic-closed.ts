import {customElement} from '../decorator.js';
import {ObiThreewayActuatorGenericClosed} from './icon-threeway-actuator-generic-closed.js';

/**
 * `<obi-threeway-acuator-generic-closed>` is the name this icon had before it was renamed to
 * `<obi-threeway-actuator-generic-closed>`, kept so markup from an earlier release keeps working.
 * It draws what `<obi-threeway-actuator-generic-closed>` draws.
 *
 * @deprecated Use `obi-threeway-actuator-generic-closed`.
 */
@customElement('obi-threeway-acuator-generic-closed')
export class ObiThreewayAcuatorGenericClosed extends ObiThreewayActuatorGenericClosed {}

declare global {
  interface HTMLElementTagNameMap {
    'obi-threeway-acuator-generic-closed': ObiThreewayAcuatorGenericClosed;
  }
}
