import {customElement} from '../decorator.js';
import {ObiConverterAcdcStatic} from './icon-converter-acdc-static.js';

/**
 * `<obi-converter-acdc>` is the name this icon had before it was renamed to
 * `<obi-converter-acdc-static>`, kept so markup from an earlier release keeps working.
 * It draws what `<obi-converter-acdc-static>` draws.
 *
 * @deprecated Use `obi-converter-acdc-static`.
 */
@customElement('obi-converter-acdc')
export class ObiConverterAcdc extends ObiConverterAcdcStatic {}

declare global {
  interface HTMLElementTagNameMap {
    'obi-converter-acdc': ObiConverterAcdc;
  }
}
