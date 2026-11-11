import {customElement} from '../decorator.js';
import {ObiTwowayActuatorGeneralOpen} from './icon-twoway-actuator-general-open.js';

/**
 * `<obi-twoway-acuator-general-open>` is the name this icon had before it was renamed to
 * `<obi-twoway-actuator-general-open>`, kept so markup from an earlier release keeps working.
 * It draws what `<obi-twoway-actuator-general-open>` draws.
 *
 * @deprecated Use `obi-twoway-actuator-general-open`.
 */
@customElement('obi-twoway-acuator-general-open')
export class ObiTwowayAcuatorGeneralOpen extends ObiTwowayActuatorGeneralOpen {}

declare global {
  interface HTMLElementTagNameMap {
    'obi-twoway-acuator-general-open': ObiTwowayAcuatorGeneralOpen;
  }
}
