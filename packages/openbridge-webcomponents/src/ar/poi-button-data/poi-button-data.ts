import {html} from 'lit';
import {property} from 'lit/decorators.js';
import {customElement} from '../../decorator.js';
import {ObcPoiButton} from '../building-blocks/poi-button/poi-button.js';
import {ObcPoiObjectType} from '../building-blocks/poi-object/poi-object.js';
import '../poi-object-data/poi-object-data.js';
import '../../icons/icon-vessel-generic-default-filled.js';
import {
  ObcPoiObjectDataType,
  ObcPoiObjectDataStyle,
  ObcPoiObjectDataState,
} from '../poi-object-data/poi-object-data.js';

export {ObcPoiObjectDataType, ObcPoiObjectDataStyle, ObcPoiObjectDataState};

/**
 * `<obc-poi-button-data>` - Data variant of the POI marker button.
 *
 * Renders `<obc-poi-object-data>` as its marker object, exposing `objectStyle`,
 * `objectState`, and `objectInteractive` to control its appearance.
 * Inherits all selection frame, header, and data-row behavior from `obc-poi-button`.
 *
 * @slot - Icon content forwarded to the inner POI object.
 * @slot header - Optional header content.
 * @slot relation - Optional relation icon/content in data mode.
 */
@customElement('obc-poi-button-data')
export class ObcPoiButtonData extends ObcPoiButton {
  @property({type: String, attribute: 'object-style'})
  objectStyle: ObcPoiObjectDataStyle = ObcPoiObjectDataStyle.Regular;

  @property({type: String, attribute: 'object-state'})
  objectState: ObcPoiObjectDataState | null = null;

  @property({type: Boolean, attribute: 'object-interactive'})
  objectInteractive = false;

  private get resolvedDataType(): ObcPoiObjectDataType {
    switch (this.poiObjectType) {
      case ObcPoiObjectType.Large:
        return ObcPoiObjectDataType.Large;
      default:
        return ObcPoiObjectDataType.Regular;
    }
  }

  protected override renderPoiObject() {
    return html`
      <obc-poi-object-data
        class="poi-object"
        exportparts="background-frame"
        .type=${this.resolvedDataType}
        .objectStyle=${this.objectStyle}
        .state=${this.objectState ?? this.poiObjectState}
        ?interactive=${this.objectInteractive}
      >
        <span
          class="icon"
          style="transform: rotate(${this.relativeDirection}deg);"
        >
          <slot
            ><obi-vessel-generic-default-filled></obi-vessel-generic-default-filled
          ></slot>
        </span>
      </obc-poi-object-data>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-poi-button-data': ObcPoiButtonData;
  }
}
