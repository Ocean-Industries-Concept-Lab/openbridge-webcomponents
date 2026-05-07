import {LitElement, html, nothing, svg, unsafeCSS} from 'lit';
import {property} from 'lit/decorators.js';
import {customElement} from '../../decorator.js';
import componentStyle from './gauge-radial-indicator.css?inline';
import '../../icons/icon.js';
import '../../icons/icon-placeholder.js';

const VIEW_SIZE = 48;
const CENTER = VIEW_SIZE / 2;
const TRACK_RADIUS = 18;
const NEEDLE_OUTER_WIDTH = 4;
const NEEDLE_INNER_WIDTH = 2;
const NEEDLE_TIP_RADIUS = TRACK_RADIUS - 0.5;
const NEEDLE_CLIP_RADIUS = NEEDLE_TIP_RADIUS + NEEDLE_OUTER_WIDTH / 2;
const PIVOT_RADIUS = 3;
const REGULAR_TRACK_STROKE_WIDTH = 1;
const REGULAR_270_TRACK_PATH =
  'M12.6863 35.3137C11.9052 36.0948 10.6289 36.101 9.93923 35.2381C8.14635 32.9949 6.90986 30.347 6.34586 27.5116C5.65133 24.02 6.00779 20.4008 7.37017 17.1117C8.73255 13.8226 11.0397 11.0114 13.9997 9.03355C16.9598 7.05568 20.4399 6 24 6C27.5601 6 31.0402 7.05568 34.0003 9.03355C36.9604 11.0114 39.2675 13.8226 40.6298 17.1117C41.9922 20.4008 42.3487 24.02 41.6541 27.5116C41.0901 30.347 39.8537 32.9949 38.0608 35.2381C37.3711 36.101 36.0948 36.0948 35.3137 35.3137L25.4142 25.4142C24.6332 24.6332 23.3668 24.6332 22.5858 25.4142L12.6863 35.3137Z';
const REGULAR_180_TRACK_PATH =
  'M6.2357 21.0968A18 18 0 0 1 41.7643 21.0968A2.5 2.5 0 0 1 39.2971 24L8.7029 24A2.5 2.5 0 0 1 6.2357 21.0968Z';
const FLAT_270_TRACK_MASK_PATH =
  'M11.2721 36.7279A18 18 0 1 1 36.7279 36.7279L24 24Z';
const FLAT_270_TRACK_OUTLINE_PATH =
  'M11.2721 36.7279A18 18 0 1 1 36.7279 36.7279';
const FLAT_270_ZERO_ANGLE = -90;
const FLAT_180_TRACK_MASK_PATH = 'M6 24A18 18 0 0 1 42 24L6 24Z';
const FLAT_180_TRACK_OUTLINE_PATH = 'M6 24A18 18 0 0 1 42 24M6 24L24 24';

let nextTrackClipId = 0;

export const gaugeRadialIndicatorSectors = [180, 270] as const;
export type GaugeRadialIndicatorSector =
  (typeof gaugeRadialIndicatorSectors)[number];

export enum GaugeRadialIndicatorStyle {
  Regular = 'regular',
  Flat = 'flat',
}

function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

function pointOnCircle(
  angle: number,
  radius = TRACK_RADIUS
): {x: number; y: number} {
  const radians = (angle * Math.PI) / 180;
  return {
    x: CENTER + Math.sin(radians) * radius,
    y: CENTER - Math.cos(radians) * radius,
  };
}

function describeArcPath(startAngle: number, endAngle: number): string {
  const start = pointOnCircle(startAngle);
  const end = pointOnCircle(endAngle);
  const sweep = Math.abs(endAngle - startAngle);
  const largeArcFlag = sweep > 180 ? 1 : 0;
  const sweepFlag = endAngle >= startAngle ? 1 : 0;
  return `M ${start.x} ${start.y} A ${TRACK_RADIUS} ${TRACK_RADIUS} 0 ${largeArcFlag} ${sweepFlag} ${end.x} ${end.y}`;
}

function describeSectorPath(startAngle: number, endAngle: number): string {
  return describeSectorPathAtRadius(startAngle, endAngle, TRACK_RADIUS);
}

function describeSectorPathAtRadius(
  startAngle: number,
  endAngle: number,
  radius: number
): string {
  const start = pointOnCircle(startAngle, radius);
  const end = pointOnCircle(endAngle, radius);
  const sweep = Math.abs(endAngle - startAngle);
  const largeArcFlag = sweep > 180 ? 1 : 0;
  const sweepFlag = endAngle >= startAngle ? 1 : 0;
  return `M ${start.x} ${start.y} A ${radius} ${radius} 0 ${largeArcFlag} ${sweepFlag} ${end.x} ${end.y} L ${CENTER} ${CENTER} Z`;
}

/**
 * `<obc-gauge-radial-indicator>` – Compact radial gauge cue with selectable sweep, frame style, and optional icon.
 *
 * Renders a fixed 48 x 48 indicator derived from the larger radial gauge
 * presentation. The component keeps the same value-to-angle behavior as
 * `obc-gauge-radial`, then applies it to a condensed framed sweep with a
 * needle overlay and an optional icon anchor.
 *
 * ## Features
 *
 * - **Sector variants**: `270` renders the wider bowl sweep, while `180`
 *   renders the shorter half-sweep variant.
 * - **Style variants**: `regular` adds the framed outline; `flat` removes the
 *   outer frame treatment for a lighter presentation.
 * - **Gauge-style mapping**: `value`, `minValue`, and `maxValue` map the sweep
 *   across the selected sector, with centered zero behavior when the range
 *   crosses zero.
 * - **Needle overlay**: A fixed compact pointer and pivot marker show the
 *   current value angle.
 * - **Icon support**: Set `icon` to an `obi-icon` id or provide a custom icon
 *   element in the `icon` slot. Use `hasIcon` to hide the icon entirely.
 *
 * ## Usage Guidelines
 *
 * - Use `sector="270"` when the indicator should mirror the standard radial
 *   gauge sweep.
 * - Use `sector="180"` when the compact indicator should emphasize a shorter
 *   top sweep.
 * - Use `styleType="regular"` for the framed version shown in dense indicator
 *   grids; switch to `styleType="flat"` when the surrounding layout already
 *   provides enough visual separation.
 * - If `icon` is set, ensure the corresponding icon component is registered, or
 *   provide the icon directly through the `icon` slot.
 *
 * ## Slots
 *
 * | Slot Name | Renders When... | Purpose |
 * |-----------|----------------|---------|
 * | `icon` | `hasIcon` is true | Replaces the default icon rendered from the `icon` property. |
 *
 * @slot icon - Optional icon element rendered at the bottom anchor of the indicator.
 */
@customElement('obc-gauge-radial-indicator')
export class ObcGaugeRadialIndicator extends LitElement {
  private readonly trackClipId = `obc-gauge-radial-indicator-track-${nextTrackClipId++}`;
  private readonly needleClipId = `${this.trackClipId}-needle`;

  @property({type: Number}) value = 33;

  @property({type: Number, attribute: 'min-value'}) minValue = 0;

  @property({type: Number, attribute: 'max-value'}) maxValue = 100;

  @property({type: Number}) sector: number = 270;

  @property({type: String, attribute: 'style-type'})
  styleType: GaugeRadialIndicatorStyle = GaugeRadialIndicatorStyle.Regular;

  @property({type: String}) icon = 'placeholder';

  @property({type: Boolean, attribute: 'has-icon'}) hasIcon = false;

  static override styles = unsafeCSS(componentStyle);

  private get normalizedSector(): GaugeRadialIndicatorSector {
    return this.sector === 180 ? 180 : 270;
  }

  private get sweepHalf(): number {
    return this.normalizedSector / 2;
  }

  private get boundedMinValue(): number {
    return Number.isFinite(this.minValue) ? this.minValue : 0;
  }

  private get boundedMaxValue(): number {
    if (!Number.isFinite(this.maxValue)) {
      return 100;
    }

    return this.maxValue <= this.boundedMinValue
      ? this.boundedMinValue + 1
      : this.maxValue;
  }

  private get clampedValue(): number {
    const value = Number.isFinite(this.value)
      ? this.value
      : this.boundedMinValue;
    return clamp(value, this.boundedMinValue, this.boundedMaxValue);
  }

  private get minAngle(): number {
    return -this.sweepHalf;
  }

  private get maxAngle(): number {
    return this.sweepHalf;
  }

  private get baselineValue(): number {
    return clamp(0, this.boundedMinValue, this.boundedMaxValue);
  }

  private get baselineAngle(): number {
    return this.mapValueToAngle(this.baselineValue);
  }

  private get currentAngle(): number {
    return this.mapValueToAngle(this.clampedValue);
  }

  private get isRegularStyle(): boolean {
    return this.styleType !== GaugeRadialIndicatorStyle.Flat;
  }

  private get usesExactRegular270Track(): boolean {
    return this.normalizedSector === 270 && this.isRegularStyle;
  }

  private get usesExactRegular180Track(): boolean {
    return this.normalizedSector === 180 && this.isRegularStyle;
  }

  private get usesExactFlat270Track(): boolean {
    return (
      this.normalizedSector === 270 &&
      this.styleType === GaugeRadialIndicatorStyle.Flat
    );
  }

  private get usesExactFlat180Track(): boolean {
    return (
      this.normalizedSector === 180 &&
      this.styleType === GaugeRadialIndicatorStyle.Flat
    );
  }

  private mapValueToAngle(value: number): number {
    const min = this.boundedMinValue;
    const max = this.boundedMaxValue;
    const clampedValue = clamp(value, min, max);
    const ratio = (clampedValue - min) / (max - min);
    return ratio * this.normalizedSector - this.sweepHalf;
  }

  private renderGenericTrack(path: string) {
    return svg`
      <path
        d="${path}"
        fill="none"
        stroke="var(--instrument-frame-primary-color)"
        stroke-width="36"
        stroke-linecap="round"
      />
    `;
  }

  private renderGenericActiveTrack() {
    if (Math.abs(this.currentAngle - this.baselineAngle) < 0.01) {
      return nothing;
    }

    return svg`
      <path
        d="${describeArcPath(this.baselineAngle, this.currentAngle)}"
        fill="none"
        stroke="var(--instrument-enhanced-tertiary-color)"
        stroke-width="36"
        stroke-linecap="round"
      />
    `;
  }

  private renderGenericTrackOutline(path: string) {
    if (!this.isRegularStyle) {
      return nothing;
    }

    return svg`
      <g clip-path="url(#${this.trackClipId})">
        <path
          d="${path}"
          fill="none"
          stroke="var(--instrument-frame-tertiary-color)"
          stroke-width="2"
          stroke-linecap="round"
        />
      </g>
    `;
  }

  private renderExactRegular270Track() {
    const minNeedleEdge = pointOnCircle(this.minAngle, NEEDLE_CLIP_RADIUS);
    const maxNeedleEdge = pointOnCircle(this.maxAngle, NEEDLE_CLIP_RADIUS);
    return svg`
      <defs>
        <mask
          id="${this.needleClipId}"
          style="mask-type: luminance"
          maskUnits="userSpaceOnUse"
          x="5"
          y="5"
          width="38"
          height="32"
        >
          <path d="${REGULAR_270_TRACK_PATH}" fill="white" />
          <line
            x1="${CENTER}"
            y1="${CENTER}"
            x2="${minNeedleEdge.x}"
            y2="${minNeedleEdge.y}"
            stroke="white"
            stroke-width="${NEEDLE_OUTER_WIDTH}"
            stroke-linecap="round"
            vector-effect="non-scaling-stroke"
          />
          <line
            x1="${CENTER}"
            y1="${CENTER}"
            x2="${maxNeedleEdge.x}"
            y2="${maxNeedleEdge.y}"
            stroke="white"
            stroke-width="${NEEDLE_OUTER_WIDTH}"
            stroke-linecap="round"
            vector-effect="non-scaling-stroke"
          />
        </mask>
        <mask
          id="${this.trackClipId}"
          style="mask-type: luminance"
          maskUnits="userSpaceOnUse"
          x="5"
          y="5"
          width="38"
          height="32"
        >
          <path
            d="${REGULAR_270_TRACK_PATH}"
            fill="white"
            stroke="black"
            vector-effect="non-scaling-stroke"
          />
        </mask>
      </defs>
      <path
        d="${REGULAR_270_TRACK_PATH}"
        fill="var(--instrument-frame-primary-color)"
      />
      ${
        Math.abs(this.currentAngle - this.baselineAngle) < 0.01
          ? nothing
          : svg`
            <g mask="url(#${this.trackClipId})">
              <path
                d="${describeSectorPath(this.baselineAngle, this.currentAngle)}"
                fill="var(--instrument-enhanced-tertiary-color)"
              />
            </g>
          `
      }
      <path
        d="${REGULAR_270_TRACK_PATH}"
        fill="none"
        stroke="var(--instrument-frame-tertiary-color)"
        stroke-width="${REGULAR_TRACK_STROKE_WIDTH}"
        vector-effect="non-scaling-stroke"
      />
    `;
  }

  private renderExactRegular180Track() {
    const minNeedleEdge = pointOnCircle(this.minAngle, NEEDLE_CLIP_RADIUS);
    const maxNeedleEdge = pointOnCircle(this.maxAngle, NEEDLE_CLIP_RADIUS);
    return svg`
      <defs>
        <mask
          id="${this.needleClipId}"
          style="mask-type: luminance"
          maskUnits="userSpaceOnUse"
          x="5"
          y="5"
          width="38"
          height="20"
        >
          <path d="${REGULAR_180_TRACK_PATH}" fill="white" />
          <line
            x1="${CENTER}"
            y1="${CENTER}"
            x2="${minNeedleEdge.x}"
            y2="${minNeedleEdge.y}"
            stroke="white"
            stroke-width="${NEEDLE_OUTER_WIDTH}"
            stroke-linecap="round"
            vector-effect="non-scaling-stroke"
          />
          <line
            x1="${CENTER}"
            y1="${CENTER}"
            x2="${maxNeedleEdge.x}"
            y2="${maxNeedleEdge.y}"
            stroke="white"
            stroke-width="${NEEDLE_OUTER_WIDTH}"
            stroke-linecap="round"
            vector-effect="non-scaling-stroke"
          />
        </mask>
        <mask
          id="${this.trackClipId}"
          style="mask-type: luminance"
          maskUnits="userSpaceOnUse"
          x="5"
          y="5"
          width="38"
          height="20"
        >
          <path
            d="${REGULAR_180_TRACK_PATH}"
            fill="white"
            vector-effect="non-scaling-stroke"
          />
        </mask>
      </defs>
      <path
        d="${REGULAR_180_TRACK_PATH}"
        fill="var(--instrument-frame-primary-color)"
      />
      ${
        Math.abs(this.currentAngle - this.baselineAngle) < 0.01
          ? nothing
          : svg`
            <g mask="url(#${this.trackClipId})">
              <path
                d="${describeSectorPath(this.baselineAngle, this.currentAngle)}"
                fill="var(--instrument-enhanced-tertiary-color)"
              />
            </g>
          `
      }
      <path
        d="${REGULAR_180_TRACK_PATH}"
        fill="none"
        stroke="var(--instrument-frame-tertiary-color)"
        stroke-width="${REGULAR_TRACK_STROKE_WIDTH}"
        stroke-linejoin="round"
        vector-effect="non-scaling-stroke"
      />
    `;
  }

  private renderExactFlat270Track() {
    const scaleStart = pointOnCircle(FLAT_270_ZERO_ANGLE);
    const activeStartAngle = FLAT_270_ZERO_ANGLE;
    const activeFillPath = describeSectorPathAtRadius(
      activeStartAngle,
      this.currentAngle,
      VIEW_SIZE
    );
    const minNeedleEdge = pointOnCircle(this.minAngle, NEEDLE_CLIP_RADIUS);
    const maxNeedleEdge = pointOnCircle(this.maxAngle, NEEDLE_CLIP_RADIUS);

    return svg`
      <defs>
        <mask
          id="${this.needleClipId}"
          style="mask-type: luminance"
          maskUnits="userSpaceOnUse"
          x="0"
          y="0"
          width="${VIEW_SIZE}"
          height="${VIEW_SIZE}"
        >
          <path d="${FLAT_270_TRACK_MASK_PATH}" fill="white" />
          <path
            d="${describeSectorPathAtRadius(this.minAngle, this.maxAngle, NEEDLE_CLIP_RADIUS)}"
            fill="white"
          />
          <line
            x1="${CENTER}"
            y1="${CENTER}"
            x2="${minNeedleEdge.x}"
            y2="${minNeedleEdge.y}"
            stroke="white"
            stroke-width="${NEEDLE_OUTER_WIDTH}"
            stroke-linecap="round"
            vector-effect="non-scaling-stroke"
          />
          <line
            x1="${CENTER}"
            y1="${CENTER}"
            x2="${maxNeedleEdge.x}"
            y2="${maxNeedleEdge.y}"
            stroke="white"
            stroke-width="${NEEDLE_OUTER_WIDTH}"
            stroke-linecap="round"
            vector-effect="non-scaling-stroke"
          />
        </mask>
        <mask
          id="${this.trackClipId}"
          style="mask-type: luminance"
          maskUnits="userSpaceOnUse"
          x="6"
          y="6"
          width="36"
          height="31"
        >
          <path
            d="${FLAT_270_TRACK_MASK_PATH}"
            fill="white"
            stroke="black"
            stroke-linejoin="round"
            vector-effect="non-scaling-stroke"
          />
        </mask>
      </defs>
      ${
        Math.abs(this.currentAngle - activeStartAngle) < 0.01
          ? nothing
          : svg`
            <g mask="url(#${this.trackClipId})">
              <path
                d="${activeFillPath}"
                fill="var(--instrument-enhanced-tertiary-color)"
              />
            </g>
          `
      }
      <line
        x1="${scaleStart.x}"
        y1="${scaleStart.y}"
        x2="${CENTER}"
        y2="${CENTER}"
        stroke="var(--instrument-frame-tertiary-color)"
        stroke-width="${REGULAR_TRACK_STROKE_WIDTH}"
        vector-effect="non-scaling-stroke"
      />
      <path
        d="${FLAT_270_TRACK_OUTLINE_PATH}"
        fill="none"
        stroke="var(--instrument-frame-tertiary-color)"
        stroke-width="${REGULAR_TRACK_STROKE_WIDTH}"
        stroke-linejoin="round"
        stroke-linecap="round"
        vector-effect="non-scaling-stroke"
      />
    `;
  }

  private renderExactFlat180Track() {
    const minNeedleEdge = pointOnCircle(this.minAngle, NEEDLE_CLIP_RADIUS);
    const maxNeedleEdge = pointOnCircle(this.maxAngle, NEEDLE_CLIP_RADIUS);

    return svg`
      <defs>
        <mask
          id="${this.needleClipId}"
          style="mask-type: luminance"
          maskUnits="userSpaceOnUse"
          x="0"
          y="0"
          width="${VIEW_SIZE}"
          height="${VIEW_SIZE}"
        >
          <path d="${FLAT_180_TRACK_MASK_PATH}" fill="white" />
          <path
            d="${describeSectorPathAtRadius(this.minAngle, this.maxAngle, NEEDLE_CLIP_RADIUS)}"
            fill="white"
          />
          <line
            x1="${CENTER}"
            y1="${CENTER}"
            x2="${minNeedleEdge.x}"
            y2="${minNeedleEdge.y}"
            stroke="white"
            stroke-width="${NEEDLE_OUTER_WIDTH}"
            stroke-linecap="round"
            vector-effect="non-scaling-stroke"
          />
          <line
            x1="${CENTER}"
            y1="${CENTER}"
            x2="${maxNeedleEdge.x}"
            y2="${maxNeedleEdge.y}"
            stroke="white"
            stroke-width="${NEEDLE_OUTER_WIDTH}"
            stroke-linecap="round"
            vector-effect="non-scaling-stroke"
          />
        </mask>
        <mask
          id="${this.trackClipId}"
          style="mask-type: luminance"
          maskUnits="userSpaceOnUse"
          x="5"
          y="5"
          width="38"
          height="20"
        >
          <path
            d="${FLAT_180_TRACK_MASK_PATH}"
            fill="white"
            vector-effect="non-scaling-stroke"
          />
        </mask>
      </defs>
      ${
        Math.abs(this.currentAngle - this.baselineAngle) < 0.01
          ? nothing
          : svg`
            <g mask="url(#${this.trackClipId})">
              <path
                d="${describeSectorPath(this.baselineAngle, this.currentAngle)}"
                fill="var(--instrument-enhanced-tertiary-color)"
              />
            </g>
          `
      }
      <path
        d="${FLAT_180_TRACK_OUTLINE_PATH}"
        fill="none"
        stroke="var(--instrument-frame-tertiary-color)"
        stroke-width="${REGULAR_TRACK_STROKE_WIDTH}"
        stroke-linejoin="round"
        stroke-linecap="round"
        vector-effect="non-scaling-stroke"
      />
    `;
  }

  private renderFlatNeedle() {
    const tip = pointOnCircle(this.currentAngle, NEEDLE_TIP_RADIUS);

    return svg`
      <g>
        <line
          x1="${CENTER}"
          y1="${CENTER}"
          x2="${tip.x}"
          y2="${tip.y}"
          stroke="var(--instrument-frame-primary-color)"
          stroke-width="${NEEDLE_OUTER_WIDTH}"
          stroke-linecap="round"
          vector-effect="non-scaling-stroke"
        />
        <line
          x1="${CENTER}"
          y1="${CENTER}"
          x2="${tip.x}"
          y2="${tip.y}"
          stroke="var(--instrument-enhanced-secondary-color)"
          stroke-width="${NEEDLE_INNER_WIDTH}"
          stroke-linecap="round"
          vector-effect="non-scaling-stroke"
        />
      </g>
      <circle
        cx="${CENTER}"
        cy="${CENTER}"
        r="${PIVOT_RADIUS}"
        fill="var(--instrument-enhanced-secondary-color)"
      />
    `;
  }

  private renderNeedle() {
    const tip = pointOnCircle(this.currentAngle, NEEDLE_TIP_RADIUS);

    return svg`
      <g>
        <line
          x1="${CENTER}"
          y1="${CENTER}"
          x2="${tip.x}"
          y2="${tip.y}"
          stroke="var(--instrument-frame-primary-color)"
          stroke-width="${NEEDLE_OUTER_WIDTH}"
          stroke-linecap="round"
          vector-effect="non-scaling-stroke"
        />
        <line
          x1="${CENTER}"
          y1="${CENTER}"
          x2="${tip.x}"
          y2="${tip.y}"
          stroke="var(--instrument-enhanced-secondary-color)"
          stroke-width="${NEEDLE_INNER_WIDTH}"
          stroke-linecap="round"
          vector-effect="non-scaling-stroke"
        />
      </g>
      <circle
        cx="${CENTER}"
        cy="${CENTER}"
        r="${PIVOT_RADIUS}"
        fill="var(--instrument-enhanced-secondary-color)"
      />
    `;
  }

  private renderDefaultIcon() {
    if (!this.icon) {
      return nothing;
    }

    return html`<obi-icon .icon=${this.icon}></obi-icon>`;
  }

  override render() {
    const trackPath = describeArcPath(this.minAngle, this.maxAngle);
    const minNeedleEdge = pointOnCircle(this.minAngle, NEEDLE_CLIP_RADIUS);
    const maxNeedleEdge = pointOnCircle(this.maxAngle, NEEDLE_CLIP_RADIUS);

    return html`
      <div class="container">
        <svg
          width="${VIEW_SIZE}"
          height="${VIEW_SIZE}"
          viewBox="0 0 ${VIEW_SIZE} ${VIEW_SIZE}"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          ${this.usesExactRegular270Track
            ? this.renderExactRegular270Track()
            : this.usesExactRegular180Track
              ? this.renderExactRegular180Track()
              : this.usesExactFlat270Track
                ? this.renderExactFlat270Track()
                : this.usesExactFlat180Track
                  ? this.renderExactFlat180Track()
                  : svg`
                <defs>
                  <mask
                    id="${this.needleClipId}"
                    style="mask-type: luminance"
                    maskUnits="userSpaceOnUse"
                    x="0"
                    y="0"
                    width="${VIEW_SIZE}"
                    height="${VIEW_SIZE}"
                  >
                    <path
                      d="${describeSectorPath(this.minAngle, this.maxAngle)}"
                      fill="white"
                    />
                    <line
                      x1="${CENTER}"
                      y1="${CENTER}"
                      x2="${minNeedleEdge.x}"
                      y2="${minNeedleEdge.y}"
                      stroke="white"
                      stroke-width="${NEEDLE_OUTER_WIDTH}"
                      stroke-linecap="round"
                      vector-effect="non-scaling-stroke"
                    />
                    <line
                      x1="${CENTER}"
                      y1="${CENTER}"
                      x2="${maxNeedleEdge.x}"
                      y2="${maxNeedleEdge.y}"
                      stroke="white"
                      stroke-width="${NEEDLE_OUTER_WIDTH}"
                      stroke-linecap="round"
                      vector-effect="non-scaling-stroke"
                    />
                  </mask>
                  <clipPath id="${this.trackClipId}">
                    <circle cx="${CENTER}" cy="${CENTER}" r="${TRACK_RADIUS}" />
                  </clipPath>
                </defs>
                ${this.renderGenericTrack(trackPath)}
                ${this.renderGenericActiveTrack()}
                ${this.renderGenericTrackOutline(trackPath)}
              `}
          ${this.usesExactFlat270Track || this.usesExactFlat180Track
            ? this.renderFlatNeedle()
            : this.usesExactRegular270Track || this.usesExactRegular180Track
              ? this.renderNeedle()
              : this.renderNeedle()}
        </svg>
        ${this.hasIcon
          ? html`
              <div class="gauge-radial-indicator-icon">
                <slot name="icon">${this.renderDefaultIcon()}</slot>
              </div>
            `
          : nothing}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-gauge-radial-indicator': ObcGaugeRadialIndicator;
  }
}
