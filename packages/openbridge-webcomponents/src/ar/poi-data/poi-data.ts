import {html} from 'lit';
import {property} from 'lit/decorators.js';
import {customElement} from '../../decorator.js';
import {ObcPoiBase} from '../building-blocks/poi/poi-base.js';
import '../poi-button-data/poi-button-data.js';
import '../../icons/icon-vessel-generic-default-filled.js';
import {
  ObcPoiObjectDataStyle,
  ObcPoiObjectDataState,
} from '../poi-object-data/poi-object-data.js';

export {PoiBaseValue as PoiDataValue} from '../building-blocks/poi/poi-base.js';
export {PoiDataVisualRectPreference} from '../building-blocks/poi/poi.js';
export {ObcPoiObjectDataStyle as PoiDataObjectStyle};
export {ObcPoiObjectDataState as PoiDataObjectState};

/**
 * `<obc-poi-data>` - Data-oriented marker variant with layout positioning and layer integration.
 *
 * Extends `ObcPoiBase` to provide the "data" variant of the POI system.
 * Renders `<obc-poi>` with a slotted `<obc-poi-button-data>`.
 *
 * @slot - Icon content forwarded to the inner POI object. Defaults to a vessel icon.
 * @slot header - Optional custom header content forwarded into `obc-poi`.
 * @fires obc-poi-data-layout-change {CustomEvent<void>} Fired when layout-driving properties change.
 */
@customElement('obc-poi-data')
export class ObcPoiData extends ObcPoiBase {
  @property({type: String, attribute: 'data-style'})
  dataStyle: ObcPoiObjectDataStyle = ObcPoiObjectDataStyle.Regular;

  @property({type: String, attribute: 'data-state'})
  dataState: ObcPoiObjectDataState | null = null;

  @property({type: Boolean, attribute: 'data-interactive'})
  dataInteractive = false;

  protected override getVisualNodes() {
    return this.queryVisualNodes('obc-poi', 'obc-poi-button-data');
  }

  protected override renderButtonSlot() {
    return html`
      <obc-poi-button-data
        slot="button"
        exportparts="icon"
        .relativeDirection=${this.relativeDirection}
        .selected=${this.selected}
        .hasHeader=${this.hasHeader}
        .headerContent=${this.headerContent}
        .state=${this.resolvedPoiState}
        .value=${this.value}
        .overlapOpaque=${this.overlapOpaque}
        .type=${this.buttonType}
        .data=${this.data}
        .dataStyle=${this.dataStyle}
        .dataState=${this.dataState}
        .dataInteractive=${this.dataInteractive}
      >
        <slot
          ><obi-vessel-generic-default-filled></obi-vessel-generic-default-filled
        ></slot>
      </obc-poi-button-data>
    `;
  }

  static override styles = ObcPoiBase.styles;
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-poi-data': ObcPoiData;
  }
}
