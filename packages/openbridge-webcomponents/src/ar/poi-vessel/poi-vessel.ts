import {html} from 'lit';
import {property} from 'lit/decorators.js';
import {customElement} from '../../decorator.js';
import '../poi-button-vessel/poi-button-vessel.js';
import {ObcPoiVariant} from '../building-blocks/poi-variant/poi-variant.js';
import {
  ObcPoiObjectVesselType,
  ObcPoiObjectVesselStyle,
  ObcPoiObjectVesselState,
} from '../poi-object-vessel/poi-object-vessel.js';

export {
  ObcPoiObjectVesselType,
  ObcPoiObjectVesselStyle,
  ObcPoiObjectVesselState,
};

/**
 * `<obc-poi-vessel>` - Vessel marker variant with layout positioning and layer integration.
 *
 * Extends `ObcPoiVariant` to provide the "vessel" variant of the POI system.
 * Renders `<obc-poi>` with a slotted `<obc-poi-button-vessel>`.
 *
 * @slot - Icon content forwarded to the inner vessel object.
 * @slot turn-indicator - Optional turn indicator content for speed-rot type.
 * @slot speed-indicator - Optional speed indicator content for speed-rot type.
 * @slot header - Optional header content forwarded to the poi button.
 * @fires obc-poi-data-layout-change {CustomEvent<void>} Fired when layout-driving properties change.
 */
@customElement('obc-poi-vessel')
export class ObcPoiVessel extends ObcPoiVariant {
  @property({type: String, attribute: 'vessel-type'})
  vesselType: ObcPoiObjectVesselType = ObcPoiObjectVesselType.Regular;

  @property({type: String, attribute: 'vessel-style'})
  vesselStyle: ObcPoiObjectVesselStyle = ObcPoiObjectVesselStyle.Regular;

  @property({type: String, attribute: 'vessel-state'})
  vesselState: ObcPoiObjectVesselState = ObcPoiObjectVesselState.Unchecked;

  @property({type: Boolean, attribute: 'vessel-interactive'})
  vesselInteractive = false;

  protected override getVisualNodes() {
    return this.queryVisualNodes('obc-poi', 'obc-poi-button-vessel');
  }

  protected override renderButtonSlot() {
    return html`
      <obc-poi-button-vessel
        slot="button"
        .vesselType=${this.vesselType}
        .vesselStyle=${this.vesselStyle}
        .vesselState=${this.vesselState}
        .vesselInteractive=${this.vesselInteractive}
      >
        <slot></slot>
        <slot name="turn-indicator" slot="turn-indicator"></slot>
        <slot name="speed-indicator" slot="speed-indicator"></slot>
        ${this.hasHeader
          ? html`<slot name="header" slot="header"></slot>`
          : null}
      </obc-poi-button-vessel>
    `;
  }

  static override styles = ObcPoiVariant.styles;
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-poi-vessel': ObcPoiVessel;
  }
}
