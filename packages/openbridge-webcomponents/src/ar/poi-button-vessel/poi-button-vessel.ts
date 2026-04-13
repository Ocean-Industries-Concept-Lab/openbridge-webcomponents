import {html} from 'lit';
import {property} from 'lit/decorators.js';
import {customElement} from '../../decorator.js';
import {ObcPoiButton} from '../building-blocks/poi-button/poi-button.js';
import {ObcPoiObjectType} from '../building-blocks/poi-object/poi-object.js';
import '../poi-object-vessel/poi-object-vessel.js';
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
 * `<obc-poi-button-vessel>` - A poi-button variant that renders a vessel object
 * instead of the default round `obc-poi-object`.
 *
 * Inherits all selection frame, header, data, and alert behavior from
 * `obc-poi-button`.
 *
 * @slot - Icon content forwarded to the inner vessel object.
 * @slot turn-indicator - Optional turn indicator content for speed-rot type.
 * @slot speed-indicator - Optional speed indicator content for speed-rot type.
 * @slot header - Optional header content.
 * @slot relation - Optional relation icon/content in data mode.
 */
@customElement('obc-poi-button-vessel')
export class ObcPoiButtonVessel extends ObcPoiButton {
  @property({type: String, attribute: 'vessel-type'})
  vesselType: ObcPoiObjectVesselType = ObcPoiObjectVesselType.Regular;

  @property({type: String, attribute: 'vessel-style'})
  vesselStyle: ObcPoiObjectVesselStyle = ObcPoiObjectVesselStyle.Regular;

  @property({type: String, attribute: 'vessel-state'})
  vesselState: ObcPoiObjectVesselState | null = null;

  @property({type: Boolean, attribute: 'vessel-interactive'})
  vesselInteractive = false;

  /**
   * Maps the button's computed `poiObjectType` (Regular/Large) to the
   * vessel type enum.  When the vessel is in speed-rot mode the type
   * is fixed — otherwise it follows the button size.
   */
  private get resolvedVesselType(): ObcPoiObjectVesselType {
    if (this.vesselType === ObcPoiObjectVesselType.SpeedRot) {
      return ObcPoiObjectVesselType.SpeedRot;
    }
    switch (this.poiObjectType) {
      case ObcPoiObjectType.Large:
        return ObcPoiObjectVesselType.Large;
      default:
        return this.vesselType;
    }
  }

  protected override renderPoiObject() {
    return html`
      <obc-poi-object-vessel
        class="poi-object"
        exportparts="background-frame"
        .type=${this.resolvedVesselType}
        .objectStyle=${this.vesselStyle}
        .state=${this.vesselState ??
        (this.poiObjectState as unknown as ObcPoiObjectVesselState)}
        .interactive=${this.vesselInteractive}
      >
        <span
          class="icon"
          style="transform: rotate(${this.relativeDirection}deg);"
        >
          <slot></slot>
        </span>
        <slot name="turn-indicator" slot="turn-indicator"></slot>
        <slot name="speed-indicator" slot="speed-indicator"></slot>
      </obc-poi-object-vessel>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-poi-button-vessel': ObcPoiButtonVessel;
  }
}
