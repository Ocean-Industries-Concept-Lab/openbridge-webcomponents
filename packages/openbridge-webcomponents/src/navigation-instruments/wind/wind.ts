import {LitElement, html, unsafeCSS} from 'lit';
import {property, state} from 'lit/decorators.js';
import compentStyle from './wind.css?inline';
import {
  VesselImage,
  VesselImageSize,
  WatchCircleType,
  innerRingRadiusFor,
} from '../watch/watch.js';
import {WIND_ICON_TIP_TO_BOX_INNER} from '../watch/environment.js';
import {renderWindForcePattern} from '../watch/force-pattern.js';
import {Priority} from '../types.js';
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

export enum WindVisualization {
  histogram = 'histogram',
  forceGraphics = 'forceGraphics',
}

type ResolvedWindVariant =
  | WindVariant.small
  | WindVariant.medium
  | WindVariant.large;

const WIND_SMALL_MAX_PX_DEFAULT = 96;
const WIND_MEDIUM_MAX_PX_DEFAULT = 200;
const WIND_HISTOGRAM_MIN_RADIUS = 50;
const WIND_PATTERN_SCALE_DOUBLE = 0.875;
const WIND_PATTERN_SCALE_SINGLE = 1.28125;

/**
 * @property visualization - Center visualization: wind histogram (default) or the force-graphics streak field.
 * @property priority - Color priority: `Priority.enhanced` uses the blue/enhanced palette (default: `Priority.regular`).
 * @stable
 */
@customElement('obc-wind')
export class ObcWind extends LitElement {
  @property({type: Number}) currentWindFromDirection: number = 0;
  @property({type: Number}) currentWindSpeedKnots: number = 25;
  @property({type: Array, attribute: false})
  windHistogramData: WindHistogramData[] = [];
  @property({type: String}) vesselImage: VesselImage = VesselImage.genericTop;
  @property({type: Number}) vesselHeadingDeg: number = 0;
  @property({type: String}) variant: WindVariant = WindVariant.auto;
  @property({type: Number}) smallVariantMaxPx = WIND_SMALL_MAX_PX_DEFAULT;
  @property({type: Number}) mediumVariantMaxPx = WIND_MEDIUM_MAX_PX_DEFAULT;
  @property({type: String}) visualization: WindVisualization =
    WindVisualization.histogram;
  @property({type: String}) priority: Priority = Priority.regular;

  @state() private _autoVariant: ResolvedWindVariant = WindVariant.medium;

  private _resizeObserver?: ResizeObserver;
  private _isObservingResize = false;

  override connectedCallback(): void {
    super.connectedCallback();
    this.syncResizeObserver();
  }

  override disconnectedCallback(): void {
    super.disconnectedCallback();
    this.stopResizeObserver();
  }

  override firstUpdated(): void {
    // Defer initial sizing to firstUpdated when element has been painted
    if (this.variant === WindVariant.auto) {
      this.setAutoVariant(this.clientWidth, this.clientHeight);
    }
  }

  protected override updated(changed: Map<string, unknown>): void {
    if (changed.has('variant')) {
      this.syncResizeObserver();
    }

    if (changed.has('smallVariantMaxPx') || changed.has('mediumVariantMaxPx')) {
      this.setAutoVariant(this.clientWidth, this.clientHeight);
    }
  }

  private syncResizeObserver(): void {
    if (
      this.variant !== WindVariant.auto ||
      typeof ResizeObserver === 'undefined'
    ) {
      this.stopResizeObserver();
      return;
    }

    if (!this._resizeObserver) {
      this._resizeObserver = new ResizeObserver((entries) => {
        const entry = entries[0];
        if (!entry || this.variant !== WindVariant.auto) return;
        const {width, height} = entry.contentRect;
        this.setAutoVariant(width, height);
      });
    }

    if (!this._isObservingResize) {
      this._resizeObserver.observe(this);
      this._isObservingResize = true;
    }
  }

  private stopResizeObserver(): void {
    if (this._resizeObserver && this._isObservingResize) {
      this._resizeObserver.disconnect();
      this._isObservingResize = false;
    }
  }

  private setAutoVariant(width: number, height: number): void {
    const next = resolveAutoWindVariant(
      Math.min(width, height),
      this.smallVariantMaxPx,
      this.mediumVariantMaxPx
    );
    if (next !== this._autoVariant) {
      this._autoVariant = next;
    }
  }

  private get effectiveVariant(): ResolvedWindVariant {
    if (this.variant === WindVariant.auto) return this._autoVariant;
    return isResolvedWindVariant(this.variant)
      ? this.variant
      : this._autoVariant;
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
              size: VesselImageSize.medium,
              transform: `rotate(${this.vesselHeadingDeg}deg)`,
              vesselImage: this.vesselImage,
            },
          ];
    const {windSymbolRadius, scaleWindIcon} =
      resolveWindArrowPlacement(variant);
    return html`
      <div class="wrapper variant-${variant}">
        ${this.renderVisualizationLayer(variant)}
        <obc-watch
          .watchCircleType=${watchCircleType}
          .priority=${this.priority}
          .windKnots=${this.currentWindSpeedKnots}
          .windFromDirectionDeg=${this.currentWindFromDirection}
          .windColor=${this.priority === Priority.enhanced
            ? 'var(--instrument-enhanced-secondary-color)'
            : undefined}
          .windSymbolRadius=${windSymbolRadius}
          .scaleWindIcon=${scaleWindIcon}
          crosshairEnabled
          northArrow
          tickmarksInside
          .showLabels=${true}
          .insideLabelsFlush=${true}
          .vessels=${vessels}
        ></obc-watch>
      </div>
    `;
  }

  private get visualizationColor(): string {
    return this.priority === Priority.enhanced
      ? 'var(--instrument-enhanced-tertiary-color)'
      : 'var(--instrument-regular-tertiary-color)';
  }

  private renderVisualizationLayer(variant: ResolvedWindVariant) {
    if (this.visualization === WindVisualization.forceGraphics) {
      return html`
        <svg width="100%" height="100%" viewBox="-200 -200 400 400">
          ${renderWindForcePattern({
            fromDirectionDeg: this.currentWindFromDirection,
            radius: resolveHistogramMaxRadius(variant),
            patternScale:
              variant === WindVariant.large
                ? WIND_PATTERN_SCALE_DOUBLE
                : WIND_PATTERN_SCALE_SINGLE,
            color: this.visualizationColor,
          })}
        </svg>
      `;
    }
    return this.renderWindHistogram(variant);
  }

  private renderWindHistogram(variant: ResolvedWindVariant) {
    const maxRadius = resolveHistogramMaxRadius(variant);
    const minRadius = WIND_HISTOGRAM_MIN_RADIUS;
    const center = {x: 0, y: 0};

    // Find the max occurrences for scaling
    const maxOccurrences = Math.max(
      ...this.windHistogramData.map((d) => d.occurrences)
    );
    const hasValidScale = Number.isFinite(maxOccurrences) && maxOccurrences > 0;

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
      const radius = hasValidScale
        ? maxRadius - (occ / maxOccurrences) * (maxRadius - minRadius)
        : maxRadius;
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
          stroke="${this.visualizationColor}"
          stroke-width="1"
          fill="${this.visualizationColor}"
          mask="url(#mask)"
        />
      </svg>
    `;
  }

  static override styles = unsafeCSS(compentStyle);
}

function resolveAutoWindVariant(
  sizePx: number,
  smallVariantMaxPx: number,
  mediumVariantMaxPx: number
): ResolvedWindVariant {
  const minT = Math.min(smallVariantMaxPx, mediumVariantMaxPx);
  const maxT = Math.max(smallVariantMaxPx, mediumVariantMaxPx);
  if (sizePx < minT) return WindVariant.small;
  if (sizePx < maxT) return WindVariant.medium;
  return WindVariant.large;
}

function resolveHistogramMaxRadius(variant: ResolvedWindVariant): number {
  return variant === WindVariant.large
    ? innerRingRadiusFor(WatchCircleType.double)
    : innerRingRadiusFor(WatchCircleType.single);
}

/**
 * Per-variant placement of the wind arrow inside `<obc-watch>`.
 *
 * `windSymbolRadius` is the distance from the watch center where the arrow
 * tip is anchored (in watch SVG units, where the outer ring sits at 184);
 * `scaleWindIcon` scales the arrow glyph — and, because the scale group wraps
 * the translated glyph, the effective tip radius is `radius × scale`.
 *
 * Large places the 48-unit icon box exactly inside the double-face track
 * band (112–160), per the OpenBridge 6.1 design (the icon box spans the
 * band, node 19663-140867); the tip anchor is the box inner edge plus the
 * glyph's inward overhang. Medium ≈93 and small ≈8 (touching center) are
 * measured from the Figma variants (node 6552-102891).
 */
export function resolveWindArrowPlacement(variant: ResolvedWindVariant): {
  windSymbolRadius: number;
  scaleWindIcon: number;
} {
  switch (variant) {
    case WindVariant.large:
      return {
        windSymbolRadius:
          innerRingRadiusFor(WatchCircleType.double) +
          WIND_ICON_TIP_TO_BOX_INNER,
        scaleWindIcon: 1.0,
      };
    case WindVariant.medium:
      return {windSymbolRadius: 62, scaleWindIcon: 1.5};
    case WindVariant.small:
      return {windSymbolRadius: 3, scaleWindIcon: 2.667};
  }
}

function isResolvedWindVariant(
  variant: string
): variant is ResolvedWindVariant {
  return (
    variant === WindVariant.small ||
    variant === WindVariant.medium ||
    variant === WindVariant.large
  );
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-wind': ObcWind;
  }
}
