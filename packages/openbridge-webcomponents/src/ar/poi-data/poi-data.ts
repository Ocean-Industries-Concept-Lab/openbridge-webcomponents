import {LitElement, html, unsafeCSS} from 'lit';
import {property} from 'lit/decorators.js';
import {customElement} from '../../decorator.js';
import componentStyle from './poi-data.css?inline';
import '../building-blocks/poi/poi.js';
import '../../icons/icon-vessel-generic-default-filled.js';
import {ObcArAlertType} from '../types.js';
import {
  ObcPoiButtonType,
  ObcPoiButtonDataItem,
  ObcPoiButtonHeader,
  PoiButtonVisualState,
} from '../building-blocks/poi-button/poi-button.js';
import {
  ObcPoiState,
  ObcPoiType,
  ObcPoiValue,
} from '../building-blocks/poi/poi.js';

export enum TargetState {
  Enabled = 'enabled',
  Caution = 'caution',
  Warning = 'warning',
  Alarm = 'alarm',
}

export enum Pointer {
  Line = 'line',
  ArrowLeft = 'arrow-left',
  ArrowRight = 'arrow-right',
  None = 'null',
}

export {PoiButtonVisualState as PoiDataValue};

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
 * - Use `anchorY` to set the target/button position:
 *   - When `fixed-target=true`: `anchorY` is where the line bottom should be (target position)
 *   - When `fixed-target=false`: `anchorY` is where the button should be (button position)
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
 * <obc-poi-data x="120" anchor-y="200" y="192"></obc-poi-data>
 * ```
 *
 * @slot none
 * @fires none - This component does not emit custom events.
 */

@customElement('obc-poi-data')
export class ObcPoiData extends LitElement {
  @property({type: Number}) x = 0;
  @property({type: Number, attribute: 'anchor-y'}) anchorY: number | null =
    null;
  @property({type: Number}) y = 192;
  @property({type: Boolean}) selected = false;
  @property({type: Object}) header: ObcPoiButtonHeader | null = null;
  /**
   * Deprecated. `state` is the source of truth for button/line alert styling.
   */
  @property({type: String}) alertType = ObcArAlertType.None;
  @property({type: String, reflect: true})
  value: PoiButtonVisualState = PoiButtonVisualState.Unchecked;
  @property({type: String}) type = ObcPoiButtonType.Button;
  @property({type: String}) state: TargetState = TargetState.Enabled;
  @property({type: String}) pointerType: Pointer = Pointer.Line;
  @property({type: Number}) relativeDirection = 0;
  @property({type: Number}) offset = 0;
  @property({type: Number, attribute: 'top-offset'}) topOffset = 0;
  @property({type: Number}) buttonOffsetX = 0;
  @property({type: Boolean, attribute: 'animate-position'})
  animatePosition = false;
  @property({type: Boolean, attribute: 'fixed-target'}) fixedTarget = false;

  private get hasHeader(): boolean {
    const content = this.header?.content;
    return typeof content === 'string' && content.trim().length > 0;
  }

  private get hasData(): boolean {
    return this.data.length > 0;
  }

  get height(): number | null {
    return this.anchorY;
  }

  set height(value: number | null) {
    const oldValue = this.anchorY;
    this.anchorY = value;
    this.requestUpdate('height', oldValue);
  }

  get allowButtonTransition(): boolean {
    return this.animatePosition;
  }

  set allowButtonTransition(value: boolean) {
    const oldValue = this.animatePosition;
    this.animatePosition = value;
    this.requestUpdate('allowButtonTransition', oldValue);
  }

  override updated(changedProperties: Map<string, unknown>) {
    if (changedProperties.has('x')) {
      this.style.left = `${this.x}px`;
    }
    if (
      changedProperties.has('anchorY') ||
      changedProperties.has('y') ||
      changedProperties.has('fixedTarget')
    ) {
      this.updatePosition();
    }
    if (
      changedProperties.has('x') ||
      changedProperties.has('anchorY') ||
      changedProperties.has('y') ||
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
      if (typeof this.anchorY === 'number' && Number.isFinite(this.anchorY)) {
        const lineLength = Number.isFinite(this.y) ? this.y : 0;
        this.style.top = `${this.anchorY - lineLength}px`;
      } else {
        this.style.removeProperty('top');
      }
    } else if (
      typeof this.anchorY === 'number' &&
      Number.isFinite(this.anchorY)
    ) {
      this.style.top = `${this.anchorY}px`;
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

  private get selectedVerticalOffset(): number {
    if (!this.selected) {
      return 0;
    }
    const offset = getComputedStyle(this).getPropertyValue(
      '--obc-poi-target-selected-vertical-offset'
    );
    const parsed = Number.parseFloat(offset);
    return Number.isFinite(parsed) ? parsed : 0;
  }

  private get mappedPoiState(): ObcPoiState {
    switch (this.state) {
      case TargetState.Caution:
        return ObcPoiState.Caution;
      case TargetState.Warning:
        return ObcPoiState.Warning;
      case TargetState.Alarm:
        return ObcPoiState.Alarm;
      case TargetState.Enabled:
      default:
        return ObcPoiState.Enabled;
    }
  }

  private get mappedPoiType(): ObcPoiType {
    return this.pointerType === Pointer.Line
      ? ObcPoiType.Line
      : ObcPoiType.Point;
  }

  private get mappedPoiValue(): ObcPoiValue {
    switch (this.value) {
      case PoiButtonVisualState.Checked:
        return ObcPoiValue.Checked;
      case PoiButtonVisualState.Activated:
        return ObcPoiValue.Activated;
      case PoiButtonVisualState.Overlapped:
        return ObcPoiValue.Overlapped;
      case PoiButtonVisualState.Unchecked:
      default:
        return ObcPoiValue.Unchecked;
    }
  }

  private get overlapAnchorCompensation(): number {
    const computed = getComputedStyle(this);
    const raw =
      computed
        .getPropertyValue('--obc-poi-data-overlap-anchor-compensation')
        .trim() ||
      computed.getPropertyValue('--maneuvering-components-poi-id-tag-min-size');
    const parsed = Number.parseFloat(raw);
    return Number.isFinite(parsed) ? parsed : 16;
  }

  override render() {
    const selectedVerticalOffset = this.selectedVerticalOffset;
    const lineLength = Number.isFinite(this.y) ? this.y : 0;
    const isOverlapped = this.value === PoiButtonVisualState.Overlapped;
    const overlapAnchorCompensation =
      isOverlapped && !this.hasData && this.hasHeader
        ? this.overlapAnchorCompensation
        : 0;
    const effectiveLineLength =
      this.pointerType === Pointer.Line
        ? lineLength + selectedVerticalOffset
        : 0;
    const effectiveLocalAnchorY = this.selected
      ? -selectedVerticalOffset - overlapAnchorCompensation
      : -overlapAnchorCompensation;
    const effectiveButtonOffset = this.buttonOffsetX + this.topOffset;
    const effectiveTargetOffset = this.buttonOffsetX + this.offset;

    return html`
      <obc-poi
        .type=${this.mappedPoiType}
        .value=${this.mappedPoiValue}
        .state=${this.mappedPoiState}
        .x=${0}
        .y=${effectiveLineLength}
        .buttonY=${effectiveLocalAnchorY}
        .fixedTarget=${false}
        .hasPointer=${true}
        .animatePosition=${this.animatePosition}
        .relativeDirection=${this.relativeDirection}
        .header=${this.header}
        .buttonType=${this.type}
        .selected=${this.selected}
        .data=${this.data}
        .hasRelation=${false}
        .buttonOffsetX=${effectiveButtonOffset}
        .targetOffsetX=${effectiveTargetOffset}
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
