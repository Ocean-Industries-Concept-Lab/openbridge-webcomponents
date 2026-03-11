import {html} from 'lit';
import {customElement} from '../../decorator.js';
import '../../icons/icon-vessel-generic-default-filled.js';
import {ObcPoiVariant} from '../building-blocks/poi-variant/poi-variant.js';

export {PoiVariantValue as PoiDataValue} from '../building-blocks/poi-variant/poi-variant.js';
export {PoiDataVisualRectPreference} from '../poi-layer-target.js';

/**
 * `<obc-poi-data>` - Data-oriented marker variant with layout positioning and layer integration.
 *
 * Extends `ObcPoiVariant` to provide the "data" variant of the POI system.
 * Renders `<obc-poi>` (the base building block) with a default vessel icon.
 *
 * @slot header - Optional custom header content forwarded into `obc-poi`.
 * @fires obc-poi-data-layout-change {CustomEvent<void>} Fired when layout-driving properties change.
 */
@customElement('obc-poi-data')
export class ObcPoiData extends ObcPoiVariant {
  protected override getVisualNodes() {
    return this.queryVisualNodes('obc-poi', 'obc-poi-button');
  }

  protected override renderButtonSlot() {
    return html`
      ${this.hasHeader ? html`<slot name="header" slot="header"></slot>` : null}
      <obi-vessel-generic-default-filled></obi-vessel-generic-default-filled>
    `;
  }

  static override styles = ObcPoiVariant.styles;
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-poi-data': ObcPoiData;
  }
}
