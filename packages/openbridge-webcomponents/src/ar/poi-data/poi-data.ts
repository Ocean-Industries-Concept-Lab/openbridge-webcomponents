import {html} from 'lit';
import {customElement} from '../../decorator.js';
import '../../icons/icon-vessel-generic-default-filled.js';
import {ObcPoiBase} from '../building-blocks/poi/poi-base.js';

export {PoiBaseValue as PoiDataValue} from '../building-blocks/poi/poi-base.js';
export {PoiDataVisualRectPreference} from '../building-blocks/poi/poi.js';

/**
 * `<obc-poi-data>` - Data-oriented marker variant with layout positioning and layer integration.
 *
 * Extends `ObcPoiBase` to provide the "data" variant of the POI system.
 * Renders `<obc-poi>` (the base building block) with a default vessel icon.
 *
 * @slot header - Optional custom header content forwarded into `obc-poi`.
 * @fires obc-poi-data-layout-change {CustomEvent<void>} Fired when layout-driving properties change.
 */
@customElement('obc-poi-data')
export class ObcPoiData extends ObcPoiBase {
  protected override getVisualNodes() {
    return this.queryVisualNodes('obc-poi', 'obc-poi-button');
  }

  protected override renderButtonSlot() {
    return html`
      ${this.hasHeader ? html`<slot name="header" slot="header"></slot>` : null}
      <obi-vessel-generic-default-filled></obi-vessel-generic-default-filled>
    `;
  }

  static override styles = ObcPoiBase.styles;
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-poi-data': ObcPoiData;
  }
}
