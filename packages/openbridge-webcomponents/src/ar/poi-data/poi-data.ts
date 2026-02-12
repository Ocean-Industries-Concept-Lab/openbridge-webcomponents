import {LitElement, html, unsafeCSS} from 'lit';
import {property} from 'lit/decorators.js';
import {customElement} from '../../decorator.js';
import componentStyle from './poi-data.css?inline';
import '../building-blocks/poi/poi.js';
import '../../icons/icon-vessel-generic-default-filled.js';
import {
  ObcPoiButtonType,
  ObcPoiButtonDataItem,
  ObcPoiButtonHeader,
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
 * `<obc-poi-data>` renders a data-oriented AR POI marker that composes button, line, and pointer behavior.
 *
 * ## Overview
 *
 * Use `<obc-poi-data>` in AR overlays to position a POI button and connector line
 * with optional pointer, data rows, and relation cues. Keywords/synonyms: POI data,
 * marker, callout, target, pin, annotation, overlay target.
 *
 * ## Features/Variants
 *
 * - Positioning via `x`, `y`, and optional fixed target mode (`fixedTarget` + `buttonY`).
 * - Visual variants via `type` (`line`, `offset`, `point`, `outside`) and `value` (`unchecked`, `checked`, `activated`, `overlapped`).
 * - Alert/state styling via `state` (`enabled`, `caution`, `warning`, `alarm`).
 * - Supports optional pointer and pointer variants (`hasPointer`, `pointerType`, `pointerState`).
 * - Supports data/header/relation content through `data`, `header`, and `hasRelation`.
 * - Supports horizontal/line compensation controls (`buttonOffsetX`, `targetOffsetX`, `lineCompensationY`).
 *
 * ## Usage Guidelines
 *
 * - Set `x` in pixels to place the marker horizontally in its container.
 * - Use `y` as connector length; combine with `buttonY` to control vertical anchoring.
 * - With `fixed-target=true`, `buttonY` represents the target position and button top is derived from line length.
 * - With `fixed-target=false`, `buttonY` represents the button position and line extends from there.
 * - Use `value` and `state` from enums to keep visuals consistent with layer/group logic.
 *
 * ## Slots/Content
 *
 * - None. This wrapper does not define its own slots.
 *
 * ## Events
 *
 * - `obc-poi-data-layout-change`: dispatched (bubbling + composed) when layout-affecting
 *   properties change (`x`, `buttonY`, `y`, `lineCompensationY`, `fixedTarget`).
 * - Use this event to recalculate parent layout, overlap handling, or connector alignment
 *   when marker geometry changes.
 *
 * ## Best Practices
 *
 * - Use within `obc-poi-layer`/`obc-poi-group` so stacking and overlap orchestration stay centralized.
 * - Keep connector lengths practical to reduce visual clutter.
 * - Prefer enum-backed values (`PoiDataValue`, `ObcPoiType`, `ObcPoiState`) over free-form strings.
 *
 * ## Example
 *
 * ```html
 * <obc-poi-data x="120" button-y="200" y="192"></obc-poi-data>
 * ```
 *
 * @slot - None.
 * @fires obc-poi-data-layout-change - Fired when layout-affecting properties change so parents can reflow/recompute geometry.
 */

@customElement('obc-poi-data')
export class ObcPoiData extends LitElement {
  @property({type: String}) type: ObcPoiType = ObcPoiType.Line;
  @property({type: String, reflect: true}) value: ObcPoiValue =
    ObcPoiValue.Unchecked;
  @property({type: String}) state: ObcPoiState = ObcPoiState.Enabled;
  @property({type: Number}) x = 0;
  @property({type: Number}) y = 192;
  @property({type: Number, attribute: 'button-y'}) buttonY: number | null =
    null;
  @property({type: Boolean, attribute: 'fixed-target'}) fixedTarget = false;
  @property({type: Number, attribute: 'outside-angle'}) outsideAngle = 315;
  @property({type: Boolean}) hasPointer = false;
  @property({type: Boolean, attribute: 'animate-position'})
  animatePosition = false;
  @property({type: Number}) relativeDirection = 0;
  @property({type: Object}) header: ObcPoiButtonHeader | null = null;
  @property({type: String, attribute: 'button-type'})
  buttonType = ObcPoiButtonType.Button;
  @property({type: String, attribute: 'pointer-type'})
  pointerType: ObcPoiPointerType | null = null;
  @property({type: String, attribute: 'pointer-state'})
  pointerState: ObcPoiPointerState | null = null;
  @property({type: Boolean}) selected = false;
  @property({type: Boolean}) hasRelation = false;
  @property({type: Number, attribute: 'button-offset-x'}) buttonOffsetX = 0;
  @property({type: Number, attribute: 'target-offset-x'}) targetOffsetX = 0;
  @property({type: Number, attribute: 'box-width'}) boxWidth: number | null =
    null;
  @property({type: Number, attribute: 'box-height'}) boxHeight: number | null =
    null;
  @property({type: Number, attribute: 'line-compensation-y'})
  lineCompensationY = 0;

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
      changedProperties.has('fixedTarget') ||
      changedProperties.has('selected') ||
      changedProperties.has('type')
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
        const resolvedPoiType = this.#getResolvedPoiType();
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

  @property({
    type: Array,
    converter: {
      fromAttribute(value) {
        if (!value) return [];
        try {
          const parsed = JSON.parse(value);
          return Array.isArray(parsed) ? parsed : [];
        } catch {
          return [];
        }
      },
      toAttribute(value) {
        if (!value || !Array.isArray(value) || value.length === 0) return null;
        try {
          return JSON.stringify(value);
        } catch {
          return null;
        }
      },
    },
  })
  data: ObcPoiButtonDataItem[] = [];

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

  #getResolvedButtonType(): ObcPoiButtonType {
    if (
      Object.values(ObcPoiButtonType).includes(
        this.buttonType as ObcPoiButtonType
      )
    ) {
      return this.buttonType as ObcPoiButtonType;
    }

    return ObcPoiButtonType.Button;
  }

  #getResolvedPointerType(): ObcPoiPointerType | null {
    const value = this.pointerType;
    return Object.values(ObcPoiPointerType).includes(value as ObcPoiPointerType)
      ? (value as ObcPoiPointerType)
      : null;
  }

  #getResolvedPointerState(): ObcPoiPointerState | null {
    const value = this.pointerState;
    return Object.values(ObcPoiPointerState).includes(
      value as ObcPoiPointerState
    )
      ? (value as ObcPoiPointerState)
      : null;
  }

  override render() {
    const selectedVerticalOffset = this.#getSelectedVerticalOffset();
    const lineLength = Number.isFinite(this.y) ? this.y : 0;
    const lineCompensation = Number.isFinite(this.lineCompensationY)
      ? this.lineCompensationY
      : 0;
    const layerVerticalOffset = this.#getLayerVerticalOffset();
    const totalVerticalOffset = selectedVerticalOffset + layerVerticalOffset;
    const resolvedPoiType = this.#getResolvedPoiType();
    const effectiveLineLength =
      resolvedPoiType === ObcPoiType.Line ||
      resolvedPoiType === ObcPoiType.Offset
        ? lineLength + lineCompensation + totalVerticalOffset
        : lineLength;
    const effectiveLocalButtonY = -totalVerticalOffset;
    const effectiveButtonOffset = this.buttonOffsetX;
    const effectiveTargetOffset = this.targetOffsetX;
    const resolvedButtonType = this.#getResolvedButtonType();
    const resolvedPointerType = this.#getResolvedPointerType();
    const resolvedPointerState = this.#getResolvedPointerState();

    return html`
      <obc-poi
        .type=${resolvedPoiType}
        .value=${this.value}
        .state=${this.state}
        .x=${0}
        .y=${effectiveLineLength}
        .buttonY=${effectiveLocalButtonY}
        .fixedTarget=${false}
        .outsideAngle=${this.outsideAngle}
        .hasPointer=${this.hasPointer}
        .animatePosition=${this.animatePosition}
        .relativeDirection=${this.relativeDirection}
        .header=${this.header}
        .buttonType=${resolvedButtonType}
        .pointerType=${resolvedPointerType}
        .pointerState=${resolvedPointerState}
        .selected=${this.selected}
        .data=${this.data}
        .hasRelation=${this.hasRelation}
        .buttonOffsetX=${effectiveButtonOffset}
        .targetOffsetX=${effectiveTargetOffset}
        .boxWidth=${this.boxWidth}
        .boxHeight=${this.boxHeight}
      >
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
