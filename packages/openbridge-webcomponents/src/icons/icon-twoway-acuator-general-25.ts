import {customElement} from '../decorator.js';
import {ObiTwowayActuatorGeneral25} from './icon-twoway-actuator-general-25.js';

/**
 * `<obi-twoway-acuator-general-25>` is the name this icon had before it was renamed to
 * `<obi-twoway-actuator-general-25>`, kept so markup from an earlier release keeps working.
 * It draws what `<obi-twoway-actuator-general-25>` draws.
 *
 * @deprecated Use `obi-twoway-actuator-general-25`.
 */
@customElement('obi-twoway-acuator-general-25')
export class ObiTwowayAcuatorGeneral25 extends ObiTwowayActuatorGeneral25 {}

declare global {
  interface HTMLElementTagNameMap {
    'obi-twoway-acuator-general-25': ObiTwowayAcuatorGeneral25;
  }
}
