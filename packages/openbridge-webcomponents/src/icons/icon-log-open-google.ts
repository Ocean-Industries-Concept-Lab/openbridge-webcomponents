import {customElement} from '../decorator.js';
import {ObiLogOpen} from './icon-log-open.js';

/**
 * `<obi-log-open-google>` is the name this icon had before it was renamed to
 * `<obi-log-open>`, kept so markup from an earlier release keeps working.
 * It draws what `<obi-log-open>` draws.
 *
 * @deprecated Use `obi-log-open`.
 */
@customElement('obi-log-open-google')
export class ObiLogOpenGoogle extends ObiLogOpen {}

declare global {
  interface HTMLElementTagNameMap {
    'obi-log-open-google': ObiLogOpenGoogle;
  }
}
