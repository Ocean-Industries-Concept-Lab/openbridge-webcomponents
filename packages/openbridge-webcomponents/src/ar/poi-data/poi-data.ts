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
 * `<obc-poi-data>` renders a point-of-interest marker with a selectable target
 * button and optional pointer line.
 *
 * Use this component inside `obc-poi-layer` or `obc-poi-group` to
 * position targets in AR layers and present status or selection state for a
 * detection or tracked object.
 *
 * ### Features
 * - Positions via `x` and a configurable pointer line.
 * - Visual emphasis controlled by `value` (see `PoiDataValue`).
 * - Alarm state controlled by `state` (enabled, caution, warning, alarm).
 * - Multi-value button rendering via the `data` array.
 * - Horizontal nudging via `buttonOffsetX` for overlap or crossing layouts.
 * - Supports alert, selection, and pointer variants.
 *
 * ### Usage Guidelines
 * - Set `x` in pixels to place the target relative to its container.
 * - Use `buttonY` to set the target/button position:
 *   - When `fixed-target=true`: `buttonY` is where the line bottom should be (target position)
 *   - When `fixed-target=false`: `buttonY` is where the button should be (button position)
 * - Use `y` for the pointer line length (distance from button to target).
 * - Set `fixed-target` to `false` for layer mode (button position fixed, line extends) - default.
 * - Set `fixed-target` to `true` for standalone/CV mode (target position fixed, button moves).
 * - Use `value` to align with layer or group overlap logic (unchecked, overlapped, etc.).
 * - Use `state` to set alarm level (enabled, caution, warning, alarm).
 * - Provide `data` to display secondary statuses on the button.
 * - Adjust `buttonOffsetX` only when resolving collisions in a layer.
 *
 * ### Slots
 * - None.
 *
 * ### Events
 * - None. This component does not emit custom events.
 *
 * ### Best Practices
 * - Use within `obc-poi-layer` for automatic grouping and overlap behaviors.
 * - Keep pointer lines short to reduce visual clutter.
 * - Prefer `PoiDataValue` enum values over manual styling.
 *
 * ### Example
 * ```html
 * <obc-poi-data x="120" button-y="200" y="192"></obc-poi-data>
 * ```
 *
 * @slot none
 * @fires none - This component does not emit custom events.
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
      changedProperties.has('fixedTarget')
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
    if (this.fixedTarget) {
      if (typeof this.buttonY === 'number' && Number.isFinite(this.buttonY)) {
        const lineLength = Number.isFinite(this.y) ? this.y : 0;
        this.style.top = `${this.buttonY - lineLength}px`;
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
