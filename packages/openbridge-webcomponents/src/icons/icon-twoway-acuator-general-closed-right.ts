import {customElement} from '../decorator.js';
import {ObiTwowayActuatorGeneralClosedRight} from './icon-twoway-actuator-general-closed-right.js';

/**
 * `<obi-twoway-acuator-general-closed-right>` is the name this icon had before it was renamed to
 * `<obi-twoway-actuator-general-closed-right>`, kept so markup from an earlier release keeps working.
 * It draws what `<obi-twoway-actuator-general-closed-right>` draws.
 *
 * @deprecated Use `obi-twoway-actuator-general-closed-right`.
 */
@customElement('obi-twoway-acuator-general-closed-right')
export class ObiTwowayAcuatorGeneralClosedRight extends ObiTwowayActuatorGeneralClosedRight {}

declare global {
  interface HTMLElementTagNameMap {
    'obi-twoway-acuator-general-closed-right': ObiTwowayAcuatorGeneralClosedRight;
  }
}
