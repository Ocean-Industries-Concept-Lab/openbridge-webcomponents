import {customElement} from '../decorator.js';
import {ObiConverterDcacStatic} from './icon-converter-dcac-static.js';

/**
 * `<obi-converter-dcac>` is the name this icon had before it was renamed to
 * `<obi-converter-dcac-static>`, kept so markup from an earlier release keeps working.
 * It draws what `<obi-converter-dcac-static>` draws.
 *
 * @deprecated Use `obi-converter-dcac-static`.
 */
@customElement('obi-converter-dcac')
export class ObiConverterDcac extends ObiConverterDcacStatic {}

declare global {
  interface HTMLElementTagNameMap {
    'obi-converter-dcac': ObiConverterDcac;
  }
}
