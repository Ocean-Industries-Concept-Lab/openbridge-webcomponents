import {customElement} from '../decorator.js';
import {ObiTwowayActuatorGeneralClosedLeft} from './icon-twoway-actuator-general-closed-left.js';

/**
 * `<obi-twoway-acuator-general-closed-left>` is the name this icon had before it was renamed to
 * `<obi-twoway-actuator-general-closed-left>`, kept so markup from an earlier release keeps working.
 * It draws what `<obi-twoway-actuator-general-closed-left>` draws.
 *
 * @deprecated Use `obi-twoway-actuator-general-closed-left`.
 */
@customElement('obi-twoway-acuator-general-closed-left')
export class ObiTwowayAcuatorGeneralClosedLeft extends ObiTwowayActuatorGeneralClosedLeft {}

declare global {
  interface HTMLElementTagNameMap {
    'obi-twoway-acuator-general-closed-left': ObiTwowayAcuatorGeneralClosedLeft;
  }
}
