import {LitElement, html, nothing, unsafeCSS} from 'lit';
import {property} from 'lit/decorators.js';
import compentStyle from './poi-button.css?inline';
import {classMap} from 'lit/directives/class-map.js';
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
import '../poi-selection-frame/poi-selection-frame.js';

export enum ObcPoiButtonType {
  Button = 'button',
  Enhanced = 'enhanced',
}

export enum ObcPoiButtonLayout {
  Anchored = 'anchored',
  Inline = 'inline',
}

export enum ObcPoiButtonState {
  Enabled = 'enabled',
  Caution = 'caution',
  Warning = 'warning',
  Alarm = 'alarm',
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

/**
 * `<obc-poi-button>` - Marker button component that renders an icon target with optional header and data rows.
 *
 * ## Overview
 * Use this component when you need a button-style marker that can show stateful framing and optional metric rows.
 * Keywords/synonyms: marker button, target button, icon target, POI button.
 *
 * ## Features/Variants
 * - `type` (default `button`): `button` or `enhanced` size.
 * - `layout` (default `anchored`): `anchored` or `inline`.
 * - `value` (default `unchecked`): `unchecked`, `checked`, `activated`, `overlapped`.
 * - `state` (default `enabled`): `enabled`, `caution`, `warning`, `alarm`.
 * - `selected` (default `false`): shows selection frame in anchored layout.
 * - `relativeDirection` (default `0`): rotates default-slot icon content in degrees.
 * - `data` (default `[]`): when non-empty, renders value/label/unit rows.
 * - `hasHeader` + `header` slot: renders a header area and syncs slotted `obc-poi-header` state.
 * - `inExpandedGroup` (default `false`): applies `expanded` CSS class.
 * - TODO(designer): Confirm intended UX semantics for `inExpandedGroup` beyond styling.
 *
 * ## Usage Guidelines
 * - Use `layout="anchored"` for standalone marker buttons.
 * - Use `layout="inline"` when this component is embedded in a larger marker composition.
 * - Provide `data` only when metric rows are needed.
 *
 * ## Slots/Content
 * - Default slot: Icon/content rendered inside `obc-poi-object`.
 * - `header`: Optional header content rendered above the marker body.
 *
 * ## Events
 * This component does not emit custom events.
 * Native `click` is available from the internal `<button>`.
 *
 * ## Best Practices
 * - Keep `value`, `state`, and `selected` synchronized to avoid conflicting visual states.
 * - Prefer enum values for `type`, `layout`, `state`, and `value`.
 *
 * ## Example
 * ```html
 * <obc-poi-button type="button" layout="anchored" value="checked" selected>
 *   <obi-placeholder></obi-placeholder>
 *   <obc-poi-header slot="header" content="1"></obc-poi-header>
 * </obc-poi-button>
 * ```
 *
 * @slot - Icon/content rendered inside `obc-poi-object`.
 * @slot header - Optional header content rendered above the marker body.
 */
@customElement('obc-poi-button')
export class ObcPoiButton extends LitElement {
  @property({type: Number}) relativeDirection = 0;
  @property({type: Boolean}) selected = false;
  @property({type: String, reflect: true}) layout: ObcPoiButtonLayout =
    ObcPoiButtonLayout.Anchored;
  @property({type: Boolean, reflect: true, attribute: 'has-header'})
  hasHeader = false;
  @property({type: String, reflect: true})
  state: ObcPoiButtonState = ObcPoiButtonState.Enabled;
  @property({type: String, reflect: true})
  value: PoiButtonVisualState = PoiButtonVisualState.Unchecked;
  @property({type: String}) type = ObcPoiButtonType.Button;
  @property({type: Boolean}) inExpandedGroup = false;
  @property({type: Array, attribute: false}) data: ObcPoiButtonDataItem[] = [];

  get hasData(): boolean {
    return this.data.length > 0;
  }

  private get alertClassSuffix(): string {
    if (this.state === ObcPoiButtonState.Enabled) {
      return 'none';
    }
    return this.state;
  }

  private get resolvedHeaderState(): string {
    switch (this.state) {
      case ObcPoiButtonState.Caution:
        return 'caution';
      case ObcPoiButtonState.Warning:
        return 'warning';
      case ObcPoiButtonState.Alarm:
        return 'alarm';
      case ObcPoiButtonState.Enabled:
      default:
        return 'selected';
    }
  }

  private get hasHeaderContent(): boolean {
    return this.querySelector('[slot="header"]') !== null;
  }

  private syncSlottedHeaderState() {
    const headerSlot = this.renderRoot.querySelector(
      'slot[name="header"]'
    ) as HTMLSlotElement | null;
    if (!headerSlot) {
      return;
    }

    const state = this.resolvedHeaderState;
    const assigned = headerSlot.assignedElements({flatten: true});
    const headers = new Set<HTMLElement>();

    for (const element of assigned) {
      if (element.matches('obc-poi-header')) {
        headers.add(element as HTMLElement);
      }
      for (const nested of element.querySelectorAll('obc-poi-header')) {
        headers.add(nested as HTMLElement);
      }
    }

    for (const header of headers) {
      (header as {state?: string}).state = state;
      header.setAttribute('state', state);
    }
  }

  private handleHeaderSlotChange = () => {
    this.syncSlottedHeaderState();
  };

  protected override updated(_changedProperties: Map<string, unknown>) {
    this.syncSlottedHeaderState();
  }

  protected renderHeader() {
    if (!this.hasHeader || !this.hasHeaderContent) {
      return nothing;
    }

    return html`
      <div class="id-label">
        <slot name="header" @slotchange=${this.handleHeaderSlotChange}></slot>
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
          [`alert-${this.alertClassSuffix}`]: true,
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
          [`alert-${this.alertClassSuffix}`]: true,
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
    return this.state === ObcPoiButtonState.Enabled
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
