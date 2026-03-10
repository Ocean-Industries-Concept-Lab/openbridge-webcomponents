import {css} from 'lit';
import {customElement} from '../../decorator.js';
import {ObcAbstractPoiObject} from '../building-blocks/poi-object/abstract-poi-object.js';
import {
  ObcPoiObjectType,
  ObcPoiObjectStyle,
  ObcPoiObjectState,
} from '../building-blocks/poi-object/poi-object.js';

export {ObcPoiObjectType as ObcPoiObjectDataType};
export {ObcPoiObjectStyle as ObcPoiObjectDataStyle};
export {ObcPoiObjectState as ObcPoiObjectDataState};

/**
 * `<obc-poi-object-data>` - Data variant of the POI object marker.
 *
 * Uses the standard round marker shape from the base `obc-poi-object`.
 * This component exists so that the "data" variant has an explicit
 * object-level component, matching the pattern of `obc-poi-object-aton`
 * and `obc-poi-object-vessel`.
 *
 * @slot - Icon content rendered inside the POI object.
 */
@customElement('obc-poi-object-data')
export class ObcPoiObjectData extends ObcAbstractPoiObject {
  static override styles = css`
    :host {
      display: contents;
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-poi-object-data': ObcPoiObjectData;
  }
}
