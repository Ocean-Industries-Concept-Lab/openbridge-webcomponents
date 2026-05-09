import {LitElement, html, nothing, unsafeCSS} from 'lit';
import {property} from 'lit/decorators.js';
import {classMap} from 'lit/directives/class-map.js';
import {styleMap} from 'lit/directives/style-map.js';
import componentStyle from './poi.css?inline';
import '../poi-button/poi-button.js';
import {
  ObcPoiButtonType,
  ObcPoiButtonDataItem,
  ObcPoiButtonState,
  PoiButtonVisualState,
} from '../poi-button/poi-button.js';
import {ObcPoiHeaderState} from '../building-blocks/poi-header/poi-header.js';
import {POIStyle} from '../building-blocks/poi-graphic-line/poi-graphic-line.js';
import {poiArrow} from './arrow.js';
import '../building-blocks/poi-line/poi-line.js';
import '../building-blocks/poi-pointer/poi-pointer.js';
import {
  ObcPoiPointerState,
  ObcPoiPointerType,
} from '../building-blocks/poi-pointer/poi-pointer.js';
import {customElement} from '../../decorator.js';

/* ---------- Poi interface & helpers ---------- */

export enum PoiDataVisualRectPreference {
  Largest = 'largest',
  Group = 'group',
  Anchor = 'anchor',
  Size = 'size',
}

export const POI_ATTR = 'data-poi-target';

type PoiVisualElementPreference =
  | PoiDataVisualRectPreference.Group
  | PoiDataVisualRectPreference.Anchor
  | PoiDataVisualRectPreference.Size;

/**
 * Minimum contract for any element that can participate in
 * `obc-poi-layer` grouping / overlap / crossing / stack selection.
 *
 * Implement this interface and set `data-poi-target` on the host
 * element in `connectedCallback` to make a component layer-compatible.
 */
export interface Poi extends HTMLElement {
  /* Position — required by layer for positioning and grouping */
  x: number;
  y: number;
  buttonOffsetX: number;
  targetOffsetX: number;
  fixedTarget: boolean;

  /* State — read/written by layer and stack */
  selected: boolean;
  value: string;

  /* Visual query — used by layer for rect-based grouping */
  getVisualRect(preference: PoiDataVisualRectPreference): DOMRect;
  getVisualElement(preference: PoiVisualElementPreference): HTMLElement;
  getPointerElement(): HTMLElement | null;

  /* Optional — layer/group code guards access before using */
  buttonY?: number | null;
  buttonType?: string;
  data?: unknown[];
  hasHeader?: boolean;
  headerContent?: string;
  animatePosition?: boolean;
  refreshProjectionLayout?: (trackDurationMs?: number) => void;
  setRuntimeHorizontalOffsets?: (
    buttonOffsetX: number,
    targetOffsetX?: number
  ) => void;
}

export function isPoi(el: Element): el is Poi {
  return el.hasAttribute(POI_ATTR);
}

/* ---------- ObcPoi enums ---------- */

export enum ObcPoiType {
  Line = 'line',
  Offset = 'offset',
  Point = 'point',
  Outside = 'outside',
}

export enum ObcPoiValue {
  Unchecked = 'unchecked',
  Checked = 'checked',
  Activated = 'activated',
  Overlapped = 'overlapped',
}

export enum ObcPoiState {
  Enabled = 'enabled',
  Caution = 'caution',
  Warning = 'warning',
  Alarm = 'alarm',
}

const DEFAULT_LINE_LENGTH_PX = 96;
const POINTER_BOX_BASE_SIZE_PX = 32;
const POINT_POINTER_OFFSET_PX = 12;

/**
 * `<obc-poi>` - Composite marker component that renders a target button with connector and pointer visuals.
 *
 * ## Overview
 * Combines `obc-poi-button`, `obc-poi-line`, and optional pointer visuals to display
 * interactive marker/callout targets in line, offset, point, or outside modes.
 * Keywords: marker, callout, pin, label, target, pointer.
 *
 * ## Features/Variants
 *
 * Configuration defaults and behavior:
 * - `type` (default: `line`):
 *   - `line`: renders a vertical connector line from button to target.
 *   - `offset`: renders a bent connector using `targetOffsetX - buttonOffsetX`.
 *   - `point`: suppresses long connector behavior (line can collapse/skip based on state).
 *   - `outside`: suppresses connector line; outside arrow is rendered when `hasPointer` is true.
 * - `value` (default: `unchecked`):
 *   - `unchecked`: default visual state.
 *   - `checked`: selected-like visual and pointer behavior.
 *   - `activated`: activated button visual state with selected-like pointer behavior.
 *   - `overlapped`: compact overlap visual state.
 * - `overlapOpaque` (default: `false`): controls overlapped opacity mode (`false` = translucent, `true` = opaque).
 * - `state` (default: `enabled`):
 *   - `enabled`: neutral alert ring and regular line style.
 *   - `caution`/`warning`/`alarm`: applies alert-specific button/line styling.
 *   - In `enabled`, pointer type resolution defaults to point.
 * - `selected` (default: `false`): enables selected emphasis semantics (for example selected line style when not in alert state).
 * - `hasPointer` (default: `false`):
 *   - For `line`/`offset`/`point`, pointer visuals are shown when `hasPointer` is true.
 *   - Checked-like values also force inline pointer visuals for non-`outside` types.
 *   - For `outside`, `hasPointer` controls outside-arrow visibility.
 * - `pointerType` (default: `null`, enum `point | button | camera`):
 *   - Used when not in checked-like state and not `enabled`.
 *   - Otherwise resolves to `point` for consistent selected/enabled behavior.
 * - `pointerState` (default: `null`, enum `regular | selected | active | uncertain`):
 *   - Checked-like non-`outside` values resolve to `selected`.
 *   - Otherwise falls back to provided `pointerState` or `regular`.
 *
 * Motion and layout notes:
 * - `animatePosition` (default: `false`): when true, enables short position transition timing for line/pointer movement.
 * - `x` (default: `0`): host horizontal position; sets `--obc-poi-x` as `${x}px`.
 * - `y` (default: `96`): absolute local target Y; non-finite values fall back to `0` in geometry calculations.
 * - `buttonY` (default: `0`): when `fixedTarget=false`, anchors the button at its local Y while the target is derived below it from `y`; when `fixedTarget=true`, preserves the legacy host-anchor behavior.
 * - `buttonOffsetX`/`targetOffsetX` (defaults: `0`/`0`): define connector bend delta via `targetOffsetX - buttonOffsetX`.
 * - `boxWidth`/`boxHeight` (defaults: `null`/`null`): optional pointer frame size extras; invalid/non-finite values are ignored.
 * - `outsideAngle` (default: `315`): controls outside-arrow direction in `outside` mode.
 *
 * ## Usage Guidelines
 *
 * - Use `type="line"` or `type="offset"` when the button should connect to a remote target.
 * - Use `type="point"` for near-target placements where connector emphasis should be minimal.
 * - Use `type="outside"` with `hasPointer` for off-screen or directional guidance.
 * - Keep `value`, `state`, and `selected` aligned with domain state so visual semantics stay consistent.
 * - Provide finite numbers for layout props (`x`, `y`, `buttonY`, offsets) for predictable placement.
 *
 * ## Slots/Content
 *
 * - Default slot: Main icon/content rendered inside `obc-poi-button`.
 * - `header`: Optional custom header content rendered above the POI object.
 *
 * ## Events
 *
 * This component does not emit custom events.
 *
 * ## Best Practices
 *
 * - Pass finite numeric values for layout properties to avoid fallback-to-zero behavior.
 * - Enable `animatePosition` only for intentional motion transitions and moving targets.
 * - Prefer enum values for `type`, `value`, `state`, `pointerType`, and `pointerState`.
 *
 * ## Example
 *
 * ```html
 * <obc-poi type="line" value="unchecked" state="enabled">
 *   <obi-placeholder></obi-placeholder>
 * </obc-poi>
 * ```
 *
 * @slot - Default POI button content.
 * @slot header - Optional custom header content.
 */
@customElement('obc-poi')
export class ObcPoi extends LitElement {
  @property({type: String}) type: ObcPoiType = ObcPoiType.Line;
  @property({type: String}) value: ObcPoiValue = ObcPoiValue.Unchecked;
  @property({type: String}) state: ObcPoiState = ObcPoiState.Enabled;
  @property({type: Boolean}) selected = false;
  @property({type: String}) buttonType = ObcPoiButtonType.Button;
  @property({type: Boolean, attribute: 'overlap-opaque'})
  overlapOpaque = false;
  @property({type: Array, attribute: false}) data: ObcPoiButtonDataItem[] = [];
  @property({type: Boolean, attribute: 'has-header'}) hasHeader = false;
  @property({type: String, attribute: 'header-content'}) headerContent = '';
  @property({type: Boolean}) hasPointer = false;
  @property({type: String, attribute: 'pointer-type'})
  pointerType: ObcPoiPointerType | null = null;
  @property({type: String, attribute: 'pointer-state'})
  pointerState: ObcPoiPointerState | null = null;
  @property({type: Number}) relativeDirection = 0;
  @property({type: Number}) x = 0;
  @property({type: Number}) y = DEFAULT_LINE_LENGTH_PX;
  @property({type: Number, attribute: 'button-y'}) buttonY: number | null = 0;
  @property({type: Boolean, attribute: 'fixed-target'}) fixedTarget = false;
  @property({type: Number, attribute: 'button-offset-x'}) buttonOffsetX = 0;
  @property({type: Number, attribute: 'target-offset-x'}) targetOffsetX = 0;
  @property({type: Number, attribute: 'box-width'}) boxWidth: number | null =
    null;
  @property({type: Number, attribute: 'box-height'}) boxHeight: number | null =
    null;
  @property({type: Number, attribute: 'outside-angle'}) outsideAngle = 315;
  @property({type: Boolean, attribute: 'animate-position'})
  animatePosition = false;
  private headerObserver?: MutationObserver;

  override connectedCallback() {
    super.connectedCallback();
    this.setupHeaderObserver();
  }

  override disconnectedCallback() {
    super.disconnectedCallback();
    this.headerObserver?.disconnect();
    this.headerObserver = undefined;
  }

  private setupHeaderObserver() {
    this.headerObserver?.disconnect();
    this.headerObserver = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        if (mutation.type === 'childList') {
          this.syncFallbackButtonHeaderContent();
          this.syncAttachedHeaderState();
          return;
        }
        if (
          mutation.type === 'attributes' &&
          mutation.target instanceof HTMLElement &&
          mutation.target.getAttribute('slot') === 'header'
        ) {
          this.syncFallbackButtonHeaderContent();
          this.syncAttachedHeaderState();
          return;
        }
      }
    });
    this.headerObserver.observe(this, {
      childList: true,
      attributes: true,
      attributeFilter: ['slot'],
    });
  }

  private updatePosition() {
    this.style.removeProperty('top');
    if (this.fixedTarget) {
      this.style.removeProperty('--obc-poi-button-y');
      if (Number.isFinite(this.resolvedButtonY)) {
        this.style.setProperty(
          '--obc-poi-y',
          `${this.resolvedButtonY - this.resolvedTargetY}px`
        );
      } else {
        this.style.removeProperty('--obc-poi-y');
      }
    } else if (Number.isFinite(this.resolvedButtonY)) {
      this.style.setProperty('--obc-poi-y', `${this.resolvedButtonY}px`);
      this.style.setProperty('--obc-poi-button-y', '0px');
    } else {
      this.style.removeProperty('--obc-poi-y');
      this.style.removeProperty('--obc-poi-button-y');
    }
  }

  private get isCheckedLike(): boolean {
    return (
      this.value === ObcPoiValue.Checked || this.value === ObcPoiValue.Activated
    );
  }

  protected get buttonVisualState(): PoiButtonVisualState {
    switch (this.value) {
      case ObcPoiValue.Unchecked:
        return PoiButtonVisualState.Unchecked;
      case ObcPoiValue.Checked:
        return PoiButtonVisualState.Checked;
      case ObcPoiValue.Activated:
        return PoiButtonVisualState.Activated;
      case ObcPoiValue.Overlapped:
        return PoiButtonVisualState.Overlapped;
      default:
        return PoiButtonVisualState.Unchecked;
    }
  }

  protected get buttonState(): ObcPoiButtonState {
    switch (this.state) {
      case ObcPoiState.Caution:
        return ObcPoiButtonState.Caution;
      case ObcPoiState.Warning:
        return ObcPoiButtonState.Warning;
      case ObcPoiState.Alarm:
        return ObcPoiButtonState.Alarm;
      case ObcPoiState.Enabled:
      default:
        return ObcPoiButtonState.Enabled;
    }
  }

  private get resolvedHeaderState(): ObcPoiHeaderState {
    switch (this.buttonState) {
      case ObcPoiButtonState.Caution:
        return ObcPoiHeaderState.Caution;
      case ObcPoiButtonState.Warning:
        return ObcPoiHeaderState.Warning;
      case ObcPoiButtonState.Alarm:
        return ObcPoiHeaderState.Alarm;
      case ObcPoiButtonState.Enabled:
      default:
        return this.selected
          ? ObcPoiHeaderState.Selected
          : ObcPoiHeaderState.Enabled;
    }
  }

  private get lineStyle(): POIStyle {
    if (this.state === ObcPoiState.Alarm) {
      return POIStyle.Alarm;
    }
    if (this.state === ObcPoiState.Warning) {
      return POIStyle.Warning;
    }
    if (this.state === ObcPoiState.Caution) {
      return POIStyle.Caution;
    }
    if (this.selected) {
      return POIStyle.Selected;
    }
    return POIStyle.Regular;
  }

  private get pointerSelected(): boolean {
    return this.isCheckedLike;
  }

  /** Public `y` normalized as the target Y input. */
  private get resolvedTargetY(): number {
    return Number.isFinite(this.y) ? this.y : 0;
  }

  /** Public `buttonY` normalized as the button Y input. */
  private get resolvedButtonY(): number {
    return typeof this.buttonY === 'number' && Number.isFinite(this.buttonY)
      ? this.buttonY
      : 0;
  }

  private get buttonProjectionY(): number {
    const raw = getComputedStyle(this).getPropertyValue(
      '--obc-poi-button-projection-y'
    );
    const parsed = Number.parseFloat(raw);
    return Number.isFinite(parsed) ? parsed : 0;
  }

  private get targetProjectionY(): number {
    const raw = getComputedStyle(this).getPropertyValue(
      '--obc-poi-target-projection-y'
    );
    const parsed = Number.parseFloat(raw);
    return Number.isFinite(parsed) ? parsed : 0;
  }

  private get lineOffset(): number {
    if (this.type === ObcPoiType.Point || this.type === ObcPoiType.Outside) {
      return 0;
    }

    const targetOffsetX = Number.isFinite(this.targetOffsetX)
      ? this.targetOffsetX
      : 0;
    const buttonOffsetX = Number.isFinite(this.buttonOffsetX)
      ? this.buttonOffsetX
      : 0;
    const lineOffset = targetOffsetX - buttonOffsetX;
    return Number.isFinite(lineOffset) ? lineOffset : 0;
  }

  private get hasInlinePointer(): boolean {
    if (this.isCheckedLike && this.type !== ObcPoiType.Outside) {
      return true;
    }

    if (!this.hasPointer) return false;
    return (
      this.type === ObcPoiType.Line ||
      this.type === ObcPoiType.Offset ||
      this.type === ObcPoiType.Point
    );
  }

  private get resolvedPointerType(): ObcPoiPointerType {
    if (this.isCheckedLike || this.state === ObcPoiState.Enabled) {
      return ObcPoiPointerType.Point;
    }

    return this.pointerType ?? ObcPoiPointerType.Point;
  }

  private get resolvedPointerState(): ObcPoiPointerState {
    if (this.isCheckedLike && this.type !== ObcPoiType.Outside) {
      return ObcPoiPointerState.Selected;
    }

    if (this.pointerState) {
      return this.pointerState;
    }

    return ObcPoiPointerState.Regular;
  }

  private get pointerBoxWidthExtra(): number | null {
    if (this.boxWidth === null) {
      return null;
    }

    const width = Number(this.boxWidth);
    if (!Number.isFinite(width)) {
      return null;
    }

    return Math.max(0, width - POINTER_BOX_BASE_SIZE_PX);
  }

  private get pointerBoxHeightExtra(): number | null {
    if (this.boxHeight === null) {
      return null;
    }

    const height = Number(this.boxHeight);
    if (!Number.isFinite(height)) {
      return null;
    }

    return Math.max(0, height - POINTER_BOX_BASE_SIZE_PX);
  }

  private renderLine() {
    if (this.type === ObcPoiType.Outside) {
      return nothing;
    }

    if (
      this.type === ObcPoiType.Point &&
      (this.isCheckedLike || this.state === ObcPoiState.Alarm)
    ) {
      return nothing;
    }

    const fallbackTargetDelta =
      this.type === ObcPoiType.Point
        ? 0
        : Math.max(
            0,
            Math.abs(
              this.targetAnchorY +
                this.targetProjectionY -
                this.buttonProjectionY
            )
          );
    return html`
      <obc-poi-line
        class="line"
        style="--obc-poi-line-projection-y: ${this.buttonProjectionY}px;"
        .poiStyle=${this.lineStyle}
        .height=${fallbackTargetDelta}
        .offset=${this.lineOffset}
        .hasPointer=${false}
        .animatePosition=${this.animatePosition}
      ></obc-poi-line>
    `;
  }

  private renderInlinePointer() {
    if (!this.hasInlinePointer) {
      return nothing;
    }

    return html`
      <obc-poi-pointer
        class="pointer"
        style="--obc-poi-pointer-x: ${this
          .lineOffset}px; --obc-poi-pointer-y: ${this.targetAnchorY +
        this.targetProjectionY}px;"
        .type=${this.resolvedPointerType}
        .state=${this.resolvedPointerState}
        .boxWidth=${this.pointerBoxWidthExtra}
        .boxHeight=${this.pointerBoxHeightExtra}
      ></obc-poi-pointer>
    `;
  }

  private renderOutsideArrow() {
    if (this.type !== ObcPoiType.Outside || !this.hasPointer) {
      return nothing;
    }

    const touchTarget = this.buttonType === ObcPoiButtonType.Enhanced ? 64 : 48;
    const radius = touchTarget / Math.SQRT2;
    const baseCenterYOffset = -touchTarget / 2;
    const angle = (this.outsideAngle * Math.PI) / 180;
    const xOffset = Math.cos(angle) * radius;
    const yOffset = baseCenterYOffset + Math.sin(angle) * radius;
    const value = this.pointerSelected ? 'checked' : 'unchecked';
    return html`<div
      class="outside-arrow"
      style="--obc-poi-outside-arrow-x: ${xOffset}px; --obc-poi-outside-arrow-y: ${yOffset}px; --obc-poi-outside-arrow-angle: ${this
        .outsideAngle}deg;"
    >
      ${poiArrow(value)}
    </div>`;
  }

  /* ---------- Slotted button sync ---------- */

  private slottedButton: HTMLElement | null = null;
  private get targetAnchorY(): number {
    const targetDelta = this.resolvedTargetY - this.resolvedButtonY;
    return this.type === ObcPoiType.Point
      ? Math.max(POINT_POINTER_OFFSET_PX, targetDelta)
      : targetDelta;
  }

  private handleButtonSlotChange(e: Event) {
    const slot = e.target as HTMLSlotElement;
    const assigned = slot.assignedElements({flatten: false});
    this.slottedButton =
      assigned.length > 0 ? (assigned[0] as HTMLElement) : null;
    this.syncFallbackButtonHeaderContent();
    this.syncSlottedButtonProps();
  }

  private syncFallbackButtonHeaderContent() {
    if (this.slottedButton) {
      return;
    }

    const button = this.renderRoot.querySelector(
      'obc-poi-button.poi-button'
    ) as HTMLElement | null;
    if (!button) {
      return;
    }

    for (const child of Array.from(this.children)) {
      if (
        !(child instanceof HTMLElement) ||
        child.getAttribute('slot') !== 'header'
      ) {
        continue;
      }
      if (child.parentElement !== button) {
        button.appendChild(child);
      }
      this.applyHeaderState(child);
    }
  }

  private applyHeaderState(root: ParentNode) {
    const headers = [
      ...(root instanceof Element && root.matches('obc-poi-header')
        ? [root]
        : []),
      ...root.querySelectorAll('obc-poi-header'),
    ] as HTMLElement[];

    for (const header of headers) {
      (header as {state?: ObcPoiHeaderState}).state = this.resolvedHeaderState;
      header.setAttribute('state', this.resolvedHeaderState);
    }
  }

  private syncAttachedHeaderState() {
    this.applyHeaderState(this.renderRoot);
  }

  private syncSlottedButtonProps() {
    const btn = this.slottedButton;
    if (!btn) return;

    const props = btn as unknown as Record<string, unknown>;
    props.layout = 'inline';
    props.relativeDirection = this.relativeDirection;
    props.selected = this.selected;
    props.hasHeader = this.hasHeader;
    props.headerContent = this.headerContent;
    props.state = this.buttonState;
    props.value = this.buttonVisualState;
    props.overlapOpaque = this.overlapOpaque;
    props.type = this.buttonType;
    props.data = this.data;
  }

  private renderPoiButton() {
    return html`
      <slot name="button" @slotchange=${this.handleButtonSlotChange}>
        <obc-poi-button
          layout="inline"
          class="poi-button"
          .relativeDirection=${this.relativeDirection}
          .selected=${this.selected}
          .hasHeader=${this.hasHeader}
          .headerContent=${this.headerContent}
          .state=${this.buttonState}
          .value=${this.buttonVisualState}
          .overlapOpaque=${this.overlapOpaque}
          .type=${this.buttonType}
          .data=${this.data}
        >
          <slot></slot>
        </obc-poi-button>
      </slot>
    `;
  }

  public refreshProjectionLayout(_trackDurationMs = 0) {
    this.requestUpdate();
  }

  override render() {
    const classes = {
      wrapper: true,
      [`type-${this.type}`]: true,
      [`button-${this.buttonType}`]: true,
      [`value-${this.value}`]: true,
      [`state-${this.state}`]: true,
      'has-data': this.data.length > 0,
      'no-motion': !this.animatePosition,
    };

    const wrapperStyle =
      this.buttonOffsetX !== 0
        ? {'--obc-poi-target-top-offset-x': `${this.buttonOffsetX}px`}
        : {};

    return html`
      <div class=${classMap(classes)} style=${styleMap(wrapperStyle)}>
        ${this.renderPoiButton()} ${this.renderLine()}
        ${this.renderInlinePointer()} ${this.renderOutsideArrow()}
      </div>
    `;
  }

  protected override firstUpdated(_changedProperties: Map<string, unknown>) {
    this.syncFallbackButtonHeaderContent();
    this.syncAttachedHeaderState();
  }

  protected override updated(changedProperties: Map<string, unknown>) {
    super.updated(changedProperties);
    if (changedProperties.has('x')) {
      this.style.removeProperty('left');
      this.style.setProperty('--obc-poi-x', `${this.x}px`);
    }
    if (
      changedProperties.has('buttonY') ||
      changedProperties.has('y') ||
      changedProperties.has('fixedTarget')
    ) {
      this.updatePosition();
    }
    this.syncFallbackButtonHeaderContent();
    this.syncSlottedButtonProps();
    this.syncAttachedHeaderState();
  }

  static override styles = unsafeCSS(componentStyle);
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-poi': ObcPoi;
  }
}
