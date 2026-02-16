import {html, LitElement, nothing, PropertyValues, unsafeCSS} from 'lit';
import {property} from 'lit/decorators.js';
import {customElement} from '../../../decorator.js';
import componentStyle from './poi-selection-frame.css?inline';

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
  private static readonly MIN_CUSTOM_SIZE_PX = 32;
  private static readonly MIN_TOUCH_TARGET_SIZE_PX = 48;
  private static readonly CORNER_STROKE_PX = 1.5;
  private static readonly CORNER_RADIUS_PX = 3.5;

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

  private get resolvedFrameSizePx(): number {
    if (this.type === ObcPoiSelectionFrameType.Indicator) {
      return this.state === ObcPoiSelectionFrameState.Alert ? 35 : 31;
    }

    if (this.type === ObcPoiSelectionFrameType.Enhanced) {
      if (this.state === ObcPoiSelectionFrameState.Alert) return 59;
      if (this.state === ObcPoiSelectionFrameState.Flat) return 43;
      return 55;
    }

    if (this.state === ObcPoiSelectionFrameState.Alert) return 43;
    if (this.state === ObcPoiSelectionFrameState.Flat) return 31;
    return 39;
  }

  private get resolvedCustomBoxWidthPx(): number {
    const width = Number(this.boxWidth);
    const offsetWidth = Number.isFinite(width) && width >= 0 ? width : 0;

    return ObcPoiSelectionFrame.MIN_CUSTOM_SIZE_PX + offsetWidth;
  }

  private get resolvedCustomBoxHeightPx(): number {
    const height = Number(this.boxHeight);
    const offsetHeight = Number.isFinite(height) && height >= 0 ? height : 0;

    return ObcPoiSelectionFrame.MIN_CUSTOM_SIZE_PX + offsetHeight;
  }

  private get resolvedCustomVisualWidthPx(): number {
    return (
      this.resolvedFrameSizePx +
      (this.resolvedCustomBoxWidthPx - ObcPoiSelectionFrame.MIN_CUSTOM_SIZE_PX)
    );
  }

  private get resolvedCustomVisualHeightPx(): number {
    return (
      this.resolvedFrameSizePx +
      (this.resolvedCustomBoxHeightPx - ObcPoiSelectionFrame.MIN_CUSTOM_SIZE_PX)
    );
  }

  private get resolvedCornerSizePx(): number {
    if (this.resolvedFrameSizePx <= 35) return 7;
    if (this.resolvedFrameSizePx <= 43) return 8;
    if (this.resolvedFrameSizePx <= 55) return 9;
    return 10;
  }

  private renderCorner(position: ObcPoiSelectionCornerPosition) {
    return html` <span class="corner ${position}"></span> `;
  }

  private renderFrame() {
    if (this.state === ObcPoiSelectionFrameState.None) {
      return nothing;
    }

    const style = `
      --obc-poi-selection-frame-corner-size: ${this.resolvedCornerSizePx}px;
      --obc-poi-selection-frame-corner-stroke: ${ObcPoiSelectionFrame.CORNER_STROKE_PX}px;
      --obc-poi-selection-frame-corner-radius: ${ObcPoiSelectionFrame.CORNER_RADIUS_PX}px;
      ${this.customMode ? `width: ${this.resolvedCustomVisualWidthPx}px;` : ''}
      ${this.customMode ? `height: ${this.resolvedCustomVisualHeightPx}px;` : ''}
    `;

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
        ObcPoiSelectionFrame.MIN_TOUCH_TARGET_SIZE_PX
      );
      const touchTargetHeightPx = Math.max(
        this.resolvedCustomVisualHeightPx,
        ObcPoiSelectionFrame.MIN_TOUCH_TARGET_SIZE_PX
      );

      this.style.width = `${touchTargetWidthPx}px`;
      this.style.height = `${touchTargetHeightPx}px`;
      this.style.minWidth = `${ObcPoiSelectionFrame.MIN_TOUCH_TARGET_SIZE_PX}px`;
      this.style.minHeight = `${ObcPoiSelectionFrame.MIN_TOUCH_TARGET_SIZE_PX}px`;
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
