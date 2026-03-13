import {html} from 'lit';
import {property} from 'lit/decorators.js';
import {customElement} from '../../decorator.js';
import {ObcPoiButton} from '../building-blocks/poi-button/poi-button.js';
import {ObcPoiObjectType} from '../building-blocks/poi-object/poi-object.js';
import '../poi-object-aton/poi-object-aton.js';
import {
  ObcPoiObjectAtonType,
  ObcPoiObjectAtonStyle,
  ObcPoiObjectAtonState,
} from '../poi-object-aton/poi-object-aton.js';

export {ObcPoiObjectAtonType, ObcPoiObjectAtonStyle, ObcPoiObjectAtonState};

/**
 * `<obc-poi-button-aton>` - A poi-button variant that renders an AtoN diamond
 * instead of the default round `obc-poi-object`.
 *
 * Inherits all selection frame, header, data, and alert behavior from
 * `obc-poi-button`.
 *
 * @slot - Icon content forwarded to the inner aton diamond.
 * @slot header - Optional header content.
 * @slot relation - Optional relation icon/content in data mode.
 */
@customElement('obc-poi-button-aton')
export class ObcPoiButtonAton extends ObcPoiButton {
  @property({type: String, attribute: 'aton-type'})
  atonType: ObcPoiObjectAtonType = ObcPoiObjectAtonType.AtoN;

  @property({type: String, attribute: 'aton-style'})
  atonStyle: ObcPoiObjectAtonStyle = ObcPoiObjectAtonStyle.Regular;

  @property({type: String, attribute: 'aton-state'})
  atonState: ObcPoiObjectAtonState | null = null;

  @property({type: Boolean, attribute: 'aton-interactive'})
  atonInteractive = false;

  /**
   * Maps the button's computed `poiObjectType` (Regular/Large) to the
   * aton type enum.  When the aton is in diamond mode (`AtoN`) the type
   * is fixed — otherwise it follows the button size.
   */
  private get resolvedAtonType(): ObcPoiObjectAtonType {
    if (this.atonType === ObcPoiObjectAtonType.AtoN) {
      return ObcPoiObjectAtonType.AtoN;
    }
    switch (this.poiObjectType) {
      case ObcPoiObjectType.Large:
        return ObcPoiObjectAtonType.Large;
      default:
        return this.atonType;
    }
  }

  protected override renderPoiObject() {
    return html`
      <obc-poi-object-aton
        class="poi-object"
        exportparts="background-frame"
        .type=${this.resolvedAtonType}
        .objectStyle=${this.atonStyle}
        .state=${this.atonState ?? this.poiObjectState}
        ?interactive=${this.atonInteractive}
      >
        <slot></slot>
      </obc-poi-object-aton>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-poi-button-aton': ObcPoiButtonAton;
  }
}
