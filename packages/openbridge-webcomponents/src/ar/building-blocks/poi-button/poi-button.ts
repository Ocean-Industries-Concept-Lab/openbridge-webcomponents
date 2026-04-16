import {LitElement, html, nothing, unsafeCSS} from 'lit';
import {property} from 'lit/decorators.js';
import compentStyle from './poi-button.css?inline';
import {classMap} from 'lit/directives/class-map.js';
import {customElement} from '../../../decorator.js';
import '../poi-header/poi-header.js';
import {ObcPoiHeaderState, ObcPoiHeaderType} from '../poi-header/poi-header.js';
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
 * - `overlapOpaque` (default `false`): controls overlapped opacity mode (`false` = translucent, `true` = opaque).
 * - `state` (default `enabled`): `enabled`, `caution`, `warning`, `alarm`.
 * - `selected` (default `false`): shows selection frame in anchored layout.
 * - `relativeDirection` (default `0`): rotates default-slot icon content in degrees.
 * - `data` (default `[]`): when non-empty, renders value/label/unit rows.
 * - `hasHeader` + `header` slot: renders a header area and syncs slotted `obc-poi-header` state.
 * - `hasRelation` (default `false`): enables optional relation content in data mode.
 * - `inExpandedGroup` (default `false`): applies `expanded` CSS class.
 * - TODO(designer): Confirm intended UX semantics for `inExpandedGroup` beyond styling.
 *
 * ## Usage Guidelines
 * - Use `layout="anchored"` for standalone marker buttons.
 * - Use `layout="inline"` when this component is embedded in a larger marker composition.
 * - Provide `data` for metric display variants.
 * - Enable `hasRelation` only when relation slot content is provided.
 *
 * ## Slots/Content
 * - Default slot: Icon/content rendered inside `obc-poi-object`.
 * - `header`: Optional header content rendered above the marker body.
 * - `relation`: Optional relation icon/content rendered when `hasRelation` is true in data mode.
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
 * @slot relation - Optional relation icon/content in data mode when `hasRelation` is true.
 */
@customElement('obc-poi-button')
export class ObcPoiButton extends LitElement {
  @property({type: Number}) relativeDirection = 0;
  @property({type: Boolean}) selected = false;
  @property({type: String}) layout: ObcPoiButtonLayout =
    ObcPoiButtonLayout.Anchored;
  @property({type: Boolean})
  hasHeader = false;
  @property({type: String})
  state: ObcPoiButtonState = ObcPoiButtonState.Enabled;
  @property({type: String})
  value: PoiButtonVisualState = PoiButtonVisualState.Unchecked;
  @property({type: Boolean})
  overlapOpaque = false;
  @property({type: String}) type = ObcPoiButtonType.Button;
  @property({type: Boolean}) inExpandedGroup = false;
  @property({type: Array, attribute: false}) data: ObcPoiButtonDataItem[] = [];
  @property({type: Boolean}) hasRelation = false;
  @property({type: String, attribute: 'header-content'}) headerContent = '';
  private headerContentObserver?: MutationObserver;

  override connectedCallback() {
    super.connectedCallback();
    this.setupHeaderContentObserver();
  }

  override disconnectedCallback() {
    super.disconnectedCallback();
    this.headerContentObserver?.disconnect();
    this.headerContentObserver = undefined;
  }

  private setupHeaderContentObserver() {
    this.headerContentObserver?.disconnect();
    this.headerContentObserver = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        if (mutation.type === 'childList') {
          this.requestUpdate();
          return;
        }
        if (
          mutation.type === 'attributes' &&
          mutation.target instanceof HTMLElement &&
          mutation.target.getAttribute('slot') === 'header'
        ) {
          this.requestUpdate();
          return;
        }
      }
    });
    this.headerContentObserver.observe(this, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['slot'],
    });
  }

  get hasData(): boolean {
    return this.data.length > 0;
  }

  private get alertClassSuffix(): string {
    if (this.state === ObcPoiButtonState.Enabled) {
      return 'none';
    }
    return this.state;
  }

  private get resolvedHeaderState(): ObcPoiHeaderState {
    switch (this.state) {
      case ObcPoiButtonState.Caution:
        return ObcPoiHeaderState.Caution;
      case ObcPoiButtonState.Warning:
        return ObcPoiHeaderState.Warning;
      case ObcPoiButtonState.Alarm:
        return ObcPoiHeaderState.Alarm;
      case ObcPoiButtonState.Enabled:
      default:
        return ObcPoiHeaderState.Selected;
    }
  }

  private get hasHeaderContent(): boolean {
    return this.querySelector('[slot="header"]') !== null;
  }

  private get hasGeneratedHeaderContent(): boolean {
    return this.headerContent.trim().length > 0;
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
    if (
      !this.hasHeader ||
      (!this.hasHeaderContent && !this.hasGeneratedHeaderContent)
    ) {
      return nothing;
    }

    return html`
      <div class="id-label">
        ${this.hasHeaderContent
          ? html`<slot
              name="header"
              @slotchange=${this.handleHeaderSlotChange}
            ></slot>`
          : html`<obc-poi-header
              .content=${this.headerContent}
              .state=${this.resolvedHeaderState}
              .type=${ObcPoiHeaderType.Id}
            ></obc-poi-header>`}
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

    if (this.state === ObcPoiButtonState.Caution)
      return ObcPoiObjectState.Caution;
    if (this.state === ObcPoiButtonState.Warning)
      return ObcPoiObjectState.Warning;
    if (this.state === ObcPoiButtonState.Alarm) return ObcPoiObjectState.Alarm;

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

  protected get wrapperVariantClasses(): Record<string, boolean> {
    return {};
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
        exportparts="icon"
      >
        <span
          class="icon"
          part="icon"
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
          [`value-${this.value}`]: true,
          [`layout-${this.layout}`]: true,
          'overlap-opaque': this.overlapOpaque,
          expanded: this.inExpandedGroup,
          ...this.wrapperVariantClasses,
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
          'has-header':
            this.hasHeader &&
            (this.hasHeaderContent || this.hasGeneratedHeaderContent),
          [`alert-${this.alertClassSuffix}`]: true,
          [`type-${this.type}`]: true,
          [`value-${this.value}`]: true,
          [`layout-${this.layout}`]: true,
          'overlap-opaque': this.overlapOpaque,
          expanded: this.inExpandedGroup,
          ...this.wrapperVariantClasses,
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
        ${this.hasRelation
          ? html`<div class="relation-wrapper" part="relation-wrapper">
              <slot name="relation" class="relation" part="relation"></slot>
            </div>`
          : nothing}
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
