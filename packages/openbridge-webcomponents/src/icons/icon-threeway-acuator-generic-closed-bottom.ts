import {customElement} from '../decorator.js';
import {ObiThreewayActuatorGenericClosedBottom} from './icon-threeway-actuator-generic-closed-bottom.js';

/**
 * `<obi-threeway-acuator-generic-closed-bottom>` is the name this icon had before it was renamed to
 * `<obi-threeway-actuator-generic-closed-bottom>`, kept so markup from an earlier release keeps working.
 * It draws what `<obi-threeway-actuator-generic-closed-bottom>` draws.
 *
 * @deprecated Use `obi-threeway-actuator-generic-closed-bottom`.
 */
@customElement('obi-threeway-acuator-generic-closed-bottom')
export class ObiThreewayAcuatorGenericClosedBottom extends ObiThreewayActuatorGenericClosedBottom {}

declare global {
  interface HTMLElementTagNameMap {
    'obi-threeway-acuator-generic-closed-bottom': ObiThreewayAcuatorGenericClosedBottom;
  }
}
