import {customElement} from '../decorator.js';
import {ObiTwowayActuatorGeneral10} from './icon-twoway-actuator-general-10.js';

/**
 * `<obi-twoway-acuator-general-10>` is the name this icon had before it was renamed to
 * `<obi-twoway-actuator-general-10>`, kept so markup from an earlier release keeps working.
 * It draws what `<obi-twoway-actuator-general-10>` draws.
 *
 * @deprecated Use `obi-twoway-actuator-general-10`.
 */
@customElement('obi-twoway-acuator-general-10')
export class ObiTwowayAcuatorGeneral10 extends ObiTwowayActuatorGeneral10 {}

declare global {
  interface HTMLElementTagNameMap {
    'obi-twoway-acuator-general-10': ObiTwowayAcuatorGeneral10;
  }
}
