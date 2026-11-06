import {customElement} from '../decorator.js';
import {ObiTwowayActuatorGeneral50} from './icon-twoway-actuator-general-50.js';

/**
 * `<obi-twoway-acuator-general-50>` is the name this icon had before it was renamed to
 * `<obi-twoway-actuator-general-50>`, kept so markup from an earlier release keeps working.
 * It draws what `<obi-twoway-actuator-general-50>` draws.
 *
 * @deprecated Use `obi-twoway-actuator-general-50`.
 */
@customElement('obi-twoway-acuator-general-50')
export class ObiTwowayAcuatorGeneral50 extends ObiTwowayActuatorGeneral50 {}

declare global {
  interface HTMLElementTagNameMap {
    'obi-twoway-acuator-general-50': ObiTwowayAcuatorGeneral50;
  }
}
