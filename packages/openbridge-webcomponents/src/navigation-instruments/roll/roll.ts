import {nothing, svg, type SVGTemplateResult} from 'lit';
import {property} from 'lit/decorators.js';
import {
  VesselImage,
  VesselImageSize,
  vesselImages,
  type WatchVessel,
} from '../watch/watch.js';
import {customElement} from '../../decorator.js';
import {
  SingleAxisInclinometer,
  INCLINOMETER_WATCH_RADIUS,
} from '../../building-blocks/single-axis-inclinometer/single-axis-inclinometer.js';

const watchRadius = INCLINOMETER_WATCH_RADIUS;

export enum ObcRollType {
  /** Single arc scale at the bottom (default). */
  singleScale = 'single-scale',
  /** Bottom scale duplicated to the top as well. */
  dualScale = 'dual-scale',
}

/**
 * `<obc-roll>` — Roll (heel) indicator with a bottom arc scale.
 *
 * Shows `roll` against a watch arc centred at the bottom, with an average-roll
 * band and a rotating indicator. Supports an optional top scale (`dual-scale`),
 * a centre readout (`hasReadout`), and a `regular`/`enhanced` palette. See the
 * individual properties for details.
 *
 * @element obc-roll
 */
@customElement('obc-roll')
export class ObcRoll extends SingleAxisInclinometer {
  @property({type: Number}) roll = 0;
  @property({type: Number}) minAvgRoll = 0;
  @property({type: Number}) maxAvgRoll = 0;
  @property({type: String}) vesselImageFore: VesselImage = VesselImage.psvFore;
  @property({type: Number}) scaleForeImage = 1;
  @property({type: Number}) maxRollAdvice: number | undefined = undefined;
  @property({type: Boolean}) triggerRollAdvice = false;
  /** Readout label. Default `Roll`. */
  @property({type: String}) override label = 'Roll';
  /** Readout unit. Default `DEG`. */
  @property({type: String}) override unit = 'DEG';
  /** Number of fraction digits shown in the readout. Default `0`. */
  @property({type: Number}) override fractionDigits = 0;
  /**
   * `single-scale` shows one arc at the bottom (default); `dual-scale` also
   * shows the scale on the top arc (the indicator's opposite end).
   */
  @property({type: String}) type: ObcRollType = ObcRollType.singleScale;

  private get normalizedScaleForeImage(): number {
    if (!Number.isFinite(this.scaleForeImage)) {
      return 1;
    }
    return Math.max(0, Math.min(2, this.scaleForeImage));
  }

  protected override get centerAngle(): number {
    return 180;
  }
  protected override get value(): number {
    return this.roll;
  }
  protected override get avgMin(): number {
    return this.minAvgRoll;
  }
  protected override get avgMax(): number {
    return this.maxAvgRoll;
  }
  protected override get maxAdvice(): number | undefined {
    return this.maxRollAdvice;
  }
  protected override get triggerAdvice(): boolean {
    return this.triggerRollAdvice;
  }
  protected override get defaultAdviceOuter(): number {
    return 45;
  }
  protected override get isDualScale(): boolean {
    return this.type === ObcRollType.dualScale;
  }
  protected override get scaleVessels(): WatchVessel[] {
    return [
      {
        size: VesselImageSize.large,
        vesselImage: this.vesselImageFore,
        transform: `rotate(${this.roll}deg) scale(${this.normalizedScaleForeImage})`,
      },
    ];
  }

  protected override renderIndicator(
    needleTransform: string
  ): SVGTemplateResult {
    return svg`
      <line
        x1="0"
        y1="0"
        y2="${watchRadius - 10}"
        x2="0"
        stroke="${this.indicatorColor}"
        transform="${needleTransform}"
      />
    `;
  }

  protected override renderVesselOverlay(
    vesselScale: number
  ): SVGTemplateResult {
    return svg`
      <g
        style="transform: rotate(${this.roll}deg) scale(${vesselScale * this.normalizedScaleForeImage}) translate(-80px, -80px);"
      >
        ${this.zoomToFitArc ? vesselImages[this.vesselImageFore] : nothing}
      </g>
    `;
  }

  protected override renderComplement(arcAngle: number): SVGTemplateResult {
    // Outer thin-ring complement endpoints. The arc band is centred at watch
    // angle 180° (bottom) and spans 180° ± arcAngle, so its edges sit at SVG
    // coords (±R·sin(arcAngle), R·cos(arcAngle)).
    const x = watchRadius * Math.sin((arcAngle * Math.PI) / 180);
    const y = watchRadius * Math.cos((arcAngle * Math.PI) / 180);
    return svg`
      <path
        d="M ${-x} ${y} A ${watchRadius} ${watchRadius} 0 1 1 ${x} ${y}"
        fill="none"
        stroke="var(--instrument-frame-tertiary-color)"
      />
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-roll': ObcRoll;
  }
}
