import {LitElement, html, unsafeCSS} from 'lit';
import {property} from 'lit/decorators.js';
import compentStyle from './wind.css?inline';
import {VesselImage, VesselImageSize, WatchCircleType} from '../watch/watch.js';
import {customElement} from '../../decorator.js';

export interface WindHistogramData {
  direction: number;
  occurrences: number;
}

@customElement('obc-wind')
export class ObcWind extends LitElement {
  private _histMaskId = `wind-hist-mask-${Math.random().toString(36).slice(2, 9)}`;
  private _notchClipId = `wind-notch-clip-${Math.random().toString(36).slice(2, 9)}`;

  @property({type: Number}) currentWindFromDirection: number = 0;
  @property({type: Number}) currentWindSpeedBeaufort: number = 1;
  @property({type: Array, attribute: false})
  windHistogramData: WindHistogramData[] = [];
  @property({type: String}) vesselImage: VesselImage = VesselImage.genericTop;
  @property({type: Number}) vesselHeadingDeg: number = 0;
  override render() {
    return html`
      <div class="wrapper">
        <obc-watch
          .watchCircleType=${WatchCircleType.double}
          .windFromDirectionDeg=${this.currentWindFromDirection}
          .wind=${this.currentWindSpeedBeaufort}
          .windSymbolRadius=${118 / 0.8}
          crosshairEnabled
          northArrow
          tickmarksInside
          .scaleWindIcon=${0.8}
          .vessels=${[
            {
              size: VesselImageSize.small,
              transform: `rotate(${this.vesselHeadingDeg}deg)`,
              vesselImage: this.vesselImage,
            },
          ]}
        ></obc-watch>
        ${this.renderWindHistogram()}
      </div>
    `;
  }

  private renderWindHistogram() {
    const maxRadius = 109; // Max bar length
    const minRadius = 50; // Optional: minimum bar length for visibility
    const notchWidth = 60;
    const notchDepth = 35;
    const notchThickness = 7;
    const notchOutlineThickness = notchThickness + 2;
    const center = {x: 0, y: 0};
    const borderWidth = 1;

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

    const notchAngle = ((this.currentWindFromDirection - 90) * Math.PI) / 180;
    const notchTipRadius = maxRadius - notchDepth;
    const baseX = center.x + maxRadius * Math.cos(notchAngle);
    const baseY = center.y + maxRadius * Math.sin(notchAngle);
    const leftX = baseX - (notchWidth / 2) * Math.sin(notchAngle);
    const leftY = baseY + (notchWidth / 2) * Math.cos(notchAngle);
    const rightX = baseX + (notchWidth / 2) * Math.sin(notchAngle);
    const rightY = baseY - (notchWidth / 2) * Math.cos(notchAngle);
    const tipX = center.x + notchTipRadius * Math.cos(notchAngle);
    const tipY = center.y + notchTipRadius * Math.sin(notchAngle);
    const notchPath = `M ${leftX} ${leftY} L ${tipX} ${tipY} L ${rightX} ${rightY}`;

    return html`
      <svg width="100%" height="100%" viewBox="-200 -200 400 400">
        <defs>
          <clipPath id=${this._notchClipId}>
            <circle cx="0" cy="0" r=${maxRadius + 0.22} />
          </clipPath>
        </defs>
        <mask id=${this._histMaskId}>
          <circle cx="0" cy="0" r=${maxRadius} stroke-width="1" fill="white" />
          <path d="M 0 ${-maxRadius} ${outerPathPoints}Z" fill="black" />
          <circle
            cx="0"
            cy="0"
            r=${maxRadius}
            vector-effect="non-scaling-stroke"
            stroke="white"
            stroke-width="0"
            fill="transparent"
          />
        </mask>
        <circle
          cx="0"
          cy="0"
          r=${maxRadius}
          vector-effect="non-scaling-stroke"
          stroke="var(--instrument-regular-tertiary-color)"
          stroke-width="0"
          fill="var(--instrument-regular-tertiary-color)"
          mask="url(#${this._histMaskId})"
        />
        <circle
          cx="0"
          cy="0"
          r=${maxRadius}
          vector-effect="non-scaling-stroke"
          stroke="var(--instrument-regular-tertiary-color)"
          stroke-width=${borderWidth}
          fill="none"
        />
        <g clip-path="url(#${this._notchClipId})">
          <path
            d=${notchPath}
            fill="none"
            stroke="var(--instrument-regular-tertiary-color)"
            stroke-width=${notchOutlineThickness}
            vector-effect="non-scaling-stroke"
          />
          <path
            d=${notchPath}
            fill="none"
            stroke="var(--instrument-frame-primary-color)"
            stroke-width=${notchThickness}
            vector-effect="non-scaling-stroke"
          />
        </g>
      </svg>
    `;
  }

  static override styles = unsafeCSS(compentStyle);
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-wind': ObcWind;
  }
}
