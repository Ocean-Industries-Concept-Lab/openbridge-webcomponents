import {html, LitElement, nothing, PropertyValues, unsafeCSS} from 'lit';
import {property} from 'lit/decorators.js';
import {customElement} from '../../../decorator.js';
import componentStyle from './poi-selection-frame.css?inline';

export const OBC_POI_SELECTION_FRAME_MIN_CUSTOM_SIZE_PX = 28;
const OBC_POI_SELECTION_FRAME_MIN_TOUCH_TARGET_SIZE_PX = 48;

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
 * `<obc-poi-selection-frame>` renders a non-interactive selection frame around POI targets.
 *
 * `type` + `state` control frame footprint, while corner geometry is fixed so the
 * corner shape remains visually consistent across all sizes.
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
      ? `width: ${this.resolvedCustomVisualWidthPx}px; height: ${this.resolvedCustomVisualHeightPx}px;`
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

  protected override updated(_changedProperties: PropertyValues): void {
    if (this.customMode && this.state !== ObcPoiSelectionFrameState.None) {
      const touchTargetWidthPx = Math.max(
        this.resolvedCustomVisualWidthPx,
        OBC_POI_SELECTION_FRAME_MIN_TOUCH_TARGET_SIZE_PX
      );
      const touchTargetHeightPx = Math.max(
        this.resolvedCustomVisualHeightPx,
        OBC_POI_SELECTION_FRAME_MIN_TOUCH_TARGET_SIZE_PX
      );

      this.style.width = `${touchTargetWidthPx}px`;
      this.style.height = `${touchTargetHeightPx}px`;
      this.style.minWidth = `${OBC_POI_SELECTION_FRAME_MIN_TOUCH_TARGET_SIZE_PX}px`;
      this.style.minHeight = `${OBC_POI_SELECTION_FRAME_MIN_TOUCH_TARGET_SIZE_PX}px`;
      return;
    }

    this.style.removeProperty('width');
    this.style.removeProperty('height');
    this.style.removeProperty('min-width');
    this.style.removeProperty('min-height');
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
