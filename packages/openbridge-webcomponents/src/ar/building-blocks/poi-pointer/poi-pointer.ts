import {LitElement, html, nothing, PropertyValues, unsafeCSS} from 'lit';
import {property} from 'lit/decorators.js';
import {classMap} from 'lit/directives/class-map.js';
import componentStyle from './poi-pointer.css?inline';
import {customElement} from '../../../decorator.js';
import {
  OBC_POI_SELECTION_FRAME_MIN_CUSTOM_SIZE_PX,
  ObcPoiSelectionFrameState,
  ObcPoiSelectionFrameType,
} from '../poi-selection-frame/poi-selection-frame.js';
import '../poi-selection-frame/poi-selection-frame.js';

export enum ObcPoiPointerType {
  Point = 'point',
  Button = 'button',
  Camera = 'camera',
}

export enum ObcPoiPointerState {
  Regular = 'regular',
  Selected = 'selected',
  Active = 'active',
  Uncertain = 'uncertain',
}

const CAMERA_SELECTION_FRAME_WIDTH_PX = 64;
const CAMERA_SELECTION_FRAME_HEIGHT_PX = 56;
const CAMERA_SELECTION_FRAME_BOX_WIDTH_PX =
  CAMERA_SELECTION_FRAME_WIDTH_PX - OBC_POI_SELECTION_FRAME_MIN_CUSTOM_SIZE_PX;
const CAMERA_SELECTION_FRAME_BOX_HEIGHT_PX =
  CAMERA_SELECTION_FRAME_HEIGHT_PX - OBC_POI_SELECTION_FRAME_MIN_CUSTOM_SIZE_PX;
const BUTTON_SELECTION_FRAME_SIZE_PX = 39;
const BUTTON_SELECTION_FRAME_BOX_OFFSET_PX =
  BUTTON_SELECTION_FRAME_SIZE_PX - OBC_POI_SELECTION_FRAME_MIN_CUSTOM_SIZE_PX;
const POINT_SIZE_PX = 32;
const POINT_SELECTION_FRAME_BOX_OFFSET_PX =
  POINT_SIZE_PX - OBC_POI_SELECTION_FRAME_MIN_CUSTOM_SIZE_PX;
const BUTTON_SIZE_PX = 48;
const CAMERA_WIDTH_PX = 52;
const CAMERA_HEIGHT_PX = 44;
const BOX_FILTER_CUTOFF_HZ = 14;
const BOX_FILTER_DEADBAND_PX = 0.25;

/**
 * `<obc-poi-pointer>` - Target pointer component for point, button, and camera marker shapes.
 *
 * ## Overview
 * Use this component to render compact target indicators when only pointer visuals are needed.
 * Keywords/synonyms: target pointer, reticle marker, focus marker, target indicator.
 *
 * ## Features/Variants
 * - `type` (default `point`):
 *   - `point`: Dot-only pointer.
 *   - `button`: Circular button-sized pointer.
 *   - `camera`: Rectangular camera-sized pointer.
 * - `state` (default `regular`): `regular`, `selected`, `active`, `uncertain`.
 * - Selection frame behavior:
 *   - `point + selected`: Renders indicator selection frame.
 *   - `button + selected`: Renders button selection frame.
 *   - `camera + selected`: Renders custom camera selection frame.
 * - `boxWidth` / `boxHeight` (default `null`): Optional non-negative frame size extras when frame dimensions are used.
 *
 * ## Usage Guidelines
 * - Use `type="point"` for minimal targets.
 * - Use `type="button"` or `type="camera"` when a larger selection footprint is needed.
 * - Provide `boxWidth`/`boxHeight` only when size overrides are intentional.
 *
 * ## Slots/Content
 * This component has no slots.
 *
 * ## Events
 * This component does not emit custom events.
 *
 * ## Best Practices
 * - Drive `type` and `state` from the same state source used by surrounding marker components.
 * - Treat negative `boxWidth` and `boxHeight` as invalid input; they are ignored by design.
 *
 * ## Example
 * ```html
 * <obc-poi-pointer
 *   type="button"
 *   state="selected"
 *   box-width="12"
 *   box-height="8"
 * ></obc-poi-pointer>
 * ```
 */
@customElement('obc-poi-pointer')
export class ObcPoiPointer extends LitElement {
  @property({type: String, reflect: true})
  type: ObcPoiPointerType = ObcPoiPointerType.Point;

  @property({type: String, reflect: true})
  state: ObcPoiPointerState = ObcPoiPointerState.Regular;

  @property({type: Number, attribute: 'box-width'})
  boxWidth: number | null = null;

  @property({type: Number, attribute: 'box-height'})
  boxHeight: number | null = null;

  private filteredBoxWidth = 0;
  private filteredBoxHeight = 0;
  private boxFilterInitialized = false;
  private lastFilterTimestampMs = 0;

  private get shouldUseBoxDimensions(): boolean {
    if (this.type === ObcPoiPointerType.Point) {
      return this.state === ObcPoiPointerState.Selected;
    }

    if (
      this.type === ObcPoiPointerType.Button ||
      this.type === ObcPoiPointerType.Camera
    ) {
      return true;
    }

    return false;
  }

  private get resolvedBoxWidth(): number | null {
    if (
      !this.shouldUseBoxDimensions ||
      this.boxWidth === null ||
      this.boxWidth < 0
    ) {
      return null;
    }
    return this.boxWidth;
  }

  private get resolvedBoxHeight(): number | null {
    if (
      !this.shouldUseBoxDimensions ||
      this.boxHeight === null ||
      this.boxHeight < 0
    ) {
      return null;
    }
    return this.boxHeight;
  }

  private get targetBoxWidth(): number {
    return this.resolvedBoxWidth ?? 0;
  }

  private get targetBoxHeight(): number {
    return this.resolvedBoxHeight ?? 0;
  }

  private filterBoxValue(
    current: number,
    target: number,
    alpha: number
  ): number {
    const delta = target - current;
    if (Math.abs(delta) <= BOX_FILTER_DEADBAND_PX) {
      return current;
    }

    return current + delta * alpha;
  }

  private get wrapperStyle(): string | null {
    if (
      this.type === ObcPoiPointerType.Point &&
      this.state === ObcPoiPointerState.Selected
    ) {
      return null;
    }

    const width = this.filteredBoxWidth > 0 ? this.filteredBoxWidth : null;
    const height = this.filteredBoxHeight > 0 ? this.filteredBoxHeight : null;
    const styles: string[] = [];

    if (width !== null) {
      styles.push(`--obc-poi-pointer-box-width-extra: ${width}px;`);
    }

    if (height !== null) {
      styles.push(`--obc-poi-pointer-box-height-extra: ${height}px;`);
    }

    if (styles.length === 0) {
      return null;
    }

    return styles.join(' ');
  }

  private renderSquareSelectionFrame() {
    if (this.state !== ObcPoiPointerState.Selected) {
      return nothing;
    }
    if (
      this.type !== ObcPoiPointerType.Point &&
      this.type !== ObcPoiPointerType.Button
    ) {
      return nothing;
    }

    const isPoint = this.type === ObcPoiPointerType.Point;
    const isButton = this.type === ObcPoiPointerType.Button;
    const hasBoxOverrides =
      this.filteredBoxWidth > 0 || this.filteredBoxHeight > 0;
    const useCustomMode = isPoint || (isButton && hasBoxOverrides);
    const frameType = isPoint
      ? ObcPoiSelectionFrameType.Indicator
      : ObcPoiSelectionFrameType.Button;
    const customBoxWidth = isPoint
      ? POINT_SELECTION_FRAME_BOX_OFFSET_PX + this.filteredBoxWidth
      : BUTTON_SELECTION_FRAME_BOX_OFFSET_PX + this.filteredBoxWidth;
    const customBoxHeight = isPoint
      ? POINT_SELECTION_FRAME_BOX_OFFSET_PX + this.filteredBoxHeight
      : BUTTON_SELECTION_FRAME_BOX_OFFSET_PX + this.filteredBoxHeight;

    return html`
      <div class="square-frame" aria-hidden="true">
        <obc-poi-selection-frame
          class="selection-frame"
          .type=${frameType}
          .state=${ObcPoiSelectionFrameState.Regular}
          .customMode=${useCustomMode}
          .boxWidth=${useCustomMode ? customBoxWidth : null}
          .boxHeight=${useCustomMode ? customBoxHeight : null}
        ></obc-poi-selection-frame>
      </div>
    `;
  }

  private renderCameraSelectionFrame() {
    if (
      !(
        this.type === ObcPoiPointerType.Camera &&
        this.state === ObcPoiPointerState.Selected
      )
    ) {
      return nothing;
    }

    return html`
      <div class="square-frame camera-selection-frame" aria-hidden="true">
        <obc-poi-selection-frame
          class="selection-frame"
          .type=${ObcPoiSelectionFrameType.Button}
          .state=${ObcPoiSelectionFrameState.Regular}
          .customMode=${true}
          .boxWidth=${CAMERA_SELECTION_FRAME_BOX_WIDTH_PX +
          this.filteredBoxWidth}
          .boxHeight=${CAMERA_SELECTION_FRAME_BOX_HEIGHT_PX +
          this.filteredBoxHeight}
        ></obc-poi-selection-frame>
      </div>
    `;
  }

  private renderPoint() {
    if (
      this.type !== ObcPoiPointerType.Point ||
      this.state === ObcPoiPointerState.Selected
    ) {
      return nothing;
    }

    return html`
      <div
        class=${classMap({
          point: true,
          regular: this.state === ObcPoiPointerState.Regular,
          active: this.state === ObcPoiPointerState.Active,
          uncertain: this.state === ObcPoiPointerState.Uncertain,
        })}
      ></div>
    `;
  }

  private renderButton() {
    if (this.type !== ObcPoiPointerType.Button) {
      return nothing;
    }

    return html`
      <div
        class=${classMap({
          button: true,
          regular: this.state === ObcPoiPointerState.Regular,
          active: this.state === ObcPoiPointerState.Active,
          selected: this.state === ObcPoiPointerState.Selected,
          uncertain: this.state === ObcPoiPointerState.Uncertain,
        })}
      ></div>
    `;
  }

  private renderCamera() {
    if (this.type !== ObcPoiPointerType.Camera) {
      return nothing;
    }

    return html`
      <div
        class=${classMap({
          camera: true,
          regular: this.state === ObcPoiPointerState.Regular,
          active: this.state === ObcPoiPointerState.Active,
          selected: this.state === ObcPoiPointerState.Selected,
          uncertain: this.state === ObcPoiPointerState.Uncertain,
        })}
      ></div>
    `;
  }

  override render() {
    return html`
      <div
        class=${classMap({
          wrapper: true,
          point: this.type === ObcPoiPointerType.Point,
          button: this.type === ObcPoiPointerType.Button,
          camera: this.type === ObcPoiPointerType.Camera,
        })}
        style=${this.wrapperStyle ?? nothing}
      >
        ${this.renderSquareSelectionFrame()}
        ${this.renderCameraSelectionFrame()} ${this.renderPoint()}
        ${this.renderButton()} ${this.renderCamera()}
      </div>
    `;
  }

  protected override updated(_changedProperties: PropertyValues): void {
    const targetWidth = this.targetBoxWidth;
    const targetHeight = this.targetBoxHeight;

    const now = performance.now();
    const dtSeconds =
      this.lastFilterTimestampMs > 0
        ? Math.min(
            0.25,
            Math.max(1 / 120, (now - this.lastFilterTimestampMs) / 1000)
          )
        : 1 / 60;
    this.lastFilterTimestampMs = now;

    const alpha = 1 - Math.exp(-2 * Math.PI * BOX_FILTER_CUTOFF_HZ * dtSeconds);

    if (!this.boxFilterInitialized) {
      this.boxFilterInitialized = true;
      this.filteredBoxWidth = targetWidth;
      this.filteredBoxHeight = targetHeight;
    } else {
      this.filteredBoxWidth = this.filterBoxValue(
        this.filteredBoxWidth,
        targetWidth,
        alpha
      );
      this.filteredBoxHeight = this.filterBoxValue(
        this.filteredBoxHeight,
        targetHeight,
        alpha
      );
    }

    let widthPx = POINT_SIZE_PX;
    let heightPx = POINT_SIZE_PX;

    if (this.type === ObcPoiPointerType.Button) {
      widthPx = BUTTON_SIZE_PX + this.filteredBoxWidth;
      heightPx = BUTTON_SIZE_PX + this.filteredBoxHeight;
    } else if (this.type === ObcPoiPointerType.Camera) {
      widthPx = CAMERA_WIDTH_PX + this.filteredBoxWidth;
      heightPx = CAMERA_HEIGHT_PX + this.filteredBoxHeight;
    } else if (
      this.type === ObcPoiPointerType.Point &&
      this.state === ObcPoiPointerState.Selected
    ) {
      widthPx = POINT_SIZE_PX;
      heightPx = POINT_SIZE_PX;
    }

    this.style.width = `${widthPx}px`;
    this.style.height = `${heightPx}px`;
  }

  static override styles = unsafeCSS(componentStyle);
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-poi-pointer': ObcPoiPointer;
  }
}
