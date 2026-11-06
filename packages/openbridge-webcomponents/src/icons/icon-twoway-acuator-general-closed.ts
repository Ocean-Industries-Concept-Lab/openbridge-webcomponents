import {customElement} from '../decorator.js';
import {ObiTwowayActuatorGeneralClosed} from './icon-twoway-actuator-general-closed.js';

/**
 * `<obi-twoway-acuator-general-closed>` is the name this icon had before it was renamed to
 * `<obi-twoway-actuator-general-closed>`, kept so markup from an earlier release keeps working.
 * It draws what `<obi-twoway-actuator-general-closed>` draws.
 *
 * @deprecated Use `obi-twoway-actuator-general-closed`.
 */
@customElement('obi-twoway-acuator-general-closed')
export class ObiTwowayAcuatorGeneralClosed extends ObiTwowayActuatorGeneralClosed {}

declare global {
  interface HTMLElementTagNameMap {
    'obi-twoway-acuator-general-closed': ObiTwowayAcuatorGeneralClosed;
  }
}
