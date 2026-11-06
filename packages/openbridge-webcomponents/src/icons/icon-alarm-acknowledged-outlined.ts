import {customElement} from '../decorator.js';
import {ObiAlarmUnacknowledgedOutlined} from './icon-alarm-unacknowledged-outlined.js';

/**
 * `<obi-alarm-acknowledged-outlined>` is the name this icon had before it was renamed to
 * `<obi-alarm-unacknowledged-outlined>`, kept so markup from an earlier release keeps working.
 * It draws what `<obi-alarm-unacknowledged-outlined>` draws.
 *
 * @deprecated Use `obi-alarm-unacknowledged-outlined`.
 */
@customElement('obi-alarm-acknowledged-outlined')
export class ObiAlarmAcknowledgedOutlined extends ObiAlarmUnacknowledgedOutlined {}

declare global {
  interface HTMLElementTagNameMap {
    'obi-alarm-acknowledged-outlined': ObiAlarmAcknowledgedOutlined;
  }
}
