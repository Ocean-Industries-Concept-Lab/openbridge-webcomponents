import {LitElement, TemplateResult, html} from 'lit';
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

  /** Extra CSS classes for type-specific styling. Override in subclasses. */
  get extraClasses(): Record<string, boolean> {
    return {};
  }

  override render() {
    return html`<obc-poi-object
      .type=${this.baseType}
      .objectStyle=${this.objectStyle}
      .state=${this.state}
      ?interactive=${this.interactive}
      .extraClasses=${this.extraClasses}
    >
      ${this.icon}
    </obc-poi-object>`;
  }
}
