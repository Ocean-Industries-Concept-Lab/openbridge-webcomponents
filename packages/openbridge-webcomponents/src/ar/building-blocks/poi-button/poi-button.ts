import {LitElement, html, nothing, unsafeCSS} from 'lit';
import {property} from 'lit/decorators.js';
import compentStyle from './poi-button.css?inline';
import {classMap} from 'lit/directives/class-map.js';
import {ObcArAlertType} from '../../types.js';
import {customElement} from '../../../decorator.js';
import {
  ObcPoiObjectState,
  ObcPoiObjectStyle,
  ObcPoiObjectType,
} from '../poi-object/poi-object.js';
import {
  ObcPoiSelectionFrameState,
  ObcPoiSelectionFrameType,
} from '../poi-selection-frame/poi-selection-frame.js';
import {
  ObcPoiHeaderSize,
  ObcPoiHeaderState,
  ObcPoiHeaderType,
} from '../poi-header/poi-header.js';
import '../poi-selection-frame/poi-selection-frame.js';
import '../poi-header/poi-header.js';

export enum ObcPoiButtonType {
  Button = 'button',
  Enhanced = 'enhanced',
}

export enum ObcPoiButtonLayout {
  Anchored = 'anchored',
  Inline = 'inline',
}

export enum PoiButtonVisualState {
  Unchecked = 'unchecked',
  Checked = 'checked',
  Activated = 'activated',
  Overlapped = 'overlapped',
}

const BUTTON_TOUCH_TARGET_PX = 48;
const ENHANCED_TOUCH_TARGET_PX = 64;
const DEFAULT_ENHANCED_BOX_AREA_THRESHOLD_PX =
  (BUTTON_TOUCH_TARGET_PX * BUTTON_TOUCH_TARGET_PX +
    ENHANCED_TOUCH_TARGET_PX * ENHANCED_TOUCH_TARGET_PX) /
  2;

export function resolvePoiButtonTypeFromBoxSize(
  boxWidthPx: number | null | undefined,
  boxHeightPx: number | null | undefined,
  enhancedAreaThresholdPx: number = DEFAULT_ENHANCED_BOX_AREA_THRESHOLD_PX
): ObcPoiButtonType {
  const width = Number(boxWidthPx);
  const height = Number(boxHeightPx);
  if (
    !Number.isFinite(width) ||
    !Number.isFinite(height) ||
    width <= 0 ||
    height <= 0
  ) {
    return ObcPoiButtonType.Button;
  }

  const area = width * height;
  return area >= enhancedAreaThresholdPx
    ? ObcPoiButtonType.Enhanced
    : ObcPoiButtonType.Button;
}

export interface ObcPoiButtonDataItem {
  value: string;
  label: string;
  unit: string;
}

export interface ObcPoiButtonHeader {
  content?: string;
  label?: string;
  size?: ObcPoiHeaderSize;
  state?: ObcPoiHeaderState;
  type?: ObcPoiHeaderType;
  hasIndicator?: boolean;
}

/**
 * `<obc-poi-button>` - `ObcPoiButton` renders the interactive POI button body, optional header, and data rows.
 *
 * ## Features
 *
 * - Supports button and enhanced visual sizes via `type`.
 * - Supports anchored and inline layouts via `layout`.
 * - Maps POI value state (`unchecked`, `checked`, `activated`, `overlapped`) to object and frame visuals.
 * - Can render optional header (`header`) and metrics/data rows (`data`).
 *
 * Public properties/attributes:
 * - `relativeDirection: number` - Icon rotation in degrees.
 * - `selected: boolean` - Controls selection frame visibility (anchored layout).
 * - `layout: ObcPoiButtonLayout` (attribute: `layout`) - Layout mode (`anchored` or `inline`).
 * - `header: ObcPoiButtonHeader | null` - Optional ID/data header configuration.
 * - `alertType: ObcArAlertType` - Alert styling (`none`, `caution`, `warning`, `alarm`).
 * - `value: PoiButtonVisualState` (attribute: `value`) - Visual state (`unchecked`, `checked`, `activated`, `overlapped`).
 * - `type: ObcPoiButtonType` - Size/variant (`button` or `enhanced`).
 * - `inExpandedGroup: boolean` - Expanded-group styling hint.
 * - `data: ObcPoiButtonDataItem[]` - Optional value/label/unit rows.
 *
 * Public methods:
 * - No imperative public methods; behavior is controlled through reactive properties.
 *
 * ## Usage Guidelines
 *
 * - Use `layout="anchored"` for standalone POI buttons with optional selection frame.
 * - Use `layout="inline"` when composing inside higher-level marker wrappers (for example `obc-poi`).
 * - Provide `data` for metric display variants.
 *
 * ## Slots
 *
 * - Default slot: Main icon/content rendered inside `obc-poi-object`.
 * - `header`: Optional custom header content rendered above the POI object.
 * - `id-label`: Optional custom indicator content for the header indicator slot.
 *
 * ## Events
 *
 * - `click`: Native composed click event from the internal button surface.
 * - Custom events: None.
 *
 * ## Best Practices
 *
 * - Keep `value`, `selected`, and `alertType` synchronized with domain state to avoid mixed visual semantics.
 * - Prefer enum values from `PoiButtonVisualState`, `ObcPoiButtonType`, and `ObcPoiButtonLayout` for consistency.
 * - Use `header` only when label/ID context is needed; omit for icon-only markers.
 *
 * ## Example
 *
 * ```html
 * <obc-poi-button
 *   type="button"
 *   layout="anchored"
 *   value="unchecked"
 *   .selected=${false}
 * >
 *   <obc-icon-pin></obc-icon-pin>
 * </obc-poi-button>
 * ```
 */
@customElement('obc-poi-button')
export class ObcPoiButton extends LitElement {
  @property({type: Number}) relativeDirection = 0;
  @property({type: Boolean}) selected = false;
  @property({type: String, reflect: true}) layout: ObcPoiButtonLayout =
    ObcPoiButtonLayout.Anchored;
  @property({type: Boolean, attribute: 'has-header'}) hasHeader = false;
  @property({type: Object}) header: ObcPoiButtonHeader | null = null;
  @property({type: String}) alertType = ObcArAlertType.None;
  @property({type: String, reflect: true})
  value: PoiButtonVisualState = PoiButtonVisualState.Unchecked;
  @property({type: String}) type = ObcPoiButtonType.Button;
  @property({type: Boolean}) inExpandedGroup = false;
  @property({type: Array, attribute: false}) data: ObcPoiButtonDataItem[] = [];

  get hasData(): boolean {
    return this.data.length > 0;
  }

  private get hasHeaderContent(): boolean {
    return (
      this.querySelector('[slot="header"]') !== null ||
      Boolean(this.header?.content?.trim())
    );
  }

  private get fallbackHeaderState(): ObcPoiHeaderState {
    switch (this.alertType) {
      case ObcArAlertType.Alarm:
        return ObcPoiHeaderState.Alarm;
      case ObcArAlertType.Warning:
        return ObcPoiHeaderState.Warning;
      case ObcArAlertType.Caution:
        return ObcPoiHeaderState.Caution;
      default:
        return ObcPoiHeaderState.Selected;
    }
  }

  protected renderHeader() {
    if (!this.hasHeader) {
      return nothing;
    }

    if (!this.hasHeaderContent) {
      return nothing;
    }

    if (this.querySelector('[slot="header"]')) {
      return html`
        <div class="id-label">
          <slot name="header"></slot>
        </div>
      `;
    }

    return html`
      <div class="id-label">
        <obc-poi-header
          .content=${this.header?.content?.trim() ?? ''}
          .label=${this.header?.label ?? 'Data'}
          .size=${this.header?.size ?? ObcPoiHeaderSize.Regular}
          .state=${this.header?.state ?? this.fallbackHeaderState}
          .type=${this.header?.type ?? ObcPoiHeaderType.Id}
          .hasIndicator=${this.header?.hasIndicator ?? false}
        >
          <slot name="id-label" slot="indicator" part="id-label"></slot>
        </obc-poi-header>
      </div>
    `;
  }

  protected get poiObjectType(): ObcPoiObjectType {
    return this.type === ObcPoiButtonType.Enhanced
      ? ObcPoiObjectType.Large
      : ObcPoiObjectType.Regular;
  }

  protected get poiObjectState(): ObcPoiObjectState {
    if (this.value === PoiButtonVisualState.Overlapped) {
      return ObcPoiObjectState.Overlapped;
    }

    if (this.hasData) {
      if (this.value === PoiButtonVisualState.Activated) {
        return ObcPoiObjectState.Activated;
      }
      if (this.value === PoiButtonVisualState.Checked) {
        return ObcPoiObjectState.StaticChecked;
      }
      return ObcPoiObjectState.StaticUnchecked;
    }

    if (this.value === PoiButtonVisualState.Activated) {
      return ObcPoiObjectState.Activated;
    }
    if (this.value === PoiButtonVisualState.Checked) {
      return ObcPoiObjectState.Checked;
    }

    return ObcPoiObjectState.Unchecked;
  }

  override render() {
    if (this.hasData) {
      return this.renderWithData();
    }
    return this.renderButton();
  }

  protected renderPoiObject() {
    return html`
      <obc-poi-object
        class="poi-object"
        .type=${this.poiObjectType}
        .objectStyle=${ObcPoiObjectStyle.Regular}
        .state=${this.poiObjectState}
        .interactive=${false}
      >
        <span
          class="icon"
          style="transform: rotate(${this.relativeDirection}deg);"
        >
          <slot></slot>
        </span>
      </obc-poi-object>
    `;
  }

  protected renderButton() {
    return html`
      <button
        type="button"
        class=${classMap({
          wrapper: true,
          selected: this.selected,
          [`alert-${this.alertType}`]: true,
          [`type-${this.type}`]: true,
          expanded: this.inExpandedGroup,
        })}
      >
        ${this.renderHeader()}
        <div class="button-wrapper">
          ${this.renderSelectionFrame()} ${this.renderPoiObject()}
          <div class="alert-ring"></div>
        </div>
      </button>
    `;
  }

  protected renderWithData() {
    return html`
      <button
        type="button"
        class=${classMap({
          wrapper: true,
          'has-data': true,
          selected: this.selected,
          'has-header': this.hasHeader && this.hasHeaderContent,
          [`alert-${this.alertType}`]: true,
          [`type-${this.type}`]: true,
          expanded: this.inExpandedGroup,
        })}
      >
        ${this.renderHeader()}
        <div class="data-wrapper">
          ${this.data.map(
            (item) =>
              html`<div class="data">
                <div class="value">${item.value}</div>
                <div class="label">${item.label}</div>
                <div class="unit">${item.unit}</div>
              </div>`
          )}
        </div>
        <div class="button-wrapper">
          ${this.renderSelectionFrame()} ${this.renderPoiObject()}
        </div>
        <div class="alert-ring"></div>
      </button>
    `;
  }

  protected get selectionFrameType(): ObcPoiSelectionFrameType {
    return this.type === ObcPoiButtonType.Enhanced
      ? ObcPoiSelectionFrameType.Enhanced
      : ObcPoiSelectionFrameType.Button;
  }

  protected get selectionFrameState(): ObcPoiSelectionFrameState {
    return this.alertType === ObcArAlertType.None
      ? ObcPoiSelectionFrameState.Regular
      : ObcPoiSelectionFrameState.Alert;
  }

  protected renderSelectionFrame() {
    if (!this.selected || this.layout === ObcPoiButtonLayout.Inline) {
      return nothing;
    }

    return html`
      <obc-poi-selection-frame
        class="selection-frame"
        .type=${this.selectionFrameType}
        .state=${this.selectionFrameState}
      ></obc-poi-selection-frame>
    `;
  }

  static override styles = unsafeCSS(compentStyle);
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-poi-button': ObcPoiButton;
  }
}
