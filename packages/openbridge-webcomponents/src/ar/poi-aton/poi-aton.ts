import {html} from 'lit';
import {property} from 'lit/decorators.js';
import {customElement} from '../../decorator.js';
import '../poi-button-aton/poi-button-aton.js';
import {ObcPoiBase} from '../building-blocks/poi/poi-base.js';
import {
  ObcPoiObjectAtonType,
  ObcPoiObjectAtonStyle,
  ObcPoiObjectAtonState,
} from '../poi-object-aton/poi-object-aton.js';

export {ObcPoiObjectAtonType, ObcPoiObjectAtonStyle, ObcPoiObjectAtonState};

/**
 * `<obc-poi-aton>` - AtoN marker variant with layout positioning and layer integration.
 *
 * Extends `ObcPoiBase` to provide the "aton" variant of the POI system.
 * Renders `<obc-poi>` with a slotted `<obc-poi-button-aton>`.
 *
 * @slot - Icon content forwarded to the inner aton diamond.
 * @slot header - Optional header content forwarded to the poi button.
 * @fires obc-poi-data-layout-change {CustomEvent<void>} Fired when layout-driving properties change.
 */
@customElement('obc-poi-aton')
export class ObcPoiAton extends ObcPoiBase {
  @property({type: String, attribute: 'aton-type'})
  atonType: ObcPoiObjectAtonType = ObcPoiObjectAtonType.AtoN;

  @property({type: String, attribute: 'aton-style'})
  atonStyle: ObcPoiObjectAtonStyle = ObcPoiObjectAtonStyle.Regular;

  @property({type: String, attribute: 'aton-state'})
  atonState: ObcPoiObjectAtonState = ObcPoiObjectAtonState.Unchecked;

  @property({type: Boolean, attribute: 'aton-interactive'})
  atonInteractive = false;

  protected override getVisualNodes() {
    return this.queryVisualNodes('obc-poi', 'obc-poi-button-aton');
  }

  protected override renderButtonSlot() {
    return html`
      <obc-poi-button-aton
        slot="button"
        .atonType=${this.atonType}
        .atonStyle=${this.atonStyle}
        .atonState=${this.atonState}
        .atonInteractive=${this.atonInteractive}
      >
        <slot></slot>
        ${this.hasHeader
          ? html`<slot name="header" slot="header"></slot>`
          : null}
      </obc-poi-button-aton>
    `;
  }

  static override styles = ObcPoiBase.styles;
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-poi-aton': ObcPoiAton;
  }
}
