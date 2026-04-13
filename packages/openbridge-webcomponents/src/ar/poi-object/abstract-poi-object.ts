import {LitElement, TemplateResult, css, html} from 'lit';
import {property} from 'lit/decorators.js';
import './poi-object.js';
import {
  ObcPoiObjectType,
  ObcPoiObjectStyle,
  ObcPoiObjectState,
} from './poi-object.js';

export {ObcPoiObjectType, ObcPoiObjectStyle, ObcPoiObjectState};

/**
 * Base class for POI object components.
 *
 * Wraps `<obc-poi-object>` and provides a common interface for all POI object
 * variants. Subclasses override the `icon` and `baseType` getters to
 * define their specific icon template and type mapping.
 */
export class ObcAbstractPoiObject extends LitElement {
  @property({type: String}) objectStyle: ObcPoiObjectStyle =
    ObcPoiObjectStyle.Regular;

  @property({type: String}) state: ObcPoiObjectState =
    ObcPoiObjectState.Unchecked;

  @property({type: Boolean}) interactive = false;

  /** Icon template to render inside the POI object. Override in subclasses. */
  get icon(): TemplateResult {
    return html`<slot></slot>`;
  }

  /** Maps subclass-specific type enum to base `ObcPoiObjectType`. Override in subclasses. */
  get baseType(): ObcPoiObjectType {
    return ObcPoiObjectType.Regular;
  }

  override render() {
    return html`<obc-poi-object
      exportparts="background-frame"
      .type=${this.baseType}
      .objectStyle=${this.objectStyle}
      .state=${this.state}
      ?interactive=${this.interactive}
    >
      ${this.icon}
    </obc-poi-object>`;
  }

  static override styles = [
    css`
      :host {
        display: contents;
      }

      slot {
        display: flex;
        width: 100%;
        height: 100%;
        align-items: center;
        justify-content: center;
      }
    `,
  ];
}
