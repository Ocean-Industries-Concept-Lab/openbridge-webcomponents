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
 *   - `buttonType`, `relativeDirection`, `data`.
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
 *
 * ## Slots/Content
 * - `header`: Optional custom header content forwarded into `obc-poi`.
 *
 * ## Events
 * - `obc-poi-data-layout-change`: Fired when layout-driving properties change (`x`, `buttonY`, `y`, `lineCompensationY`, `fixedTarget`).
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
 * @fires obc-poi-data-layout-change {CustomEvent<void>} Fired when layout-driving properties change.
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

  override updated(changedProperties: Map<string, unknown>) {
    if (changedProperties.has('x')) {
      this.style.left = `${this.x}px`;
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
      changedProperties.has('lineCompensationY') ||
      changedProperties.has('fixedTarget')
    ) {
      this.dispatchEvent(
        new CustomEvent('obc-poi-data-layout-change', {
          bubbles: true,
          composed: true,
        })
      );
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
        .pointerType=${this.pointerType}
        .pointerState=${this.pointerState}
        .selected=${this.selected}
        .data=${this.data}
        .buttonOffsetX=${this.buttonOffsetX}
        .targetOffsetX=${this.targetOffsetX}
        .boxWidth=${this.boxWidth}
        .boxHeight=${this.boxHeight}
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
