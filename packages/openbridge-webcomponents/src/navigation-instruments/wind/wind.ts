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

export enum WindSize {
  auto = 'auto',
  small = 'small',
  medium = 'medium',
  large = 'large',
}

type ResolvedWindSize = WindSize.small | WindSize.medium | WindSize.large;

const WIND_SMALL_MAX_PX = 96;
const WIND_MEDIUM_MAX_PX = 256;

// Arrow icon size scales hybridly: each variant has its own [min, max]
// pixel range that the arrow is interpolated across as the host size grows
// from one breakpoint to the next. Tune these to taste.
const WIND_ARROW_SIZE_BY_VARIANT: Record<
  ResolvedWindSize,
  {hostMin: number; hostMax: number; arrowMin: number; arrowMax: number}
> = {
  [WindSize.small]: {
    hostMin: 0,
    hostMax: WIND_SMALL_MAX_PX,
    arrowMin: 18,
    arrowMax: 26,
  },
  [WindSize.medium]: {
    hostMin: WIND_SMALL_MAX_PX,
    hostMax: WIND_MEDIUM_MAX_PX,
    arrowMin: 28,
    arrowMax: 40,
  },
  [WindSize.large]: {
    hostMin: WIND_MEDIUM_MAX_PX,
    hostMax: 512,
    arrowMin: 32,
    arrowMax: 105,
  },
};

// Distance from the instrument centre to the arrow *tip* (the pointy / inward
// end), in pixels, interpolated across each variant's host-size range.
// Tune per variant.
const WIND_ARROW_TIP_DISTANCE_BY_VARIANT: Record<
  ResolvedWindSize,
  {hostMin: number; hostMax: number; tipMin: number; tipMax: number}
> = {
  [WindSize.small]: {
    hostMin: 0,
    hostMax: WIND_SMALL_MAX_PX,
    tipMin: 14,
    tipMax: 24,
  },
  [WindSize.medium]: {
    hostMin: WIND_SMALL_MAX_PX,
    hostMax: WIND_MEDIUM_MAX_PX,
    tipMin: 28,
    tipMax: 70,
  },
  [WindSize.large]: {
    hostMin: WIND_MEDIUM_MAX_PX,
    hostMax: 512,
    tipMin: 10,
    tipMax: 285,
  },
};

@customElement('obc-wind')
export class ObcWind extends LitElement {
  @property({type: Number}) currentWindFromDirection: number = 0;
  @property({type: Number}) currentWindSpeedBeaufort: number = 1;
  @property({type: Array, attribute: false})
  windHistogramData: WindHistogramData[] = [];
  @property({type: String}) vesselImage: VesselImage = VesselImage.genericTop;
  @property({type: Number}) vesselHeadingDeg: number = 0;
  @property({type: String}) size: WindSize = WindSize.auto;

  @state() private _autoSize: ResolvedWindSize = WindSize.medium;
  @state() private _hostSize: number = 0;

  private _resizeObserver?: ResizeObserver;

  override connectedCallback(): void {
    super.connectedCallback();
    this._resizeObserver = new ResizeObserver((entries) => {
      const entry = entries[0];
      if (!entry) return;
      const {width, height} = entry.contentRect;
      const minSide = Math.min(width, height);
      const next = resolveAutoWindSize(minSide);
      if (next !== this._autoSize) {
        this._autoSize = next;
      }
      if (minSide !== this._hostSize) {
        this._hostSize = minSide;
      }
    });
    this._resizeObserver.observe(this);
  }

  override disconnectedCallback(): void {
    super.disconnectedCallback();
    this._resizeObserver?.disconnect();
    this._resizeObserver = undefined;
  }

  private get effectiveSize(): ResolvedWindSize {
    if (this.size === WindSize.auto) return this._autoSize;
    return this.size;
  }

  override render() {
    const size = this.effectiveSize;
    const watchCircleType =
      size === WindSize.large ? WatchCircleType.double : WatchCircleType.single;
    const vessels =
      size === WindSize.small
        ? []
        : [
            {
              size: VesselImageSize.small,
              transform: `rotate(${this.vesselHeadingDeg}deg)`,
              vesselImage: this.vesselImage,
            },
          ];
    return html`
      <div class="wrapper">
        ${this.renderWindHistogram()}
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
    const variant = this.effectiveSize;
    const arrowSize = computeArrowSize(this._hostSize, variant);
    const tipDistance = computeArrowTipDistance(this._hostSize, variant);
    // The arrow icon is drawn vertically with its tip at the top of its own
    // box; rotation pivots around the icon centre. To land the tip at
    // `tipDistance` from the instrument centre, place the arrow centre
    // `arrowSize/2` further out along the same radial line.
    const radiusPx = tipDistance + arrowSize / 2;
    const dir = this.currentWindFromDirection;
    const rad = ((dir - 180) * Math.PI) / 180;
    const x = -Math.sin(rad) * radiusPx;
    const y = Math.cos(rad) * radiusPx;
    const half = arrowSize / 2;
    const transform = `translate(${x}px, ${y}px) rotate(${180 + dir}deg)`;
    return html`
      <svg
        class="wind-arrow"
        viewBox="0 0 24 24"
        width=${arrowSize}
        height=${arrowSize}
        style="transform: ${transform}; margin-left: ${-half}px; margin-top: ${-half}px;"
      >
        ${svg`${symbol}`}
      </svg>
    `;
  }

  private renderWindHistogram() {
    const maxRadius = 159; // Max bar length
    const minRadius = 50; // Optional: minimum bar length for visibility
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

function resolveAutoWindSize(sizePx: number): ResolvedWindSize {
  if (sizePx < WIND_SMALL_MAX_PX) return WindSize.small;
  if (sizePx < WIND_MEDIUM_MAX_PX) return WindSize.medium;
  return WindSize.large;
}

function computeArrowSize(hostSize: number, variant: ResolvedWindSize): number {
  const {hostMin, hostMax, arrowMin, arrowMax} =
    WIND_ARROW_SIZE_BY_VARIANT[variant];
  return interpolate(hostSize, hostMin, hostMax, arrowMin, arrowMax);
}

function computeArrowTipDistance(
  hostSize: number,
  variant: ResolvedWindSize
): number {
  const {hostMin, hostMax, tipMin, tipMax} =
    WIND_ARROW_TIP_DISTANCE_BY_VARIANT[variant];
  return interpolate(hostSize, hostMin, hostMax, tipMin, tipMax);
}

function interpolate(
  value: number,
  inMin: number,
  inMax: number,
  outMin: number,
  outMax: number
): number {
  const span = inMax - inMin;
  const t = span > 0 ? (value - inMin) / span : 0;
  const clamped = Math.max(0, Math.min(1, t));
  return outMin + clamped * (outMax - outMin);
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-wind': ObcWind;
  }
}
