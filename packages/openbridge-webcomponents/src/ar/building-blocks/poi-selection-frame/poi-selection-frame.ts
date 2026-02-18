import {html, LitElement, nothing, unsafeCSS} from 'lit';
import {property} from 'lit/decorators.js';
import {customElement} from '../../../decorator.js';
import componentStyle from './poi-selection-frame.css?inline';

export const OBC_POI_SELECTION_FRAME_MIN_CUSTOM_SIZE_PX = 28;

export enum ObcPoiSelectionFrameType {
  Indicator = 'indicator',
  Button = 'button',
  Enhanced = 'enhanced',
}

export enum ObcPoiSelectionFrameState {
  Regular = 'regular',
  Alert = 'alert',
  None = 'none',
  Flat = 'flat',
}

enum ObcPoiSelectionCornerPosition {
  TopLeft = 'tl',
  TopRight = 'tr',
  BottomLeft = 'bl',
  BottomRight = 'br',
}

/**
 * `<obc-poi-selection-frame>` - Corner-frame highlight component for selected marker targets.
 *
 * ## Overview
 * Use this component to draw a non-interactive selection outline around a marker, button, or indicator.
 * Keywords/synonyms: selection frame, focus frame, highlight frame, corner frame.
 *
 * ## Features/Variants
 * - `type` (default `indicator`): `indicator`, `button`, or `enhanced`.
 * - `state` (default `regular`): `regular`, `alert`, `none`, or `flat`.
 * - `customMode` (default `false`): Enables explicit frame box sizing.
 * - `boxWidth` / `boxHeight` (default `null`): Optional non-negative offsets added to the minimum custom size.
 *
 * ## Usage Guidelines
 * - Use `state="none"` when no frame should be rendered.
 * - Use `customMode` with `boxWidth`/`boxHeight` for non-standard target footprints.
 * - Keep `type` aligned with the selected target visual (indicator vs. button/enhanced).
 *
 * ## Slots/Content
 * This component has no slots.
 *
 * ## Events
 * This component does not emit custom events.
 *
 * ## Best Practices
 * - Prefer default sizing unless an external target box requires explicit override.
 * - Pass only finite, non-negative custom dimensions for stable output.
 *
 * ## Example
 * ```html
 * <obc-poi-selection-frame
 *   type="button"
 *   state="regular"
 *   custom-mode
 *   box-width="20"
 *   box-height="12"
 * ></obc-poi-selection-frame>
 * ```
 */
@customElement('obc-poi-selection-frame')
export class ObcPoiSelectionFrame extends LitElement {
  @property({type: String, reflect: true})
  type: ObcPoiSelectionFrameType = ObcPoiSelectionFrameType.Indicator;

  @property({type: String, reflect: true})
  state: ObcPoiSelectionFrameState = ObcPoiSelectionFrameState.Regular;

  @property({type: Boolean, reflect: true, attribute: 'custom-mode'})
  customMode = false;

  @property({type: Number, attribute: 'box-width'})
  boxWidth: number | null = null;

  @property({type: Number, attribute: 'box-height'})
  boxHeight: number | null = null;

  private get resolvedCustomBoxWidthPx(): number {
    const width = Number(this.boxWidth);
    const offsetWidth = Number.isFinite(width) && width >= 0 ? width : 0;

    return OBC_POI_SELECTION_FRAME_MIN_CUSTOM_SIZE_PX + offsetWidth;
  }

  private get resolvedCustomBoxHeightPx(): number {
    const height = Number(this.boxHeight);
    const offsetHeight = Number.isFinite(height) && height >= 0 ? height : 0;

    return OBC_POI_SELECTION_FRAME_MIN_CUSTOM_SIZE_PX + offsetHeight;
  }

  private get resolvedCustomVisualWidthPx(): number {
    return this.resolvedCustomBoxWidthPx;
  }

  private get resolvedCustomVisualHeightPx(): number {
    return this.resolvedCustomBoxHeightPx;
  }

  private renderCorner(position: ObcPoiSelectionCornerPosition) {
    return html` <span class="corner ${position}"></span> `;
  }

  private renderFrame() {
    if (this.state === ObcPoiSelectionFrameState.None) {
      return nothing;
    }

    const style = this.customMode
      ? `--obc-poi-selection-frame-custom-width: ${this.resolvedCustomVisualWidthPx}px; --obc-poi-selection-frame-custom-height: ${this.resolvedCustomVisualHeightPx}px;`
      : '';

    const parts = this.customMode
      ? 'corner-frame custom-frame'
      : 'corner-frame';

    return html`
      <span class="corner-frame" part=${parts} style=${style}>
        ${this.renderCorner(ObcPoiSelectionCornerPosition.TopLeft)}
        ${this.renderCorner(ObcPoiSelectionCornerPosition.TopRight)}
        ${this.renderCorner(ObcPoiSelectionCornerPosition.BottomLeft)}
        ${this.renderCorner(ObcPoiSelectionCornerPosition.BottomRight)}
      </span>
    `;
  }

  override render() {
    return html`<span class="frame" part="frame" aria-hidden="true"
      >${this.renderFrame()}</span
    >`;
  }

  static override styles = unsafeCSS(componentStyle);
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-poi-selection-frame': ObcPoiSelectionFrame;
  }
}
