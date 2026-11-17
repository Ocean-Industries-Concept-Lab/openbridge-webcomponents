import {customElement} from '../decorator.js';
import {ObiTwowayActuatorGeneral75} from './icon-twoway-actuator-general-75.js';

/**
 * `<obi-twoway-acuator-general-75>` is the name this icon had before it was renamed to
 * `<obi-twoway-actuator-general-75>`, kept so markup from an earlier release keeps working.
 * It draws what `<obi-twoway-actuator-general-75>` draws.
 *
 * @deprecated Use `obi-twoway-actuator-general-75`.
 */
@customElement('obi-twoway-acuator-general-75')
export class ObiTwowayAcuatorGeneral75 extends ObiTwowayActuatorGeneral75 {}

declare global {
  interface HTMLElementTagNameMap {
    'obi-twoway-acuator-general-75': ObiTwowayAcuatorGeneral75;
  }
}
