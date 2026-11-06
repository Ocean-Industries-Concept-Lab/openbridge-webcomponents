import {customElement} from '../decorator.js';
import {ObiThreewayActuatorGenericOpen} from './icon-threeway-actuator-generic-open.js';

/**
 * `<obi-threeway-acuator-generic-open>` is the name this icon had before it was renamed to
 * `<obi-threeway-actuator-generic-open>`, kept so markup from an earlier release keeps working.
 * It draws what `<obi-threeway-actuator-generic-open>` draws.
 *
 * @deprecated Use `obi-threeway-actuator-generic-open`.
 */
@customElement('obi-threeway-acuator-generic-open')
export class ObiThreewayAcuatorGenericOpen extends ObiThreewayActuatorGenericOpen {}

declare global {
  interface HTMLElementTagNameMap {
    'obi-threeway-acuator-generic-open': ObiThreewayAcuatorGenericOpen;
  }
}
