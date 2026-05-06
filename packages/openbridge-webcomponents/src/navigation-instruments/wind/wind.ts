import {LitElement, html, svg, unsafeCSS} from 'lit';
import {property, state} from 'lit/decorators.js';
import compentStyle from './wind.css?inline';
import {VesselImage, VesselImageSize, WatchCircleType} from '../watch/watch.js';
import {environmentSvgs} from '../watch/environment.js';
import {customElement} from '../../decorator.js';

export interface WindHistogramData {
  direction: number;
  occurrences: number;
}

export enum WindVariant {
  auto = 'auto',
  small = 'small',
  medium = 'medium',
  large = 'large',
}

type ResolvedWindVariant =
  | WindVariant.small
  | WindVariant.medium
  | WindVariant.large;

const WIND_SMALL_MAX_PX = 96;
const WIND_MEDIUM_MAX_PX = 200;
const WIND_HISTOGRAM_MAX_RADIUS_SINGLE_RING = 159;
const WIND_HISTOGRAM_MAX_RADIUS_DOUBLE_RING = 109;
const WIND_HISTOGRAM_MIN_RADIUS = 50;

@customElement('obc-wind')
export class ObcWind extends LitElement {
  @property({type: Number}) currentWindFromDirection: number = 0;
  @property({type: Number}) currentWindSpeedBeaufort: number = 1;
  @property({type: Array, attribute: false})
  windHistogramData: WindHistogramData[] = [];
  @property({type: String}) vesselImage: VesselImage = VesselImage.genericTop;
  @property({type: Number}) vesselHeadingDeg: number = 0;
  @property({type: String}) variant: WindVariant = WindVariant.auto;

  @state() private _autoVariant: ResolvedWindVariant = WindVariant.medium;

  private _resizeObserver?: ResizeObserver;

  override connectedCallback(): void {
    super.connectedCallback();
    this._resizeObserver = new ResizeObserver((entries) => {
      const entry = entries[0];
      if (!entry) return;
      const {width, height} = entry.contentRect;
      const next = resolveAutoWindVariant(Math.min(width, height));
      if (next !== this._autoVariant) {
        this._autoVariant = next;
      }
    });
    this._resizeObserver.observe(this);
  }

  override disconnectedCallback(): void {
    super.disconnectedCallback();
    this._resizeObserver?.disconnect();
    this._resizeObserver = undefined;
  }

  private get effectiveVariant(): ResolvedWindVariant {
    if (this.variant === WindVariant.auto) return this._autoVariant;
    return this.variant;
  }

  override render() {
    const variant = this.effectiveVariant;
    const watchCircleType =
      variant === WindVariant.large
        ? WatchCircleType.double
        : WatchCircleType.single;
    const vessels =
      variant === WindVariant.small
        ? []
        : [
            {
              size: VesselImageSize.small,
              transform: `rotate(${this.vesselHeadingDeg}deg)`,
              vesselImage: this.vesselImage,
            },
          ];
    return html`
      <div class="wrapper variant-${variant}">
        ${this.renderWindHistogram(variant)}
        <obc-watch
          .watchCircleType=${watchCircleType}
          crosshairEnabled
          northArrow
          tickmarksInside
          .vessels=${vessels}
        ></obc-watch>
        ${this.renderWindArrow()}
      </div>
    `;
  }

  private renderWindArrow() {
    const beaufort = this.currentWindSpeedBeaufort;
    const symbol = environmentSvgs[`wind-${beaufort + 1}.svg`];
    if (!symbol) return null;
    const dir = this.currentWindFromDirection;
    const transform = `rotate(${180 + dir}deg)`;
    return html`
      <div class="wind-arrow-outer" style="transform: ${transform}">
        <div class="wind-arrow-inner">
          <svg class="wind-arrow" viewBox="0 0 24 24">${svg`${symbol}`}</svg>
        </div>
      </div>
    `;
  }

  private renderWindHistogram(variant: ResolvedWindVariant) {
    const maxRadius = resolveHistogramMaxRadius(variant);
    const minRadius = WIND_HISTOGRAM_MIN_RADIUS;
    const center = {x: 0, y: 0};

    // Find the max occurrences for scaling
    const maxOccurrences = Math.max(
      ...this.windHistogramData.map((d) => d.occurrences)
    );

    // Interpolate occurrences for each degree (0-359)
    const interpolated: number[] = new Array(360).fill(0);
    if (this.windHistogramData.length > 1) {
      // Sort data by direction
      const sorted = [...this.windHistogramData].sort(
        (a, b) => a.direction - b.direction
      );
      for (let i = 0; i < sorted.length; i++) {
        const curr = sorted[i];
        const next = sorted[(i + 1) % sorted.length];
        const start = curr.direction;
        // Ensure wrap-around at 360
        const end =
          next.direction > start ? next.direction : next.direction + 360;
        for (let deg = start; deg < end; deg++) {
          const t = (deg - start) / (end - start);
          const occ =
            curr.occurrences + t * (next.occurrences - curr.occurrences);
          interpolated[deg % 360] = occ;
        }
      }
    } else if (this.windHistogramData.length === 1) {
      interpolated.fill(this.windHistogramData[0].occurrences);
    }

    // Create SVG path for each degree
    let outerPathPoints = '';
    for (let deg = 0; deg < 360; deg++) {
      const angle = ((deg - 90) * Math.PI) / 180;
      const occ = interpolated[deg];
      const radius =
        maxRadius - (occ / maxOccurrences) * (maxRadius - minRadius);
      const x2 = center.x + radius * Math.cos(angle);
      const y2 = center.y + radius * Math.sin(angle);
      outerPathPoints += `L ${x2} ${y2} `;
    }

    return html`
      <svg width="100%" height="100%" viewBox="-200 -200 400 400">
        <mask id="mask">
          <circle
            cx="0"
            cy="0"
            r="${maxRadius}"
            stroke-width="1"
            fill="white"
          />
          <path d="M 0 ${-maxRadius} ${outerPathPoints}Z" fill="black" />
          <circle
            cx="0"
            cy="0"
            r="${minRadius}"
            vector-effect="non-scaling-stroke"
            stroke="white"
            stroke-width="1"
            fill="transparent"
          />
        </mask>
        <circle
          cx="0"
          cy="0"
          r="${maxRadius}"
          vector-effect="non-scaling-stroke"
          stroke="var(--instrument-regular-tertiary-color)"
          stroke-width="1"
          fill="var(--instrument-regular-tertiary-color)"
          mask="url(#mask)"
        />
      </svg>
    `;
  }

  static override styles = unsafeCSS(compentStyle);
}

function resolveAutoWindVariant(sizePx: number): ResolvedWindVariant {
  if (sizePx < WIND_SMALL_MAX_PX) return WindVariant.small;
  if (sizePx < WIND_MEDIUM_MAX_PX) return WindVariant.medium;
  return WindVariant.large;
}

function resolveHistogramMaxRadius(variant: ResolvedWindVariant): number {
  return variant === WindVariant.large
    ? WIND_HISTOGRAM_MAX_RADIUS_DOUBLE_RING
    : WIND_HISTOGRAM_MAX_RADIUS_SINGLE_RING;
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-wind': ObcWind;
  }
}
