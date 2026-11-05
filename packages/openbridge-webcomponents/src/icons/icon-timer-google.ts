import {customElement} from '../decorator.js';
import {ObiTimer} from './icon-timer.js';

/**
 * `<obi-timer-google>` is the name this icon had before it was renamed to
 * `<obi-timer>`, kept so markup from an earlier release keeps working.
 * It draws what `<obi-timer>` draws.
 *
 * @deprecated Use `obi-timer`.
 */
@customElement('obi-timer-google')
export class ObiTimerGoogle extends ObiTimer {}

declare global {
  interface HTMLElementTagNameMap {
    'obi-timer-google': ObiTimerGoogle;
  }
}
