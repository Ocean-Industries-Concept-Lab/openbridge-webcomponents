import {LitElement, html, nothing, svg, unsafeCSS} from 'lit';
import {property, state} from 'lit/decorators.js';
import type {PropertyValues} from 'lit';
import {ResizeController} from '@lit-labs/observers/resize-controller.js';
import {customElement} from '../../decorator.js';
import componentStyle from './depth-top-band.css?inline';
import {VesselImage} from '../watch/watch.js';
import {vesselImages} from '../watch/vessel.js';
import {clamp} from '../../svghelpers/math.js';

export enum DepthTopBandType {
  /** A label row reading the x range's min, 0 and max. */
  labels = 'labels',
  /** The frame band holding the side-view vessel silhouette. */
  vessel = 'vessel',
}

/** Frame width the band geometry is drawn in, matching the design canvas. */
const FRAME_WIDTH = 336;
/** Band heights on that frame. */
const BAND_HEIGHT: Record<DepthTopBandType, number> = {
  [DepthTopBandType.labels]: 24,
  [DepthTopBandType.vessel]: 48,
};
const FRAME_RADIUS = 8;
/** The 160-unit side art at this factor puts its baseline on the band's bottom edge. */
const VESSEL_ART_SCALE = 0.6;
const VESSEL_ART_SIZE = 160;
/**
 * Horizontal distance from the silhouette's centre back to the now-line.
 * TODO(designer): the design places the silhouette by eye (#1248).
 */
const VESSEL_CENTRE_OFFSET = 24;
/** Reach of the art past its centre to either end, and the margin kept to the frame edges. */
const VESSEL_BOW_REACH = 67 * VESSEL_ART_SCALE;
const VESSEL_STERN_REACH = 68 * VESSEL_ART_SCALE;
const VESSEL_EDGE_MARGIN = 2;

/**
 * `<obc-depth-top-band>` — the strip above a depth chart, slotted into the
 * chart's `top-scale` slot: either the label row of the x range (min, 0, max)
 * or the frame band with the vessel silhouette placed over the now-line.
 *
 * The hosting chart pushes the x range, its width and its horizontal paddings
 * the way it does for any slotted scale, and reserves the band's thickness
 * from the `scale-dimensions-changed` event. The band draws no bar and no
 * ladder, so the chart keeps drawing its own full frame underneath it.
 *
 * @property type - `labels` (24 px row) or `vessel` (48 px band).
 * @property now - x value the vessel sits over; the range's end when unset.
 * @availableWhen now type==vessel
 * @property vesselImage - Side-view silhouette.
 * @availableWhen vesselImage type==vessel
 * @property minValue - Start of the x range; pushed by the hosting chart.
 * @property maxValue - End of the x range; pushed by the hosting chart.
 * @property paddingLeft - Plot inset from the left edge; pushed by the hosting chart.
 * @property paddingRight - Plot inset from the right edge; pushed by the hosting chart.
 * @property width - The chart's width in px; pushed by the hosting chart.
 * @property fixedAspectRatio - Whether the paddings arrive in `scaleReferenceSize` units
 *   rather than px; pushed by the hosting chart.
 * @property scaleReferenceSize - Reference width the paddings are expressed in under
 *   `fixedAspectRatio`; pushed by the hosting chart.
 * @availableWhen scaleReferenceSize fixedAspectRatio==true
 * @fires {CustomEvent} scale-dimensions-changed - Reports `{side: 'top', thickness}` so the chart reserves the band's height. It bubbles to the chart slot the band sits in and does not leave the shadow root around it.
 * @experimental
 */
@customElement('obc-depth-top-band')
export class ObcDepthTopBand extends LitElement {
  @property({type: String}) type: DepthTopBandType = DepthTopBandType.vessel;
  @property({type: Number}) now?: number = undefined;
  @property({type: String}) vesselImage: VesselImage = VesselImage.psvSide;
  @property({type: Number}) minValue = 0;
  @property({type: Number}) maxValue = 0;
  @property({type: Number}) paddingLeft = 0;
  @property({type: Number}) paddingRight = 0;
  @property({type: Number}) width = 384;
  @property({type: Boolean}) fixedAspectRatio = false;
  @property({type: Number}) scaleReferenceSize = 384;

  /**
   * A slotted element without a bar or a ladder counts as invisible to the
   * chart's border plugin, which then keeps its own top edge under the band.
   */
  readonly hasBar = false;
  readonly hasScale = false;

  @state() private _width = 0;

  // @ts-expect-error - Controller is used for side effects, not accessed directly
  private _resizeController = new ResizeController(this, {
    callback: (entries) => {
      const width = Math.round(entries[0]?.contentRect.width ?? 0);
      if (width !== this._width) {
        this._width = width;
        this.reportDimensions();
      }
    },
  });

  /** Height of the band in px for the measured width. */
  get thickness(): number {
    return Math.round((this._width * BAND_HEIGHT[this.type]) / FRAME_WIDTH);
  }

  private reportDimensions() {
    this.dispatchEvent(
      new CustomEvent('scale-dimensions-changed', {
        detail: {side: 'top', thickness: this.thickness},
        bubbles: true,
      })
    );
  }

  override updated(changed: PropertyValues) {
    super.updated(changed);
    if (changed.has('type')) this.reportDimensions();
  }

  /** Plot edges and the now-line in frame units. */
  private geometry() {
    const scale = this._width > 0 ? this._width / FRAME_WIDTH : 1;
    // A chart pushes paddings in its slotted scales' viewBox units: the
    // reference size under fixedAspectRatio, px otherwise.
    const paddingBase = this.fixedAspectRatio
      ? this.scaleReferenceSize
      : this.width || this._width;
    const unit = paddingBase > 0 ? FRAME_WIDTH / paddingBase : 1 / scale;
    const left = this.paddingLeft * unit;
    const right = FRAME_WIDTH - this.paddingRight * unit;
    const range = this.maxValue - this.minValue;
    const fraction =
      range > 0 && this.now !== undefined && Number.isFinite(this.now)
        ? clamp((this.now - this.minValue) / range, 0, 1)
        : 1;
    return {scale, left, right, now: left + fraction * (right - left)};
  }

  private renderLabels(height: number) {
    const {left, right} = this.geometry();
    const range = this.maxValue - this.minValue;
    if (!(range > 0)) return nothing;
    const y = height - 4;
    const label = (value: number, x: number, anchor: string) =>
      svg`<text class="label" x=${x} y=${y} text-anchor=${anchor}>${value}</text>`;
    const zero =
      this.minValue < 0 && this.maxValue > 0
        ? label(
            0,
            left + ((0 - this.minValue) / range) * (right - left),
            'middle'
          )
        : nothing;
    return svg`${label(this.minValue, left, 'start')}${zero}${label(this.maxValue, right, 'end')}`;
  }

  private renderVessel(height: number) {
    const {now} = this.geometry();
    const r = FRAME_RADIUS;
    const artHalf = (VESSEL_ART_SIZE * VESSEL_ART_SCALE) / 2;
    // A now-line at either plot edge would push the hull past the frame.
    const centre = Math.max(
      VESSEL_EDGE_MARGIN + VESSEL_STERN_REACH,
      Math.min(
        now - VESSEL_CENTRE_OFFSET,
        FRAME_WIDTH - VESSEL_EDGE_MARGIN - VESSEL_BOW_REACH
      )
    );
    const outline = `M0.5 ${height} V${r + 0.5} A${r} ${r} 0 0 1 ${r + 0.5} 0.5 H${FRAME_WIDTH - r - 0.5} A${r} ${r} 0 0 1 ${FRAME_WIDTH - 0.5} ${r + 0.5} V${height}`;
    return svg`
      <path d=${outline} fill="none" stroke="var(--instrument-frame-tertiary-color)" vector-effect="non-scaling-stroke" />
      <g transform="translate(${centre - artHalf}, ${height - (VESSEL_ART_SIZE * VESSEL_ART_SCALE) / 2}) scale(${VESSEL_ART_SCALE})">
        ${vesselImages[this.vesselImage] ?? nothing}
      </g>
    `;
  }

  override render() {
    const height = BAND_HEIGHT[this.type];
    const {scale} = this.geometry();
    return html`
      <svg
        viewBox="0 0 ${FRAME_WIDTH} ${height}"
        preserveAspectRatio="none"
        style="--scale: ${scale}"
      >
        ${
          this.type === DepthTopBandType.vessel
            ? this.renderVessel(height)
            : this.renderLabels(height)
        }
      </svg>
    `;
  }

  static override styles = unsafeCSS(componentStyle);
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-depth-top-band': ObcDepthTopBand;
  }
}
