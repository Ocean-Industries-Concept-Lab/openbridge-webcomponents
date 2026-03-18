import {LitElement, TemplateResult, css, html} from 'lit';
import {property} from 'lit/decorators.js';
import {styleMap, StyleInfo} from 'lit/directives/style-map.js';
import './poi-object.js';
import {
  ObcPoiObjectType,
  ObcPoiObjectStyle,
  ObcPoiObjectState,
} from './poi-object.js';

export {ObcPoiObjectType, ObcPoiObjectStyle, ObcPoiObjectState};

const CATEGORICAL_STYLE_VARS: StyleInfo = {
  '--overlay-container-background-color': 'var(--base-blue-100)',
  '--overlay-border-outline-color': 'var(--base-blue-200)',
  '--normal-enabled-background-color': 'var(--base-blue-100)',
  '--normal-enabled-border-color': 'var(--base-blue-200)',
  '--flat-enabled-background-color': 'var(--base-blue-100)',
  '--flat-enabled-border-color': 'var(--base-blue-200)',
  '--flat-hover-background-color':
    'color-mix(in srgb, var(--base-blue-100) 85%, white)',
  '--flat-pressed-background-color':
    'color-mix(in srgb, var(--base-blue-100) 75%, white)',
};

/**
 * Base class for POI object components.
 *
 * Wraps `<obc-poi-object>` and provides a common interface for all POI object
 * variants. Subclasses override the `icon` and `baseType` getters to
 * define their specific icon template and type mapping.
 */
export class ObcAbstractPoiObject extends LitElement {
  @property({type: String}) objectStyle: string = ObcPoiObjectStyle.Regular;

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

  /** CSS custom property overrides for the inner `<obc-poi-object>`. Override in subclasses for custom color schemes. */
  get colorStyleVars(): StyleInfo {
    if (this.objectStyle === ObcPoiObjectStyle.Categorical) {
      return CATEGORICAL_STYLE_VARS;
    }
    return {};
  }

  override render() {
    return html`<obc-poi-object
      exportparts="background-frame"
      style=${styleMap(this.colorStyleVars)}
      .type=${this.baseType}
      .objectStyle=${this.objectStyle as ObcPoiObjectStyle}
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
