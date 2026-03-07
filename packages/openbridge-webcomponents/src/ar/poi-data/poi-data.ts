import {LitElement, html, unsafeCSS} from 'lit';
import {property} from 'lit/decorators.js';
import {customElement} from '../../decorator.js';
import componentStyle from './poi-data.css?inline';
import '../building-blocks/poi/poi.js';
import '../../icons/icon-vessel-generic-default-filled.js';
import {
  ObcPoiButtonType,
  ObcPoiButtonDataItem,
} from '../building-blocks/poi-button/poi-button.js';
import {
  ObcPoiState,
  ObcPoiType,
  ObcPoiValue,
} from '../building-blocks/poi/poi.js';
import {
  ObcPoiPointerState,
  ObcPoiPointerType,
} from '../building-blocks/poi-pointer/poi-pointer.js';

export {ObcPoiValue as PoiDataValue};
export enum PoiDataVisualRectPreference {
  Largest = 'largest',
  Group = 'group',
  Anchor = 'anchor',
  Size = 'size',
}

type PoiDataVisualElementPreference =
  | PoiDataVisualRectPreference.Group
  | PoiDataVisualRectPreference.Anchor
  | PoiDataVisualRectPreference.Size;

const X_FILTER_CUTOFF_HZ = 16;
const X_FILTER_DEADBAND_PX = 0.1;
const X_MOVING_HINT_MS = 120;

/**
 * `<obc-poi-data>` - Data-oriented marker wrapper around `obc-poi` with layout positioning and change notifications.
 *
 * ## Overview
 * Use this component when a marker needs position control plus optional data rows and header content.
 * It forwards configuration to `obc-poi` and emits a layout-change event when geometry-related inputs change.
 *
 * ## Features/Variants
 * - Position inputs:
 *   - `x` (default `0`): host horizontal position in pixels.
 *   - `buttonY` + `fixedTarget`: controls vertical positioning mode.
 *   - `y` (default `192`): line length basis.
 *   - `lineCompensationY` (default `0`): extra line compensation used in line/offset modes.
 *   - `buttonOffsetX` / `targetOffsetX`: horizontal connector offsets.
 * - Marker visuals:
 *   - `type`, `value`, `state`, `selected`, `hasPointer`.
 *   - `pointerType`, `pointerState`, `outsideAngle`.
 *   - `buttonType`, `relativeDirection`, `data`, `overlapOpaque` (`false` = translucent overlap, `true` = opaque overlap).
 * - Rendering behavior:
 *   - Injects a default `obi-vessel-generic-default-filled` icon.
 *   - Forwards optional `header` slot content when `hasHeader` is true.
 * - Motion:
 *   - `animatePosition` toggles animated position updates in child marker visuals.
 *
 * ## Usage Guidelines
 * - Use `fixedTarget=false` when `buttonY` should represent button position.
 * - Use `fixedTarget=true` when `buttonY` should represent target position and line length should offset upward.
 * - Keep geometry values finite to avoid fallback behavior.
 * - Component choice:
 *   - Use `<obc-poi-data>` for data-oriented callouts with built-in connector/pointer behavior and per-item layout control.
 *   - Use `<obc-poi>` for lower-level marker rendering when you do not need this data wrapper behavior.
 *   - Use `<obc-poi-layer>` when multiple markers need coordinated overlap/stacking management.
 *   - Use `<obc-poi-group>` when related markers should expand/collapse together as one grouped interaction.
 *
 * ## Slots/Content
 * - `header`: Optional custom header content forwarded into `obc-poi`.
 *
 * ## Events
 * - `obc-poi-data-layout-change`: Fired when layout-driving properties change (`x`, `y`, `buttonY`, `buttonOffsetX`, `targetOffsetX`, `lineCompensationY`, `fixedTarget`, `selected`, `type`).
 *
 * ## Best Practices
 * - Treat `obc-poi-data-layout-change` as a signal to recompute overlap/grouping layout.
 * - Keep `lineCompensationY` usage consistent within the same layout system.
 * - TODO(designer): Confirm recommended defaults and usage envelope for `lineCompensationY`.
 *
 * ## Example
 * ```html
 * <obc-poi-data x="120" button-y="200" y="192"></obc-poi-data>
 * ```
 *
 * @slot header - Optional custom header content forwarded into `obc-poi`.
 * @fires obc-poi-data-layout-change {CustomEvent<void>} Fired when layout-driving properties change (`x`, `y`, `buttonY`, `buttonOffsetX`, `targetOffsetX`, `lineCompensationY`, `fixedTarget`, `selected`, `type`).
 */
@customElement('obc-poi-data')
export class ObcPoiData extends LitElement {
  @property({type: String}) type: ObcPoiType = ObcPoiType.Line;
  @property({type: String, reflect: true}) value: ObcPoiValue =
    ObcPoiValue.Unchecked;
  @property({type: String}) state: ObcPoiState = ObcPoiState.Enabled;
  @property({type: Boolean}) selected = false;
  @property({type: String, attribute: 'button-type'})
  buttonType = ObcPoiButtonType.Button;
  @property({type: Boolean, attribute: 'overlap-opaque'})
  overlapOpaque = false;
  @property({attribute: false})
  data: ObcPoiButtonDataItem[] = [];
  @property({type: Boolean, attribute: 'has-header'}) hasHeader = false;
  @property({type: Boolean}) hasPointer = false;
  @property({type: String, attribute: 'pointer-type'})
  pointerType: ObcPoiPointerType | null = null;
  @property({type: String, attribute: 'pointer-state'})
  pointerState: ObcPoiPointerState | null = null;
  @property({type: Number}) relativeDirection = 0;
  @property({type: Number}) x = 0;
  @property({type: Number}) y = 192;
  @property({type: Number, attribute: 'button-y'}) buttonY: number | null =
    null;
  @property({type: Boolean, attribute: 'fixed-target'}) fixedTarget = false;
  @property({type: Number, attribute: 'button-offset-x'}) buttonOffsetX = 0;
  @property({type: Number, attribute: 'target-offset-x'}) targetOffsetX = 0;
  @property({type: Number, attribute: 'box-width'}) boxWidth: number | null =
    null;
  @property({type: Number, attribute: 'box-height'}) boxHeight: number | null =
    null;
  @property({type: Number, attribute: 'line-compensation-y'})
  lineCompensationY = 0;
  @property({type: Number, attribute: 'outside-angle'}) outsideAngle = 315;
  @property({type: Boolean, attribute: 'animate-position'})
  animatePosition = false;

  private filteredX = 0;
  private xFilterTarget = 0;
  private xFilterInitialized = false;
  private lastXFilterTimestampMs = 0;
  private xFilterRaf = 0;
  private xMovingHintTimeout: number | null = null;

  private dispatchLayoutChange() {
    this.dispatchEvent(
      new CustomEvent('obc-poi-data-layout-change', {
        bubbles: true,
        composed: true,
      })
    );
  }

  private stepXFilter = (nowMs: number) => {
    this.xFilterRaf = 0;
    if (!this.isConnected || !this.xFilterInitialized) {
      return;
    }

    const dtSeconds =
      this.lastXFilterTimestampMs > 0
        ? Math.min(
            0.25,
            Math.max(1 / 120, (nowMs - this.lastXFilterTimestampMs) / 1000)
          )
        : 1 / 60;
    this.lastXFilterTimestampMs = nowMs;

    const alpha = 1 - Math.exp(-2 * Math.PI * X_FILTER_CUTOFF_HZ * dtSeconds);
    const delta = this.xFilterTarget - this.filteredX;
    const nextX =
      Math.abs(delta) <= X_FILTER_DEADBAND_PX
        ? this.xFilterTarget
        : this.filteredX + delta * alpha;
    const changed = Math.abs(nextX - this.filteredX) > 1e-6;
    this.filteredX = nextX;
    if (changed) {
      this.style.setProperty('--obc-poi-data-x', `${this.filteredX}px`);
      this.dispatchLayoutChange();
    }

    const settled =
      Math.abs(this.xFilterTarget - this.filteredX) <= X_FILTER_DEADBAND_PX;

    if (settled) {
      this.filteredX = this.xFilterTarget;
      this.style.setProperty('--obc-poi-data-x', `${this.filteredX}px`);
      this.lastXFilterTimestampMs = 0;
      this.markXMoving();
      return;
    }

    this.markXMoving();
    this.xFilterRaf = requestAnimationFrame(this.stepXFilter);
  };

  private syncXFilterTarget(nextX: number) {
    this.xFilterTarget = nextX;

    if (!this.xFilterInitialized) {
      this.xFilterInitialized = true;
      this.filteredX = nextX;
      this.style.setProperty('--obc-poi-data-x', `${this.filteredX}px`);
      this.markXMoving();
      return;
    }

    if (Math.abs(nextX - this.filteredX) <= X_FILTER_DEADBAND_PX) {
      this.filteredX = this.xFilterTarget;
      this.style.setProperty('--obc-poi-data-x', `${this.filteredX}px`);
      if (this.xFilterRaf) {
        cancelAnimationFrame(this.xFilterRaf);
        this.xFilterRaf = 0;
      }
      this.lastXFilterTimestampMs = 0;
      this.markXMoving();
      return;
    }

    if (!this.xFilterRaf) {
      this.lastXFilterTimestampMs = 0;
      this.markXMoving();
      this.xFilterRaf = requestAnimationFrame(this.stepXFilter);
    }
  }

  override disconnectedCallback() {
    super.disconnectedCallback();
    if (this.xFilterRaf) {
      cancelAnimationFrame(this.xFilterRaf);
      this.xFilterRaf = 0;
    }
    this.lastXFilterTimestampMs = 0;
    if (this.xMovingHintTimeout !== null) {
      window.clearTimeout(this.xMovingHintTimeout);
      this.xMovingHintTimeout = null;
    }
  }

  public getVisualRect(
    preference: PoiDataVisualRectPreference = PoiDataVisualRectPreference.Largest
  ): DOMRect {
    const {poi, button, wrapper, buttonWrapper} = this.getVisualNodes();
    const candidates = [wrapper, buttonWrapper, button, poi].filter(
      (element): element is HTMLElement => !!element
    );

    if (preference === PoiDataVisualRectPreference.Group) {
      const hasDataWrapper = wrapper?.classList.contains('has-data') ?? false;
      return (
        (hasDataWrapper ? wrapper?.getBoundingClientRect() : null) ??
        buttonWrapper?.getBoundingClientRect() ??
        wrapper?.getBoundingClientRect() ??
        button?.getBoundingClientRect() ??
        poi?.getBoundingClientRect() ??
        this.getBoundingClientRect()
      );
    }

    if (preference === PoiDataVisualRectPreference.Anchor) {
      return (
        buttonWrapper?.getBoundingClientRect() ??
        button?.getBoundingClientRect() ??
        wrapper?.getBoundingClientRect() ??
        poi?.getBoundingClientRect() ??
        this.getBoundingClientRect()
      );
    }

    if (preference === PoiDataVisualRectPreference.Size) {
      return (
        wrapper?.getBoundingClientRect() ??
        buttonWrapper?.getBoundingClientRect() ??
        button?.getBoundingClientRect() ??
        poi?.getBoundingClientRect() ??
        this.getBoundingClientRect()
      );
    }

    if (candidates.length === 0) {
      return this.getBoundingClientRect();
    }

    const candidateRects = candidates.map((element) =>
      element.getBoundingClientRect()
    );
    return candidateRects.reduce((best, rect) =>
      rect.height > best.height ? rect : best
    );
  }

  public getVisualElement(
    preference: PoiDataVisualElementPreference = PoiDataVisualRectPreference.Size
  ): HTMLElement {
    const {poi, button, wrapper, buttonWrapper} = this.getVisualNodes();

    if (preference === PoiDataVisualRectPreference.Group) {
      const hasDataWrapper = wrapper?.classList.contains('has-data') ?? false;
      return (
        (hasDataWrapper ? wrapper : null) ??
        buttonWrapper ??
        wrapper ??
        button ??
        poi ??
        this
      );
    }

    if (preference === PoiDataVisualRectPreference.Anchor) {
      return buttonWrapper ?? button ?? wrapper ?? poi ?? this;
    }

    return wrapper ?? buttonWrapper ?? button ?? poi ?? this;
  }

  private markXMoving() {
    this.setAttribute('data-x-moving', 'true');
    if (this.xMovingHintTimeout !== null) {
      window.clearTimeout(this.xMovingHintTimeout);
    }
    this.xMovingHintTimeout = window.setTimeout(() => {
      this.removeAttribute('data-x-moving');
      this.xMovingHintTimeout = null;
    }, X_MOVING_HINT_MS);
  }

  override updated(changedProperties: Map<string, unknown>) {
    if (changedProperties.has('x')) {
      this.syncXFilterTarget(Number.isFinite(this.x) ? this.x : 0);
    }
    if (
      changedProperties.has('buttonY') ||
      changedProperties.has('y') ||
      changedProperties.has('fixedTarget') ||
      changedProperties.has('lineCompensationY') ||
      changedProperties.has('selected') ||
      changedProperties.has('type')
    ) {
      this.updatePosition();
    }
    if (
      changedProperties.has('x') ||
      changedProperties.has('buttonY') ||
      changedProperties.has('y') ||
      changedProperties.has('buttonOffsetX') ||
      changedProperties.has('targetOffsetX') ||
      changedProperties.has('lineCompensationY') ||
      changedProperties.has('fixedTarget') ||
      changedProperties.has('selected') ||
      changedProperties.has('type')
    ) {
      this.dispatchLayoutChange();
    }
  }

  private updatePosition() {
    const resolvedPoiType = this.#getResolvedPoiType();
    if (this.fixedTarget) {
      if (typeof this.buttonY === 'number' && Number.isFinite(this.buttonY)) {
        const lineLength = Number.isFinite(this.y) ? this.y : 0;
        const lineCompensation = Number.isFinite(this.lineCompensationY)
          ? this.lineCompensationY
          : 0;
        const selectedVerticalOffset = this.#getSelectedVerticalOffset();
        const layerVerticalOffset = this.#getLayerVerticalOffset();
        const totalVerticalOffset =
          selectedVerticalOffset + layerVerticalOffset;
        const effectiveLineLength =
          resolvedPoiType === ObcPoiType.Line ||
          resolvedPoiType === ObcPoiType.Offset
            ? lineLength + lineCompensation + totalVerticalOffset
            : lineLength;
        this.style.top = `${this.buttonY - effectiveLineLength}px`;
      } else {
        this.style.removeProperty('top');
      }
    } else if (
      typeof this.buttonY === 'number' &&
      Number.isFinite(this.buttonY)
    ) {
      this.style.top = `${this.buttonY}px`;
    } else {
      this.style.removeProperty('top');
    }
  }

  #getSelectedVerticalOffset(): number {
    if (!this.selected) {
      return 0;
    }
    const offset = getComputedStyle(this).getPropertyValue(
      '--obc-poi-target-selected-vertical-offset'
    );
    const parsed = Number.parseFloat(offset);
    return Number.isFinite(parsed) ? parsed : 0;
  }

  #getLayerVerticalOffset(): number {
    const offset = getComputedStyle(this).getPropertyValue(
      '--obc-poi-target-layer-vertical-offset'
    );
    const parsed = Number.parseFloat(offset);
    return Number.isFinite(parsed) ? parsed : 0;
  }

  #getResolvedPoiType(): ObcPoiType {
    return Object.values(ObcPoiType).includes(this.type as ObcPoiType)
      ? (this.type as ObcPoiType)
      : ObcPoiType.Line;
  }

  #getResolvedPoiState(): ObcPoiState {
    return Object.values(ObcPoiState).includes(this.state as ObcPoiState)
      ? (this.state as ObcPoiState)
      : ObcPoiState.Enabled;
  }

  private getVisualNodes(): {
    poi: HTMLElement | null;
    button: HTMLElement | null;
    wrapper: HTMLElement | null;
    buttonWrapper: HTMLElement | null;
  } {
    const targetShadow = this.shadowRoot;
    const poi = targetShadow?.querySelector('obc-poi') as HTMLElement | null;
    const poiButton = poi?.shadowRoot?.querySelector(
      'obc-poi-button'
    ) as HTMLElement | null;
    const dataButton = targetShadow?.querySelector(
      'obc-poi-button-data'
    ) as HTMLElement | null;
    const button = poiButton ?? dataButton;
    const buttonShadow = button?.shadowRoot ?? null;
    const buttonWrapper = buttonShadow?.querySelector(
      '.button-wrapper'
    ) as HTMLElement | null;
    const wrapper = buttonShadow?.querySelector(
      '.wrapper'
    ) as HTMLElement | null;
    return {poi, button, wrapper, buttonWrapper};
  }

  override render() {
    const resolvedPoiType = this.#getResolvedPoiType();
    const resolvedPoiState = this.#getResolvedPoiState();
    const selectedVerticalOffset = this.#getSelectedVerticalOffset();
    const lineLength = Number.isFinite(this.y) ? this.y : 0;
    const lineCompensation = Number.isFinite(this.lineCompensationY)
      ? this.lineCompensationY
      : 0;
    const layerVerticalOffset = this.#getLayerVerticalOffset();
    const totalVerticalOffset = selectedVerticalOffset + layerVerticalOffset;
    const effectiveLineLength =
      resolvedPoiType === ObcPoiType.Line ||
      resolvedPoiType === ObcPoiType.Offset
        ? lineLength + lineCompensation + totalVerticalOffset
        : lineLength;
    const effectiveLocalButtonY = -totalVerticalOffset;

    return html`
      <obc-poi
        .type=${resolvedPoiType}
        .value=${this.value}
        .state=${resolvedPoiState}
        .x=${0}
        .y=${effectiveLineLength}
        .buttonY=${effectiveLocalButtonY}
        .fixedTarget=${false}
        .outsideAngle=${this.outsideAngle}
        .hasPointer=${this.hasPointer}
        .hasHeader=${this.hasHeader}
        .animatePosition=${this.animatePosition}
        .relativeDirection=${this.relativeDirection}
        .buttonType=${this.buttonType}
        .overlapOpaque=${this.overlapOpaque}
        .pointerType=${this.pointerType}
        .pointerState=${this.pointerState}
        .selected=${this.selected}
        .data=${this.data}
        .buttonOffsetX=${this.buttonOffsetX}
        .targetOffsetX=${this.targetOffsetX}
        .boxWidth=${this.boxWidth}
        .boxHeight=${this.boxHeight}
        exportparts="icon"
      >
        ${this.hasHeader
          ? html`<slot name="header" slot="header"></slot>`
          : null}
        <obi-vessel-generic-default-filled></obi-vessel-generic-default-filled>
      </obc-poi>
    `;
  }

  static override styles = unsafeCSS(componentStyle);
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-poi-data': ObcPoiData;
  }
}
