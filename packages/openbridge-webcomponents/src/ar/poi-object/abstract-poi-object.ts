import {LitElement, TemplateResult, html} from 'lit';
import {property} from 'lit/decorators.js';
import './poi-object.js';
import {
  ObcPoiObjectType,
  ObcPoiObjectStyle,
  ObcPoiObjectState,
} from './poi-object.js';

// Re-export enums for convenience - consumers can import from abstract class
export {ObcPoiObjectType, ObcPoiObjectStyle, ObcPoiObjectState};

/**
 * Abstract base class for POI object components.
 *
 * This class wraps `<obc-poi-object>` and provides a common interface for
 * all POI object variants. Subclasses must implement the `icon` getter to
 * provide their specific icon template.
 *
 * ## Usage
 *
 * Extend this class and implement the abstract `icon` and `baseType` getters:
 *
 * ```typescript
 * export class ObcPoiObjectVessel extends ObcAbstractPoiObject {
 *   type: ObcPoiObjectVesselType = ObcPoiObjectVesselType.Regular;
 *
 *   get icon(): TemplateResult {
 *     return html`<slot></slot>`;
 *   }
 *
 *   get baseType(): ObcPoiObjectType {
 *     // Map vessel-specific types to base types
 *     if (this.type === ObcPoiObjectVesselType.SpeedRot) {
 *       return ObcPoiObjectType.Large;
 *     }
 *     return this.type as unknown as ObcPoiObjectType;
 *   }
 * }
 * ```
 */
export abstract class ObcAbstractPoiObject extends LitElement {
  @property({type: String}) objectStyle: ObcPoiObjectStyle =
    ObcPoiObjectStyle.Regular;

  @property({type: String}) state: ObcPoiObjectState =
    ObcPoiObjectState.Unchecked;

  /** Enables button behavior with hover/active states and keyboard support. */
  @property({type: Boolean}) interactive = false;

  /**
   * Returns the icon template to render inside the POI object.
   * Subclasses must implement this getter.
   */
  abstract get icon(): TemplateResult;

  /**
   * Returns the base type to pass to obc-poi-object.
   *
   * Subclasses must implement this to map their specific type enum to
   * the base `ObcPoiObjectType`. This allows subclasses to define custom
   * type variants (like `SpeedRot` for vessels) that map to base types.
   *
   * @example
   * ```typescript
   * // In a subclass with custom type enum:
   * get baseType(): ObcPoiObjectType {
   *   switch (this.type) {
   *     case MyPoiType.Regular:
   *       return ObcPoiObjectType.Regular;
   *     case MyPoiType.CustomVariant:
   *       return ObcPoiObjectType.Large;
   *     default:
   *       throw new Error(`Invalid type: ${this.type}`);
   *   }
   * }
   * ```
   */
  abstract get baseType(): ObcPoiObjectType;

  /**
   * Returns extra CSS classes to add to the wrapper.
   * Subclasses can override this to add type-specific classes.
   */
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
